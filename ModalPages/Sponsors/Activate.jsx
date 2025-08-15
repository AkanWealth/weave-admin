"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import api from "@/lib/api";
import { useToastContext } from "@/contexts/toast";

function ActivateSponsor({ onClose, sponsorId: propSponsorId }) {
  const searchParams = useSearchParams();
  const sponsorId = propSponsorId || searchParams.get("sponsor_id");
const [sponsorData, setSponsorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActivating, setIsActivating] = useState(false);
  const [error, setError] = useState("");
  const { showMessage } = useToastContext();
  const router = useRouter();

  // Fetch sponsor details
  const getSponsorDetails = async () => {
    if (!sponsorId) {
      setError("Sponsor ID is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get(`/sponsors/${sponsorId}`);
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

  // Activate sponsor
  const handleActivateSponsor = async () => {
    setIsActivating(true);
    setError("");

    try {
      const response = await api.post(`/sponsors/activate/${sponsorId}`);
      
      if (response.status === 200) {
        showMessage("Sponsor activated successfully", "", "success");
        // onClose();
        // Refresh the page to update the sponsors list
        router.push("/contentsManagement?refresh=" + Date.now());
      }
    } catch (error) {
      console.error('Error activating sponsor:', error);
      const errorMessage = error.response?.data?.message || 'Failed to activate sponsor. Please try again.';
      setError(errorMessage);
      showMessage("Error activating sponsor", errorMessage, "error");
    } finally {
      setIsActivating(false);
    }
  };

  useEffect(() => {
    getSponsorDetails();
  }, [sponsorId]);

  const getStatusColor = (isActive) => {
    return isActive 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit'
    });
  };

  const getTierPricing = (tier) => {
    const pricing = {
      "Boost Package": "£500",
      "Growth Package": "£1000", 
      "Spotlight Package": "£2000"
    };
    return pricing[tier] || "N/A";
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
              <span>{sponsorData.isActive ? "Active" : "Inactive"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-4 border-b pb-4">
          <div className="text-sm font-semibold text-gray-600 space-y-2">
            <p>Sponsor Name:</p>
            <p>Contact Email:</p>
          </div>
          <div className="text-sm text-gray-900 space-y-2 text-right">
            <p>{sponsorData.sponsorName}</p>
            <p>{sponsorData.contactEmail || "N/A"}</p>
          </div>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Sponsorship Package Details</h4>
        <div className="flex justify-between items-start mb-4 border-b pb-4">
          <div className="text-sm font-semibold text-gray-600 space-y-2">
            <p>Package:</p>
            <p>Duration:</p>
            <p>Price:</p>
          </div>
          <div className="text-sm text-gray-900 space-y-2 text-right">
            <p>{sponsorData.sponsorshipTier}</p>
            <p>{sponsorData.duration}</p>
            <p>{sponsorData.price ? `£${parseFloat(sponsorData.price).toFixed(2)}` : getTierPricing(sponsorData.sponsorshipTier)}</p>
          </div>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Timeline</h4>
        <div className="flex justify-between items-start mb-6 border-b pb-4">
          <div className="text-sm font-semibold text-gray-600 space-y-2">
            <p>Start Date:</p>
            <p>End Date:</p>
          </div>
          <div className="text-sm text-gray-900 space-y-2 text-right">
            <p>{formatDate(sponsorData.startDate)}</p>
            <p>{formatDate(sponsorData.endDate)}</p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg mb-6">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="text-amber-600 w-4 h-4" />
          </div>
          <p className="text-sm text-amber-800">
            Once activated, the sponsor's ads will go live in the mobile app immediately. Make sure all details are correct before proceeding.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isActivating}
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button 
            onClick={handleActivateSponsor}
            disabled={isActivating}
            className="flex-1 bg-[#4AA0A4] hover:bg-[#4AA0A4]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "#4AA0A4" }}
          >
            {isActivating ? "Activating..." : "Activate Sponsor"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ActivateSponsor;