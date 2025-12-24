import React, { createContext, useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import * as Linking from "expo-linking";
import { supabase } from "../lib/supabase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log("AuthProvider: Starting initialization");
    // console.log("Supabase client exists:", !!supabase);

    if (!supabase) {
      console.error("Supabase client is null!");
      setError("Authentication service not available");
      setLoading(false);
      return;
    }

    let subscription = null;
    let urlSubscription = null;

    const initAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          setError(error.message);
        } else {
          // console.log("Session retrieved:", !!session);
          setSession(session);
          setUser(session?.user ?? null);
        }

        const { data: authData } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            //    console.log("Auth state changed:", _event);
            setSession(session);
            setUser(session?.user ?? null);
            setError(null);

            if (session?.user) {
              createProfileIfNotExists(session.user);
            }
          }
        );

        subscription = authData.subscription;

        // Handle OAuth redirects
        urlSubscription = Linking.addEventListener("url", async ({ url }) => {
          //  console.log("URL event received:", url);

          // Extract the URL parameters
          if (url && url.includes("#")) {
            const params = new URLSearchParams(url.split("#")[1]);
            const access_token = params.get("access_token");
            const refresh_token = params.get("refresh_token");

            //  console.log("Access token found:", !!access_token);

            if (access_token && refresh_token) {
              // Set the session using the tokens from the URL
              const { data, error } = await supabase.auth.setSession({
                access_token,
                refresh_token,
              });

              if (error) {
                console.error("Error setting session:", error);
                Alert.alert("Error", "Failed to complete login");
              } else {
                //  console.log("Session set successfully");
              }
            }
          }
        });

        //   console.log("Auth listener set up successfully");
      } catch (error) {
        console.error("Auth initialization error:", error);
        setError(error.message);
        Alert.alert(
          "Error",
          "Failed to initialize authentication: " + error.message
        );
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      if (subscription) {
        // console.log("Cleaning up auth subscription");
        subscription.unsubscribe();
      }
      if (urlSubscription) {
        urlSubscription.remove();
      }
    };
  }, []);

  const createProfileIfNotExists = async (user) => {
    if (!user) return;

    try {
      // Check if profile already exists
      const { data: existingProfile, error: selectError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (selectError && selectError.code !== "PGRST116") {
        // PGRST116 = row not found
        console.error("Error checking profile:", selectError);
        return;
      }

      if (!existingProfile) {
        // Insert profile
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata.full_name || "",
            avatar_url: user.user_metadata.avatar_url || "",
          },
        ]);

        if (insertError) {
          console.error("Error creating profile:", insertError);
        } else {
          //   console.log("✅ Profile created for user:", user.email);
        }
      } else {
        //    console.log("Profile already exists for user:", user.email);
      }
    } catch (err) {
      console.error("Unexpected error creating profile:", err);
    }
  };

  const signInWithEmail = async (email, password) => {
    if (!supabase) throw new Error("Supabase not initialized");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signUpWithEmail = async (email, password) => {
    if (!supabase) throw new Error("Supabase not initialized");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signInWithGoogle = async () => {
    if (!supabase) throw new Error("Supabase not initialized");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "myapp://",
        skipBrowserRedirect: false,
      },
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    if (!supabase) throw new Error("Supabase not initialized");

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    session,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
