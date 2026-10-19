import { todayKey } from '@/stores/useCheckinStore'

// Looking back, worked out on this device from the check-in store. No averages,
// scores, trend arrows or streaks: only the days there are.

export const ANSWERS = ['good', 'okay', 'tired', 'low', 'shell']

// What a day's circle shows, its fill (the fixed mood scale), the text color on
// that fill (light only on the dark slate of low), and the full face.
export const ANSWER_STYLE = {
  good: { bit: '^^', face: '@_^^', fill: 'bg-mood-good', text: 'text-on-caramel' },
  okay: { bit: 'oo', face: '@_oo', fill: 'bg-mood-okay', text: 'text-on-caramel' },
  tired: { bit: '--', face: '@_--', fill: 'bg-mood-tired', text: 'text-on-caramel' },
  low: { bit: ';;', face: '@_;;', fill: 'bg-mood-low', text: 'text-term-text' },
  shell: { bit: '(@)', face: '(@)', fill: 'bg-mood-shell', text: 'text-on-caramel' },
}

const SHORT = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

// Monday to Sunday of the week containing `now`, each with its saved answer.
export function weekDays(entries, now = new Date()) {
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7))
  return SHORT.map((short, i) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    const key = todayKey(date)
    return { key, short, date, answer: entries[key] ?? null }
  })
}

// Day 1 of this month up to today, each with its saved answer.
export function monthDays(entries, now = new Date()) {
  return Array.from({ length: now.getDate() }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), i + 1)
    const key = todayKey(date)
    return { key, day: i + 1, date, answer: entries[key] ?? null }
  })
}

export function mix(days) {
  const counts = Object.fromEntries(ANSWERS.map((a) => [a, 0]))
  for (const d of days) if (d.answer) counts[d.answer] += 1
  return counts
}

// The words saved with this week's check-ins (the Tucks beyond the five
// answers), most first.
export function words(log, keys, moods) {
  const inWeek = new Set(keys)
  const counts = new Map()
  for (const item of log) {
    if (!inWeek.has(item.day)) continue
    for (const { word } of item.words ?? []) counts.set(word, (counts.get(word) ?? 0) + 1)
  }
  return [...counts.entries()]
    .filter(([id]) => moods[id])
    .sort((a, b) => b[1] - a[1])
    .map(([id, count]) => ({ id, count, name: moods[id].name.toLowerCase(), face: moods[id].face }))
}

// Notes written this week, in the order they were added.
export function lines(log, keys) {
  const inWeek = new Set(keys)
  return log
    .filter((item) => inWeek.has(item.day) && item.note)
    .map((item) => ({
      id: item.id,
      day: new Date(`${item.day}T00:00`)
        .toLocaleDateString('en-US', { weekday: 'short' })
        .toLowerCase(),
      note: item.note,
    }))
}

// Tuck's opening line for the week, never comparing or grading.
export function weekGreeting(count) {
  if (count === 0) return "nothing to look back on yet. that's fine."
  if (count < 3) return `${count === 1 ? 'one day' : 'two days'} so far. that's plenty to look at.`
  return "let's look back. no grades."
}
