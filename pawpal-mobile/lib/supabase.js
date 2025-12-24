import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
let supabase = null;

try {
  const { createClient } = require("@supabase/supabase-js");

  if (!createClient) {
    throw new Error("createClient not found in @supabase/supabase-js");
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
} catch (error) {
  console.error("Failed to initialize Supabase:", error);
  console.error("Error details:", error.message);
}

export { supabase };
