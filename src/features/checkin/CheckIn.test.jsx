import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckIn } from '@/features/checkin/CheckIn'
import { useCheckinStore } from '@/stores/useCheckinStore'

describe('CheckIn', () => {
  beforeEach(() => {
    localStorage.clear()
    useCheckinStore.setState({ entries: {}, details: {} })
  })

  it('asks the question and groups the five answers under it', () => {
    render(<CheckIn />)
    const group = screen.getByRole('group', { name: 'How are you today?' })
    expect(group.querySelectorAll('button')).toHaveLength(5)
    expect(screen.getByRole('button', { name: 'shell day' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '988' })).toBeInTheDocument()
  })

  it("shows Tuck's reply and art after a check-in, and saves it on the device", async () => {
    render(<CheckIn />)
    await userEvent.click(screen.getByRole('button', { name: 'tired' }))

    expect(screen.getByRole('button', { name: 'tired' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('status')).toHaveTextContent('noted. rest counts too.')
    expect(screen.getByRole('img', { name: /tuck sleepy/i })).toBeInTheDocument()
    expect(localStorage.getItem('tuck-checkin')).toContain('tired')
  })

  it('adds a gentle 988 note to a low answer', async () => {
    render(<CheckIn />)
    await userEvent.click(screen.getByRole('button', { name: 'low' }))
    expect(screen.getByRole('status')).toHaveTextContent('someone is there to listen')
  })

  it('takes the answer back when the chosen chip is tapped again', async () => {
    render(<CheckIn />)
    const good = screen.getByRole('button', { name: 'good' })
    await userEvent.click(good)
    await userEvent.click(good)
    expect(good).toHaveAttribute('aria-pressed', 'false')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
