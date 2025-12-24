import { supabase } from "@/lib/supabase";

export const addNewReminder = async (
  userId: string,
  type: string,
  note: string,
  date: string,
  time: string,
  remindWhen: string,
  repeat: string
) => {
  try {
    const { data, error } = await supabase
      .from("reminder")
      .insert({
        user_id: userId,
        type,
        note,
        date,
        time,
        remind_when: remindWhen,
        repeat,
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

export const getRemindersByUserId = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("reminder")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};
