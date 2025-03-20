"use client";
import React, { useState } from "react";
import PasswordField from "@/components/elements/PasswordField";
import Button from "@/components/elements/Button";
import { ToastContext, useMessageContext } from "@/contexts/toast";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import PasswordStrengthMeter from "@/components/elements/passwordStrenghtMeter";

function ResetPassword() {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState(""); 
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordStrong, setPasswordStrong] = useState(false);
  const btnDisabled =
    email == "" || 
    newPassword == "" ||
    confirmNewPassword == "" ||
    isLoading ||
    !passwordStrong ||
    newPassword !== confirmNewPassword;

  const { showMessage } = useMessageContext();
  const params = useSearchParams();
  const token = params.get("token");

  const resetPassword = async () => {
    setIsloading(true);
    try {
      const response = await api.post("/auth/reset-password", {
        email, 
        newPassword,
        
      });
      if (response.status === 200) {
        showMessage("Password reset successfully", "","success");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      showMessage(
        error.response?.data?.message || "Error resetting password","",
        "error"
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex-col space-y-12">
      <h1 className="text-4xl font-rubikBold">Reset Password</h1>

      <div className="flex-column space-y-6">
        {/* Added email input field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-base-black  focus:outline-none rounded-md font-rubikRegular"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <PasswordField
          label={"password"}
          placeholder="Password"
          value={newPassword}
          setValue={setNewPassword}
        />
        <PasswordField
          label={"confirm password"}
          placeholder="Confirm Password"
          value={confirmNewPassword}
          setValue={setConfirmNewPassword}
        />
        <PasswordStrengthMeter
          password={newPassword}
          passwordStrong={passwordStrong}
          setPasswordStrong={setPasswordStrong}
        />
      </div>
      <div>
        <Button
          title={isLoading ? "Changing Password..." : "Submit"}
          disabled={btnDisabled}
          onClick={() => resetPassword()}
        />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ToastContext>
      <ResetPassword />
    </ToastContext>
  );
}