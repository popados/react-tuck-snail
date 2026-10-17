import { render, screen } from '@testing-library/react'
import { Terminal } from '@/components/Terminal'

describe('Terminal', () => {
  it('is a focusable, labelled region', () => {
    render(<Terminal />)
    const region = screen.getByRole('region', { name: 'terminal, ~/tuck' })
    expect(region).toHaveAttribute('tabindex', '0')
  })

  it('prints commands with a prompt and reads faces as words', () => {
    render(
      <Terminal
        lines={[
          { type: 'cmd', text: 'tuckshell log walk' },
          { face: 'happy', text: 'walk logged. snail pace is a pace.' },
        ]}
      />,
    )
    expect(screen.getByText('$ tuckshell log walk')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'tuck, happy' })).toHaveTextContent('@_^^')
    expect(screen.getByText(/walk logged/)).toBeInTheDocument()
  })

  it('uses a custom path in the bar and the label', () => {
    render(<Terminal path="~/garden" />)
    expect(screen.getByText('~/garden')).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'terminal, ~/garden' })).toBeInTheDocument()
  })
})
