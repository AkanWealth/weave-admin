"use client";
import React, { useState } from "react";
import TextField from "@/components/elements/TextField";
import PasswordField from "@/components/elements/PasswordField";
import Button from "@/components/elements/Button";
import Link from "next/link";
import api from "@/lib/api";
import { ToastContext, useMessageContext } from "@/contexts/toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Page() {
  return (
    <ToastContext>
      <Login />
    </ToastContext>
  );
}
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useMessageContext();
  const router = useRouter();

  const btnDisabled = email === "" || password === "" || isLoading;
  const login = async () => {
    setIsLoading(true);
    try {
      const resp = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(resp);

      if (resp.status === 200) {
        if (resp.data.user.role === null) {
          showMessage("Authorised personnels only", "error");
          return;
        }
        if (!resp.data.user.verified) {
          router.push(`/otp?email=${email}&usage=signup`);
          return;
        }

        localStorage.setItem("userinfo", JSON.stringify(resp.data.user));
        Cookies.set("session", resp.data.accessToken, {
          expires: 1 / 24,
        });

        if (
          resp.data.user.firstName === null &&
          resp.data.user.lastName === null
        ) {
          router.push("/setup/profile");
          return;
        }

        router.push("/dashboard");

        return;
      }

      showMessage("Error Logging in, check credentials and retry", "error");
    } catch (err) {
      showMessage("Error loggin in, check credentials and retry", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
    >
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
          onClick={() => login()}
        />
      </div>

      <Link href={"/forgot-password"} className="text-weave-primary">
        Forgot Password
      </Link>
    </form>
  );
}
