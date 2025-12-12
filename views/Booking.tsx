
import React, { useState } from 'react';
import { Scissors, Stethoscope, ShoppingBag, Pill, Bell, Calendar as CalendarIcon, Clock, X, Repeat, CheckCircle, AlarmClock } from 'lucide-react';
import { InteractiveButton } from '../components/Motion';
import { Header } from '../components/Header';

interface BookingProps {
    onBack: () => void;
}

type ReminderCategory = 'vet' | 'groom' | 'meds' | 'food' | 'other';
type RepeatFrequency = 'never' | 'daily' | 'weekly' | 'monthly';
type AlertOffset = 'exact' | '15min' | '1hour' | '1day';

export const Booking: React.FC<BookingProps> = ({ onBack }) => {
    // State
    const [selectedType, setSelectedType] = useState<ReminderCategory>('vet');
    const [note, setNote] = useState('');
    const [date, setDate] = useState<string>('24 Eki, 2024');
    const [time, setTime] = useState('09:00');
    const [repeat, setRepeat] = useState<RepeatFrequency>('never');
    const [alertOffset, setAlertOffset] = useState<AlertOffset>('exact');

    // UI State
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const categories = [
        { id: 'vet', name: 'Veteriner', icon: Stethoscope, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200' },
        { id: 'groom', name: 'Kuaför', icon: Scissors, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20', border: 'border-pink-200' },
        { id: 'meds', name: 'İlaç/Aşı', icon: Pill, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200' },
        { id: 'food', name: 'Mama', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200' },
        { id: 'other', name: 'Diğer', icon: Bell, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200' },
    ];

    const alertOptions: { id: AlertOffset; label: string }[] = [
        { id: 'exact', label: 'Tam Zamanında' },
        { id: '15min', label: '15 Dk Önce' },
        { id: '1hour', label: '1 Saat Önce' },
        { id: '1day', label: '1 Gün Önce' },
    ];

    const handleSchedule = async () => {
        // 1. Validation
        if (!note && selectedType === 'other') {
            alert("Lütfen bir not girin.");
            return;
        }

        console.log("Scheduling Notification:", { type: selectedType, note, date, time, repeat, alertOffset });

        // 3. Success Feedback
        setIsSuccess(true);
        setTimeout(() => {
            onBack();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-stone-50 dark:bg-black">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center animate-fade-in-up">
                    <CheckCircle className="w-20 h-20 text-green-500 mb-6 animate-bounce" />
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Alarm Kuruldu!</h2>
                    <p className="text-gray-500 text-center">Sana zamanı gelince<br />haber vereceğiz.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-stone-50 dark:bg-black min-h-screen">
            {/* Header */}
            <Header title="Hatırlatıcı Ekle" onBack={onBack} />

            <div className="flex-1 overflow-y-auto pb-32 animate-fade-in-up px-6 pt-2">

                {/* 1. Category Grid */}
                <div className="mb-8">
                    <h3 className="text-gray-800 dark:text-white font-bold text-lg mb-4">Hatırlatma Türü</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {categories.map((cat) => (
                            <InteractiveButton
                                key={cat.id}
                                onClick={() => setSelectedType(cat.id as ReminderCategory)}
                                className={`py-4 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 border-2 ${selectedType === cat.id
                                        ? `border-primary bg-white dark:bg-slate-800 shadow-lg shadow-orange-500/10 scale-105`
                                        : 'border-transparent bg-white dark:bg-slate-900 shadow-sm'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full ${cat.bg} flex items-center justify-center`}>
                                    <cat.icon className={`w-5 h-5 ${cat.color}`} />
                                </div>
                                <span className="font-bold text-[10px] text-gray-600 dark:text-gray-300">{cat.name}</span>
                            </InteractiveButton>
                        ))}
                    </div>
                </div>

                {/* 2. Note Input */}
                <div className="mb-8">
                    <label className="block text-gray-800 dark:text-white font-bold text-lg mb-4">Not Ekle</label>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 focus-within:border-primary transition-colors">
                        <input
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder={
                                selectedType === 'vet' ? "Örn: Dr. Ahmet Bey, Kuduz Aşısı..." :
                                    selectedType === 'food' ? "Örn: X Marka Mama al..." :
                                        selectedType === 'meds' ? "Örn: Sabah akşam 1 tok karna..." :
                                            "Hatırlatma notu..."
                            }
                            className="w-full bg-transparent outline-none font-medium text-gray-800 dark:text-white placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* 3. Date & Time (Row) */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {/* Date */}
                    <div>
                        <label className="block text-gray-500 text-xs font-bold mb-2 ml-2">TARİH</label>
                        <InteractiveButton
                            onClick={() => setIsCalendarOpen(true)}
                            className="w-full bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-start"
                        >
                            <CalendarIcon className="w-5 h-5 text-primary mb-2" />
                            <span className="font-black text-gray-900 dark:text-white">{date}</span>
                        </InteractiveButton>
                    </div>

                    {/* Time */}
                    <div>
                        <label className="block text-gray-500 text-xs font-bold mb-2 ml-2">SAAT</label>
                        <div className="w-full bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-start relative">
                            <Clock className="w-5 h-5 text-primary mb-2 pointer-events-none" />
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="font-black text-gray-900 dark:text-white bg-transparent outline-none w-full appearance-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Alert Offset (New Feature) */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <AlarmClock className="w-5 h-5 text-gray-800 dark:text-white" />
                        <h3 className="text-gray-800 dark:text-white font-bold text-lg">Ne Zaman Hatırlat?</h3>
                    </div>
                    <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                        {alertOptions.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setAlertOffset(opt.id)}
                                className={`flex-shrink-0 px-5 py-3 rounded-xl font-bold text-xs transition-all border-2 ${alertOffset === opt.id
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-orange-500/20'
                                        : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 border-transparent'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 5. Repeat Logic */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <Repeat className="w-5 h-5 text-gray-800 dark:text-white" />
                        <h3 className="text-gray-800 dark:text-white font-bold text-lg">Tekrarlasın mı?</h3>
                    </div>

                    <div className="bg-gray-100 dark:bg-slate-900 p-1.5 rounded-2xl flex justify-between">
                        {(['never', 'daily', 'weekly', 'monthly'] as RepeatFrequency[]).map((r) => (
                            <button
                                key={r}
                                onClick={() => setRepeat(r)}
                                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${repeat === r
                                        ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'
                                    }`}
                            >
                                {r === 'never' ? 'Asla' :
                                    r === 'daily' ? 'Günlük' :
                                        r === 'weekly' ? 'Haftalık' : 'Aylık'}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Footer Action */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 z-20">
                <InteractiveButton
                    onClick={handleSchedule}
                    className="w-full bg-primary text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-orange-500/20 active:scale-95 transition-transform flex items-center justify-center"
                >
                    <Bell className="w-5 h-5 mr-2" />
                    Alarmı Kur
                </InteractiveButton>
            </div>

            {/* Simple Calendar Modal (Mock) */}
            {isCalendarOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg dark:text-white">Tarih Seç</h3>
                            <button onClick={() => setIsCalendarOpen(false)} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full">
                                <X className="w-5 h-5 dark:text-white" />
                            </button>
                        </div>
                        {/* Mock Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2 mb-6 text-center">
                            {['P', 'P', 'S', 'Ç', 'P', 'C', 'C'].map((d, i) => <span key={i} className="text-xs font-bold text-gray-400 mb-2">{d}</span>)}
                            {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                                <button
                                    key={day}
                                    onClick={() => { setDate(`${day} Eki, 2024`); setIsCalendarOpen(false); }}
                                    className={`p-3 rounded-xl font-bold text-sm ${day === 24 ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-white'}`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
