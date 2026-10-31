import { act, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { todayKey } from '@/stores/useCheckinStore'
import { useHabitStore } from '@/stores/useHabitStore'
import { renderRoute } from '@/test/renderRoute'

async function addHabit(user, { name, time = '7:30', pm = false, days = ['Monday', 'Wednesday'] }) {
  await user.click(screen.getByRole('button', { name: '+ add a little thing' }))
  const form = screen.getByRole('form', { name: 'Add a little thing' })
  if (name) await user.type(within(form).getByLabelText('Name'), name)
  await user.selectOptions(within(form).getByLabelText('Time of day'), time)
  if (pm) await user.click(within(form).getByLabelText('PM'))
  for (const day of days) await user.click(within(form).getByLabelText(day))
  await user.click(within(form).getByRole('button', { name: 'add it' }))
}

const table = () => screen.getByRole('table')

describe('HabitsPage', () => {
  beforeEach(() => {
    localStorage.clear()
    useHabitStore.setState({ habits: [], logs: {} })
  })

  it('starts empty, with the title, the shell, and an add card', () => {
    renderRoute('/habits')
    expect(screen.getByRole('heading', { level: 1, name: 'Habits' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'tuckshell' })).toBeInTheDocument()
    expect(screen.getByText(/nothing here yet/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+ add a little thing' })).toBeInTheDocument()
  })

  it('asks for a name and at least one day', async () => {
    const user = userEvent.setup()
    renderRoute('/habits')
    await addHabit(user, { days: [] })
    expect(screen.getByText('give it a name.')).toBeInTheDocument()
    expect(screen.getByText('pick at least one day.')).toBeInTheDocument()
    expect(useHabitStore.getState().habits).toHaveLength(0)
  })

  it('adds a habit with a time, AM/PM and repeat days, and logs it in the table', async () => {
    const user = userEvent.setup()
    renderRoute('/habits')
    await addHabit(user, {
      name: 'walk',
      time: '5:30',
      pm: true,
      days: ['Monday', 'Wednesday', 'Friday'],
    })

    const [habit] = useHabitStore.getState().habits
    expect(habit).toMatchObject({ name: 'walk', time: '5:30', period: 'PM', days: [0, 2, 4] })
    expect(habit.timerMinutes).toBeNull()

    const row = within(table()).getByRole('row', { name: /walk/ })
    expect(row).toHaveTextContent('5:30 PM')
    expect(row).toHaveTextContent('Mon, Wed, Fri')
    expect(row).toHaveTextContent('3× a week')
    expect(row).toHaveTextContent('none yet')
    // The calendar shows the new habit's month.
    expect(screen.getByRole('heading', { level: 2, name: 'walk' })).toBeInTheDocument()
  })

  it('labels every cell, so rows read as cards on phones', async () => {
    const user = userEvent.setup()
    renderRoute('/habits')
    await addHabit(user, { name: 'water' })
    const row = within(table()).getByRole('button', { name: 'water' }).closest('tr')
    const labels = [...row.querySelectorAll('td')].map((td) => td.dataset.label)
    expect(labels).toEqual(['Time', 'Repeats', 'Timer', 'This month', 'Today'])
  })

  it('expands a row to more information', async () => {
    const user = userEvent.setup()
    renderRoute('/habits')
    await addHabit(user, { name: 'water' })
    const toggle = within(table()).getByRole('button', { name: 'water' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const details = document.getElementById(toggle.getAttribute('aria-controls'))
    expect(details).toHaveTextContent('Monday, Wednesday')
    expect(details).toHaveTextContent('7:30 AM')
    expect(within(details).getByLabelText('Add a timer')).toBeInTheDocument()
  })

  it('adds a timer after the habit is made, and counts it down', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    try {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      renderRoute('/habits')
      await addHabit(user, { name: 'stretch' })
      await user.click(within(table()).getByRole('button', { name: 'stretch' }))
      const minutes = screen.getByLabelText('Add a timer')
      await user.clear(minutes)
      await user.type(minutes, '1')
      await user.click(screen.getByRole('button', { name: 'add timer' }))

      expect(useHabitStore.getState().habits[0].timerMinutes).toBe(1)
      expect(
        within(table()).getByRole('button', { name: 'stretch' }).closest('tr'),
      ).toHaveTextContent('1 min')
      const timer = screen.getByRole('timer', { name: 'stretch timer' })
      expect(timer).toHaveTextContent('1:00')

      await user.click(screen.getByRole('button', { name: 'start' }))
      act(() => vi.advanceTimersByTime(5000))
      expect(timer).toHaveTextContent('0:55')
      act(() => vi.advanceTimersByTime(60000))
      expect(timer).toHaveTextContent('0:00')
      expect(screen.getByText(/time's up/)).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it('logs today from the table and steps through done, a little, shell day', async () => {
    const user = userEvent.setup()
    renderRoute('/habits')
    await addHabit(user, { name: 'water' })
    const log = within(table()).getByRole('button', { name: /water, today/ })
    await user.click(log)
    expect(log).toHaveTextContent('done')
    await user.click(log)
    expect(log).toHaveTextContent('a little')
    await user.click(log)
    expect(log).toHaveTextContent('shell day')
    await user.click(log)
    expect(log).toHaveTextContent('log')
  })

  it('marks a day on the calendar', async () => {
    const user = userEvent.setup()
    renderRoute('/habits')
    await addHabit(user, { name: 'walk' })
    const day = Number(todayKey().slice(-2))
    const calendar = screen.getByRole('group', { name: /, walk$/ })
    await user.click(
      within(calendar).getByRole('button', { name: new RegExp(` ${day}: just a day, today`) }),
    )
    expect(within(calendar).getByRole('button', { name: / did it, today/ })).toBeInTheDocument()
    expect(
      screen.getByText('days you showed up in', { exact: false }).previousSibling,
    ).toHaveTextContent('1')
  })

  it('has Small things as a full-width row, logging and unlogging gently', async () => {
    const user = userEvent.setup()
    renderRoute('/habits')
    const small = screen.getByRole('region', { name: 'Small things' })
    expect(within(small).getAllByRole('listitem')).toHaveLength(4)
    const water = within(small).getByRole('button', { name: 'log water' })
    await user.click(water)
    expect(water).toHaveAttribute('aria-pressed', 'true')
    expect(within(small).getByRole('status')).toHaveTextContent('water logged. small sips count.')
    await user.click(water)
    expect(within(small).getByRole('status')).toHaveTextContent('water unlogged. no harm done.')
  })

  it('removes a habit only after a second tap', async () => {
    const user = userEvent.setup()
    renderRoute('/habits')
    await addHabit(user, { name: 'water' })
    await user.click(within(table()).getByRole('button', { name: 'water' }))
    await user.click(screen.getByRole('button', { name: 'remove habit' }))
    expect(useHabitStore.getState().habits).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: 'yes, remove water' }))
    expect(useHabitStore.getState().habits).toHaveLength(0)
  })
})
