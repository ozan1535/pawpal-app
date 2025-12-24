import { Booking } from "@/views/Booking";
import React from "react";
import { useNavigate } from "react-router-dom";

function BookingScreen() {
  const navigate = useNavigate();
  return <Booking onBack={() => navigate(-1)} />;
}

export default BookingScreen;
