import { Link } from 'react-router'
import { TopNav } from '@/components/TopNav'
import { TuckFace } from '@/components/TuckFace'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

// Placeholder for a screen in the top navigation that isn't built yet.
export function ComingSoonPage({ title }) {
  useDocumentTitle(title)

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto flex max-w-phone flex-col gap-16 px-16 py-64">
        <TuckFace mood="shy" size="xl" />
        <h1 className="m-0 text-title">{title}</h1>
        <p className="m-0 text-body text-ink-muted">
          nothing here yet. that's fine. Tuck is building this one slowly.
        </p>
        <Link to="/calm" className="inline-flex min-h-[44px] items-center text-body">
          Go to home
        </Link>
      </main>
    </div>
  )
}
