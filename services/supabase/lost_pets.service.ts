import { supabase } from "@/lib/supabase";

export const addNewLostPet = async (
  userId: string,
  name: string,
  city: string,
  district: string,
  details: string,
  contact: string,
  image: string,
  reward: string,
  color
) => {
  try {
    const { data, error } = await supabase
      .from("lost_pets")
      .insert({
        user_id: userId,
        name,
        city,
        district,
        details,
        contact,
        image,
        reward,
        leash_color: color,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Hata:", err);
    return err;
  }
};

export const getLostPets = async (userCity) => {
  try {
    const { data, error } = await supabase
      .from("lost_pets")
      .select("*")
      .eq("city", userCity)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};
