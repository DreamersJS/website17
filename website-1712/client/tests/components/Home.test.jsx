import { render, screen } from '@testing-library/react'
import Home from '../../src/components/Home'
import { MemoryRouter } from 'react-router-dom'; // To mock React Router's NavLink

describe('Home Component', () => {
  
  it('renders the features section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  
    // Check for features heading
    expect(screen.getByText(/why choose us\?/i)).toBeInTheDocument();
  
    // Check for feature descriptions
    expect(screen.getByText(/personalized plans/i)).toBeInTheDocument();
    expect(screen.getByText(/premium products/i)).toBeInTheDocument();
    expect(screen.getByText(/community support/i)).toBeInTheDocument();
  })
})
