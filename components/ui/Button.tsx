import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming a utils file exists or I'll create it

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    ...props
}) => {
    const baseStyles = "font-heading font-bold rounded-squircle transition-all active:translate-y-1 active:shadow-none border-b-4 relative overflow-hidden flex items-center justify-center";

    const variants = {
        primary: "bg-primary dark:bg-orange-600 border-orange-600 dark:border-orange-800 text-white hover:bg-orange-400 dark:hover:bg-orange-500",
        secondary: "bg-secondary dark:bg-teal-600 border-teal-600 dark:border-teal-800 text-white hover:bg-teal-300 dark:hover:bg-teal-500",
        accent: "bg-accent-pink dark:bg-pink-600 border-pink-400 dark:border-pink-800 text-white hover:bg-pink-300 dark:hover:bg-pink-500",
        danger: "bg-red-500 dark:bg-red-700 border-red-700 dark:border-red-900 text-white hover:bg-red-400 dark:hover:bg-red-600",
        outline: "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 border-2 border-b-4",
    };

    const sizes = {
        sm: "py-2 px-4 text-sm",
        md: "py-3 px-6 text-base",
        lg: "py-4 px-8 text-lg",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth ? "w-full" : "",
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
