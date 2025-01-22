"use client";
import React, { useState } from "react";
import OtpVerification from "@/components/setup/otpEntry";
import { ToastContext } from "@/contexts/toast";

function Otp() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const btnDisabled = email === "" || isLoading;

  const requestOtp = () => {
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToastContext>
      <OtpVerification />
    </ToastContext>
  );
}

export default Otp;
