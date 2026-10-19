import { createBrowserRouter, Navigate } from 'react-router'
import { AppLayout } from '@/app/AppLayout'
import { NAV_ITEMS } from '@/app/navItems'
import { CalmHomePage } from '@/pages/CalmHomePage/CalmHomePage'
import { ComingSoonPage } from '@/pages/ComingSoonPage/ComingSoonPage'
import { GamesPage } from '@/pages/GamesPage/GamesPage'
import { HabitsPage } from '@/pages/HabitsPage/HabitsPage'
import { HomePage } from '@/pages/HomePage/HomePage'
import { InsightsPage } from '@/pages/InsightsPage/InsightsPage'
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage'

// One entry per route, all inside AppLayout (nav + tuckshell). Add new pages
// here; nav entries without a page yet get a placeholder. Exported so tests can
// render a route with createMemoryRouter.
export const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/calm', element: <CalmHomePage /> },
      { path: '/games', element: <GamesPage /> },
      { path: '/habits', element: <HabitsPage /> },
      { path: '/insights', element: <InsightsPage /> },
      // Emotional Check used to live here; it is the check-in page at /calm now.
      { path: '/emotional-check', element: <Navigate to="/calm" replace /> },
      ...NAV_ITEMS.filter((item) => !item.built).map((item) => ({
        path: item.to,
        element: <ComingSoonPage title={item.label} />,
      })),
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
