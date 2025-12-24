import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Navigation, Clock } from "lucide-react";
import { EMERGENCY_VETS } from "../constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { izmirVeterinerler } from "@/lib/utils";
import { getVeterinarians } from "@/services/supabase/veterinarians.service";
import { getCurrentUserDetail } from "@/services/supabase/user_details.service";
import SelectComponent from "@/components/SelectComponent";
import { cities } from "@/lib/cityInformation";

interface EmergencyMapProps {
  onBack: () => void;
}

export const EmergencyMap: React.FC<EmergencyMapProps> = ({ onBack }) => {
  const [vets, setVets] = useState(null);
  const [city, setCity] = useState("");
  const openGoogleMaps = (url) => {
    window.open(url, "_blank");
  };
  const getUserDetailAndVets = async () => {
    const userDetail = await getCurrentUserDetail();
    getVets(userDetail.city);
  };

  const getVets = async (item: string) => {
    const veterinarians = await getVeterinarians(item);
    setVets(veterinarians);
  };

  useEffect(() => {
    getUserDetailAndVets();
  }, []);

  return (
    <div className="flex flex-col h-full relative">
      {/* Map Placeholder Background */}
      <div className="absolute inset-0 z-0 bg-gray-200 dark:bg-slate-800 overflow-hidden transition-colors duration-300">
        {/* Abstract Map Lines */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Radar Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500 border-4 border-white dark:border-slate-900 rounded-full shadow-xl z-10 flex items-center justify-center">
          <span className="text-3xl">🐶</span>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 pt-6">
        <Button
          variant="secondary"
          onClick={onBack}
          className="w-12 h-12 p-0 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-[2.5rem] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 max-h-[60vh] overflow-y-auto border-t-4 border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full mx-auto mb-6"></div>

        <h2 className="text-xl font-heading text-gray-900 dark:text-white mb-2">
          Acil Veterinerler
        </h2>
        {/*  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-bold">
          Yakınlarda {izmirVeterinerler2.length} adet 7/24 açık klinik bulundu.
        </p> */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-bold">
          {vets?.length} adet veteriner klinik bulundu.
        </p>
        <div className="mb-3">
          <SelectComponent
            // selectedItem={""}
            // setSelectedItem={null}
            selectedItem={city}
            setSelectedItem={setCity}
            data={cities}
            label={"Şehir"}
            disabledValue={"Şehir Seçiniz"}
            handleFetch={(value) => getVets(value)}
          />
        </div>

        <div className="space-y-4">
          {vets?.map((vet, idx) => (
            <Card
              key={idx}
              className="bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {vet.name}
                  </h3>
                  {/* <div className="flex items-center text-xs font-bold text-green-600 dark:text-green-400 mt-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg w-fit">
                    <Clock className="w-3 h-3 mr-1" />
                    7/24 AÇIK
                  </div> */}
                </div>
                <div className="text-right">
                  <span className="block font-black text-lg text-primary">
                    {vet.district}
                  </span>
                  {/*  <span className="text-xs text-gray-400 dark:text-gray-500 font-bold">
                    uzakta
                  </span> */}
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                {vet.address}
              </p>

              <div className="flex space-x-3">
                <Button variant="danger" className="flex-1 h-12" fullWidth>
                  <Phone className="w-4 h-4 mr-2" /> Ara
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 h-12"
                  fullWidth
                  onClick={() => openGoogleMaps(vet.google_maps_url)}
                >
                  <Navigation className="w-4 h-4 mr-2" /> Yol Tarifi
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
