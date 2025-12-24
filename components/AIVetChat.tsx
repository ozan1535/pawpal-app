import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  Stethoscope,
  Camera,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { generateVetResponse } from "../services/geminiService";
import { ChatMessage } from "../types";
import {
  addNewAiResponse,
  addNewAiResponseImage,
} from "@/services/supabase/ai_responses.service";

interface AIVetChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIVetChat: React.FC<AIVetChatProps> = ({
  isOpen,
  onClose,
  currentPet,
  user,
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      text: `Merhaba! Ben senin PawPal Yapay Zeka Veteriner Asistanınım. ${currentPet.name} bugün nasıl hissediyor? 🐾`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImageFile, setCurrentImageFile] = useState(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, selectedImage]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCurrentImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: input,
      image: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSelectedImage(null);
    setIsLoading(true);

    // Mock passing image to service
    const responseText = await generateVetResponse(input, selectedImage);

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: responseText,
      },
    ]);
    setIsLoading(false);
    if (currentImageFile) {
      if (currentImageFile.size > 5 * 1024 * 1024) {
        await addNewAiResponse(user.id, input, responseText, null);
        return;
      }
      const fileExt = currentImageFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const imageUrl = await addNewAiResponseImage(fileName, currentImageFile);
      await addNewAiResponse(user.id, input, responseText, imageUrl);
      return;
    }
    await addNewAiResponse(user.id, input, responseText, null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-900 sm:max-w-md sm:right-0 sm:left-auto sm:border-l sm:border-gray-200 dark:sm:border-gray-800 shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-primary text-white">
        <div className="flex items-center">
          <div className="p-2 bg-white/20 rounded-full mr-3">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">AI Vet Asistanı</h2>
            <p className="text-xs text-white/80">
              Her zaman aktif • Gemini Destekli
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "model" && (
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <Bot className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm flex flex-col
                ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700"
                }`}
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2 mt-1">
              <Bot className="w-5 h-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-gray-100 dark:border-gray-700 flex items-center space-x-2">
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-2 relative inline-block">
            <img
              src={selectedImage}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-full px-4 py-2 border border-transparent focus-within:border-primary transition-colors">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 -ml-2 text-gray-400 hover:text-primary transition-colors"
          >
            <Camera className="w-5 h-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageSelect}
            disabled={messages.length === 3}
          />

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Semptomlar, diyet vb. hakkında sor..."
            className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 ml-2"
            disabled={messages.length === 3}
          />
          <button
            onClick={handleSend}
            disabled={(!input.trim() && !selectedImage) || isLoading}
            className={`p-2 rounded-full ml-2 transition-all ${
              input.trim() || selectedImage
                ? "bg-primary text-white shadow-md transform scale-100"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 scale-90"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          AI tarafından oluşturulmuştur. Tıbbi tavsiye değildir. Acil durumlar
          için bir veterinere başvurun.
        </p>
      </div>
    </div>
  );
};
