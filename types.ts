export interface TimeState {
  hours: string;
  minutes: string;
  seconds: string;
  ampm: string;
}

export interface FlipCardProps {
  value: string;
  label?: string; // Optional label (e.g., AM/PM or unit name)
  isHour?: boolean; // Special handling for hour card (AM/PM badge)
  ampm?: string;
  cornerLabel?: string; // Content for the bottom-right corner (e.g., seconds)
}