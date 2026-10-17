import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { TopNav } from '@/components/TopNav'

const LABELS = [
  'Landing (News)',
  'Home',
  'Habits',
  'Grounding',
  'Emotional Check',
  'Insights',
  'Profile',
]

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
      .slice(1) // the first link is the Tuck Check-in brand
      .map((link) => link.textContent)
    expect(links).toEqual(LABELS)
  })

  it('marks the current screen', () => {
    renderAt('/calm')
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Landing (News)' })).not.toHaveAttribute('aria-current')
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
