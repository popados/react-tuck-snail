import { Link } from 'react-router'
import { TuckFace } from '@/components/TuckFace'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <main className="mx-auto flex max-w-phone flex-col gap-16 px-16 py-64">
      <TuckFace mood="surprised" size="xl" />
      <h1 className="m-0 text-title">Page not found</h1>
      <p className="m-0 text-body text-ink-muted">
        This page doesn't exist, or it has moved. Tuck looked around slowly and didn't find it.
      </p>
      <Link to="/" className="inline-flex min-h-[44px] items-center text-body">
        Go back to the home page
      </Link>
    </main>
  )
}
