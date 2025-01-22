"use client";
import React, { useState } from "react";
import TextField from "@/components/elements/TextField";
import PasswordField from "@/components/elements/PasswordField";
import Button from "@/components/elements/Button";
import Link from "next/link";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const btnDisabled = email === "" || password === "" || isLoading;

  return (
    <div>
      <h1 className="text-4xl font-rubikBold"> Login as the Weave Admin </h1>
      <p className="text-md my-4 mb-8">
        Enter your account correct login below
      </p>
      <div className="my-6 flex-col space-y-4">
        <TextField
          label={"Email Address"}
          placeholder={"admin@gmail.com"}
          value={email}
          setValue={setEmail}
        />
        <PasswordField
          label={"Password"}
          placeholder="••••••••••••"
          value={password}
          setValue={setPassword}
        />
      </div>
      <div className="my-8">
        <Button
          title={isLoading ? "Logging in..." : "Login"}
          disabled={btnDisabled}
          onClick={() => {}}
        />
      </div>

      <Link href={"/forgot-password"} className="text-weave-primary">
        Forgot Password
      </Link>
    </div>
  );
}

export default Login;
