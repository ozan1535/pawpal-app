
import React, { useState } from 'react';
import { ArrowLeft, Plus, Syringe, Calendar, User, Save, X, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { HEALTH_HISTORY } from '../constants';
import { HealthRecord } from '../types';

interface VaccineLogProps {
  onBack: () => void;
}

export const VaccineLog: React.FC<VaccineLogProps> = ({ onBack }) => {
  const [history, setHistory] = useState<HealthRecord[]>(HEALTH_HISTORY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Form State
  const [vaccineName, setVaccineName] = useState('Kuduz Aşısı');
  const [date, setDate] = useState('');
  const [vetName, setVetName] = useState('');

  const handleAddVaccine = () => {
    if (!date || !vetName) return;

    const newRecord: HealthRecord = {
      id: Date.now().toString(),
      date: new Date(date).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }),
      type: 'Aşı',
      details: vaccineName,
      vetName: vetName,
      status: 'Beklemede'
    };

    setHistory([newRecord, ...history]);
    setIsModalOpen(false);
    
    // Mock Push Notification Logic
    setTimeout(() => {
      alert(`🔔 Bildirim Planlandı:\n"${vaccineName}" aşısı ${newRecord.date} tarihinde yapılacak. Sana hatırlatacağız!`);
    }, 500);

    // Reset Form
    setVetName('');
    setDate('');
  };

  const openOptions = (id: string) => {
    setSelectedRecordId(id);
    setIsMenuOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm("Bu sağlık kaydını silmek istediğine emin misin? Bu işlem geri alınamaz.")) {
        setHistory(history.filter(h => h.id !== selectedRecordId));
        setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-black min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-stone-50/80 dark:bg-black/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={onBack}
          className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>
        <h1 className="text-xl font-extrabold text-gray-800 dark:text-white">Aşılar</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-4 pb-24 animate-fade-in-up">
        {/* Stats Card */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-[2rem] p-6 text-white shadow-lg shadow-blue-500/20 mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-blue-100 text-sm font-medium mb-1">Sıradaki</p>
            <h2 className="text-2xl font-bold mb-4">Parazit Önleme</h2>
            <div className="inline-flex items-center bg-white/20 backdrop-blur rounded-lg px-3 py-1.5 text-sm font-bold">
              <Calendar className="w-4 h-4 mr-2" /> Yarın
            </div>
          </div>
          <Syringe className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-10 rotate-12" />
        </div>

        <h3 className="font-bold text-lg text-gray-800 dark:text-white px-2">Geçmiş</h3>

        {/* Ticket List */}
        <div className="space-y-4">
          {history.map((record) => (
            <div key={record.id} className="relative filter drop-shadow-sm group">
              <div className="bg-white dark:bg-slate-800 rounded-2xl flex overflow-hidden">
                
                {/* Date Stub */}
                <div className="w-24 bg-gray-50 dark:bg-slate-700 flex flex-col items-center justify-center p-4 border-r-2 border-dashed border-gray-200 dark:border-gray-600 relative">
                  <span className="text-xs font-bold text-gray-400 uppercase">{record.date.split(' ')[0]}</span>
                  <span className="text-xl font-black text-gray-800 dark:text-white">{record.date.split(' ')[1]}</span>
                  
                  {/* Decorator Circles for Ticket effect */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-stone-50 dark:bg-black rounded-full"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-stone-50 dark:bg-black rounded-full"></div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-center relative">
                   <button 
                     onClick={() => openOptions(record.id!)}
                     className="absolute top-2 right-2 p-2 text-gray-300 hover:text-gray-600 dark:hover:text-white"
                   >
                     <MoreVertical className="w-4 h-4" />
                   </button>

                   <div className="flex justify-between items-start mb-1 pr-6">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{record.details}</h4>
                   </div>
                   <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center text-xs text-gray-500 font-medium">
                          <User className="w-3 h-3 mr-1" /> {record.vetName}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${record.status === 'Beklemede' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                        {record.status}
                      </span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-orange-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-30"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold dark:text-white">Aşı Ekle</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full">
                <X className="w-5 h-5 dark:text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Aşı Adı</label>
                <select 
                  value={vaccineName} 
                  onChange={(e) => setVaccineName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border-none outline-none dark:text-white font-bold"
                >
                  <option>Kuduz Aşısı</option>
                  <option>Karma Aşı</option>
                  <option>Parvovirüs</option>
                  <option>Barınak Hastalığı</option>
                  <option>İç Parazit Hapı</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Tarih</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border-none outline-none dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Veteriner Adı</label>
                <input 
                  type="text" 
                  placeholder="Örn: Dr. Yılmaz"
                  value={vetName}
                  onChange={(e) => setVetName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border-none outline-none dark:text-white font-medium"
                />
              </div>

              <button 
                onClick={handleAddVaccine}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 mt-4 flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" /> Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Options Menu Bottom Sheet */}
      {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
             <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-[2.5rem] p-6 animate-in slide-in-from-bottom pb-10">
                 <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
                 <h3 className="text-center font-bold text-gray-900 dark:text-white mb-6">Kaydı Yönet</h3>
                 
                 <div className="space-y-3">
                     <button 
                        onClick={() => { setIsMenuOpen(false); alert("Düzenleme özelliği sonraki güncellemede!"); }}
                        className="w-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white py-4 rounded-xl font-bold flex items-center justify-center"
                     >
                         <Edit2 className="w-5 h-5 mr-2" /> Detayları Düzenle
                     </button>
                     <button 
                        onClick={handleDelete}
                        className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 py-4 rounded-xl font-bold flex items-center justify-center"
                     >
                         <Trash2 className="w-5 h-5 mr-2" /> Kaydı Sil
                     </button>
                     <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full text-gray-500 py-4 font-bold"
                     >
                         İptal
                     </button>
                 </div>
             </div>
          </div>
      )}
    </div>
  );
};