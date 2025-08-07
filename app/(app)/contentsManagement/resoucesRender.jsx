// // import React, { useEffect, useState } from "react";
// // import Image from "next/image";
// // import growthFrame from "@/assets/images/Frame.png";
// // import pillarIcon from "@/assets/images/brain3.png";
// // import peopleIcon from "@/assets/images/TwoHuman.png";
// // import Link from "next/link";
// // import ResourceLibraryProvider, {
// //   useResourceLibrary,
// // } from "@/contexts/ResourceLibraryContext";
// // import exportData from "@/lib/export";
// // import PaginatedItems from "@/components/elements/Pagination";
// // import DateRender from "@/components/elements/DateRender";
// // import { ArrowLeft, LockKeyholeIcon } from "lucide-react";

// // // Content Pillars Component
// // const ContentPillarsPage = ({ onPillarSelect }) => {
// //   const pillars = [
// //     {
// //       id: 'sleep',
// //       title: 'Sleep',
// //       description: 'Rest and prepare for restful sleep',
// //       icon: '😴',
// //       color: 'bg-orange-100',
// //       iconBg: 'bg-blue-200',
// //       contentItems: 17
// //     },
// //     {
// //       id: 'mind-body-wellness',
// //       title: 'Mind/Body Wellness',
// //       description: 'Mind-body wellness practices',
// //       icon: '💜',
// //       color: 'bg-purple-100',
// //       iconBg: 'bg-purple-200',
// //       contentItems: 17
// //     },
// //     {
// //       id: 'nutrition',
// //       title: 'Nutrition',
// //       description: 'Healthy eating and nutrition tips',
// //       icon: '🍟',
// //       color: 'bg-orange-100',
// //       iconBg: 'bg-orange-200',
// //       contentItems: 0
// //     },
// //     {
// //       id: 'movement',
// //       title: 'Movement',
// //       description: 'Daily physical activity and mobility',
// //       icon: '🏃‍♂️',
// //       color: 'bg-blue-100',
// //       iconBg: 'bg-blue-200',
// //       contentItems: 0
// //     }
// //   ];

// //   const handlePillarClick = (pillar) => {
// //     if (onPillarSelect) {
// //       onPillarSelect(pillar);
// //     }
// //   };

// //   return (
// //     <div className="rounded-2xl p-6 my-4">
// //       <div className="flex items-center justify-between mb-6">
// //         <div>
// //           <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
// //           <p className="text-gray-600">
// //             Manage your wellness pillars, subcategories, and learning content from one place. Click a card to begin.
// //           </p>
// //         </div>
// //         <button className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium">
// //           Add Pillar
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {pillars.map((pillar) => (
// //           <div
// //             key={pillar.id}
// //             className={`bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow`}
// //             onClick={() => handlePillarClick(pillar)}
// //           >
// //             <div className="flex items-center justify-between mb-3">
// //               <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center text-3xl`}>
// //                 {pillar.icon}
// //               </div>
// //               <div className="text-gray-500 flex items-center rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
// //                 <LockKeyholeIcon className="w-5 h-5 text-gray-500" />
// //               </div>
// //             </div>

// //             <h4 className="font-rubikMedium text-lg mb-2">{pillar.title}</h4>
// //             <p className="text-sm text-gray-600 mb-3">{pillar.description}</p>

// //             <div className="flex items-center justify-between">
// //               <span className="text-sm text-gray-500">
// //                 Content Items: <span className="font-medium bg-blue-200 rounded-full p-2">{pillar.contentItems}</span>
// //               </span>
// //               <button className="text-gray-500 hover:text-gray-700">
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // // Pillar Detail Page Component
// // const PillarDetailPage = ({ pillar, onBackToPillars }) => {
// //   const [filteredResources, setFilteredResources] = useState([]);
// //   const [searchKey, setSearchKey] = useState("");
// //   const { resources, isLoading } = useResourceLibrary();
// //   const resourceTypes = ["Article", "Video", "Audio"];
// //   const [resourceFilter, setResourceFilter] = useState("");

// //   useEffect(() => {
// //     if (resourceFilter === "") {
// //       // Sort resources by created_at date in descending order (newest first)
// //       const sortedResources = [...resources].sort((a, b) => 
// //         new Date(b.created_at) - new Date(a.created_at)
// //       );
// //       return setFilteredResources(sortedResources);
// //     }

// //     setSearchKey("");
// //     const matchResources = resources.filter(
// //       (resource) =>
// //         resource.resourceType.toLowerCase() === resourceFilter.toLowerCase()
// //     ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort filtered resources

// //     setFilteredResources(matchResources);
// //   }, [resourceFilter, resources]);

// //   useEffect(() => {
// //     // Sort resources by created_at date in descending order (newest first)
// //     const sortedResources = [...resources].sort((a, b) => 
// //       new Date(b.created_at) - new Date(a.created_at)
// //     );

// //     setFilteredResources(sortedResources);
// //   }, [resources]);

// //   useEffect(() => {
// //     if (searchKey === "") return;

// //     const matchResources = resources.filter((resource) =>
// //       Object.values(resource)
// //         .join(" ")
// //         .toLowerCase()
// //         .includes(searchKey.toLowerCase())
// //     ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort search results

// //     setFilteredResources(matchResources);
// //   }, [searchKey]);

// //   const exportContents = () => {
// //     exportData(
// //       filteredResources.map((resource) => ({
// //         title: resource.title,
// //         tags: resource.tags.join(", ").replace(/,/g, " & "),
// //         resourceType: resource.resourceType,
// //         date_created: resource.created_at,
// //         status: resource.status,
// //       })),
// //       ["title", "tags", "resourceType", "date_created", "status"],
// //       "resources"
// //     );
// //   };

// //   const formatDate = (d) => {
// //     return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
// //   };

// //   const formatTime = (d) => {
// //     return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() >= 12 ? 'PM' : 'AM'}`; // Fixed AM/PM logic
// //   };

// //   return (
// //     <div>
// //       {/* Header with Back Button and Pillar Info */}
// //       <div className="mb-6">
// //         <button
// //           onClick={onBackToPillars}
// //           className="px-4 py-2 text-sm text-weave-primary border border-weave-primary rounded-md font-rubikMedium flex items-center mb-4"
// //         >
// //           <ArrowLeft className="w-4 h-4 mr-2" />
// //           Back to Pillars
// //         </button>

// //         <div className="flex items-center mb-4">
// //           <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center text-3xl mr-4`}>
// //             {pillar.icon}
// //           </div>
// //           <div>
// //             <h2 className="text-2xl font-rubikMedium">{pillar.title}</h2>
// //             <p className="text-gray-600">{pillar.description}</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Add New Content Button */}
// //       <div className="mb-6">
// //         <button className="px-6 py-2 bg-weave-primary text-white rounded-md font-rubikMedium">
// //           Add New Content
// //         </button>
// //       </div>

// //       {/* Search and Filter Section */}
// //       <div className="flex my-4">
// //         <div className="w-3/5">
// //           <div className="bg-white border px-8 py-2 rounded-md">
// //             <input
// //               type="text"
// //               className="bg-[#f5f6fa] rounded-md w-full px-4 py-2"
// //               placeholder="Search here"
// //               value={searchKey}
// //               onChange={(e) => setSearchKey(e.target.value)}
// //             />
// //           </div>
// //         </div>
// //         <div className="w-2/5 text-right">
// //           <button
// //             className="bg-weave-primary text-base-white p-2 px-4 mr-3 rounded-md font-rubikMedium"
// //             onClick={exportContents}
// //           >
// //             Export
// //             <i className="fa fa-window-maximize ml-2"></i>
// //           </button>
// //           <button className="relative dropdown border p-2 rounded-md font-rubikMedium">
// //             <span className="px-2">
// //               {resourceFilter !== "" ? (
// //                 resourceFilter
// //               ) : (
// //                 <>
// //                   Filter
// //                   <i className="fa fa-list ml-2"></i>
// //                 </>
// //               )}
// //             </span>
// //             <div className="absolute right-0 rounded-md p-1 shadow bg-white text-xs w-[200px] dropdown-menu">
// //               <div className="flex flex-col text-left">
// //                 <a
// //                   className={`p-2 capitalize rounded-md mb-1 cursor-pointer hover:bg-gray-100`}
// //                   onClick={() => setResourceFilter("")}
// //                 >
// //                   Reset Filter
// //                 </a>
// //                 {resourceTypes.map((typ) => (
// //                   <a
// //                     className={`p-2 capitalize rounded-md mb-1 cursor-pointer hover:bg-gray-100 ${
// //                       resourceFilter === typ ? "bg-gray-200" : ""
// //                     }`}
// //                     onClick={() => setResourceFilter(typ)}
// //                     key={typ}
// //                   >
// //                     {typ}
// //                   </a>
// //                 ))}
// //               </div>
// //             </div>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Resources Table */}
// //       <div className="rounded-2xl bg-white p-4 my-4">
// //         <h3 className="text-xl font-rubikMedium mb-4">
// //           {pillar.title} Resources
// //         </h3>

// //         {isLoading ? (
// //           <>
// //             {/* Table Rows Placeholder */}
// //             <div className="space-y-2">
// //               {[...Array(5)].map((_, index) => (
// //                 <div
// //                   key={index}
// //                   className="h-6 bg-gray-200 rounded w-full"
// //                 ></div>
// //               ))}
// //             </div>
// //           </>
// //         ) : resources && filteredResources.length === 0 ? (
// //           <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
// //             <Image
// //               src={growthFrame}
// //               className="w-[80px] h-[120px] mx-auto"
// //               alt="Frame"
// //             />
// //             <h4 className="text-xl font-rubikMedium my-2">
// //               No {pillar.title} Resources Yet
// //             </h4>
// //             <p className="text-md my-2">
// //               There are no resources in this pillar yet. Add articles, videos, or audio content to get started.
// //             </p>
// //             <div className="">
// //               <button className="bg-weave-primary py-2 px-6 text-white rounded-md">
// //                 Add New Content
// //               </button>
// //             </div>
// //           </div>
// //         ) : (
// //           <PaginatedItems
// //             items={filteredResources}
// //             itemsPerPage={10}
// //             displayType={"table"}
// //             renderTitle={() => (
// //               <tr className="bg-[#f5f6fa]">
// //                 <th className="text-left px-4">Title</th>
// //                 <th className="text-left pl-12">Tags</th>
// //                 <th>Type</th>
// //                 <th>Date Created</th>
// //                 <th>Status</th>
// //                 <th></th>
// //               </tr>
// //             )}
// //             renderItems={(resource) => (
// //               <tr key={resource.id}>
// //                 <td className="text-left px-2">
// //                   <h6 className="font-rubikMedium text-black">
// //                     {resource.title}
// //                   </h6>
// //                 </td>
// //                 <td className="text-xs pl-6 text-left">
// //                   {resource.tags.map((tag) => (
// //                     <span key={tag} className="tag m-1">
// //                       {tag}
// //                     </span>
// //                   ))}
// //                 </td>
// //                 <td>{resource.resourceType}</td>
// //                 <td>
// //                   <span className="block">{formatDate(new Date(resource.created_at))}</span>
// //                   <span className="block">{formatTime(new Date(resource.created_at))}</span>
// //                 </td>
// //                 <td>
// //                   <button
// //                     className={`${
// //                       resource.status.toLowerCase() === "published"
// //                         ? "bg-[#28A745] text-base-white"
// //                         : "bg-[#B5B5B5]"
// //                     } px-4 rounded-full py-1 text-sm`}
// //                   >
// //                     {resource.status}
// //                   </button>
// //                 </td>
// //                 <td>
// //                   <button className="relative px-2 py-1 mr-8 dropdown">
// //                     <div className="dot"></div>
// //                     <div className="dot"></div>
// //                     <div className="dot"></div>

// //                     <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px] dropdown-menu">
// //                       <div className="flex flex-col text-left">
// //                         <Link
// //                           href={`?modal=edit-resource&resource_id=${resource.id}&contentType=${resource.resourceType}`}
// //                           className="px-3 py-1 hover:bg-gray-100"
// //                         >
// //                           <i className="fa fa-pencil mr-2"></i> Edit Content
// //                         </Link>
// //                         <Link
// //                           href={`?modal=delete-resource&resource_id=${resource.id}`}
// //                           className="text-red-500 px-3 py-1 hover:bg-gray-100"
// //                         >
// //                           <i className="fa fa-trash mr-2"></i> Delete
// //                         </Link>
// //                       </div>
// //                     </div>
// //                   </button>
// //                 </td>
// //               </tr>
// //             )}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // // Main Resources Component with Navigation Logic
// // function ResourcesRender() {
// //   const [currentView, setCurrentView] = useState('pillars'); // 'pillars' or 'pillar-detail'
// //   const [selectedPillar, setSelectedPillar] = useState(null);

// //   const handlePillarSelect = (pillar) => {
// //     setSelectedPillar(pillar);
// //     setCurrentView('pillar-detail');
// //   };

// //   const handleBackToPillars = () => {
// //     setCurrentView('pillars');
// //     setSelectedPillar(null);
// //   };

// //   return (
// //     <>
// //       {currentView === 'pillars' && (
// //         <ContentPillarsPage onPillarSelect={handlePillarSelect} />
// //       )}

// //       {currentView === 'pillar-detail' && selectedPillar && (
// //         <PillarDetailPage 
// //           pillar={selectedPillar} 
// //           onBackToPillars={handleBackToPillars} 
// //         />
// //       )}
// //     </>
// //   );
// // }

// // export default function Resources() {
// //   return (
// //     <ResourceLibraryProvider>
// //       <ResourcesRender />
// //     </ResourceLibraryProvider>
// //   );
// // }


// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import growthFrame from "@/assets/images/Frame.png";
// import pillarIcon from "@/assets/images/brain3.png";
// import peopleIcon from "@/assets/images/TwoHuman.png";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import ResourceLibraryProvider, {
//   useResourceLibrary,
// } from "@/contexts/ResourceLibraryContext";
// import { LockKeyholeIcon, Eye, Edit, Trash2 } from "lucide-react";

// // Content Pillars Component (Updated to navigate to separate page)
// const ContentPillarsPage = () => {
//   const router = useRouter();
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const dropdownRef = useRef(null);

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

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handlePillarClick = (pillar) => {
//     // Navigate to separate pillar detail page
//     router.push(`/contentsManagement/pillars/${pillar.id}`);
//   };

//   const handleDropdownClick = (e, pillarId) => {
//     e.stopPropagation(); // Prevent card click
//     setOpenDropdown(openDropdown === pillarId ? null : pillarId);
//   };

//   const handleMenuAction = (action, pillar, e) => {
//     e.stopPropagation(); // Prevent card click
//     setOpenDropdown(null); // Close dropdown

//     switch (action) {
//       case 'view':
//         router.push(`/contentsManagement/pillars/${pillar.id}`);
//         break;
//       case 'edit':
//         // Navigate to edit page or open edit modal
//         router.push(`/contentsManagement/pillars/${pillar.id}/edit`);
//         // Or you could open a modal: setEditModal(pillar);
//         break;
//       case 'delete':
//         // Show confirmation dialog
//         if (window.confirm(`Are you sure you want to delete the "${pillar.title}" pillar?`)) {
//           // Handle delete logic here
//           console.log(`Deleting pillar: ${pillar.title}`);
//           // You can call your delete API here
//         }
//         break;
//       default:
//         break;
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
//         <Link
//           href={"?modal=add-content-pillars"}
//           className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium"
//         >
//           Add Pillar
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {pillars.map((pillar) => (
//           <div
//             key={pillar.id}
//             className={`bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow relative`}
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

//               {/* Dropdown Menu */}
//               <div className="relative" ref={dropdownRef}>
//                 <button 
//                   className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
//                   onClick={(e) => handleDropdownClick(e, pillar.id)}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                   </svg>
//                 </button>

//                 {/* Dropdown Content */}
//                 {openDropdown === pillar.id && (
//                   <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
//                     <div className="py-1">
//                       <Link
//                         href={"?modal=view-content-pillars"}
//                         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                       >
//                         <Eye className="w-4 h-4 mr-3" />
//                         View Pillar
//                       </Link>
//                       <Link
//                         href={"?modal=edit-content-pillars"}
//                         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                       >
//                         <Edit className="w-4 h-4 mr-3" />
//                         Edit Pillar
//                       </Link>
//                       <Link
//                         href={"?modal=delete-pillars"}
//                         className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4 mr-3" />
//                         Delete Pillar
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Main Resources Component - Only shows pillars now
// function ResourcesRender() {
//   return <ContentPillarsPage />;
// }

// export default function Resources() {
//   return (
//     <ResourceLibraryProvider>
//       <ResourcesRender />
//     </ResourceLibraryProvider>
//   );
// }



// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import growthFrame from "@/assets/images/Frame.png";
// import pillarIcon from "@/assets/images/brain3.png";
// import peopleIcon from "@/assets/images/TwoHuman.png";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import ResourceLibraryProvider, {
//   useResourceLibrary,
// } from "@/contexts/ResourceLibraryContext";
// import { LockKeyholeIcon, Eye, Edit, Trash2 } from "lucide-react";
// import api from "@/lib/api"; // Assuming you have an API utility

// // Content Pillars Component with API Integration
// const ContentPillarsPage = () => {
//   const router = useRouter();
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [pillars, setPillars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dropdownRef = useRef(null);

//   // Fetch pillars from API
//   useEffect(() => {
//     fetchPillars();
//   }, []);

//   const fetchPillars = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/api/pillars");

//       // Transform API data to match component structure
//       const transformedPillars = response.data.map((pillar, index) => ({
//         id: pillar.id || `pillar-${index}`,
//         title: pillar.name,
//         description: pillar.description,
//         icon: getIconEmoji(pillar.icon), // Convert icon string to emoji
//         color: getColorClass(index), // Assign colors based on index
//         iconBg: getIconBgClass(index), // Assign icon backgrounds
//         contentItems: pillar.contentItems || 0, // Assuming this comes from API
//         locked: pillar.locked
//       }));

//       setPillars(transformedPillars);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching pillars:', err);
//       setError('Failed to load pillars');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to convert icon string to emoji
//   const getIconEmoji = (iconName) => {
//     const iconMap = {
//       'heart': '❤️',
//       'leaf': '🍃',
//       'apple': '🍎',
//       'brain': '🧠',
//       'sun': '☀️',
//       'star': '⭐',
//       'sleep': '😴',
//       'nutrition': '🍟',
//       'movement': '🏃‍♂️',
//       'mind-body-wellness': '💜'
//     };
//     return iconMap[iconName] || '🔹';
//   };

//   // Helper function to assign colors cyclically
//   const getColorClass = (index) => {
//     const colors = ['bg-orange-100', 'bg-purple-100', 'bg-blue-100', 'bg-green-100'];
//     return colors[index % colors.length];
//   };

//   // Helper function to assign icon backgrounds cyclically
//   const getIconBgClass = (index) => {
//     const backgrounds = ['bg-blue-200', 'bg-purple-200', 'bg-orange-200', 'bg-green-200'];
//     return backgrounds[index % backgrounds.length];
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);
//   const handleLinkClick = (e) => {
//   e.stopPropagation();
//   setOpenDropdown(null); // Close dropdown when any link is clicked
// };


//   const handlePillarClick = (pillar) => {
//     // Navigate to separate pillar detail page
//     router.push(`/contentsManagement/pillars/${pillar.id}`);
//   };

//   const handleDropdownClick = (e, pillarId) => {
//     e.stopPropagation(); // Prevent card click
//     setOpenDropdown(openDropdown === pillarId ? null : pillarId);
//   };

  
//   const handleDeletePillar = async (pillar) => {
//     if (window.confirm(`Are you sure you want to delete the "${pillar.title}" pillar?`)) {
//       try {
//         await api.delete(`/api/pillars/${pillar.id}`);
//         // Refresh pillars after successful deletion
//         fetchPillars();
//         // Optional: Show success message
//         console.log(`Pillar "${pillar.title}" deleted successfully`);
//       } catch (error) {
//         console.error('Error deleting pillar:', error);
//         // Optional: Show error message to user
//         alert('Failed to delete pillar. Please try again.');
//       }
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="rounded-2xl p-6 my-4">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
//             <p className="text-gray-600">Loading pillars...</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[...Array(4)].map((_, index) => (
//             <div key={index} className="bg-white rounded-lg p-4 animate-pulse">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
//                 <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
//               </div>
//               <div className="h-6 bg-gray-200 rounded mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded mb-3"></div>
//               <div className="flex items-center justify-between">
//                 <div className="h-4 bg-gray-200 rounded w-24"></div>
//                 <div className="w-5 h-5 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="rounded-2xl p-6 my-4">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
//             <p className="text-red-600">{error}</p>
//           </div>
//           <button
//             onClick={fetchPillars}
//             className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-2xl p-6 my-4">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
//           <p className="text-gray-600">
//             Manage your wellness pillars, subcategories, and learning content from one place. Click a card to begin.
//           </p>
//         </div>
//         <Link
//           href={"?modal=add-content-pillars"}
//           className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium"
//         >
//           Add Pillar
//         </Link>
//       </div>

//       {pillars.length === 0 ? (
//         <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
//           <Image
//             src={growthFrame}
//             className="w-[80px] h-[120px] mx-auto"
//             alt="Frame"
//           />
//           <h4 className="text-xl font-rubikMedium my-2">
//             No Pillars Yet
//           </h4>
//           <p className="text-md my-2">
//             Create your first content pillar to get started with organizing your wellness content.
//           </p>
//           <div className="">
//             <Link
//               href={"?modal=add-content-pillars"}
//               className="bg-weave-primary py-2 px-6 text-white rounded-md inline-block"
//             >
//               Add New Pillar
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {pillars.map((pillar) => (
//             <div
//               key={pillar.id}
//               className={`bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow relative`}
//               onClick={() => handlePillarClick(pillar)}
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center text-3xl`}>
//                   {pillar.icon}
//                 </div>
//                 <div className="text-gray-500 flex items-center rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
//                   <LockKeyholeIcon className={`w-5 h-5 ${pillar.locked ? 'text-red-500' : 'text-green-500'}`} />
//                 </div>
//               </div>

//               <h4 className="font-rubikMedium text-lg mb-2">{pillar.title}</h4>
//               <p className="text-sm text-gray-600 mb-3">{pillar.description}</p>

//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">
//                   Content Items: <span className="font-medium bg-blue-200 rounded-full p-2">{pillar.contentItems}</span>
//                 </span>

//                 {/* Dropdown Menu */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
//                     onClick={(e) => handleDropdownClick(e, pillar.id)}
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                     </svg>
//                   </button>

//                   {/* Dropdown Content */}
//                   {openDropdown === pillar.id && (
//   <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
//     <div className="py-1">
//       <Link
//         href={`?modal=view-content-pillars&id=${pillar.id}`}
//         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//         onClick={handleLinkClick}
//       >
//         <Eye className="w-4 h-4 mr-3" />
//         View Pillar
//       </Link>
//       <Link
//         href={`?modal=edit-content-pillars&id=${pillar.id}`}
//         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//         onClick={handleLinkClick}
//       >
//         <Edit className="w-4 h-4 mr-3" />
//         Edit Pillar
//       </Link>
//       <Link
//         href={`?modal=delete-pillars&id=${pillar.id}`}
//         className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
//         onClick={handleLinkClick}
//       >
//         <Trash2 className="w-4 h-4 mr-3" />
//         Delete Pillar
//       </Link>
//     </div>
//   </div>
// )}

//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Resources Component - Only shows pillars now
// function ResourcesRender() {
//   return <ContentPillarsPage />;
// }

// export default function Resources() {
//   return (
//     <ResourceLibraryProvider>
//       <ResourcesRender />
//     </ResourceLibraryProvider>
//   );
// }


/// correction

// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import growthFrame from "@/assets/images/Frame.png";
// import { LockKeyholeIcon, Eye, Edit, Trash2 } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import ResourceLibraryProvider from "@/contexts/ResourceLibraryContext";
// import api from "@/lib/api";
// import { useToastContext } from "@/contexts/toast";

// const ContentPillarsPage = () => {
//   const router = useRouter();
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [pillars, setPillars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dropdownRefs = useRef({}); // Store refs for each pillar's dropdown
//   const { showMessage } = useToastContext();

//   useEffect(() => {
//     fetchPillars();
//   }, []);

//   // const fetchPillars = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const response = await api.get("/pillars");

//   //     const transformedPillars = response.data.map((pillar, index) => ({
//   //       id: pillar.id || `pillar-${index}`,
//   //       title: pillar.name,
//   //       description: pillar.description,
//   //       icon: pillar.icon, // Use the actual image URL from API
//   //       coverImage: pillar.coverImage,
//   //       color: getColorClass(index),
//   //       iconBg: getIconBgClass(index),
//   //       contentItems: pillar.contentItems || 0,
//   //       locked: pillar.locked,
//   //     }));

//   //     setPillars(transformedPillars);
//   //     setError(null);
//   //   } catch (err) {
//   //     console.error("Error fetching pillars:", err);
//   //     setError("Failed to load pillars");
//   //     showMessage({
//   //       type: "error",
//   //       text: "Failed to load pillars",
//   //     });
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   const fetchPillars = async () => {
//   try {
//     setLoading(true);

//     // Fetch pillars
//     const pillarsResponse = await api.get("/pillars");
//     const pillarsData = pillarsResponse.data;

//     // Fetch all resources
//     const resourcesResponse = await api.get("/resource-library/resources");
//     let resourcesData = [];
//     if (resourcesResponse.data && resourcesResponse.data.resources && Array.isArray(resourcesResponse.data.resources)) {
//       resourcesData = resourcesResponse.data.resources;
//     } else if (Array.isArray(resourcesResponse.data)) {
//       resourcesData = resourcesResponse.data;
//     }

//     // Transform pillars and calculate content items
//     const transformedPillars = pillarsData.map((pillar, index) => {
//       // Count resources for this pillar
//       const contentCount = resourcesData.filter(
//         (resource) => resource.pillar && resource.pillar.id === pillar.id
//       ).length;

//       return {
//         id: pillar.id || `pillar-${index}`,
//         title: pillar.name,
//         description: pillar.description,
//         icon: pillar.icon, // Use the actual image URL from API
//         coverImage: pillar.coverImage,
//         color: getColorClass(index),
//         iconBg: getIconBgClass(index),
//         contentItems: contentCount, // Set the calculated count
//         locked: pillar.locked,
//       };
//     });

//     setPillars(transformedPillars);
//     setError(null);
//   } catch (err) {
//     console.error("Error fetching pillars or resources:", err);
//     setError("Failed to load pillars");
//     showMessage({
//       type: "error",
//       text: "Failed to load pillars",
//     });
//   } finally {
//     setLoading(false);
//   }
// };

//   // Function to get default emoji based on pillar name
//   const getDefaultEmoji = (pillarName) => {
//     const name = pillarName.toLowerCase();
//     if (name.includes('heart') || name.includes('cardio') || name.includes('fitness')) return '❤️';
//     if (name.includes('leaf') || name.includes('nature') || name.includes('environment')) return '🍃';
//     if (name.includes('apple') || name.includes('nutrition') || name.includes('food')) return '🍎';
//     if (name.includes('brain') || name.includes('mental') || name.includes('mind')) return '🧠';
//     if (name.includes('sun') || name.includes('energy') || name.includes('vitamin')) return '☀️';
//     if (name.includes('star') || name.includes('goal') || name.includes('achievement')) return '⭐';
//     if (name.includes('sleep') || name.includes('rest')) return '😴';
//     if (name.includes('leadership') || name.includes('leader')) return '👑';
//     if (name.includes('wellness') || name.includes('health')) return '💚';
//     if (name.includes('strength') || name.includes('muscle')) return '💪';
//     return '🔹'; // Default fallback emoji
//   };

//   // Function to check if URL is valid
//   const isValidUrl = (url) => {
//     if (!url || typeof url !== 'string') return false;
//     try {
//       new URL(url);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const getColorClass = (index) => {
//     const colors = ["bg-orange-100", "bg-purple-100", "bg-blue-100", "bg-green-100"];
//     return colors[index % colors.length];
//   };

//   const getIconBgClass = (index) => {
//     const backgrounds = ["bg-blue-200", "bg-purple-200", "bg-orange-200", "bg-green-200"];
//     return backgrounds[index % backgrounds.length];
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       let clickedOutside = true;
//       Object.values(dropdownRefs.current).forEach((ref) => {
//         if (ref && ref.contains(event.target)) {
//           clickedOutside = false;
//         }
//       });
//       if (clickedOutside) {
//         setOpenDropdown(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLinkClick = (e) => {
//     e.stopPropagation();
//     setOpenDropdown(null);
//   };

//   // const handlePillarClick = (pillar) => {
//   //   router.push(`/contentsManagement/pillars/${pillar.id}`);
//   // };


//   const handlePillarClick = (pillar) => {
//   // Prevent navigation if pillar is locked
//   if (pillar.locked) {
//     showMessage({
//       type: "warning",
//       text: `The "${pillar.title}" pillar is currently locked`,
//     });
//     return;
//   }
  
//   router.push(`/contentsManagement/pillars/${pillar.id}`);
// };

//   const handleDropdownClick = (e, pillarId) => {
//     e.stopPropagation();
//     setOpenDropdown(openDropdown === pillarId ? null : pillarId);
//   };

//   const handleDeletePillar = async (pillar, e) => {
//     e.stopPropagation();
//     if (window.confirm(`Are you sure you want to delete the "${pillar.title}" pillar?`)) {
//       try {
//         await api.delete(`/pillars/${pillar.id}`);
//         fetchPillars();
//         showMessage({
//           type: "success",
//           text: `Pillar "${pillar.title}" deleted successfully`,
//         });
//       } catch (error) {
//         console.error("Error deleting pillar:", error);
//         showMessage({
//           type: "error",
//           text: "Failed to delete pillar. Please try again.",
//         });
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="rounded-2xl p-6 my-4">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
//             <p className="text-gray-600">Loading pillars...</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[...Array(4)].map((_, index) => (
//             <div key={index} className="bg-white rounded-lg p-4 animate-pulse">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
//                 <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
//               </div>
//               <div className="h-6 bg-gray-200 rounded mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded mb-3"></div>
//               <div className="flex items-center justify-between">
//                 <div className="h-4 bg-gray-200 rounded w-24"></div>
//                 <div className="w-5 h-5 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="rounded-2xl p-6 my-4">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
//             <p className="text-red-600">{error}</p>
//           </div>
//           <button
//             onClick={fetchPillars}
//             className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-2xl p-6 my-4">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-xl font-rubikMedium mb-2">Content Pillars</h3>
//           <p className="text-gray-600">
//             Manage your wellness pillars, subcategories, and learning content from one place. Click a card to begin.
//           </p>
//         </div>
//         <Link
//           href={"?modal=add-content-pillars"}
//           className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium"
//         >
//           Add Pillar
//         </Link>
//       </div>

//       {pillars.length === 0 ? (
//         <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
//           <Image
//             src={growthFrame}
//             className="w-[80px] h-[120px] mx-auto"
//             alt="Frame"
//           />
//           <h4 className="text-xl font-rubikMedium my-2">
//             No Pillars Yet
//           </h4>
//           <p className="text-md my-2">
//             Create your first content pillar to get started with organizing your wellness content.
//           </p>
//           <div className="">
//             <Link
//               href={"?modal=add-content-pillars"}
//               className="bg-weave-primary py-2 px-6 text-white rounded-md inline-block"
//             >
//               Add New Pillar
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {pillars.map((pillar) => (
//             <div
//               key={pillar.id}
//               className={`bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow relative`}
//               onClick={() => handlePillarClick(pillar)}
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center p-2`}>
//                   {pillar.icon && isValidUrl(pillar.icon) ? (
//                     <Image
//                       src={pillar.icon}
//                       alt={pillar.title}
//                       width={32}
//                       height={32}
//                       className="object-contain rounded-full"
//                       onError={(e) => {
//                         // Hide image and show emoji fallback on error
//                         e.target.style.display = 'none';
//                         e.target.nextSibling.style.display = 'flex';
//                       }}
//                     />
//                   ) : null}
//                   {/* Emoji fallback - shows if no valid image URL or on image error */}
//                   <span 
//                     className="text-2xl flex items-center justify-center" 
//                     style={{ 
//                       display: (pillar.icon && isValidUrl(pillar.icon)) ? 'none' : 'flex' 
//                     }}
//                   >
//                     {getDefaultEmoji(pillar.title)}
//                   </span>
//                 </div>
//                 <div className={`text-gray-500 flex items-center rounded-full p-2 hover:bg-gray-200 transition-colors cursor-pointer ${pillar.locked ? "text-gray-500 bg-gray-100" : "hidden"}`}>
//                   <LockKeyholeIcon className={`w-5 h-5 ${pillar.locked ? "text-gray-500" : "hidden"}`} />
//                 </div>
//               </div>

//               <h4 className="font-rubikMedium text-lg mb-2">{pillar.title}</h4>
//               <p className="text-sm text-gray-600 mb-3">{pillar.description}</p>

//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">
//                   Content Items: <span className="font-medium bg-blue-200 rounded-full p-2">{pillar.contentItems}</span>
//                 </span>

//                 <div
//                   className="relative"
//                   ref={(el) => (dropdownRefs.current[pillar.id] = el)}
//                 >
//                   <button
//                     className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
//                     onClick={(e) => handleDropdownClick(e, pillar.id)}
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                     </svg>
//                   </button>

//                   {openDropdown === pillar.id && (
//                     <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
//                       <div className="py-1">
//                         <Link
//                           href={`?modal=view-content-pillars&id=${pillar.id}`}
//                           className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                           onClick={handleLinkClick}
//                         >
//                           <Eye className="w-4 h-4 mr-3" />
//                           View Pillar
//                         </Link>
//                         <Link
//                           href={`?modal=edit-content-pillars&id=${pillar.id}`}
//                           className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                           onClick={handleLinkClick}
//                         >
//                           <Edit className="w-4 h-4 mr-3" />
//                           Edit Pillar
//                         </Link>
//                         <Link
//                           href={`?modal=delete-pillars&id=${pillar.id}`}
//                           className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                           onClick={handleLinkClick}
//                         >
//                           <Trash2 className="w-4 h-4 mr-3" />
//                           Delete Pillar
//                         </Link>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
// //         <div
// //   key={pillar.id}
// //   className={`bg-white rounded-lg p-4 transition-shadow relative ${
// //     pillar.locked 
// //       ? 'opacity-60 cursor-not-allowed' 
// //       : 'cursor-pointer hover:shadow-md'
// //   }`}
// //   onClick={() => handlePillarClick(pillar)}
// // >
// //   <div className="flex items-center justify-between mb-3">
// //     <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center p-2 ${
// //       pillar.locked ? 'opacity-70' : ''
// //     }`}>
// //       {pillar.icon && isValidUrl(pillar.icon) ? (
// //         <Image
// //           src={pillar.icon}
// //           alt={pillar.title}
// //           width={32}
// //           height={32}
// //           className="object-contain rounded-full"
// //           onError={(e) => {
// //             e.target.style.display = 'none';
// //             e.target.nextSibling.style.display = 'flex';
// //           }}
// //         />
// //       ) : null}
// //       <span 
// //         className="text-2xl flex items-center justify-center" 
// //         style={{ 
// //           display: (pillar.icon && isValidUrl(pillar.icon)) ? 'none' : 'flex' 
// //         }}
// //       >
// //         {getDefaultEmoji(pillar.title)}
// //       </span>
// //     </div>
// //     <div className={`text-gray-500 flex items-center rounded-full p-2 transition-colors ${
// //       pillar.locked ? "text-gray-500 bg-gray-100" : "hidden"
// //     }`}>
// //       <LockKeyholeIcon className={`w-5 h-5 ${pillar.locked ? "text-gray-500" : "hidden"}`} />
// //     </div>
// //   </div>

// //   <h4 className={`font-rubikMedium text-lg mb-2 ${pillar.locked ? 'text-gray-500' : ''}`}>
// //     {pillar.title}
// //     {pillar.locked && <span className="ml-2 text-sm text-gray-400">(Locked)</span>}
// //   </h4>
// //   <p className={`text-sm text-gray-600 mb-3 ${pillar.locked ? 'text-gray-400' : ''}`}>
// //     {pillar.description}
// //   </p>

// //   <div className="flex items-center justify-between">
// //     <span className={`text-sm ${pillar.locked ? 'text-gray-400' : 'text-gray-500'}`}>
// //       Content Items: <span className={`font-medium rounded-full p-2 ${
// //         pillar.locked ? 'bg-gray-200 text-gray-500' : 'bg-blue-200'
// //       }`}>{pillar.contentItems}</span>
// //     </span>

// //     <div
// //       className="relative"
// //       ref={(el) => (dropdownRefs.current[pillar.id] = el)}
// //     >
// //       <button
// //         className={`p-1 rounded-full transition-colors ${
// //           pillar.locked 
// //             ? 'text-gray-400 cursor-not-allowed' 
// //             : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
// //         }`}
// //         onClick={(e) => pillar.locked ? e.stopPropagation() : handleDropdownClick(e, pillar.id)}
// //         disabled={pillar.locked}
// //       >
// //         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
// //         </svg>
// //       </button>

// //       {openDropdown === pillar.id && !pillar.locked && (
// //         <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
// //           <div className="py-1">
// //             <Link
// //               href={`?modal=view-content-pillars&id=${pillar.id}`}
// //               className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
// //               onClick={handleLinkClick}
// //             >
// //               <Eye className="w-4 h-4 mr-3" />
// //               View Pillar
// //             </Link>
// //             <Link
// //               href={`?modal=edit-content-pillars&id=${pillar.id}`}
// //               className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
// //               onClick={handleLinkClick}
// //             >
// //               <Edit className="w-4 h-4 mr-3" />
// //               Edit Pillar
// //             </Link>
// //             <Link
// //               href={`?modal=delete-pillars&id=${pillar.id}`}
// //               className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
// //               onClick={handleLinkClick}
// //             >
// //               <Trash2 className="w-4 h-4 mr-3" />
// //               Delete Pillar
// //             </Link>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   </div>
// // </div>
//       )}
//     </div>
//   );
// };

// function ResourcesRender() {
//   return <ContentPillarsPage />;
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

  const handlePillarClick = (pillar) => {
    // Allow viewing content for both locked and unlocked pillars
    router.push(`/contentsManagement/pillars/${pillar.id}`);
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