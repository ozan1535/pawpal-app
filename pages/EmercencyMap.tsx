import { EmergencyMap } from "@/views/EmergencyMap";
import React from "react";
import { useNavigate } from "react-router-dom";

function EmercencyMap() {
  const navigate = useNavigate();
  return <EmergencyMap onBack={() => navigate(-1)} />;
}

export default EmercencyMap;
