"use client";
import React, { useState } from "react";
import TextField from "@/components/elements/TextField";
import Button from "@/components/elements/Button";
import OtpEntry, { OtpVerification } from "@/app/setup/verify-otp/page";
import { useRouter } from "next/router";
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
