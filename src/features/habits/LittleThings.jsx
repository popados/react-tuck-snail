import { daysShownUp, formatTime, STATUSES } from '@/lib/habitTime'
import { cx } from '@/lib/faces'
import { todayKey } from '@/stores/useCheckinStore'

const TODAY_FILL = {
  done: 'bg-moss-wash',
  little: 'bg-[linear-gradient(90deg,var(--moss-wash)_50%,var(--surface)_50%)]',
  shell: 'bg-caramel-wash',
}

// "Little things": one card per habit. Tapping steps today through done, a little,
// shell day and back to blank. The selected card's month shows in the calendar.
export function LittleThings({ habits, logs, selectedId, onSelect, onCycle, onAdd, adding }) {
  const today = todayKey()

  return (
    <section aria-labelledby="little-things" className="flex flex-col gap-12">
      <h2 id="little-things" className="m-0 text-heading">
        Little things
      </h2>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-16 p-0">
        {habits.map((habit) => {
          const status = logs[habit.id]?.[today]
          const shown = daysShownUp(logs[habit.id])
          return (
            <li key={habit.id}>
              <button
                type="button"
                onClick={() => {
                  onCycle(habit.id)
                  onSelect(habit.id)
                }}
                aria-label={`${habit.name}, today: ${status ? STATUSES[status].label : 'not logged'}. tap to change.`}
                className={cx(
                  'flex min-h-[112px] w-full cursor-pointer flex-col gap-6 rounded-lg border-2 border-line px-20 py-16 text-left text-ink',
                  status ? TODAY_FILL[status] : 'bg-surface hover:bg-canvas',
                  habit.id === selectedId && 'border-4 px-18 py-14',
                )}
              >
                <span className="flex items-baseline justify-between gap-8">
                  <span className="text-heading">{habit.name}</span>
                  {status && (
                    <span className="font-mono text-mono-sm">{STATUSES[status].label}</span>
                  )}
                </span>
                <span className="text-note text-ink-muted">
                  {shown} {shown === 1 ? 'day' : 'days'} this month · {formatTime(habit)}
                </span>
              </button>
            </li>
          )
        })}
        {!adding && (
          <li>
            <button
              type="button"
              onClick={onAdd}
              className="flex min-h-[112px] w-full cursor-pointer items-center rounded-lg border-2 border-dashed border-line bg-transparent px-20 text-left text-heading font-normal text-ink-muted hover:bg-surface"
            >
              + add a little thing
            </button>
          </li>
        )}
      </ul>
    </section>
  )
}
