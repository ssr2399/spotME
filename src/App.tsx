import { useState, useEffect } from 'react';
import { SmartTicket } from '@/components/blocks/SmartTicket';
import { EventPulse } from '@/components/blocks/EventPulse';
import { SafetyHub } from '@/components/blocks/SafetyHub';
import { PredictiveNavigation } from '@/components/blocks/PredictiveNavigation';

// Mock Data
const EVENT_DATA = {
  eventName: "Global Tech Summit 2026",
  section: "Block A, Row 12, Seat 4",
  crowdDensity: 35, // percentage
  nextEvent: "Keynote Speech",
  nextEventTime: new Date(Date.now() + 45 * 60000).toISOString(), // 45 mins from now
  endTime: new Date(Date.now() + 180 * 60000).toISOString(), // 3 hours from now
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
    <main className="min-h-screen w-full bg-zinc-950 text-zinc-50 overflow-y-auto p-4 md:p-8 font-sans select-none flex flex-col items-center justify-center" aria-label="spotME Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl">
        <SmartTicket section={EVENT_DATA.section} density={density} />
        <EventPulse nextEvent={EVENT_DATA.nextEvent} nextEventTime={EVENT_DATA.nextEventTime} endTime={EVENT_DATA.endTime} />
        <SafetyHub />
        <PredictiveNavigation density={density} />
      </div>
    </main>
  );
}

