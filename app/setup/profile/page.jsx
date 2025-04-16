"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { ToastContext, useMessageContext } from "@/contexts/toast";
import Nav from "@/components/setup/Nav";
import avatar from "@/assets/images/3d_avatar_1.png";
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
  const [fileSelected, setFileSelected] = useState(null);
  const [image, setImage] = useState(null);
  const router = useRouter();

  // Retrieve the admin object from local storage
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin)); // Parse the stored admin object
    }
  }, []);

  // Pre-fill the form fields with admin data
  const [firstName, setFirstName] = useState(admin?.firstName || "");
  const [lastName, setLastName] = useState(admin?.lastName || "");
  const [username, setUsername] = useState(admin?.username || "");
  const [email, setEmail] = useState(admin?.email || "");

  // Update form fields when admin data is loaded
  useEffect(() => {
    if (admin) {
      setFirstName(admin.firstName || "");
      setLastName(admin.lastName || "");
      setUsername(admin.username || "");
      setEmail(admin.email || "");
    }
  }, [admin]);

  let isDisabled = firstName === "" || lastName === "" || isLoading;

  const saveInfo = async () => {
    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);

      // Append the image file if one is selected
      if (fileSelected) {
        formData.append("headshot", fileSelected); // 'headshot' is the key expected by the backend
      }

      // Send the FormData to the backend
      const resp = await api.put(`/super-admin/profile/${admin.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
        },
      });

      console.log(resp);
      if (resp.status === 200) {
        showMessage("Profile updated successfully", "success");
        router.push("/welcome");
        return;
      }

      showMessage("Error updating profile, please try again", "error");
    } catch (err) {
      console.log(err);
      showMessage("Error updating profile, please try again", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Nav active="profile" />
      <div className="text-center">
        <h1 className="font-rubikBold text-2xl mt-4"> Profile Photo </h1>
        <p className="text-gray-500 my-2">
          Make sure the JPG/PNG file is below 2mb
        </p>

        <div className="flex justify-center mt-4 mb-8">
          <input
            type="file"
            className="hidden"
            id="profile_img"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFileSelected(file);

              // Preview the selected image
              const reader = new FileReader();
              reader.onload = () => {
                setImage(reader.result); // Set the preview image
              };
              if (file) {
                reader.readAsDataURL(file);
              }
            }}
          />
          <div className="w-[160px] h-[160px] rounded-full overflow-hidden">
            {!image ? (
              <Image
                src={avatar}
                alt="User Avatar"
                className="w-full"
                width={120}
                height={120}
              />
            ) : (
              <img src={image} className="w-full" />
            )}
          </div>
          <div className="flex px-6">
            <label
              htmlFor="profile_img"
              className="bg-weave-primary text-base-white rounded-xl p-2 px-5 my-auto"
            >
              Upload
            </label>
          </div>
        </div>
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
        {/* <TextField
          label={"Username"}
          placeholder={"Enter your username"}
          value={username}
          setValue={setUsername}
        />
        <TextField
          label={"Email"}
          placeholder={"Enter your email"}
          value={email}
          setValue={setEmail} */}
        {/* /> */}
      </div>
      <div className="my-8">
        <Button
          title={isLoading ? "Saving..." : "Finish"}
          disabled={isDisabled}
          onClick={() => {
            setIsLoading(true);
            saveInfo();
          }}
        />
      </div>
    </div>
  );
}

export default ProfileSetup;
