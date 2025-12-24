import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Camera,
  AlertTriangle,
  Phone,
  FileText,
} from "lucide-react";
import SelectComponent from "@/components/SelectComponent";
import { cities } from "@/lib/cityInformation";
import ImageUpload from "@/components/ImageUpload";
import { addNewLostPet } from "@/services/supabase/lost_pets.service";
import {
  getAllUsersByCity,
  getAllUsersByCityExceptCurrentUser,
  getCurrentUser,
  getCurrentUserDetail,
} from "@/services/supabase/user_details.service";
import { useNavigate } from "react-router-dom";
import { sendPushNotification } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

// --- SOS FORM ---
interface SOSFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export const SOSForm: React.FC<SOSFormProps> = ({ onSubmit, onCancel }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [reward, setReward] = useState("");
  const [contact, setContact] = useState("");
  const [color, setColor] = useState("");

  const handleFetchDistricts = async (selectedItem) => {
    const response = await fetch(
      `https://api.turkiyeapi.dev/v1/provinces?name=${selectedItem}`
    );
    const data = await response.json();

    setSelectedDistrict("");
    setDistricts(data.data[0].districts);
  };

  const handleAddData = async () => {
    const user = await getCurrentUserDetail();
    await addNewLostPet(
      user.id,
      name,
      city,
      selectedDistrict,
      details,
      contact,
      image,
      reward,
      color
    );
    const users = await getAllUsersByCityExceptCurrentUser(city, user?.id);
    await Promise.all(
      users.map(async (user) => {
        const { data, error } = await supabase.functions.invoke("send-push", {
          body: {
            expoPushToken: user?.profiles?.push_token || "",
            title: "Yeni Kayıp İlanı",
            text: `Kayıp İlanı ${city} - ${selectedDistrict}`,
            url: "/lost-pets",
          },
        });
        console.log(data, "ehehehe", error, "hihihiih");
        if (error) console.error(error);
      })
    );
    navigate("/lost-community");
  };

  return (
    <div className="flex flex-col h-full bg-red-50 dark:bg-slate-900 min-h-screen">
      <div className="p-4 flex items-center">
        <button
          onClick={onCancel}
          className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>
        <h1 className="text-xl font-black text-red-600 ml-4">
          KAYIP İLANI VER
        </h1>
      </div>

      <div className="flex-1 p-6 space-y-6 animate-fade-in-up overflow-y-auto pb-24">
        {/* Photo Upload Placeholder */}
        {/* <div className="h-40 bg-red-100 dark:bg-slate-800 border-2 border-dashed border-red-300 dark:border-red-900 rounded-3xl flex flex-col items-center justify-center text-red-400 flex-shrink-0">
          <Camera className="w-10 h-10 mb-2" />
          <span className="font-bold text-sm">Güncel Fotoğraf Yükle</span>
        </div> */}
        <div className="w-full flex justify-center">
          <ImageUpload
            currentPhotoUrl={image}
            storageId={"lost_photos"}
            onPhotoChange={(url) => setImage(url)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            Evcil Hayvan Adı
          </label>
          <input
            type="text"
            className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border-none outline-none font-bold dark:text-white"
            placeholder="Örn: Barnaby"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            Son Görülme Konumu
          </label>
          <div className="relative w-full flex gap-3">
            <div className="w-1/2">
              <SelectComponent
                selectedItem={city}
                setSelectedItem={setCity}
                data={cities}
                label={"Şehir"}
                disabledValue={"Şehir Seçiniz"}
                handleFetch={handleFetchDistricts}
              />
            </div>
            <div className="w-1/2">
              <SelectComponent
                selectedItem={selectedDistrict}
                setSelectedItem={setSelectedDistrict}
                data={districts}
                label={"İlçeler"}
                disabledValue={"İlçe Seçiniz"}
              />
            </div>
          </div>
        </div>

        {/* NEW DETAILS SECTION */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            Detaylar
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <textarea
              className="w-full pl-12 p-4 rounded-xl bg-white dark:bg-slate-800 border-none outline-none font-bold dark:text-white h-32 resize-none"
              placeholder="Örn: Kırmızı tasması var, ismiyle çağrılınca gelir. Sol arka ayağında beyaz leke var..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            Sahip İletişim (ör: 555 123 45 67)
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              className="w-full pl-12 p-4 rounded-xl bg-white dark:bg-slate-800 border-none outline-none font-bold dark:text-white"
              placeholder="555 123 45 67"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            Tasma rengi (varsa)
          </label>
          <input
            type="text"
            className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border-none outline-none font-bold dark:text-white"
            placeholder={"siyah"}
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            Ödül (Türk Lirası)
          </label>
          <input
            type="number"
            className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border-none outline-none font-bold dark:text-white"
            placeholder={1000}
            value={reward}
            onChange={(e) => setReward(e.target.value)}
          />
        </div>

        <div className="pt-4 pb-8">
          <button
            onClick={handleAddData}
            className="w-full bg-red-600 text-white font-black text-lg py-5 rounded-2xl shadow-xl shadow-red-600/30 active:scale-95 transition-transform flex items-center justify-center"
          >
            <AlertTriangle className="w-6 h-6 mr-2" />
            ALARMI YAYINLA
          </button>
          {/* <p className="text-center text-xs text-red-400 mt-4 font-medium">
            Bu işlem 5km içindeki tüm PawPal kullanıcılarına bildirim
            gönderecektir.
          </p> */}
        </div>
      </div>
    </div>
  );
};

// --- SOS BROADCAST ANIMATION ---
interface SOSBroadcastProps {
  onComplete: () => void;
}

export const SOSBroadcast: React.FC<SOSBroadcastProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 1500);

    // Auto close after 5 seconds for demo
    const timeout = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-600 text-white relative overflow-hidden">
      {/* Radar Waves */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-red-500 rounded-full opacity-50 animate-ping absolute"></div>
        <div
          className="w-96 h-96 bg-red-500 rounded-full opacity-30 animate-ping absolute"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl">
          <span className="text-4xl animate-pulse">📡</span>
        </div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">
          YAYINLANIYOR...
        </h1>
        <p className="font-medium opacity-90">
          Komşulara & gezdiricilere bildiriliyor
        </p>

        <div className="mt-8 bg-red-700/50 px-6 py-2 rounded-full backdrop-blur-sm">
          <span className="font-bold">{12 + count} kişiye ulaşıldı</span>
        </div>
      </div>

      <button
        onClick={onComplete}
        className="absolute bottom-10 text-white/70 font-bold text-sm underline"
      >
        Kapat
      </button>
    </div>
  );
};
