import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CalendarPlus, CloudSun } from 'lucide-react';
import { formatTime } from '@/utils/time';

export function EventPulse({ nextEvent, nextEventTime, endTime }: { nextEvent: string, nextEventTime: string, endTime: string }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Fetch live weather for San Francisco (Moscone Center)
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.78&longitude=-122.40&current_weather=true');
        const data = await res.json();
        setTemperature(`${Math.round(data.current_weather.temperature)}°C`);
      } catch (error) {
        console.error("Failed to fetch weather", error);
      }
    };
    fetchWeather();

    return () => clearInterval(timer);
  }, []);

  const nextEventDate = new Date(nextEventTime);
  const endDate = new Date(endTime);
  
  const timeToNext = Math.max(0, Math.floor((nextEventDate.getTime() - currentTime.getTime()) / 1000));
  const timeToEnd = Math.max(0, Math.floor((endDate.getTime() - currentTime.getTime()) / 1000));

  // Generate Google Calendar Link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(nextEvent)}&dates=${nextEventDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent("Event scheduled via spotME")}`;

  return (
    <Card className="bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden" role="region" aria-label="Event Timing">
      <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-zinc-100">
          <Clock className="w-6 h-6 text-amber-400" aria-hidden="true" />
          My Event Stats
        </CardTitle>
        <div className="flex items-center gap-2">
          {temperature && (
            <div className="flex items-center gap-1.5 text-xs font-medium bg-sky-950/50 text-sky-300 px-2 py-1 rounded-md border border-sky-900/50" aria-label={`Current temperature is ${temperature}`}>
              <CloudSun className="w-3.5 h-3.5" aria-hidden="true" />
              {temperature}
            </div>
          )}
          <a 
            href={googleCalendarUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded-md transition-colors border border-zinc-700"
            aria-label="Save to Google Calendar"
          >
            <CalendarPlus className="w-3.5 h-3.5" aria-hidden="true" />
            Save
          </a>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center p-4 gap-4">
        
        <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50 flex flex-col items-center justify-center" role="timer" aria-label={`Time until ${nextEvent}`}>
          <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-1">Next: {nextEvent}</span>
          <span className="text-4xl font-mono font-bold text-amber-400 tracking-tight" aria-live="off">
            {formatTime(timeToNext)}
          </span>
        </div>

        <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50 flex flex-col items-center justify-center" role="timer" aria-label="Time to finish">
          <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-1">Time to Finish</span>
          <span className="text-3xl font-mono font-bold text-zinc-300 tracking-tight" aria-live="off">
            {formatTime(timeToEnd)}
          </span>
        </div>

      </CardContent>
    </Card>
  );
}
