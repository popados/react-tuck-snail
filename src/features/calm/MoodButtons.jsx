import { CALM_MOODS } from '@/features/calm/calmMoods'
import { EMOTION_GROUPS } from '@/lib/emotionGroups'
import { cx } from '@/lib/faces'

// Every Tuck from the sidebar cards, plus the extra emotions in each group's
// "more" list, as quick text buttons: name then ASCII face,
// in the same groups and order (Acknowledge, Permit, Direct, Offer, Keep). Each
// group is labelled for screen readers; the face is hidden, so a button reads as
// its name.
export function MoodButtons({ picked, onPick }) {
  return (
    <div className="flex flex-col gap-12">
      {EMOTION_GROUPS.map((group) => (
        <div
          key={group.label}
          role="group"
          aria-label={`${group.label} moods`}
          className="flex flex-col gap-6 min-[600px]:flex-row min-[600px]:items-start min-[600px]:gap-12"
        >
          <p className="m-0 flex min-h-[44px] shrink-0 items-center gap-8 text-caption text-ink-muted min-[600px]:w-[104px]">
            <i aria-hidden="true" className={cx('size-10 rounded-full', group.color)} />
            {group.label}
          </p>
          <div className="flex flex-wrap gap-8">
            {[...group.ids, ...(group.more ?? [])].map((id) => {
              const mood = CALM_MOODS[id]
              const on = picked === id
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onPick(id)}
                  className={cx(
                    'inline-flex min-h-[44px] cursor-pointer items-center gap-8 rounded-[12px] border-line px-12 text-[14px] text-ink',
                    on ? 'border-[3px] bg-caramel-wash font-semibold' : 'border-2 bg-canvas',
                  )}
                >
                  {mood.name}
                  <span aria-hidden="true" className="font-mono whitespace-pre text-ink-muted">
                    {mood.face}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
