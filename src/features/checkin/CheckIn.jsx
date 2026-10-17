import { useId } from 'react'
import { MoodChip } from '@/components/MoodChip'
import { TrustNote } from '@/components/TrustNote'
import { CheckInReply } from '@/features/checkin/CheckInReply'
import { MOODS, moodById } from '@/features/checkin/moods'
import { todayKey, useCheckinStore } from '@/stores/useCheckinStore'

const WEEKDAY = new Intl.DateTimeFormat('en-US', { weekday: 'long' })

// The check-in card: one question, five answers, Tuck's reply, the TrustNote.
// Tapping the chosen answer again takes it back.
export function CheckIn() {
  const headingId = useId()
  const today = todayKey()
  const selectedId = useCheckinStore((state) => state.entries[today])
  const checkIn = useCheckinStore((state) => state.checkIn)
  const clear = useCheckinStore((state) => state.clear)
  const selected = moodById(selectedId)

  return (
    <section
      aria-labelledby={headingId}
      className="flex w-full max-w-phone flex-col gap-16 rounded-xl border-2 border-ink bg-surface p-24"
    >
      <p className="m-0 text-caption text-ink-muted">{WEEKDAY.format(new Date())} · check-in</p>
      <h2 id={headingId} className="m-0 text-heading">
        How are you today?
      </h2>

      <div role="group" aria-labelledby={headingId} className="grid grid-cols-2 gap-10">
        {MOODS.map((mood) => (
          <MoodChip
            key={mood.id}
            mood={mood.face}
            wide={mood.wide}
            selected={mood.id === selectedId}
            onClick={() => (mood.id === selectedId ? clear() : checkIn(mood.id))}
          >
            {mood.word ?? mood.id}
          </MoodChip>
        ))}
      </div>

      {selected && <CheckInReply mood={selected} />}

      <TrustNote className="mt-8" />
    </section>
  )
}
