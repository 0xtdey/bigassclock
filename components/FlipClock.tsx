import React from 'react';
import { FlipCard } from './FlipCard';
import { useTime } from '../hooks/useTime';

export const FlipClock: React.FC = () => {
  const { hours, minutes, seconds, ampm } = useTime();

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 p-4">
      {/* Hours Group */}
      <FlipCard value={hours} isHour={true} ampm={ampm} />

      {/* Minutes Group with Seconds in corner */}
      <FlipCard value={minutes} cornerLabel={seconds} />
    </div>
  );
};