"use client";
import React, { useState } from "react";
import TextField from "@/components/elements/TextField";
import Button from "@/components/elements/Button";
// import { useRouter } from "next/router";
import { redirect } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  const btnDisabled = email === "" || isLoading;

  const requestOtp = () => {
    try {
      // router.push({
      //   pathname: "/otp",
      //   param: {
      //     email,
      //   },
      // });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
    redirect(`/otp/${email}`);
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

export default Login;
