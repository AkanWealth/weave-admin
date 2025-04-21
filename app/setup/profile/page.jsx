"use client";
import React, { useState, useEffect } from "react";
import { ToastContext, useMessageContext } from "@/contexts/toast";
import Nav from "@/components/setup/Nav";
import TextField from "@/components/elements/TextField";
import Button from "@/components/elements/Button";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

function ProfileSetup() {
  return (
    <ToastContext>
      <ProfileForm />
    </ToastContext>
  );
}

function ProfileForm() {
  const { showMessage } = useMessageContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get email from URL parameters
  const email = searchParams.get('email');

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Button is disabled if required fields are empty or if loading
  const isDisabled = firstName === "" || lastName === "" || !email || isLoading;

  const saveInfo = async () => {
    if (!email) {
      showMessage("Email is required", "error");
      return;
    }
    
    setIsLoading(true);
    try {
      // Send request to update name by email
      const resp = await api.patch('/users/update-name-by-email', {
        email: email,
        firstName: firstName,
        lastName: lastName
      });

      if (resp.status === 200) {
        showMessage("Profile updated successfully", "success");
        router.push("/welcome");
        return;
      }

      showMessage("Error updating profile, please try again", "error");
    } catch (err) {
      console.error("Error updating profile:", err);
      showMessage("Error updating profile, please try again", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Nav active="profile" />
      
      <div className="mb-6">
        <h1 className="font-rubikBold text-2xl mt-4">Complete Your Profile</h1>
        <p className="text-gray-500 my-2">
          Please enter your first and last name
        </p>
        {email && (
          <p className="text-gray-700 font-medium mt-2">
            Email: {email}
          </p>
        )}
        {!email && (
          <p className="text-red-500 mt-2">
            No email found in URL parameters. Please include an email parameter.
          </p>
        )}
      </div>

      <div className="flex-column space-y-4">
        <TextField
          label={"First Name"}
          placeholder={"Enter your first Name"}
          value={firstName}
          setValue={setFirstName}
        />
        <TextField
          label={"Last Name"}
          placeholder={"Enter your last Name"}
          value={lastName}
          setValue={setLastName}
        />
      </div>
      
      <div className="my-8">
        <Button
          title={isLoading ? "Saving..." : "Finish"}
          disabled={isDisabled}
          onClick={() => saveInfo()}
        />
      </div>
    </div>
  );
}

export default ProfileSetup;