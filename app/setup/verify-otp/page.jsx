"use client";
import { ToastContext, useMessageContext } from "@/contexts/toast";
import Nav from "@/components/setup/Nav";
import OtpVerification from "@/components/setup/otpEntry";

function OtpEntry() {
  return (
    <ToastContext>
      <Nav active="otp" />
      <OtpVerification />
    </ToastContext>
  );
}

export default OtpEntry;
