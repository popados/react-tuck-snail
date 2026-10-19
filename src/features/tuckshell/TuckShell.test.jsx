import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { todayKey, useCheckinStore } from '@/stores/useCheckinStore'
import { useShellStore, WELCOME } from '@/stores/useShellStore'
import { renderRoute } from '@/test/renderRoute'

const output = () => screen.getByRole('log', { name: 'tuckshell output' })
const input = () => screen.getByRole('textbox', { name: 'tuckshell command' })

describe('TuckShell', () => {
  beforeEach(() => {
    localStorage.clear()
    useCheckinStore.setState({ entries: {}, details: {}, log: [] })
    useShellStore.setState({ lines: WELCOME, history: [] })
  })

  it('sits in the page area, under the title, on every page', () => {
    for (const path of ['/', '/calm', '/games', '/habits', '/no-such-page']) {
      const { unmount } = renderRoute(path)
      const shell = screen.getByRole('region', { name: 'tuckshell' })
      const title = screen.getByRole('heading', { level: 1 })
      expect(title.compareDocumentPosition(shell) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
      expect(shell.closest('main, section')).not.toBeNull()
      unmount()
    }
  })

  it('leaves the Emotional Check sidebar beside the page area, not under the shell', () => {
    renderRoute('/calm')
    const shell = screen.getByRole('region', { name: 'tuckshell' })
    const sidebar = screen.getByRole('complementary', { name: 'sidebar' })
    expect(shell.closest('main')).not.toBeNull()
    expect(sidebar.contains(shell)).toBe(false)
    expect(sidebar.parentElement).toBe(shell.closest('main').parentElement)
  })

  it('runs a typed command and echoes it', async () => {
    renderRoute('/')
    await userEvent.type(input(), 'help{Enter}')
    expect(within(output()).getByText('$ help')).toBeInTheDocument()
    expect(within(output()).getByText(/checkin <mood>/)).toBeInTheDocument()
    expect(input()).toHaveValue('')
  })

  it('shows the help menu from the help button', async () => {
    renderRoute('/')
    await userEvent.click(screen.getByRole('button', { name: 'help' }))
    expect(within(output()).getByText(/open <page>/)).toBeInTheDocument()
  })

  it('checks in for real, and the landing page check-in agrees', async () => {
    renderRoute('/')
    await userEvent.type(input(), 'checkin okay{Enter}')
    expect(useCheckinStore.getState().entries[todayKey()]).toBe('okay')
    expect(within(output()).getByText('okay is a fine place to be.')).toBeInTheDocument()
    const answers = screen.getByRole('group', { name: 'How are you today?' })
    expect(within(answers).getByRole('button', { name: 'okay' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('opens another page', async () => {
    const { router } = renderRoute('/')
    await userEvent.type(input(), 'open games{Enter}')
    expect(router.state.location.pathname).toBe('/games')
    expect(screen.getByRole('heading', { level: 1, name: 'Games' })).toBeInTheDocument()
  })

  it('brings back earlier commands with the arrow keys', async () => {
    renderRoute('/')
    await userEvent.type(input(), 'today{Enter}')
    await userEvent.type(input(), 'log water{Enter}')
    await userEvent.type(input(), '{ArrowUp}')
    expect(input()).toHaveValue('log water')
    await userEvent.type(input(), '{ArrowUp}')
    expect(input()).toHaveValue('today')
    await userEvent.type(input(), '{ArrowDown}{ArrowDown}')
    expect(input()).toHaveValue('')
  })

  it('clears the screen', async () => {
    renderRoute('/')
    await userEvent.type(input(), 'clear{Enter}')
    expect(output()).toBeEmptyDOMElement()
  })

  it('scrolls inside its own box and follows new output', async () => {
    renderRoute('/')
    expect(output()).toHaveClass('max-h-[220px]', 'overflow-auto')
    const box = output()
    Object.defineProperty(box, 'scrollHeight', { configurable: true, value: 900 })
    await userEvent.type(input(), 'help{Enter}')
    expect(box.scrollTop).toBe(900)
  })
})
