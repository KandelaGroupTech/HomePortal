import React from 'react';

const HEADLINES = [
  "Local: Annual Jazz Festival kicks off this weekend at Springville Park",
  "World: Global climate summit reaches historic agreement on renewable energy",
  "Travel: Direct flights from Accra to Chicago announced for next season",
  "Community: Springville Farmers Market open every Saturday from 8 AM",
  "Tech: Smart home integration reaches new heights in luxury living",
  "Weather: Sunny skies predicted for the entire week in Springville"
];

const NewsTicker: React.FC = () => {
  return (
    <div className="w-full bg-black/80 backdrop-blur-md text-white overflow-hidden h-16 flex items-center rounded-xl shadow-lg mb-8 relative border border-teal-500/30 z-20">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] items-center shrink-0">
        {/* Quadruple content for robust looping with -50% translate */}
        {[...HEADLINES, ...HEADLINES, ...HEADLINES, ...HEADLINES].map((headline, i) => (
           <span key={i} className="mx-8 text-lg font-semibold tracking-wide flex items-center">
             <span className="text-teal-400 mr-3 text-2xl">•</span> {headline}
           </span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;