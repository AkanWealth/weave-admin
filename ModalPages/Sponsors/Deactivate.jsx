"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import api from "@/lib/api";
import { useToastContext } from "@/contexts/toast";

function DeactivateSponsor({ onClose, sponsorId: propSponsorId }) {
  const searchParams = useSearchParams();
  const sponsorId = propSponsorId || searchParams.get("sponsor_id");
const [sponsorData, setSponsorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeactivating, setIsDeactivating] = useState(false);
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

  // Deactivate sponsor
  const handleDeactivateSponsor = async () => {
    setIsDeactivating(true);
    setError("");

    try {
      const response = await api.post(`/sponsors/deactivate/${sponsorId}`);
      
      if (response.status === 200) {
        showMessage("Sponsor deactivated successfully", "", "success");
        
        // Refresh the page to update the sponsors list
        router.push("/contentsManagement?refresh=" + Date.now());
      }
    } catch (error) {
      console.error('Error deactivating sponsor:', error);
      const errorMessage = error.response?.data?.message || 'Failed to deactivate sponsor. Please try again.';
      setError(errorMessage);
      showMessage("Error deactivating sponsor", errorMessage, "error");
    } finally {
      setIsDeactivating(false);
    }
  };

  useEffect(() => {
    getSponsorDetails();
  }, [sponsorId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Expires today";
    return `${diffDays} days left`;
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
            <div className="space-y-1">
              <p className="text-sm text-gray-600">{sponsorData.sponsorshipTier}</p>
              <p className="text-sm text-gray-500">
                Expires: {formatDate(sponsorData.endDate)} ({calculateDaysLeft(sponsorData.endDate)})
              </p>
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
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Deactivate Sponsor?</h4>
        
        {/* Deactivation Impact */}
        <div className="bg-red-50 rounded-lg p-4 mb-4" style={{background: "antiquewhite"}}>
          <h5 className="text-sm font-medium text-red-600 mb-3">Deactivation Impact</h5>
          <ul className="text-sm text-red-600 space-y-2">
            <li>• Sponsor ads will stop showing in the mobile app immediately</li>
            <li>• All promotional content will be removed from active rotation</li>
            <li>• Sponsor can be reactivated later if needed</li>
            <li>• Remaining sponsorship duration will be preserved</li>
          </ul>
        </div>

        

        {/* Warning */}
        <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg mb-6">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="text-amber-600 w-4 h-4" />
          </div>
          <p className="text-sm text-amber-800">
            This action can be reversed. You can reactivate this sponsor at any time from the dashboard.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            disabled={isDeactivating}
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button 
            onClick={handleDeactivateSponsor}
            disabled={isDeactivating}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{background: "red"}}
          >
            {isDeactivating ? "Deactivating..." : "Deactivate Sponsor"}
          </button>
        </div>
      </div>
    </>
  );
}

export default DeactivateSponsor;