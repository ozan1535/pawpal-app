import { LostPetsFeed } from "@/views/LostPetsFeed";
import React from "react";
import { useNavigate } from "react-router-dom";

function LostPetsFeedPage() {
  const navigate = useNavigate();
  return <LostPetsFeed onBack={() => navigate("/")} />;
}

export default LostPetsFeedPage;
