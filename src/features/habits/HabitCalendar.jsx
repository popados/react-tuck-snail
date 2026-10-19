import { DAYS, daysShownUp, STATUSES, weekdayIndex } from '@/lib/habitTime'
import { cx } from '@/lib/faces'
import { todayKey } from '@/stores/useCheckinStore'

// Filled days keep a fixed dark number (on-caramel) in both themes: the fills are
// Tuck's fixed art colors, and "a little" pairs moss with the always-light
// art-ground, so the number reads across both halves.
const LITTLE_FILL = 'bg-[linear-gradient(90deg,var(--mood-okay)_50%,var(--art-ground)_50%)]'

const DAY_STYLE = {
  done: 'bg-mood-okay border-line text-on-caramel',
  little: `${LITTLE_FILL} border-line text-on-caramel`,
  shell: 'bg-mood-shell border-line text-on-caramel',
}

const LEGEND = [
  { key: 'done', swatch: 'bg-mood-okay' },
  { key: 'little', swatch: LITTLE_FILL },
  { key: 'shell', swatch: 'bg-mood-shell' },
]

// The habit card's month view: one circle per day, Monday first. Tap a past day
// to step it through did it, a little, shell day and back to blank. Blank days
// are just days; nothing is ever marked as missed.
export function HabitCalendar({ habit, log = {}, onCycle, date = new Date() }) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const monthName = date.toLocaleString('en-US', { month: 'long' })
  const today = todayKey(date)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const lead = weekdayIndex(new Date(year, month, 1))
  const shown = daysShownUp(log, date)

  return (
    <section
      aria-labelledby="habit-month"
      className="flex flex-col gap-16 rounded-xl border-2 border-line bg-surface px-24 py-20"
    >
      <h2 id="habit-month" className="m-0 text-heading">
        {habit.name}
      </h2>
      <p className="m-0 flex flex-col">
        <span className="text-display tabular-nums">{shown}</span>
        <span className="text-lead text-ink-muted">days you showed up in {monthName}</span>
      </p>

      <div
        className="grid grid-cols-7 gap-8"
        role="group"
        aria-label={`${monthName}, ${habit.name}`}
      >
        {DAYS.map((d) => (
          <span
            key={d.name}
            aria-hidden="true"
            className="text-center font-mono text-[12px] text-ink-muted"
          >
            {d.short}
          </span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={`lead-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const status = log[key]
          const future = key > today
          return (
            <button
              key={key}
              type="button"
              disabled={future}
              onClick={() => onCycle(habit.id, key)}
              aria-label={`${monthName} ${day}: ${status ? STATUSES[status].legend : 'just a day'}${key === today ? ', today' : ''}`}
              className={cx(
                'mx-auto flex aspect-square w-full max-w-[52px] cursor-pointer items-center justify-center rounded-full font-mono text-[13px] disabled:cursor-default disabled:opacity-50',
                status ? DAY_STYLE[status] : 'border-line/40 bg-surface text-ink',
                key === today ? 'border-4 border-line' : 'border-2',
              )}
            >
              {status === 'shell' ? '(@)' : day}
            </button>
          )
        })}
      </div>

      <ul className="m-0 flex list-none flex-wrap gap-x-20 gap-y-8 p-0 text-note text-ink-muted">
        {LEGEND.map((item) => (
          <li key={item.key} className="flex items-center gap-6">
            <i
              aria-hidden="true"
              className={cx('size-14 rounded-full border-2 border-line', item.swatch)}
            />
            {STATUSES[item.key].legend}
          </li>
        ))}
        <li className="flex items-center gap-6">
          <i
            aria-hidden="true"
            className="size-14 rounded-full border-2 border-line/40 bg-surface"
          />
          just a day
        </li>
      </ul>
    </section>
  )
}
