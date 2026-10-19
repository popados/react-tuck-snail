import { useState } from 'react'
import { cx } from '@/lib/faces'
import { useShellStore } from '@/stores/useShellStore'

// The four small things from the calm home prototype. Logged for this visit
// only; each log (and un-log) also prints into the tuckshell.
const SMALL_THINGS = [
  {
    id: 'water',
    hint: 'a glass or a sip',
    face: '@_o?',
    line: 'water logged. small sips count.',
    scene: 'tuck-scene-water-break',
    alt: 'Tuck looking up at a glass of water',
  },
  {
    id: 'walk',
    hint: 'any pace, any length',
    face: '...@_^^',
    line: 'walk logged. snail pace is a pace.',
    scene: 'tuck-scene-trail',
    alt: 'Tuck in a pink scarf leaning forward',
  },
  {
    id: 'sleep',
    hint: 'screens off by 11',
    face: '@_--',
    line: 'noted. the code will still be here tomorrow.',
    scene: 'tuck-scene-bedtime',
    alt: 'Sleepy Tuck under a moon beside a closed laptop',
  },
  {
    id: 'break',
    hint: 'stretch, look away',
    face: '@_uu',
    line: 'break logged. good call.',
    scene: 'tuck-scene-still-water',
    alt: 'Tuck sitting calmly by still water',
  },
]

// "Small things", a full-width row: four quick logs side by side on wide
// screens, two on tablets, one per line on phones. One tap logs, a second tap
// takes it back, gently.
export function SmallThings() {
  const [logged, setLogged] = useState({})
  const [flash, setFlash] = useState(null)
  const print = useShellStore((state) => state.push)

  function toggle(thing) {
    const on = !logged[thing.id]
    setLogged((current) => ({ ...current, [thing.id]: on }))
    setFlash(on ? `${thing.face}  ${thing.line}` : `(@)   ${thing.id} unlogged. no harm done.`)
    print(
      { type: 'cmd', text: `${on ? 'log' : 'unlog'} ${thing.id}` },
      on
        ? { face: thing.face, text: thing.line }
        : { face: '(@)', text: `${thing.id} unlogged. no harm done.` },
    )
  }

  return (
    <section
      aria-labelledby="h-small"
      className="flex w-full min-w-0 flex-col gap-16 rounded-lg border-2 border-line bg-surface px-24 py-20"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-8">
        <h2 id="h-small" className="m-0 text-heading">
          Small things
        </h2>
        <p className="m-0 text-caption text-ink-muted">
          for today only. tap again to take it back.
        </p>
      </div>
      <ul className="m-0 grid list-none grid-cols-1 gap-16 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {SMALL_THINGS.map((thing) => {
          const on = Boolean(logged[thing.id])
          return (
            <li
              key={thing.id}
              className={cx(
                'flex min-w-0 flex-col gap-12 rounded-md border-2 border-line p-12',
                on ? 'bg-moss-wash' : 'bg-canvas',
              )}
            >
              <span className="overflow-hidden rounded-sm bg-art-ground leading-none">
                <img
                  src={`/mascot/${thing.scene}.svg`}
                  alt={thing.alt}
                  className="block aspect-[200/140] h-auto w-full object-contain"
                />
              </span>
              <div className="flex items-center justify-between gap-12">
                <div className="min-w-0">
                  <b className="block font-semibold">{thing.id}</b>
                  <span className="block text-caption text-ink-muted">{thing.hint}</span>
                </div>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-label={`log ${thing.id}`}
                  onClick={() => toggle(thing)}
                  className={cx(
                    'min-h-[44px] min-w-[72px] shrink-0 cursor-pointer rounded-[12px] border-line px-12 font-mono text-[14px] text-ink',
                    on ? 'border-[3px] bg-caramel-wash font-semibold' : 'border-2 bg-surface',
                  )}
                >
                  {on ? 'logged' : 'log'}
                </button>
              </div>
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
