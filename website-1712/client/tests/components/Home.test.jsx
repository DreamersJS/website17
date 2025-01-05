import { render, screen } from '@testing-library/react'
import Home from '../../src/components/Home'

describe('Home Component', () => {
  it('renders the correct content', () => {
    render(<Home />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
