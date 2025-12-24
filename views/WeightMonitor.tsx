import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  TrendingUp,
  Scale,
  Plus,
  X,
  Info,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Bot,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  CartesianGrid,
} from "recharts";
import { WEIGHT_DATA, CURRENT_PET } from "../constants";
import { AnimatedWrapper, InteractiveButton } from "../components/Motion";
import { getCurrentUser } from "@/services/supabase/user_details.service";
import { getPetsByOwnerId } from "@/services/supabase/pets.service";
import {
  addNewPetWeight,
  getWeightByPetId,
} from "@/services/supabase/pet_weights.service";
import { calculatePetAge, getUniquePetWeights, getUserPets } from "@/lib/utils";
import { usePet } from "@/contexts/PetContext";

interface WeightMonitorProps {
  onBack: () => void;
}

// Breed Standards Mock (Golden Retriever)
const IDEAL_MIN = 29;
const IDEAL_MAX = 34;

type HealthStatus = "healthy" | "warning" | "critical";

export const WeightMonitor: React.FC<WeightMonitorProps> = ({ onBack }) => {
  const [data, setData] = useState(WEIGHT_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [currentPet, setCurrentPet] = useState(null);
  const currentWeight = data[data.length - 1].weight;
  const prevWeight = data[data.length - 2]?.weight || currentWeight;
  const diff = (currentWeight - prevWeight).toFixed(1);
  const isGain = parseFloat(diff) >= 0;
  const { petId, petItem } = usePet();
  // --- Dynamic Status Logic ---
  const status: HealthStatus = useMemo(() => {
    if (currentWeight >= IDEAL_MIN && currentWeight <= IDEAL_MAX)
      return "healthy";
    if (currentWeight < IDEAL_MIN) return "warning"; // Underweight
    return "critical"; // Overweight
  }, [currentWeight]);

  const getPetWeights = async () => {
    // const user = await getCurrentUser();
    // const pets = await getPetsByOwnerId(user.id);

    const pets = await getUserPets();
    const petWeights = await getWeightByPetId(/* pets[0].id */ petId);
    setCurrentPet(/* pets[0] */ petItem);
    /* const map = new Map<string, (typeof petWeights)[0]>();

    petWeights.forEach((item) => {
      const date = new Date(item.created_at);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!map.has(monthKey)) {
        map.set(monthKey, item);
      }
    });

    const items = Array.from(map.values()); */
    const items = getUniquePetWeights(petWeights);
    //  const newDataPoint = { name: month, weight: weightVal };

    setData(
      items
        .map((item) => ({
          name: new Date(item.created_at)
            .toLocaleDateString("tr-TR", {
              month: "long",
            })
            .slice(0, 3),
          weight: item.weight,
        }))
        .reverse()
    );
  };

  useEffect(() => {
    getPetWeights();
  }, []);
  // --- Theme Config based on Status ---
  const theme = useMemo(() => {
    switch (status) {
      case "healthy":
        return {
          bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
          border: "border-emerald-200 dark:border-emerald-800",
          text: "text-emerald-800 dark:text-emerald-100",
          accent: "text-emerald-600 dark:text-emerald-400",
          button:
            "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300",
          stroke: "#10B981", // Emerald 500
          gradientId: "colorWeightEmerald",
          badge: "bg-white/60 text-emerald-800",
          label: "İdeal Kilo ✅",
          tip: `Harika gidiyor! ${currentPet?.name || "-"} ideal aralıkta.`,
        };
      case "warning":
        return {
          bg: "bg-amber-500/10 dark:bg-amber-500/20",
          border: "border-amber-200 dark:border-amber-800",
          text: "text-amber-800 dark:text-amber-100",
          accent: "text-amber-600 dark:text-amber-400",
          button:
            "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300",
          stroke: "#F59E0B", // Amber 500
          gradientId: "colorWeightAmber",
          badge: "bg-white/60 text-amber-800",
          label: "Düşük Kilo ⚠️",
          tip: "Besin değerini artırmak için mamayı gözden geçirelim.",
        };
      case "critical":
        return {
          bg: "bg-rose-500/10 dark:bg-rose-500/20",
          border: "border-rose-200 dark:border-rose-800",
          text: "text-rose-800 dark:text-rose-100",
          accent: "text-rose-600 dark:text-rose-400",
          button:
            "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/50 dark:text-rose-300",
          stroke: "#F43F5E", // Rose 500
          gradientId: "colorWeightRose",
          badge: "bg-white/60 text-rose-800",
          label: "Fazla Kilo 🚨",
          tip: "Egzersiz süresini günde 15 dk artırmayı deneyin.",
        };
    }
  }, [status, currentPet]);

  const handleLogWeight = async () => {
    if (!newWeight) return;
    const weightVal = parseFloat(newWeight);
    if (isNaN(weightVal)) return;

    // const user = await getCurrentUser();
    // const pets = await getPetsByOwnerId(user.id);
    const pets = await getUserPets();
    const addedWeight = await addNewPetWeight(
      /* pets[0].id */ petId,
      `${weightVal}`
    );
    getPetWeights();
    const today = new Date();
    const month = today.toLocaleString("tr-TR", { month: "short" });
    const newDataPoint = { name: month, weight: weightVal };
    // setData([...data, addedWeight]);
    setIsModalOpen(false);
    setNewWeight("");
  };

  // Slider Position Calculation (Clamp between 0 and 100%)
  // Range is roughly 25kg to 40kg for visualization
  const minVis = 25;
  const maxVis = 40;
  const sliderPos = Math.min(
    Math.max(((currentWeight - minVis) / (maxVis - minVis)) * 100, 0),
    100
  );
  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-black min-h-screen">
      {/* Header */}
      <div className="p-4 flex items-center justify-between sticky top-0 z-20 bg-stone-50/80 dark:bg-black/80 backdrop-blur-md">
        <InteractiveButton
          onClick={onBack}
          className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:bg-gray-50 transition-colors border border-gray-100 dark:border-gray-700"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </InteractiveButton>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">
          Kilo Takibi
        </h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto pb-24">
        {/* 1. THE MAIN HEALTH CARD (Dynamic Hero) */}
        <AnimatedWrapper
          className={`rounded-[2.5rem] p-6 border transition-colors duration-500 relative overflow-hidden ${theme.bg} ${theme.border}`}
        >
          {/* Abstract Glow Background */}
          <div
            className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${
              status === "healthy"
                ? "bg-emerald-400"
                : status === "warning"
                ? "bg-amber-400"
                : "bg-rose-400"
            }`}
          ></div>

          {/* Card Header: Info + Log Button */}
          <div className="flex justify-between items-start mb-6 relative z-10">
            {currentPet ? (
              <div className="flex items-center space-x-3">
                <img
                  src={currentPet.image || ""}
                  alt="Pet"
                  className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm object-cover"
                />
                <div>
                  <h2 className={`font-black text-lg ${theme.text}`}>
                    {currentPet.name}
                  </h2>
                  <p className={`text-xs font-bold opacity-70 ${theme.text}`}>
                    {currentPet.breed} • {/* {currentPet.birth} */}{" "}
                    {calculatePetAge(currentPet.birth)}
                  </p>
                </div>
              </div>
            ) : null}
            <InteractiveButton
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center space-x-1 px-4 py-2 rounded-full shadow-sm text-xs font-black transition-transform active:scale-95 ${theme.button}`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Kilo Gir</span>
            </InteractiveButton>
          </div>

          {/* Big Weight Display */}
          <div className="flex flex-col items-center justify-center mb-8 relative z-10">
            {currentWeight ? (
              <div className="flex items-baseline">
                <span
                  className={`text-6xl font-black tracking-tighter ${theme.text}`}
                >
                  {currentWeight}
                </span>
                <span
                  className={`text-xl font-bold ml-1 opacity-60 ${theme.text}`}
                >
                  kg
                </span>
              </div>
            ) : null}
            <div
              className={`mt-2 px-3 py-1 rounded-lg backdrop-blur-md font-bold text-xs flex items-center shadow-sm ${theme.badge}`}
            >
              {status === "healthy" && (
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              )}
              {status === "warning" && (
                <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
              )}
              {status === "critical" && (
                <Activity className="w-3.5 h-3.5 mr-1.5" />
              )}
              {theme.label}
            </div>
          </div>

          {/* Visual Range Slider */}
          <div className="relative z-10">
            {/* Labels */}
            <div
              className={`flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2 opacity-60 ${theme.text}`}
            >
              <span>Düşük</span>
              <span>
                İdeal ({IDEAL_MIN}-{IDEAL_MAX})
              </span>
              <span>Fazla</span>
            </div>

            {/* Track */}
            <div className="h-3 w-full bg-white/40 dark:bg-black/20 rounded-full overflow-hidden relative">
              {/* Gradient Zone Bar */}
              <div
                className="absolute inset-0 w-full h-full opacity-80"
                style={{
                  background:
                    "linear-gradient(90deg, #F59E0B 0%, #10B981 30%, #10B981 60%, #F43F5E 100%)",
                }}
              ></div>
            </div>

            {/* Thumb / Indicator */}
            <div
              className="absolute top-5 w-1 h-3 bg-gray-800 dark:bg-white rounded-full transition-all duration-700 ease-out z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div
                className={`absolute -top-1.5 -left-1.5 w-4 h-4 bg-white dark:bg-slate-800 border-2 rounded-full shadow-md transition-colors duration-500 ${
                  status === "healthy"
                    ? "border-emerald-500"
                    : status === "warning"
                    ? "border-amber-500"
                    : "border-rose-500"
                }`}
              ></div>
            </div>
          </div>
        </AnimatedWrapper>

        {/* 2. AI INSIGHT BUBBLE */}
        <AnimatedWrapper
          delay={100}
          className="flex items-start space-x-3 px-2"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border ${theme.bg} ${theme.border}`}
          >
            <Bot className={`w-5 h-5 ${theme.accent}`} />
          </div>
          <div className="relative bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-soft border border-gray-100 dark:border-gray-700 flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
              <span className="font-bold text-primary">PawPal AI:</span>{" "}
              {theme.tip}
            </p>
          </div>
        </AnimatedWrapper>

        {/* 3. HISTORY CHART (Subtle Data Viz) */}
        {data.length ? (
          <AnimatedWrapper
            delay={200}
            className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Son 6 Ay
              </h3>
              <div
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  isGain
                    ? "text-rose-500 bg-rose-50"
                    : "text-emerald-500 bg-emerald-50"
                }`}
              >
                {isGain ? "+" : ""}
                {diff}kg Değişim
              </div>
            </div>

            <div className="h-[200px] w-full -ml-4">
              <ResponsiveContainer width="110%" height="100%">
                <AreaChart data={data.slice(-6)}>
                  <defs>
                    <linearGradient
                      id={theme.gradientId}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={theme.stroke}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={theme.stroke}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 11, fontWeight: 600 }}
                    dy={10}
                    padding={{ left: 20, right: 20 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      padding: "8px 12px",
                    }}
                    cursor={{
                      stroke: theme.stroke,
                      strokeWidth: 2,
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    stroke={theme.stroke}
                    strokeWidth={4}
                    fillOpacity={1}
                    fill={`url(#${theme.gradientId})`}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AnimatedWrapper>
        ) : null}
      </div>

      {/* Input Modal (Existing Functionality, Cleaned UI) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xs rounded-[2rem] p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-extrabold text-center mb-6 dark:text-white">
              Bugünkü Kilo
            </h3>

            <div className="flex items-center justify-center mb-8">
              <input
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="0.0"
                className="text-center text-5xl font-black bg-transparent border-b-2 border-gray-200 dark:border-gray-700 w-32 focus:border-primary outline-none dark:text-white transition-colors p-2"
                autoFocus
              />
              <span className="text-xl font-bold text-gray-400 ml-2 mt-4">
                kg
              </span>
            </div>

            <InteractiveButton
              onClick={handleLogWeight}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95"
            >
              Kaydet
            </InteractiveButton>
          </div>
        </div>
      )}
    </div>
  );
};
