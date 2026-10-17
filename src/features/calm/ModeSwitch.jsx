import { cx } from '@/lib/faces'
import { THEME_MODES, useThemeStore } from '@/stores/useThemeStore'

// auto / light / dark, saved on this device and applied to the whole app.
export function ModeSwitch() {
  const mode = useThemeStore((state) => state.mode)
  const setMode = useThemeStore((state) => state.setMode)

  return (
    <div
      role="group"
      aria-label="light or dark"
      className="grid grid-cols-3 overflow-hidden rounded-full border-2 border-line"
    >
      {THEME_MODES.map((m) => (
        <button
          key={m}
          type="button"
          aria-pressed={mode === m}
          onClick={() => setMode(m)}
          className={cx(
            'min-h-[44px] cursor-pointer border-0 text-caption',
            mode === m ? 'bg-caramel-wash font-semibold text-ink' : 'bg-surface text-ink-muted',
          )}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
