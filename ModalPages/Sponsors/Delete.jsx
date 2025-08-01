"use client";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { useToastContext } from "@/contexts/toast";

function DeleteSponsor({ onClose, sponsorId }) {
  const [loading, setLoading] = useState(false);
  const [sponsorData, setSponsorData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState("");
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showMessage } = useToastContext();
  
  // Get sponsor ID from props or URL params
  const currentSponsorId = sponsorId || searchParams.get("sponsor_id");

  // Fetch sponsor details to get the name
  const getSponsorDetails = async () => {
    if (!currentSponsorId) {
      setError("Sponsor ID is required");
      setIsLoadingData(false);
      return;
    }

    try {
      const response = await api.get(`/sponsors/${currentSponsorId}`);
      if (response.status === 200) {
        setSponsorData(response.data);
      }
    } catch (error) {
      console.error('Error fetching sponsor details:', error);
      setError('Failed to load sponsor details');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    getSponsorDetails();
  }, [currentSponsorId]);

  const invokeDelete = async () => {
    if (!currentSponsorId) {
      showMessage("Error", "Sponsor ID is required", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await api.delete(`/sponsors/${currentSponsorId}`);

      if (response.status === 200) {
        showMessage("Sponsor Deleted", "The sponsor has been deleted successfully.", "success");
        
       router.push("/contentsManagement?refresh=" + Date.now());
        
        return;
      }
      showMessage("Error deleting sponsor", "Please try again later", "error");
    } catch (error) {
      console.error('Error deleting sponsor:', error);
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
      showMessage("Error deleting the sponsor", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  if (isLoadingData) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="animate-pulse">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-3 bg-gray-300 rounded w-48"></div>
              <div className="h-3 bg-gray-300 rounded w-40"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !sponsorData) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="text-center text-red-600 mb-4">{error}</div>
        <button
          onClick={handleCancel}
          className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    );
  }

  const sponsorName = sponsorData ? sponsorData.sponsorName : "this sponsor";

  return (
    <div className="max-w-md mx-auto">
      {/* Header with icon and title */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="flex p-2 items-center justify-center w-12 h-12 rounded-full"
          style={{ backgroundColor: '#FFDEDE' }}
        >
          <Trash className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Sponsor</h2>
          <p className="font-semibold text-black">
            Are you sure you want to remove {sponsorName}?
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            This action will permanently remove their logo from the General and Sponsorship Page. This action cannot be undone.
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={invokeDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}

export default DeleteSponsor;