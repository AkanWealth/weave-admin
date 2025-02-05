"use client";
import React, { useEffect, useState } from "react";
import TextField from "@/components/elements/TextField";
import PasswordField from "@/components/elements/PasswordField";
import Button from "@/components/elements/Button";
import { passwordStrength } from "check-password-strength";
import api from "@/lib/api";
import { ToastContext, useMessageContext } from "@/contexts/toast";
import { useRouter } from "next/navigation";

const Register = () => {
  return (
    <ToastContext>
      <PageContent />
    </ToastContext>
  );
};

function PageContent() {
  const [email, setEmail] = useState("");
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrong, setPasswordStrong] = useState(false);
  const passwordColors = ["#eb4a4a", "#f8965d", "#7eed87", "#22972c"];
  const { showMessage } = useMessageContext();
  const router = useRouter();

  useEffect(() => {
    setPasswordError("");
    setPasswordStrong(passwordStrength(password).contains.length);
  }, [password]);

  const btnDisabled =
    email === "" ||
    !email.match(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    ) ||
    password === "" ||
    isLoading ||
    passwordStrong !== 4 ||
    password !== confirmPassword;

  const signUp = async () => {
    const splittedname = fullName.split(" ");

    // console.log({
    //   email,
    //   password,
    //   username: fullName,
    //   firstName: splittedname[1] || "",
    //   lastName: splittedname[0],
    //   headshot: "",
    // });
    // return;

    setIsLoading(true);

    try {
      const response = await api.post("/auth/seed-admin", {
        email,
        password,
        username: fullName,
        firstName: splittedname[1] || "",
        lastName: splittedname[0],
        // headshot: "",
      });

      console.log(response);
      showMessage(response?.data.message, "success");

      if (response.status === 201) {
        router.push(`/otp?email=${email}&usage=signup`);
      }
    } catch (error) {
      console.log(error);
      showMessage(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords does not match");
    } else {
      setPasswordError("");
    }
  }, [confirmPassword]);

  return (
    <div className="my-auto">
      <h1 className="text-4xl font-rubikBold"> Sign up as the Weave Admin </h1>
      <p className="text-md my-4 mb-4">
        Register now to take control and manage the Weave App with ease. Get
        started today!
      </p>
      <div className="my-4 flex-col space-y-3">
        <TextField
          label={"Fullname"}
          placeholder={"Enter your fullname"}
          value={fullName}
          setValue={setFullname}
        />
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
        <PasswordField
          label={"Confirm Password"}
          placeholder="••••••••••••"
          value={confirmPassword}
          setValue={setConfirmPassword}
          error={passwordError}
        />

        <div className="text-xs">
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
      </div>
      <div className="my-8">
        <Button
          title={isLoading ? "Creating Account..." : "Create Account"}
          disabled={btnDisabled}
          onClick={() => signUp()}
        />
      </div>
    </div>
  );
}

export default Register;
