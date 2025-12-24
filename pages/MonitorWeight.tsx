import { WeightMonitor } from "@/views/WeightMonitor";
import React from "react";
import { useNavigate } from "react-router-dom";

function MonitorWeight() {
  const navigate = useNavigate();
  return <WeightMonitor onBack={() => navigate(-1)} />;
}

export default MonitorWeight;
