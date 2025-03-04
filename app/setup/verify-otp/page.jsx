import React, { Suspense } from "react";

import Nav from "@/components/setup/Nav";
import OtpVerification from "@/components/setup/otpEntry";
import { ToastContext } from "@/contexts/toast";

function OtpEntry() {
  return (
    <ToastContext>
      <Suspense fallback={<div>Loading...</div>}>
        <Nav active="otp" />
        <OtpVerification />
      </Suspense>
    </ToastContext>
  );
}

export default OtpEntry;
