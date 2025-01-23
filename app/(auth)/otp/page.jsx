"use client";
import React, { useState } from "react";
import OtpVerification from "@/components/setup/otpEntry";
import { ToastContext } from "@/contexts/toast";

function Otp() {
  return (
    <ToastContext>
      <OtpVerification />
    </ToastContext>
  );
}

export default Otp;
