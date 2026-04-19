import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAIAdvice } from './gemini';

vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn(),
}));

describe('gemini', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns low density advice when density is < 40', async () => {
    const advicePromise = getAIAdvice(35, 'Exit A');
    
    vi.runAllTimers();
    
    const advice = await advicePromise;
    expect(advice).toContain('Crowds are low');
    expect(advice).toContain('Exit A');
  });

  it('returns moderate density advice when density is < 70', async () => {
    const advicePromise = getAIAdvice(50, 'Restroom B');
    
    vi.runAllTimers();
    
    const advice = await advicePromise;
    expect(advice).toContain('Sections are getting busy');
    expect(advice).toContain('Restroom B');
  });

  it('returns high density advice when density is >= 70', async () => {
    const advicePromise = getAIAdvice(85, 'Main Hall');
    
    vi.runAllTimers();
    
    const advice = await advicePromise;
    expect(advice).toContain('High density detected');
    expect(advice).toContain('Main Hall');
  });
});
