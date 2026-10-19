import { useState } from 'react'
import { HabitTimer } from '@/features/habits/HabitTimer'
import { formatRepeatLong, formatTime, monthKey, STATUSES } from '@/lib/habitTime'

// The expanded part of a table row: more about one habit, its timer, and removing
// it (which asks for a second tap, so nothing goes by accident).
export function HabitDetails({ habit, log = {}, onSetTimer, onRemove }) {
  const [confirming, setConfirming] = useState(false)
  const month = monthKey()
  const counts = { done: 0, little: 0, shell: 0 }
  for (const [day, status] of Object.entries(log)) {
    if (day.startsWith(month)) counts[status] += 1
  }

  return (
    <div className="grid gap-24 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <dl className="m-0 grid grid-cols-[auto_minmax(0,1fr)] gap-x-16 gap-y-8 text-note">
        <dt className="text-ink-muted">Time of day</dt>
        <dd className="m-0 font-mono">{formatTime(habit)}</dd>
        <dt className="text-ink-muted">Repeats</dt>
        <dd className="m-0">{formatRepeatLong(habit.days)}</dd>
        <dt className="text-ink-muted">This month</dt>
        <dd className="m-0">
          {Object.entries(counts)
            .map(([key, n]) => `${n} ${STATUSES[key].label}`)
            .join(' · ')}
        </dd>
        <dt className="text-ink-muted">Added</dt>
        <dd className="m-0">
          {new Date(`${habit.createdAt}T00:00`).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </dd>
      </dl>

      <div className="flex flex-col gap-16">
        <HabitTimer habit={habit} onSetTimer={onSetTimer} />
        <div className="flex flex-wrap items-center gap-12">
          <button
            type="button"
            onClick={() => (confirming ? onRemove(habit.id) : setConfirming(true))}
            className="min-h-[44px] cursor-pointer rounded-sm border-2 border-line bg-butter-wash px-16 text-note text-ink"
          >
            {confirming ? `yes, remove ${habit.name}` : 'remove habit'}
          </button>
          {confirming && (
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="min-h-[44px] cursor-pointer border-0 bg-transparent px-8 text-note text-ink-muted underline underline-offset-2"
            >
              keep it
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
