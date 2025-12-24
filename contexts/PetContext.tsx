import { getPetsByOwnerId } from "@/services/supabase/pets.service";
import { getCurrentUserDetail } from "@/services/supabase/user_details.service";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";

const PetContext = createContext<any>(null);

export const PetProvider = ({ children }: PropsWithChildren) => {
  const [petId, setPetId] = useState<string | null>(null);
  const [petItem, setPetItem] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const getCurrentUser = async () => {
    const user = await getCurrentUserDetail();
    const userPets = await getPetsByOwnerId(user.id);
    const storedPetId = localStorage.getItem("selected_pet_id");
    const hasCurrentUserPet = userPets.some((item) => item.id === storedPetId);
    if (
      hasCurrentUserPet &&
      storedPetId &&
      storedPetId !== "null" &&
      storedPetId !== "undefined"
    ) {
      setPetId(storedPetId);
    } else {
      setPetId(userPets[0].id);
    }
    setIsReady(true);
  };

  useEffect(() => {
    // const storedPetId = localStorage.getItem("selected_pet_id");

    // if (storedPetId && storedPetId !== "null" && storedPetId !== "undefined") {
    //   setPetId(storedPetId);
    // }
    // setIsReady(true);
    getCurrentUser();
  }, []);

  const changePet = async (id: string) => {
    if (!id || id === "null") return;
    setPetId(id);

    localStorage.setItem("selected_pet_id", id);
  };

  return (
    <PetContext.Provider
      value={{ petId, changePet, isReady, petItem, setPetItem }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => useContext(PetContext);
