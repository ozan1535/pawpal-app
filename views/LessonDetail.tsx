
import React, { useState } from 'react';
import { ArrowLeft, PlayCircle, CheckCircle, Clock } from 'lucide-react';
import { LESSON_DETAILS } from '../constants';

interface LessonDetailProps {
  lessonId: string;
  onBack: () => void;
}

export const LessonDetailScreen: React.FC<LessonDetailProps> = ({ lessonId, onBack }) => {
  // Fallback if ID not found
  const lesson = LESSON_DETAILS[lessonId] || LESSON_DETAILS['default'];
  const [isCompleted, setIsCompleted] = useState(lesson.completed);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-black min-h-screen relative overflow-hidden">
      
      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="animate-fade-in-up text-6xl">🎉 🦴 🎊</div>
          {/* Simple CSS animation trick would go here, using text for MVP */}
        </div>
      )}

      {/* Header Image */}
      <div className="relative h-64">
        <img src={lesson.videoPlaceholder} className="w-full h-full object-cover" alt="Lesson" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer">
          <PlayCircle className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform" />
        </div>
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 -mt-8 bg-stone-50 dark:bg-black rounded-t-[2.5rem] relative z-10 p-6 pb-24 animate-slide-in-from-bottom">
        <div className="flex justify-between items-start mb-4">
          <div>
             <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${lesson.difficulty === 'Kolay' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                {lesson.difficulty}
             </span>
             <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mt-2">{lesson.title}</h1>
          </div>
          <div className="flex items-center text-gray-500 font-bold bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
            <Clock className="w-4 h-4 mr-1" /> {lesson.duration}
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          {lesson.description}
        </p>

        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Adımlar</h3>
        
        <div className="space-y-6 relative">
          {/* Connecting Line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-800"></div>

          {lesson.steps.map((step) => (
            <div key={step.order} className="relative flex items-start pl-10">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md z-10 border-4 border-stone-50 dark:border-black">
                {step.order}
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium leading-tight">
                  {step.text}
                </p>
                {step.duration && (
                   <span className="text-xs text-gray-400 mt-1 block font-bold uppercase">{step.duration}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800">
        <button 
          onClick={handleComplete}
          disabled={isCompleted}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center transition-all ${
            isCompleted 
            ? 'bg-green-500 text-white cursor-default' 
            : 'bg-primary text-white hover:scale-[1.02] active:scale-95'
          }`}
        >
          {isCompleted ? (
            <>
               <CheckCircle className="w-6 h-6 mr-2" /> Tamamlandı
            </>
          ) : (
            "Tamamlandı İşaretle"
          )}
        </button>
      </div>
    </div>
  );
};