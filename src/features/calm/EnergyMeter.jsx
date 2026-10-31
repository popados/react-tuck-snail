import { cx } from '@/lib/faces'

// Highest first, so the stack reads like a meter filling from the bottom.
export const ENERGY_LEVELS = [
  { level: 5, label: 'full tank' },
  { level: 4, label: 'plenty' },
  { level: 3, label: 'some' },
  { level: 2, label: 'a little' },
  { level: 1, label: 'running low' },
]

export const energyLabel = (level) => ENERGY_LEVELS.find((e) => e.level === level)?.label

// How much energy today, 1 to 5, as a stack of buttons. Every level up to the
// picked one fills in, like a meter; the picked one also gets the outline and
// weight. Picking it again clears it. Optional, and saved with the check-in.
export function EnergyMeter({ value, onChange }) {
  return (
    <div role="group" aria-labelledby="energy-label" className="flex flex-col gap-6">
      <p id="energy-label" className="m-0 text-note font-semibold">
        Energy <span className="font-normal text-ink-muted">(optional)</span>
      </p>
      {ENERGY_LEVELS.map(({ level, label }) => {
        const filled = value !== null && level <= value
        const picked = level === value
        return (
          <button
            key={level}
            type="button"
            aria-pressed={picked}
            aria-label={`Energy ${level} of 5, ${label}`}
            onClick={() => onChange(level)}
            className={cx(
              'flex min-h-[44px] cursor-pointer items-center gap-12 rounded-[12px] border-2 px-12 text-left text-note',
              filled ? 'bg-mood-okay text-on-caramel' : 'bg-canvas text-ink',
              picked ? 'border-line font-semibold' : 'border-line/40',
            )}
          >
            <span aria-hidden="true" className="w-[1ch] font-mono text-mono">
              {level}
            </span>
            {label}
          </button>
        )
      })}
    </div>
  )
}
