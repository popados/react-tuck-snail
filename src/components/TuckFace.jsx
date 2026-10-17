import { cx, faceFor, sayFace } from '@/lib/faces'

const SIZES = {
  sm: 'text-[13px]',
  md: 'text-[15px]',
  lg: 'text-[22px]',
  xl: 'text-[40px]',
}

// Tuck's ASCII face for a mood, read aloud as words ("tuck, happy").
// Inside the terminal pass onDark (term-tuck); elsewhere it follows ink.
export function TuckFace({ mood = 'awake', size = 'md', onDark = false, label, className }) {
  return (
    <span
      role="img"
      aria-label={label ?? sayFace(mood)}
      className={cx(
        'font-mono whitespace-pre',
        SIZES[size],
        onDark ? 'text-term-tuck' : 'text-ink',
        className,
      )}
    >
      {faceFor(mood)}
    </span>
  )
}
