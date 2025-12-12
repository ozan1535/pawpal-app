
import React from 'react';
import { Star, MessageCircle, MapPin } from 'lucide-react';

// --- Rating Badge ---
interface RatingBadgeProps {
  rating: number;
  count: number;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, count }) => (
  <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full border border-yellow-200 dark:border-yellow-700">
    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1" />
    <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">
      {rating} <span className="font-normal opacity-75">({count})</span>
    </span>
  </div>
);

// --- Contact Button ---
interface ContactButtonProps {
  phoneNumber: string;
  message?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ 
  phoneNumber, 
  message = "Merhaba, PawPal'daki profilinizi gördüm!", 
  label = "İletişime Geç" 
}) => {
  const handlePress = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <button 
      onClick={handlePress}
      className="flex items-center justify-center bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm w-full"
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
};

// --- Verified Badge ---
export const VerifiedBadge: React.FC = () => (
  <div className="flex items-center text-[10px] font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800 ml-2">
    ONAYLI
  </div>
);

// --- Location Tag ---
export const LocationTag: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-1">
    <MapPin className="w-3 h-3 mr-1" />
    {text}
  </div>
);