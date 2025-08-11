"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { ToastContext, useMessageContext } from "@/contexts/toast";
import Nav from "@/components/setup/Nav";
import PasswordField from "@/components/elements/PasswordField";
import PasswordStrengthMeter from "@/components/elements/passwordStrenghtMeter";
import api, { clearAuthTokens } from "@/lib/api";

function PasswordSetup() {
  return (
    <ToastContext>
      <PasswordForm />
    </ToastContext>
  );
}

function PasswordForm() {
  const params = useSearchParams();
  const { showMessage } = useMessageContext();
  const [isLoading, setIsLoading] = useState(false);

  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [temporaryPasswordError, setTemporaryPasswordError] = useState("");
  const [newPassword, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  let [passwordStrong, setPasswordStrong] = useState(false);
  const btnDisabled =
    !passwordStrong || isLoading || newPassword !== confirmPassword;

  const email = params.get("email");
  const router = useRouter();

  const savePassword = async () => {
    try {
      if (!temporaryPassword) {
        return setTemporaryPasswordError("Temporary password is required");
      }
      if (newPassword.length < 8) {
        return setPasswordError("Password must be at least 8 characters");
      }
      if (newPassword !== confirmPassword) {
        return setconfirmPasswordError("Password does not match Confirm Password");
      }

      const resp = await api.post("/super-admin/password-setup", {
        email,
        temporaryPassword,
        newPassword,
      });

      console.log(resp);
      if (resp.status === 200) {
        showMessage(resp.data.message, " ", "success");
        clearAuthTokens();
        router.push(`/login`);
        return;
      }
      showMessage(resp.data.message,"", "error");
    } catch (err) {
      console.log(err);
      showMessage("Wrong Passord input", "","error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <Nav active="password" />
      <h1 className="font-rubikBold text-3xl mt-4"> Secure Your Account </h1>

      <div className="max-h-[60vh] overflow-y-auto hide-scrollbar">
        <div className="flex-column space-y-4 font-rubikMedium my-6">
          <PasswordField
            label={"Temporary Password"}
            placeholder={"Temporary Password"}
            value={temporaryPassword}
            setValue={setTemporaryPassword}
            error={temporaryPasswordError}
          />
          <PasswordField
            label={"Password"}
            placeholder={"Password"}
            value={newPassword}
            setValue={setPassword}
            error={passwordError}
          />
          <PasswordField
            label={"Confirm Password"}
            placeholder={"Confirm Password"}
            value={confirmPassword}
            setValue={setConfirmPassword}
            error={
              newPassword !== confirmPassword
                ? "Password does not match"
                : confirmPasswordError
            }
          />
        </div>
        <PasswordStrengthMeter
          password={newPassword}
          passwordStrong={passwordStrong}
          setPasswordStrong={setPasswordStrong}
        />
        <div>
          <button
            onClick={() => {
              setIsLoading(true);
              savePassword();
            }}
            className={`py-2 ${
              btnDisabled ? "bg-base-secondary" : "bg-weave-primary"
            } text-base-white w-full rounded-xl`}
            disabled={btnDisabled}
          >
            {isLoading ? "Saving..." : "Set Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordSetup;