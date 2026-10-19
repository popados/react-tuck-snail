import { CALM_MOODS, art } from '@/features/calm/calmMoods'
import { EMOTION_GROUPS } from '@/lib/emotionGroups'
import { cx } from '@/lib/faces'

// "How are you feeling?": the Tucks in the sidebar groups (Acknowledge, Permit,
// Direct, Offer, Keep), each a toggle button.
// The art is decorative here; the name is the button's label.
export function MoodPicker({ picked, onPick }) {
  return (
    <div role="group" aria-labelledby="feel-h" className="flex flex-col gap-8">
      <p id="feel-h" className="m-0 text-[20px] leading-[1.2] font-extrabold">
        How are you feeling?
      </p>
      <p className="m-0 text-caption text-ink-muted">
        Pick the Tuck that looks most like today. It fills in the check-in.
      </p>
      <div className="mt-6 flex flex-col gap-16">
        {EMOTION_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-6">
            <p className="m-0 flex items-center gap-8 text-caption text-ink-muted">
              <i aria-hidden="true" className={cx('size-10 rounded-full', group.color)} />
              {group.label}
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-8 min-[821px]:grid-cols-2">
              {group.ids.map((id) => {
                const mood = CALM_MOODS[id]
                const on = picked === id
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={on}
                    aria-label={mood.name}
                    onClick={() => onPick(id)}
                    className={cx(
                      'flex min-w-0 cursor-pointer flex-col items-stretch gap-2 rounded-sm border-line text-left text-ink',
                      on
                        ? 'border-4 bg-caramel-wash px-4 pt-4 pb-6 font-semibold'
                        : 'border-2 bg-surface px-6 pt-6 pb-8 hover:bg-canvas',
                    )}
                  >
                    <span className="rounded-[10px] bg-art-ground leading-none">
                      <img
                        src={art(mood.img)}
                        alt=""
                        className="block aspect-[200/140] h-auto w-full"
                      />
                    </span>
                    <span className="px-4 pt-2 text-[14px]">{mood.name}</span>
                    <span
                      aria-hidden="true"
                      className={cx(
                        'px-4 font-mono text-[12px] leading-[1.2] whitespace-pre',
                        on ? 'text-ink' : 'text-ink-muted',
                      )}
                    >
                      {mood.face}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
