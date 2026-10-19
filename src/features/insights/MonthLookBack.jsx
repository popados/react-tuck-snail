import { ANSWER_STYLE, monthDays } from '@/features/insights/insightsData'
import { TuckSays } from '@/features/insights/WeekLookBack'
import { cx } from '@/lib/faces'

const CARD = 'flex min-w-0 flex-col gap-16 rounded-xl border-2 border-line bg-surface px-24 py-20'
const HEADERS = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

// The month so far: one circle a day from the 1st to today, Monday first. Days
// with a check-in show their face; the rest stay blank with their date.
export function MonthLookBack({ entries, now = new Date() }) {
  const days = monthDays(entries, now)
  const count = days.filter((d) => d.answer).length
  const monthName = now.toLocaleString('en-US', { month: 'long' })
  const lead = (new Date(now.getFullYear(), now.getMonth(), 1).getDay() + 6) % 7

  return (
    <section aria-labelledby="month-h" className={CARD}>
      <h2 id="month-h" className="m-0 text-heading">
        {monthName} so far
      </h2>
      <TuckSays face="@_oo">{monthName.toLowerCase()} so far.</TuckSays>

      <div
        className="grid grid-cols-7 gap-6 text-center"
        role="img"
        aria-label={`${monthName} 1 to ${days.length}, ${count} days checked in`}
      >
        {HEADERS.map((h) => (
          <span key={h} className="font-mono text-[11px] text-ink-muted">
            {h}
          </span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={`lead-${i}`} />
        ))}
        {days.map((d) => (
          <i
            key={d.key}
            title={`${monthName} ${d.day}`}
            className={cx(
              'flex aspect-square items-center justify-center rounded-full font-mono text-[10px] not-italic',
              d.answer
                ? `border-2 border-line font-semibold ${ANSWER_STYLE[d.answer].text} ${ANSWER_STYLE[d.answer].fill}`
                : 'border-2 border-line/40 text-ink-muted',
            )}
          >
            {d.answer ? ANSWER_STYLE[d.answer].bit : d.day}
          </i>
        ))}
      </div>
      <p className="m-0 font-semibold">
        {count} {count === 1 ? 'day' : 'days'} you checked in
      </p>

      <p className="m-0 mt-auto border-t border-line/40 pt-8 text-caption text-ink-muted">
        No averages, scores, trend arrows or streaks.
      </p>
    </section>
  )
}
