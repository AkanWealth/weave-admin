import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import growthFrame from "@/assets/images/EmptyState.png";
import Link from "next/link";
import ResourceLibraryProvider, {
  useResourceLibrary,
} from "@/contexts/ResourceLibraryContext";
import exportData from "@/lib/export";
import PaginatedItems from "@/components/elements/Pagination";
import EmptyMusicState from "@/components/elements/EmptyState";
import DateRender from "@/components/elements/DateRender";

function MusicRender() {
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { resources, isLoading } = useResourceLibrary();
  const categories = ["Nutrition", "Mind & Body Wellness", "Movement", "Sleep"];
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Empty the dummy data array to test empty state
  const dummyData = [
    { id: 1, songTitle: "Deep Night Breeze", artist: "Calm Sounds", category: "Sleep", uploadedOn: "2025-07-15", fileName: "deep_breeze.mp3", status: "Uploaded" },
    { id: 2, songTitle: "Gentle Flow", artist: "Inner Vibes", category: "Nutrition", uploadedOn: "2025-07-14", fileName: "gentle_flow.mp3", status: "Draft" },
    { id: 3, songTitle: "Morning Light", artist: "Fresh Beats", category: "Movement", uploadedOn: "2025-07-13", fileName: "morning_light.mp3", status: "Uploaded" },
    { id: 4, songTitle: "Evening Calm", artist: "Relax Tunes", category: "Sleep", uploadedOn: "2025-07-12", fileName: "evening_calm.mp3", status: "Draft" },
    { id: 5, songTitle: "Focus Flow", artist: "Study Beats", category: "Mind & Body Wellness", uploadedOn: "2025-07-11", fileName: "focus_flow.mp3", status: "Uploaded" }, 
    { id: 6, songTitle: "Zen Garden", artist: "Peaceful Sounds", category: "Mind & Body Wellness", uploadedOn: "2025-07-10", fileName: "zen_garden.mp3", status: "Draft" },
    { id: 7, songTitle: "Night Sky", artist: "Dreamy Tunes", category: "Sleep", uploadedOn: "2025-07-09", fileName: "night_sky.mp3", status: "Uploaded" },
    { id: 8, songTitle: "Morning Bliss", artist: "Happy Vibes", category: "Movement", uploadedOn: "2025-07-08", fileName: "morning_bliss.mp3", status: "Draft" },
    { id: 9, songTitle: "Tranquil Waves", artist: "Ocean Sounds", category: "Mind & Body Wellness", uploadedOn: "2025-07-07", fileName: "tranquil_waves.mp3", status: "Uploaded" },
    { id: 10, songTitle: "Calm Evening", artist: "Relaxing Beats", category: "Sleep", uploadedOn: "2025-07-06", fileName: "calm_evening.mp3", status: "Draft" },
    { id: 11, songTitle: "Peaceful Morning", artist: "Nature Sounds", category: "Movement", uploadedOn: "2025-07-05", fileName: "peaceful_morning.mp3", status: "Uploaded" },
    { id: 12, songTitle: "Soothing Night", artist: "Calm Melodies", category: "Sleep", uploadedOn: "2025-07-04", fileName: "soothing_night.mp3", status: "Draft" },
    { id: 13, songTitle: "Relaxing Afternoon", artist: "Chill Beats", category: "Mind & Body Wellness", uploadedOn: "2025-07-03", fileName: "relaxing_afternoon.mp3", status: "Uploaded" },
  ];

  const [filteredDummyData, setFilteredDummyData] = useState(dummyData);

  useEffect(() => {
    if (categoryFilter === "") {
      const sortedResources = [...resources].sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );
      return setFilteredResources(sortedResources);
    }

    setSearchKey("");
    const matchResources = resources.filter(
      (resource) =>
        resource.category.toLowerCase() === categoryFilter.toLowerCase()
    ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setFilteredResources(matchResources);
  }, [categoryFilter, resources]);

  useEffect(() => {
    const sortedResources = [...resources].sort((a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
    );
    setFilteredResources(sortedResources);
  }, [resources]);

  // Updated useEffect to handle dummy data filtering by category
  useEffect(() => {
    if (searchKey === "" && categoryFilter === "") {
      setFilteredDummyData(dummyData);
      return;
    }

    let filteredData = dummyData;

    // Apply search filter
    if (searchKey !== "") {
      filteredData = filteredData.filter((resource) =>
        Object.values(resource)
          .join(" ")
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "") {
      filteredData = filteredData.filter((resource) =>
        resource.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredDummyData(filteredData);
  }, [searchKey, categoryFilter]);

  const exportContents = () => {
    exportData(
      filteredDummyData.map((resource) => ({
        title: resource.songTitle,
        artist: resource.artist || "N/A",
        category: resource.category || "N/A",
        uploadedOn: resource.uploadedOn,
        fileName: resource.fileName || resource.songTitle,
        status: resource.status,
      })),
      ["title", "artist", "category", "uploadedOn", "fileName", "status"],
      "music_library"
    );
  };

  const formatDate = (d) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const formatTime = (d) => {
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Nutrition": "bg-orange-100 text-orange-800",
      "Mind & Body Wellness": "bg-[#D2FFC9] text-[#008107]",
      "Movement": "bg-purple-100 text-purple-800",
      "Sleep": "bg-blue-100 text-blue-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const handleFilterSelect = (filter) => {
    setCategoryFilter(filter);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.filter-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-xl font-rubikMedium">Music Library</h3>

        <div className="flex my-4">
          <div className="w-3/5">
            <div className="bg-white border px-8 py-2 rounded-md">
              <input
                type="text"
                className="bg-[#1018280D] rounded-md w-full px-4 py-2"
                placeholder="Search songs by title, artist, or file name…"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
          </div>
          <div className="w-2/5 text-right">
            <button
              className="bg-weave-primary text-base-white p-2 px-4 mr-3 rounded-md font-rubikMedium"
              onClick={exportContents}
            >
              Export
              <i className="fa fa-window-maximize ml-2"></i>
            </button>
            
            {/* Updated Filter Dropdown */}
            <div className="relative inline-block filter-dropdown">
              <button 
                className="bg-white border border-gray-300 px-4 py-2 rounded-md font-rubikMedium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="flex items-center">
                  {categoryFilter !== "" ? categoryFilter : "Filter"}
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => handleFilterSelect("")}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                          categoryFilter === category ? "bg-blue-50 text-blue-600" : "text-gray-700"
                        }`}
                        onClick={() => handleFilterSelect(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-6 bg-gray-200 rounded w-full"
              ></div>
            ))}
          </div>
        ) : filteredDummyData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 max-w-[350px] mx-auto text-center">
            <Image
              src={growthFrame}
              className="w-[120px] h-auto mx-auto mb-4"
              alt="No songs uploaded"
            />
            <h4 className="text-lg font-rubikMedium mb-2">No songs uploaded yet.</h4>
            <p className="text-sm text-gray-500 mb-4">Add your first track to get started.</p>
            <Link href="?modal=add-music">
              <button className="bg-weave-primary text-white py-2 px-6 rounded-md font-rubikMedium">
                Add Song
              </button>
            </Link>
          </div>
        ) : (
          <PaginatedItems
            items={filteredDummyData}
            itemsPerPage={10}
            displayType="table"
            renderTitle={() => (
              <tr className="bg-[#f5f6fa]">
                <th className="text-left px-4">Song Title</th>
                <th className="text-left pl-12">Artist</th>
                <th className="text-left">Category</th>
                <th className="text-left">Uploaded On</th>
                <th className="text-left">File Name</th>
                <th className="text-left">Status</th>
                <th className="text-left"> </th>
              </tr>
            )}
            renderItems={(resource) => (
              <tr key={resource.id} className="py-4 border-b hover:bg-gray-50">
                <td className="text-left px-2 py-4">
                  <h6 className="font-rubikMedium text-black">
                    {resource.songTitle}
                  </h6>
                </td>
                <td className="text-sm pl-6 text-left py-4">{resource.artist}</td>
                <td className="text-sm text-left py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                    {resource.category}
                  </span>
                </td>
                <td className="text-sm text-left py-4">
                  <span className="block">{resource.uploadedOn}</span>
                </td>
                <td className="text-sm text-left py-4">{resource.fileName}</td>
                <td className="text-sm text-left py-4">
                  <button
                    className={`${resource.status.toLowerCase() === "uploaded"
                        ? "bg-[#28A745] text-base-white"
                        : "bg-[#B5B5B5]"
                      } px-4 rounded-full py-1 text-sm`}
                  >
                    {resource.status}
                  </button>
                </td>
                <td>
                  <button className="relative px-2 py-1 mr-8 dropdown">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>

                    <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px] dropdown-menu">
                      <div className="flex flex-col text-left">
                        <Link
                          href={`?modal=edit-music&resource_id=${resource.id}&contentType=Audio`}
                          className="px-3 py-1"
                        >
                          <i className="fa fa-pencil mr-2"></i> Edit Content
                        </Link>
                        <Link
                          href={`?modal=delete-music&resource_id=${resource.id}`}
                          className="text-red-500 px-3 py-1"
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

export default function Music() {
  return (
    <ResourceLibraryProvider>
      <MusicRender />
    </ResourceLibraryProvider>
  );
}