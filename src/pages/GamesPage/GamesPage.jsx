import { ShelfCard } from '@/features/shelf/ShelfCard'
import { TuckShell } from '@/features/tuckshell/TuckShell'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

// Games: for now, the shelf of cosmetic unlocks for the web games and tuckshell.
export function GamesPage() {
  useDocumentTitle('Games')

  return (
    <div>
      <main className="mx-auto flex max-w-page flex-col gap-24 px-16 pt-24 pb-48 min-[821px]:px-32">
        <div className="flex flex-col gap-6">
          <h1 className="m-0 text-heading min-[821px]:text-title">Games</h1>
          <p className="m-0 text-note text-ink-muted">
            Small things count. Nothing here is earned by a streak, and nothing goes away.
          </p>
        </div>
        <TuckShell />
        <div className="max-w-[560px]">
          <ShelfCard />
        </div>
      </main>
    </div>
  )
}
