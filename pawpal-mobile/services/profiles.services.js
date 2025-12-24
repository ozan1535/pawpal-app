import { supabase } from "../lib/supabase";

export const updateProfileToAddPushToken = async (userId, pushToken) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ push_token: pushToken })
      .eq("id", userId);
    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Hata:", err);
    return err;
  }
};
