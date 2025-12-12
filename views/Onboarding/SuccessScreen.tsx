import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { CURRENT_PET } from '../../constants';

interface SuccessScreenProps {
  onComplete: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onComplete }) => {

  useEffect(() => {
    // Auto navigate after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-400 to-orange-500 relative overflow-hidden">

      {/* Ripple Background Effect */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut"
          }}
          className="absolute w-64 h-64 bg-white/10 rounded-full"
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center p-8 space-y-8">

        {/* Check Icon Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Check className="w-16 h-16 text-orange-500" strokeWidth={4} />
          </motion.div>
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-black text-white drop-shadow-sm flex items-center justify-center gap-2"
          >
            Harika! <span className="text-4xl">🎉</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-medium text-white/90 max-w-xs mx-auto leading-relaxed"
          >
            {CURRENT_PET.name} artık PawPal ailesinin bir üyesi.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-12 left-0 right-0"
        >
          <p className="text-xs font-bold text-white/60 tracking-widest uppercase animate-pulse">
            Dashboard'a Yönlendiriliyor...
          </p>
        </motion.div>
      </div>
    </div>
  );
};
