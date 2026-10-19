import { useState } from 'react'
import { CALM_MOODS, tuckForDay } from '@/features/calm/calmMoods'
import { daysShownUpThisMonth, todayKey, useCheckinStore } from '@/stores/useCheckinStore'
import { useShellStore } from '@/stores/useShellStore'

// Everything the calm home shares between its sidebar and main column.
// A picked Tuck is a draft until saved; saving writes today's check-in to the
// same on-device store the landing page uses, so both views agree.
// Saves also print into the shared tuckshell. (Small things moved to the Habits page.)
export function useCalmCheckIn() {
  const today = todayKey()
  const entries = useCheckinStore((state) => state.entries)
  const details = useCheckinStore((state) => state.details)
  const checkIn = useCheckinStore((state) => state.checkIn)

  const saved = tuckForDay(entries[today], details[today])
  // What today's check-in was saved as, and when (its latest log entry).
  const lastToday = useCheckinStore((state) => state.log.findLast((item) => item.day === today))
  const savedAs = entries[today] ? { answer: entries[today], at: lastToday?.at ?? null } : null
  const [draft, setDraft] = useState(null)
  const [note, setNote] = useState('')
  const print = useShellStore((state) => state.push)

  const picked = draft ?? saved
  // A new Tuck can be saved; so can a note on today's Tuck, as another log entry.
  const canSave = Boolean(picked) && ((draft && draft !== saved) || note.trim() !== '')

  function save() {
    if (!canSave) return
    const mood = CALM_MOODS[picked]
    checkIn(mood.bucket, picked, note)
    setDraft(null)
    setNote('')
    print(
      { type: 'cmd', text: `checkin ${picked}` },
      { face: mood.face, text: mood.line.split(' 988')[0] },
    )
  }

  return {
    savedAs,
    picked,
    draft,
    saved,
    pick: (id) => setDraft(id === saved ? null : id),
    save,
    canSave,
    note,
    setNote,
    entries,
    details,
    shownUp: daysShownUpThisMonth(entries),
  }
}
