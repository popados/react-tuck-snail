import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MoodChip } from '@/components/MoodChip'

describe('MoodChip', () => {
  it('is named by its word, with the face hidden from screen readers', () => {
    render(<MoodChip mood="sleepy">tired</MoodChip>)
    const chip = screen.getByRole('button', { name: 'tired' })
    expect(chip).toHaveTextContent('@_--')
    expect(chip).toHaveAttribute('aria-pressed', 'false')
  })

  it('shows the selected state by border and weight, not only by fill', () => {
    render(
      <MoodChip mood="happy" selected>
        good
      </MoodChip>,
    )
    const chip = screen.getByRole('button', { name: 'good' })
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    expect(chip).toHaveClass('bg-caramel-wash', 'border-4', 'font-semibold')
  })

  it('calls onClick when tapped', async () => {
    const onClick = vi.fn()
    render(
      <MoodChip mood="resting" wide onClick={onClick}>
        shell day
      </MoodChip>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'shell day' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire when disabled', async () => {
    const onClick = vi.fn()
    render(
      <MoodChip mood="sad" disabled onClick={onClick}>
        low
      </MoodChip>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'low' }))
    expect(onClick).not.toHaveBeenCalled()
  })
})
