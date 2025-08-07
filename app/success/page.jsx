import React from "react";
import { Suspense } from "react";
import PaymentSuccess from "@/components/elements/SucessPage";



export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20 text-lg">Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}
