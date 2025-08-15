"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

function ViewDetail({ onClose, sponsorId }) {
  const [sponsorData, setSponsorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  
  // Get sponsor ID from props or URL params
  const currentSponsorId = sponsorId || searchParams.get("sponsor_id");

  // Fetch sponsor details from API
  const getSponsorDetails = async () => {
    if (!currentSponsorId) {
      setError("Sponsor ID is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get(`/sponsors/admin/${currentSponsorId}`);
      if (response.status === 200) {
        setSponsorData(response.data);
      }
    } catch (error) {
      console.error('Error fetching sponsor details:', error);
      setError('Failed to load sponsor details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSponsorDetails();
  }, [currentSponsorId]);

  const getStatusColor = (isActive) => {
    return isActive 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  const getStatusText = (isActive) => {
    return isActive ? "Active" : "Inactive";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTierPricing = (sponsor) => {
    if (sponsor.price && parseFloat(sponsor.price) > 0) {
      return `£${parseFloat(sponsor.price).toFixed(2)}`;
    }
    
    const pricing = {
      "Boost Package": "£500",
      "Growth Package": "£1000", 
      "Spotlight Package": "£2000"
    };
    return pricing[sponsor.sponsorshipTier] || "£0.00";
  };

  const getDurationText = (duration) => {
    const durationMap = {
      "1_MONTH": "1 month",
      "3_MONTHS": "3 months",
      "6_MONTHS": "6 months",
      "12_MONTHS": "12 months"
    };
    return durationMap[duration] || duration;
  };

  const getActionButton = () => {
    if (!sponsorData) return null;

    if (sponsorData.isActive) {
      return (
        <Link 
          href={`?modal=deactivate-sponsor&sponsor_id=${sponsorData.id}`}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center block"
          style={{ backgroundColor: '#e60a0aff' }}
        >
          Deactivate Sponsor
        </Link>
      );
    } else {
      return (
        <Link 
          href={`?modal=activate-sponsor&sponsor_id=${sponsorData.id}`}
          className="w-full bg-[#4AA0A4] hover:bg-[#3a8a8e] text-white font-medium py-3 px-4 rounded-lg transition-colors text-center block"
          style={{ backgroundColor: 'teal' }}
        >
          Activate Sponsor
        </Link>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 border-b pb-4 mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !sponsorData) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600 mb-4">{error}</div>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    );
  }

  if (!sponsorData) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-600 mb-4">Sponsor not found</div>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    );
  }
  
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between border-b">
        <div className="flex items-center space-x-3 p-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
            {sponsorData.logo ? (
              <img
                src={sponsorData.logo}
                alt={sponsorData.sponsorName}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-white font-bold text-lg">
                {sponsorData.sponsorName.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{sponsorData.sponsorName}</h3>
            <div className={`inline-flex items-center space-x-2 text-sm rounded-full px-3 py-1 ${getStatusColor(sponsorData.isActive)}`}>
              <span className="text-sm font-medium">{getStatusText(sponsorData.isActive)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Sponsorship Package Details */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-900">Sponsorship Package Details</h4>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Package:</span>
            <span className="text-sm text-gray-900">{sponsorData.sponsorshipTier}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Duration:</span>
            <span className="text-sm text-gray-900">{getDurationText(sponsorData.duration)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Price:</span>
            <span className="text-sm text-gray-900">{getTierPricing(sponsorData)}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-900">Timeline</h4>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Start Date:</span>
            <span className="text-sm text-gray-900">{formatDate(sponsorData.startDate)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">End Date:</span>
            <span className="text-sm text-gray-900">{formatDate(sponsorData.endDate)}</span>
          </div>
        </div>

        {/* Status-based Information */}
        {sponsorData.isActive && (
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg mb-6">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="text-green-600 w-4 h-4" />
            </div>
            <p className="text-sm text-green-800">
              This sponsor is currently active. Their ads are live in the mobile app and generating impressions.
            </p>
          </div>
        )}

        {!sponsorData.isActive && (
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
          <div className="w-full">{getActionButton()}</div>
        </div>
      </div>
    </>
  );
}

export default ViewDetail;