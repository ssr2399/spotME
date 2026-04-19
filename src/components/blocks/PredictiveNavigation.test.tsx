import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PredictiveNavigation } from './PredictiveNavigation';
import * as gemini from '@/lib/gemini';

// Mock the new centralized Firebase wrapper
vi.mock('@/lib/firebase', () => ({
  logAnalyticsEvent: vi.fn(),
}));

// Mock Gemini AI module
vi.mock('@/lib/gemini', () => ({
  getAIAdvice: vi.fn(),
}));

describe('PredictiveNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default state', async () => {
    (gemini.getAIAdvice as any).mockResolvedValue('Mocked AI Tip');

    render(<PredictiveNavigation density={50} />);
    
    expect(screen.getByRole('region', { name: "Predictive Navigation" })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Mocked AI Tip')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('calls getAIAdvice when destination is changed', async () => {
    (gemini.getAIAdvice as any).mockResolvedValue('Mocked AI Tip');

    render(<PredictiveNavigation density={50} />);

    const restroomBtn = screen.getByRole('button', { name: /Navigate to Restrooms/i });
    
    (gemini.getAIAdvice as any).mockResolvedValue('Mocked AI Tip for Restroom');

    await act(async () => {
      restroomBtn.click();
    });

    await waitFor(() => {
      expect(gemini.getAIAdvice).toHaveBeenCalledWith(50, 'Restroom B');
    }, { timeout: 3000 });
  });

  it('renders the map link with correct destination', async () => {
    (gemini.getAIAdvice as any).mockResolvedValue('Mocked AI Tip');

    render(<PredictiveNavigation density={50} />);
    
    await waitFor(() => {
      expect(gemini.getAIAdvice).toHaveBeenCalledTimes(1);
    }, { timeout: 3000 });
    
    const link = screen.getByRole('link', { name: /Get walking directions/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('Exit%20A'));
  });
});


