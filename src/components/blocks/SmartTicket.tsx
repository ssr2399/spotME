import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, Users, Wallet, Map as MapIcon } from 'lucide-react';

export function SmartTicket({ section, density }: { section: string, density: number }) {
  const getDensityText = (d: number) => {
    if (d < 40) return 'Low (Comfortable)';
    if (d < 70) return 'Moderate (Busy)';
    return 'High (Crowded)';
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden" role="region" aria-label="Ticket Information">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-zinc-100">
          <Ticket className="w-6 h-6 text-blue-400" aria-hidden="true" />
          My Ticket
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between p-4 gap-4">
        
        <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400 mb-1">Section</p>
            <p className="text-lg font-semibold text-zinc-200">{section}</p>
          </div>
          <button className="flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 px-3 py-2 rounded-full font-medium text-sm transition-colors shadow-sm" aria-label="Save to Google Wallet">
            <Wallet className="w-4 h-4" />
            Add to Wallet
          </button>
        </div>

        {/* Live Heatmap Legend replacing static progress bar */}
        <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50" aria-live="polite">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-sm text-zinc-400 flex items-center gap-1.5 mb-1">
                <MapIcon className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                Live Heatmap Status
              </p>
              <p className="text-sm font-medium text-zinc-300">{getDensityText(density)}</p>
            </div>
            <span className="text-2xl font-bold text-zinc-100">{density}%</span>
          </div>
          {/* Heatmap Gradient Bar */}
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 relative mt-2" aria-hidden="true">
            {/* Indicator dot showing current density on the heatmap scale */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-zinc-900 rounded-full shadow-md transition-all duration-500"
              style={{ left: `calc(${density}% - 6px)` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-medium uppercase">
            <span>Clear</span>
            <span>Congested</span>
          </div>
        </div>

        {/* Bottom Section: Map */}
        <div className="flex-1 min-h-[120px] flex gap-2" aria-hidden="true">
          {/* Google Maps Location */}
          <div className="w-full rounded-lg overflow-hidden border border-zinc-800 relative bg-zinc-950">
            <iframe 
              title="Venue Map"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              src="https://maps.google.com/maps?q=Moscone+Center,San+Francisco&t=&z=14&ie=UTF8&iwloc=&output=embed"
            />
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/60 to-transparent p-2 pointer-events-none">
              <span className="text-[10px] font-bold text-white drop-shadow-md flex items-center gap-1">
                📍 Venue Location
              </span>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
