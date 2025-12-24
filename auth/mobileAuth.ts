import { supabase } from "@/lib/supabase";

export function initMobileAuth(changePet) {
  const accessToken = localStorage.getItem("supabase_access_token");
  const refreshToken = localStorage.getItem("supabase_refresh_token");
  const userRaw = localStorage.getItem("supabase_user");

  if (!accessToken || !userRaw) return false;

  const user = JSON.parse(userRaw);

  const storedUser = JSON.parse(userRaw);
  const currentUser = supabase.auth.getUser();

  if (currentUser && currentUser.id !== storedUser.id) {
    changePet(null);
  }

  supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
    user,
  });

  return true;
}
