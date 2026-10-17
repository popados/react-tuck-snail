import { render, screen } from '@testing-library/react'
import { ExpressionCard } from '@/components/ExpressionCard'

describe('ExpressionCard', () => {
  it('shows the art, the name and the code', () => {
    render(
      <ExpressionCard
        mood="sleepy"
        name="Sleepy"
        art={<img src="/mascot/tuck-sleepy.svg" alt="Tuck sleepy, stalks loose, eyes closed" />}
      />,
    )
    expect(screen.getByRole('img', { name: /tuck sleepy/i })).toBeInTheDocument()
    expect(screen.getByRole('figure')).toHaveTextContent('Sleepy')
    expect(screen.getByRole('figure')).toHaveTextContent('@_--')
  })

  it('falls back to the large text form when there is no art', () => {
    render(<ExpressionCard mood="shy" name="Shy" />)
    expect(screen.getByRole('img', { name: 'tuck, shy' })).toHaveTextContent('@_')
  })
})
