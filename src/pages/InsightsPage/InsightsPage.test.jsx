import { screen, within } from '@testing-library/react'
import { weekDays } from '@/features/insights/insightsData'
import { todayKey, useCheckinStore } from '@/stores/useCheckinStore'
import { renderRoute } from '@/test/renderRoute'

describe('InsightsPage', () => {
  beforeEach(() => {
    localStorage.clear()
    useCheckinStore.setState({ entries: {}, details: {}, log: [] })
  })

  it('is in the nav, with the title and the shell', () => {
    renderRoute('/insights')
    expect(screen.getByRole('heading', { level: 1, name: 'Insights' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Insights' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('region', { name: 'tuckshell' })).toBeInTheDocument()
  })

  it('shows only the days when there is not much yet', () => {
    renderRoute('/insights')
    const week = screen.getByRole('region', { name: 'This week' })
    expect(week).toHaveTextContent("nothing to look back on yet. that's fine.")
    expect(week).toHaveTextContent('0 days this week')
    expect(within(week).queryByRole('list', { name: 'mood mix' })).not.toBeInTheDocument()
  })

  it('looks back on the week: mix, your words and your lines', () => {
    const [mon, tue, wed] = weekDays({}).map((d) => d.key)
    useCheckinStore.setState({
      entries: { [mon]: 'good', [tue]: 'tired', [wed]: 'low' },
      log: [
        { id: '1', at: `${mon}T09:00`, day: mon, answer: 'good', words: [], note: '' },
        {
          id: '2',
          at: `${tue}T21:00`,
          day: tue,
          answer: 'tired',
          words: [],
          note: 'bed late.',
        },
        {
          id: '3',
          at: `${wed}T20:00`,
          day: wed,
          answer: 'low',
          words: [{ word: 'overwhelmed', intensity: null }],
          note: '',
        },
      ],
    })
    renderRoute('/insights')
    const week = screen.getByRole('region', { name: 'This week' })
    expect(week).toHaveTextContent("let's look back. no grades.")
    expect(week).toHaveTextContent('3 days this week')
    const mix = within(week).getByRole('list', { name: 'mood mix' })
    expect(
      within(mix)
        .getAllByRole('listitem')
        .map((li) => li.textContent),
    ).toEqual(['@_^^1 good', '@_oo0 okay', '@_--1 tired', '@_;;1 low', '(@)0 shell'])
    expect(week).toHaveTextContent('overwhelmed ×1')
    expect(week).toHaveTextContent('bed late.')
  })

  it('shows the month so far', () => {
    const today = new Date()
    const [mon] = weekDays({}).map((d) => d.key)
    const entries = { [mon]: 'good' }
    useCheckinStore.setState({ entries })
    renderRoute('/insights')
    const monthName = today.toLocaleString('en-US', { month: 'long' })
    const month = screen.getByRole('region', { name: `${monthName} so far` })
    const inMonth = mon.slice(0, 7) === todayKey(today).slice(0, 7) ? 1 : 0
    expect(month).toHaveTextContent(`${inMonth} ${inMonth === 1 ? 'day' : 'days'} you checked in`)
  })
})
