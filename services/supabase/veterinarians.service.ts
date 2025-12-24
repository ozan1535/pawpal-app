import { supabase } from "@/lib/supabase";

export const getVeterinarians = async (city: string) => {
  try {
    const { data, error } = await supabase
      .from("veterinarians")
      .select("*")
      .ilike("city", city);

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};
