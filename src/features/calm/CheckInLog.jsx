import { Fragment, useState } from 'react'
import { CALM_MOODS, tuckForDay } from '@/features/calm/calmMoods'
import { EMOTION_GROUPS } from '@/lib/emotionGroups'
import { WeekPicker } from '@/features/calm/WeekPicker'
import { cx } from '@/lib/faces'
import { weekOf } from '@/lib/weeks'
import { recordTuck } from '@/stores/useCheckinStore'
import { useViewStore } from '@/stores/useViewStore'

const NOTE_LABEL = 'Actions, Attitudes, Behaviors, Mannerisms, Patterns'

function groupFor(id) {
  return EMOTION_GROUPS.find((g) => g.ids.includes(id) || g.more?.includes(id))
}

const TH = 'px-16 py-10 text-left text-caption font-semibold text-ink-muted'
// Fixed widths, so the columns line up from one week's table to the next.
const COLUMNS = [
  ['When', 'w-[20%]'],
  ['Emotion', 'w-[24%]'],
  ['Category', 'w-[20%]'],
  ['Saved as', 'w-[16%]'],
  ['Note', 'w-[20%]'],
]
// On phones each row becomes a small card, each cell labelled from data-label.
const TD =
  'px-16 py-10 align-middle max-sm:block max-sm:p-0 max-sm:before:block max-sm:before:text-caption max-sm:before:text-ink-muted max-sm:before:content-[attr(data-label)]'

function WeekTable({ week, items, total }) {
  const [open, setOpen] = useState(() => new Set())
  const toggle = (id) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const headingId = `week-${week}`
  const weekLabel = new Date(`${week}T00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-8">
      <h3 id={headingId} className="m-0 flex items-baseline gap-8 text-label">
        Week of {weekLabel}
        <span className="text-caption font-normal text-ink-muted">
          {items.length < total ? `${items.length} of ${total}` : total}{' '}
          {total === 1 ? 'check-in' : 'check-ins'}
        </span>
      </h3>
      <div className="overflow-x-auto rounded-lg border-2 border-line bg-surface">
        <table role="table" className="w-full table-fixed border-collapse text-body max-sm:block">
          <thead role="rowgroup" className="border-b-2 border-line max-sm:sr-only">
            <tr role="row">
              {COLUMNS.map(([h, width]) => (
                <th key={h} scope="col" role="columnheader" className={cx(TH, width)}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup" className="max-sm:block">
            {items.map((item) => {
              const tuck = recordTuck(item)
              const id = CALM_MOODS[tuck] ? tuck : tuckForDay(item.answer)
              const mood = CALM_MOODS[id]
              const group = groupFor(id)
              const when = new Date(item.at)
              const expanded = open.has(item.id)
              const noteId = `note-${item.id}`
              return (
                <Fragment key={item.id}>
                  <tr
                    role="row"
                    className="border-t border-line/40 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-16 max-sm:gap-y-10 max-sm:px-16 max-sm:pt-12 max-sm:pb-16 max-sm:first:border-t-0"
                  >
                    <td role="cell" data-label="When" className={cx(TD, 'whitespace-nowrap')}>
                      {when.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                      <span className="block text-caption text-ink-muted">
                        {when.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </span>
                    </td>
                    <td role="cell" data-label="Emotion" className={TD}>
                      {mood?.name ?? item.answer}{' '}
                      <span aria-hidden="true" className="font-mono text-mono-sm text-ink-muted">
                        {mood?.face}
                      </span>
                    </td>
                    <td role="cell" data-label="Category" className={TD}>
                      {group ? (
                        <span className="inline-flex items-center gap-8">
                          <i
                            aria-hidden="true"
                            className={cx('size-10 rounded-full', group.color)}
                          />
                          {group.label}
                        </span>
                      ) : (
                        <span className="text-ink-muted">none</span>
                      )}
                    </td>
                    <td
                      role="cell"
                      data-label="Saved as"
                      className={cx(TD, 'font-mono text-mono-sm')}
                    >
                      {item.answer}
                    </td>
                    <td role="cell" data-label="Note" className={TD}>
                      {item.note ? (
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={noteId}
                          onClick={() => toggle(item.id)}
                          className="min-h-[44px] cursor-pointer rounded-[12px] border-2 border-line bg-canvas px-12 text-note text-ink"
                        >
                          {expanded ? 'hide' : 'read'}
                          <span className="sr-only"> note from {when.toLocaleString('en-US')}</span>
                        </button>
                      ) : (
                        <span className="text-note text-ink-muted">no note</span>
                      )}
                    </td>
                  </tr>
                  {expanded && (
                    <tr role="row" id={noteId} className="bg-canvas max-sm:block">
                      <td role="cell" colSpan={5} className="px-16 pt-4 pb-16 max-sm:block">
                        <p className="m-0 text-caption text-ink-muted">{NOTE_LABEL}</p>
                        <p className="m-0 mt-4 text-body whitespace-pre-wrap">{item.note}</p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// How many check-ins stay when the weeks are closed down.
const RECENT = 3

function byWeek(items) {
  const weeks = new Map()
  for (const item of items) {
    const week = weekOf(item.day)
    if (!weeks.has(week)) weeks.set(week, [])
    weeks.get(week).push(item)
  }
  return weeks
}

// Newest date first. Two check-ins at the same time: the one added later first.
function newestFirst(log) {
  return log
    .map((item, index) => ({ item, index, time: new Date(item.at).getTime() }))
    .sort((a, b) => b.time - a.time || b.index - a.index)
    .map(({ item }) => item)
}

// "Your check-ins": every saved check-in, a week at a time, the most recent date
// at the top. A note opens with "read". The weeks can be closed down to the 3
// most recently dated check-ins; that choice is remembered on this device.
// The week button opens a month calendar that picks one week to look at.
export function CheckInLog({ log }) {
  const expanded = useViewStore((state) => state.logExpanded)
  const setExpanded = useViewStore((state) => state.setLogExpanded)
  const [selected, setSelected] = useState(null)
  const sorted = newestFirst(log)
  const days = {}
  for (const item of log) days[item.day] = (days[item.day] ?? 0) + 1
  const canClose = !selected && sorted.length > RECENT
  const showing = selected
    ? sorted.filter((item) => weekOf(item.day) === selected)
    : expanded || !canClose
      ? sorted
      : sorted.slice(0, RECENT)
  const totals = byWeek(sorted)
  // Map keeps insertion order, and showing is newest first, so the weeks are too.
  const ordered = [...byWeek(showing).entries()]

  return (
    <section aria-labelledby="check-in-log" className="flex flex-col gap-16">
      <div className="flex flex-wrap items-center justify-between gap-12">
        <h2 id="check-in-log" className="m-0 text-heading">
          Your check-ins
        </h2>
        <div className="flex flex-wrap items-center gap-12">
          <WeekPicker selected={selected} onSelect={setSelected} days={days} />
          {canClose && (
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
              className="min-h-[44px] cursor-pointer rounded-[12px] border-2 border-line bg-canvas px-12 text-note text-ink"
            >
              {expanded ? `show the ${RECENT} most recent` : `show all ${log.length}`}
            </button>
          )}
          {selected && (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="min-h-[44px] cursor-pointer rounded-[12px] border-2 border-line bg-canvas px-12 text-note text-ink"
            >
              show every week
            </button>
          )}
        </div>
      </div>
      {log.length === 0 ? (
        <p className="m-0 rounded-lg border-2 border-dashed border-line px-20 py-16 text-note text-ink-muted">
          nothing here yet. that&apos;s fine. each check-in you save shows up here, a week at a
          time.
        </p>
      ) : ordered.length === 0 ? (
        <p className="m-0 rounded-lg border-2 border-dashed border-line px-20 py-16 text-note text-ink-muted">
          no check-ins that week. that&apos;s fine.
        </p>
      ) : (
        ordered.map(([week, items]) => (
          <WeekTable key={week} week={week} items={items} total={totals.get(week).length} />
        ))
      )}
    </section>
  )
}
