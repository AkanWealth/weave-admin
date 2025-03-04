"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import placeholderAvatar from "@/assets/images/Avatar.png";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const fetchUserInfo = async () => {
    try {
      const response = await api.get("/users/profile");
      if (response.status === 200) {
        console.log(response.data);
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="flex items-center pl-2 space-x-2">
      {userInfo && userInfo.headshot ? (
        <img
          src={userInfo.headshot}
          width={40}
          height={40}
          alt="User Image"
          className="rounded-full"
        />
      ) : (
        <Image
          src={placeholderAvatar}
          width={40}
          height={40}
          alt="User Image"
          className="rounded-full"
        />
      )}

      <div className="ml-3 text-gray-600 ml-2">
        <h1 className="font-rubikMedium text-sm">
          {userInfo && userInfo.username}
        </h1>
        <h1 className="capitalize text-xs text-gray-500">
          {userInfo && userInfo.role.name.replace(/_/, " ")}
        </h1>
      </div>
      {/* <div className="text-gray-500 mr-2">
        <ChevronDown className="h-5 w-5" />
      </div> */}
    </div>
  );
}

export default UserInfo;
