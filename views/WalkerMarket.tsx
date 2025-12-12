
import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { MOCK_WALKERS, MOCK_NEEDS } from '../constants';
import { RatingBadge, ContactButton, VerifiedBadge, LocationTag } from '../components/Common';

type MarketMode = 'FIND_WALKER' | 'I_AM_WALKER';

export const WalkerMarket: React.FC = () => {
  const [mode, setMode] = useState<MarketMode>('FIND_WALKER');

  return (
    <div className="flex flex-col h-full">
      {/* Header & Toggle */}
      <div className="bg-white dark:bg-slate-800 pt-4 pb-4 sticky top-0 z-10 -mx-4 px-4 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-white">Gezdirici Pazarı</h1>
        
        {/* Toggle Control */}
        <div className="bg-gray-100 dark:bg-slate-700 p-1 rounded-xl flex relative">
          <div 
            className={`absolute top-1 bottom-1 w-1/2 bg-white dark:bg-slate-600 rounded-lg shadow-sm transition-all duration-300 ease-out transform ${mode === 'I_AM_WALKER' ? 'translate-x-full' : 'translate-x-0'}`}
          />
          <button 
            onClick={() => setMode('FIND_WALKER')}
            className={`flex-1 py-2 text-sm font-bold text-center z-10 transition-colors ${mode === 'FIND_WALKER' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Gezdirici Bul
          </button>
          <button 
             onClick={() => setMode('I_AM_WALKER')}
             className={`flex-1 py-2 text-sm font-bold text-center z-10 transition-colors ${mode === 'I_AM_WALKER' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Gezdiriciyim
          </button>
        </div>

        {/* Safety Banner */}
        <div className="mt-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 flex items-start">
          <ShieldCheck className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" />
          <p className="text-xs text-orange-800 dark:text-orange-200">
            <span className="font-bold">Önce Güvenlik:</span> İlk yürüyüş için her zaman halka açık yerlerde buluşun. Yorumları kontrol edin.
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="py-4 space-y-4 pb-20">
        
        {/* FIND A WALKER VIEW */}
        {mode === 'FIND_WALKER' && (
          <>
            <div className="flex space-x-2 mb-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Bölge ara..." 
                  className="w-full bg-white dark:bg-slate-800 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                />
              </div>
              <button className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {MOCK_WALKERS.map((walker) => (
              <div key={walker.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col space-y-3">
                <div className="flex space-x-3">
                  <img src={walker.photoUrl} alt={walker.name} className="w-16 h-16 rounded-xl object-cover bg-gray-200" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <h3 className="font-bold text-gray-900 dark:text-white">{walker.name}</h3>
                        {walker.isVerified && <VerifiedBadge />}
                      </div>
                      <span className="font-bold text-primary">{walker.price}</span>
                    </div>
                    
                    <div className="flex items-center mt-1 space-x-2">
                       <RatingBadge rating={walker.rating} count={walker.reviewsCount} />
                       <span className="text-xs text-gray-400">• {walker.distance} uzakta</span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                      {walker.bio}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 bg-gray-50 dark:bg-slate-900/50 p-2 rounded-lg">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  Uygunluk: <span className="font-medium ml-1 text-gray-700 dark:text-gray-300">{walker.availability}</span>
                </div>

                <ContactButton phoneNumber={walker.whatsappNumber} label="WhatsApp ile Randevu Al" />
              </div>
            ))}
          </>
        )}

        {/* I AM A WALKER VIEW (NEEDS) */}
        {mode === 'I_AM_WALKER' && (
           <>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800 dark:text-white">Yakındaki Aktif Talepler</h3>
              <span className="text-xs text-gray-500">Zamana Göre Sıralı</span>
            </div>

            {MOCK_NEEDS.map((need) => (
              <div key={need.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                 <div className="flex space-x-3 mb-3">
                    <div className="relative">
                      <img src={need.photoUrl} alt={need.petName} className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm" />
                      <div className="absolute -bottom-1 right-0 bg-primary text-white text-[10px] px-1.5 rounded-full font-bold">
                        {need.offerPrice}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{need.petName} için yürüyüş</h3>
                      <p className="text-xs text-gray-500">{need.petBreed}</p>
                      <LocationTag text={need.location} />
                    </div>
                 </div>
                 
                 <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/10 p-3 rounded-xl border border-dashed border-orange-200 dark:border-orange-800/50">
                    <div className="flex items-center text-orange-800 dark:text-orange-200 text-sm font-medium">
                      <Clock className="w-4 h-4 mr-2" />
                      {need.timeNeeded}
                    </div>
                    <button className="bg-primary hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-colors">
                      Kabul Et
                    </button>
                 </div>
              </div>
            ))}
           </>
        )}

      </div>
    </div>
  );
};