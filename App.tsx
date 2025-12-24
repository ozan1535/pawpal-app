import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Activity, GraduationCap, Users, User } from "lucide-react";
import { Dashboard } from "./views/Dashboard";
import { HealthPassport } from "./views/HealthPassport";
import { Academy } from "./views/Academy";
import { CommunitySOS } from "./views/CommunitySOS";
import { VaccineLog } from "./views/VaccineLog";
import { WeightMonitor } from "./views/WeightMonitor";
import { Booking } from "./views/Booking";
import { LessonDetailScreen } from "./views/LessonDetail";
import { SOSForm, SOSBroadcast } from "./views/SOSFlow";
import { EventDetail, CreateEvent } from "./views/EventFlow";
import { AIVetChat } from "./components/AIVetChat";
import { EmergencyMap } from "./views/EmergencyMap";
import { LostPetsFeed } from "./views/LostPetsFeed";
import { WelcomeScreen } from "./views/Onboarding/WelcomeScreen";
import { PetWizard } from "./views/Onboarding/PetWizard";
import { SuccessScreen } from "./views/Onboarding/SuccessScreen";
import { ProfileScreen } from "./views/ProfileScreen";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Welcome from "./pages/Welcome";
import HomePage from "./pages/HomePage";
import BookingScreen from "./pages/BookingScreen";
import Community from "./pages/Community";
import EmercencyMap from "./pages/EmercencyMap";
import Health from "./pages/Health";
import LostCommunity from "./pages/LostCommunity";
import LostForm from "./pages/LostForm";
import LostPetsFeedPage from "./pages/LostPetsFeedPage";
import MonitorWeight from "./pages/MonitorWeight";
import Profile from "./pages/Profile";
import Vaccine from "./pages/Vaccine";
import { initMobileAuth } from "./auth/mobileAuth";
import {
  getCurrentUser,
  isUserExist,
} from "./services/supabase/user_details.service";
import { usePet } from "./contexts/PetContext";
import LoadingScreen from "./components/LoadingScreen";

type ViewState =
  | "WELCOME"
  | "PET_WIZARD"
  | "ONBOARDING_SUCCESS"
  | "DASHBOARD"
  | "HEALTH"
  | "ACADEMY"
  | "COMMUNITY"
  | "PROFILE"
  | "SCREEN_VACCINE"
  | "SCREEN_WEIGHT"
  | "SCREEN_BOOKING"
  | "LESSON_DETAIL"
  | "SOS_FORM"
  | "SOS_BROADCAST"
  | "EVENT_DETAIL"
  | "CREATE_EVENT"
  | "EMERGENCY_MAP"
  | "LOST_PETS_FEED";

const AppContent: React.FC = () => {
  // STARTING POINT: 'WELCOME' to trigger onboarding
  const [currentView, setCurrentView] = useState<ViewState>("WELCOME");
  const [viewParams, setViewParams] = useState<any>({});
  /*   const [isVetChatOpen, setVetChatOpen] = useState(false);
   */
  const { changePet } = usePet();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Try immediately
    if (initMobileAuth(changePet)) setReady(true);

    // Listen for injection from mobile
    function onMobileAuth(event) {
      initMobileAuth(changePet);
      setReady(true);
    }

    window.addEventListener("mobile-auth-ready", onMobileAuth);

    return () => {
      window.removeEventListener("mobile-auth-ready", onMobileAuth);
    };
  }, []);

  if (!ready) return <LoadingScreen />;

  const navigate = (screen: ViewState, params?: any) => {
    if (params) setViewParams(params);
    setCurrentView(screen);
  };

  const isTabBarVisible = [
    "DASHBOARD",
    "HEALTH",
    "ACADEMY",
    "COMMUNITY",
    "PROFILE",
  ].includes(currentView);

  const renderContent = () => {
    switch (currentView) {
      // --- ONBOARDING STACK ---
      case "WELCOME":
        return <WelcomeScreen onNavigate={navigate} />;
      case "PET_WIZARD":
        return <PetWizard onComplete={() => navigate("ONBOARDING_SUCCESS")} />;
      case "ONBOARDING_SUCCESS":
        return <SuccessScreen onComplete={() => navigate("DASHBOARD")} />;

      // --- MAIN APP STACK ---
      case "DASHBOARD":
        return (
          <Dashboard
            onOpenAiVet={() => setVetChatOpen(true)}
            onNavigate={navigate}
          />
        );
      case "HEALTH":
        return <HealthPassport />;
      case "ACADEMY":
        return <Academy onNavigate={navigate} />;
      case "COMMUNITY":
        return <CommunitySOS onNavigate={navigate} />;
      case "PROFILE":
        return <ProfileScreen />;
      case "SCREEN_VACCINE":
        return <VaccineLog onBack={() => navigate("DASHBOARD")} />;
      case "SCREEN_WEIGHT":
        return <WeightMonitor onBack={() => navigate("DASHBOARD")} />;
      case "SCREEN_BOOKING":
        return <Booking onBack={() => navigate("DASHBOARD")} />;
      case "LESSON_DETAIL":
        return (
          <LessonDetailScreen
            lessonId={viewParams.id}
            onBack={() => navigate("ACADEMY")}
          />
        );
      case "SOS_FORM":
        return (
          <SOSForm
            onSubmit={() => navigate("SOS_BROADCAST")}
            onCancel={() => navigate("COMMUNITY")}
          />
        );
      case "SOS_BROADCAST":
        return <SOSBroadcast onComplete={() => navigate("COMMUNITY")} />;
      case "EVENT_DETAIL":
        return (
          <EventDetail
            eventId={viewParams.id}
            onBack={() => navigate("COMMUNITY")}
          />
        );
      case "CREATE_EVENT":
        return <CreateEvent onBack={() => navigate("COMMUNITY")} />;
      case "EMERGENCY_MAP":
        return <EmergencyMap onBack={() => navigate("DASHBOARD")} />;
      case "LOST_PETS_FEED":
        return <LostPetsFeed onBack={() => navigate("DASHBOARD")} />;
      default:
        return (
          <Dashboard
            onOpenAiVet={() => setVetChatOpen(true)}
            onNavigate={navigate}
          />
        );
    }
  };

  return (
    <div className="bg-background min-h-screen font-sans text-gray-900 overflow-hidden selection:bg-primary selection:text-white">
      {/* Main Content Area - Mobile Container */}
      <div className="w-full max-w-md mx-auto h-screen relative bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col border-x-4 border-gray-100 dark:border-slate-800 transition-colors duration-300">
        {/*  <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth bg-background dark:bg-slate-900">
          {renderContent()}
        </div> */}
        <Routes>
          <Route
            path="/welcome"
            element={
              <MainLayout canShowBottomMenu={false}>
                <Welcome />
              </MainLayout>
            }
          />
          <Route
            path="/"
            element={
              <MainLayout canShowBottomMenu={true}>
                <HomePage />
              </MainLayout>
            }
          />
          {/* <Route
            path="/"
            element={
              <MainLayout canShowBottomMenu={hasUserDetail ? true : false}>
                {hasUserDetail ? <HomePage /> : <Welcome />}
              </MainLayout>
            }
          /> */}
          <Route
            path="/booking"
            element={
              <MainLayout canShowBottomMenu={false}>
                <BookingScreen />
              </MainLayout>
            }
          />
          <Route
            path="/community"
            element={
              <MainLayout>
                <Community />
              </MainLayout>
            }
          />
          <Route
            path="/veterinarians"
            element={
              <MainLayout canShowBottomMenu={false}>
                <EmercencyMap />
              </MainLayout>
            }
          />
          <Route
            path="/health"
            element={
              <MainLayout>
                <Health />
              </MainLayout>
            }
          />
          <Route
            path="/lost-community"
            element={
              <MainLayout canShowBottomMenu={false}>
                <LostCommunity />
              </MainLayout>
            }
          />
          <Route
            path="/lost-form"
            element={
              <MainLayout canShowBottomMenu={false}>
                <LostForm />
              </MainLayout>
            }
          />
          <Route
            path="/lost-pets/"
            element={
              <MainLayout canShowBottomMenu={false}>
                <LostPetsFeedPage />
              </MainLayout>
            }
          />
          <Route
            path="/monitor-weight"
            element={
              <MainLayout canShowBottomMenu={false}>
                <MonitorWeight />
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          />
          <Route
            path="/vaccine"
            element={
              <MainLayout canShowBottomMenu={false}>
                <Vaccine />
              </MainLayout>
            }
          />
        </Routes>

        {/* Floating Bottom Nav */}
        {isTabBarVisible && (
          <div className="fixed bottom-6 inset-x-0 mx-auto w-[90%] max-w-[380px] z-40">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-2 border-gray-100 dark:border-slate-800 rounded-full shadow-soft p-2 flex justify-between items-center px-4 transition-colors duration-300">
              <button
                onClick={() => navigate("DASHBOARD")}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  currentView === "DASHBOARD"
                    ? "bg-primary text-white shadow-button transform -translate-y-2 border-b-4 border-orange-600"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <Home className="w-5 h-5" strokeWidth={3} />
              </button>

              <button
                onClick={() => navigate("HEALTH")}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  currentView === "HEALTH"
                    ? "bg-secondary text-white shadow-button transform -translate-y-2 border-b-4 border-teal-600"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <Activity className="w-5 h-5" strokeWidth={3} />
              </button>

              <button
                onClick={() => navigate("ACADEMY")}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  currentView === "ACADEMY"
                    ? "bg-pink-500 text-white shadow-button transform -translate-y-2 border-b-4 border-pink-700"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <GraduationCap className="w-5 h-5" strokeWidth={3} />
              </button>

              <button
                onClick={() => navigate("COMMUNITY")}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  currentView === "COMMUNITY"
                    ? "bg-yellow-400 text-white shadow-button transform -translate-y-2 border-b-4 border-yellow-600"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <Users className="w-5 h-5" strokeWidth={3} />
              </button>

              <button
                onClick={() => navigate("PROFILE")}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  currentView === "PROFILE"
                    ? "bg-purple-500 text-white shadow-button transform -translate-y-2 border-b-4 border-purple-700"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <User className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* <AIVetChat isOpen={isVetChatOpen} onClose={() => setVetChatOpen(false)} /> */}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
