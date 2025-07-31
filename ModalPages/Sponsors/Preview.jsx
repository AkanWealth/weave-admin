"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

import recreaxLogo from "@/assets/images/recreax.png";
import Image from "next/image";
import { Info } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

function ViewDetail({ onClose, onActivate, onDeactivate }) {
  const mockSponsorData = {
    id: 1,
    name: "ReCreaX",
    logo: recreaxLogo,
    user: "Jane Adebayo",
    email: "jane@gmail.com",
    package: "Spotlight Package",
    duration: "3 months",
    price: "£1,500",
    applicationDate: "15 January 2024 at 11:30",
    activatedDate: "20 January 2024 at 09:15",
    status: "Active" // Change this to "Pending" or "Inactive" to test different states
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionButton = () => {
    switch (mockSponsorData.status) {
      case "Active":
        return (
          <Link 
            href={`?modal=deactivate-sponsor&sponsor_id=${mockSponsorData.id}`}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            style={{background: "red"}}
          >
            Deactivate Sponsor
          </Link>
        );
      case "Pending":
      case "Inactive":
        return (
          <Link 
            href={`?modal=activate-sponsor&sponsor_id=${mockSponsorData.id}`}
            className="w-full bg-[#4AA0A4] hover:bg-[#3a8a8e] text-white font-medium py-3 px-4 rounded-lg transition-colors"
            style={{background: "teal"}}
          >
            Activate Sponsor
          </Link>
        );
      default:
        return (
          <Link 
            href={`?modal=activate-sponsor&sponsor_id=${mockSponsorData.id}`}
            className="w-full bg-[#4AA0A4] hover:bg-[#3a8a8e] text-white font-medium py-3 px-4 rounded-lg transition-colors"
            style={{background: "teal"}}
          >
            Activate Sponsor
          </Link>
        );
    }
  };

  const sponsorData = mockSponsorData;
  
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between border-b">
        <div className="flex items-center space-x-3 p-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
            <Image
              src={sponsorData.logo}
              alt={sponsorData.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{sponsorData.name}</h3>
            <div className={`inline-flex items-center space-x-2 text-sm rounded-full px-3 py-1 ${getStatusColor(sponsorData.status)}`}>
              <span className="text-sm font-medium">{sponsorData.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* User Information */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-900">User Information</h4>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">User:</span>
            <span className="text-sm text-gray-900">{sponsorData.user}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Email:</span>
            <span className="text-sm text-gray-900">{sponsorData.email}</span>
          </div>
        </div>

        {/* Sponsorship Package Details */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-900">Sponsorship Package Details</h4>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Package:</span>
            <span className="text-sm text-gray-900">{sponsorData.package}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Duration:</span>
            <span className="text-sm text-gray-900">{sponsorData.duration}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Price:</span>
            <span className="text-sm text-gray-900">{sponsorData.price}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-900">Timeline</h4>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Application Submitted:</span>
            <span className="text-sm text-gray-900">{sponsorData.applicationDate}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">
              {sponsorData.status === "Active" ? "Activated:" : "Status:"}
            </span>
            <span className="text-sm text-gray-900">
              {sponsorData.status === "Active" ? sponsorData.activatedDate : sponsorData.status}
            </span>
          </div>
        </div>

        {/* Status-based Information */}
        {sponsorData.status === "Active" && (
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg mb-6">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="text-green-600 w-4 h-4" />
            </div>
            <p className="text-sm text-green-800">
              This sponsor is currently active. Their ads are live in the mobile app and generating impressions.
            </p>
          </div>
        )}

        {(sponsorData.status === "Pending" || sponsorData.status === "Inactive") && (
          <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg mb-6">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="text-amber-600 w-4 h-4" />
            </div>
            <p className="text-sm text-amber-800">
              This sponsor is not currently active. You can activate them to make their ads go live in the mobile app.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center w-full pt-4">
          {/* <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button> */}
          <button className="flex w-full">{getActionButton()}</button>
        </div>
      </div>
    </>
  );
}

export default ViewDetail;