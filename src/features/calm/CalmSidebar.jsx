import { TrustNote } from '@/components/TrustNote'
import { ModeSwitch } from '@/features/calm/ModeSwitch'
import { MoodPicker } from '@/features/calm/MoodPicker'

function SectionHeading({ children }) {
  return <p className="m-0 text-[12px] tracking-[0.12em] text-ink-muted uppercase">{children}</p>
}

export function CalmSidebar({ picked, onPick, shownUp, monthName }) {
  return (
    <aside
      aria-label="sidebar"
      className="flex flex-col gap-24 border-line bg-sidebar px-16 pt-20 pb-24 max-[820px]:border-b-2 min-[821px]:border-r-2 min-[821px]:px-20"
    >
      <MoodPicker picked={picked} onPick={onPick} />

      <div className="flex flex-col gap-8">
        <SectionHeading>This month</SectionHeading>
        <div className="grid gap-4 rounded-sm border-2 border-line bg-surface px-16 py-12">
          <b className="text-heading tabular-nums">{shownUp}</b>
          <span className="text-caption text-ink-muted">days you showed up in {monthName}</span>
          <span aria-hidden="true" className="font-mono text-mono-sm break-all text-ink-muted">
            {'~'.repeat(Math.max(shownUp - 1, 0))}@
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <SectionHeading>Light or dark</SectionHeading>
        <ModeSwitch />
      </div>

      <TrustNote className="mt-auto max-[820px]:mt-0">
        Stored on this device only. No account, no sync. Need to talk to someone? Call or text{' '}
        <a href="tel:988">988</a>.
      </TrustNote>
    </aside>
  )
}
