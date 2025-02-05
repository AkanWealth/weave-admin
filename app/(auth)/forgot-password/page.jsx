"use client";
import React, { useState } from "react";
import TextField from "@/components/elements/TextField";
import Button from "@/components/elements/Button";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { ToastContext, useMessageContext } from "@/contexts/toast";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useMessageContext();
  const router = useRouter();

  const btnDisabled = email === "" || isLoading;

  const requestOtp = async () => {
    try {
      const response = await api.post("/super-admin/forgot-password", {
        email,
      });
      console.log(response.status);
      if (response.status === 201) {
        showMessage("Otp sent to email successfully", "success");
        router.push(`/otp?email=${email}&usage=reset-password`);
      }
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-rubikBold"> Forgot Password </h1>
      <h1 className="text-4xl font-rubikRegular"> No worries </h1>
      <p className="text-md my-4 mb-8">
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password.
      </p>
      <div className="my-12">
        <TextField
          label={"Email Address"}
          placeholder={"admin@gmail.com"}
          value={email}
          setValue={setEmail}
        />
      </div>
      <div className="my-8">
        <Button
          title={isLoading ? "Requesting Otp..." : "Continue"}
          disabled={btnDisabled}
          onClick={() => {
            setIsLoading(true);
            requestOtp();
          }}
        />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ToastContext>
      <PasswordReset />
    </ToastContext>
  );
}
