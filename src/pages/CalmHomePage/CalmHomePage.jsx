import { Terminal } from '@/components/Terminal'
import { TopNav } from '@/components/TopNav'
import { CalmCheckIn } from '@/features/calm/CalmCheckIn'
import { CalmSidebar } from '@/features/calm/CalmSidebar'
import { DaysCard } from '@/features/calm/DaysCard'
import { HabitsCard } from '@/features/calm/HabitsCard'
import { ShelfCard } from '@/features/calm/ShelfCard'
import { useCalmCheckIn } from '@/features/calm/useCalmCheckIn'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

function greeting(hour) {
  if (hour < 5) return 'Still up?'
  if (hour < 12) return 'Good morning.'
  if (hour < 18) return 'Good afternoon.'
  return 'Good evening.'
}

// Tuck Calm Home: a quieter check-in in the low stimulation palette, ported from
// images/Tuck Calm Home/index.html. Sidebar of Tucks beside a check-in and quiet cards.
export function CalmHomePage() {
  useDocumentTitle('Calm home')
  const calm = useCalmCheckIn()
  const now = new Date()
  const monthName = now.toLocaleString('en-US', { month: 'long' })

  const terminalLines = [
    { type: 'cmd', text: 'tuckshell checkin tired' },
    { face: '@_--', text: 'noted. rest counts too.' },
    { type: 'cmd', text: 'tuckshell focus 25m' },
    { face: '@_==', text: "compiling. i'll wait with you." },
    { type: 'cmd', text: 'tuckshell today' },
    { face: '...@_^^', text: `${calm.shownUp} days you showed up in ${monthName.toLowerCase()}.` },
    { type: 'dim', text: '# stored in ~/.tuck, never uploaded' },
    ...calm.log,
  ].slice(-9)

  return (
    <div
      data-palette="low"
      className="flex min-h-screen flex-col bg-canvas text-ink transition-colors duration-[600ms]"
    >
      <TopNav />
      <div className="grid flex-1 min-[821px]:grid-cols-[304px_minmax(0,1fr)]">
        <CalmSidebar
          picked={calm.picked}
          onPick={calm.pick}
          shownUp={calm.shownUp}
          monthName={monthName}
        />

        <main className="flex max-w-[1180px] min-w-0 flex-col gap-24 px-16 pt-20 pb-32 min-[821px]:px-32 min-[821px]:pt-24 min-[821px]:pb-48">
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

          <Terminal quiet label="tuckshell preview" lines={terminalLines} />

          <CalmCheckIn
            picked={calm.picked}
            draft={calm.draft}
            saved={calm.saved}
            onPick={calm.pick}
            onSave={calm.save}
          />

          <div className="grid gap-20 min-[821px]:grid-cols-2">
            <DaysCard
              shownUp={calm.shownUp}
              monthName={monthName}
              entries={calm.entries}
              details={calm.details}
            />
            <HabitsCard habits={calm.habits} onToggle={calm.toggleHabit} flash={calm.flash} />
            <ShelfCard />
          </div>
        </main>
      </div>
    </div>
  )
}
