import { Activity, GraduationCap, Home, User, Users } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  canShowBottomMenu = true,
}) => {
  const location = useLocation();

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth bg-background dark:bg-slate-900">
      {children}

      {canShowBottomMenu && (
        <div className="fixed bottom-6 inset-x-0 mx-auto w-[90%] max-w-[380px] z-40">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-2 border-gray-100 dark:border-slate-800 rounded-full shadow-soft p-2 flex justify-between items-center px-4 transition-colors duration-300">
            {/* <button
              //onClick={() => navigate("DASHBOARD")}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                currentView === "DASHBOARD"
                  ? "bg-primary text-white shadow-button transform -translate-y-2 border-b-4 border-orange-600"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <Home className="w-5 h-5" strokeWidth={3} />
            </button> */}

            <Link
              to="/" // Navigate to dashboard when clicked
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                location.pathname === "/"
                  ? "bg-primary text-white shadow-button transform -translate-y-2 border-b-4 border-orange-600"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <Home className="w-5 h-5" strokeWidth={3} />
            </Link>

            <Link
              to="/health"
              //onClick={() => navigate("HEALTH")}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 
              ${
                location.pathname === "/health"
                  ? "bg-secondary text-white shadow-button transform -translate-y-2 border-b-4 border-teal-600"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }
                `}
            >
              <Activity className="w-5 h-5" strokeWidth={3} />
            </Link>

            {/*  <button
              //   onClick={() => navigate("ACADEMY")}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                currentView === "ACADEMY"
                  ? "bg-pink-500 text-white shadow-button transform -translate-y-2 border-b-4 border-pink-700"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <GraduationCap className="w-5 h-5" strokeWidth={3} />
            </button> */}

            <Link
              to="/community"
              // onClick={() => navigate("COMMUNITY")}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                location.pathname === "/community"
                  ? "bg-yellow-400 text-white shadow-button transform -translate-y-2 border-b-4 border-yellow-600"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <Users className="w-5 h-5" strokeWidth={3} />
            </Link>

            <Link
              to="/profile"
              // onClick={() => navigate("PROFILE")}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                location.pathname === "/profile"
                  ? "bg-purple-500 text-white shadow-button transform -translate-y-2 border-b-4 border-purple-700"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <User className="w-5 h-5" strokeWidth={3} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
