import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getPetsByOwnerId } from "@/services/supabase/pets.service";
import { getCurrentUser } from "@/services/supabase/user_details.service";
import { format, formatDistanceToNow, isToday, isTomorrow } from "date-fns";
import { tr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserPets = async () => {
  const user = await getCurrentUser();
  const pets = await getPetsByOwnerId(user.id);

  return pets;
};

export const sortDateTodayClosest = (data, item: string) => {
  return data?.slice().sort((a, b) => {
    const today = new Date().setHours(0, 0, 0, 0);

    const dateA = new Date(a[item]).setHours(0, 0, 0, 0);
    const dateB = new Date(b[item]).setHours(0, 0, 0, 0);

    const isAFuture = dateA >= today;
    const isBFuture = dateB >= today;

    if (isAFuture && !isBFuture) return -1;
    if (!isAFuture && isBFuture) return 1;

    return Math.abs(dateA - today) - Math.abs(dateB - today);
  });
};

export const getUniquePetWeights = (petWeights) => {
  const map = new Map<string, (typeof petWeights)[0]>();

  petWeights.forEach((item) => {
    const date = new Date(item.created_at);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!map.has(monthKey)) {
      map.set(monthKey, item);
    }
  });

  const items = Array.from(map.values());

  return items;
};

export function calculatePetAge(birthDateStr: string | null): string {
  if (!birthDateStr) return "";

  const birthDate = new Date(birthDateStr);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - birthDate.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} haftalık`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} aylık`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} yaşında`;
  }
}

export async function sendPushNotification(
  expoPushToken: string,
  title: string,
  text: string,
  url: string
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: text,
    data: { screen: "WebView", url },
  };
  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error, "error");
  }
}

export function formatAppointmentDate(dateStr: string) {
  const date = new Date(dateStr);

  if (isToday(date)) return "bugün";
  if (isTomorrow(date)) return "yarın";

  const diff = formatDistanceToNow(date, { locale: tr, addSuffix: true });

  const dayName = format(date, "EEEE", { locale: tr });

  return `${dayName} (${diff})`;
}
