import { describe, it, expect } from 'vitest';
import { formatTime } from './time';

describe('formatTime', () => {
  it('formats seconds correctly', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(59)).toBe('00:59');
    expect(formatTime(60)).toBe('01:00');
    expect(formatTime(3599)).toBe('59:59');
    expect(formatTime(3600)).toBe('01:00:00');
    expect(formatTime(3661)).toBe('01:01:01');
  });

  it('handles negative numbers', () => {
    expect(formatTime(-10)).toBe('00:00');
  });
});
