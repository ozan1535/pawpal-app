import { CommunitySOS } from "@/views/CommunitySOS";
import { SOSBroadcast } from "@/views/SOSFlow";
import React from "react";
import { useNavigate } from "react-router-dom";

function LostCommunity() {
  const navigate = useNavigate();
  return <SOSBroadcast onComplete={() => navigate("/lost-pets")} />;
}

export default LostCommunity;
