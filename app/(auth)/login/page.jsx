"use client";
import React, { useState, useEffect } from "react";
import TextField from "@/components/elements/TextField";
import PasswordField from "@/components/elements/PasswordField";
import Button from "@/components/elements/Button";
import Link from "next/link";
import api, { setAuthTokens } from "@/lib/api";
import { ToastContext, useToastContext } from "@/contexts/toast";
import { useRouter } from "next/navigation";

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
  const { showMessage } = useToastContext();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const btnDisabled = !isClient || email === "" || password === "" || isLoading;

  const login = async () => {
    setIsLoading(true);
    try {
      const resp = await api.post("/auth/login", {
        email,
        password,
      });

      if (resp.status === 200) {
        if (resp.data.user.role === null) {
          showMessage("Authorised personnels only", "error");
          return;
        }

        if (!resp.data.user.verified) {
          router.push(`/otp?email=${email}&usage=signup`);
          return;
        }

        // Store user info
        if (typeof window !== "undefined") {
          localStorage.setItem("userinfo", JSON.stringify(resp.data.user));
          
          // Set both access token and refresh token using the helper function
          setAuthTokens(resp.data.accessToken, resp.data.refreshToken);
        }

        // Show success toast message
        showMessage("Login Successful", "Welcome back!", "success");

        // Add a small delay to ensure the toast is visible
        setTimeout(() => {
          if (
            resp.data.user.firstName == null ||
            resp.data.user.lastName == null
          ) {
            router.push("/setup/profile");
            return;
          }

          router.push("/dashboard");
        }, 500);

        return;
      }

      showMessage(
        "Login Failed",
        resp.data.message || "Incorrect email or password. Please try again.",
        "error"
      );
    } catch (err) {
      console.log(err);
      showMessage(
        "Login Failed",
        "Incorrect email or password. Please try again.",
        "error"
      );
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
      <h1 className="text-3xl font-rubikBold text-gray-900">
        Login as the FounderThrive Admin
      </h1>
      <p className="text-md my-4 mb-8">
        Enter your account correct login details below
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