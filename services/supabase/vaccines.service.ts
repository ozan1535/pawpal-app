import { supabase } from "@/lib/supabase";

export const addNewVaccine = async (
  petId: string,
  vaccineName: string,
  doctorName: string,
  vaccineDate: string
) => {
  try {
    const { data, error } = await supabase
      .from("vaccines")
      .insert({
        pet_id: petId,
        vaccine_name: vaccineName,
        doctor_name: doctorName,
        vaccine_date: vaccineDate,
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

export const getVaccinesByPetId = async (petId: string) => {
  try {
    const { data, error } = await supabase
      .from("vaccines")
      .select("*")
      .eq("pet_id", petId)
      .order("vaccine_date", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteVaccineById = async (vaccineId: string) => {
  try {
    const { data, error } = await supabase
      .from("vaccines")
      .delete()
      .eq("id", vaccineId);
    if (error) throw error;
    return data;
  } catch (error) {
    return error;
  }
};
