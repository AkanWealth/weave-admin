"use client";
import React, { useState } from "react";
import TextField from "@/components/elements/TextField";
import Button from "@/components/elements/Button";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { ToastContext} from "@/contexts/toast";
import { useToastContext } from "@/contexts/toast";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useToastContext();
  const router = useRouter();

  const btnDisabled = email === "" || isLoading;

  const requestOtp = async () => {
    try {
      const response = await api.post("/auth/forgot-password", {
        email,
      });
      console.log(response.status);
      if (response.status === 200) {
        showMessage("Otp sent to email successfully", "","success");
        router.push(`/otp?email=${email}&usage=reset-password`);
      }
    } catch (error) {
      showMessage("Too many request", error.message,"error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" ">
      <h1 className="text- text-gray-800  font-rubikBold"> Forgot Password </h1>
      <h1 className="text-4xl text-gray-600 font-rubikRegular"> No worries </h1>
      <p className="text-md text-gray-500 my-4 mb-8">
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
