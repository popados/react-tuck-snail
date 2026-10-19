import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { todayKey, useCheckinStore } from '@/stores/useCheckinStore'
import { useShellStore, WELCOME } from '@/stores/useShellStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { renderRoute } from '@/test/renderRoute'

const renderCalm = () => renderRoute('/calm')

describe('CalmHomePage', () => {
  beforeEach(() => {
    localStorage.clear()
    useCheckinStore.setState({ entries: {}, details: {}, log: [] })
    useThemeStore.setState({ mode: 'auto' })
    useShellStore.setState({ lines: WELCOME, history: [] })
    document.documentElement.removeAttribute('data-theme')
  })

  it('uses the low stimulation palette and starts with nothing picked', () => {
    const { container } = renderCalm()
    expect(container.querySelector('[data-palette="low"]')).toBeInTheDocument()
    expect(screen.getByText('Nothing picked yet')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'save check-in' })).toBeDisabled()
  })

  it('groups the sidebar Tucks as acknowledge, permit, direct, offer, keep', () => {
    renderCalm()
    const sidebar = screen.getByRole('group', { name: 'How are you feeling?' })
    const labels = ['Acknowledge', 'Permit', 'Direct', 'Offer', 'Keep'].map((label) =>
      within(sidebar).getByText(label),
    )
    labels.forEach((label) => {
      const dot = label.closest('p').querySelector('i')
      expect(dot).toHaveClass(`bg-rt-${label.textContent.toLowerCase()}`)
    })
    labels.slice(1).forEach((label, i) => {
      expect(
        labels[i].compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy()
    })
    expect(
      within(sidebar)
        .getAllByRole('button')
        .map((b) => b.getAttribute('aria-label')),
    ).toEqual([
      'Shell day',
      'Good',
      'Okay',
      'Tired',
      'Confused',
      'Low',
      'Calm',
      'Anxious',
      'Focused',
      'Stressed',
      'Lonely',
      'Proud',
      'Grateful',
      'Curious',
    ])
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
    const terminal = screen.getByRole('log', { name: 'tuckshell output' })
    expect(within(terminal).getByText('$ checkin anxious')).toBeInTheDocument()
    expect(within(terminal).getByText(/one slow breath with me/)).toBeInTheDocument()
    expect(screen.getAllByText(/one slow breath with me/)).toHaveLength(2)
    expect(screen.getByText('saved on this device')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'today, Anxious' })).toBeInTheDocument()
  })

  it('offers every Tuck as a name + face button, in the same groups as the sidebar', async () => {
    renderCalm()
    const names = (label) =>
      within(screen.getByRole('group', { name: `${label} moods` }))
        .getAllByRole('button')
        .map((b) => b.textContent)
    expect(names('Acknowledge')).toEqual([
      'Shell day(@)',
      'Good@_^^',
      'Okay@_oo',
      'Relieved@_uu ~',
      'Surprised@_OO',
    ])
    expect(names('Permit')).toEqual([
      'Tired@_--',
      'Confused@_o0 ?',
      'Low@_;;',
      'Bored@_-_',
      "Disappointed@_''",
    ])
    expect(names('Direct')).toEqual([
      'Calm@_uu',
      'Anxious@_oo;',
      'Focused@_==',
      'Stressed@_><',
      'Determined@_>>',
      'Frustrated@_##',
      'Overwhelmed@_@@',
    ])
    expect(names('Offer')).toEqual(['Lonely@_..', 'Shy@_'])
    expect(names('Keep')).toEqual([
      'Proud@_^^ *',
      'Grateful@_^^ <3',
      'Curious@_o?',
      'Content@_^-',
      'Excited@_**',
      'Hopeful@_^o',
      'Playful@_^v',
    ])

    const offer = screen.getByRole('group', { name: 'Offer moods' })
    await userEvent.click(within(offer).getByRole('button', { name: 'Lonely' }))
    expect(within(offer).getByRole('button', { name: 'Lonely' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText('missing people')).toBeInTheDocument()
    const sidebar = screen.getByRole('group', { name: 'How are you feeling?' })
    expect(within(sidebar).getByRole('button', { name: 'Lonely' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('checks in with one of the extra emotions from the buttons', async () => {
    renderCalm()
    const direct = screen.getByRole('group', { name: 'Direct moods' })
    await userEvent.click(within(direct).getByRole('button', { name: 'Overwhelmed' }))
    expect(screen.getByText('too much, all at once')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'save check-in' }))

    const state = useCheckinStore.getState()
    expect(state.entries[todayKey()]).toBe('low')
    expect(state.details[todayKey()]).toBe('overwhelmed')
    expect(screen.getAllByText(/too much at once. let's pick one./).length).toBeGreaterThan(0)
    expect(screen.getByRole('img', { name: 'today, Overwhelmed' })).toBeInTheDocument()
  })

  it('shows what the check-in was saved as, in the check-in panel', async () => {
    renderCalm()
    const panel = () => screen.getByText('worried, on edge').closest('[role="status"]')
    const feelings = screen.getByRole('group', { name: 'How are you feeling?' })
    await userEvent.click(within(feelings).getByRole('button', { name: 'Anxious' }))
    expect(panel()).not.toHaveTextContent('saved as')

    await userEvent.click(screen.getByRole('button', { name: 'save check-in' }))
    expect(panel()).toHaveTextContent(/saved as low · \d{1,2}:\d{2}\s[AP]M/)

    // Picking another Tuck hides it until that one is saved.
    await userEvent.click(within(feelings).getByRole('button', { name: 'Calm' }))
    expect(
      screen.getByText('settled, after a breath').closest('[role="status"]'),
    ).not.toHaveTextContent('saved as')
  })

  it('no longer has Small things (it moved to Habits)', () => {
    renderCalm()
    expect(screen.queryByRole('heading', { name: 'Small things' })).not.toBeInTheDocument()
  })

  it('switches light and dark for the whole app', async () => {
    renderCalm()
    await userEvent.click(screen.getByRole('button', { name: 'dark' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    await userEvent.click(screen.getByRole('button', { name: 'auto' }))
    expect(document.documentElement).not.toHaveAttribute('data-theme')
  })

  it('is linked from the landing page as Emotional Check', () => {
    renderRoute('/')
    expect(screen.getByRole('link', { name: 'Emotional Check' })).toHaveAttribute('href', '/calm')
    const logos = screen.getAllByRole('img', { name: 'pocket@shell' }).map((img) => img.src)
    expect(logos.some((src) => src.endsWith('/logo/pocket-shell-logo.png'))).toBe(true)
    expect(logos.some((src) => src.endsWith('/logo/pocket-shell-wordmark.png'))).toBe(true)
    expect(screen.getByRole('link', { name: 'Open the calm home' })).toHaveAttribute(
      'href',
      '/calm',
    )
  })
})
