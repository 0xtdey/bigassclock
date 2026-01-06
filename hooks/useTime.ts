import { useState, useEffect } from 'react';
import { TimeState } from '../types';

export const useTime = (): TimeState => {
  const [time, setTime] = useState<TimeState>({
    hours: '00',
    minutes: '00',
    seconds: '00',
    ampm: 'AM',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTime({
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
        ampm,
      });
    };

    updateTime();
    
    // Sync with milliseconds to update exactly on the second
    const now = new Date();
    const msUntilNextSecond = 1000 - now.getMilliseconds();
    
    let timer: number;
    
    const startInterval = () => {
      updateTime();
      timer = window.setInterval(updateTime, 1000);
    };

    const timeout = window.setTimeout(startInterval, msUntilNextSecond);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(timer);
    };
  }, []);

  return time;
};