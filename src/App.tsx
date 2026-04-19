import { useState, useEffect } from 'react';
import { SmartTicket } from '@/components/blocks/SmartTicket';
import { EventPulse } from '@/components/blocks/EventPulse';
import { SafetyHub } from '@/components/blocks/SafetyHub';
import { PredictiveNavigation } from '@/components/blocks/PredictiveNavigation';

// Mock Data
const EVENT_DATA = {
  eventName: "IPL Final 2026 — Wankhede Stadium",
  section: "Block K, Row 14, Seat 7",
  crowdDensity: 35,
  nextEvent: "Second Innings",
  nextEventTime: new Date(Date.now() + 45 * 60000).toISOString(),
  endTime: new Date(Date.now() + 180 * 60000).toISOString(),
};


export default function App() {
  const [density, setDensity] = useState(EVENT_DATA.crowdDensity);

  useEffect(() => {
    // Simulate slight density changes
    const densityTimer = setInterval(() => {
      setDensity(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(10, Math.min(90, prev + change));
      });
    }, 5000);

    return () => clearInterval(densityTimer);
  }, []);

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-zinc-950 focus:text-zinc-50"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen w-full bg-zinc-950 text-zinc-50 overflow-y-auto p-4 md:p-8 font-sans select-none flex flex-col items-center justify-center" aria-label="spotME Dashboard">
        <h1 className="sr-only">spotME Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl">
        <SmartTicket eventName={EVENT_DATA.eventName} section={EVENT_DATA.section} density={density} />
        <EventPulse nextEvent={EVENT_DATA.nextEvent} nextEventTime={EVENT_DATA.nextEventTime} endTime={EVENT_DATA.endTime} />
        <SafetyHub />
        <PredictiveNavigation density={density} />
      </div>
    </main>
    </>
  );
}

