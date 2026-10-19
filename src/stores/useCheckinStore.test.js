import {
  localIso,
  makeRecord,
  migrateCheckins,
  recordTuck,
  todayKey,
  useCheckinStore,
} from '@/stores/useCheckinStore'

describe('check-in records', () => {
  beforeEach(() => {
    localStorage.clear()
    useCheckinStore.setState({ entries: {}, details: {}, log: [] })
  })

  it('writes local time with its offset', () => {
    expect(localIso(new Date(2026, 9, 18, 21, 40))).toMatch(/^2026-10-18T21:40:00[+-]\d{2}:\d{2}$/)
  })

  it('builds the record from the mockup', () => {
    const record = makeRecord({
      answer: 'low',
      detail: 'overwhelmed',
      note: ' deadline moved up. bed late. ',
      day: '2026-10-18',
      at: new Date(2026, 9, 18, 21, 40),
    })
    expect(record).toEqual({
      id: expect.any(String),
      at: expect.stringMatching(/^2026-10-18T21:40:00[+-]\d{2}:\d{2}$/),
      day: '2026-10-18',
      answer: 'low',
      answerIntensity: null,
      words: [{ word: 'overwhelmed', intensity: null }],
      tags: [],
      note: 'deadline moved up. bed late.',
      from: 'pocket@shell',
    })
  })

  it('adds no word for a plain answer', () => {
    expect(makeRecord({ answer: 'low', detail: 'sad' }).words).toEqual([])
    expect(makeRecord({ answer: 'good' }).words).toEqual([])
    expect(recordTuck(makeRecord({ answer: 'good' }))).toBe('happy')
    expect(recordTuck(makeRecord({ answer: 'low', detail: 'lonely' }))).toBe('lonely')
  })

  it('stores each check-in as a record and keeps the day index', () => {
    useCheckinStore.getState().checkIn('tired', 'tired', 'bed late.')
    const { entries, details, log } = useCheckinStore.getState()
    expect(entries[todayKey()]).toBe('tired')
    expect(details[todayKey()]).toBe('tired')
    expect(log).toHaveLength(1)
    expect(log[0]).toMatchObject({
      answer: 'tired',
      words: [],
      note: 'bed late.',
      from: 'pocket@shell',
    })
  })

  it('converts the old records', () => {
    const old = {
      entries: { '2026-10-14': 'low' },
      details: { '2026-10-14': 'overwhelmed' },
      log: [
        {
          id: 'a',
          at: '2026-10-14T20:00:00',
          day: '2026-10-14',
          answer: 'low',
          detail: 'overwhelmed',
          note: 'too many tabs',
        },
        {
          id: 'b',
          at: '2026-10-15T09:00:00',
          day: '2026-10-15',
          answer: 'good',
          detail: 'happy',
          note: '',
        },
      ],
    }
    const migrated = migrateCheckins(old, 0)
    expect(migrated.entries).toBe(old.entries)
    expect(migrated.log).toEqual([
      {
        id: 'a',
        at: expect.stringMatching(/^2026-10-14T20:00:00[+-]\d{2}:\d{2}$/),
        day: '2026-10-14',
        answer: 'low',
        answerIntensity: null,
        words: [{ word: 'overwhelmed', intensity: null }],
        tags: [],
        note: 'too many tabs',
        from: 'pocket@shell',
      },
      expect.objectContaining({ id: 'b', answer: 'good', words: [], note: '' }),
    ])
    expect(migrated.log[0]).not.toHaveProperty('detail')
    // Already-current data is left alone.
    expect(migrateCheckins(migrated, 1)).toBe(migrated)
  })
})
