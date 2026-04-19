import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EventPulse } from './EventPulse';

// Mock fetch for the weather API so it doesn't fail during tests
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ current_weather: { temperature: 22 } }),
  })
) as any;

describe('EventPulse Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the next event name and time to finish', async () => {
    const futureTime = new Date(Date.now() + 3600000).toISOString(); // 1 hour from now
    const endTime = new Date(Date.now() + 7200000).toISOString(); // 2 hours from now

    await act(async () => {
      render(
        <EventPulse 
          nextEvent="Keynote Speech" 
          nextEventTime={futureTime} 
          endTime={endTime} 
        />
      );
    });

    // Check if the event name is displayed
    expect(screen.getByText('Next: Keynote Speech')).toBeInTheDocument();
    
    // Check if the Time to Finish label is displayed
    expect(screen.getByText('Time to Finish')).toBeInTheDocument();
  });
  it('renders Google Calendar save link with security attributes', async () => {
    const future = new Date(Date.now() + 3600000).toISOString();
    const end = new Date(Date.now() + 7200000).toISOString();
    await act(async () => {
      render(<EventPulse nextEvent="Halftime" nextEventTime={future} endTime={end} />);
    });
    const link = screen.getByLabelText('Save to Google Calendar');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders accessible timer regions', async () => {
    const future = new Date(Date.now() + 3600000).toISOString();
    const end = new Date(Date.now() + 7200000).toISOString();
    await act(async () => {
      render(<EventPulse nextEvent="Kickoff" nextEventTime={future} endTime={end} />);
    });
    expect(screen.getByRole('timer', { name: /Time until/ })).toBeInTheDocument();
  });

});
