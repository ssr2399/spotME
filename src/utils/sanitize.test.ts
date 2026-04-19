import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateRating } from './sanitize';

describe('sanitizeInput', () => {
  it('strips HTML tags from input', () => {
    expect(sanitizeInput('<script>alert("xss")</script>Hello')).toBe('scriptalert(xss)/scriptHello');
  });

  it('returns empty string for empty input', () => {
    expect(sanitizeInput('')).toBe('');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello world  ')).toBe('hello world');
  });

  it('truncates to maxLength', () => {
    const long = 'a'.repeat(600);
    expect(sanitizeInput(long, 100).length).toBe(100);
  });
});

describe('validateRating', () => {
  it('accepts valid ratings 1-5', () => {
    expect(validateRating(1)).toBe(true);
    expect(validateRating(5)).toBe(true);
    expect(validateRating(3)).toBe(true);
  });

  it('rejects out-of-range values', () => {
    expect(validateRating(0)).toBe(false);
    expect(validateRating(6)).toBe(false);
    expect(validateRating(-1)).toBe(false);
  });

  it('rejects non-integer values', () => {
    expect(validateRating(3.5)).toBe(false);
  });
});
