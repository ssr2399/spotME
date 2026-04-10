import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function SmartTicket({ section, density }: { section: string, density: number }) {
  const getDensityColor = (d: number) => {
    if (d < 40) return 'bg-emerald-500';
    if (d < 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

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
        
        <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
          <p className="text-sm text-zinc-400 mb-1">Section</p>
          <p className="text-lg font-semibold text-zinc-200">{section}</p>
        </div>

        <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50" aria-live="polite">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-sm text-zinc-400 flex items-center gap-1.5 mb-1">
                <Users className="w-4 h-4" aria-hidden="true" />
                Crowd Stats
              </p>
              <p className="text-sm font-medium text-zinc-300">{getDensityText(density)}</p>
            </div>
            <span className="text-2xl font-bold text-zinc-100">{density}%</span>
          </div>
          <Progress value={density} className="h-2 bg-zinc-800" indicatorClassName={getDensityColor(density)} aria-label={`Crowd density is ${density}%`} />
        </div>

        {/* Placeholder QR Code */}
        <div className="flex-1 min-h-[150px] bg-white rounded-lg flex items-center justify-center p-2" aria-hidden="true">
          <div className="w-full h-full border-4 border-dashed border-zinc-200 rounded flex items-center justify-center">
            <span className="text-zinc-400 font-mono text-xs">QR_CODE_DATA</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
