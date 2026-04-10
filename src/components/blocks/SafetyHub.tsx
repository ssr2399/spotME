import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Phone, EarOff, MessageSquareWarning } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SafetyHub() {
  return (
    <Card className="bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden" role="region" aria-label="Safety and Support">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-zinc-100">
          <ShieldAlert className="w-6 h-6 text-red-400" aria-hidden="true" />
          Safety for ME
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 p-4">
        
        <a 
          href="tel:100"
          className={cn(buttonVariants({ variant: "destructive" }), "h-full flex flex-col gap-2 bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-900/50")} 
          aria-label="Call Police 100"
        >
          <Phone className="w-6 h-6 text-red-400" aria-hidden="true" />
          <span className="font-bold text-sm">Police (100)</span>
        </a>

        <a 
          href="tel:108"
          className={cn(buttonVariants({ variant: "destructive" }), "h-full flex flex-col gap-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 border border-rose-900/50")} 
          aria-label="Call Medical 108"
        >
          <Phone className="w-6 h-6 text-rose-400" aria-hidden="true" />
          <span className="font-bold text-sm">Medical (108)</span>
        </a>

        <Button variant="secondary" className="h-full flex flex-col gap-2 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-200 border border-indigo-900/50" aria-label="Find Quiet Room">
          <EarOff className="w-6 h-6 text-indigo-400" aria-hidden="true" />
          <span className="font-bold text-sm">Quiet Room</span>
        </Button>

        <Button variant="secondary" className="h-full flex flex-col gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50" aria-label="Contact Event Organizers">
          <MessageSquareWarning className="w-6 h-6 text-zinc-400" aria-hidden="true" />
          <span className="font-bold text-sm">Organizers</span>
        </Button>

      </CardContent>
    </Card>
  );
}
