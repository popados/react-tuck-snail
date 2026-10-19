import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { NEXT_STATUS } from '@/lib/habitTime'
import { todayKey } from '@/stores/useCheckinStore'

// Habits and their day-by-day logs, kept in this browser's localStorage only.
// habits: [{ id, name, time: '7:30', period: 'AM' | 'PM', days: [0..6] (Mon = 0),
//            timerMinutes: number | null, createdAt: 'YYYY-MM-DD' }]
// logs:   { [habitId]: { 'YYYY-MM-DD': 'done' | 'little' | 'shell' } }
export const useHabitStore = create(
  persist(
    (set) => ({
      habits: [],
      logs: {},
      addHabit: ({ name, time, period, days }) => {
        const habit = {
          id: crypto.randomUUID(),
          name: name.trim(),
          time,
          period,
          days: [...days].sort((a, b) => a - b),
          timerMinutes: null,
          createdAt: todayKey(),
        }
        set((state) => ({ habits: [...state.habits, habit] }))
        return habit
      },
      removeHabit: (id) =>
        set((state) => {
          const { [id]: _removed, ...logs } = state.logs
          return { habits: state.habits.filter((h) => h.id !== id), logs }
        }),
      setTimer: (id, minutes) =>
        set((state) => ({
          habits: state.habits.map((h) => (h.id === id ? { ...h, timerMinutes: minutes } : h)),
        })),
      // Steps a day through blank -> done -> a little -> shell day -> blank.
      cycleDay: (id, day = todayKey()) =>
        set((state) => {
          const log = { ...state.logs[id] }
          const next = NEXT_STATUS[log[day]]
          if (next) log[day] = next
          else delete log[day]
          return { logs: { ...state.logs, [id]: log } }
        }),
    }),
    { name: 'tuck-habits', storage: createJSONStorage(() => localStorage) },
  ),
)
