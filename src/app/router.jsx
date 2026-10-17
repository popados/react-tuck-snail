import { createBrowserRouter } from 'react-router'
import { NAV_ITEMS } from '@/app/navItems'
import { CalmHomePage } from '@/pages/CalmHomePage/CalmHomePage'
import { ComingSoonPage } from '@/pages/ComingSoonPage/ComingSoonPage'
import { HomePage } from '@/pages/HomePage/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage'

// One entry per route. Add new pages here; nav entries without a page yet
// get a placeholder.
export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/calm', element: <CalmHomePage /> },
  ...NAV_ITEMS.filter((item) => !item.built).map((item) => ({
    path: item.to,
    element: <ComingSoonPage title={item.label} />,
  })),
  { path: '*', element: <NotFoundPage /> },
])
