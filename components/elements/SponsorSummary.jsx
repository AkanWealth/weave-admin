"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FaMoneyBills } from "react-icons/fa6";
import { PiMagicWandFill } from "react-icons/pi";

function SponsorSummary() {
  const [sponsorStats, setSponsorStats] = useState({
    totalSponsors: 0,
    activeSponsors: 0,
    pendingSponsors: 0,
    totalRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getSponsorStats = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/sponsors/stats");
      
      if (response.status === 200) {
        const data = response.data;
        setSponsorStats({
          totalSponsors: data.totalSponsors || 0,
          activeSponsors: data.activeSponsors || 0,
          pendingSponsors: data.pendingSponsors || 0,
          totalRevenue: data.totalRevenue || 0
        });
      }
    } catch (error) {
      console.error('Error fetching sponsor stats:', error);
      setError('Failed to load sponsor statistics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSponsorStats();
  }, []);

  const renderPercentageChange = (value, timeframe) => {
    // Determine if the value is positive or negative
    const isPositive = value >= 0;
    const absValue = Math.abs(value);

    // Determine the color and icon based on the value
    const textColorClass = isPositive ? "text-[#28A745]" : "text-red-500";
    const bgColorClass = isPositive ? "bg-[#28A745]" : "bg-red-500";
    const Icon = isPositive ? TrendingUp : TrendingDown;

    return (
      <div className={`flex items-center ${textColorClass} text-xs`}>
        <div
          className={`flex items-center justify-center ${bgColorClass} w-5 h-5 rounded-[5px] mr-2`}
        >
          <Icon className="text-white w-3 h-3" />
        </div>
        {absValue.toFixed(1)}% from {timeframe}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-6 w-full my-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-base-white p-6 rounded-2xl animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="whitespace-nowrap">
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-16"></div>
              </div>
              <div className="h-10 w-10 bg-gray-300 rounded"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6 w-full my-4">
      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Total Sponsors</h5>
            <h6 className="font-rubikMedium text-2xl">{sponsorStats.totalSponsors}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#8280FF]">
            <FontAwesomeIcon icon={faUserGroup} className="text-2xl" />
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <span>All registered sponsors</span>
        </div>
      </div>

      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Active Sponsors</h5>
            <h6 className="font-rubikMedium text-2xl">{sponsorStats.activeSponsors}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#28A745]">
            <FontAwesomeIcon icon={faUserGroup} className="text-2xl" />
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <span>Currently active sponsorships</span>
        </div>
      </div>

      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Pending Sponsors</h5>
            <h6 className="font-rubikMedium text-2xl">{sponsorStats.pendingSponsors}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#FFA500]">
            <PiMagicWandFill className="text-2xl" />
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <span>Awaiting activation</span>
        </div>
      </div>

      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Total Revenue</h5>
            <h6 className="font-rubikMedium text-2xl">£{sponsorStats.totalRevenue.toLocaleString()}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#4AA0A4]">
            <FaMoneyBills className="text-2xl" />
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <span>Total earnings from sponsors</span>
        </div>
      </div>
    </div>
  );
}

export default SponsorSummary;