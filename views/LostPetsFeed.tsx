import React, { useState, useEffect } from "react";
import { ArrowLeft, MessageCircle, MapPin, Search, Filter } from "lucide-react";
import { NEARBY_LOST_PETS } from "../constants";
import { LostPetDetailScreen } from "./LostPetDetailScreen";
import { getLostPets } from "@/services/supabase/lost_pets.service";
import { getCurrentUserDetail } from "@/services/supabase/user_details.service";
import LoadingScreen from "@/components/LoadingScreen";

interface LostPetsFeedProps {
  onBack: () => void;
}

export const LostPetsFeed: React.FC<LostPetsFeedProps> = ({ onBack }) => {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "FOUND">("ACTIVE");
  const [lostPets, setLostPets] = useState(null);

  const handleGetLostPets = async () => {
    const user = await getCurrentUserDetail();
    const data = await getLostPets(user.city);

    setLostPets(data);
  };

  useEffect(() => {
    handleGetLostPets();
  }, []);

  // Mock State for local updates
  const [pets, setPets] = useState(NEARBY_LOST_PETS);

  const handleUpdateStatus = (
    id: string,
    status: "ACTIVE" | "FOUND" | "ARCHIVED"
  ) => {
    setPets((currentPets) =>
      currentPets.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };
  if (!lostPets) return <LoadingScreen />;

  const filteredPets = lostPets.filter((pet) => {
    if (activeTab === "ACTIVE") return pet.is_found === false; // pet.status === "ACTIVE";
    return pet.is_found === true; //pet.status === "FOUND"; // Show Found pets in the other tab
  });

  if (selectedPetId) {
    const pet = filteredPets.find((p) => p.id === selectedPetId);
    if (pet) {
      return (
        <LostPetDetailScreen
          pet={pet}
          onBack={() => setSelectedPetId(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      );
    }
  }

  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-black min-h-screen">
      {/* Header */}
      <div className="p-4 flex items-center justify-between sticky top-0 bg-stone-50/90 dark:bg-black/90 backdrop-blur-md z-20 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="w-6 h-6 dark:text-white" />
        </button>
        <h1 className="font-black text-lg dark:text-white text-red-500">
          KAYIP HAYVANLAR
        </h1>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800">
          <Filter className="w-6 h-6 dark:text-white" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4 pb-2 flex space-x-2">
        <button
          onClick={() => setActiveTab("ACTIVE")}
          className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${
            activeTab === "ACTIVE"
              ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
              : "bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400"
          }`}
        >
          🚨 Aktif İlanlar
        </button>
        <button
          onClick={() => setActiveTab("FOUND")}
          className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${
            activeTab === "FOUND"
              ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
              : "bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400"
          }`}
        >
          💚 Mutlu Sonlar
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-6 pb-24">
        {filteredPets.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="font-bold text-gray-500">
              Bu kategoride ilan bulunamadı.
            </p>
          </div>
        )}

        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            onClick={() => setSelectedPetId(pet.id)}
            className={`bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-lg border-2 cursor-pointer transition-transform active:scale-95 ${
              pet.status === "ACTIVE"
                ? "border-red-100 dark:border-red-900/50 hover:border-red-500"
                : "border-green-100 dark:border-green-900/50 hover:border-green-500 grayscale hover:grayscale-0 transition-all"
            }`}
          >
            <div className="relative h-64">
              <img
                src={pet.image}
                className="w-full h-full object-cover"
                alt={pet.name}
              />

              {pet.status === "ACTIVE" && (
                <div className="absolute top-4 right-4 bg-red-600 text-white font-black px-3 py-1 rounded-lg shadow-md animate-pulse">
                  KAYIP
                </div>
              )}

              {pet.status === "FOUND" && (
                <div className="absolute top-4 right-4 bg-green-500 text-white font-black px-3 py-1 rounded-lg shadow-md">
                  BULUNDU
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                <h2 className="text-3xl font-black text-white">{pet.name}</h2>
                <p className="text-white/80 font-medium">
                  {/* {pet.breed} • {pet.distance} uzakta */}
                  {pet.reward ? `Ödül: ${pet.reward} TL` : `+90 ${pet.contact}`}
                </p>
              </div>
            </div>

            <div className="p-6">
              <div
                className={`flex items-start mb-4 p-4 rounded-xl ${
                  pet.status === "ACTIVE"
                    ? "bg-red-50 dark:bg-red-900/10"
                    : "bg-green-50 dark:bg-green-900/10"
                }`}
              >
                <MapPin
                  className={`w-5 h-5 mr-3 mt-0.5 ${
                    pet.status === "ACTIVE" ? "text-red-500" : "text-green-500"
                  }`}
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Son Görülme
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {pet.city} - {pet.district}
                  </p>
                </div>
              </div>

              {pet.status === "ACTIVE" && (
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white py-4 rounded-xl font-bold text-sm">
                    Detaylar
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-red-500/30 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 mr-2" /> İletişim
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
