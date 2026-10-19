import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { TopNav } from '@/components/TopNav'

const LABELS = ['Home', 'Emotional Check', 'Habits', 'Games', 'Grounding', 'Insights', 'Profile']

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <TopNav />
    </MemoryRouter>,
  )
}

describe('TopNav', () => {
  it('lists every screen, in order', () => {
    renderAt('/')
    const nav = screen.getByRole('navigation', { name: 'main' })
    const links = within(nav)
      .getAllByRole('link')
      .slice(1) // the first link is the brand
      .map((link) => link.textContent)
    expect(links).toEqual(LABELS)
  })

  it('shows the avatar, the pocket@shell wordmark and >tuck@shell, linking to the landing page', () => {
    renderAt('/calm')
    const brand = screen.getByRole('link', { name: /pocket@shell.*tuck@shell/ })
    expect(brand).toHaveAttribute('href', '/')
    expect(brand.querySelector('img[src="/logo/tuck-avatar.svg"]')).toBeInTheDocument()
    expect(brand).toHaveTextContent('>tuck@shell')
  })

  it('marks the current screen', () => {
    renderAt('/calm')
    expect(screen.getByRole('link', { name: 'Emotional Check' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
  })

  it('links Home to the landing page, Emotional Check to /calm and Games to /games', () => {
    renderAt('/')
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Emotional Check' })).toHaveAttribute('href', '/calm')
    expect(screen.getByRole('link', { name: 'Games' })).toHaveAttribute('href', '/games')
  })

  it('expands and folds the menu', async () => {
    renderAt('/')
    const toggle = screen.getByRole('button', { name: /menu/ })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById(toggle.getAttribute('aria-controls'))).toHaveClass('flex')

    await userEvent.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('folds the menu after picking a screen', async () => {
    renderAt('/')
    const toggle = screen.getByRole('button', { name: /menu/ })
    await userEvent.click(toggle)
    await userEvent.click(screen.getByRole('link', { name: 'Habits' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('link', { name: 'Habits' })).toHaveAttribute('aria-current', 'page')
  })
})
