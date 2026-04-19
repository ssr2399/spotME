import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SmartTicket } from './SmartTicket';

vi.mock('@react-google-maps/api', () => ({
  useJsApiLoader: () => ({ isLoaded: true }),
  GoogleMap: ({ children }: any) => <div>{children}</div>,
  Marker: () => <div>Marker</div>,
}));

describe('SmartTicket Component', () => {
  it('renders the section and density correctly', () => {
    render(<SmartTicket eventName="Rock Concert" section="Block A, Row 12" density={45} />);
    
    // Check if eventName is rendered
    expect(screen.getByText('Rock Concert')).toBeInTheDocument();
    
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
  it('renders Google Wallet button', () => {
  render(<SmartTicket section="Block A" density={30} />);
  expect(screen.getByLabelText('Save to Google Wallet')).toBeInTheDocument();
});

it('shows accessible ticket region', () => {
  render(<SmartTicket section="Block A" density={30} />);
  expect(screen.getByRole('region', { name: 'Ticket Information' })).toBeInTheDocument();
});

});
