import React from "react";
import { Suspense } from "react";
import PaymentCancel from "@/components/elements/CancelPage";



export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20 text-lg">Loading...</div>}>
      <PaymentCancel />
    </Suspense>
  );
}
