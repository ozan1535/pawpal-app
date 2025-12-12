import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Heart, Weight } from 'lucide-react';

interface HealthBarProps {
    value: number;
    max: number;
    type: 'health' | 'weight' | 'xp';
    label?: string;
    showIcon?: boolean;
}

export const HealthBar: React.FC<HealthBarProps> = ({
    value,
    max,
    type,
    label,
    showIcon = true
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const styles = {
        health: {
            bg: "bg-red-100 dark:bg-red-900/30",
            fill: "bg-red-500",
            icon: Heart,
            iconColor: "text-red-500",
            borderColor: "border-red-200 dark:border-red-900/50"
        },
        weight: {
            bg: "bg-blue-100 dark:bg-blue-900/30",
            fill: "bg-blue-500",
            icon: Weight,
            iconColor: "text-blue-500",
            borderColor: "border-blue-200 dark:border-blue-900/50"
        },
        xp: {
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
            fill: "bg-yellow-400",
            icon: null,
            iconColor: "text-yellow-500",
            borderColor: "border-yellow-200 dark:border-yellow-900/50"
        }
    };

    const currentStyle = styles[type];
    const Icon = currentStyle.icon;

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between mb-1 font-heading text-sm text-gray-600 dark:text-gray-300">
                    <span>{label}</span>
                    <span>{value}/{max}</span>
                </div>
            )}
            <div className={cn("h-6 w-full rounded-full border-2 relative overflow-hidden", currentStyle.bg, currentStyle.borderColor)}>
                <motion.div
                    className={cn("h-full absolute left-0 top-0 rounded-full", currentStyle.fill)}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                />
                {/* Shine effect */}
                <div className="absolute top-1 left-2 right-2 h-1 bg-white opacity-30 rounded-full" />

                {showIcon && Icon && (
                    <div className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-0.5 shadow-sm">
                        <Icon size={12} className={currentStyle.iconColor} fill="currentColor" />
                    </div>
                )}
            </div>
        </div>
    );
};
