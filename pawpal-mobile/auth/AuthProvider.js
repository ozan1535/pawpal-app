// import React, { createContext, useContext, useEffect, useState } from "react";
// import * as Linking from "expo-linking";
// import { supabase } from "../lib/supabase";

// const AuthContext = createContext({
//   session: null,
//   loading: true,
// });

// export function AuthProvider({ children }) {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Restore session on app start
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setSession(data.session);
//       setLoading(false);
//     });

//     const { data } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => {
//       data.subscription.unsubscribe();
//     };
//   }, []);

//   // Handle Google OAuth redirect
//   useEffect(() => {
//     const subscription = Linking.addEventListener("url", async ({ url }) => {
//       await supabase.auth.exchangeCodeForSession(url);
//     });

//     return () => subscription.remove();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ session, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
