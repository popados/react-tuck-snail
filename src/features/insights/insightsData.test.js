import { CALM_MOODS } from '@/features/calm/calmMoods'
import {
  lines,
  mix,
  monthDays,
  weekDays,
  weekGreeting,
  words,
} from '@/features/insights/insightsData'

const SUNDAY_OCT_18 = new Date(2026, 9, 18, 21, 40)

describe('insightsData', () => {
  it('lays out Monday to Sunday of this week', () => {
    const days = weekDays({ '2026-10-12': 'good', '2026-10-16': 'shell' }, SUNDAY_OCT_18)
    expect(days.map((d) => d.key)).toEqual([
      '2026-10-12',
      '2026-10-13',
      '2026-10-14',
      '2026-10-15',
      '2026-10-16',
      '2026-10-17',
      '2026-10-18',
    ])
    expect(days.map((d) => d.answer)).toEqual(['good', null, null, null, 'shell', null, null])
  })

  it('covers the 1st of the month to today', () => {
    const days = monthDays({}, SUNDAY_OCT_18)
    expect(days).toHaveLength(18)
    expect(days[0].key).toBe('2026-10-01')
  })

  it('counts the mix of answers, leaving blanks out', () => {
    const counts = mix([
      { answer: 'good' },
      { answer: 'good' },
      { answer: null },
      { answer: 'tired' },
    ])
    expect(counts).toEqual({ good: 2, okay: 0, tired: 1, low: 0, shell: 0 })
  })

  it('finds your words (beyond the five answers) and your lines for the week', () => {
    const keys = ['2026-10-14', '2026-10-15']
    const log = [
      {
        id: '1',
        day: '2026-10-14',
        words: [{ word: 'overwhelmed', intensity: 4 }],
        note: 'deadline moved up. bed late.',
      },
      { id: '2', day: '2026-10-15', words: [{ word: 'overwhelmed', intensity: null }], note: '' },
      { id: '3', day: '2026-10-15', words: [{ word: 'relieved', intensity: null }], note: '' },
      { id: '4', day: '2026-10-15', words: [], note: '' },
      {
        id: '5',
        day: '2026-10-01',
        words: [{ word: 'lonely', intensity: null }],
        note: 'last week',
      },
    ]
    expect(words(log, keys, CALM_MOODS)).toEqual([
      { id: 'overwhelmed', count: 2, name: 'overwhelmed', face: '@_@@' },
      { id: 'relieved', count: 1, name: 'relieved', face: '@_uu ~' },
    ])
    expect(lines(log, keys)).toEqual([
      { id: '1', day: 'wed', note: 'deadline moved up. bed late.' },
    ])
  })

  it('greets without grading', () => {
    expect(weekGreeting(0)).toBe("nothing to look back on yet. that's fine.")
    expect(weekGreeting(2)).toBe("two days so far. that's plenty to look at.")
    expect(weekGreeting(5)).toBe("let's look back. no grades.")
  })
})
