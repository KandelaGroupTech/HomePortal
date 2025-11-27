import React, { useState, useEffect } from 'react';
import { Settings, RefreshCw, MapPin } from 'lucide-react';
import Clock from './components/Clock';
import WifiCard from './components/WifiCard';
import WeatherWidget from './components/WeatherWidget';
import EventsCard from './components/EventsCard';
import SettingsModal from './components/SettingsModal';
import NewsTicker from './components/NewsTicker';
import { DEFAULT_GUEST, DEFAULT_WIFI, INITIAL_EVENTS } from './constants';
import { Guest, WifiConfig, LocalEvent } from './types';
import { generateDailyBriefing, getLocalRecommendation } from './services/gemini';

function App() {
  const [guest, setGuest] = useState<Guest>(DEFAULT_GUEST);
  const [wifi, setWifi] = useState<WifiConfig>(DEFAULT_WIFI);
  const [events, setEvents] = useState<LocalEvent[]>(INITIAL_EVENTS);
  const [dailyBriefing, setDailyBriefing] = useState<string>('Loading personalized briefing...');
  const [recommendation, setRecommendation] = useState<{title: string, description: string} | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    // Determine time of day
    const hour = new Date().getHours();
    let timeOfDay = "morning";
    if (hour >= 12 && hour < 17) timeOfDay = "afternoon";
    if (hour >= 17) timeOfDay = "evening";

    const [briefing, rec] = await Promise.all([
      generateDailyBriefing(guest.name, timeOfDay),
      getLocalRecommendation()
    ]);

    setDailyBriefing(briefing);
    setRecommendation(rec);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // Refresh content every hour to keep it dynamic
    const interval = setInterval(fetchData, 3600000);
    return () => clearInterval(interval);
  }, [guest.name]);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900 via-slate-900 to-black text-slate-200 p-6 md:p-12 relative overflow-hidden font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Background Ambience - Light Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col h-full min-h-[90vh]">
        
        {/* Header */}
        <header className="flex justify-between items-start mb-8">
          <div className="flex flex-col">
             <div className="flex items-center gap-3 mb-2 opacity-90">
                {/* Branding Logos/Icons */}
                <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-ghana-red shadow-[0_0_8px_rgba(206,17,38,0.6)]"></span>
                    <span className="w-2 h-2 rounded-full bg-ghana-yellow shadow-[0_0_8px_rgba(252,209,22,0.6)]"></span>
                    <span className="w-2 h-2 rounded-full bg-ghana-green shadow-[0_0_8px_rgba(0,107,63,0.6)]"></span>
                </div>
                <div className="h-4 w-[1px] bg-white/40"></div>
                <div className="flex gap-1">
                     <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]"></span>
                    <span className="w-2 h-2 rounded-full bg-white border border-gray-200 shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></span>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-white/80 ml-2 font-semibold drop-shadow-md">Casa Springville</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide drop-shadow-lg">
               Welcome, <span className="text-teal-200 italic">{guest.name.split(' ')[0]}</span>.
             </h1>
          </div>
          <div className="flex items-start gap-8">
            <Clock />
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="mt-2 p-2 rounded-full hover:bg-white/10 transition-all opacity-0 hover:opacity-100 group backdrop-blur-sm"
            >
              <Settings className="w-6 h-6 text-white/50 group-hover:text-white" />
            </button>
          </div>
        </header>

        {/* News Ticker */}
        <NewsTicker />

        {/* Main Grid Layout */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
          
          {/* Left Column: Briefing & Wifi */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Dynamic Briefing Card */}
            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl shadow-black/50 relative overflow-hidden group hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
               {/* Decorative quote mark */}
               <div className="absolute top-4 right-8 text-9xl font-serif text-white/5 -z-0 select-none">"</div>
               
               <div className="relative z-10">
                   <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={fetchData} disabled={loading} className="p-2 hover:bg-white/10 rounded-full">
                           <RefreshCw className={`w-4 h-4 text-teal-400 ${loading ? 'animate-spin' : ''}`} />
                       </button>
                   </div>
                   <h3 className="text-teal-400 font-medium uppercase tracking-widest text-sm mb-4 font-bold">Concierge Note</h3>
                   <p className="text-2xl md:text-3xl font-serif leading-relaxed text-white/90">
                     "{dailyBriefing}"
                   </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
               <WifiCard config={wifi} />
               <div className="flex flex-col gap-6">
                 {/* Recommendation Widget */}
                 <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl shadow-black/50 flex-grow hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3 text-teal-400">
                        <MapPin className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-wider">Local Gem</span>
                    </div>
                    {recommendation ? (
                        <>
                            <h4 className="text-xl font-medium text-white mb-2">{recommendation.title}</h4>
                            <p className="text-slate-300 leading-relaxed">{recommendation.description}</p>
                        </>
                    ) : (
                        <div className="animate-pulse flex flex-col gap-2">
                            <div className="h-6 bg-white/10 rounded w-3/4"></div>
                            <div className="h-4 bg-white/10 rounded w-full"></div>
                            <div className="h-4 bg-white/10 rounded w-2/3"></div>
                        </div>
                    )}
                 </div>
                 
                 {/* Quick Info */}
                 <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex items-center justify-between shadow-lg shadow-black/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    <div>
                        <p className="text-xs uppercase text-slate-400 mb-1">Emergency</p>
                        <p className="text-xl font-bold text-white">Dial 911</p>
                    </div>
                     <div className="h-8 w-[1px] bg-white/10"></div>
                     <div>
                        <p className="text-xs uppercase text-slate-400 mb-1">House Manager</p>
                        <p className="text-xl font-bold text-white">+1 (555) 012-3456</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column: Weather & Events */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="h-48">
              <WeatherWidget />
            </div>
            <div className="flex-grow">
              <EventsCard events={events} />
            </div>
          </div>

        </main>

        <footer className="mt-12 text-center text-white/40 text-xs tracking-widest uppercase drop-shadow">
            <p>Casa Springville • Est. 2024 • Accra & Chicago</p>
        </footer>

      </div>
      
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        guest={guest}
        setGuest={setGuest}
        wifi={wifi}
        setWifi={setWifi}
      />
    </div>
  );
}

export default App;