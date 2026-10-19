import { CalmCheckIn } from '@/features/calm/CalmCheckIn'
import { CalmSidebar } from '@/features/calm/CalmSidebar'
import { CheckInLog } from '@/features/calm/CheckInLog'
import { DaysCard } from '@/features/calm/DaysCard'
import { useCalmCheckIn } from '@/features/calm/useCalmCheckIn'
import { TuckShell } from '@/features/tuckshell/TuckShell'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useCheckinStore } from '@/stores/useCheckinStore'

function greeting(hour) {
  if (hour < 5) return 'Still up?'
  if (hour < 12) return 'Good morning.'
  if (hour < 18) return 'Good afternoon.'
  return 'Good evening.'
}

// Tuck Calm Home: a quieter check-in in the low stimulation palette, ported from
// images/Tuck Calm Home/index.html. Sidebar of Tucks beside a check-in and quiet cards.
// The tuckshell sits under the greeting; saves and habit logs print into it.
export function CalmHomePage() {
  useDocumentTitle('Calm home')
  const calm = useCalmCheckIn()
  const log = useCheckinStore((state) => state.log)
  const now = new Date()
  const monthName = now.toLocaleString('en-US', { month: 'long' })

  return (
    <div
      data-palette="low"
      className="flex flex-1 flex-col bg-canvas text-ink transition-colors duration-[600ms]"
    >
      <div className="grid flex-1 min-[821px]:grid-cols-[304px_minmax(0,1fr)]">
        <CalmSidebar
          picked={calm.picked}
          onPick={calm.pick}
          shownUp={calm.shownUp}
          monthName={monthName}
        />

        <main className="mx-auto flex w-full max-w-[1180px] min-w-0 flex-col gap-24 px-16 pt-20 pb-32 min-[821px]:px-32 min-[821px]:pt-24 min-[821px]:pb-48">
          <div className="flex flex-wrap items-baseline justify-between gap-12">
            <div>
              <p className="m-0 text-eyebrow text-ink-muted uppercase">
                {now.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <h1 className="m-0 text-heading text-balance min-[821px]:text-title">
                {greeting(now.getHours())}
              </h1>
            </div>
            <p className="m-0 text-note text-ink-muted">One tap is a whole check-in.</p>
          </div>

          <TuckShell />

          <CalmCheckIn
            picked={calm.picked}
            draft={calm.draft}
            saved={calm.saved}
            savedAs={calm.savedAs}
            onPick={calm.pick}
            onSave={calm.save}
            canSave={calm.canSave}
            note={calm.note}
            onNoteChange={calm.setNote}
          />

          <DaysCard
            shownUp={calm.shownUp}
            monthName={monthName}
            entries={calm.entries}
            details={calm.details}
          />

          <CheckInLog log={log} />
        </main>
      </div>
    </div>
  )
}
