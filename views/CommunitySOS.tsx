import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Calendar, Plus, AlertCircle } from "lucide-react";
import { MOCK_EVENTS } from "../constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Link } from "react-router-dom";

interface CommunitySOSProps {
  onNavigate: (screen: string, params?: any) => void;
}

export const CommunitySOS: React.FC<CommunitySOSProps> = ({ onNavigate }) => {
  const [isPressing, setIsPressing] = useState(false);
  const MotionLink = motion(Link);

  return (
    <div className="flex flex-col space-y-8 pb-24 min-h-full">
      <div className="pt-8 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-heading text-primary">
          Topluluk & SOS 🚨
        </h1>
      </div>

      {/* SOS Button Area */}
      <div className="px-6">
        <Card className="bg-red-100 dark:bg-red-900/40 border-4 border-red-200 dark:border-red-800 text-center relative overflow-hidden p-8">
          <div className="absolute top-0 left-0 w-full h-2 bg-stripes-red opacity-20"></div>

          <h2 className="text-2xl font-heading text-red-500 dark:text-red-400 mb-2">
            Acil Durum!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 font-bold">
            Bir sorun mu var? Hemen yardım çağır!
          </p>

          <Link to="/lost-form">
            <MotionLink
              whileTap={{ scale: 0.9 }}
              onTapStart={() => setIsPressing(true)}
              onTapEnd={() => setIsPressing(false)}
              to="/lost-form"
              //onClick={() => onNavigate("lost-form SOS_FORM")}
              className="w-40 h-40 rounded-full bg-red-500 border-b-8 border-red-700 shadow-xl flex items-center justify-center relative mx-auto group"
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
              <span className="text-4xl font-black text-white">SOS</span>
            </MotionLink>
          </Link>

          {isPressing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-600 dark:text-red-400 font-bold animate-pulse"
            >
              Yardım Çağırılıyor...
            </motion.div>
          )}
        </Card>
      </div>

      {/* Immersive Events */}
      {/* <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading text-xl text-gray-700 dark:text-gray-200">Etkinlikler</h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate('CREATE_EVENT')}
            className="text-xs"
          >
            <Plus className="w-4 h-4 mr-1" /> Oluştur
          </Button>
        </div>

        <div className="space-y-6">
          {MOCK_EVENTS.map((event) => (
            <motion.div
              key={event.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('EVENT_DETAIL', { id: event.id })}
              className="relative h-64 rounded-squircle overflow-hidden shadow-soft group cursor-pointer border-4 border-white dark:border-slate-700"
            >
              <img src={event.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Event" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-3 py-1 rounded-xl font-bold text-xs text-orange-500 shadow-sm">
                {event.date}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="font-heading text-2xl mb-2">{event.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm font-bold text-gray-100">
                    <span className="flex items-center max-w-[120px] truncate"><MapPin className="w-4 h-4 mr-1" /> {event.location}</span>
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {event.attendees}</span>
                  </div>
                  <span className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${event.isJoined ? 'bg-green-500 text-white' : 'bg-white text-primary'}`}>
                    {event.isJoined ? 'Gidiyorsun' : 'İncele'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}
    </div>
  );
};
