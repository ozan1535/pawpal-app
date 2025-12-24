import { supabase } from "@/lib/supabase";

export const addNewPetWeight = async (petId: string, weight: string) => {
  try {
    const { data, error } = await supabase
      .from("pet_weights")
      .insert({ pet_id: petId, weight })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Hata:", err);
    return err;
  }
};

export const getWeightByPetId = async (petId: string) => {
  try {
    const { data, error } = await supabase
      .from("pet_weights")
      .select("*")
      .eq("pet_id", petId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};
