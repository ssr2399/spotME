import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Navigation, Map as MapIcon, Sparkles, ExternalLink } from 'lucide-react';
import { getAIAdvice } from '@/lib/gemini';
import { logAnalyticsEvent } from '@/lib/firebase';
import { PredictiveNavigationProps } from '@/types';

type DestinationKey = 'exit' | 'restroom' | 'entrance' | 'food';

const DESTINATIONS = {
  exit: { 
    label: 'Exit A', 
    color: 'text-emerald-400', 
    bgColor: 'bg-emerald-900/80',
    borderColor: 'border-emerald-700',
    stroke: '#34d399', 
    path: 'M 50,150 Q 100,150 150,100 T 250,50' 
  },
  restroom: { 
    label: 'Restroom B', 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-900/80',
    borderColor: 'border-blue-700',
    stroke: '#60a5fa', 
    path: 'M 50,150 Q 100,100 150,150 T 250,100' 
  },
  entrance: { 
    label: 'Gate 3', 
    color: 'text-amber-400', 
    bgColor: 'bg-amber-900/80',
    borderColor: 'border-amber-700',
    stroke: '#fbbf24', 
    path: 'M 50,150 Q 150,150 200,100 T 250,150' 
  },
  food: { 
    label: 'Snack Bar', 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-900/80',
    borderColor: 'border-purple-700',
    stroke: '#c084fc', 
    path: 'M 50,150 Q 100,50 150,100 T 250,50' 
  }
};

export function PredictiveNavigation({ density }: PredictiveNavigationProps) {
  const [aiTip, setAiTip] = useState<string>("Analyzing optimal routes...");
  const [activeDest, setActiveDest] = useState<DestinationKey>('exit');

  const currentDest = useMemo(() => DESTINATIONS[activeDest], [activeDest]);
  
  // 2. Google Maps URLs Integration
  // Generates an official cross-platform link to open the native Google Maps app for walking directions
  const googleMapsDirUrl = useMemo(() => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(currentDest.label + ', Moscone Center, San Francisco')}&travelmode=walking`, [currentDest.label]);

  useEffect(() => {
    let mounted = true;
    
    // Add 2 second debounce before calling AI Tip
    const timerId = setTimeout(() => {
      const fetchTip = async () => {
        setAiTip("Analyzing optimal routes...");
        const tip = await getAIAdvice(density, currentDest.label);
        if (mounted) setAiTip(tip);
      };
      fetchTip();
    }, 2000);

    return () => { 
      mounted = false; 
      clearTimeout(timerId);
    };
  }, [density, currentDest.label]);

  const handleDestClick = (dest: DestinationKey) => {
    setActiveDest(dest);
    
    // Log telemetry data safely
    logAnalyticsEvent('select_destination', {
      destination_name: DESTINATIONS[dest].label,
      current_density: density,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden" role="region" aria-label="Predictive Navigation">
      <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-zinc-100">
          <Navigation className="w-6 h-6 text-emerald-400" aria-hidden="true" />
          Navigate for ME
        </CardTitle>
        <Badge variant="outline" className="bg-emerald-950/50 text-emerald-300 border-emerald-800" aria-label="Live Flow Active">
          Live Flow
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 pt-0 gap-3 min-h-0">
        
        {/* AI Tip Banner */}
        <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-lg p-2 flex items-start gap-2" aria-live="polite">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-indigo-200 font-medium leading-tight">{aiTip}</p>
        </div>

        {/* Map Placeholder */}
        <div className="flex-1 bg-zinc-950 rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center min-h-[200px]" aria-label="Live Map Visualization" role="img">
          {/* Grid lines for map feel */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#3f3f46 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3 }}></div>
          
          {/* Route visualization */}
          <svg className="absolute inset-0 w-full h-full transition-all duration-500" preserveAspectRatio="none" aria-hidden="true">
            <path 
              d={currentDest.path} 
              fill="none" 
              stroke={currentDest.stroke} 
              strokeWidth="4" 
              strokeDasharray="8 4" 
              className="animate-[dash_1s_linear_infinite] transition-all duration-500" 
            />
            <circle cx="50" cy="150" r="6" fill="#60a5fa" />
            <circle cx="250" cy="50" r="8" fill={currentDest.stroke} className="transition-colors duration-500" />
            <circle cx="250" cy="100" r="8" fill={currentDest.stroke} className={`transition-colors duration-500 ${activeDest === 'restroom' ? 'opacity-100' : 'opacity-0'}`} />
            <circle cx="250" cy="150" r="8" fill={currentDest.stroke} className={`transition-colors duration-500 ${activeDest === 'entrance' ? 'opacity-100' : 'opacity-0'}`} />
          </svg>
          
          <div className="absolute bottom-2 left-2 bg-zinc-900/80 backdrop-blur px-2 py-1 rounded-md border border-zinc-700 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-400" aria-hidden="true"></div>
            <span className="text-[10px] font-medium text-zinc-200">You</span>
          </div>
          
          <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
            <div className={`${currentDest.bgColor} backdrop-blur px-2 py-1 rounded-md border ${currentDest.borderColor} flex items-center gap-1.5 transition-colors duration-500`}>
              <MapIcon className={`w-2 h-2 ${currentDest.color}`} aria-hidden="true" />
              <span className={`text-[10px] font-medium ${currentDest.color}`}>{currentDest.label}</span>
            </div>
            
            {/* Google Maps External Link */}
            <a 
              href={googleMapsDirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-medium bg-blue-600 hover:bg-blue-500 text-white px-2 py-1.5 rounded-md transition-colors shadow-sm"
              aria-label={`Get walking directions to ${currentDest.label} in Google Maps`}
            >
              <ExternalLink className="w-3 h-3" />
              Open in Maps
            </a>
          </div>
        </div>

        {/* 4 Navigation Buttons */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-24 shrink-0">
          <Button 
            variant="secondary" 
            onClick={() => handleDestClick('exit')}
            className={`h-full flex items-center justify-start gap-2 px-3 transition-colors ${activeDest === 'exit' ? 'bg-zinc-700 border-emerald-500/50' : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700/50'} text-zinc-100 border`} 
            aria-label="Navigate to Nearest Exit"
            aria-pressed={activeDest === 'exit'}
          >
            <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-xs sm:text-sm truncate">Nearest Exit</span>
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => handleDestClick('restroom')}
            className={`h-full flex items-center justify-start gap-2 px-3 transition-colors ${activeDest === 'restroom' ? 'bg-zinc-700 border-blue-500/50' : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700/50'} text-zinc-100 border`} 
            aria-label="Navigate to Restrooms"
            aria-pressed={activeDest === 'restroom'}
          >
            <ArrowRight className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-xs sm:text-sm truncate">Restrooms</span>
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => handleDestClick('entrance')}
            className={`h-full flex items-center justify-start gap-2 px-3 transition-colors ${activeDest === 'entrance' ? 'bg-zinc-700 border-amber-500/50' : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700/50'} text-zinc-100 border`} 
            aria-label="Navigate to Entrance"
            aria-pressed={activeDest === 'entrance'}
          >
            <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-xs sm:text-sm truncate">Entrance</span>
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => handleDestClick('food')}
            className={`h-full flex items-center justify-start gap-2 px-3 transition-colors ${activeDest === 'food' ? 'bg-zinc-700 border-purple-500/50' : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700/50'} text-zinc-100 border`} 
            aria-label="Navigate to Food and Drink"
            aria-pressed={activeDest === 'food'}
          >
            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-xs sm:text-sm truncate">Food & Drink</span>
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
