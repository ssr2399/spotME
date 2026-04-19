import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const cache = new Map<string, { response: string; timestamp: number }>();
let lastCallTime = 0;
const RATE_LIMIT_MS = 15000;

let quotaExceeded = false;
let hasLoggedQuotaWarning = false; // ✅ NEW
let hasLoggedFallbackWarning = false;
let isRequestInFlight = false;     // ✅ NEW (prevents parallel calls)

const getFallbackAdvice = async (density: number, destination: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (density < 40) {
    return `Crowds are low. It's a great time to head to ${destination}.`;
  } else if (density < 70) {
    return `Sections are getting busy. Take your time navigating to ${destination}.`;
  } else {
    return `High density detected. Consider using the Quiet Room instead of ${destination} if overwhelmed.`;
  }
};

export const getAIAdvice = async (
  density: number,
  destination: string = 'your destination'
): Promise<string> => {
  const cacheKey = `${density}-${destination}`;
  const now = Date.now();

  // ✅ Cache first
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!.response;
  }

  // ✅ HARD STOP if quota exceeded
  if (quotaExceeded) {
    return getFallbackAdvice(density, destination);
  }

  // ✅ Prevent parallel API calls
  if (isRequestInFlight) {
    return getFallbackAdvice(density, destination);
  }

  // ✅ Rate limit
  if (now - lastCallTime < RATE_LIMIT_MS) {
    return getFallbackAdvice(density, destination);
  }

  // ✅ No API key → fallback
  if (!ai) {
    return getFallbackAdvice(density, destination);
  }

  try {
    isRequestInFlight = true; // ✅ lock
    lastCallTime = now;

    const prompt = `You are an event accessibility assistant. Current crowd density is ${density}%. The user wants to go to ${destination}. Provide a short 1-2 sentence recommendation, keeping neurodivergent crowd-anxiety needs in mind.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response?.text?.trim();

    if (text) {
      cache.set(cacheKey, { response: text, timestamp: now });
      return text;
    }
  } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error(String(error));
    const errorMessage = err.message.toLowerCase();
    const errorCode = (error as Record<string, unknown>)?.['status'] ?? (error as Record<string, unknown>)?.['code'];

    if (errorMessage.includes('quota') || errorCode === 429) {
      quotaExceeded = true;

      if (!hasLoggedQuotaWarning) {
        console.warn("Gemini quota exceeded — switching to fallback.");
        hasLoggedQuotaWarning = true;
      }
    } else {
      if (!hasLoggedFallbackWarning) {
        console.warn("Gemini API failed, using fallback:", err.message);
        hasLoggedFallbackWarning = true;
      }
    }
  } finally {
    isRequestInFlight = false; // ✅ unlock
  }

  return getFallbackAdvice(density, destination);
};