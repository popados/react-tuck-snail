import { cx, faceFor, sayFace } from '@/lib/faces'

// One of Tuck's expressions: art above, name and ASCII code below. The art sits
// on an art-ground plate so its fixed dark outlines stay visible in dark mode.
// Pass art as an <img> of the matching file in public/mascot, with a real alt.
export function ExpressionCard({ mood = 'happy', name, art, className }) {
  return (
    <figure
      className={cx(
        'm-0 flex min-w-0 flex-col rounded-lg border-2 border-ink bg-surface px-20 py-16',
        className,
      )}
    >
      <div className="flex min-h-[120px] flex-1 items-center justify-center rounded-sm bg-art-ground [&_img]:block [&_img]:max-h-[150px] [&_img]:w-full">
        {art ?? (
          <span
            role="img"
            aria-label={sayFace(mood)}
            className="font-mono text-[40px] leading-none whitespace-pre text-ink"
          >
            {faceFor(mood)}
          </span>
        )}
      </div>
      <figcaption className="mt-16 flex items-baseline justify-between gap-8">
        <span className="text-label">{name ?? mood}</span>
        <code aria-hidden="true" className="font-mono text-mono-chip whitespace-pre">
          {faceFor(mood)}
        </code>
      </figcaption>
    </figure>
  )
}
