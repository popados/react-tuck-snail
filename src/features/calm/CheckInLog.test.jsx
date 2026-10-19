import { cleanup, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { todayKey, useCheckinStore, wordsFor } from '@/stores/useCheckinStore'
import { useShellStore, WELCOME } from '@/stores/useShellStore'
import { useViewStore } from '@/stores/useViewStore'
import { renderRoute } from '@/test/renderRoute'

const NOTE_LABEL = /Actions, Attitudes, Behaviors, Mannerisms, Patterns/

function entry(day, time, answer, detail, note = '') {
  return {
    id: `${day}-${time}`,
    at: `${day}T${time}:00`,
    day,
    answer,
    answerIntensity: null,
    words: wordsFor(answer, detail),
    tags: [],
    note,
    from: 'pocket@shell',
  }
}

describe('Your check-ins', () => {
  beforeEach(() => {
    localStorage.clear()
    useCheckinStore.setState({ entries: {}, details: {}, log: [] })
    useShellStore.setState({ lines: WELCOME, history: [] })
    useViewStore.setState({ logExpanded: true })
  })

  it('renames the note area', () => {
    renderRoute('/calm')
    expect(screen.getByLabelText(NOTE_LABEL)).toBeInTheDocument()
    expect(screen.queryByText(/Anything on your mind/)).not.toBeInTheDocument()
  })

  it('starts empty', () => {
    renderRoute('/calm')
    const log = screen.getByRole('region', { name: 'Your check-ins' })
    expect(log).toHaveTextContent('nothing here yet')
  })

  it('saves the note with the check-in and lets you read it', async () => {
    const user = userEvent.setup()
    renderRoute('/calm')
    const direct = screen.getByRole('group', { name: 'Direct moods' })
    await user.click(within(direct).getByRole('button', { name: 'Overwhelmed' }))
    await user.type(screen.getByLabelText(NOTE_LABEL), 'skipped lunch, too many tabs open')
    await user.click(screen.getByRole('button', { name: 'save check-in' }))

    expect(screen.getByLabelText(NOTE_LABEL)).toHaveValue('')
    const [saved] = useCheckinStore.getState().log
    expect(saved).toMatchObject({
      day: todayKey(),
      answer: 'low',
      answerIntensity: null,
      words: [{ word: 'overwhelmed', intensity: null }],
      tags: [],
      from: 'pocket@shell',
    })
    expect(saved.at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/)
    expect(saved.note).toBe('skipped lunch, too many tabs open')

    const log = screen.getByRole('region', { name: 'Your check-ins' })
    const row = within(log).getAllByRole('row')[1]
    expect(row).toHaveTextContent('Overwhelmed')
    expect(row).toHaveTextContent('Direct')
    expect(row).toHaveTextContent('low')
    const read = within(row).getByRole('button', { name: /read/ })
    expect(read).toHaveAttribute('aria-expanded', 'false')
    await user.click(read)
    expect(read).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById(read.getAttribute('aria-controls'))).toHaveTextContent(
      'skipped lunch, too many tabs open',
    )
  })

  it('can add a note to today’s Tuck as another entry', async () => {
    const user = userEvent.setup()
    renderRoute('/calm')
    const keep = screen.getByRole('group', { name: 'Keep moods' })
    await user.click(within(keep).getByRole('button', { name: 'Hopeful' }))
    await user.click(screen.getByRole('button', { name: 'save check-in' }))
    expect(screen.getByRole('button', { name: 'save check-in' })).toBeDisabled()

    await user.type(screen.getByLabelText(NOTE_LABEL), 'called mom')
    expect(screen.getByText('save to add this note')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'save check-in' }))
    const log = useCheckinStore.getState().log
    expect(log).toHaveLength(2)
    expect(log[1]).toMatchObject({
      words: [{ word: 'hopeful', intensity: null }],
      note: 'called mom',
    })
  })

  it('groups by week, the most recent date at the top', () => {
    useCheckinStore.setState({
      log: [
        entry('2026-10-05', '09:00', 'good', 'happy'),
        entry('2026-10-14', '20:00', 'low', 'lonely', 'quiet day'),
        entry('2026-10-12', '08:30', 'okay', 'calm'),
        entry('2026-10-07', '18:00', 'tired', 'tired'),
      ],
    })
    renderRoute('/calm')
    const log = screen.getByRole('region', { name: 'Your check-ins' })
    const weeks = within(log).getAllByRole('heading', { level: 3 })
    expect(weeks.map((h) => h.textContent)).toEqual([
      'Week of October 122 check-ins',
      'Week of October 52 check-ins',
    ])

    const emotions = (heading) =>
      within(heading.closest('section'))
        .getAllByRole('row')
        .slice(1)
        .map((row) => row.querySelector('[data-label="Emotion"]').textContent)
    // Newest date first, whatever order they were added in.
    expect(emotions(weeks[0])).toEqual(['Lonely @_..', 'Calm @_uu'])
    expect(emotions(weeks[1])).toEqual(['Tired @_--', 'Good @_^^'])
  })

  it('closes down to the 3 most recently dated check-ins, and remembers it', async () => {
    const user = userEvent.setup()
    useCheckinStore.setState({
      log: [
        entry('2026-10-05', '09:00', 'good', 'happy'),
        entry('2026-10-12', '08:30', 'okay', 'calm'),
        entry('2026-10-14', '20:00', 'low', 'lonely'),
        entry('2026-10-15', '07:00', 'good', 'proud'),
        // Added last, but for an earlier day, so it's not one of the 3 most recent.
        entry('2026-10-07', '18:00', 'tired', 'tired'),
      ],
    })
    renderRoute('/calm')
    const log = screen.getByRole('region', { name: 'Your check-ins' })
    const rows = () =>
      within(log).getAllByRole('row').length - within(log).getAllByRole('table').length
    expect(rows()).toBe(5)

    const toggle = within(log).getByRole('button', { name: 'show the 3 most recent' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(toggle)
    expect(rows()).toBe(3)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(
      within(log)
        .getAllByRole('heading', { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(['Week of October 123 check-ins'])
    const emotions = within(log)
      .getAllByRole('row')
      .slice(1)
      .map((row) => row.querySelector('[data-label="Emotion"]').textContent)
    expect(emotions).toEqual(['Proud @_^^ *', 'Lonely @_..', 'Calm @_uu'])
    expect(JSON.parse(localStorage.getItem('tuck-view')).state.logExpanded).toBe(false)

    // Still closed when the page is opened again.
    cleanup()
    renderRoute('/calm')
    expect(
      within(screen.getByRole('region', { name: 'Your check-ins' })).getByRole('button', {
        name: 'show all 5',
      }),
    ).toHaveAttribute('aria-expanded', 'false')

    const reopened = screen.getByRole('region', { name: 'Your check-ins' })
    await user.click(within(reopened).getByRole('button', { name: 'show all 5' }))
    expect(
      within(reopened).getAllByRole('row').length - within(reopened).getAllByRole('table').length,
    ).toBe(5)
  })

  it('picks one week from the month calendar', async () => {
    const user = userEvent.setup()
    vi.useFakeTimers({ now: new Date(2026, 9, 18, 12), toFake: ['Date'] })
    useCheckinStore.setState({
      log: [
        entry('2026-09-30', '09:00', 'good', 'happy'),
        entry('2026-10-12', '08:30', 'okay', 'calm'),
        entry('2026-10-14', '20:00', 'low', 'lonely'),
        entry('2026-10-07', '18:00', 'tired', 'tired'),
      ],
    })
    renderRoute('/calm')
    const log = screen.getByRole('region', { name: 'Your check-ins' })
    const trigger = within(log).getByRole('button', { name: 'pick a week, showing every week' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(trigger)
    let popout = screen.getByRole('dialog', { name: 'Pick a week' })
    expect(popout).toHaveTextContent('October 2026')
    expect(within(popout).getByRole('button', { name: 'next month' })).toBeDisabled()
    const weeks = within(popout).getByRole('group', { name: 'Weeks in October 2026' })
    expect(within(weeks).getAllByRole('button')).toHaveLength(5)

    // Picking a week closes the popout and shows just that week.
    await user.click(within(weeks).getByRole('button', { name: 'Week of October 12, 2 check-ins' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(
      within(log).getByRole('button', { name: 'pick a week, showing week of October 12' }),
    ).toHaveFocus()
    expect(
      within(log)
        .getAllByRole('heading', { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(['Week of October 122 check-ins'])
    expect(within(log).queryByRole('button', { name: /most recent/ })).not.toBeInTheDocument()

    await user.click(within(log).getByRole('button', { name: /^pick a week/ }))
    popout = screen.getByRole('dialog', { name: 'Pick a week' })
    expect(
      within(popout).getByRole('button', { name: 'Week of October 12, 2 check-ins' }),
    ).toHaveAttribute('aria-pressed', 'true')
    await user.click(
      within(popout).getByRole('button', { name: 'Week of October 19, 0 check-ins' }),
    )
    expect(log).toHaveTextContent('no check-ins that week')

    await user.click(within(log).getByRole('button', { name: 'show every week' }))
    expect(within(log).getAllByRole('heading', { level: 3 })).toHaveLength(3)

    // Earlier months, and Escape closes it.
    await user.click(within(log).getByRole('button', { name: /^pick a week/ }))
    popout = screen.getByRole('dialog', { name: 'Pick a week' })
    await user.click(within(popout).getByRole('button', { name: 'previous month' }))
    expect(popout).toHaveTextContent('September 2026')
    expect(
      within(popout).getByRole('button', { name: 'Week of September 28, 1 check-in' }),
    ).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it('has no toggle with 3 check-ins or fewer', () => {
    useCheckinStore.setState({ log: [entry('2026-10-12', '08:30', 'okay', 'calm')] })
    renderRoute('/calm')
    const log = screen.getByRole('region', { name: 'Your check-ins' })
    expect(within(log).queryByRole('button', { name: /most recent/ })).not.toBeInTheDocument()
  })

  it('takes back the landing page check-in from the log too', async () => {
    const user = userEvent.setup()
    renderRoute('/')
    const answers = screen.getByRole('group', { name: 'How are you today?' })
    await user.click(within(answers).getByRole('button', { name: 'tired' }))
    expect(useCheckinStore.getState().log).toHaveLength(1)
    await user.click(within(answers).getByRole('button', { name: 'tired' }))
    expect(useCheckinStore.getState().log).toHaveLength(0)
  })
})
