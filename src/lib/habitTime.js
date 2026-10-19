// Times, days and day statuses for habits.

// 1:00 to 12:30 in half-hour steps; AM or PM is chosen separately.
export const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = Math.floor(i / 2) + 1
  return `${hour}:${i % 2 ? '30' : '00'}`
})

export const PERIODS = ['AM', 'PM']

// Monday first, as in the calendar. Index 0 = Monday.
export const DAYS = [
  { short: 'M', name: 'Monday' },
  { short: 'T', name: 'Tuesday' },
  { short: 'W', name: 'Wednesday' },
  { short: 'T', name: 'Thursday' },
  { short: 'F', name: 'Friday' },
  { short: 'S', name: 'Saturday' },
  { short: 'S', name: 'Sunday' },
]

// A day's log for one habit. Blank is just a day; it is never shown as missed.
export const STATUSES = {
  done: { label: 'done', legend: 'did it' },
  little: { label: 'a little', legend: 'a little' },
  shell: { label: 'shell day', legend: 'shell day' },
}

// Tapping a day or a card steps through these, back to blank.
export const NEXT_STATUS = { undefined: 'done', done: 'little', little: 'shell', shell: undefined }

export function formatTime({ time, period }) {
  return `${time} ${period}`
}

export function formatRepeat(days) {
  const sorted = [...days].sort((a, b) => a - b)
  if (sorted.length === 7) return 'every day'
  if (sorted.join() === '0,1,2,3,4') return 'weekdays'
  if (sorted.join() === '5,6') return 'weekends'
  return sorted.map((d) => DAYS[d].name.slice(0, 3)).join(', ')
}

export function formatRepeatLong(days) {
  return [...days]
    .sort((a, b) => a - b)
    .map((d) => DAYS[d].name)
    .join(', ')
}

// Monday-first weekday index (0..6) for a date.
export function weekdayIndex(date) {
  return (date.getDay() + 6) % 7
}

export function monthKey(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`
}

// Days that count as showing up: done and a little. Shell days are shown, not counted.
export function daysShownUp(log = {}, date = new Date()) {
  const month = monthKey(date)
  return Object.entries(log).filter(
    ([day, status]) => day.startsWith(month) && (status === 'done' || status === 'little'),
  ).length
}

export function formatDuration(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
