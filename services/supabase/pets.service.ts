import { supabase } from "@/lib/supabase";

export const addNewPet = async (
  ownerId: string,
  name: string,
  breed: string,
  type: string,
  birth: string,
  gender: string,
  image = null
) => {
  try {
    const { data, error } = await supabase
      .from("pets")
      .insert({ owner_id: ownerId, name, breed, type, birth, gender, image })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Hata:", err);
    return err;
  }
};

export const getPetsByOwnerId = async (ownerId: string) => {
  try {
    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .eq("owner_id", ownerId);

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};
