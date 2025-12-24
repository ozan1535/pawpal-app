import { SOSForm } from "@/views/SOSFlow";
import React from "react";
import { useNavigate } from "react-router-dom";

function LostForm() {
  const navigate = useNavigate();
  return <SOSForm onSubmit={() => null} onCancel={() => navigate(-1)} />;
}

export default LostForm;
