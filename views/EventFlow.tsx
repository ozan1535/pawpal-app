
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, Users, UserPlus, Check } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';

// --- EVENT DETAIL ---
interface EventDetailProps {
  eventId: string;
  onBack: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ eventId, onBack }) => {
  const event = MOCK_EVENTS.find(e => e.id === eventId) || MOCK_EVENTS[0];
  const [isJoined, setIsJoined] = useState(event.isJoined);

  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-black min-h-screen">
      {/* Hero Image */}
      <div className="relative h-72">
        <img src={event.image} className="w-full h-full object-cover" alt="Event" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
        <button onClick={onBack} className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 -mt-10 bg-stone-50 dark:bg-black rounded-t-[2.5rem] relative z-10 p-6 pb-24 animate-slide-in-from-bottom">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight">{event.title}</h1>
        
        <div className="flex items-center space-x-4 mb-6 text-sm font-bold text-gray-500">
           <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-primary" /> {event.date}</span>
           <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-primary" /> {event.time}</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm mb-6 flex items-start">
            <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Konum</h4>
                <p className="text-sm text-gray-500">{event.location}</p>
            </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Hakkında</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            {event.description}
        </p>

        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Katılımcılar ({event.attendees + (isJoined ? 1 : 0)})</h3>
        <div className="flex -space-x-2 overflow-hidden mb-8">
            {[1,2,3,4,5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-black bg-gray-200">
                    <img src={`https://i.pravatar.cc/100?img=${10+i}`} alt="User" className="w-full h-full rounded-full" />
                </div>
            ))}
             <div className="w-10 h-10 rounded-full border-2 border-white dark:border-black bg-gray-800 text-white flex items-center justify-center text-xs font-bold">
                 +{event.attendees - 5}
             </div>
        </div>
      </div>

      {/* Floating Join Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800">
        <button 
            onClick={() => setIsJoined(!isJoined)}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center transition-all ${
                isJoined 
                ? 'bg-gray-100 dark:bg-slate-800 text-gray-500' 
                : 'bg-primary text-white hover:scale-[1.02]'
            }`}
        >
            {isJoined ? (
                <>
                    <Check className="w-5 h-5 mr-2" /> Gidiyorsun
                </>
            ) : (
                <>
                    <UserPlus className="w-5 h-5 mr-2" /> Etkinliğe Katıl
                </>
            )}
        </button>
      </div>
    </div>
  );
};

// --- CREATE EVENT FORM ---
export const CreateEvent: React.FC<{onBack: () => void}> = ({ onBack }) => {
    return (
        <div className="flex flex-col h-full bg-stone-50 dark:bg-black min-h-screen">
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800">
                    <ArrowLeft className="w-6 h-6 dark:text-white" />
                </button>
                <h1 className="font-bold text-lg dark:text-white">Buluşma Oluştur</h1>
                <div className="w-10"></div>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Etkinlik Başlığı</label>
                    <input type="text" className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 font-bold dark:text-white" placeholder="Örn: Pug Partisi" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Tarih</label>
                        <input type="date" className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 font-medium dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Saat</label>
                        <input type="time" className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 font-medium dark:text-white" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Konum</label>
                    <input type="text" className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 font-medium dark:text-white" placeholder="Yer ara..." />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Kapak Fotoğrafı</label>
                    <div className="h-32 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-400">
                        Yüklemek için dokun
                    </div>
                </div>

                <button onClick={onBack} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg mt-8">
                    Etkinlik Oluştur
                </button>
            </div>
        </div>
    );
};