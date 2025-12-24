import { supabase } from "@/lib/supabase";

export const addNewAiResponse = async (
  userId: string,
  userMessage: string,
  aiResponse: string,
  image: string
) => {
  try {
    const { data, error } = await supabase
      .from("ai_responses")
      .insert({
        user_id: userId,
        user_message: userMessage,
        ai_response: aiResponse,
        image,
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

export const addNewAiResponseImage = async (fileName, file) => {
  const { data, error } = await supabase.storage
    .from("ai_questions")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("ai_questions").getPublicUrl(data.path);

  return publicUrl;
};

export const getAiResponsesByUserId = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("ai_responses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};
