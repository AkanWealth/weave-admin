"use client";
import React, { useState } from "react";
import OtpVerification from "@/components/setup/otpEntry";
import { ToastContext } from "@/contexts/toast";
import SuspendAdmin from "@/ModalPages/Admin/Suspend";

function Otp() {
  return (
    <SuspendAdmin>
      <ToastContext>
        <OtpVerification />
      </ToastContext>
    </SuspendAdmin>
  );
}

export default Otp;
