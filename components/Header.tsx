import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InteractiveButton } from './Motion';

interface HeaderProps {
    title: string;
    onBack: () => void;
    rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, rightElement }) => {
    return (
        <div className="p-4 flex items-center justify-between sticky top-0 z-20 bg-stone-50/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <InteractiveButton
                onClick={onBack}
                className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:bg-gray-50 transition-colors border border-gray-100 dark:border-gray-700"
            >
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </InteractiveButton>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h1>
            <div className="w-10 flex justify-end">{rightElement}</div>
        </div>
    );
};
