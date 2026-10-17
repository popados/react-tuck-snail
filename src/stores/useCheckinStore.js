import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// Check-ins, kept in this browser's localStorage and nowhere else.
// Keyed by local date, so a new day starts with nothing selected; there is no
// streak to keep and nothing resets when a day is skipped.
// entries[day] is one of the five answers (good, okay, tired, low, shell);
// details[day] optionally names the exact Tuck picked on the calm home (e.g. 'anxious').
export function todayKey(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export const useCheckinStore = create(
  persist(
    (set) => ({
      entries: {},
      details: {},
      checkIn: (moodId, detail = null, day = todayKey()) =>
        set((state) => ({
          entries: { ...state.entries, [day]: moodId },
          details: { ...state.details, [day]: detail },
        })),
      clear: (day = todayKey()) =>
        set((state) => {
          const { [day]: _entry, ...entries } = state.entries
          const { [day]: _detail, ...details } = state.details
          return { entries, details }
        }),
    }),
    { name: 'tuck-checkin', storage: createJSONStorage(() => localStorage) },
  ),
)

// How many days this month have a check-in. Never counts what's missing.
export function daysShownUpThisMonth(entries, date = new Date()) {
  const month = todayKey(date).slice(0, 7)
  return Object.keys(entries).filter((day) => day.startsWith(month)).length
}
