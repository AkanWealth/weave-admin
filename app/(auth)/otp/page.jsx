"use client";
import React, { Suspense, useState } from "react";
import OtpVerification from "@/components/setup/otpEntry";
import { ToastContext } from "@/contexts/toast";

function Otp() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <ToastContext>
        <OtpVerification />
      </ToastContext>
    </Suspense>
  );
}

export default Otp;
