import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AlignRight } from "lucide-react";
import growthFrame from "@/assets/images/Frame.png";
import Link from "next/link";
import exportData from "@/lib/export";
import PaginatedItems from "@/components/elements/Pagination";
import recreaxLogo from "@/assets/images/recreax.png";
import areliLogo from "@/assets/images/Areli.jpg";
import greentechLogo from "@/assets/images/greentech.jpg";
import IcanLogo from "@/assets/images/Ican.jpg";
import DateRender from "@/components/elements/DateRender";

// Define dummySponsors outside the component to prevent recreation on each render
const dummySponsors = [
  {
    id: 1,
    name: "ReCreax",
    tier: "£500",
    duration: "3 months",
    start_date: "2024-01-03",
    end_date: "2024-04-03",
    status: "Active",
  },
  {
    id: 2,
    name: "ICAN Surulere",
    tier: "£1000",
    duration: "12 months",
    start_date: "2024-01-20",
    end_date: "2025-01-20",
    status: "Active",
  },
  {
    id: 3,
    name: "GreenTech",
    tier: "£2000",
    duration: "6 months",
    start_date: "2024-02-15",
    end_date: "2024-08-15",
    status: "Active",
  },
  {
    id: 4,
    name: "myAreli",
    tier: "£5000",
    duration: "12 months",
    start_date: "2024-03-01",
    end_date: "2025-03-01",
    status: "Active",
  },
];

function SponsorsRender() {
  const [filteredSponsors, setFilteredSponsors] = useState(dummySponsors);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sponsorTiers = ["£500", "£1000", "£2000", "£5000"];
  const [tierFilter, setTierFilter] = useState("");
  const statusOptions = ["Active", "Draft"];
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    let result = [...dummySponsors];

    // Apply tier filter
    if (tierFilter) {
      setSearchKey(""); // Clear search when filter is applied
      result = result.filter((sponsor) => sponsor.tier === tierFilter);
    }

    // Apply status filter
    if (statusFilter) {
      setSearchKey(""); // Clear search when filter is applied
      result = result.filter((sponsor) => sponsor.status === statusFilter);
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

    // Sort by start_date in descending order
    result.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    setFilteredSponsors(result);
  }, [tierFilter, statusFilter, searchKey]);

  const exportContents = () => {
    exportData(
      filteredSponsors.map((sponsor) => ({
        type: sponsor.name,
        tier: sponsor.tier,
        duration: sponsor.duration,
        start_date: sponsor.start_date,
        end_date: sponsor.end_date,
        status: sponsor.status,
      })),
      ["type", "tier", "duration", "start_date", "end_date", "status"],
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
    const colors = {
      "myAreli": "bg-blue-500",
      "GreenTech": "bg-blue-500",
      "ICAN Surulere": "bg-orange-500",
      "ReCreax": "bg-red-800",
    };
    return colors[sponsorName] || "bg-gray-500";
  };

  const getSponsorLogo = (sponsorName) => {
    const logos = {
      "ReCreax": recreaxLogo,
      "myAreli": areliLogo,
      "GreenTech": greentechLogo,
      "ICAN Surulere": IcanLogo,
    };
    return logos[sponsorName] || null;
  };

  return (
    <>
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

      {/* Sponsors Table */}
      <div className="rounded-2xl bg-white p-4 my-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-rubikMedium">Current Sponsors</h2>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-6 bg-gray-200 rounded w-full"></div>
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
              <button className="bg-weave-primary py-2 px-6 text-white rounded-md">
                Add First Sponsor
              </button>
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
                <h4 className="text-xl font-rubikMedium my-2">No Sponsors Yet</h4>
                <p className="text-md my-2">
                  Start showcasing your partners and supporters. Add sponsor logos, choose tiers, and
                  manage how they appear on your profile page.
                </p>
                <div>
                  <button className="bg-teal-500 py-2 px-6 text-white rounded-md">
                    Add First Sponsor
                  </button>
                </div>
              </div>
            }
            renderTitle={() => (
              <tr className="bg-[#f5f6fa] border-b">
                <th className="text-left px-4 py-3 font-rubikMedium">Type</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Tier</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Duration</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Start Date</th>
                <th className="text-left px-4 py-3 font-rubikMedium">End Date</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Status</th>
                <th className="text-left px-4 py-3 font-rubikMedium">Actions</th>
              </tr>
            )}
            renderItems={(sponsor) => (
              <tr key={sponsor.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    {getSponsorLogo(sponsor.name) ? (
                      <div className="w-8 h-8 rounded flex items-center justify-center mr-3 overflow-hidden">
                        <Image
                          src={getSponsorLogo(sponsor.name)}
                          alt={sponsor.name}
                          width={100}
                          height={100}
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-8 h-8 rounded ${getSponsorColor(
                          sponsor.name
                        )} flex items-center justify-center text-white text-sm mr-3`}
                      >
                        {sponsor.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-rubikMedium text-black">{sponsor.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-rubikMedium text-red-500">{sponsor.tier}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-gray-600">{sponsor.duration}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <span className="block text-gray-600">
                     {formatDate(sponsor.start_date)}
                    </span>
                    <span className="block text-gray-600 text-xs">
                      {formatTime(sponsor.start_date)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <span className="block text-gray-600">
                      {formatDate(sponsor.end_date)}
                    </span>
                    <span className="block text-gray-600 text-xs">
                      {formatTime(sponsor.end_date)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    className={`${
                      sponsor.status?.toLowerCase() === "active"
                        ? "bg-[#28A745] text-white"
                        : "bg-[#B5B5B5] text-white"
                    } px-4 rounded-full py-1 text-sm font-rubikMedium`}
                  >
                    {sponsor.status}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button className="relative px-2 py-1 mr-8 dropdown">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px] dropdown-menu">
                      <div className="flex flex-col text-left">
                        <Link
                          href={`?modal=edit-sponsor&sponsor_id=${sponsor.id}`}
                          className="px-3 py-2 hover:bg-gray-100 rounded"
                        >
                          <i className="fa fa-pencil mr-2"></i> Edit Sponsor
                        </Link>
                         
                        <Link
                          href={`?modal=preview-sponsor&sponsor_id=${sponsor.id}`}
                          className="px-3 py-2 hover:bg-gray-100 rounded"
                        >
                          <i className="fa fa-pencil mr-2"></i> Preview Sponsor
                        </Link>
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