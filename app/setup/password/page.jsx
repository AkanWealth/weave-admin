"use client";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";
import { passwordStrength } from "check-password-strength";

import { ToastContext, useMessageContext } from "@/contexts/toast";
import Nav from "@/components/setup/Nav";
import PasswordField from "@/components/elements/PasswordField";

function PasswordSetup() {
  return (
    <ToastContext>
      <PasswordForm />
    </ToastContext>
  );
}
function PasswordForm() {
  const { showMessage } = useMessageContext();
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  let [passwordStrong, setPasswordStrong] = useState(false);

  const savePassword = async () => {
    try {
      if (password.length < 8)
        return setPasswordError("Password must be up to 8 character");
      if (password !== confirmPassword)
        return setconfirmPasswordError(
          "Password does not match Confirm Password"
        );

      const resp = await axios.post("/");
      console.log(resp.data);
    } catch (err) {
      showMessage(JSON.stringify(err), "error");
    } finally {
      setIsLoading(false);
      // setIsError(false)
    }

    redirect("/setup/profile");
  };

  useEffect(() => {
    setPasswordError("");
    if (passwordStrength(password).contains.length === 4) {
      setPasswordStrong(true);
    } else {
      setPasswordStrong(false);
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword === password) setconfirmPasswordError("");
  }, [confirmPassword]);

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
          error={confirmPasswordError}
        />
      </div>
      <div className="text-xs">
        Minimum of 8 characters <br />
        At least one capital letter <br />
        One Number <br />
        One special character
      </div>
      <div>
        {!passwordStrong || isLoading ? (
          <button
            className="py-2 bg-base-secondary text-base-white w-full rounded-xl"
            disabled={true}
          >
            {isLoading ? "Saving..." : "Continue"}
          </button>
        ) : (
          <button
            onClick={() => {
              setIsLoading(true);
              savePassword();
            }}
            className="py-2 bg-weave-primary text-base-white w-full rounded-xl"
          >
            Set Password
          </button>
        )}
      </div>
    </div>
  );
}

export default PasswordSetup;
