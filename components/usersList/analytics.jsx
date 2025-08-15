"use client";
import { useToastContext } from "@/contexts/toast";
import api from "@/lib/api";
import React, { useState, useEffect } from "react";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const { showMessage } = useToastContext();

  const getAnalytics = async () => {
    try {
      const getAdminAnalytics = await api.get("/usage-analytics/admin-users");

      if (getAdminAnalytics.status === 200)
        setAnalytics(getAdminAnalytics.data);
      if (getAdminAnalytics.status === 403) {
        showMessage(
          "Error",
          "You do not have permission to view admin analytics",
          "error"
        );
      }
    } catch (error) {
      showMessage("Error fetching analytics", "", "error");
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <>
      {/* user summary */}
      <div className="flex space-x-8 w-full my-4">
        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-700 mb-1">Super Admin</h5>
            <h6 className="font-rubikMedium text-gray-800  text-2xl">
              {analytics ? analytics.super_admin : 0}
            </h6>
          </div>
        </div>

        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-700 mb-1">Admin</h5>
            <h6 className="font-rubikMedium text-gray-800  text-2xl">
              {analytics ? analytics.admin : 0}
            </h6>
          </div>
        </div>

        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-700 mb-1">Content Manager</h5>
            <h6 className="font-rubikMedium text-gray-800  text-2xl">
              {analytics ? analytics.content_manager : 0}
            </h6>
          </div>
        </div>

        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-700 mb-1">Other Manager</h5>
            <h6 className="font-rubikMedium text-gray-800  text-2xl">
              {analytics ? analytics.other_manager : 0}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
