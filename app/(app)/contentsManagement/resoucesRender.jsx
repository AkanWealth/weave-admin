// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import growthFrame from "@/assets/images/Frame.png";
// import pillarIcon from "@/assets/images/brain3.png";
// import peopleIcon from "@/assets/images/TwoHuman.png";
// import Link from "next/link";
// import ResourceLibraryProvider, {
//   useResourceLibrary,
// } from "@/contexts/ResourceLibraryContext";
// import exportData from "@/lib/export";
// import PaginatedItems from "@/components/elements/Pagination";
// import DateRender from "@/components/elements/DateRender";
// import { ArrowLeft, LockKeyholeIcon } from "lucide-react";

// // Content Pillars Component
// const ContentPillarsPage = ({ onPillarSelect }) => {
//   const pillars = [
//     {
//       id: 'sleep',
//       title: 'Sleep',
//       description: 'Rest and prepare for restful sleep',
//       icon: '😴',
//       color: 'bg-orange-100',
//       iconBg: 'bg-blue-200',
//       contentItems: 17
//     },
//     {
//       id: 'mind-body-wellness',
//       title: 'Mind/Body Wellness',
//       description: 'Mind-body wellness practices',
//       icon: '💜',
//       color: 'bg-purple-100',
//       iconBg: 'bg-purple-200',
//       contentItems: 17
//     },
//     {
//       id: 'nutrition',
//       title: 'Nutrition',
//       description: 'Healthy eating and nutrition tips',
//       icon: '🍟',
//       color: 'bg-orange-100',
//       iconBg: 'bg-orange-200',
//       contentItems: 0
//     },
//     {
//       id: 'movement',
//       title: 'Movement',
//       description: 'Daily physical activity and mobility',
//       icon: '🏃‍♂️',
//       color: 'bg-blue-100',
//       iconBg: 'bg-blue-200',
//       contentItems: 0
//     }
//   ];

//   const handlePillarClick = (pillar) => {
//     if (onPillarSelect) {
//       onPillarSelect(pillar);
//     }
//   };

//   return (
//     <div className="rounded-2xl p-6 my-4">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
//           <p className="text-gray-600">
//             Manage your wellness pillars, subcategories, and learning content from one place. Click a card to begin.
//           </p>
//         </div>
//         <button className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium">
//           Add Pillar
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {pillars.map((pillar) => (
//           <div
//             key={pillar.id}
//             className={`bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow`}
//             onClick={() => handlePillarClick(pillar)}
//           >
//             <div className="flex items-center justify-between mb-3">
//               <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center text-3xl`}>
//                 {pillar.icon}
//               </div>
//               <div className="text-gray-500 flex items-center rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
//                 <LockKeyholeIcon className="w-5 h-5 text-gray-500" />
//               </div>
//             </div>

//             <h4 className="font-rubikMedium text-lg mb-2">{pillar.title}</h4>
//             <p className="text-sm text-gray-600 mb-3">{pillar.description}</p>

//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-500">
//                 Content Items: <span className="font-medium bg-blue-200 rounded-full p-2">{pillar.contentItems}</span>
//               </span>
//               <button className="text-gray-500 hover:text-gray-700">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Pillar Detail Page Component
// const PillarDetailPage = ({ pillar, onBackToPillars }) => {
//   const [filteredResources, setFilteredResources] = useState([]);
//   const [searchKey, setSearchKey] = useState("");
//   const { resources, isLoading } = useResourceLibrary();
//   const resourceTypes = ["Article", "Video", "Audio"];
//   const [resourceFilter, setResourceFilter] = useState("");

//   useEffect(() => {
//     if (resourceFilter === "") {
//       // Sort resources by created_at date in descending order (newest first)
//       const sortedResources = [...resources].sort((a, b) => 
//         new Date(b.created_at) - new Date(a.created_at)
//       );
//       return setFilteredResources(sortedResources);
//     }

//     setSearchKey("");
//     const matchResources = resources.filter(
//       (resource) =>
//         resource.resourceType.toLowerCase() === resourceFilter.toLowerCase()
//     ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort filtered resources

//     setFilteredResources(matchResources);
//   }, [resourceFilter, resources]);

//   useEffect(() => {
//     // Sort resources by created_at date in descending order (newest first)
//     const sortedResources = [...resources].sort((a, b) => 
//       new Date(b.created_at) - new Date(a.created_at)
//     );

//     setFilteredResources(sortedResources);
//   }, [resources]);

//   useEffect(() => {
//     if (searchKey === "") return;

//     const matchResources = resources.filter((resource) =>
//       Object.values(resource)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchKey.toLowerCase())
//     ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort search results

//     setFilteredResources(matchResources);
//   }, [searchKey]);

//   const exportContents = () => {
//     exportData(
//       filteredResources.map((resource) => ({
//         title: resource.title,
//         tags: resource.tags.join(", ").replace(/,/g, " & "),
//         resourceType: resource.resourceType,
//         date_created: resource.created_at,
//         status: resource.status,
//       })),
//       ["title", "tags", "resourceType", "date_created", "status"],
//       "resources"
//     );
//   };

//   const formatDate = (d) => {
//     return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
//   };

//   const formatTime = (d) => {
//     return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() >= 12 ? 'PM' : 'AM'}`; // Fixed AM/PM logic
//   };

//   return (
//     <div>
//       {/* Header with Back Button and Pillar Info */}
//       <div className="mb-6">
//         <button
//           onClick={onBackToPillars}
//           className="px-4 py-2 text-sm text-weave-primary border border-weave-primary rounded-md font-rubikMedium flex items-center mb-4"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Pillars
//         </button>

//         <div className="flex items-center mb-4">
//           <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center text-3xl mr-4`}>
//             {pillar.icon}
//           </div>
//           <div>
//             <h2 className="text-2xl font-rubikMedium">{pillar.title}</h2>
//             <p className="text-gray-600">{pillar.description}</p>
//           </div>
//         </div>
//       </div>

//       {/* Add New Content Button */}
//       <div className="mb-6">
//         <button className="px-6 py-2 bg-weave-primary text-white rounded-md font-rubikMedium">
//           Add New Content
//         </button>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="flex my-4">
//         <div className="w-3/5">
//           <div className="bg-white border px-8 py-2 rounded-md">
//             <input
//               type="text"
//               className="bg-[#f5f6fa] rounded-md w-full px-4 py-2"
//               placeholder="Search here"
//               value={searchKey}
//               onChange={(e) => setSearchKey(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="w-2/5 text-right">
//           <button
//             className="bg-weave-primary text-base-white p-2 px-4 mr-3 rounded-md font-rubikMedium"
//             onClick={exportContents}
//           >
//             Export
//             <i className="fa fa-window-maximize ml-2"></i>
//           </button>
//           <button className="relative dropdown border p-2 rounded-md font-rubikMedium">
//             <span className="px-2">
//               {resourceFilter !== "" ? (
//                 resourceFilter
//               ) : (
//                 <>
//                   Filter
//                   <i className="fa fa-list ml-2"></i>
//                 </>
//               )}
//             </span>
//             <div className="absolute right-0 rounded-md p-1 shadow bg-white text-xs w-[200px] dropdown-menu">
//               <div className="flex flex-col text-left">
//                 <a
//                   className={`p-2 capitalize rounded-md mb-1 cursor-pointer hover:bg-gray-100`}
//                   onClick={() => setResourceFilter("")}
//                 >
//                   Reset Filter
//                 </a>
//                 {resourceTypes.map((typ) => (
//                   <a
//                     className={`p-2 capitalize rounded-md mb-1 cursor-pointer hover:bg-gray-100 ${
//                       resourceFilter === typ ? "bg-gray-200" : ""
//                     }`}
//                     onClick={() => setResourceFilter(typ)}
//                     key={typ}
//                   >
//                     {typ}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Resources Table */}
//       <div className="rounded-2xl bg-white p-4 my-4">
//         <h3 className="text-xl font-rubikMedium mb-4">
//           {pillar.title} Resources
//         </h3>

//         {isLoading ? (
//           <>
//             {/* Table Rows Placeholder */}
//             <div className="space-y-2">
//               {[...Array(5)].map((_, index) => (
//                 <div
//                   key={index}
//                   className="h-6 bg-gray-200 rounded w-full"
//                 ></div>
//               ))}
//             </div>
//           </>
//         ) : resources && filteredResources.length === 0 ? (
//           <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
//             <Image
//               src={growthFrame}
//               className="w-[80px] h-[120px] mx-auto"
//               alt="Frame"
//             />
//             <h4 className="text-xl font-rubikMedium my-2">
//               No {pillar.title} Resources Yet
//             </h4>
//             <p className="text-md my-2">
//               There are no resources in this pillar yet. Add articles, videos, or audio content to get started.
//             </p>
//             <div className="">
//               <button className="bg-weave-primary py-2 px-6 text-white rounded-md">
//                 Add New Content
//               </button>
//             </div>
//           </div>
//         ) : (
//           <PaginatedItems
//             items={filteredResources}
//             itemsPerPage={10}
//             displayType={"table"}
//             renderTitle={() => (
//               <tr className="bg-[#f5f6fa]">
//                 <th className="text-left px-4">Title</th>
//                 <th className="text-left pl-12">Tags</th>
//                 <th>Type</th>
//                 <th>Date Created</th>
//                 <th>Status</th>
//                 <th></th>
//               </tr>
//             )}
//             renderItems={(resource) => (
//               <tr key={resource.id}>
//                 <td className="text-left px-2">
//                   <h6 className="font-rubikMedium text-black">
//                     {resource.title}
//                   </h6>
//                 </td>
//                 <td className="text-xs pl-6 text-left">
//                   {resource.tags.map((tag) => (
//                     <span key={tag} className="tag m-1">
//                       {tag}
//                     </span>
//                   ))}
//                 </td>
//                 <td>{resource.resourceType}</td>
//                 <td>
//                   <span className="block">{formatDate(new Date(resource.created_at))}</span>
//                   <span className="block">{formatTime(new Date(resource.created_at))}</span>
//                 </td>
//                 <td>
//                   <button
//                     className={`${
//                       resource.status.toLowerCase() === "published"
//                         ? "bg-[#28A745] text-base-white"
//                         : "bg-[#B5B5B5]"
//                     } px-4 rounded-full py-1 text-sm`}
//                   >
//                     {resource.status}
//                   </button>
//                 </td>
//                 <td>
//                   <button className="relative px-2 py-1 mr-8 dropdown">
//                     <div className="dot"></div>
//                     <div className="dot"></div>
//                     <div className="dot"></div>

//                     <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px] dropdown-menu">
//                       <div className="flex flex-col text-left">
//                         <Link
//                           href={`?modal=edit-resource&resource_id=${resource.id}&contentType=${resource.resourceType}`}
//                           className="px-3 py-1 hover:bg-gray-100"
//                         >
//                           <i className="fa fa-pencil mr-2"></i> Edit Content
//                         </Link>
//                         <Link
//                           href={`?modal=delete-resource&resource_id=${resource.id}`}
//                           className="text-red-500 px-3 py-1 hover:bg-gray-100"
//                         >
//                           <i className="fa fa-trash mr-2"></i> Delete
//                         </Link>
//                       </div>
//                     </div>
//                   </button>
//                 </td>
//               </tr>
//             )}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// // Main Resources Component with Navigation Logic
// function ResourcesRender() {
//   const [currentView, setCurrentView] = useState('pillars'); // 'pillars' or 'pillar-detail'
//   const [selectedPillar, setSelectedPillar] = useState(null);

//   const handlePillarSelect = (pillar) => {
//     setSelectedPillar(pillar);
//     setCurrentView('pillar-detail');
//   };

//   const handleBackToPillars = () => {
//     setCurrentView('pillars');
//     setSelectedPillar(null);
//   };

//   return (
//     <>
//       {currentView === 'pillars' && (
//         <ContentPillarsPage onPillarSelect={handlePillarSelect} />
//       )}

//       {currentView === 'pillar-detail' && selectedPillar && (
//         <PillarDetailPage 
//           pillar={selectedPillar} 
//           onBackToPillars={handleBackToPillars} 
//         />
//       )}
//     </>
//   );
// }

// export default function Resources() {
//   return (
//     <ResourceLibraryProvider>
//       <ResourcesRender />
//     </ResourceLibraryProvider>
//   );
// }


"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame.png";
import pillarIcon from "@/assets/images/brain3.png";
import peopleIcon from "@/assets/images/TwoHuman.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ResourceLibraryProvider, {
  useResourceLibrary,
} from "@/contexts/ResourceLibraryContext";
import { LockKeyholeIcon, Eye, Edit, Trash2 } from "lucide-react";

// Content Pillars Component (Updated to navigate to separate page)
const ContentPillarsPage = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const pillars = [
    {
      id: 'sleep',
      title: 'Sleep',
      description: 'Rest and prepare for restful sleep',
      icon: '😴',
      color: 'bg-orange-100',
      iconBg: 'bg-blue-200',
      contentItems: 17
    },
    {
      id: 'mind-body-wellness',
      title: 'Mind/Body Wellness',
      description: 'Mind-body wellness practices',
      icon: '💜',
      color: 'bg-purple-100',
      iconBg: 'bg-purple-200',
      contentItems: 17
    },
    {
      id: 'nutrition',
      title: 'Nutrition',
      description: 'Healthy eating and nutrition tips',
      icon: '🍟',
      color: 'bg-orange-100',
      iconBg: 'bg-orange-200',
      contentItems: 0
    },
    {
      id: 'movement',
      title: 'Movement',
      description: 'Daily physical activity and mobility',
      icon: '🏃‍♂️',
      color: 'bg-blue-100',
      iconBg: 'bg-blue-200',
      contentItems: 0
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePillarClick = (pillar) => {
    // Navigate to separate pillar detail page
    router.push(`/contentsManagement/pillars/${pillar.id}`);
  };

  const handleDropdownClick = (e, pillarId) => {
    e.stopPropagation(); // Prevent card click
    setOpenDropdown(openDropdown === pillarId ? null : pillarId);
  };

  const handleMenuAction = (action, pillar, e) => {
    e.stopPropagation(); // Prevent card click
    setOpenDropdown(null); // Close dropdown
    
    switch (action) {
      case 'view':
        router.push(`/contentsManagement/pillars/${pillar.id}`);
        break;
      case 'edit':
        // Navigate to edit page or open edit modal
        router.push(`/contentsManagement/pillars/${pillar.id}/edit`);
        // Or you could open a modal: setEditModal(pillar);
        break;
      case 'delete':
        // Show confirmation dialog
        if (window.confirm(`Are you sure you want to delete the "${pillar.title}" pillar?`)) {
          // Handle delete logic here
          console.log(`Deleting pillar: ${pillar.title}`);
          // You can call your delete API here
        }
        break;
      default:
        break;
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className={`bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow relative`}
            onClick={() => handlePillarClick(pillar)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center text-3xl`}>
                {pillar.icon}
              </div>
              <div className="text-gray-500 flex items-center rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                <LockKeyholeIcon className="w-5 h-5 text-gray-500" />
              </div>
            </div>

            <h4 className="font-rubikMedium text-lg mb-2">{pillar.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{pillar.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Content Items: <span className="font-medium bg-blue-200 rounded-full p-2">{pillar.contentItems}</span>
              </span>
              
              {/* Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={(e) => handleDropdownClick(e, pillar.id)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>

                {/* Dropdown Content */}
                {openDropdown === pillar.id && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <Link
                        href={"?modal=view-content-pillars"}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-3" />
                        View Pillar
                      </Link>
                      <Link
                        href={"?modal=edit-content-pillars"}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-3" />
                        Edit Pillar
                      </Link>
                      <Link
                        href={"?modal=delete-pillars"}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
    </div>
  );
};

// Main Resources Component - Only shows pillars now
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