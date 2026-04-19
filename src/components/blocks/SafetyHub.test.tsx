import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SafetyHub } from './SafetyHub';

describe('SafetyHub', () => {
  it('renders all safety options', () => {
    render(<SafetyHub />);
    
    // Check main container
    expect(screen.getByRole('region', { name: "Safety and Support" })).toBeInTheDocument();

    // Check emergency links
    const policeLink = screen.getByRole('link', { name: /Call Police 100/i });
    expect(policeLink).toHaveAttribute('href', 'tel:100');

    const medicalLink = screen.getByRole('link', { name: /Call Medical 108/i });
    expect(medicalLink).toHaveAttribute('href', 'tel:108');

    // Check buttons
    expect(screen.getByRole('button', { name: /Find Quiet Room/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Contact Event Organizers/i })).toBeInTheDocument();
  });
  it('has correct emergency phone links', () => {
  render(<SafetyHub />);
  expect(screen.getByLabelText('Call Police 100')).toHaveAttribute('href', 'tel:100');
  expect(screen.getByLabelText('Call Medical 108')).toHaveAttribute('href', 'tel:108');
});

it('renders Quiet Room button', () => {
  render(<SafetyHub />);
  expect(screen.getByLabelText('Find Quiet Room')).toBeInTheDocument();
});

});
