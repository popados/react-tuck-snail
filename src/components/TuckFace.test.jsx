import { render, screen } from '@testing-library/react'
import { TuckFace } from '@/components/TuckFace'

describe('TuckFace', () => {
  it('prints the exact text form and reads it as words', () => {
    render(<TuckFace mood="happy" />)
    const face = screen.getByRole('img', { name: 'tuck, happy' })
    expect(face).toHaveTextContent('@_^^')
  })

  it('defaults to awake', () => {
    render(<TuckFace />)
    expect(screen.getByRole('img', { name: 'tuck, awake' })).toHaveTextContent('@_oo')
  })

  it('takes a custom accessible name', () => {
    render(<TuckFace mood="resting" label="tuck, on a shell day" />)
    expect(screen.getByRole('img', { name: 'tuck, on a shell day' })).toHaveTextContent('(@)')
  })

  it('uses term-tuck inside the terminal', () => {
    render(<TuckFace mood="sleepy" onDark />)
    expect(screen.getByRole('img')).toHaveClass('text-term-tuck')
  })
})
