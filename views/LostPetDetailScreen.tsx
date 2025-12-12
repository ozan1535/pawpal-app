import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, MessageCircle, Share2, Award, Info, Check, X, AlertTriangle } from 'lucide-react';
import { LostPet } from '../types';
import { MOCK_USER } from '../constants';
import { AnimatedWrapper, InteractiveButton } from '../components/Motion';

interface LostPetDetailScreenProps {
    pet: LostPet;
    onBack: () => void;
    onUpdateStatus: (id: string, status: 'ACTIVE' | 'FOUND' | 'ARCHIVED') => void;
}

export const LostPetDetailScreen: React.FC<LostPetDetailScreenProps> = ({ pet, onBack, onUpdateStatus }) => {
    const isOwner = pet.ownerId === MOCK_USER.id;
    const [showStatusModal, setShowStatusModal] = useState(false);

    return (
        <div className="flex flex-col h-full bg-stone-50 dark:bg-black min-h-screen relative">
            {/* Hero Section */}
            <div className="relative h-96">
                <img src={pet.imageUrl} className="w-full h-full object-cover" alt={pet.name} />

                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                {/* Share Button */}
                <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                    <Share2 className="w-6 h-6" />
                </button>

                {/* Status Badge */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent pt-24">
                    <div className="flex items-center justify-between mb-2">
                        {pet.status === 'ACTIVE' && (
                            <span className="bg-red-600 text-white px-4 py-1.5 rounded-full font-black text-sm tracking-wide animate-pulse shadow-lg shadow-red-600/40">
                                KAYIP ARANIYOR
                            </span>
                        )}
                        {pet.status === 'FOUND' && (
                            <span className="bg-green-500 text-white px-4 py-1.5 rounded-full font-black text-sm tracking-wide shadow-lg shadow-green-500/40 flex items-center">
                                <Check className="w-4 h-4 mr-1.5" /> BULUNDU
                            </span>
                        )}
                        <span className="text-white/80 font-bold text-sm bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
                            {pet.distance} uzakta
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-white mb-1">{pet.name}</h1>
                    <p className="text-white/80 text-lg font-medium">{pet.breed} • {pet.details.microchip ? 'Çipli' : 'Çipsiz'}</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-8 space-y-8 overflow-y-auto pb-32">

                {/* Reward Section */}
                {pet.details.reward && pet.status === 'ACTIVE' && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700/50 p-5 rounded-2xl flex items-center shadow-sm">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-2xl">
                            💰
                        </div>
                        <div>
                            <h3 className="font-black text-yellow-800 dark:text-yellow-400 text-lg">ÖDÜL: {pet.details.reward}</h3>
                            <p className="text-yellow-700 dark:text-yellow-500 text-sm font-medium">Bulan kişiye verilecektir.</p>
                        </div>
                    </div>
                )}

                {/* Critical Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-stone-100 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center text-gray-400 mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-xs font-bold uppercase">Son Görülme</span>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">{pet.lastSeen}</p>
                        <p className="text-xs text-gray-500 mt-1">2 saat önce</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-stone-100 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center text-gray-400 mb-2">
                            <Award className="w-4 h-4 mr-2" />
                            <span className="text-xs font-bold uppercase">Tasma</span>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">{pet.details.collar}</p>
                        <p className="text-xs text-gray-500 mt-1">Rengi</p>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h3 className="font-black text-gray-900 dark:text-white text-lg mb-3 flex items-center">
                        <Info className="w-5 h-5 mr-2 text-gray-400" /> Detaylar
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        {pet.details.description}
                    </p>
                </div>

                {/* Map Snapshot (Placeholder) */}
                <div className="rounded-3xl overflow-hidden h-48 relative border-2 border-stone-100 dark:border-slate-800">
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                        className="w-full h-full object-cover opacity-80"
                        alt="Map"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="bg-red-500 text-white p-3 rounded-full shadow-xl animate-bounce">
                            <MapPin className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Sightings List */}
                {pet.sightings.length > 0 && (
                    <div>
                        <h3 className="font-black text-gray-900 dark:text-white text-lg mb-4">Görülme Bildirimleri ({pet.sightings.length})</h3>
                        <div className="space-y-3">
                            {pet.sightings.map(sighting => (
                                <div key={sighting.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-stone-100 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-stone-100 dark:bg-slate-800 rounded-full flex items-center justify-center mr-3 font-bold text-gray-500">
                                            {sighting.reporterName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{sighting.reporterName}</h4>
                                            <p className="text-xs text-gray-500">{sighting.timestamp}</p>
                                        </div>
                                    </div>
                                    <button className="text-primary font-bold text-sm">Haritada Gör</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-t border-stone-100 dark:border-slate-800 z-20">
                {isOwner ? (
                    // OWNER VIEW
                    <div className="space-y-3">
                        {pet.status === 'ACTIVE' ? (
                            <>
                                <InteractiveButton
                                    onClick={() => setShowStatusModal(true)}
                                    className="w-full bg-green-500 text-white font-black text-lg py-4 rounded-2xl shadow-xl shadow-green-500/30 flex items-center justify-center"
                                >
                                    <Check className="w-6 h-6 mr-2" />
                                    BULDUM! 🎉
                                </InteractiveButton>
                                <button className="w-full py-3 text-gray-400 font-bold text-sm hover:text-red-500 transition-colors">
                                    İlanı Kaldır / Sil
                                </button>
                            </>
                        ) : (
                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-900/50">
                                <h3 className="font-black text-green-600 dark:text-green-400 text-lg mb-1">Harika Haber! 🎉</h3>
                                <p className="text-green-600/80 dark:text-green-400/80 font-medium text-sm">Bu ilan 24 saat sonra otomatik olarak arşivlenecektir.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    // PUBLIC VIEW
                    <div className="flex space-x-4">
                        <InteractiveButton className="flex-1 bg-stone-100 dark:bg-slate-800 text-gray-900 dark:text-white font-black text-lg py-4 rounded-2xl flex items-center justify-center hover:bg-stone-200 transition-colors">
                            <MapPin className="w-5 h-5 mr-2" />
                            Gördüm
                        </InteractiveButton>
                        <InteractiveButton className="flex-1 bg-red-600 text-white font-black text-lg py-4 rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center">
                            <Phone className="w-5 h-5 mr-2" />
                            Ara
                        </InteractiveButton>
                    </div>
                )}
            </div>

            {/* Status Update Modal */}
            {showStatusModal && (
                <StatusUpdateModal
                    onClose={() => setShowStatusModal(false)}
                    onConfirm={() => {
                        onUpdateStatus(pet.id, 'FOUND');
                        setShowStatusModal(false);
                    }}
                />
            )}
        </div>
    );
};

// --- STATUS UPDATE MODAL ---
interface StatusUpdateModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({ onClose, onConfirm }) => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex justify-end">
                    <button onClick={onClose} className="p-2 bg-stone-100 dark:bg-slate-800 rounded-full text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">🎉</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Harika Haber!</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Dostumuzun bulunmasına çok sevindik. Nasıl bulduğunuzu paylaşır mısınız?
                    </p>
                </div>

                <div className="space-y-3 mb-8">
                    {['Komşular sayesinde', 'Kendi kendine döndü', 'Sosyal Medya ile', 'Diğer'].map((reason) => (
                        <button
                            key={reason}
                            className="w-full p-4 rounded-xl border-2 border-stone-100 dark:border-slate-800 font-bold text-gray-700 dark:text-gray-300 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all text-left"
                        >
                            {reason}
                        </button>
                    ))}
                </div>

                <InteractiveButton
                    onClick={onConfirm}
                    className="w-full bg-green-500 text-white font-black text-lg py-4 rounded-2xl shadow-xl shadow-green-500/30"
                >
                    Kutlamayı Başlat! 🎊
                </InteractiveButton>
            </div>
        </div>
    );
};
