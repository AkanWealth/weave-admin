"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { User, Mail, Calendar, Clock, Shield, Info } from "lucide-react";
import api from "@/lib/api";

function ViewDetailsModal({ onClose }) {
  const searchParams = useSearchParams();
  const subscriberId = searchParams.get("id");

  const [subscriberData, setSubscriberData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubscriberDetails = async () => {
    if (!subscriberId) {
      setError("Subscriber ID is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get(`/subscriptions/${subscriberId}`);
      if (response.status === 200) {
        setSubscriberData(response.data);
      }
    } catch (error) {
      console.error("Error fetching subscriber details:", error);
      setError("Failed to load subscriber details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriberDetails();
  }, [subscriberId]);

  const getStatusBadge = (status) => {
    const base = "inline-flex px-3 py-1 text-sm rounded-full font-medium";
    switch (status?.toLowerCase()) {
      case "active":
        return `${base} bg-green-100 text-green-800`;
      case "expired":
        return `${base} bg-red-100 text-red-800`;
      case "canceled":
        return `${base} bg-yellow-100 text-yellow-800`;
      default:
        return `${base} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return `${d.getUTCDate().toString().padStart(2, "0")} ${d.toLocaleString("en", { month: "long" })} ${d.getUTCFullYear()}`;
  };

  // Helper function to safely display plan information
  const getPlanDisplay = (plan) => {
    if (!plan) return "N/A";
    if (typeof plan === 'string') return plan;
    if (typeof plan === 'object') {
      // Extract the most relevant information from the plan object
      return plan.name || plan.description || `${plan.amount} ${plan.currency}/${plan.interval}` || "Unknown Plan";
    }
    return String(plan);
  };

  // Helper function to safely display any field that might be an object
  const safeDisplay = (value) => {
    if (!value) return "N/A";
    if (typeof value === 'string' || typeof value === 'number') return value;
    if (typeof value === 'object') {
      // If it's an object, try to extract meaningful information
      return value.name || value.title || value.description || JSON.stringify(value);
    }
    return String(value);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading subscriber details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600 text-center mb-4">{error}</p>
       
      </div>
    );
  }

  if (!subscriberData) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-600">No data found for this subscriber.</p>
       
      </div>
    );
  }

  const user = subscriberData || {};
  const fullName = user.name;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Subscriber Details</h2>
        <span className={getStatusBadge(subscriberData.status)}>{subscriberData.status}</span>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-800">Name:</span>
            <span>{fullName || "Unknown User"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-800">Email:</span>
            <span>{user.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-800">Plan:</span>
            <span>{getPlanDisplay(subscriberData.plan)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">Annual Membership:</span>
            <span>{safeDisplay(subscriberData.annualMembership)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">Trial Access:</span>
            <span>{safeDisplay(subscriberData.trialAccess)}</span>
          </div>
        </div>

        {/* Billing Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-800">Start Date:</span>
            <span>{formatDate(subscriberData.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-800">Next Billing:</span>
            <span>{formatDate(subscriberData.nextBilling)}</span>
          </div>
         
        </div>
      </div>

      {/* Plan Details Section (if plan is an object) */}
      {subscriberData.plan && typeof subscriberData.plan === 'object' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3">Plan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {subscriberData.plan.name && (
              <div><span className="font-medium">Name:</span> {subscriberData.plan.name}</div>
            )}
            {subscriberData.plan.description && (
              <div><span className="font-medium">Description:</span> {subscriberData.plan.description}</div>
            )}
            {subscriberData.plan.amount && (
              <div><span className="font-medium">Amount:</span> {subscriberData.plan.amount} {subscriberData.plan.currency}</div>
            )}
            {subscriberData.plan.interval && (
              <div><span className="font-medium">Billing:</span> Every {subscriberData.plan.intervalCount || 1} {subscriberData.plan.interval}(s)</div>
            )}
           
           
          </div>
        </div>
      )}

     

    </div>
  );
}

export default ViewDetailsModal;