import { useState } from 'react'
import { CALM_MOODS, HABITS, tuckForDay } from '@/features/calm/calmMoods'
import { daysShownUpThisMonth, todayKey, useCheckinStore } from '@/stores/useCheckinStore'

// Everything the calm home shares between its sidebar and main column.
// A picked Tuck is a draft until saved; saving writes today's check-in to the
// same on-device store the landing page uses, so both views agree.
// Habits and the terminal log are for this visit only, as in the prototype.
export function useCalmCheckIn() {
  const today = todayKey()
  const entries = useCheckinStore((state) => state.entries)
  const details = useCheckinStore((state) => state.details)
  const checkIn = useCheckinStore((state) => state.checkIn)

  const saved = tuckForDay(entries[today], details[today])
  const [draft, setDraft] = useState(null)
  const [habits, setHabits] = useState({})
  const [flash, setFlash] = useState(null)
  const [log, setLog] = useState([])

  const picked = draft ?? saved

  function save() {
    if (!draft || draft === saved) return
    const mood = CALM_MOODS[draft]
    checkIn(mood.bucket, draft)
    setDraft(null)
    setLog((lines) => [
      ...lines,
      { type: 'cmd', text: `tuckshell checkin ${draft}` },
      { face: mood.face, text: mood.line.split(' 988')[0] },
    ])
  }

  function toggleHabit(id) {
    const habit = HABITS.find((h) => h.id === id)
    const on = !habits[id]
    setHabits((current) => ({ ...current, [id]: on }))
    setFlash(on ? `${habit.face}  ${habit.line}` : `(@)   ${id} unlogged. no harm done.`)
    setLog((lines) => [
      ...lines,
      { type: 'cmd', text: `tuckshell ${on ? 'log' : 'unlog'} ${id}` },
      on
        ? { face: habit.face, text: habit.line }
        : { face: '(@)', text: `${id} unlogged. no harm done.` },
    ])
  }

  return {
    picked,
    draft,
    saved,
    pick: (id) => setDraft(id === saved ? null : id),
    save,
    habits,
    toggleHabit,
    flash,
    log,
    entries,
    details,
    shownUp: daysShownUpThisMonth(entries),
  }
}
