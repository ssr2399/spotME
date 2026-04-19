export interface SmartTicketProps {
  eventName?: string;
  section: string;
  density: number;
}

export interface EventPulseProps {
  nextEvent: string;
  nextEventTime: string;
  endTime: string;
}

export interface PredictiveNavigationProps {
  density: number;
}
