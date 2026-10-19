import { CALM_MOODS } from '@/features/calm/calmMoods'
import { MonthLookBack } from '@/features/insights/MonthLookBack'
import { WeekLookBack } from '@/features/insights/WeekLookBack'
import { TuckShell } from '@/features/tuckshell/TuckShell'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useCheckinStore } from '@/stores/useCheckinStore'

// Insights, from the "let's look back" views in
// images/html_mockups/pocket-shell-check-in.html: this week and the month so far,
// worked out on this device from your check-ins.
export function InsightsPage() {
  useDocumentTitle('Insights')
  const entries = useCheckinStore((state) => state.entries)
  const log = useCheckinStore((state) => state.log)

  return (
    <main className="mx-auto flex w-full max-w-page flex-col gap-32 px-16 pt-24 pb-48 min-[821px]:px-32">
      <div className="flex flex-col gap-6">
        <h1 className="m-0 text-heading min-[821px]:text-title">Insights</h1>
        <p className="m-0 text-note text-ink-muted">
          Let&apos;s look back. Only the days there are; blanks are just days.
        </p>
      </div>
      <TuckShell />
      <div className="grid items-stretch gap-24 lg:grid-cols-2">
        <WeekLookBack entries={entries} log={log} moods={CALM_MOODS} />
        <MonthLookBack entries={entries} />
      </div>
    </main>
  )
}
