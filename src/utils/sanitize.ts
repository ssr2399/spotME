export function sanitizeInput(input: string, maxLength?: number): string {
  if (!input) return '';
  let sanitized = input.replace(/[<>"'&]/g, '').trim();
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  return sanitized;
}

export function validateRating(rating: number): boolean {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
}
