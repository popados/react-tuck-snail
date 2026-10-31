import { screen } from '@testing-library/react'
import { renderRoute } from '@/test/renderRoute'

describe('GamesPage', () => {
  it('shows the shelf, with Games marked in the nav', () => {
    renderRoute('/games')
    expect(screen.getByRole('heading', { level: 1, name: 'Games' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'On your shelf' })).toBeInTheDocument()
    expect(screen.getByText('Trail scarf for the web game')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Games' })).toHaveAttribute('aria-current', 'page')
  })
})
