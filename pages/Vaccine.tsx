import { VaccineLog } from "@/views/VaccineLog";
import React from "react";
import { useNavigate } from "react-router-dom";

function Vaccine() {
  const navigate = useNavigate();

  return <VaccineLog onBack={() => navigate(-1)} />;
}

export default Vaccine;
