"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";

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
    <div className="w-1/2 flex space-x-4">
      {userInfo && (
        <>
          <div
            className="h-[45px] w-[45px] rounded-full"
            style={{ overflow: "hidden" }}
          >
            <img
              src={userInfo.headshot ? userInfo.headshot : placeholderAvatar}
              className="w-full"
              alt="User Image"
            />
          </div>
          <div className="relative flex-1 text-gray-600">
            <h1 className="font-rubikMedium italic">{userInfo.username}</h1>
            <h1 className="capitalize">
              {/* {userInfo.role.name.replace(/_/, " ")} */}
            </h1>
          </div>
        </>
      )}
    </div>
  );
}

export default UserInfo;
