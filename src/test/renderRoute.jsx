import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from '@/app/router'
import { ThemeSync } from '@/app/ThemeSync'

// Renders the real app at `path`: the layout (nav + tuckshell) around the page,
// with the same light/dark sync as the app. Returns the router too, so a test can
// read where the app navigated to.
export function renderRoute(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  const result = render(
    <>
      <ThemeSync />
      <RouterProvider router={router} />
    </>,
  )
  return { ...result, router }
}
