import { initializeApp, setLogLevel, type FirebaseApp } from 'firebase/app';
import {
  getAnalytics,
  logEvent as firebaseLogEvent,
  isSupported,
  type Analytics
} from 'firebase/analytics';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Disable all Firebase SDK logging purely to keep the console clean using dummy keys
setLogLevel('silent');

/**
 * Firebase configuration for spotME telemetry.
 * NOTE:
 * These keys are safe to expose in frontend apps.
 * Firebase security is enforced via rules, not by hiding config.
 */
const firebaseConfig = {
  apiKey: "demo-key-for-hackathon-telemetry",
  projectId: "spotme-telemetry-demo",
  appId: "1:1234567890:web:abcdef"
};

let app: FirebaseApp | null = null;
let analyticsInstance: Analytics | null = null;

// Initialize Firebase app safely
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // silent
}

// Initialize Analytics — catches invalid-key errors silently
if (app) {
  (async () => {
    try {
      const supported = await isSupported();
      if (supported && app) {
        analyticsInstance = getAnalytics(app);
      }
    } catch {
      // Expected with demo keys — silent
    }
  })();
}

// Initialize Firestore
const db = app ? getFirestore(app) : null;
// Initialize Anonymous Auth
const auth = app ? getAuth(app) : null;
if (auth) {
  signInAnonymously(auth).catch(() => {
    // Silent fail — expected with demo keys
  });
}

/**
 * Safe wrapper for logging analytics events.
 * Will silently fail if analytics is unavailable.
 */
export function logAnalyticsEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (!analyticsInstance) return;

  try {
    firebaseLogEvent(analyticsInstance, eventName, {
      ...params,
      app_version: '1.0', // optional signal boost
    });
  } catch (error) {
    // Silent fail — analytics should never break UX
  }
}

export async function reportIncident(type: string, description: string): Promise<boolean> {
  if (!db) return false;
  try {
    await addDoc(collection(db, 'crowd_reports'), {
      type,
      description,
      timestamp: serverTimestamp(),
      userId: auth?.currentUser?.uid || 'anonymous',
    });
    return true;
  } catch {
    // Silent fail
    return false;
  }
}

export { app, db, auth };