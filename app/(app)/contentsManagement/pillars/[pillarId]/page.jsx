// // "use client";
// // import React, { useEffect, useState } from "react";
// // import Image from "next/image";
// // import growthFrame from "@/assets/images/Frame.png";
// // import Link from "next/link";
// // import { useRouter, useParams } from "next/navigation";
// // import ResourceLibraryProvider, {
// //   useResourceLibrary,
// // } from "@/contexts/ResourceLibraryContext";
// // import exportData from "@/lib/export";
// // import PaginatedItems from "@/components/elements/Pagination";
// // import { ArrowLeft, LockKeyholeIcon } from "lucide-react";

// // // Pillar Detail Page Component (Standalone)
// // const PillarDetailPage = () => {
// //   const params = useParams();
// //   const router = useRouter();
// //   const pillarId = params.pillarId; // Get pillar ID from URL params
  
// //   const [filteredResources, setFilteredResources] = useState([]);
// //   const [searchKey, setSearchKey] = useState("");
// //   const { resources, isLoading } = useResourceLibrary();
// //   const resourceTypes = ["Article", "Video", "Audio"];
// //   const [resourceFilter, setResourceFilter] = useState("");

// //   // Define pillars data (you might want to move this to a context or fetch from API)
// //   const pillars = {
// //     'sleep': {
// //       id: 'sleep',
// //       title: 'Sleep',
// //       description: 'Rest and prepare for restful sleep',
// //       icon: '😴',
// //       color: 'bg-orange-100',
// //       iconBg: 'bg-blue-200',
// //       contentItems: 17
// //     },
// //     'mind-body-wellness': {
// //       id: 'mind-body-wellness',
// //       title: 'Mind/Body Wellness',
// //       description: 'Mind-body wellness practices',
// //       icon: '💜',
// //       color: 'bg-purple-100',
// //       iconBg: 'bg-purple-200',
// //       contentItems: 17
// //     },
// //     'nutrition': {
// //       id: 'nutrition',
// //       title: 'Nutrition',
// //       description: 'Healthy eating and nutrition tips',
// //       icon: '🍟',
// //       color: 'bg-orange-100',
// //       iconBg: 'bg-orange-200',
// //       contentItems: 0
// //     },
// //     'movement': {
// //       id: 'movement',
// //       title: 'Movement',
// //       description: 'Daily physical activity and mobility',
// //       icon: '🏃‍♂️',
// //       color: 'bg-blue-100',
// //       iconBg: 'bg-blue-200',
// //       contentItems: 0
// //     }
// //   };

// //   const pillar = pillars[pillarId];

// //   // Redirect if pillar doesn't exist
// //   useEffect(() => {
// //     if (!pillar) {
// //       router.push('/contentsManagement');
// //     }
// //   }, [pillar, router]);

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

// //   const handleBackToPillars = () => {
// //     router.push('/contentsManagement');
// //   };

// //   if (!pillar) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="p-6">
// //       {/* Header with Back Button and Pillar Info */}
// //       <div className="mb-6">
// //         <div className="flex items-center justify-between mb-4">
// //         <button
// //           onClick={handleBackToPillars}
// //           className="px-4 py-2 text-sm text-weave-primary border border-weave-primary rounded-md font-rubikMedium flex items-center mb-4"
// //         >
// //           <ArrowLeft className="w-4 h-4 mr-2" />
// //           Back to Content Management
// //         </button>
// //         {/* Add New Content Button */}
// //       <div className="mb-6">
// //         <Link
// //           href={"?modal=add-content"}
// //           className="px-6 py-2 bg-weave-primary text-white rounded-md font-rubikMedium inline-block"
// //         >
// //           Add New Content
// //         </Link>
// //       </div>
// //         </div>
        
// //         <div className="flex items-center mb-4">
// //           <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center text-3xl mr-4`}>
// //             {pillar.icon}
// //           </div>
// //           <div>
// //             <h1 className="text-3xl font-bold">{pillar.title} Resources</h1>
// //             <p className="text-gray-600 mt-1">{pillar.description}</p>
// //           </div>
// //         </div>
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
// //           {pillar.title} Content Library
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
// //               <Link
// //                 href={`/content-management/pillars/${pillarId}?modal=add-content`}
// //                 className="bg-weave-primary py-2 px-6 text-white rounded-md inline-block"
// //               >
// //                 Add New Content
// //               </Link>
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
// //                           href={`/content-management/pillars/${pillarId}?modal=edit-resource&resource_id=${resource.id}&contentType=${resource.resourceType}`}
// //                           className="px-3 py-1 hover:bg-gray-100"
// //                         >
// //                           <i className="fa fa-pencil mr-2"></i> Edit Content
// //                         </Link>
// //                         <Link
// //                           href={`/content-management/pillars/${pillarId}?modal=delete-resource&resource_id=${resource.id}`}
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

// // export default function PillarDetailPageWrapper() {
// //   return (
// //     <ResourceLibraryProvider>
// //       <PillarDetailPage />
// //     </ResourceLibraryProvider>
// //   );
// // }



// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import growthFrame from "@/assets/images/Frame.png";
// import Link from "next/link";
// import { useRouter, useParams } from "next/navigation";
// import ResourceLibraryProvider from "@/contexts/ResourceLibraryContext";
// import exportData from "@/lib/export";
// import PaginatedItems from "@/components/elements/Pagination";
// import { ArrowLeft, LockKeyholeIcon } from "lucide-react";
// import api from "@/lib/api";
// import { useToastContext } from "@/contexts/toast";

// // Pillar Detail Page Component (Standalone)
// const PillarDetailPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { showMessage } = useToastContext();
//   const pillarId = params.pillarId; // Get pillar ID from URL params
  
//   const [filteredResources, setFilteredResources] = useState([]);
//   const [resources, setResources] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [pillar, setPillar] = useState(null);
//   const [searchKey, setSearchKey] = useState("");
//   const [error, setError] = useState(null);
//   const resourceTypes = ["Article", "Video", "Audio"];
//   const [resourceFilter, setResourceFilter] = useState("");

//   // Fetch pillar details and its content
//   useEffect(() => {
//     if (pillarId) {
//       fetchPillarData();
//       fetchPillarContent();
//     }
//   }, [pillarId]);

//   const fetchPillarData = async () => {
//     try {
//       const response = await api.get(`/pillars/${pillarId}`);
//       const pillarData = response.data;
      
//       setPillar({
//         id: pillarData.id,
//         title: pillarData.name,
//         description: pillarData.description,
//         icon: getIconEmoji(pillarData.icon),
//         iconBg: getIconBgClass(pillarData.name), 
//         contentItems: pillarData.contentItems || 0,
//         locked: pillarData.locked
//       });
//     } catch (err) {
//       console.error('Error fetching pillar data:', err);
//       setError('Failed to load pillar details');
//       showMessage({
//         type: "error",
//         text: "Failed to load pillar details",
//       });
//     }
//   };

//   // const fetchPillarContent = async () => {
//   //   try {
//   //     setIsLoading(true);
//   //     const response = await api.get(`/resource-library/resources`);
//   //     const contentData = response.data;
      
//   //     // Sort by created_at date in descending order (newest first)
//   //     const sortedResources = contentData.sort((a, b) => 
//   //       new Date(b.created_at) - new Date(a.created_at)
//   //     );
      
//   //     setResources(sortedResources);
//   //     setFilteredResources(sortedResources);
//   //     setError(null);
//   //   } catch (err) {
//   //     console.error('Error fetching pillar content:', err);
//   //     setError('Failed to load pillar content');
//   //     showMessage({
//   //       type: "error",
//   //       text: "Failed to load pillar content",
//   //     });
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const fetchPillarContent = async () => {
//   try {
//     setIsLoading(true);
//     const response = await api.get(`/resource-library/resources`);
//     // Adjust this line based on your actual API response structure:
//     const contentData = Array.isArray(response.data)
//       ? response.data
//       : Array.isArray(response.data.data)
//         ? response.data.data
//         : [];

//     // Sort by created_at date in descending order (newest first)
//     const sortedResources = contentData.sort((a, b) =>
//       new Date(b.created_at) - new Date(a.created_at)
//     );

//     setResources(sortedResources);
//     setFilteredResources(sortedResources);
//     setError(null);
//   } catch (err) {
//     console.error('Error fetching pillar content:', err);
//     setError('Failed to load pillar content');
//     showMessage({
//       type: "error",
//       text: "Failed to load pillar content",
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };

//   // Helper function to convert icon string to emoji
//   const getIconEmoji = (iconName) => {
//     const iconMap = {
//       heart: "❤️",
//       leaf: "🍃",
//       apple: "🍎",
//       brain: "🧠",
//       sun: "☀️",
//       star: "⭐",
//       sleep: "😴",
//       nutrition: "🍟",
//       movement: "🏃‍♂️",
//       "mind-body-wellness": "💜",
//     };
//     return iconMap[iconName] || "🔹";
//   };
//   const getTypeBadgeColor = (type) => {
//   if (!type) return 'bg-gray-100 text-gray-800';
  
//   switch (type.toLowerCase()) {
//     case 'audio':
//       return 'bg-blue-100 text-blue-800';
//     case 'video':
//       return 'bg-purple-100 text-purple-800';
//     case 'article':
//       return 'bg-green-100 text-green-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };

// // Get status badge color (add this function if not already present)
// const getStatusBadgeColor = (status) => {
//   if (!status) return 'bg-gray-400 text-white';
  
//   switch (status.toLowerCase()) {
//     case 'published'|| 'Published':
//       return 'bg-green-500 text-white';
//     case 'draft'|| 'Draft':
//       return 'bg-gray-400 text-white';
//     default:
//       return 'bg-gray-400 text-white';
//   }
// };

//   // Helper function to assign icon backgrounds
//   const getIconBgClass = (pillarName) => {
//     const backgroundMap = {
//       'Sleep': 'bg-blue-200',
//       'Mind/Body Wellness': 'bg-purple-200',
//       'Nutrition': 'bg-orange-200',
//       'Movement': 'bg-green-200',
//     };
//     return backgroundMap[pillarName] || 'bg-blue-200';
//   };

//   // Filter resources by type
//   useEffect(() => {
//     if (resourceFilter === "") {
//       const sortedResources = [...resources].sort((a, b) => 
//         new Date(b.created_at) - new Date(a.created_at)
//       );
//       return setFilteredResources(sortedResources);
//     }

//     setSearchKey("");
//     const matchResources = resources.filter(
//       (resource) =>
//         resource.resourceType.toLowerCase() === resourceFilter.toLowerCase()
//     ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

//     setFilteredResources(matchResources);
//   }, [resourceFilter, resources]);

//   // Search functionality
//   useEffect(() => {
//     if (searchKey === "") {
//       if (resourceFilter === "") {
//         const sortedResources = [...resources].sort((a, b) => 
//           new Date(b.created_at) - new Date(a.created_at)
//         );
//         setFilteredResources(sortedResources);
//       }
//       return;
//     }

//     const matchResources = resources.filter((resource) =>
//       Object.values(resource)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchKey.toLowerCase())
//     ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

//     setFilteredResources(matchResources);
//   }, [searchKey, resources, resourceFilter]);

//   const exportContents = () => {
//     exportData(
//       filteredResources.map((resource) => ({
//         title: resource.title,
//         tags: resource.tags ? resource.tags.join(", ").replace(/,/g, " & ") : "",
//         resourceType: resource.resourceType,
//         date_created: resource.created_at,
//         status: resource.status,
//       })),
//       ["title", "tags", "resourceType", "date_created", "status"],
//       `${pillar?.title || 'pillar'}_resources`
//     );
//   };
  
//   const formatDate = (d) => {
//     return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
//   };
  
//   const formatTime = (d) => {
//     const hours = d.getHours();
//     const minutes = d.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const displayHours = hours % 12 || 12; // Convert to 12-hour format
//     return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
//   };

//   const handleBackToPillars = () => {
//     router.push('/contentsManagement');
//   };

//   // Loading state
//   if (isLoading && !pillar) {
//     return (
//       <div className="p-6">
//         <div className="animate-pulse">
//           <div className="h-10 bg-gray-200 rounded w-48 mb-6"></div>
//           <div className="flex items-center mb-6">
//             <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
//             <div>
//               <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded w-96"></div>
//             </div>
//           </div>
//           <div className="h-10 bg-gray-200 rounded w-32 mb-6"></div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && !pillar) {
//     return (
//       <div className="p-6">
//         <button
//           onClick={handleBackToPillars}
//           className="px-4 py-2 text-sm text-weave-primary border border-weave-primary rounded-md font-rubikMedium flex items-center mb-4"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Content Management
//         </button>
//         <div className="text-center py-12">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={() => {
//               fetchPillarData();
//               fetchPillarContent();
//             }}
//             className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!pillar) {
//     return <div className="p-6">Loading...</div>;
//   }


//   return (
//     <div className="p-6">
//       {/* Header with Back Button and Pillar Info */}
//       <div className="mb-6">
//         <div className="flex items-center justify-between mb-4">
//           <button
//             onClick={handleBackToPillars}
//             className="px-4 py-2 text-sm text-weave-primary border border-weave-primary rounded-md font-rubikMedium flex items-center mb-4"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Content Management
//           </button>
//           {/* Add New Content Button */}
//           <div className="mb-6">
//             <Link
//               href={`?modal=add-content&pillarId=${pillarId}`}
//               className="px-6 py-2 bg-weave-primary text-white rounded-md font-rubikMedium inline-block"
//             >
//               Add New Content
//             </Link>
//           </div>
//         </div>
        
//         <div className="flex items-center mb-4">
//           <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center text-3xl mr-4`}>
//             {pillar.icon}
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold">{pillar.title} Resources</h1>
//             <p className="text-gray-600 mt-1">{pillar.description}</p>
//           </div>
//         </div>
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
//   <h3 className="text-xl font-rubikMedium mb-4">
//     {pillar.title}
//   </h3>

//   {isLoading ? (
//     <>
//       {/* Table Rows Placeholder */}
//       <div className="space-y-2">
//         {[...Array(5)].map((_, index) => (
//           <div
//             key={index}
//             className="h-6 bg-gray-200 rounded w-full"
//           ></div>
//         ))}
//       </div>
//     </>
//   ) : resources && filteredResources.length === 0 ? (
//     <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
//       <Image
//         src={growthFrame}
//         className="w-[80px] h-[120px] mx-auto"
//         alt="Frame"
//       />
//       <h4 className="text-xl font-rubikMedium my-2">
//         No {pillar.title} Resources Yet
//       </h4>
//       <p className="text-md my-2">
//         There are no resources in this pillar yet. Add articles, videos, or audio content to get started.
//       </p>
//       <div className="">
//         <Link
//           href={`?modal=add-content&pillarId=${pillarId}`}
//           className="bg-weave-primary py-2 px-6 text-white rounded-md inline-block"
//         >
//           Add New Content
//         </Link>
//       </div>
//     </div>
//   ) : (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr className="bg-[#f5f6fa] border-b border-gray-200">
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Title
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Type
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Duration
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Uploaded On
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Uploaded By
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Status
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {filteredResources.map((resource) => (
//             <tr key={resource.id} className="hover:bg-gray-50 border-b border-gray-100">
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm font-medium text-gray-900">
//                   {resource.title}
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getTypeBadgeColor(resource.type || resource.resourceType)}`}>
//                   {resource.type || resource.resourceType}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {resource.duration || '-'}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {formatDate(new Date(resource.created_at || resource.createdAt || Date.now()))}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {resource.author || 'Unknown'}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(resource.status)}`}>
//                   {resource.status || 'Draft'}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-center">
//                 <div className="text-gray-400 hover:text-gray-600 p-2 relative dropdown">
//                   <i className="fa fa-ellipsis-v text-sm"></i>
//                   <div className="absolute right-0 top-full mt-1 rounded-md p-2 shadow-lg bg-white text-xs w-[200px] dropdown-menu z-10 border">
//                     <div className="flex flex-col text-left">
//                       <Link
//                         href={`?modal=edit-resource&resource_id=${resource.id}&contentType=${resource.type || resource.resourceType}&pillarId=${pillarId}`}
//                         className="px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
//                       >
//                         <i className="fa fa-pencil mr-2"></i> Edit Content
//                       </Link>
//                       <Link
//                         href={`?modal=delete-resource&resource_id=${resource.id}&pillarId=${pillarId}`}
//                         className="text-red-500 px-3 py-2 hover:bg-gray-100 rounded"
//                       >
//                         <i className="fa fa-trash mr-2"></i> Delete
//                       </Link>
//                       <Link
//                         className="px-3 py-2 hover:bg-gray-100 rounded text-left text-gray-700"
//                         onClick={() => {
//                           // Handle view details
//                           console.log('View details for:', resource.id);
//                         }}
//                       >
//                         <i className="fa fa-eye mr-2"></i> View Details
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//       {/* Pagination if needed */}
//       {filteredResources.length > 10 && (
//         <div className="mt-4 flex justify-center">
//           <PaginatedItems
//             items={filteredResources}
//             itemsPerPage={10}
//             displayType={"pagination"}
//           />
//         </div>
//       )}
//     </div>
//   )}
// </div>
//     </div>
//   );
// };

// export default function PillarDetailPageWrapper() {
//   return (
//     <ResourceLibraryProvider>
//       <PillarDetailPage />
//     </ResourceLibraryProvider>
//   );
// }



"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame.png";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import ResourceLibraryProvider from "@/contexts/ResourceLibraryContext";
import exportData from "@/lib/export";
import PaginatedItems from "@/components/elements/Pagination";
import { ArrowLeft, LockKeyholeIcon } from "lucide-react";
import api from "@/lib/api";
import { useToastContext } from "@/contexts/toast";

// Pillar Detail Page Component (Standalone)
const PillarDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { showMessage } = useToastContext();
  const pillarId = params.pillarId; // Get pillar ID from URL params
  
  const [filteredResources, setFilteredResources] = useState([]);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pillar, setPillar] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [error, setError] = useState(null);
  const resourceTypes = ["Article", "Video", "Audio"];
  const [resourceFilter, setResourceFilter] = useState("");

  // Fetch pillar details and its content
  useEffect(() => {
    if (pillarId) {
      fetchPillarData();
      fetchPillarContent();
    }
  }, [pillarId]);

  const fetchPillarData = async () => {
    try {
      const response = await api.get(`/pillars/${pillarId}`);
      const pillarData = response.data;
      
      setPillar({
        id: pillarData.id,
        title: pillarData.name,
        description: pillarData.description,
        icon: getIconEmoji(pillarData.icon),
        iconBg: getIconBgClass(pillarData.name), 
        contentItems: pillarData.contentItems || 0,
        locked: pillarData.locked
      });
    } catch (err) {
      console.error('Error fetching pillar data:', err);
      setError('Failed to load pillar details');
      showMessage({
        type: "error",
        text: "Failed to load pillar details",
      });
    }
  };

  const fetchPillarContent = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/resource-library/resources`);
      
      // Handle the API response structure - resources are in response.data.resources
      let contentData = [];
      if (response.data && response.data.resources && Array.isArray(response.data.resources)) {
        contentData = response.data.resources;
      } else if (Array.isArray(response.data)) {
        contentData = response.data;
      }

      console.log('Fetched content data:', contentData); // Debug log

      // Filter resources by pillar if pillarId is provided
      let pillarResources = contentData;
      if (pillarId) {
        pillarResources = contentData.filter(resource => 
          resource.pillar && resource.pillar.id === pillarId
        );
      }

      console.log('Filtered pillar resources:', pillarResources); // Debug log

      // Sort by created_at date in descending order (newest first)
      const sortedResources = pillarResources.sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );

      setResources(sortedResources);
      setFilteredResources(sortedResources);
      setError(null);
    } catch (err) {
      console.error('Error fetching pillar content:', err);
      setError('Failed to load pillar content');
      showMessage({
        type: "error",
        text: "Failed to load pillar content",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert icon string to emoji
  const getIconEmoji = (iconName) => {
    const iconMap = {
      heart: "❤️",
      leaf: "🍃",
      apple: "🍎",
      brain: "🧠",
      sun: "☀️",
      star: "⭐",
      sleep: "😴",
      nutrition: "🍟",
      movement: "🏃‍♂️",
      "mind-body-wellness": "💜",
    };
    return iconMap[iconName] || "🔹";
  };

  const getTypeBadgeColor = (type) => {
    if (!type) return 'bg-gray-100 text-gray-800';
    
    switch (type.toLowerCase()) {
      case 'audio':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-purple-100 text-purple-800';
      case 'article':
        return 'bg-[#D2FFC9] text-[#008107]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    if (!status) return 'bg-gray-400 text-white';
    
    switch (status) {
      case 'Published'|| 'published':
        return 'bg-[#28A745] text-white';
      case 'draft'|| 'Draft':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  // Helper function to assign icon backgrounds
  const getIconBgClass = (pillarName) => {
    const backgroundMap = {
      'Sleep': 'bg-blue-200',
      'Mind/Body Wellness': 'bg-purple-200',
      'Nutrition': 'bg-orange-200',
      'Movement': 'bg-green-200',
    };
    return backgroundMap[pillarName] || 'bg-blue-200';
  };

  // Filter resources by type
  useEffect(() => {
    if (resourceFilter === "") {
      const sortedResources = [...resources].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      return setFilteredResources(sortedResources);
    }

    setSearchKey("");
    const matchResources = resources.filter(
      (resource) =>
        resource.resourceType && resource.resourceType.toLowerCase() === resourceFilter.toLowerCase()
    ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setFilteredResources(matchResources);
  }, [resourceFilter, resources]);

  // Search functionality
  useEffect(() => {
    if (searchKey === "") {
      if (resourceFilter === "") {
        const sortedResources = [...resources].sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setFilteredResources(sortedResources);
      }
      return;
    }

    const matchResources = resources.filter((resource) => {
      const searchString = [
        resource.title,
        resource.description,
        resource.author,
        resource.resourceType,
        resource.status
      ].filter(Boolean).join(" ").toLowerCase();
      
      return searchString.includes(searchKey.toLowerCase());
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setFilteredResources(matchResources);
  }, [searchKey, resources, resourceFilter]);

  const exportContents = () => {
    exportData(
      filteredResources.map((resource) => ({
        title: resource.title || '',
        description: resource.description || '',
        resourceType: resource.resourceType || '',
        date_created: resource.created_at || '',
        status: resource.status || '',
        author: resource.author || '',
        duration: resource.duration || ''
      })),
      ["title", "description", "resourceType", "date_created", "status", "author", "duration"],
      `${pillar?.title || 'pillar'}_resources`
    );
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; // Convert to 12-hour format
    return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
  };

  const handleBackToPillars = () => {
    router.push('/contentsManagement');
  };

  // Loading state
  if (isLoading && !pillar) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-96"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 mb-6"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !pillar) {
    return (
      <div className="p-6">
        <button
          onClick={handleBackToPillars}
          className="px-4 py-2 text-sm text-weave-primary border border-weave-primary rounded-md font-rubikMedium flex items-center mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Content Management
        </button>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              fetchPillarData();
              fetchPillarContent();
            }}
            className="px-4 py-2 bg-weave-primary text-white rounded-md font-rubikMedium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!pillar) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Header with Back Button and Pillar Info */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBackToPillars}
            className="px-4 py-2 text-sm text-weave-primary border border-weave-primary rounded-md font-rubikMedium flex items-center mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Content Management
          </button>
          {/* Add New Content Button */}
          <div className="mb-6">
            <Link
              href={`?modal=add-content&pillarId=${pillarId}`}
              className="px-6 py-2 bg-weave-primary text-white rounded-md font-rubikMedium inline-block"
            >
              Add New Content
            </Link>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 ${pillar.iconBg} rounded-full flex items-center justify-center text-3xl mr-4`}>
            {pillar.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{pillar.title} Resources</h1>
            <p className="text-gray-600 mt-1">{pillar.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex my-4">
        <div className="w-3/5">
          <div className="bg-white border px-8 py-2 rounded-md">
            <input
              type="text"
              className="bg-[#f5f6fa] rounded-md w-full px-4 py-2"
              placeholder="Search here"
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
          <button className="relative dropdown border p-2 rounded-md font-rubikMedium">
            <span className="px-2">
              {resourceFilter !== "" ? (
                resourceFilter
              ) : (
                <>
                  Filter
                  <i className="fa fa-list ml-2"></i>
                </>
              )}
            </span>
            <div className="absolute right-0 rounded-md p-1 shadow bg-white text-xs w-[200px] dropdown-menu">
              <div className="flex flex-col text-left">
                <a
                  className={`p-2 capitalize rounded-md mb-1 cursor-pointer hover:bg-gray-100`}
                  onClick={() => setResourceFilter("")}
                >
                  Reset Filter
                </a>
                {resourceTypes.map((typ) => (
                  <a
                    className={`p-2 capitalize rounded-md mb-1 cursor-pointer hover:bg-gray-100 ${
                      resourceFilter === typ ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setResourceFilter(typ)}
                    key={typ}
                  >
                    {typ}
                  </a>
                ))}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Resources Table */}
      <div className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-xl font-rubikMedium mb-4">
          {pillar.title} Content Library
        </h3>

        {isLoading ? (
          <>
            {/* Table Rows Placeholder */}
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-6 bg-gray-200 rounded w-full"
                ></div>
              ))}
            </div>
          </>
        ) : filteredResources.length === 0 ? (
          <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
            <Image
              src={growthFrame}
              className="w-[80px] h-[120px] mx-auto"
              alt="Frame"
            />
            <h4 className="text-xl font-rubikMedium my-2">
              No {pillar.title} Resources Yet
            </h4>
            <p className="text-md my-2">
              There are no resources in this pillar yet. Add articles, videos, or audio content to get started.
            </p>
            <div className="">
              <Link
                href={`?modal=add-content&pillarId=${pillarId}`}
                className="bg-weave-primary py-2 px-6 text-white rounded-md inline-block"
              >
                Add New Content
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-[#f5f6fa] border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-black  tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black  tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black  tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black  tracking-wider">
                    Uploaded On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black  tracking-wider">
                    Uploaded By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black  tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black  tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {resource.title || 'Untitled'}
                      </div>
                      {/* {resource.description && (
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {resource.description}
                        </div>
                      )} */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getTypeBadgeColor(resource.resourceType)}`}>
                        {resource.resourceType || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resource.duration || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{formatDate(resource.created_at)}</div>
                      <div className="text-xs">{formatTime(resource.created_at)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resource.author || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(resource.status)}`}>
                        {resource.status || 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-gray-400 hover:text-gray-600 p-2 relative dropdown">
                        <i className="fa fa-ellipsis-v text-sm"></i>
                        <div className="absolute right-0 top-full mt-1 rounded-md p-2 shadow-lg bg-white text-xs w-[200px] dropdown-menu z-10 border">
                          <div className="flex flex-col text-left">
                            <Link
                              href={`?modal=edit-resource&resource_id=${resource.id}&contentType=${resource.resourceType}&pillarId=${pillarId}`}
                              className="px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                            >
                              <i className="fa fa-pencil mr-2"></i> Edit Content
                            </Link>
                            <Link
                              href={`?modal=delete-resource&resource_id=${resource.id}&pillarId=${pillarId}`}
                              className="text-red-500 px-3 py-2 hover:bg-gray-100 rounded"
                            >
                              <i className="fa fa-trash mr-2"></i> Delete
                            </Link>
                            <button
                              className="px-3 py-2 hover:bg-gray-100 rounded text-left text-gray-700 w-full"
                              onClick={() => {
                                console.log('View details for:', resource.id);
                              }}
                            >
                              <i className="fa fa-eye mr-2"></i> View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Show pagination info */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredResources.length} of {resources.length} resources
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function PillarDetailPageWrapper() {
  return (
    <ResourceLibraryProvider>
      <PillarDetailPage />
    </ResourceLibraryProvider>
  );
}