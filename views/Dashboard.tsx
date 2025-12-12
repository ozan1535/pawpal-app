import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Syringe, MessageSquare, Scale, Calendar, ChevronRight, MapPin, Star, Zap, Heart, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { CURRENT_PET, NEARBY_LOST_PETS, MOCK_USER } from '../constants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HealthBar } from '@/components/ui/HealthBar';
import { CalendarModal } from '../components/CalendarModal';
import { ThemeToggle } from '@/components/ThemeToggle';

interface DashboardProps {
  onOpenAiVet: () => void;
  onNavigate: (screen: string, params?: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onOpenAiVet, onNavigate }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);

  const handleShopClick = (url: string) => {
    window.open(url, '_blank');
    setIsShopModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-6 pb-32 min-h-full">
      {/* Header: Greeting & Controls */}
      <div className="pt-8 px-6 flex justify-between items-end">
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">GÜNAYDIN,</h2>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white leading-none">
            {MOCK_USER.name.split(' ')[0]} & {CURRENT_PET.name}
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />

          <Button
            variant="danger"
            size="sm"
            onClick={() => onNavigate('EMERGENCY_MAP')}
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-lg animate-pulse"
          >
            <MapPin size={24} />
          </Button>
        </div>
      </div>

      {/* Simple Pet Card */}
      <div className="px-6">
        <Card className="p-0 overflow-hidden border-none rounded-[2.5rem] relative aspect-[4/3] shadow-xl group">
          <img
            src={CURRENT_PET.photoUrl}
            alt={CURRENT_PET.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl font-heading mb-1">{CURRENT_PET.name}</h1>
            <p className="text-lg font-bold opacity-90 flex items-center gap-2">
              {CURRENT_PET.breed} <span className="w-1.5 h-1.5 bg-white rounded-full" /> {CURRENT_PET.age} Yaşında
            </p>
          </div>
        </Card>
      </div>

      {/* Power-Ups (Quick Actions) */}
      <div className="px-4">
        <h3 className="font-heading text-xl text-gray-700 dark:text-gray-200 mb-4 px-2 transition-colors duration-300">Hızlı İşlemler</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            onClick={() => onNavigate('SCREEN_VACCINE')}
            className="h-24 flex flex-col items-center justify-center gap-2 rounded-3xl"
          >
            <Syringe size={28} />
            <span>Aşılar</span>
          </Button>

          <Button
            variant="primary"
            onClick={onOpenAiVet}
            className="h-24 flex flex-col items-center justify-center gap-2 rounded-3xl"
          >
            <MessageSquare size={28} />
            <span>AI Vet</span>
          </Button>

          <Button
            variant="accent"
            onClick={() => onNavigate('SCREEN_WEIGHT')}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-green-500 dark:bg-green-700 border-green-700 dark:border-green-900 hover:bg-green-400 dark:hover:bg-green-600 transition-colors duration-300 rounded-3xl"
          >
            <Scale size={28} />
            <span>Kilo</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => onNavigate('SCREEN_BOOKING')}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-purple-500 dark:bg-purple-700 border-purple-700 dark:border-purple-900 text-white hover:bg-purple-400 dark:hover:bg-purple-600 hover:text-white transition-colors duration-300 rounded-3xl"
          >
            <Calendar size={28} />
            <span>Hatırlatıcı</span>
          </Button>
        </div>
      </div>

      {/* Quick Shop Banner */}
      <div className="px-6">
        <button
          onClick={() => setIsShopModalOpen(true)}
          className="w-full bg-gradient-to-r from-orange-400 to-red-400 rounded-[2rem] p-4 flex items-center justify-between shadow-lg shadow-orange-200 dark:shadow-none transform transition-transform active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ShoppingBag className="text-white w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-white font-bold text-lg leading-tight">Hemen Sipariş Ver</h3>
              <p className="text-white/90 text-xs font-medium">Sen ve Dostun için ihtiyacın olan her şey</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm">
            <ArrowRight size={20} strokeWidth={3} />
          </div>
        </button>
      </div>

      {/* Quest Log (Timeline) */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-heading text-xl text-gray-700">Yaklaşanlar</h3>
          <button onClick={() => setIsCalendarOpen(true)} className="text-primary font-bold text-sm">
            Tümünü Gör
          </button>
        </div>

        <Card className="space-y-0 p-0 overflow-hidden border-2 border-gray-100 dark:border-slate-700 transition-colors duration-300">
          <div className="p-4 border-b-2 border-gray-100 dark:border-slate-700 flex items-center gap-4 bg-orange-50/50 dark:bg-orange-900/10 transition-colors duration-300">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-primary transition-colors duration-300">
              <Zap size={20} fill="currentColor" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 dark:text-white transition-colors duration-300">İç Parazit Hapı</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold transition-colors duration-300">Yarın, 09:00</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />
          </div>

          <div className="p-4 flex items-center gap-4 opacity-60 dark:opacity-50 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 dark:text-gray-500 transition-colors duration-300">
              <Star size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 dark:text-white transition-colors duration-300">Tıraş Randevusu</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold transition-colors duration-300">Cmt, 24 Eki</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Nearby Lost Pets */}
      <div className="px-4 pt-2">
        <h3 className="font-heading text-xl text-gray-700 dark:text-white mb-4 px-2 flex items-center gap-2 transition-colors duration-300">
          <span>📢</span> Kayıp Dostlarımız
        </h3>

        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4 px-2">
          {NEARBY_LOST_PETS.map((pet) => (
            <motion.button
              key={pet.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('LOST_PETS_FEED')}
              className="flex-shrink-0 w-40 bg-white dark:bg-slate-800 rounded-squircle p-3 border-2 border-red-100 dark:border-slate-700 shadow-sm relative overflow-hidden transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-bl-lg z-10">
                KAYIP
              </div>
              <img src={pet.imageUrl} alt={pet.name} className="w-full h-24 object-cover rounded-xl mb-3" />
              <div className="text-left">
                <h4 className="font-bold text-gray-800 dark:text-white transition-colors duration-300">{pet.name}</h4>
                <p className="text-xs text-red-500 dark:text-red-400 font-bold flex items-center gap-1 transition-colors duration-300">
                  <MapPin size={10} /> {pet.distance}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {isCalendarOpen && <CalendarModal onClose={() => setIsCalendarOpen(false)} />}

      {/* Shop Modal (Action Sheet Style) */}
      {isShopModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsShopModalOpen(false)} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="bg-white dark:bg-slate-800 w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-6 relative z-10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-heading text-gray-800 dark:text-white">Hangi marketten? 🛍️</h3>
              <button onClick={() => setIsShopModalOpen(false)} className="p-2 bg-gray-100 dark:bg-slate-700 rounded-full">
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleShopClick('https://www.trendyol.com/kedi-kopek-mamasi-x-c103108')}
                className="w-full p-4 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-100 dark:border-orange-800 rounded-2xl flex items-center gap-4 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">TY</div>
                <span className="font-bold text-gray-700 dark:text-gray-200">Trendyol</span>
                <ChevronRight className="ml-auto text-gray-400" />
              </button>

              <button
                onClick={() => handleShopClick('https://www.hepsiburada.com/pet-shop-c-2147483616')}
                className="w-full p-4 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-100 dark:border-orange-800 rounded-2xl flex items-center gap-4 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xs">HB</div>
                <span className="font-bold text-gray-700 dark:text-gray-200">Hepsiburada</span>
                <ChevronRight className="ml-auto text-gray-400" />
              </button>

              <button
                onClick={() => handleShopClick('https://www.amazon.com.tr/b?node=12466553031')}
                className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-800 rounded-2xl flex items-center gap-4 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">AMZ</div>
                <span className="font-bold text-gray-700 dark:text-gray-200">Amazon</span>
                <ChevronRight className="ml-auto text-gray-400" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
