"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import avatar from "@/assets/images/3d_avatar_1.png";
import TextField from "@/components/elements/TextField";
import Button from "@/components/elements/Button";
import PasswordField from "@/components/elements/PasswordField";
import Cookies from "js-cookie";
import api from "@/lib/api";
import { ToastContext, useToastContext } from "@/contexts/toast";
import { baseUrl } from "@/lib/envfile";

function SettingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isupdatinginfo, setIsupdatinginfo] = useState(false);
  const [isupdatingpassword, setIsupdatingpassword] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { showMessage } = useToastContext();
  const [profileImg, setProfileImg] = useState(null);
  const [attachedimg, setAttachedImg] = useState(null);
  const accessToken = Cookies.get("session");

  // inputs
  const [initialPassword, setInitialPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const pswdBtnDisabled =
    initialPassword === "" ||
    newPassword === "" ||
    initialPassword === newPassword;

  let isDisabled =
    (userProfile &&
      (userProfile.firstName === "" || userProfile.lastName === "")) ||
    isLoading;
  const getUserProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      console.log(response);
      if (response.status === 200) {
        setUserProfile(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const updateUserPassword = async () => {
    setIsupdatingpassword(true);
    try {
      const response = await api.patch("/users/change-password", {
        currentPassword: initialPassword,
        newPassword,
      });
      console.log(response);
      showMessage(response.data.message, "", "sucess");
    } catch (error) {
      console.log(error);
      showMessage(
        error.response.data.message || "Error updating password",
        "",
        "error"
      );
    } finally {
      setIsupdatingpassword(false);
    }
  };

  const updateUserProfile = async () => {
    setIsupdatinginfo(true);

    try {
      const formData = new FormData();

      // Check if a new image is uploaded, otherwise use the existing one
      if (profileImg) {
        formData.append("headshot", profileImg);
      } else if (userProfile.headshot) {
        formData.append("headshot", userProfile.headshot);
      }

      formData.append("firstName", userProfile.firstName);
      formData.append("lastName", userProfile.lastName);
      formData.append("username", userProfile.username);
      formData.append("email", userProfile.email);

      const response = await fetch(`${baseUrl}/super-admin/profile`, {
        method: "PUT",
        body: formData,
        headers: {
          contentType: "multipart/formdata",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        showMessage("Profile updated successfully", "", "success");
      }
    } catch (error) {
      showMessage("Error updating user profile", "", "error");
    } finally {
      setIsupdatinginfo(false);
    }
  };

  useEffect(() => {
    if (profileImg) {
      const reader = new FileReader();
      reader.readAsDataURL(profileImg);
      reader.onload = (e) => {
        setAttachedImg(e.target.result);
      };
    }
  }, [profileImg]);

  return (
    <div>
      <h1 className="text-2xl">
        <i className="fa fa-cog mr-4 text-xl bg-[#e8e8e8] rounded-full p-3"></i>
        Settings
      </h1>
      <div className="rounded-2xl bg-white p-4 my-4">
        {isFetching ? (
          <div className="min-h-[300px] flex">
            <div className="loader m-auto"></div>
          </div>
        ) : userProfile ? (
          <>
            <h3 className="text-xl font-rubikMedium">My Profile </h3>

            <div className="md:w-3/4">
              <div className="">
                <h1 className="font-rubikBold text-2xl mt-4">
                  {" "}
                  Profile Photo{" "}
                </h1>
                <p className="text-gray-500 my-2">
                  Make sure the JPG/PNG file is below 2mb
                </p>

                <div className="flex mt-4 mb-8">
                  <input
                    type="file"
                    className="hidden"
                    id="profile_img"
                    onChange={(e) => setProfileImg(e.target.files[0])}
                  />
                  <div
                    className="w-[160px] h-[160px] rounded-full"
                    style={{ overflow: "hidden" }}
                  >
                    <img
                      src={
                        attachedimg !== null
                          ? attachedimg
                          : userProfile.headshot
                          ? userProfile.headshot
                          : avatar
                      }
                      width={160}
                      height={160}
                      alt="User Avatar"
                      className="w-full"
                    />
                  </div>
                  <div className="flex px-6">
                    {/* <button className="bg-weave-primary text-base-white rounded-xl p-2 px-5 my-auto">
              Upload
            </button> */}
                    <button
                      className="border border-black rounded-xl p-2 px-5 my-auto mr-3"
                      onClick={() => {
                        setAttachedImg(null);
                        setProfileImg(null);
                      }}
                    >
                      Remove
                    </button>
                    <label
                      htmlFor="profile_img"
                      className="bg-weave-primary text-base-white rounded-xl p-2 px-5 my-auto"
                    >
                      Upload
                    </label>
                  </div>
                </div>
              </div>
              <div className="md:flex md:space-x-4 w-full mb-4">
                <div className="flex-1">
                  <TextField
                    label={"First Name"}
                    placeholder={"Enter your first name"}
                    value={userProfile.firstName}
                    setValue={(e) =>
                      setUserProfile({
                        ...userProfile,
                        firstName: e,
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <TextField
                    label={"Last Name"}
                    placeholder={"Enter your last name"}
                    value={userProfile.lastName}
                    setValue={(e) =>
                      setUserProfile({
                        ...userProfile,
                        lastName: e,
                      })
                    }
                  />
                </div>
              </div>
              <div className="md:flex md:space-x-4 w-full">
                <div className="w-1/3">
                  <TextField
                    label={"Username"}
                    placeholder={"Enter your new username"}
                    value={userProfile.username}
                    setValue={(e) =>
                      setUserProfile({
                        ...userProfile,
                        username: e,
                      })
                    }
                  />
                </div>
                <div className="w-2/3">
                  <TextField
                    label={"Email Address"}
                    placeholder={"Enter your first name"}
                    value={userProfile.email}
                    setValue={(e) =>
                      setUserProfile({
                        ...userProfile,
                        email: e,
                      })
                    }
                  />
                </div>
                {/* <div className="flex-1">
                  <TextField
                    label={"Role"}
                    placeholder={"Enter your last name"}
                    disabled={true}
                  />
                </div> */}
              </div>
              <div className="my-8">
                <div className="">
                  <Button
                    title={isupdatinginfo ? "Saving..." : "Finish"}
                    disabled={isDisabled}
                    onClick={() => {
                      updateUserProfile();
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-[300px] flex">
            <div className="error-message" id="error-message">
              Error fetching data. Please try again.
            </div>
          </div>
        )}
      </div>
      {/* Password update tab */}

      <div className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-xl font-rubikMedium">Change Password </h3>
        <p>
          Change Password New password must contain digits, letters, special
          characters and a minimum of 8 characters.
        </p>

        <div className="md:w-1/3 my-3">
          <PasswordField
            label={"Initial Password"}
            placeholder={"Enter your current password"}
            value={initialPassword}
            setValue={setInitialPassword}
          />
          <div className="mt-4">
            <PasswordField
              label={"New Password"}
              placeholder={"Enter new password"}
              value={newPassword}
              setValue={setNewPassword}
              error={
                newPassword !== "" && newPassword === initialPassword
                  ? "New password cant be the same with old"
                  : ""
              }
            />
          </div>

          <div className="my-8">
            <div className="">
              <Button
                title={isupdatingpassword ? "Saving..." : "Finish"}
                disabled={pswdBtnDisabled}
                onClick={() => {
                  updateUserPassword();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ToastContext>
      <SettingPage />
    </ToastContext>
  );
}
