import { cx, faceFor } from '@/lib/faces'

// A check-in answer: Tuck's face plus one lowercase word. A toggle button;
// selected adds a caramel-wash fill, a 4px border and 600 weight, so the
// choice never depends on color alone. Lay chips out in a two-column grid.
export function MoodChip({
  mood,
  children,
  selected = false,
  wide = false,
  disabled = false,
  onClick,
  className,
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        'inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-8 rounded-sm border-solid font-mono text-mono-chip text-ink',
        selected
          ? 'border-4 border-ink bg-caramel-wash px-14 font-semibold'
          : 'border-2 border-ink bg-surface px-16 hover:bg-canvas',
        'disabled:cursor-default disabled:border-ink-muted disabled:text-ink-muted',
        wide && 'col-span-full w-full',
        className,
      )}
    >
      <span aria-hidden="true" className="whitespace-pre">
        {faceFor(mood)}
      </span>
      <span>{children}</span>
    </button>
  )
}
