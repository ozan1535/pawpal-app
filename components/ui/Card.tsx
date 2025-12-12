import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'flat' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    variant = 'default',
    ...props
}) => {
    const baseStyles = "rounded-squircle p-6 transition-all";

    const variants = {
        default: "bg-white dark:bg-slate-800 shadow-soft border border-gray-100 dark:border-gray-700",
        flat: "bg-gray-50 dark:bg-slate-900 border-none",
        elevated: "bg-white dark:bg-slate-800 shadow-xl border-none",
    };

    return (
        <motion.div
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};
