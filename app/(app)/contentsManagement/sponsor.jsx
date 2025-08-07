import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AlignRight } from "lucide-react";
import growthFrame from "@/assets/images/Frame.png";
import Link from "next/link";
import exportData from "@/lib/export";
import PaginatedItems from "@/components/elements/Pagination";
import SponsorSummary from "@/components/elements/SponsorSummary";
import api from "@/lib/api";

function SponsorsRender() {
  const [sponsors, setSponsors] = useState([]);
  const [filteredSponsors, setFilteredSponsors] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const statusOptions = ["Active", "Inactive"];
  const [statusFilter, setStatusFilter] = useState("");

  // Get all sponsors from API
  const getSponsors = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/sponsors");
      if (response.status === 200) {
        setSponsors(response.data);
        setFilteredSponsors(response.data);
      }
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      setError('Failed to load sponsors. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSponsors();
  }, []);

  useEffect(() => {
    let result = [...sponsors];

    // Apply tier filter
    if (tierFilter) {
      setSearchKey(""); // Clear search when filter is applied
      result = result.filter((sponsor) => sponsor.sponsorshipTier === tierFilter);
    }

    // Apply status filter
    if (statusFilter) {
      setSearchKey(""); // Clear search when filter is applied
      if (statusFilter === "Active") {
        result = result.filter((sponsor) => sponsor.isActive === true);
      } else if (statusFilter === "Inactive") {
        result = result.filter((sponsor) => sponsor.isActive === false);
      }
    }

    // Apply search filter
    if (searchKey) {
      result = result.filter((sponsor) =>
        Object.values(sponsor)
          .join(" ")
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    }

    // Sort by startDate in descending order
    result.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    setFilteredSponsors(result);
  }, [tierFilter, statusFilter, searchKey, sponsors]);

  // Calculate days left
  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Expires today";
    return `${diffDays} days`;
  };

  const exportContents = () => {
    exportData(
      filteredSponsors.map((sponsor) => ({
        name: sponsor.sponsorName,
        tier: sponsor.sponsorshipTier,
        duration: sponsor.duration,
        start_date: sponsor.startDate,
        end_date: sponsor.endDate,
        status: sponsor.isActive ? "Active" : "Inactive",
        price: sponsor.price
      })),
      ["name", "tier", "duration", "start_date", "end_date", "status", "price"],
      "sponsors"
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
  };

  const getSponsorColor = (sponsorName) => {
    // Generate a color based on the sponsor name hash
    let hash = 0;
    for (let i = 0; i < sponsorName.length; i++) {
      hash = sponsorName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = ["bg-blue-500", "bg-red-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-teal-500"];
    return colors[Math.abs(hash) % colors.length];
  };

  const getSponsorLogo = (sponsor) => {
    // Return the logo URL from the API
    return sponsor.logo || null;
  };

  const getTierPricing = (sponsor) => {
    // Use the price from the sponsor object, or fallback to tier-based pricing
    if (sponsor.price && parseFloat(sponsor.price) > 0) {
      return `£${parseFloat(sponsor.price).toFixed(2)}`;
    }
    
    // Fallback pricing based on tier
    const pricing = {
      "Boost Package": "£200",
      "Growth Package": "£800", 
      "Spotlight Package": "£1500"
    };
    return pricing[sponsor.sponsorshipTier] || "£0.00";
  };
  
const formatDuration = (durationStr) => {
  if (!durationStr) return "";
  // Example: "6_MONTHS" => "6 month"
  const [num, unit] = durationStr.split("_");
  if (!num || !unit) return durationStr;
  let unitFormatted = unit.toLowerCase().replace("months", "month").replace("month", "month").replace("years", "year").replace("year", "year").replace("days", "day").replace("day", "day");
  return `${num} ${unitFormatted}`;
};

  return (
    <>
      <SponsorSummary />
      
      {/* Search and Filter */}
      <div className="flex my-4">
        <div className="w-3/5">
          <div className="bg-white border px-8 py-2 rounded-md">
            <input
              type="text"
              className="bg-[#f5f6fa] rounded-md w-full px-4 py-2"
              placeholder="Search here..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
        </div>
        <div className="w-2/5 text-right">
          <button className="relative dropdown border p-2 rounded-md font-rubikMedium">
            <span className="px-2">
              {statusFilter || (
                <>
                  Filter
                  <AlignRight className="inline ml-1" />
                </>
              )}
            </span>
            <div className="absolute right-0 rounded-md p-1 shadow bg-white text-xs w-[200px] dropdown-menu">
              <div className="flex flex-col text-left">
                <a
                  className="p-2 capitalize rounded-md mb-1 cursor-pointer hover:bg-gray-100"
                  onClick={() => setStatusFilter("")}
                >
                  Reset Filter
                </a>
                {statusOptions.map((status) => (
                  <a
                    className={`p-2 capitalize rounded-md mb-1 cursor-pointer hover:bg-gray-100 ${
                      statusFilter === status ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setStatusFilter(status)}
                    key={status}
                  >
                    {status}
                  </a>
                ))}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Sponsors Table */}
      <div className="rounded-2xl bg-white p-4 my-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-rubikMedium">Current Sponsors</h2>
          <button 
            onClick={exportContents}
            className="px-4 py-2 bg-weave-primary text-white rounded-md hover:bg-weave-primary/90"
          >
            Export Data
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
            ))}
          </div>
        ) : filteredSponsors.length === 0 ? (
          <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
            <Image
              src={growthFrame}
              className="w-[80px] h-[120px] mx-auto"
              alt="Frame"
            />
            <h4 className="text-xl font-rubikMedium my-2">No Sponsors Yet</h4>
            <p className="text-md my-2">
              Start showcasing your partners and supporters. Add sponsor logos, choose tiers, and
              manage how they appear on your profile page.
            </p>
            <div>
              <Link href="/contentsManagement?modal=add-sponsor">
                <button className="bg-weave-primary py-2 px-6 text-white rounded-md">
                  Add First Sponsor
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <PaginatedItems
            items={filteredSponsors}
            itemsPerPage={10}
            displayType="table"
            emptyState={
              <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
                <Image
                  src={growthFrame}
                  className="w-[80px] h-[120px] mx-auto"
                  alt="Frame"
                />
                <h4 className="text-xl font-rubikMedium my-2">No Sponsors Found</h4>
                <p className="text-md my-2">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            }
            renderTitle={() => (
              <tr className="bg-[#f5f6fa] border-b">
                <th className="text-left px-4 py-3 font-rubikMedium">Sponsor</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Tier</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Days Left</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Duration</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Expires</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Status</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Price</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Actions</th>
              </tr>
            )}
            renderItems={(sponsor) => (
              <tr key={sponsor.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    {getSponsorLogo(sponsor) ? (
                      <div className="w-8 h-8 rounded flex items-center justify-center mr-3 overflow-hidden">
                        <img
                          src={getSponsorLogo(sponsor)}
                          alt={sponsor.sponsorName}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-8 h-8 rounded ${getSponsorColor(
                          sponsor.sponsorName
                        )} flex items-center justify-center text-white text-sm mr-3`}
                      >
                        {sponsor.sponsorName.charAt(0)}
                      </div>
                    )}
                    <span className="font-rubikMedium text-black">
                      {sponsor.sponsorName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-rubikMedium text-red-500">
                    {sponsor.sponsorshipTier}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-gray-600">
                    {calculateDaysLeft(sponsor.endDate)}
                  </span>
                </td>
                <td className="px-4 py-3">
  <span className="text-gray-600">{formatDuration(sponsor.duration)}</span>
</td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <span className="block text-gray-600">
                      {formatDate(sponsor.endDate)}
                    </span>
                    <span className="block text-gray-600 text-xs">
                      {formatTime(sponsor.endDate)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    className={`${
                      sponsor.isActive
                        ? "bg-[#28A745] text-white"
                        : "bg-red-500 text-white"
                    } px-4 rounded-full py-1 text-sm font-rubikMedium`}
                  >
                    {sponsor.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <span className="text-gray-600">
                    {getTierPricing(sponsor)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="relative px-2 py-1 mr-8 dropdown">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px] dropdown-menu">
                      <div className="flex flex-col text-left">
                        <Link
                          href={`?modal=view-sponsor-details&sponsor_id=${sponsor.id}`}
                          className="px-3 py-2 hover:bg-gray-100 rounded"
                        >
                          <i className="fa fa-eye mr-2"></i> View Details
                        </Link>

                        {/* Activate/Deactivate logic */}
                        {sponsor.isActive ? (
                          <Link
                            href={`?modal=deactivate-sponsor&sponsor_id=${sponsor.id}`}
                            className="px-3 py-2 hover:bg-gray-100 rounded text-red-500"
                          >
                            <i className="fa fa-pause mr-2"></i> Deactivate Sponsor
                          </Link>
                        ) : (
                          <Link
                            href={`?modal=activate-sponsor&sponsor_id=${sponsor.id}`}
                            className="px-3 py-2 hover:bg-gray-100 rounded text-green-600"
                          >
                            <i className="fa fa-play mr-2"></i> Activate Sponsor
                          </Link>
                        )}
{/* 
                        <Link
                          href={`?modal=edit-sponsor&sponsor_id=${sponsor.id}`}
                          className="px-3 py-2 hover:bg-gray-100 rounded"
                        >
                          <i className="fa fa-pencil mr-2"></i> Edit
                        </Link> */}
                        <Link
                          href={`?modal=delete-sponsor&sponsor_id=${sponsor.id}`}
                          className="text-red-500 px-3 py-2 hover:bg-gray-100 rounded"
                        >
                          <i className="fa fa-trash mr-2"></i> Delete
                        </Link>
                      </div>
                    </div>
                  </button>
                </td>
              </tr>
            )}
          />
        )}
      </div>
    </>
  );
}

export default function Sponsors() {
  return <SponsorsRender />;
}