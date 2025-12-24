import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { InteractiveButton } from "./Motion";

interface CalendarModalProps {
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  onClose,
  reminders,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(
    new Date().getDate()
  );
  const [selectedEvent, setSelectedEvent] = useState(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Adjust for Monday start (0 = Sunday in JS, but we want 0 = Monday usually, or just standard grid)
  // Let's stick to standard Sunday start for simplicity or adjust if needed.
  // Standard: 0=Sun, 1=Mon...

  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  // Mock Events
  const events: Record<
    number,
    { type: "vet" | "groom" | "meds"; title: string }[]
  > = {
    24: [{ type: "vet", title: "Tıraş Randevusu" }],
    25: [{ type: "meds", title: "İç Parazit Hapı" }],
    28: [{ type: "vet", title: "Kontrol Muayenesi" }],
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center">
            <CalendarIcon className="w-6 h-6 mr-2 text-primary" />
            Takvim
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 dark:text-white" />
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6 bg-gray-50 dark:bg-slate-800 p-2 rounded-2xl">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 dark:text-white" />
          </button>
          <span className="font-bold text-lg dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <ChevronRight className="w-5 h-5 dark:text-white" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6 text-center">
          {["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"].map((d, i) => (
            <span key={i} className="text-xs font-bold text-gray-400 mb-2">
              {d}
            </span>
          ))}

          {/* Empty slots for start of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const hasEvent = reminders.some(
              (item) =>
                item.date ===
                `${currentDate.getFullYear()}-${
                  currentDate.getMonth() + 1
                }-${day}`
            ); //events[day];
            const isSelected = selectedDate === day;
            const eventItem = reminders.filter(
              (item) =>
                item.date ===
                `${currentDate.getFullYear()}-${
                  currentDate.getMonth() + 1
                }-${day}`
            );

            return (
              <button
                key={day}
                onClick={() => {
                  setSelectedDate(day);
                  setSelectedEvent(eventItem.length ? eventItem : null);
                }}
                className={`
                  relative h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all
                  ${
                    isSelected
                      ? "bg-primary text-white shadow-lg shadow-orange-500/30 scale-110"
                      : "hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-white text-gray-700"
                  }
                `}
              >
                {day}
                {hasEvent && !isSelected && (
                  <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Events */}
        <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-4 min-h-[120px]">
          <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
            {selectedDate} {monthNames[currentDate.getMonth()]} Etkinlikleri
          </h3>

          {selectedDate && selectedEvent ? (
            <div className="space-y-3">
              {selectedEvent.map((event, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-white dark:bg-slate-700 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600"
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      event.type === "Kuaför"
                        ? "bg-orange-500"
                        : event.type === "Veteriner"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <span className="font-bold text-gray-800 dark:text-white text-sm">
                    {event.note || event.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p className="text-sm font-medium">
                Bugün için planlanmış etkinlik yok.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
