import React, { useEffect, useState } from 'react';
import { FlipCardProps } from '../types';

export const FlipCard: React.FC<FlipCardProps> = ({ value, isHour, ampm, cornerLabel }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  
  useEffect(() => {
    if (value !== currentValue) {
      setPrevValue(currentValue);
      setCurrentValue(value);
      setIsFlipping(true);
    }
  }, [value, currentValue]);

  const handleAnimationEnd = () => {
    setIsFlipping(false);
    setPrevValue(value);
  };

  // Sizing: Squarer aspect ratio, larger border radius
  // Mobile: w-36 h-36, Desktop: w-96 h-96 approx
  const containerClass = "relative w-[42vw] h-[42vw] max-w-[400px] max-h-[400px] perspective-[1200px] group";
  
  // Typography: Massive font, tight tracking
  const textSizeClass = "text-[28vw] sm:text-[25vw] md:text-[250px] leading-none font-black tracking-tighter";
  
  // Colors from reference
  const cardBgClass = "bg-[#111111]"; // Very dark grey, almost black
  const digitColorClass = "text-[#E6E6E6]"; // Light silver/grey
  const labelColorClass = "text-[#525252]"; // Darker grey for AM/PM/Seconds
  
  // Shared structural classes
  const halfCardClass = `absolute left-0 w-full h-1/2 overflow-hidden bg-[#111111] ${digitColorClass}`;
  
  return (
    <div className={containerClass}>
      {/* 
        STATIC LAYERS 
      */}
      
      {/* Upper Static (Shows NEXT value) */}
      <div className={`${halfCardClass} top-0 z-0 rounded-t-[2.5rem]`}>
        {/* Content Container - shifted down to center vertically in the full card */}
        <div className={`absolute top-0 left-0 w-full h-[200%] flex justify-center items-center ${textSizeClass}`}>
           {currentValue}
        </div>
        
        {/* AM/PM Indicator (Top Left) - No background, just text */}
        {isHour && ampm && (
          <div className={`absolute top-4 left-6 sm:top-6 sm:left-8 z-20 ${labelColorClass} text-2xl sm:text-4xl font-black tracking-wider`}>
             {ampm}
          </div>
        )}

        {/* Shadow overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/40 z-10"></div>
      </div>

      {/* Lower Static (Shows NEXT value) */}
      <div className={`${halfCardClass} bottom-0 z-0 rounded-b-[2.5rem]`}>
         {/* Content Container - shifted up */}
         <div className={`absolute -top-full left-0 w-full h-[200%] flex justify-center items-center ${textSizeClass}`}>
            {currentValue}
         </div>
      </div>


      {/* 
        ANIMATING FLIPPER
      */}
      {isFlipping && (
        <div 
          className="absolute top-0 left-0 w-full h-1/2 z-10 origin-bottom preserve-3d animate-flip-down"
          onAnimationEnd={handleAnimationEnd}
        >
          {/* FRONT FACE (Shows PREV value Top Half) */}
          <div className={`absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-t-[2.5rem] bg-[#111111] ${digitColorClass}`}>
             <div className={`absolute top-0 left-0 w-full h-[200%] flex justify-center items-center ${textSizeClass}`}>
                {prevValue}
             </div>
             
             {/* AM/PM must persist on the flipping leaf */}
             {isHour && ampm && (
                <div className={`absolute top-4 left-6 sm:top-6 sm:left-8 z-20 ${labelColorClass} text-2xl sm:text-4xl font-black tracking-wider`}>
                   {ampm}
                </div>
             )}

             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 animate-[fadeOut_0.6s_ease-in] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/40 z-10"></div>
          </div>

          {/* BACK FACE (Shows NEXT value Bottom Half) */}
          <div className={`absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-t-[2.5rem] bg-[#111111] rotate-x-180 ${digitColorClass}`}>
             <div className={`absolute -top-full left-0 w-full h-[200%] flex justify-center items-center ${textSizeClass}`}>
                {currentValue}
             </div>
             <div className="absolute inset-0 bg-black/60 animate-[fadeIn_0.6s_ease-out] pointer-events-none"></div>
          </div>
        </div>
      )}
      
      {/* 
        PREV VALUE BOTTOM (Static Overlay)
      */}
      {isFlipping && (
        <div className={`${halfCardClass} bottom-0 z-0 rounded-b-[2.5rem]`}>
          <div className={`absolute -top-full left-0 w-full h-[200%] flex justify-center items-center ${textSizeClass}`}>
              {prevValue}
          </div>
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        </div>
      )}

      {/* Split Line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] -mt-[1px] bg-[#000000] z-20"></div>

      {/* 
        Bottom Right Corner Label (Seconds) 
        Styled to match AM/PM color and weight
      */}
      {cornerLabel && (
        <div className={`absolute bottom-4 right-6 sm:bottom-6 sm:right-8 z-30 ${labelColorClass} text-2xl sm:text-4xl font-black tracking-wider`}>
           {cornerLabel}
        </div>
      )}
    </div>
  );
};