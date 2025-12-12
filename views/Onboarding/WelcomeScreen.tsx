import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { PawPrint } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-20%] w-96 h-96 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-20%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl"
      />

      {/* Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">

        {/* Logo / Mascot Area */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-12 relative"
        >
          <div className="w-48 h-48 bg-white dark:bg-slate-800 rounded-full shadow-soft flex items-center justify-center border-8 border-white dark:border-slate-700 relative z-10 transition-colors duration-300">
            <span className="text-8xl">🐶</span>
          </div>
          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-4 border-4 border-dashed border-primary/30 dark:border-primary/20 rounded-full z-0"
          />
        </motion.div>

        {/* Text Content */}
        <div className="text-center mb-12 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-heading text-primary drop-shadow-sm"
          >
            PawPal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 font-bold px-4 transition-colors duration-300"
          >
            Tüylü dostunun en eğlenceli hikayesi burada başlıyor!
          </motion.p>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-4"
        >
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => onNavigate('PET_WIZARD')}
            className="text-xl"
          >
            Hikayeye Başla 📖
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => { }}>
              🍎 Apple
            </Button>
            <Button variant="outline" onClick={() => { }}>
              G Google
            </Button>
          </div>

          <p className="text-center text-gray-400 dark:text-gray-500 font-bold text-sm mt-4 transition-colors duration-300">
            Zaten üye misin? <button onClick={() => onNavigate('DASHBOARD')} className="text-primary hover:underline">Giriş Yap</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
