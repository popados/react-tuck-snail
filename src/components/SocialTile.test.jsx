import { render, screen } from '@testing-library/react'
import { SocialTile } from '@/components/SocialTile'

describe('SocialTile', () => {
  it('shows the default headline and second line', () => {
    render(<SocialTile />)
    expect(screen.getByText('Some days are shell days.')).toBeInTheDocument()
    expect(screen.getByText('That counts too.')).toBeInTheDocument()
  })

  it('drops the second line when sub is null and shows the signature', () => {
    render(<SocialTile headline="One glass counts." sub={null} signature="— tuck & sam" />)
    expect(screen.getByText('One glass counts.')).toBeInTheDocument()
    expect(screen.queryByText('That counts too.')).not.toBeInTheDocument()
    expect(screen.getByText('— tuck & sam')).toBeInTheDocument()
  })
})
