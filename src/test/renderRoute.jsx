import { render } from '@testing-library/react'
import { AppLayout } from '@/app/AppLayout'
import { NAV_ITEMS } from '@/app/navItems'
import { ThemeSync } from '@/app/ThemeSync'
import { CalmHomePage } from '@/screens/CalmHomePage/CalmHomePage'
import { ComingSoonPage } from '@/screens/ComingSoonPage/ComingSoonPage'
import { GamesPage } from '@/screens/GamesPage/GamesPage'
import { HabitsPage } from '@/screens/HabitsPage/HabitsPage'
import { HomePage } from '@/screens/HomePage/HomePage'
import { InsightsPage } from '@/screens/InsightsPage/InsightsPage'
import { NotFoundPage } from '@/screens/NotFoundPage/NotFoundPage'
import { TestRouter } from '@/test/testRouter'

// The same path -> screen mapping as the Next routes in src/app.
const SCREENS = {
  '/': HomePage,
  '/calm': CalmHomePage,
  '/emotional-check': CalmHomePage,
  '/games': GamesPage,
  '/habits': HabitsPage,
  '/insights': InsightsPage,
}

function Screen({ path }) {
  const Page = SCREENS[path]
  if (Page) return <Page />
  const item = NAV_ITEMS.find((nav) => !nav.built && nav.to === path)
  return item ? <ComingSoonPage title={item.label} /> : <NotFoundPage />
}

// Renders the real app at `path`: the layout (nav + page) with the same
// light/dark sync as the app. Returns a `router` too, so a test can read where
// the app navigated to (router.state.location.pathname).
export function renderRoute(path) {
  const router = { state: { location: { pathname: path } } }
  const result = render(
    <TestRouter
      initialPath={path}
      onNavigate={(to) => {
        router.state.location.pathname = to
      }}
    >
      {(pathname) => (
        <>
          <ThemeSync />
          <AppLayout>
            <Screen path={pathname} />
          </AppLayout>
        </>
      )}
    </TestRouter>,
  )
  return { ...result, router }
}
