
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const generateVetResponse = async (userPrompt: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `Sen PawPal Bot'sun, arkadaş canlısı, empatik ve bilgili bir yapay zeka veteriner asistanısın. 
        Amacın evcil hayvan sahiplerine genel tavsiyeler, beslenme ipuçları ve davranış soruları hakkında yardımcı olmaktır.
        
        KRİTİK KURALLAR:
        1. Her zaman sıcakkanlı ve güven verici ol.
        2. Cevaplarını kısa tut (150 kelimenin altında) ve mobil ekranda okunması kolay olsun.
        3. Herhangi bir potansiyel tıbbi acil durum (kusma, kanama, uyuşukluk vb.) için ŞUNU MUTLAKA BELİRT: "Ben bir yapay zekayım, gerçek bir doktor değilim. Lütfen hemen bir veterinere başvurun."
        4. Tonunu samimi tutmak için arada sırada emojiler kullan 🐶.
        5. Her zaman TÜRKÇE cevap ver.
        `,
      }
    });
    
    return response.text || "Şu anda PawPal ağına bağlanmakta sorun yaşıyorum. Lütfen daha sonra tekrar deneyin.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Üzgünüm, bir bağlantı hatasıyla karşılaştım. Lütfen tekrar deneyin.";
  }
};