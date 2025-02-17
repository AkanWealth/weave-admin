"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import { ToastContext, useMessageContext } from "@/contexts/toast";
import Nav from "@/components/setup/Nav";
import PasswordField from "@/components/elements/PasswordField";
import PasswordStrengthMeter from "@/components/elements/passwordStrenghtMeter";
import api from "@/lib/api";

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

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  let [passwordStrong, setPasswordStrong] = useState(false);
  const btnDisabled =
    !passwordStrong || isLoading || password !== confirmPassword;

  const token = params.get("token");
  const router = useRouter();

  const savePassword = async () => {
    try {
      if (password.length < 8)
        return setPasswordError("Password must be up to 8 character");
      if (password !== confirmPassword)
        return setconfirmPasswordError(
          "Password does not match Confirm Password"
        );

      const resp = await api.post("/super-admin/password-setup", {
        token,
        password,
      });

      if (resp.status === 201) {
        showMessage(
          "User setup successful, please login to complete profile",
          "success"
        );
        router.push("/login");
        // redirect("/setup/profile");
      }
      showMessage(resp.data.message, "error");
    } catch (err) {
      console.log(err);
      showMessage("Error setting up password, please retry", "error");
    } finally {
      setIsLoading(false);
      // setIsError(false)
    }

    // redirect("/setup/profile");
  };

  return (
    <div>
      <Nav active="password" />
      <h1 className="font-rubikBold text-3xl mt-4"> Secure Your Account </h1>

      <div className="flex-column space-y-4 font-rubikMedium my-6">
        <PasswordField
          label={"Password"}
          placeholder={"Password"}
          value={password}
          setValue={setPassword}
          error={passwordError}
        />
        <PasswordField
          label={"Confirm Password"}
          placeholder={"Confirm Password"}
          value={confirmPassword}
          setValue={setConfirmPassword}
          error={
            password !== confirmPassword
              ? "Password does not match"
              : confirmPasswordError
          }
        />
      </div>
      <PasswordStrengthMeter
        password={password}
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
  );
}

export default PasswordSetup;
