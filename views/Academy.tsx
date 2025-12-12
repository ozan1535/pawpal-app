import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Star, Trophy } from 'lucide-react';
import { TRAINING_MODULES } from '../constants';

interface AcademyProps {
  onNavigate: (screen: string, params?: any) => void;
}

export const Academy: React.FC<AcademyProps> = ({ onNavigate }) => {
  // Mock progress
  const currentLevel = 2;

  // Configuration for the winding path
  const AMPLITUDE = 120; // How wide the curve is (px)
  const FREQUENCY = 0.008; // How fast it curves
  const VERTICAL_SPACING = 140; // Distance between nodes (px)
  const INITIAL_Y_OFFSET = 100; // Start Y position
  const CENTER_X_OFFSET = 0; // Center offset (will be added to 50% of screen width)

  // Generate path points for SVG
  const generatePathData = () => {
    let path = `M 0 0 `; // Start at top center (relative to SVG group)
    const steps = 20; // Resolution of the curve
    const totalHeight = TRAINING_MODULES.length * VERTICAL_SPACING + 300;

    for (let y = 0; y <= totalHeight; y += steps) {
      const x = Math.sin(y * FREQUENCY) * AMPLITUDE;
      path += `L ${x} ${y} `;
    }
    return path;
  };

  return (
    <div className="flex flex-col h-full bg-[#8BC34A] dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
      {/* Grass Texture Background - Hidden in Dark Mode */}
      <div className="absolute inset-0 opacity-10 dark:opacity-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(#4CAF50 3px, transparent 3px)`,
        backgroundSize: '20px 20px'
      }} />

      {/* Starry Background - Visible in Dark Mode */}
      <div className="absolute inset-0 opacity-0 dark:opacity-20 pointer-events-none transition-opacity duration-500" style={{
        backgroundImage: `radial-gradient(#FFF 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />

      {/* Header */}
      <div className="relative z-20 pt-8 px-6 pb-4 bg-gradient-to-b from-[#7CB342] to-transparent dark:from-slate-900 dark:to-transparent transition-colors duration-500">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-heading text-white drop-shadow-md">Macera Haritası 🗺️</h1>
          <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold border-2 border-white/30">
            ⭐ 12/50
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 overflow-y-auto relative no-scrollbar pb-32">
        <div className="relative min-h-[1200px]" style={{ height: TRAINING_MODULES.length * VERTICAL_SPACING + 400 }}>

          {/* The Winding Path SVG */}
          <div className="absolute top-0 left-1/2 w-[1px] h-full -translate-x-1/2 z-0 pointer-events-none">
            <svg className="w-full h-full overflow-visible">
              {/* Path Border (Dirt Road Outline) */}
              <path
                d={generatePathData()}
                fill="none"
                stroke="#5D4037"
                className="dark:stroke-stone-800 transition-colors duration-500"
                strokeWidth="70"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
              />
              {/* Path Fill (Dirt Road Main) */}
              <path
                d={generatePathData()}
                fill="none"
                stroke="#795548"
                className="dark:stroke-stone-700 transition-colors duration-500"
                strokeWidth="60"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Path Center Line (Dashed) */}
              <path
                d={generatePathData()}
                fill="none"
                stroke="#A1887F"
                className="dark:stroke-stone-600 transition-colors duration-500"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="15 15"
              />
            </svg>
          </div>

          {/* Level Nodes */}
          {TRAINING_MODULES.map((module, index) => {
            const yPos = index * VERTICAL_SPACING + INITIAL_Y_OFFSET;
            // Calculate X based on Sine wave to match the SVG path
            // Note: We use a fixed center (e.g., 50vw) for alignment
            // In a real app, we might want to use a ref to get the container width
            const xOffset = Math.sin(yPos * FREQUENCY) * AMPLITUDE;

            const isLocked = index > currentLevel;
            const isCompleted = index < currentLevel;
            const isCurrent = index === currentLevel;

            // Determine if the node is on the left or right side of the curve for label placement
            // If the slope is positive, we might want label on one side, etc.
            // Simple heuristic: if xOffset > 0 (right side), put label on left? 
            // Actually, let's just alternate or put it below.

            return (
              <motion.div
                key={module.id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="absolute transform -translate-x-1/2"
                style={{
                  top: yPos,
                  left: `calc(50% + ${xOffset}px)`
                }}
              >
                <div className="flex flex-col items-center relative group">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => !isLocked && onNavigate('LESSON_DETAIL', { id: module.id })}
                    className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center shadow-xl border-b-8 relative z-10 transition-all duration-300
                      ${isCompleted ? 'bg-yellow-400 border-yellow-600' : ''}
                      ${isCurrent ? 'bg-primary border-orange-600 scale-110 z-20 ring-4 ring-white/50 dark:ring-white/20' : ''}
                      ${isLocked ? 'bg-gray-200 border-gray-300 dark:bg-slate-700 dark:border-slate-800' : ''}
                    `}
                  >
                    {isCompleted && <Star className="text-white w-10 h-10 fill-current drop-shadow-sm" />}
                    {isCurrent && <Play className="text-white w-10 h-10 fill-current drop-shadow-sm ml-1" />}
                    {isLocked && <Lock className="text-gray-400 dark:text-gray-500 w-8 h-8" />}

                    {/* Stars for completed levels */}
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 flex bg-white/20 backdrop-blur-sm rounded-full px-1">
                        <Star size={14} className="text-yellow-100 fill-current" />
                        <Star size={14} className="text-yellow-100 fill-current" />
                        <Star size={14} className="text-yellow-100 fill-current" />
                      </div>
                    )}
                  </motion.button>

                  {/* Label - Positioned to avoid overlapping the path if possible, or just below */}
                  <div className={`absolute top-full mt-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border-2 border-white dark:border-slate-600 text-center w-40 z-30 transition-transform duration-300 ${isCurrent ? 'scale-110' : ''}`}>
                    <span className={`text-sm font-bold block leading-tight ${isLocked ? 'text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                      {module.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Final Trophy */}
          <div
            className="absolute transform -translate-x-1/2"
            style={{
              top: TRAINING_MODULES.length * VERTICAL_SPACING + INITIAL_Y_OFFSET + 150,
              left: `calc(50% + ${Math.sin((TRAINING_MODULES.length * VERTICAL_SPACING + INITIAL_Y_OFFSET + 150) * FREQUENCY) * AMPLITUDE}px)`
            }}
          >
            <div className="w-32 h-32 bg-yellow-300 rounded-full border-8 border-yellow-100 dark:border-slate-700 flex items-center justify-center shadow-2xl animate-bounce">
              <Trophy size={64} className="text-yellow-600 drop-shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};