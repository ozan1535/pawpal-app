import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, Dog, Cat, ChevronRight, Calendar, User, Scale, HelpCircle, BookOpen, QrCode, Radio } from 'lucide-react';
import { PetDraft } from '../../types';
import { DOG_BREEDS, CAT_BREEDS } from '../../constants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface PetWizardProps {
  onComplete: () => void;
}

export const PetWizard: React.FC<PetWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [petData, setPetData] = useState<PetDraft>({
    ownerName: '',
    ownerRole: 'Parent',
    name: '',
    type: 'dog',
    breed: '',
    gender: 'male',
    birthday: '',
    estimatedAge: { years: 0, months: 0 },
    weight: '',
    weightUnit: 'kg',
    isNeutered: false,
    photoUrl: null
  });
  const [useEstimatedAge, setUseEstimatedAge] = useState(false);

  const totalSteps = 4;

  const handleNext = () => {
    // Validation logic (simplified for brevity, can be expanded)
    if (step === 1 && (!petData.ownerName || !petData.ownerRole)) return alert("Lütfen hikayeyi tamamlayın!");
    if (step === 2 && (!petData.name || !petData.breed)) return alert("Kahramanımızın adı ne?");
    if (step === 3 && !petData.weight) return alert("Ne kadar güçlü olduğunu yazın!");
    // Step 4 is optional

    if (step < totalSteps) {
      setDirection(1);
      setStep(s => s + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading text-primary">Bölüm 1: Başlangıç</h2>
        <p className="text-xl font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300">Bir zamanlar...</p>
      </div>

      <Card className="space-y-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-orange-100 dark:border-slate-700 transition-colors duration-300">
        <div className="space-y-2">
          <label className="text-lg font-bold text-gray-700 dark:text-gray-200 block transition-colors duration-300">...bu hikayeyi yazan bir kahraman vardı.</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-6 h-6" />
            <input
              type="text"
              value={petData.ownerName}
              onChange={(e) => setPetData({ ...petData, ownerName: e.target.value })}
              placeholder="Adınız..."
              className="w-full pl-12 p-4 bg-background dark:bg-slate-900 rounded-xl border-2 border-orange-200 dark:border-slate-600 font-bold text-gray-800 dark:text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-gray-400"
              autoFocus
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-bold text-gray-700 dark:text-gray-200 block transition-colors duration-300">O, tüylü dostunun...</label>
          <div className="flex flex-wrap gap-3">
            {['Annesi', 'Babası', 'Arkadaşı', 'Sırdaşı'].map((role) => (
              <button
                key={role}
                onClick={() => setPetData({ ...petData, ownerRole: role })}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all border-b-4 active:border-b-0 active:translate-y-1 ${petData.ownerRole === role
                  ? 'bg-secondary border-teal-600 text-white'
                  : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600'
                  }`}
              >
                {role}
              </button>
            ))}
          </div>
          <p className="text-right text-lg font-bold text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">...idi.</p>
        </div>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading text-primary">Bölüm 2: Tanışma</h2>
        <p className="text-xl font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300">Onun çok özel bir dostu vardı...</p>
      </div>

      <Card className="space-y-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-orange-100 dark:border-slate-700 transition-colors duration-300">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-background dark:bg-slate-900 border-4 border-dashed border-primary flex items-center justify-center overflow-hidden transition-colors duration-300">
              {petData.photoUrl ? (
                <img src={petData.photoUrl} alt="Pet" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">🐾</span>
              )}
            </div>
            <button
              onClick={() => setPetData({ ...petData, photoUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80' })}
              className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <Camera size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-2 text-center">
          <label className="text-lg font-bold text-gray-700 dark:text-gray-200 block transition-colors duration-300">Adı neydi?</label>
          <input
            type="text"
            value={petData.name}
            onChange={(e) => setPetData({ ...petData, name: e.target.value })}
            placeholder="Pati İsmi"
            className="w-full text-center p-4 text-2xl font-heading text-primary bg-transparent border-b-4 border-orange-200 dark:border-slate-600 focus:border-primary outline-none placeholder-orange-200 dark:placeholder-slate-600 transition-colors duration-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setPetData({ ...petData, type: 'dog', breed: '' })}
            className={`p-4 rounded-xl border-b-4 transition-all flex flex-col items-center gap-2 ${petData.type === 'dog'
              ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700 text-primary'
              : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-400 dark:text-gray-300'
              }`}
          >
            <Dog size={32} />
            <span className="font-bold">Köpek</span>
          </button>
          <button
            onClick={() => setPetData({ ...petData, type: 'cat', breed: '' })}
            className={`p-4 rounded-xl border-b-4 transition-all flex flex-col items-center gap-2 ${petData.type === 'cat'
              ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-500'
              : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-400 dark:text-gray-300'
              }`}
          >
            <Cat size={32} />
            <span className="font-bold">Kedi</span>
          </button>
        </div>

        <select
          value={petData.breed}
          onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
          className="w-full p-4 bg-background dark:bg-slate-900 rounded-xl border-2 border-orange-200 dark:border-slate-600 font-bold text-gray-800 dark:text-white outline-none focus:border-primary transition-colors duration-300"
        >
          <option value="">Hangi ırktan geliyordu?</option>
          {(petData.type === 'dog' ? DOG_BREEDS : CAT_BREEDS).map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading text-primary">Bölüm 3: Özellikler</h2>
        <p className="text-xl font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300">O çok güçlü ve sağlıklıydı...</p>
      </div>

      <Card className="space-y-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-orange-100 dark:border-slate-700 transition-colors duration-300">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-bold text-gray-700 dark:text-gray-200 transition-colors duration-300">Dünyaya ne zaman geldi?</label>
            <button
              onClick={() => setUseEstimatedAge(!useEstimatedAge)}
              className="text-xs font-bold text-primary underline"
            >
              {useEstimatedAge ? "Tarih Seç" : "Tahmini Gir"}
            </button>
          </div>

          {useEstimatedAge ? (
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="0"
                  value={petData.estimatedAge?.years || ''}
                  onChange={(e) => setPetData({ ...petData, estimatedAge: { ...petData.estimatedAge!, years: parseInt(e.target.value) || 0 } })}
                  className="w-full p-3 bg-background dark:bg-slate-900 rounded-xl border-2 border-orange-200 dark:border-slate-600 font-bold text-center outline-none focus:border-primary text-gray-900 dark:text-white transition-colors duration-300"
                />
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 text-center block mt-1 transition-colors duration-300">Yıl</span>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="0"
                  value={petData.estimatedAge?.months || ''}
                  onChange={(e) => setPetData({ ...petData, estimatedAge: { ...petData.estimatedAge!, months: parseInt(e.target.value) || 0 } })}
                  className="w-full p-3 bg-background dark:bg-slate-900 rounded-xl border-2 border-orange-200 dark:border-slate-600 font-bold text-center outline-none focus:border-primary text-gray-900 dark:text-white transition-colors duration-300"
                />
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 text-center block mt-1 transition-colors duration-300">Ay</span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={petData.birthday}
                onChange={(e) => setPetData({ ...petData, birthday: e.target.value })}
                className="w-full pl-12 p-4 bg-background dark:bg-slate-900 rounded-xl border-2 border-orange-200 dark:border-slate-600 font-bold text-gray-800 dark:text-white outline-none focus:border-primary transition-colors duration-300"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-gray-700 dark:text-gray-200 block transition-colors duration-300">Kilosu ne kadardı?</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Scale className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="0.0"
                value={petData.weight}
                onChange={(e) => setPetData({ ...petData, weight: e.target.value })}
                className="w-full pl-12 p-4 bg-background dark:bg-slate-900 rounded-xl border-2 border-orange-200 dark:border-slate-600 font-bold text-gray-800 dark:text-white outline-none focus:border-primary transition-colors duration-300"
              />
            </div>
            <div className="flex bg-background dark:bg-slate-900 p-1 rounded-xl border-2 border-orange-100 dark:border-slate-700 transition-colors duration-300">
              {['kg', 'lbs'].map(unit => (
                <button
                  key={unit}
                  onClick={() => setPetData({ ...petData, weightUnit: unit as 'kg' | 'lbs' })}
                  className={`px-3 rounded-lg font-bold text-sm transition-all ${petData.weightUnit === unit ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-gray-400 dark:text-gray-500'
                    }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading text-primary">Bölüm 4: Dost Etiketi</h2>
        <p className="text-xl font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300">Akıllı tasmanızı eşleştirin...</p>
      </div>

      <Card className="space-y-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-orange-100 dark:border-slate-700 transition-colors duration-300 flex flex-col items-center text-center">

        <div className="relative w-48 h-48 mb-4">
          {/* Placeholder Illustration */}
          <div className="absolute inset-0 bg-orange-100 dark:bg-orange-900/20 rounded-full animate-pulse opacity-50"></div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            alt="Smart Collar"
            className="w-full h-full object-contain relative z-10 drop-shadow-xl"
          />
          <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border-2 border-orange-100 dark:border-slate-700">
            <Radio className="w-8 h-8 text-primary animate-ping" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Akıllı Tasmanızı Eşleştirin</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
            Akıllı tasmanızı eşleştirmek için bir yöntem seçin. Tasmanız yok ise <a href="#" className="text-primary font-bold underline">Şimdi satın alın</a>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
          <Button variant="primary" size="lg" className="flex items-center justify-center gap-3 py-6 text-lg shadow-lg shadow-orange-200 dark:shadow-none">
            <Radio size={24} />
            <span>NFC Okut</span>
          </Button>

          <Button variant="secondary" size="lg" className="flex items-center justify-center gap-3 py-6 text-lg shadow-lg shadow-teal-200 dark:shadow-none">
            <QrCode size={24} />
            <span>QR Kod Tara</span>
          </Button>
        </div>

      </Card>
    </div>
  );

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02] pointer-events-none transition-opacity duration-300" style={{
        backgroundImage: `radial-gradient(#FF8C42 2px, transparent 2px)`,
        backgroundSize: '30px 30px'
      }} />

      {/* Header */}
      <div className="pt-8 px-6 pb-4 relative z-10 flex items-center justify-between">
        <button
          onClick={handleBack}
          className={`p-2 rounded-full hover:bg-orange-100 transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ArrowLeft className="w-8 h-8 text-primary" strokeWidth={3} />
        </button>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-heading font-bold text-gray-600">Sayfa {step} / {totalSteps}</span>
        </div>

        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Content Area - Book Page Effect */}
      <div className="flex-1 relative perspective-1000 overflow-hidden px-6">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full h-full py-4"
          >
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="p-8 relative z-10">
        <Button
          variant={step === totalSteps ? "primary" : "primary"}
          size="lg"
          fullWidth
          onClick={handleNext}
          className="text-xl flex items-center justify-center gap-2"
        >
          {step === totalSteps ? 'Hikayeyi Başlat ✨' : 'Sonraki Sayfa'}
          {step !== totalSteps && <ChevronRight size={24} strokeWidth={3} />}
        </Button>
        {step === totalSteps && (
          <button onClick={onComplete} className="w-full text-center mt-4 text-gray-400 dark:text-gray-500 font-bold text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            Şimdilik Atla
          </button>
        )}
      </div>
    </div>
  );
};
