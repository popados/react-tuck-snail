import { cx } from '@/lib/faces'

// The privacy and safety line at the foot of every check-in screen.
// Always visible on mood surfaces; 988 is one tap on a phone.
export function TrustNote({ children, className }) {
  return (
    <p className={cx('m-0 max-w-[46ch] text-caption text-ink-muted', className)}>
      {children ?? (
        <>
          Stored on this device only. Need to talk to someone? Call or text{' '}
          <a href="tel:988">988</a>.
        </>
      )}
    </p>
  )
}
