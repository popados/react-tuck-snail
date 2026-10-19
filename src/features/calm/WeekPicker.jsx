import { useEffect, useRef, useState } from 'react'
import { DAYS } from '@/lib/habitTime'
import { cx } from '@/lib/faces'
import { monthWeeks, weekOf } from '@/lib/weeks'
import { todayKey } from '@/stores/useCheckinStore'

const NAV =
  'flex size-[44px] cursor-pointer items-center justify-center rounded-[12px] border-2 border-line bg-canvas font-mono text-mono text-ink disabled:cursor-default disabled:opacity-50'

const weekName = (week) =>
  new Date(`${week}T00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

function weekDays(week) {
  const start = new Date(`${week}T00:00`)
  return Array.from({ length: 7 }, (_, i) =>
    todayKey(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)),
  )
}

function Day({ day, checkedIn, muted, today, size = 'max-w-[36px] text-[13px]' }) {
  return (
    <span
      className={cx(
        'mx-auto flex aspect-square w-full items-center justify-center rounded-full font-mono',
        size,
        checkedIn ? 'border-2 border-line bg-mood-okay text-on-caramel' : 'text-ink',
        muted && !checkedIn && 'text-ink-muted opacity-60',
        today && !checkedIn && 'border-2 border-line',
      )}
    >
      {Number(day.slice(8))}
    </span>
  )
}

// The week being looked at (or this week), as a button. It opens a month
// calendar, one row per week: pick a row to see that week's check-ins, pick it
// again (or "every week") to go back. Days with a check-in are filled in.
export function WeekPicker({ selected, onSelect, days }) {
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(() => new Date())
  const wrap = useRef(null)
  const trigger = useRef(null)
  const today = todayKey()
  const shownWeek = selected ?? weekOf(today)

  useEffect(() => {
    if (!open) return undefined
    const onPointer = (event) => {
      if (!wrap.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggleOpen = () => {
    if (!open) {
      const start = new Date(`${shownWeek}T00:00`)
      setMonth(new Date(start.getFullYear(), start.getMonth(), 1))
    }
    setOpen(!open)
  }
  const pick = (week) => {
    onSelect(week)
    setOpen(false)
    trigger.current?.focus()
  }

  const year = month.getFullYear()
  const index = month.getMonth()
  const monthName = month.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const atThisMonth = todayKey(month).slice(0, 7) >= today.slice(0, 7)
  const step = (by) => setMonth(new Date(year, index + by, 1))

  return (
    <div ref={wrap} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        aria-label={`pick a week, showing ${selected ? `week of ${weekName(selected)}` : 'every week'}`}
        aria-expanded={open}
        onClick={toggleOpen}
        className="flex min-h-[44px] cursor-pointer items-center gap-12 rounded-[12px] border-2 border-line bg-canvas px-12 py-4 text-note text-ink"
      >
        <span className="whitespace-nowrap">
          {selected ? `week of ${weekName(selected)}` : 'every week'}
        </span>
        <span aria-hidden="true" className="grid w-[168px] grid-cols-7 gap-2">
          {weekDays(shownWeek).map((day) => (
            <Day
              key={day}
              day={day}
              checkedIn={Boolean(days[day])}
              today={day === today}
              size="max-w-[22px] text-[10px]"
            />
          ))}
        </span>
        <span aria-hidden="true" className="font-mono text-ink-muted">
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Pick a week"
          className="absolute top-full left-0 z-20 sm:right-0 sm:left-auto mt-8 flex w-[320px] max-w-[calc(100vw-32px)] flex-col gap-12 rounded-xl border-2 border-line bg-surface p-16"
        >
          <div className="flex items-center justify-between gap-8">
            <button
              type="button"
              aria-label="previous month"
              onClick={() => step(-1)}
              className={NAV}
            >
              &lsaquo;
            </button>
            <p className="m-0 text-label font-semibold">{monthName}</p>
            <button
              type="button"
              aria-label="next month"
              disabled={atThisMonth}
              onClick={() => step(1)}
              className={NAV}
            >
              &rsaquo;
            </button>
          </div>

          <div aria-hidden="true" className="grid grid-cols-7 gap-4 px-6">
            {DAYS.map((d) => (
              <span key={d.name} className="text-center font-mono text-[12px] text-ink-muted">
                {d.short}
              </span>
            ))}
          </div>

          <div role="group" aria-label={`Weeks in ${monthName}`} className="flex flex-col gap-4">
            {monthWeeks(year, index).map(({ week, days: inWeek }) => {
              const count = inWeek.reduce((n, key) => n + (days[key] ?? 0), 0)
              const isSelected = week === selected
              return (
                <button
                  key={week}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Week of ${weekName(week)}, ${count} ${count === 1 ? 'check-in' : 'check-ins'}`}
                  onClick={() => pick(isSelected ? null : week)}
                  className={cx(
                    'grid cursor-pointer grid-cols-7 gap-4 rounded-[12px] border-2 p-4',
                    isSelected
                      ? 'border-line bg-caramel-wash'
                      : 'border-transparent bg-transparent',
                  )}
                >
                  {inWeek.map((key) => (
                    <Day
                      key={key}
                      day={key}
                      checkedIn={Boolean(days[key])}
                      muted={Number(key.slice(5, 7)) !== index + 1}
                      today={key === today}
                    />
                  ))}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-8">
            <p className="m-0 flex items-center gap-6 text-caption text-ink-muted">
              <i
                aria-hidden="true"
                className="size-12 rounded-full border-2 border-line bg-mood-okay"
              />
              checked in
            </p>
            <button
              type="button"
              aria-pressed={!selected}
              onClick={() => pick(null)}
              className="min-h-[44px] cursor-pointer rounded-[12px] border-2 border-line bg-canvas px-12 text-note text-ink"
            >
              every week
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
