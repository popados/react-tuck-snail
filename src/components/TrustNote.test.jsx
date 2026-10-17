import { render, screen } from '@testing-library/react'
import { TrustNote } from '@/components/TrustNote'

describe('TrustNote', () => {
  it('says where data lives and links 988 as tap-to-call', () => {
    render(<TrustNote />)
    expect(screen.getByText(/stored on this device only/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '988' })).toHaveAttribute('href', 'tel:988')
  })

  it('takes localized children', () => {
    render(<TrustNote>Solo en este dispositivo.</TrustNote>)
    expect(screen.getByText('Solo en este dispositivo.')).toBeInTheDocument()
  })
})
