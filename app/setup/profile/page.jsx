"use client";
import { redirect } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import { ToastContext, useMessageContext } from "@/contexts/toast";
import Nav from "@/components/setup/Nav";
import avatar from "@/assets/images/3d_avatar_1.png";
import TextField from "@/components/elements/TextField";
import Button from "@/components/elements/Button";

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

  useEffect(() => {
    setImageView();
  }, [fileSelected]);

  const setImageView = () => {
    console.log("reading");
    if (!fileSelected) return;
    const filereader = new FileReader();
    filereader.readAsDataURL(fileSelected);
    filereader.onload = (e) => {
      setImage(e.target.result);
    };
  };

  // inputs
  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");

  let isDisabled = firstname === "" || lastname === "" || isLoading;

  const saveInfo = async () => {
    try {
      const resp = await axios.post("/");
      console.log(resp.data);
    } catch (err) {
      showMessage(JSON.stringify(err), "error");
    } finally {
      setIsLoading(false);
    }

    redirect("/welcome");
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
            onChange={(e) => setFileSelected(e.target.files[0])}
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
            {/* <button className="bg-weave-primary text-base-white rounded-xl p-2 px-5 my-auto">
              Upload
            </button> */}
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
          placeholder={"Enter your first name"}
          value={firstname}
          setValue={setFirstname}
        />
        <TextField
          label={"Last Name"}
          placeholder={"Enter your last name"}
          value={lastname}
          setValue={setLastname}
        />
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
