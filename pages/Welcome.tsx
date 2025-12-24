import {
  getCurrentUser,
  getCurrentUserDetail,
} from "@/services/supabase/user_details.service";
import { ViewState } from "@/types";
import { PetWizard } from "@/views/Onboarding/PetWizard";
import { SuccessScreen } from "@/views/Onboarding/SuccessScreen";
import { WelcomeScreen } from "@/views/Onboarding/WelcomeScreen";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [currentView, setCurrentView] = useState<ViewState>("WELCOME");
  const [viewParams, setViewParams] = useState<any>({});
  const [currentUser, setCurrentUser] = useState(null);

  const handleFetchCurrentUser = async () => {
    const user = await getCurrentUserDetail();
    setCurrentUser(user);
  };

  useEffect(() => {
    handleFetchCurrentUser();
  }, []);

  useEffect(() => {
    // if (currentUser) {
    //   navigateTo("PET_WIZARD");
    // }

    if (currentUser?.id) {
      navigateTo("PET_WIZARD");
    }
  }, [currentUser]);

  const navigateTo = (screen: ViewState, params?: any) => {
    if (params) setViewParams(params);
    setCurrentView(screen);
  };
  const navigate = useNavigate();
  const renderContent = () => {
    switch (currentView) {
      case "WELCOME":
        return <WelcomeScreen onNavigate={navigateTo} />;
      case "PET_WIZARD":
        return (
          <PetWizard
            onComplete={() => navigateTo("ONBOARDING_SUCCESS")}
            hasUser={currentUser?.id ? true : false}
          />
        );
      case "ONBOARDING_SUCCESS":
        return <SuccessScreen onComplete={() => navigate("/")} />;

      default:
        return <WelcomeScreen onNavigate={navigateTo} />;
    }
  };

  return renderContent();
}

export default Welcome;
