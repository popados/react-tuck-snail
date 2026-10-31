import { ClientOnly } from '@/app/ClientOnly'
import { TopNav } from '@/components/TopNav'

// The frame around every page: the top nav, then the page itself, which fills
// the rest of the screen. Each page places the tuckshell under its own title.
export function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <div className="flex flex-1 flex-col">
        <ClientOnly>{children}</ClientOnly>
      </div>
    </div>
  )
}
