import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SmartTicket } from './SmartTicket';

describe('SmartTicket Component', () => {
  it('renders the section and density correctly', () => {
    render(<SmartTicket section="Block A, Row 12" density={45} />);
    
    // Check if section is rendered
    expect(screen.getByText('Block A, Row 12')).toBeInTheDocument();
    
    // Check if density percentage is rendered
    expect(screen.getByText('45%')).toBeInTheDocument();
    
    // Check if density text logic works (45 should be 'Moderate (Busy)')
    expect(screen.getByText('Moderate (Busy)')).toBeInTheDocument();
  });

  it('displays High (Crowded) when density is over 70', () => {
    render(<SmartTicket section="Block B" density={85} />);
    expect(screen.getByText('High (Crowded)')).toBeInTheDocument();
  });
});
