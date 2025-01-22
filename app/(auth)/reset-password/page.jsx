"use client";
import React, { useState } from "react";
import PasswordField from "@/components/elements/PasswordField";
import Button from "@/components/elements/Button";

function ResetPassword() {
  const [isLoading, setIsloading] = useState(false);
  return (
    <div className="flex-col space-y-12">
      <h1 className="text-4xl font-rubikBold">Reset Password </h1>

      <div className="flex-column space-y-6">
        <PasswordField label={"password"} placeholder="Password" />
        <PasswordField
          label={"confirm password"}
          placeholder="Confirm Password"
        />
      </div>
      <div>
        <Button title={isLoading ? "Changing Password..." : "Submit"} />
      </div>
    </div>
  );
}

export default ResetPassword;
