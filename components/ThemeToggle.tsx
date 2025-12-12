
import React from 'react';
import { Sun, Moon, Cloud, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-20 h-10 rounded-full cursor-pointer shadow-inner overflow-hidden transition-colors duration-500 ease-in-out group
        ${isDark ? 'bg-slate-900 border border-slate-700' : 'bg-sky-400 border border-sky-300'}
      `}
      aria-label="Toggle Theme"
    >
      {/* --- BACKGROUND DECORATIONS --- */}
      
      {/* STARS (Visible in Dark Mode) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        <Star className="absolute top-2 left-3 w-1.5 h-1.5 text-white animate-twinkle fill-white" style={{ animationDelay: '0ms' }} />
        <Star className="absolute bottom-2 left-6 w-1 h-1 text-white animate-twinkle fill-white" style={{ animationDelay: '300ms' }} />
        <Star className="absolute top-3 left-8 w-2 h-2 text-white animate-twinkle fill-white" style={{ animationDelay: '700ms' }} />
        <div className="absolute top-1 right-8 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
        <div className="absolute bottom-3 right-4 w-1 h-1 bg-white rounded-full opacity-40"></div>
      </div>

      {/* CLOUDS (Visible in Light Mode) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        <Cloud className="absolute top-1 left-2 w-4 h-4 text-white/80 fill-white animate-float" style={{ animationDelay: '0s' }} />
        <Cloud className="absolute bottom-0 left-6 w-5 h-5 text-white/90 fill-white animate-float" style={{ animationDelay: '1s' }} />
        <Cloud className="absolute top-2 right-8 w-3 h-3 text-white/70 fill-white" />
      </div>

      {/* --- THE KNOB (Sun / Moon) --- */}
      <div
        className={`
          absolute top-1 left-1 w-8 h-8 rounded-full shadow-md transform transition-all duration-500 cubic-bezier(0.68, -0.55, 0.27, 1.55)
          flex items-center justify-center
          ${isDark ? 'translate-x-10 bg-slate-100' : 'translate-x-0 bg-yellow-400'}
        `}
      >
        {/* Sun Icon */}
        <Sun 
          className={`
            w-5 h-5 text-yellow-100 fill-yellow-100 absolute transition-all duration-500
            ${isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}
          `} 
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`
            w-5 h-5 text-slate-700 fill-slate-700 absolute transition-all duration-500
            ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}
          `} 
        />
        
        {/* Crater details for Moon */}
        <div className={`absolute w-1.5 h-1.5 bg-slate-300 rounded-full top-2 right-2 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute w-1 h-1 bg-slate-300 rounded-full bottom-2 left-3 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
    </button>
  );
};
