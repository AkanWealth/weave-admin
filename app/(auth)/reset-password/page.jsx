"use client";
import React, { useState } from "react";
import PasswordField from "@/components/elements/PasswordField";
import Button from "@/components/elements/Button";
import { ToastContext, useMessageContext } from "@/contexts/toast";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";

function ResetPassword() {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const btnDisabled =
    newPassword == "" || confirmNewPassword == "" || isLoading;
  const { showMessage } = useMessageContext();
  const params = useSearchParams();
  const token = params.get("token");

  const resetPassword = async () => {
    setIsloading(true);
    try {
      const response = await api.post("/super-admin/reset-password", {
        token,
        newPassword,
      });
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      showMessage(error.message, "error");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex-col space-y-12">
      <h1 className="text-4xl font-rubikBold">Reset Password </h1>

      <div className="flex-column space-y-6">
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
