import React from 'react';
import { LocalEvent } from '../types';
import { Calendar, Coffee, Map, Film, Star } from 'lucide-react';

interface EventsCardProps {
  events: LocalEvent[];
}

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'coffee': return <Coffee className="w-5 h-5 text-amber-300" />;
    case 'map': return <Map className="w-5 h-5 text-emerald-300" />;
    case 'film': return <Film className="w-5 h-5 text-rose-300" />;
    default: return <Star className="w-5 h-5 text-yellow-300" />;
  }
};

const EventsCard: React.FC<EventsCardProps> = ({ events }) => {
  return (
    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 h-full flex flex-col shadow-xl shadow-black/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/10 rounded-lg">
          <Calendar className="w-6 h-6 text-teal-400" />
        </div>
        <h2 className="text-xl font-serif font-medium text-white">Upcoming Highlights</h2>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">
        {events.map((event) => (
          <div key={event.id} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
            <div className="flex-shrink-0 mt-1 p-2 bg-white/10 rounded-full group-hover:bg-teal-500/20 transition-colors text-teal-200">
              {getIcon(event.icon)}
            </div>
            <div>
              <h4 className="font-medium text-white text-lg leading-tight">{event.title}</h4>
              <p className="text-teal-400 text-sm font-medium mt-1 mb-1 uppercase tracking-wide text-xs">{event.time}</p>
              <p className="text-slate-400 text-sm leading-snug">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsCard;