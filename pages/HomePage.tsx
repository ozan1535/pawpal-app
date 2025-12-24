// import { Dashboard } from "@/views/Dashboard";
// import React from "react";

// function HomePage() {
//   return <Dashboard />;
// }

// export default HomePage;

import { initMobileAuth } from "@/auth/mobileAuth";
import { supabase } from "@/lib/supabase";
import {
  getCurrentUser,
  isUserExist,
} from "@/services/supabase/user_details.service";
import { Dashboard } from "@/views/Dashboard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      const hasUser = await isUserExist(user);
      if (!hasUser) {
        navigate("/welcome");
      }
    };

    getUser();
  }, []);
  return <Dashboard />;
}

export default App;
