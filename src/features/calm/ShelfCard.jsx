import { art } from '@/features/calm/calmMoods'

// "On your shelf": cosmetic unlocks. Nothing is earned by a streak, and nothing goes away.
export function ShelfCard() {
  return (
    <section
      aria-labelledby="h-shelf"
      className="flex min-w-0 flex-col gap-12 rounded-lg border-2 border-line bg-surface px-24 py-20"
    >
      <h2 id="h-shelf" className="m-0 text-label">
        On your shelf
      </h2>
      <div className="overflow-hidden rounded-sm bg-art-ground leading-none">
        <img
          src={art('tuck-scene-trail')}
          alt="Tuck in a pink scarf leaning forward with speed lines"
          className="block h-auto max-h-[180px] w-full object-contain"
        />
      </div>
      <div>
        <p className="m-0 font-semibold">Trail scarf for the web game</p>
        <p className="m-0 text-caption text-ink-muted">
          Tuck wears it in the garden map. Cosmetic only.
        </p>
      </div>
      <div>
        <p className="m-0 font-semibold">tuckshell headlamp</p>
        <p className="m-0 text-caption text-ink-muted">
          Not found yet. Run <span className="font-mono whitespace-pre">tuckshell unlock</span> in
          your terminal.
        </p>
      </div>
      <p className="m-0 text-caption text-ink-muted">The full shelf opens soon.</p>
    </section>
  )
}
