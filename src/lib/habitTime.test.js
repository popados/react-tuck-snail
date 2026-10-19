import { daysShownUp, formatDuration, formatRepeat, monthKey, TIME_OPTIONS } from '@/lib/habitTime'

describe('habitTime', () => {
  it('offers 1:00 to 12:30 in half-hour steps', () => {
    expect(TIME_OPTIONS).toHaveLength(24)
    expect(TIME_OPTIONS[0]).toBe('1:00')
    expect(TIME_OPTIONS[1]).toBe('1:30')
    expect(TIME_OPTIONS.at(-1)).toBe('12:30')
  })

  it('names common repeats', () => {
    expect(formatRepeat([0, 1, 2, 3, 4, 5, 6])).toBe('every day')
    expect(formatRepeat([4, 0, 2, 1, 3])).toBe('weekdays')
    expect(formatRepeat([6, 5])).toBe('weekends')
    expect(formatRepeat([4, 0, 2])).toBe('Mon, Wed, Fri')
  })

  it('counts done and a little this month, not shell days', () => {
    const month = monthKey()
    const log = {
      [`${month}-01`]: 'done',
      [`${month}-02`]: 'little',
      [`${month}-03`]: 'shell',
      '1999-01-01': 'done',
    }
    expect(daysShownUp(log)).toBe(2)
  })

  it('formats the timer', () => {
    expect(formatDuration(600)).toBe('10:00')
    expect(formatDuration(65)).toBe('1:05')
  })
})
