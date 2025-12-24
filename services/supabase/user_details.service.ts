import { supabase } from "@/lib/supabase";

export const isUserExist = async (user: Record<string, string>) => {
  const { data, error } = await supabase
    .from("user_detail")
    .select("id")
    .eq("id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }
  return !!data;
};

export const getCurrentUser = async () => {
  const user = (await supabase.auth.getUser()).data.user;

  return user;
};

export const getCurrentUserDetail = async () => {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from("user_detail")
    .select("*")
    .eq("id", user.id)
    .single();
  return data;
};

export const addNewUserDetail = async (
  id: string,
  name: string,
  relation_type: string,
  city,
  district,
  image = null
) => {
  try {
    const { data, error } = await supabase
      .from("user_detail")
      .insert({ id, name, relation_type, image, city, district })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Hata:", err);
    return err;
  }
};

export const updateUserImage = async (image: string, userId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_detail")
      .update({ image })
      .eq("id", userId);
    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Hata:", err);
    return err;
  }
};

export const getAllUsersByCityExceptCurrentUser = async (
  city: string,
  userId: string
) => {
  const { data, error } = await supabase
    .from("user_detail")
    .select(
      `
      id,
      city,
      profiles (
        push_token
      )
    `
    )
    .eq("city", city)
    .neq("id", userId);
  console.log(city, data);
  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
