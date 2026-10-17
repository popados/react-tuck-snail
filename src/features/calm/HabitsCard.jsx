import { HABITS, art } from '@/features/calm/calmMoods'
import { cx } from '@/lib/faces'

// "Small things": one tap logs a habit, a second tap takes it back, gently.
export function HabitsCard({ habits, onToggle, flash }) {
  return (
    <section
      aria-labelledby="h-small"
      className="flex min-w-0 flex-col gap-12 rounded-lg border-2 border-line bg-surface px-24 py-20"
    >
      <h2 id="h-small" className="m-0 text-label">
        Small things
      </h2>
      <ul className="m-0 grid list-none p-0">
        {HABITS.map((habit, i) => {
          const on = Boolean(habits[habit.id])
          return (
            <li
              key={habit.id}
              className={cx(
                'grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-12 py-8',
                i > 0 && 'border-t border-line/35',
                i === 0 && 'pt-0',
              )}
            >
              <span className="overflow-hidden rounded-[10px] bg-art-ground leading-none">
                <img src={art(habit.scene)} alt={habit.alt} className="block h-auto w-full" />
              </span>
              <div>
                <b className="font-semibold">{habit.id}</b>
                <span className="block text-caption text-ink-muted">{habit.hint}</span>
              </div>
              <button
                type="button"
                aria-pressed={on}
                aria-label={`log ${habit.id}`}
                onClick={() => onToggle(habit.id)}
                className={cx(
                  'min-h-[44px] min-w-[72px] cursor-pointer rounded-[12px] border-line px-12 font-mono text-[14px] text-ink',
                  on ? 'border-[3px] bg-caramel-wash font-semibold' : 'border-2 bg-canvas',
                )}
              >
                {on ? 'logged' : 'log'}
              </button>
            </li>
          )
        })}
      </ul>
      <p
        role="status"
        hidden={!flash}
        className="m-0 rounded-[12px] bg-moss-wash px-12 py-10 font-mono text-[14px] leading-[1.45] whitespace-pre-wrap"
      >
        {flash}
      </p>
    </section>
  )
}
