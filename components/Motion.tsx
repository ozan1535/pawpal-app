
import React from 'react';

// --- Animated Wrapper (Page Transitions) ---
interface AnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <div 
      className={`animate-fade-in-up ${className}`} 
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Interactive Button (Scale Physics & Haptics) ---
interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({ children, className = '', onClick, ...props }) => {
  const handlePress = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Web Haptic fallback pattern
    if (navigator.vibrate) navigator.vibrate(10); 
    if (onClick) onClick(e);
  };

  return (
    <button 
      onClick={handlePress}
      className={`transition-transform duration-100 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Stagger Container (List Animation) ---
// Note: In a web context without Reanimated, we use index-based delay logic in the map loop.
// This component is a semantic wrapper for now.
export const StaggerContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const getStaggerStyle = (index: number) => ({
  animation: `fadeInUp 0.5s ease-out forwards`,
  animationDelay: `${index * 50}ms`,
  opacity: 0, // Start hidden, animation fills forwards
});
