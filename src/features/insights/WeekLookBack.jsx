import {
  ANSWER_STYLE,
  ANSWERS,
  lines,
  mix,
  weekDays,
  weekGreeting,
  words,
} from '@/features/insights/insightsData'
import { cx } from '@/lib/faces'

const CARD = 'flex min-w-0 flex-col gap-16 rounded-xl border-2 border-line bg-surface px-24 py-20'

export function TuckSays({ face, children }) {
  return (
    <div className="flex items-center gap-12">
      <span
        aria-hidden="true"
        className="min-w-[72px] font-mono text-[24px] font-semibold text-caramel-text"
      >
        {face}
      </span>
      <p className="m-0 rounded-sm border-2 border-line px-12 py-8 font-mono text-mono-sm">
        {children}
      </p>
    </div>
  )
}

// The week look-back: one circle a day with its face, how many days, the mix of
// answers, your words and your lines. With under three days it shows only the
// days: no patterns and no empty charts.
export function WeekLookBack({ entries, log, moods, now = new Date() }) {
  const days = weekDays(entries, now)
  const count = days.filter((d) => d.answer).length
  const counts = mix(days)
  const most = Math.max(1, ...Object.values(counts))
  const keys = days.map((d) => d.key)
  const myWords = words(log, keys, moods)
  const myLines = lines(log, keys)
  const summary = days
    .map(
      (d) => `${d.date.toLocaleDateString('en-US', { weekday: 'long' })}: ${d.answer ?? 'blank'}`,
    )
    .join(', ')

  return (
    <section aria-labelledby="week-h" className={CARD}>
      <h2 id="week-h" className="m-0 text-heading">
        This week
      </h2>
      <TuckSays face="@_oo">{weekGreeting(count)}</TuckSays>

      <div className="grid grid-cols-7 gap-6 text-center" role="img" aria-label={summary}>
        {days.map((d) => (
          <span key={`h-${d.key}`} className="font-mono text-[11px] text-ink-muted">
            {d.short}
          </span>
        ))}
        {days.map((d) => (
          <i
            key={d.key}
            className={cx(
              'flex aspect-square items-center justify-center rounded-full font-mono text-[12px] font-semibold not-italic',
              d.answer
                ? `border-2 border-line ${ANSWER_STYLE[d.answer].text} ${ANSWER_STYLE[d.answer].fill}`
                : 'border-2 border-line/40',
            )}
          >
            {d.answer ? ANSWER_STYLE[d.answer].bit : ''}
          </i>
        ))}
      </div>
      <p className="m-0 font-semibold">
        {count} {count === 1 ? 'day' : 'days'} this week
      </p>

      {count >= 3 && (
        <>
          <ul aria-label="mood mix" className="m-0 flex list-none flex-col gap-6 p-0">
            {ANSWERS.map((a) => (
              <li
                key={a}
                className="grid grid-cols-[52px_minmax(0,1fr)_24px] items-center gap-8 font-mono text-[12px]"
              >
                <span aria-hidden="true">{ANSWER_STYLE[a].face}</span>
                <span className="block h-[14px]">
                  {counts[a] > 0 && (
                    <span
                      className={cx(
                        'block h-full rounded-[4px] border-2 border-line',
                        ANSWER_STYLE[a].fill,
                      )}
                      style={{ width: `${(counts[a] / most) * 100}%` }}
                    />
                  )}
                </span>
                <span>
                  {counts[a]}
                  <span className="sr-only"> {a}</span>
                </span>
              </li>
            ))}
          </ul>
          {myWords.length > 0 && (
            <p className="m-0 text-note">
              <b>your words</b>{' '}
              {myWords.map((w, i) => (
                <span key={w.id}>
                  {i > 0 && ' · '}
                  <span aria-hidden="true" className="font-mono">
                    {w.face}
                  </span>{' '}
                  {w.name} ×{w.count}
                </span>
              ))}
            </p>
          )}
          {myLines.length > 0 && (
            <div className="text-note">
              <b>lines for later</b>
              <ul className="m-0 list-none p-0 text-ink-muted">
                {myLines.map((l) => (
                  <li key={l.id}>
                    {l.day} · {l.note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <p className="m-0 mt-auto border-t border-line/40 pt-8 text-caption text-ink-muted">
        Worked out on this device. Nothing is sent anywhere.
      </p>
    </section>
  )
}
