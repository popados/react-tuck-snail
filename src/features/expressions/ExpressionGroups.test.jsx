import { render, screen, within } from '@testing-library/react'
import { ExpressionGroups } from '@/features/expressions/ExpressionGroups'

describe('ExpressionGroups', () => {
  it('groups the expressions by the app’s categories', () => {
    render(<ExpressionGroups />)
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(titles).toEqual(['Acknowledge', 'Direct', 'Offer', 'Keep'])

    const names = (title) =>
      within(screen.getByRole('region', { name: title }))
        .getAllByRole('figure')
        .map((card) => card.querySelector('figcaption span').textContent)
    expect(names('Acknowledge')).toEqual(['Happy'])
    expect(names('Direct')).toEqual(['Anxious', 'Focused', 'Stressed'])
    expect(names('Offer')).toEqual(['Lonely'])
    expect(names('Keep')).toEqual(['Proud', 'Grateful', 'Curious'])
  })

  it('shows each card with its art and face', () => {
    render(<ExpressionGroups />)
    const lonely = screen.getByRole('img', { name: /Tuck lonely/ })
    expect(lonely).toHaveAttribute('src', '/mascot/tuck-lonely.svg')
    expect(lonely.closest('figure')).toHaveTextContent('@_..')
  })
})
