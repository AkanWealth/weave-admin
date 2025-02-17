"use client";
import React, { useEffect } from "react";
import { passwordStrength } from "check-password-strength";

function PasswordStrengthMeter({
  password,
  passwordStrong,
  setPasswordStrong,
}) {
  const passwordColors = ["#eb4a4a", "#f8965d", "#7eed87", "#22972c"];
  useEffect(() => {
    setPasswordStrong(passwordStrength(password).contains.length);
  }, [password]);

  return (
    <div className="text-xs pb-8">
      <div className="flex flex-row gap-3">
        <div className="bg-gray-300 rounded-md w-3/4 h-2 mb-2 my-auto">
          <div
            className="h-2 rounded-md"
            // className="bg-red-500 h-2 rounded-md"
            style={{
              width: `${(passwordStrong / 4) * 100}%`,
              backgroundColor: passwordColors[passwordStrong - 1],
            }}
          ></div>
        </div>
        <div className="w-1/4 my-auto">Password Strength</div>
      </div>
      Minimum of 8 characters <br />
      At least one capital letter <br />
      One Number <br />
      One special character
    </div>
  );
}

export default PasswordStrengthMeter;
