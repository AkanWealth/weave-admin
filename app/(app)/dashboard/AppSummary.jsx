"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import { TrendingDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup,faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

function AppSummary() {
  const [allUsers, setAllUsers] = useState(0);
  const [appUsers, setAppUsers] = useState(0);
  const [averageCheck, setaverageCheck] = useState(0);
  
  const getUsersSummary = async () => {
    try {
      const getAllUsers = await api.get("/usage-analytics/total-users");
      const getAppUsers = await api.get("/usage-analytics/app-users");
      const getAveragecheckin = await api.get("/usage-analytics/average-checkin");
      
      if (getAllUsers.status === 200) setAllUsers(getAllUsers.data);
      if (getAppUsers.status === 200) setAppUsers(getAppUsers.data);
      if (getAveragecheckin.status === 200) setaverageCheck(getAveragecheckin.data);
  

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersSummary();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 w-full my-4">
      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Total User</h5>
            <h6 className="font-rubikMedium text-2xl">{allUsers}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#8280FF]">
            <FontAwesomeIcon icon={faUserGroup} className="text-2xl"/>
          </div>
        </div>
        
        <div className="flex items-center text-red-500 text-xs">
          <div className="flex items-center justify-center bg-red-500 w-5 h-5 rounded-[5px] mr-2">
            <TrendingDown className="text-white w-3 h-3"/>
          </div>
          -4.5% from last month
        </div>
      </div>
      
      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">App User</h5>
            <h6 className="font-rubikMedium text-2xl">{appUsers}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#28A745]">
            <FontAwesomeIcon icon={faUserGroup} className="text-2xl"/>
          </div>
        </div>
        
        <div className="flex items-center text-[#28A745] text-xs">
          <div className="flex items-center justify-center bg-[#28A745] w-5 h-5 rounded-[5px] mr-2">
            <TrendingDown className="text-white w-3 h-3"/>
          </div>
          4.5% from last month
        </div>
      </div>

      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Internal User</h5>
            <h6 className="font-rubikMedium text-2xl">{allUsers - appUsers}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#4AA0A4]">
            <FontAwesomeIcon icon={faUserGroup} className="text-2xl"/>
          </div>
        </div>
        
        <div className="flex items-center text-[#28A745] text-xs">
          <div className="flex items-center justify-center bg-[#28A745] w-5 h-5 rounded-[5px] mr-2">
            <TrendingDown className="text-white w-3 h-3"/>
          </div>
          4.5% from last month
        </div>
      </div>

      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Average Check-In</h5>
            <h6 className="font-rubikMedium text-2xl">{averageCheck}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#9747FF]">
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl"/>
          </div>
        </div>
        
        <div className="flex items-center text-red-500 text-xs">
          <div className="flex items-center justify-center bg-red-500 w-5 h-5 rounded-[5px] mr-2">
            <TrendingDown className="text-white w-3 h-3"/>
          </div>
          -4.5% from yesterday
        </div>
        </div>
    </div>
  );
}

export default AppSummary;
