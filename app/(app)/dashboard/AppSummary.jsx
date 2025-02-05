"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";

function AppSummary() {
  const [allUsers, setAllUsers] = useState(0);
  const [appUsers, setAppUsers] = useState(0);

  const getUsersSummary = async () => {
    try {
      const getAllUsers = await api.get("/usage-analytics/total-users");
      const getAppUsers = await api.get("/usage-analytics/app-users");
      if (getAllUsers.status === 200) setAllUsers(getAllUsers.data);
      if (getAppUsers.status === 200) setAppUsers(getAppUsers.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersSummary();
  }, []);

  return (
    <div className="flex space-x-8 w-full my-4">
      <div className="w-1/4 bg-base-white p-4 px-6 rounded-2xl">
        <div className="flex">
          <div className="w-3/4">
            <h5 className="text-gray-500 mb-1">Total User</h5>
            <h6 className="font-rubikMedium text-2xl">{allUsers}</h6>
          </div>
          <div className="w-1/4 flex text-3xl">
            <i className="fa fa-user m-auto"></i>
          </div>
        </div>

        {/* <h5 className="text-red-500 text-sm mt-3">-4.5% from last month</h5> */}
      </div>

      <div className="w-1/4 bg-base-white p-4 px-6 rounded-2xl">
        <div className="flex">
          <div className="w-3/4">
            <h5 className="text-gray-500 mb-1">App User</h5>
            <h6 className="font-rubikMedium text-2xl">{appUsers}</h6>
          </div>
          <div className="w-1/4 flex text-3xl">
            <i className="fa fa-user m-auto"></i>
          </div>
        </div>

        {/* <h5 className="text-red-500 text-sm mt-3">-4.5% from last month</h5> */}
      </div>

      <div className="w-1/4 bg-base-white p-4 px-6 rounded-2xl">
        <div className="flex">
          <div className="w-3/4">
            <h5 className="text-gray-500 mb-1">Internal User</h5>
            <h6 className="font-rubikMedium text-2xl">{allUsers - appUsers}</h6>
          </div>
          <div className="w-1/4 flex text-3xl">
            <i className="fa fa-user m-auto"></i>
          </div>
        </div>

        {/* <h5 className="text-red-500 text-sm mt-3">-4.5% from last month</h5> */}
      </div>

      <div className="w-1/4 bg-base-white p-4 px-6 rounded-2xl">
        <div className="flex">
          <div className="w-3/4">
            <h5 className="text-gray-500 mb-1">Average Check-in</h5>
            <h6 className="font-rubikMedium text-2xl">0</h6>
          </div>
          <div className="w-1/4 flex text-3xl">
            <i className="fa fa-clock-o m-auto"></i>
          </div>
        </div>

        {/* <h5 className="text-red-500 text-sm mt-3">-4.5% from last month</h5> */}
      </div>
    </div>
  );
}

export default AppSummary;
