import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// Check-ins, kept in this browser's localStorage and nowhere else.
//
// log is every check-in, in the order it was made, stored as the record in
// images/html_mockups/pocket-shell-check-in.html ("what gets saved"):
//   {
//     id,                         // for telling rows apart
//     at: '2026-10-18T21:40:00-04:00',   // local time with its offset
//     day: '2026-10-18',
//     answer: 'good' | 'okay' | 'tired' | 'low' | 'shell',
//     answerIntensity: 1-5 | null,       // not asked yet, so null
//     words: [{ word: 'overwhelmed', intensity: 1-5 | null }],
//     tags: [],                           // not asked yet
//     note: 'deadline moved up. bed late.',
//     from: 'pocket@shell',
//   }
//
// entries and details are a per-day index of that log, for today's answer and
// the charts: entries[day] is the day's latest answer; details[day] the exact
// Tuck picked on the Emotional Check page (e.g. 'anxious'), if any.
// Keyed by local date, so a new day starts with nothing selected; there is no
// streak to keep and nothing resets when a day is skipped.

export function todayKey(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// ISO time in local time with its UTC offset, e.g. 2026-10-18T21:40:00-04:00.
export function localIso(date = new Date()) {
  const pad = (n) => String(Math.trunc(Math.abs(n))).padStart(2, '0')
  const offset = -date.getTimezoneOffset()
  const sign = offset >= 0 ? '+' : '-'
  return (
    `${todayKey(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    `${sign}${pad(offset / 60)}:${pad(offset % 60)}`
  )
}

// The Tuck that stands for each plain answer. Picking one of these adds no
// extra word; any other Tuck is saved as a word.
const PLAIN_TUCK = { good: 'happy', okay: 'okay', tired: 'tired', low: 'sad', shell: 'shell' }

export function wordsFor(answer, detail) {
  return detail && detail !== PLAIN_TUCK[answer] ? [{ word: detail, intensity: null }] : []
}

export function makeRecord({
  answer,
  detail = null,
  note = '',
  day = todayKey(),
  at = new Date(),
}) {
  return {
    id: crypto.randomUUID(),
    at: localIso(at),
    day,
    answer,
    answerIntensity: null,
    words: wordsFor(answer, detail),
    tags: [],
    note: note.trim(),
    from: 'pocket@shell',
  }
}

// Version 1 records follow the mockup. Version 0 records were
// { id, at, day, answer, detail, note }; migrate converts them.
export function migrateCheckins(persisted, version) {
  if (version >= 1 || !persisted) return persisted
  return {
    ...persisted,
    log: (persisted.log ?? []).map(({ detail, ...old }) => ({
      id: old.id,
      at: old.at ? localIso(new Date(old.at)) : localIso(new Date(`${old.day}T12:00`)),
      day: old.day,
      answer: old.answer,
      answerIntensity: null,
      words: wordsFor(old.answer, detail),
      tags: [],
      note: old.note ?? '',
      from: 'pocket@shell',
    })),
  }
}

export const useCheckinStore = create(
  persist(
    (set) => ({
      entries: {},
      details: {},
      log: [],
      checkIn: (answer, detail = null, note = '', day = todayKey()) =>
        set((state) => ({
          entries: { ...state.entries, [day]: answer },
          details: { ...state.details, [day]: detail },
          log: [...state.log, makeRecord({ answer, detail, note, day })],
        })),
      // Takes back a day's check-in, and its most recent record.
      clear: (day = todayKey()) =>
        set((state) => {
          const { [day]: _entry, ...entries } = state.entries
          const { [day]: _detail, ...details } = state.details
          const last = state.log.findLastIndex((item) => item.day === day)
          const log = last < 0 ? state.log : state.log.filter((_, i) => i !== last)
          return { entries, details, log }
        }),
    }),
    {
      name: 'tuck-checkin',
      version: 1,
      migrate: migrateCheckins,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// The Tuck a record shows: its first word if there is one, otherwise the plain
// Tuck for its answer.
export function recordTuck(record) {
  return record.words?.[0]?.word ?? PLAIN_TUCK[record.answer]
}

// How many days this month have a check-in. Never counts what's missing.
export function daysShownUpThisMonth(entries, date = new Date()) {
  const month = todayKey(date).slice(0, 7)
  return Object.keys(entries).filter((day) => day.startsWith(month)).length
}
