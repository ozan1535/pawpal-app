import React, { useState, useEffect } from "react";
import {
  User,
  Users,
  Bell,
  Shield,
  Moon,
  ChevronRight,
  Settings,
  LogOut,
  HelpCircle,
  FileText,
  Share2,
  Plus,
  Edit2,
  Bot,
} from "lucide-react";
import { MOCK_USER, MY_PETS } from "../constants";
import {
  AnimatedWrapper,
  InteractiveButton,
  StaggerContainer,
  getStaggerStyle,
} from "../components/Motion";
import ImageUpload from "@/components/ImageUpload";
import {
  getCurrentUserDetail,
  updateUserImage,
  updateUserSelectedPet,
} from "@/services/supabase/user_details.service";
import { getPetsByOwnerId } from "@/services/supabase/pets.service";
import { usePet } from "@/contexts/PetContext";
import LoadingScreen from "@/components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { Modal } from "@/components/Modal";
import { getAiResponsesByUserId } from "@/services/supabase/ai_responses.service";
import { supabase } from "@/lib/supabase";

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [image, setImage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [userPets, setUserPets] = useState(null);
  const { petId, petItem, setPetItem, changePet } = usePet();
  const [modalItems, setModalItems] = useState({
    isAllAiResponsesOpen: false,
    isSelectedAiResponseOpen: false,
    selectedItem: null,
  });
  const [aiResponses, setAiResponses] = useState(null);
  const handleExport = () => {
    setIsExporting(true);
    // Simulate generation delay
    setTimeout(() => {
      setIsExporting(false);
      if (navigator.share) {
        navigator
          .share({
            title: "PawPal Sağlık Raporu",
            text: "Barnaby için son 6 aylık aşı ve kilo dökümü.",
            url: "https://pawpal.app/report/123",
          })
          .catch(console.error);
      } else {
        alert("Rapor indirildi: barnaby_health_report.pdf");
      }
    }, 2000);
  };

  const logoutFromMobile = (e) => {
    e.preventDefault();

    localStorage.removeItem("supabase_access_token");
    localStorage.removeItem("supabase_refresh_token");
    localStorage.removeItem("supabase_user");

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "logout",
        })
      );
    } else {
      supabase.auth.signOut();
      window.location.href = "/";
    }
  };

  const handleGetUserData = async () => {
    const userDetail = await getCurrentUserDetail();
    const userPetsData = await getPetsByOwnerId(userDetail.id);
    const aiResponses = await getAiResponsesByUserId(userDetail.id);
    setUserInfo(userDetail);
    setUserPets(userPetsData);
    setAiResponses(aiResponses);
    //setImage(userDetail.image);
  };

  const handleToggleAiResponsesOpen = () => {
    setModalItems((prev) => ({
      ...prev,
      isAllAiResponsesOpen: !prev.isAllAiResponsesOpen,
    }));
  };

  // const handleChangePetProfile = async (petId) => {
  //   await updateUserSelectedPet(petId, userInfo.id);
  // };

  useEffect(() => {
    handleGetUserData();
  }, []);

  //   const changeUserImage = async () => {
  //     await updateUserImage(userInfo.id, image);
  //   };

  //   useEffect(()=>{

  //   },)
  if (!userInfo || !userPets) return <LoadingScreen />;
  return (
    <div className="flex flex-col space-y-8 pb-32 pt-8">
      {modalItems.isAllAiResponsesOpen && (
        <Modal
          isOpen={modalItems.isAllAiResponsesOpen}
          onClose={handleToggleAiResponsesOpen}
          title="Ai Vet Verileri"
          footer={null}
        >
          <div>
            {aiResponses.map((response) => (
              <div
                className="p-2 rounded-sm bg-blue-300 my-2 text-lg font-semibold"
                key={response.id}
                onClick={() =>
                  setModalItems((prev) => ({
                    ...prev,
                    isSelectedAiResponseOpen: true,
                    selectedItem: [
                      {
                        id: "123",
                        image: response.image,
                        role: "user",
                        text: response.user_message,
                      },
                      {
                        id: "234",
                        image: null,
                        role: "model",
                        text: response.ai_response,
                      },
                    ],
                  }))
                }
              >
                {response?.user_message.slice(0, 30)}...
              </div>
            ))}
          </div>
        </Modal>
      )}
      {modalItems.isSelectedAiResponseOpen && (
        <Modal
          isOpen={modalItems.isSelectedAiResponseOpen}
          onClose={() =>
            setModalItems((prev) => ({
              ...prev,
              isSelectedAiResponseOpen: false,
              selectedItem: null,
            }))
          }
          title={"Ai Vet Yanıtı"}
          footer={null}
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
            {modalItems?.selectedItem?.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "model" && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <Bot className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm flex flex-col
              ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700"
              }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Uploaded"
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* 1. Header: User Identity */}
      <AnimatedWrapper className="flex flex-col items-center justify-center px-6">
        {/* <div className="relative mb-4">
                    <div className="w-28 h-28 rounded-full p-1 bg-white dark:bg-slate-800 shadow-soft transition-colors duration-300">
                        <img src={MOCK_USER.photoUrl} alt={MOCK_USER.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-md border-2 border-white dark:border-slate-900 transition-colors duration-300">
                        <Edit2 className="w-3 h-3" />
                    </button>
                </div> */}
        <ImageUpload
          currentPhotoUrl={userInfo.image}
          onPhotoChange={async (url) => {
            setImage(url);
            await updateUserImage(url, userInfo.id);
          }}
          storageId={"user_photos"}
        />
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1 transition-colors duration-300">
          {userInfo.name}
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 font-bold mb-3 transition-colors duration-300">
          Üyelik: {userInfo.created_at.slice(0, 4)}
        </p>

        {/* Gamification Badge */}
        <div className="bg-gradient-to-r from-yellow-200 to-amber-400 p-[1px] rounded-full">
          <div className="bg-amber-50 dark:bg-amber-900/40 px-3 py-1 rounded-full flex items-center transition-colors duration-300">
            <span className="text-xs font-black text-amber-700 dark:text-amber-300 tracking-wide uppercase">
              {MOCK_USER.levelTitle} (Sv. {MOCK_USER.level})
            </span>
          </div>
        </div>
      </AnimatedWrapper>

      {/* 2. My Pack (Pet Management) */}
      <div className="px-0">
        <div className="flex justify-between items-end px-6 mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white transition-colors duration-300">
            Ailem (My Pack)
          </h3>
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 transition-colors duration-300">
            {userPets.length} Evcil Hayvan
          </span>
        </div>

        {/* Horizontal Scroll with Snap */}
        <div className="flex overflow-x-auto snap-x snap-mandatory px-6 space-x-4 no-scrollbar pb-4">
          {userPets.map((pet) => (
            <div
              key={pet.id}
              className="snap-center flex-shrink-0 w-40 relative group"
              onClick={() => {
                changePet(pet.id);
                setPetItem(pet);
                // handleChangePetProfile(pet.id);
              }}
            >
              <div className="h-48 rounded-[2rem] bg-white dark:bg-slate-800 shadow-soft border border-gray-100 dark:border-slate-700 p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300">
                <img
                  src={pet.image}
                  className="w-20 h-20 rounded-full object-cover mb-3 shadow-sm"
                  alt={pet.name}
                />
                <h4 className="font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  {pet.name}
                </h4>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 transition-colors duration-300">
                  {pet.breed}
                </p>

                {/* Status Dot */}
                <div
                  className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                    pet.name === /* userPets[0].name */ petItem.name
                      ? "bg-red-500 animate-pulse"
                      : "bg-green-500"
                  }`}
                ></div>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <div className="snap-center flex-shrink-0 w-24">
            <InteractiveButton
              onClick={() => navigate("/welcome")}
              className="h-48 w-full rounded-[2rem] border-2 border-dashed border-gray-300 dark:border-slate-700 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:border-primary hover:text-primary hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-xs font-bold">Ekle</span>
            </InteractiveButton>
          </div>
        </div>
      </div>

      {/* 3. Monetization Banner */}
      <div className="px-6">
        <div className="bg-gradient-to-r from-gray-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden border border-transparent dark:border-slate-700 transition-all duration-300">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl">👑</span>
              <h3 className="font-black text-lg">PawPal Premium</h3>
            </div>
            <p className="text-gray-300 text-xs mb-4 max-w-[200px]">
              AI Veteriner, Sınırsız Bulut ve daha fazlası.
            </p>
            <button className="bg-white text-black px-4 py-2 rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors">
              Yükselt
            </button>
          </div>
          {/* Abstract Decor */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl"></div>
        </div>
      </div>

      {/* 4. Settings Groups */}
      <div className="px-6 space-y-6">
        {/* Group A: Family & Data */}
        <SettingsGroup title="Aile ve Veriler">
          <SettingsItem icon={Users} label="Aileyi Yönet" />
          <SettingsItem
            icon={Bot}
            label="Ai Vet Verileri"
            onClick={handleToggleAiResponsesOpen}
          />
          <SettingsItem
            icon={FileText}
            label={
              isExporting ? "Rapor Hazırlanıyor..." : "Sağlık Raporunu Paylaş"
            }
            onClick={handleExport}
            rightElement={
              isExporting && (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              )
            }
          />
          <SettingsItem icon={Shield} label="Gizlilik & Güvenlik" />
        </SettingsGroup>

        {/* Group B: App Prefs */}
        <SettingsGroup title="Uygulama Tercihleri">
          <SettingsItem
            icon={Bell}
            label="Bildirimler"
            rightElement={<ToggleSwitch />}
          />
          <SettingsItem
            icon={Moon}
            label="Karanlık Mod"
            rightElement={
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                Otomatik
              </span>
            }
          />
          <SettingsItem
            icon={Settings}
            label="Birimler"
            rightElement={
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                KG / CM
              </span>
            }
          />
        </SettingsGroup>

        {/* Group C: Support */}
        <SettingsGroup title="Destek">
          <SettingsItem icon={HelpCircle} label="Yardım Merkezi" />
          <SettingsItem icon={Share2} label="Uygulamayı Paylaş" />
        </SettingsGroup>
      </div>

      {/* Logout */}
      <div className="px-6 pt-4 text-center">
        <button
          onClick={logoutFromMobile}
          className="text-red-500 font-bold text-sm flex items-center justify-center mx-auto hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl transition-colors duration-300"
        >
          <LogOut className="w-4 h-4 mr-2" /> Çıkış Yap
        </button>
        <p className="text-[10px] text-gray-300 dark:text-gray-600 mt-4 transition-colors duration-300">
          Sürüm 1.0.4 (Build 204)
        </p>
      </div>
    </div>
  );
};

// --- Sub Components ---

const SettingsGroup: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 ml-2 transition-colors duration-300">
      {title}
    </h4>
    <div className="bg-white dark:bg-slate-800 rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
      {children}
    </div>
  </div>
);

const SettingsItem: React.FC<{
  icon: any;
  label: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
}> = ({ icon: Icon, label, onClick, rightElement }) => (
  <InteractiveButton
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-slate-700 last:border-none hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-300"
  >
    <div className="flex items-center">
      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mr-3 text-gray-600 dark:text-gray-300 transition-colors duration-300">
        <Icon className="w-4 h-4" />
      </div>
      <span className="font-bold text-sm text-gray-700 dark:text-gray-200 transition-colors duration-300">
        {label}
      </span>
    </div>
    <div>
      {rightElement || (
        <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
      )}
    </div>
  </InteractiveButton>
);

const ToggleSwitch = () => (
  <div className="w-10 h-6 bg-green-500 rounded-full p-1 cursor-pointer">
    <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-4"></div>
  </div>
);
