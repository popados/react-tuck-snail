import { cx, faceFor, sayFace } from '@/lib/faces'

const DOTS = ['bg-blush', 'bg-butter', 'bg-moss']

// One line of terminal output; shared with the interactive TuckShell.
export function TerminalLine({ type, face, faceLabel, text }) {
  if (type === 'cmd') return <div>{`$ ${text}`}</div>
  if (type === 'gap') return <div className="h-[1.6em]" />
  if (type === 'dim') return <div className="text-term-dim">{text}</div>
  return (
    <div>
      {face && (
        <>
          <span role="img" aria-label={faceLabel ?? sayFace(face)} className="text-term-tuck">
            {faceFor(face)}
          </span>
          {'  '}
        </>
      )}
      {text}
    </div>
  )
}

// The tuckshell window. Looks the same in both themes. The body is a focusable,
// labelled region so long lines scroll inside it and never widen the page.
// lines: [{ type: 'cmd' | 'out' | 'dim' | 'gap', face, faceLabel, text }]
// quiet greys out the window dots, for the low stimulation palette.
export function Terminal({
  path = '~/tuck',
  label,
  lines = [],
  quiet = false,
  children,
  className,
}) {
  return (
    <div
      className={cx(
        'max-w-full min-w-0 overflow-hidden rounded-md border-2 border-term-edge bg-term-bg font-mono text-mono text-term-text',
        className,
      )}
    >
      <div className="flex items-center gap-8 bg-term-bar px-16 py-12">
        <span aria-hidden="true" className="flex gap-8">
          {DOTS.map((dot) => (
            <span
              key={dot}
              className={cx('size-12 rounded-full', quiet ? 'bg-term-dim opacity-60' : dot)}
            />
          ))}
        </span>
        <span className="ml-10 text-mono-sm text-term-dim">{path}</span>
      </div>
      <div
        role="region"
        tabIndex={0}
        aria-label={label ?? `terminal, ${path}`}
        className="overflow-x-auto px-20 pt-20 pb-24 whitespace-pre focus-visible:outline-term-text focus-visible:-outline-offset-4"
      >
        {lines.map((line, i) => (
          <TerminalLine key={i} {...line} />
        ))}
        {children}
      </div>
    </div>
  )
}
