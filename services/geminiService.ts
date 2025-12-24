import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.API_KEY || "",
    });
  }
  return aiClient;
};

const extractBase64 = (dataUrl: string) => dataUrl.split(",")[1];

export const generateVetResponse = async (
  userPrompt: string,
  imageBase64?: string | null
): Promise<string> => {
  try {
    const ai = getClient();

    const parts: any[] = [{ text: userPrompt }];

    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: extractBase64(imageBase64),
        },
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts,
        },
      ],
      config: {
        systemInstruction: `
Sen PawPal Bot'sun, arkadaş canlısı ve empatik bir yapay zeka veteriner asistanısın. Amacın evcil hayvan sahiplerine genel tavsiyeler, beslenme ipuçları ve davranış soruları hakkında yardımcı olmaktır.

KURALLAR:
- Eğer fotoğraf VARSA:
  • Fotoğrafı kullanıcı sorusuyla birlikte değerlendir
  • Gördüklerini net ama temkinli şekilde anlat
- Eğer fotoğraf YOKSA:
  • SADECE kullanıcının yazdığı mesaja göre cevap ver
  • Fotoğraf varmış gibi varsayım yapma

- Asla kesin teşhis koyma
- Olası acil durumlarda mutlaka:
  "Ben bir yapay zekayım, gerçek bir veteriner değilim. Lütfen bir veterinere başvurun."
- Cevaplar Türkçe, kısa ve mobil uyumlu olsun
- Samimi bir ton kullan ve gerektiğinde emoji ekle 🐾
        `,
      },
    });

    return (
      response.text ||
      "Bunu değerlendirirken zorlandım. Biraz daha detay verebilir misin? 🐶"
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Şu anda yardımcı olamıyorum, lütfen tekrar dene.";
  }
};
