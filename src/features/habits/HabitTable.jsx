import { Fragment, useState } from 'react'
import { HabitDetails } from '@/features/habits/HabitDetails'
import { daysShownUp, formatRepeat, formatTime, STATUSES } from '@/lib/habitTime'
import { cx } from '@/lib/faces'
import { todayKey } from '@/stores/useCheckinStore'

const TH = 'px-16 py-12 text-left text-caption font-semibold text-ink-muted'
// On phones (below sm) each row turns into a small card: the column headers are
// hidden visually and every cell shows its own label from data-label instead.
const TD =
  'px-16 py-12 align-middle max-sm:block max-sm:p-0 max-sm:before:block max-sm:before:text-caption max-sm:before:text-ink-muted max-sm:before:content-[attr(data-label)]'

// Every habit in a table, one row each. The first cell's button expands the row
// to its details: when it repeats, this month's log, the timer, and removing it.
export function HabitTable({ habits, logs, onSelect, onCycle, onSetTimer, onRemove }) {
  const [open, setOpen] = useState(() => new Set())
  const today = todayKey()

  function toggle(id) {
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    onSelect(id)
  }

  return (
    <section aria-labelledby="habit-log" className="flex flex-col gap-12">
      <h2 id="habit-log" className="m-0 text-heading">
        Your habits
      </h2>
      {habits.length === 0 ? (
        <p className="m-0 rounded-lg border-2 border-dashed border-line px-20 py-16 text-note text-ink-muted">
          nothing here yet. that&apos;s fine. add a little thing and it shows up here.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border-2 border-line bg-surface">
          <table role="table" className="w-full border-collapse text-body max-sm:block">
            <thead role="rowgroup" className="border-b-2 border-line max-sm:sr-only">
              <tr>
                <th scope="col" role="columnheader" className={TH}>
                  Habit
                </th>
                <th scope="col" role="columnheader" className={TH}>
                  Time
                </th>
                <th scope="col" role="columnheader" className={TH}>
                  Repeats
                </th>
                <th scope="col" role="columnheader" className={TH}>
                  Timer
                </th>
                <th scope="col" role="columnheader" className={TH}>
                  This month
                </th>
                <th scope="col" role="columnheader" className={TH}>
                  Today
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="max-sm:block">
              {habits.map((habit) => {
                const expanded = open.has(habit.id)
                const status = logs[habit.id]?.[today]
                const detailsId = `habit-details-${habit.id}`
                return (
                  <Fragment key={habit.id}>
                    <tr
                      role="row"
                      className={cx(
                        'border-t border-line/40 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-16 max-sm:gap-y-10 max-sm:px-16 max-sm:pt-8 max-sm:pb-16 max-sm:first:border-t-0',
                        expanded && 'bg-canvas',
                      )}
                    >
                      <th
                        scope="row"
                        role="rowheader"
                        className="px-16 py-12 text-left align-middle font-semibold max-sm:col-span-2 max-sm:block max-sm:p-0"
                      >
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={detailsId}
                          onClick={() => toggle(habit.id)}
                          className="flex min-h-[44px] cursor-pointer items-center gap-8 border-0 bg-transparent p-0 text-left text-body font-semibold text-ink"
                        >
                          <span aria-hidden="true" className="w-[1ch] font-mono text-ink-muted">
                            {expanded ? '-' : '+'}
                          </span>
                          {habit.name}
                        </button>
                      </th>
                      <td
                        data-label="Time"
                        className={cx(TD, 'font-mono text-mono whitespace-nowrap')}
                      >
                        {formatTime(habit)}
                      </td>
                      <td role="cell" data-label="Repeats" className={TD}>
                        {formatRepeat(habit.days)}
                        <span className="block text-caption text-ink-muted">
                          {habit.days.length}× a week
                        </span>
                      </td>
                      <td role="cell" data-label="Timer" className={cx(TD, 'text-ink-muted')}>
                        {habit.timerMinutes ? `${habit.timerMinutes} min` : 'none yet'}
                      </td>
                      <td role="cell" data-label="This month" className={cx(TD, 'tabular-nums')}>
                        {daysShownUp(logs[habit.id])} days
                      </td>
                      <td role="cell" data-label="Today" className={TD}>
                        <button
                          type="button"
                          onClick={() => onCycle(habit.id)}
                          aria-label={`${habit.name}, today: ${status ? STATUSES[status].label : 'not logged'}. tap to change.`}
                          className={cx(
                            'min-h-[44px] min-w-[96px] cursor-pointer rounded-[12px] border-line px-12 font-mono text-[14px] text-ink',
                            status
                              ? 'border-[3px] bg-caramel-wash font-semibold'
                              : 'border-2 bg-canvas',
                          )}
                        >
                          {status ? STATUSES[status].label : 'log'}
                        </button>
                      </td>
                    </tr>
                    {expanded && (
                      <tr role="row" id={detailsId} className="bg-canvas max-sm:block">
                        <td role="cell" colSpan={6} className="px-16 pt-4 pb-20 max-sm:block">
                          <HabitDetails
                            habit={habit}
                            log={logs[habit.id]}
                            onSetTimer={onSetTimer}
                            onRemove={onRemove}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
