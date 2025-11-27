import React from 'react';
import { CloudSun, Droplets, Wind } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  // In a real app, this would fetch from an API.
  // Using static mock data for stability in this demo without specific API keys.
  const weather = {
    temp: 74,
    condition: "Partly Sunny",
    high: 78,
    low: 65,
    humidity: 45,
    wind: "8 mph"
  };

  return (
    <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl p-6 text-white flex flex-col justify-between h-full relative overflow-hidden shadow-xl shadow-teal-900/20 border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>

      <div className="flex justify-between items-start z-10">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium opacity-90 mb-1">
            <span className="uppercase tracking-widest text-teal-50">Springville</span>
          </div>
          <h3 className="text-5xl font-light font-serif drop-shadow-md">{weather.temp}°</h3>
          <p className="text-lg font-medium mt-1 text-teal-50">{weather.condition}</p>
        </div>
        <CloudSun className="w-16 h-16 text-yellow-300 opacity-90 drop-shadow-md" />
      </div>

      <div className="flex gap-6 mt-6 z-10">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
               <Droplets className="w-4 h-4 text-teal-50" />
            </div>
            <div>
                <p className="text-xs opacity-80 text-teal-50">Humidity</p>
                <p className="font-medium">{weather.humidity}%</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
               <Wind className="w-4 h-4 text-teal-50" />
            </div>
             <div>
                <p className="text-xs opacity-80 text-teal-50">Wind</p>
                <p className="font-medium">{weather.wind}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;