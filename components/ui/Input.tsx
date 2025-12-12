import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ className, label, error, ...props }) => {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
                    error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-xs text-red-500 font-bold ml-1">{error}</p>
            )}
        </div>
    );
};
