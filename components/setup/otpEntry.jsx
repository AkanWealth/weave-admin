"use client";
import { useMessageContext } from "@/contexts/toast";
import api from "@/lib/api";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import OTPInput from "react-otp-input";

export default function OtpVerification() {
  const { showMessage } = useMessageContext();
  const [otp, setOtp] = useState("");
  const noOfEntry = 4;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const params = useSearchParams();
  const email = params.get("email");
  const btnDisabled = otp === "" || isLoading;
  const usage = params.get("usage");

  const verifyOtp = async () => {
    setIsLoading(true);

    try {
      const resp = await api.post("/super-admin/verify-otp", { email, otp });
      if (resp.status === 200) {
        if (usage == "signup") {
          redirect("/welcome");
        } else if (usage == "reset-password") {
          redirect("/reset-password");
        } else {
          redirect("/setup/password");
        }
      }
    } catch (err) {
      showMessage(JSON.stringify(err), "error");
      setIsError(true);
    } finally {
      setIsLoading(false);
      // setIsError(false)
    }

    // redirect("/setup/message");
  };

  useEffect(() => {
    if (isError && otp.length < 4) {
      setIsError(false);
    }
  }, [otp]);

  const [sendingOtp, setSendingOtp] = useState(false);
  const resendOtp = async () => {
    setSendingOtp(true);
    try {
      const response = await api.post("/super-admin/resend-otp", {
        email,
      });
      showMessage(response?.data.message, "success");
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setSendingOtp(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="text-center">
        <h1 className="font-rubikBold text-3xl mt-4"> Verify OTP </h1>
        <p className="my-4 mx-auto max-w-[400px]">
          Enter the 4-digit OTP sent to {email} to complete your invitation and
          get started.
        </p>

        <div className="my-6 mb-8 flex justify-center text-center">
          <OTPInput
            inputType="number"
            value={otp}
            onChange={setOtp}
            numInputs={noOfEntry}
            renderInput={(props) => (
              <input
                {...props}
                className={`mr-4 outline outline-2 ${
                  isError ? "outline-red-400" : "outline-gray-500"
                } focus:outline-weave-primary min-w-[40px] min-h-[40px] rounded-xl `}
              />
            )}
          />
        </div>
        <div>
          {otp.length < noOfEntry || isLoading ? (
            <button
              className="py-2 bg-base-secondary text-base-white w-full rounded-xl"
              disabled={btnDisabled}
            >
              {isLoading ? "Verifying Otp..." : "Verify Otp"}
            </button>
          ) : (
            <button
              onClick={() => {
                verifyOtp();
              }}
              className="py-2 bg-weave-primary text-base-white w-full rounded-xl"
            >
              Verify Otp
            </button>
          )}
        </div>
        <div className="my-3">
          Did not receive a code yet?{" "}
          <button onClick={() => resendOtp()} className="font-rubikMedium">
            {sendingOtp ? "Resending" : "Resend Otp"}
          </button>
        </div>
      </div>
    </Suspense>
  );
}
