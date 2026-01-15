import React, { useEffect, useState } from 'react';
import { fetchCalendarEvents, CalendarEvent } from '../services/geminiService';
import { Calendar, MapPin, Trophy, Loader2, Star, Clock } from 'lucide-react';

const CalendarEvents: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchCalendarEvents();
        setEvents(data);
      } catch (e) {
        console.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="p-3 bg-indigo-900/30 rounded-xl border border-indigo-900/50">
              <Calendar className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white font-serif">Tournament Calendar</h2>
              <p className="text-slate-400">Upcoming PDC & WDF Major Events</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-400 flex items-center">
              <Star className="w-3 h-3 mr-1 text-yellow-500" /> Major
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-400 flex items-center">
              <Trophy className="w-3 h-3 mr-1 text-emerald-500" /> World Series
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
            <p className="text-slate-400">Syncing with tournament database...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => (
              <div 
                key={index} 
                className="group relative bg-slate-900 rounded-xl border border-slate-800 p-6 hover:border-indigo-500/50 transition-all duration-300 shadow-lg"
              >
                {/* Connector Line for Timeline Effect */}
                {index !== events.length - 1 && (
                  <div className="absolute left-[2.25rem] top-[5rem] bottom-[-2rem] w-0.5 bg-slate-800 group-hover:bg-slate-700 transition-colors hidden md:block z-0"></div>
                )}

                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                  {/* Date Column */}
                  <div className="md:w-48 flex-shrink-0 flex md:flex-col items-center md:items-start md:border-r md:border-slate-800 md:pr-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 mb-2 md:mb-4">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="text-lg font-bold text-white text-center md:text-left">{event.dates.split('-')[0].trim()}</div>
                    <div className="text-sm text-slate-500 hidden md:block">to {event.dates.split('-')[1]?.trim() || 'TBD'}</div>
                  </div>

                  {/* Content Column */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {event.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide mt-2 md:mt-0 w-fit ${
                        event.type === 'Major' 
                          ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-700/50' 
                          : 'bg-emerald-900/30 text-emerald-400 border border-emerald-700/50'
                      }`}>
                        {event.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-400 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-slate-500" />
                        Prize Fund: <span className="text-slate-200 ml-1 font-medium">{event.prizeFund}</span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4 mt-2">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarEvents;