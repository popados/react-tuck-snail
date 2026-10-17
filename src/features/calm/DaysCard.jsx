import { BUCKET_BAR, CALM_MOODS, tuckForDay } from '@/features/calm/calmMoods'
import { cx } from '@/lib/faces'
import { todayKey } from '@/stores/useCheckinStore'

const DAY_LETTER = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

// Monday to Sunday of the week containing `now`.
function thisWeek(now) {
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7))
  return DAY_LETTER.map((letter, i) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    return { letter, key: todayKey(date) }
  })
}

// "Days you showed up": the month count and this week's check-ins, charted in
// the fixed mood colors. A day with no check-in is empty, never a "missed" mark.
export function DaysCard({ shownUp, monthName, entries, details }) {
  const today = todayKey()

  return (
    <section
      aria-labelledby="h-days"
      className="flex min-w-0 flex-col gap-12 rounded-lg border-2 border-line bg-surface px-24 py-20"
    >
      <h2 id="h-days" className="m-0 text-label">
        Days you showed up
      </h2>
      <div className="flex items-baseline gap-12">
        <span className="text-title tabular-nums">{shownUp}</span>
        <span className="text-note text-ink-muted">in {monthName}. no catching up.</span>
      </div>
      <p className="m-0 text-caption text-ink-muted">this week</p>
      <div className="grid h-[120px] grid-cols-7 items-end gap-8">
        {thisWeek(new Date()).map(({ letter, key }) => {
          const label = key === today ? 'today' : letter
          const id = tuckForDay(entries[key], details[key])
          const mood = CALM_MOODS[id]
          const bar = mood && BUCKET_BAR[mood.bucket]
          return (
            <div
              key={key}
              className="flex h-full min-w-0 flex-col items-center justify-end gap-4 font-mono text-[11px] leading-[1.1] text-ink-muted"
            >
              {bar ? (
                <>
                  <div
                    role="img"
                    aria-label={`${label}, ${mood.name}`}
                    className={cx(
                      'w-full rounded-[6px] border-2 border-line opacity-70',
                      bar.height,
                      bar.fill,
                    )}
                  />
                  <span aria-hidden="true" className="max-w-full overflow-hidden whitespace-pre">
                    {mood.face}
                  </span>
                </>
              ) : (
                <>
                  <div className="h-[10%] w-full rounded-[6px] border-2 border-dashed border-line opacity-50" />
                  <span>&nbsp;</span>
                </>
              )}
              <span>{label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
