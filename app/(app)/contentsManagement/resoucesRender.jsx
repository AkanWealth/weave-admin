"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame.png";
import { LockKeyholeIcon, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ResourceLibraryProvider from "@/contexts/ResourceLibraryContext";
import api from "@/lib/api";
import { useToastContext } from "@/contexts/toast";

const ContentPillarsPage = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [pillars, setPillars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRefs = useRef({});
  const { showMessage } = useToastContext();

  useEffect(() => {
    fetchPillars();
  }, []);

  const fetchPillars = async () => {
    try {
      setLoading(true);

      // Fetch pillars
      const pillarsResponse = await api.get("/pillars");
      const pillarsData = pillarsResponse.data;

      // Fetch all resources
      const resourcesResponse = await api.get("/resource-library/resources");
      let resourcesData = [];
      if (resourcesResponse.data && resourcesResponse.data.resources && Array.isArray(resourcesResponse.data.resources)) {
        resourcesData = resourcesResponse.data.resources;
      } else if (Array.isArray(resourcesResponse.data)) {
        resourcesData = resourcesResponse.data;
      }

      // Transform pillars and calculate content items
      const transformedPillars = pillarsData.map((pillar, index) => {
        // Count resources for this pillar
        const contentCount = resourcesData.filter(
          (resource) => resource.pillar && resource.pillar.id === pillar.id
        ).length;

        return {
          id: pillar.id || `pillar-${index}`,
          title: pillar.name,
          description: pillar.description,
          icon: pillar.icon,
          coverImage: pillar.coverImage,
          color: getColorClass(index),
          iconBg: getIconBgClass(index),
          contentItems: contentCount,
          locked: pillar.locked,
        };
      });

      setPillars(transformedPillars);
      setError(null);
    } catch (err) {
      console.error("Error fetching pillars or resources:", err);
      setError("Failed to load pillars");
      showMessage({
        type: "error",
        text: "Failed to load pillars",
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to get default emoji based on pillar name
  const getDefaultEmoji = (pillarName) => {
    const name = pillarName.toLowerCase();
    if (name.includes('heart') || name.includes('cardio') || name.includes('fitness')) return '❤️';
    if (name.includes('leaf') || name.includes('nature') || name.includes('environment')) return '🍃';
    if (name.includes('apple') || name.includes('nutrition') || name.includes('food')) return '🍎';
    if (name.includes('brain') || name.includes('mental') || name.includes('mind')) return '🧠';
    if (name.includes('sun') || name.includes('energy') || name.includes('vitamin')) return '☀️';
    if (name.includes('star') || name.includes('goal') || name.includes('achievement')) return '⭐';
    if (name.includes('sleep') || name.includes('rest')) return '😴';
    if (name.includes('leadership') || name.includes('leader')) return '👑';
    if (name.includes('wellness') || name.includes('health')) return '💚';
    if (name.includes('strength') || name.includes('muscle')) return '💪';
    return '🔹';
  };

  // Function to check if URL is valid
  const isValidUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getColorClass = (index) => {
    const colors = ["bg-orange-100", "bg-purple-100", "bg-blue-100", "bg-green-100"];
    return colors[index % colors.length];
  };

  const getIconBgClass = (index) => {
    const backgrounds = ["bg-blue-200", "bg-purple-200", "bg-orange-200", "bg-green-200"];
    return backgrounds[index % backgrounds.length];
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedOutside = false;
        }
      });
      if (clickedOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (e) => {
    e.stopPropagation();
    setOpenDropdown(null);
  };

  // const handlePillarClick = (pillar) => {
  //   // Allow viewing content for both locked and unlocked pillars
  //   router.push(`/contentsManagement/pillars/${pillar.id}`);
  // };

  const handlePillarClick = (pillar) => {
  // Only navigate if pillar is not locked
  if (!pillar.locked) {
    router.push(`/contentsManagement/pillars/${pillar.id}`);
  } else {
    // Optional: Show a message or toast for locked pillars
    showMessage("info","This pillar is currently locked and cannot be accessed.","error");
  }
};

  const handleDropdownClick = (e, pillarId) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === pillarId ? null : pillarId);
  };

  const handleDeletePillar = async (pillar, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete the "${pillar.title}" pillar?`)) {
      try {
        await api.delete(`/pillars/${pillar.id}`);
        fetchPillars();
        showMessage({
          type: "success",
          text: `Pillar "${pillar.title}" deleted successfully`,
        });
      } catch (error) {
        console.error("Error deleting pillar:", error);
        showMessage({
          type: "error",
          text: "Failed to delete pillar. Please try again.",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl p-6 my-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
            <p className="text-gray-600">Loading pillars...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-4 animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl p-6 my-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
            <p className="text-red-600">{error}</p>
          </div>
          <button
            onClick={fetchPillars}
            className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 my-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
          <p className="text-gray-600">
            Manage your wellness pillars, subcategories, and learning content from one place. Click a card to begin.
          </p>
        </div>
        <Link
          href={"?modal=add-content-pillars"}
          className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium"
        >
          Add Pillar
        </Link>
      </div>

      {pillars.length === 0 ? (
        <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
          <Image
            src={growthFrame}
            className="w-[80px] h-[120px] mx-auto"
            alt="Frame"
          />
          <h4 className="text-xl font-rubikMedium my-2">
            No Pillars Yet
          </h4>
          <p className="text-md my-2">
            Create your first content pillar to get started with organizing your wellness content.
          </p>
          <div className="">
            <Link
              href={"?modal=add-content-pillars"}
              className="bg-weave-primary py-2 px-6 text-white rounded-md inline-block"
            >
              Add New Pillar
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className={`bg-white rounded-lg p-4 transition-shadow relative cursor-pointer hover:shadow-md`}
              onClick={() => handlePillarClick(pillar)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center p-2`}>
                  {pillar.icon && isValidUrl(pillar.icon) ? (
                    <Image
                      src={pillar.icon}
                      alt={pillar.title}
                      width={32}
                      height={32}
                      className="object-contain rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span 
                    className="text-2xl flex items-center justify-center" 
                    style={{ 
                      display: (pillar.icon && isValidUrl(pillar.icon)) ? 'none' : 'flex' 
                    }}
                  >
                    {getDefaultEmoji(pillar.title)}
                  </span>
                </div>
                
                {/* Lock icon - only show when pillar is locked */}
                {pillar.locked && (
                  <div className="text-amber-600 flex items-center rounded-full p-2 bg-amber-100">
                    <LockKeyholeIcon className="w-5 h-5" />
                  </div>
                )}
              </div>

              <h4 className="font-rubikMedium text-lg mb-2">
                {pillar.title}
               
              </h4>
              <p className="text-sm mb-3 text-gray-600">
                {pillar.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Content Items: <span className="font-medium rounded-full px-2 py-1 text-xs bg-blue-200">
                    {pillar.contentItems}
                  </span>
                </span>

                <div
                  className="relative"
                  ref={(el) => (dropdownRefs.current[pillar.id] = el)}
                >
                  <button
                    className="p-1 rounded-full transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    onClick={(e) => handleDropdownClick(e, pillar.id)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>

                  {openDropdown === pillar.id && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                      <div className="py-1">
                        <Link
                          href={`?modal=view-content-pillars&id=${pillar.id}`}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={handleLinkClick}
                        >
                          <Eye className="w-4 h-4 mr-3" />
                          View Pillar
                        </Link>
                        
                        
                            <Link
                              href={`?modal=edit-content-pillars&id=${pillar.id}`}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={handleLinkClick}
                            >
                              <Edit className="w-4 h-4 mr-3" />
                              Edit Pillar
                            </Link>
                            <Link
                              href={`?modal=delete-pillars&id=${pillar.id}`}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              onClick={handleLinkClick}
                            >
                              <Trash2 className="w-4 h-4 mr-3" />
                              Delete Pillar
                            </Link>
                          
                      
                        

                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function ResourcesRender() {
  return <ContentPillarsPage />;
}

export default function Resources() {
  return (
    <ResourceLibraryProvider>
      <ResourcesRender />
    </ResourceLibraryProvider>
  );
}