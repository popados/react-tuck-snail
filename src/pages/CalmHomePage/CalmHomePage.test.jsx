import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { ThemeSync } from '@/app/ThemeSync'
import { CalmHomePage } from '@/pages/CalmHomePage/CalmHomePage'
import { HomePage } from '@/pages/HomePage/HomePage'
import { todayKey, useCheckinStore } from '@/stores/useCheckinStore'
import { useThemeStore } from '@/stores/useThemeStore'

function renderCalm() {
  return render(
    <MemoryRouter>
      <ThemeSync />
      <CalmHomePage />
    </MemoryRouter>,
  )
}

describe('CalmHomePage', () => {
  beforeEach(() => {
    localStorage.clear()
    useCheckinStore.setState({ entries: {}, details: {} })
    useThemeStore.setState({ mode: 'auto' })
    document.documentElement.removeAttribute('data-theme')
  })

  it('uses the low stimulation palette and starts with nothing picked', () => {
    const { container } = renderCalm()
    expect(container.firstChild).toHaveAttribute('data-palette', 'low')
    expect(screen.getByText('Nothing picked yet')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'save check-in' })).toBeDisabled()
  })

  it('fills the check-in from a sidebar Tuck and saves it on the device', async () => {
    renderCalm()
    const feelings = screen.getByRole('group', { name: 'How are you feeling?' })
    await userEvent.click(within(feelings).getByRole('button', { name: 'Anxious' }))

    expect(screen.getByText('worried, on edge')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'save check-in' }))

    const state = useCheckinStore.getState()
    expect(state.entries[todayKey()]).toBe('low')
    expect(state.details[todayKey()]).toBe('anxious')
    const terminal = screen.getByRole('region', { name: 'tuckshell preview' })
    expect(within(terminal).getByText('$ tuckshell checkin anxious')).toBeInTheDocument()
    expect(within(terminal).getByText(/one slow breath with me/)).toBeInTheDocument()
    expect(screen.getAllByText(/one slow breath with me/)).toHaveLength(2)
    expect(screen.getByText('saved on this device')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'today, Anxious' })).toBeInTheDocument()
  })

  it('logs and unlogs a small thing, gently', async () => {
    renderCalm()
    const water = screen.getByRole('button', { name: 'log water' })
    await userEvent.click(water)
    expect(water).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByText(/water logged\. small sips count\./, { selector: 'p' }),
    ).toBeInTheDocument()

    await userEvent.click(water)
    expect(
      screen.getByText(/water unlogged\. no harm done\./, { selector: 'p' }),
    ).toBeInTheDocument()
  })

  it('switches light and dark for the whole app', async () => {
    renderCalm()
    await userEvent.click(screen.getByRole('button', { name: 'dark' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    await userEvent.click(screen.getByRole('button', { name: 'auto' }))
    expect(document.documentElement).not.toHaveAttribute('data-theme')
  })

  it('is linked from the landing page as Home', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/calm')
    expect(screen.getByRole('link', { name: 'Open the calm home' })).toHaveAttribute(
      'href',
      '/calm',
    )
  })
})
