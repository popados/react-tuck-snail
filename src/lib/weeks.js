import { weekdayIndex } from '@/lib/habitTime'
import { todayKey } from '@/stores/useCheckinStore'

// Monday of the week a 'YYYY-MM-DD' day falls in, as 'YYYY-MM-DD'.
export function weekOf(day) {
  const date = new Date(`${day}T00:00`)
  date.setDate(date.getDate() - weekdayIndex(date))
  return todayKey(date)
}

// The weeks a month touches, Monday first: [{ week, days: ['YYYY-MM-DD' x7] }].
// The first and last weeks include days from the months either side.
export function monthWeeks(year, month) {
  const start = new Date(`${weekOf(todayKey(new Date(year, month, 1)))}T00:00`)
  const last = todayKey(new Date(year, month + 1, 0))
  const weeks = []
  while (todayKey(start) <= last) {
    const week = todayKey(start)
    const days = Array.from({ length: 7 }, () => {
      const key = todayKey(start)
      start.setDate(start.getDate() + 1)
      return key
    })
    weeks.push({ week, days })
  }
  return weeks
}
