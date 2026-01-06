import React from 'react';
import { FlipClock } from './components/FlipClock';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Main Content */}
      <main className="z-10 flex flex-col items-center w-full">
        <FlipClock />
      </main>

      {/* Project Name Footer */}
      <div className="fixed bottom-6 right-8 z-50 pointer-events-none select-none">
        <span className="font-['Instrument_Serif'] italic text-[#333333] text-2xl sm:text-3xl md:text-4xl tracking-wide opacity-80">
          the big ass clock
        </span>
      </div>
    </div>
  );
};

export default App;