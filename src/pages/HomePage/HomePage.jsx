import { Link } from 'react-router'
import { SocialTile } from '@/components/SocialTile'
import { Terminal } from '@/components/Terminal'
import { CheckIn } from '@/features/checkin/CheckIn'
import { ExpressionGroups } from '@/features/expressions/ExpressionGroups'
import { TuckShell } from '@/features/tuckshell/TuckShell'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const TERMINAL_LINES = [
  { type: 'cmd', text: 'tuckshell log water' },
  { face: 'happy', text: 'water logged. small sips count.' },
  { type: 'gap' },
  { type: 'cmd', text: 'tuckshell today' },
  {
    face: '(@) → @_oo',
    faceLabel: 'tuck, resting, then awake',
    text: "you're back. no catching up.",
  },
]

export function HomePage() {
  useDocumentTitle()

  return (
    <div>
      <main className="mx-auto flex max-w-page flex-col gap-64 px-16 pt-32 pb-64 md:px-32">
        <section className="grid items-center gap-32 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-16">
            {/* The full pocket@shell logo (first version in
                images/icon-logo/pocket-shell-logo-preview.png), background made
                clear; the dark-band crop swaps in for dark mode. */}
            <p className="m-0">
              <img
                src="/logo/pocket-shell-logo.png"
                alt="pocket@shell"
                className="block h-[40px] w-auto md:h-[52px] dark:hidden"
              />
              <img
                src="/logo/pocket-shell-logo-dark.png"
                alt="pocket@shell"
                className="hidden h-[40px] w-auto md:h-[52px] dark:block"
              />
            </p>
            <p className="m-0 text-eyebrow text-ink-muted uppercase">Habits and mood</p>
            <h1 className="m-0 text-title md:text-display">A habit tracker with no streaks.</h1>
            <p className="m-0 max-w-[52ch] text-lead text-ink-muted">
              Tuck counts the days you showed up, never the days you didn't. Miss a week and nothing
              breaks. Slow progress is still progress.
            </p>
            <p className="m-0 text-body text-ink-muted">
              Want something quieter? <Link to="/calm">Open the calm home</Link>, a softer check-in
              for sensory-sensitive days.
            </p>
            <TuckShell />
          </div>
          <CheckIn />
          {/* Full-width row, so the art doesn't stretch the text column and
              leave empty space under the check-in card. */}
          {/* The plate carries on the scene's sky and ground (hero-scene in
              index.css), so the background fills the row, not just the art. */}
          <div className="hero-scene w-full overflow-hidden rounded-lg md:col-span-2">
            <img
              src="/mascot/tuck-hero.svg"
              alt="Tuck the snail, side view, smiling with eye stalks up, in a quiet garden"
              className="mx-auto block h-auto w-full max-w-[440px]"
            />
          </div>
        </section>

        <section aria-labelledby="expressions" className="flex flex-col gap-24">
          <div className="flex flex-col gap-6">
            <h2 id="expressions" className="m-0 text-title">
              Expressions
            </h2>
            <p className="m-0 text-body text-ink-muted">
              Grouped by what to do with the feeling. Emotion lives in the eye stalks; the shell
              never changes.
            </p>
          </div>
          <ExpressionGroups />
        </section>

        <section className="grid items-center gap-32 md:grid-cols-2">
          <div className="flex flex-col gap-16">
            <h2 className="m-0 text-title">Tuck also lives in your terminal.</h2>
            <p className="m-0 text-body text-ink-muted">
              tuckshell logs water, breaks and sleep without leaving your editor. It never shames
              you. It's a snail.
            </p>
          </div>
          <Terminal quiet lines={TERMINAL_LINES} />
        </section>

        <section className="grid items-center gap-32 md:grid-cols-2">
          <SocialTile
            signature="— tuck & sam"
            art={<img src="/mascot/tuck-tucked-white.svg" alt="Tuck tucked into its shell" />}
          />
          <div className="flex flex-col gap-16">
            <h2 className="m-0 text-title">Shell days count too.</h2>
            <p className="m-0 text-body text-ink-muted">
              Log a rest day on purpose. Tucking in is part of the plan, and Tuck is still there
              when you come back.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-line">
        <div className="mx-auto flex max-w-page flex-wrap justify-between gap-16 px-16 py-24 text-caption text-ink-muted md:px-32">
          <p className="m-0">
            pocket@shell is not a substitute for care. Need to talk to someone? Call or text{' '}
            <a href="tel:988">988</a>.
          </p>
          <p className="m-0">Made by Sam and Tuck · pocket@shell</p>
        </div>
      </footer>
    </div>
  )
}
