// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import growthFrame from "@/assets/images/EmptyState2.png";
// import Link from "next/link";
// import exportData from "@/lib/export";
// import PaginatedItems from "@/components/elements/Pagination";

// // Dummy data - Updated to match the image content
// const dummyData = [
//   {
//     id: 1,
//     title: "The only way to do great work is to love what you do.",
//     created_at: "2024-01-15T10:30:00Z",
//     status: "Published",
//     type: "quote"
//   },
//   {
//     id: 2,
//     title: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
//     created_at: "2024-01-14T14:20:00Z",
//     status: "Published",
//     type: "quote"
//   },
//   {
//     id: 3,
//     title: "The only way to do great work is to love what you do.",
//     created_at: "2024-01-13T09:15:00Z",
//     status: "Scheduled",
//     type: "quote"
//   },
//   {
//     id: 4,
//     title: "Start your day with a positive mindset",
//     created_at: "2024-01-12T16:45:00Z",
//     status: "Published",
//     type: "tip"
//   },
//   {
//     id: 5,
//     title: "Take regular breaks to maintain productivity",
//     created_at: "2024-01-11T11:30:00Z",
//     status: "Scheduled",
//     type: "tip"
//   },
//   {
//     id: 6,
//     title: "Practice gratitude daily for better mental health",
//     created_at: "2024-01-10T13:20:00Z",
//     status: "Published",
//     type: "tip"
//   },
//   {
//     id: 7,
//     title: "Set clear goals and track your progress",
//     created_at: "2024-01-09T15:10:00Z",
//     status: "Published",
//     type: "tip"
//   }
// ];

// function QuoteRender() {
//   const [filteredResources, setFilteredResources] = useState([]);
//   const [searchKey, setSearchKey] = useState("");
//   const [activeTab, setActiveTab] = useState("quotes");
//   const [isLoading, setIsLoading] = useState(false);
//   const resources = dummyData;

//   // Filter resources based on active tab
//   const getFilteredByTab = (data, tab) => {
//     if (tab === "quotes") {
//       return data.filter(item => item.type === "quote");
//     } else if (tab === "tips") {
//       return data.filter(item => item.type === "tip");
//     }
//     return data;
//   };

//   useEffect(() => {
//     let filtered = getFilteredByTab(resources, activeTab);
    
//     if (searchKey !== "") {
//       filtered = filtered.filter((resource) =>
//         Object.values(resource)
//           .join(" ")
//           .toLowerCase()
//           .includes(searchKey.toLowerCase())
//       );
//     }
    
//     // Sort by created_at date in descending order (newest first)
//     const sortedResources = [...filtered].sort((a, b) => 
//       new Date(b.created_at) - new Date(a.created_at)
//     );
    
//     setFilteredResources(sortedResources);
//   }, [searchKey, resources, activeTab]);

//   const exportContents = () => {
//     exportData(
//       filteredResources.map((resource) => ({
//         title: resource.title,
//         date_created: resource.created_at,
//         status: resource.status,
//         type: resource.type
//       })),
//       ["title", "date_created", "status", "type"],
//       "resources"
//     );
//   };
  
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const getQuotesCount = () => resources.filter(item => item.type === "quote").length;
//   const getTipsCount = () => resources.filter(item => item.type === "tip").length;

//   const renderContent = () => {
//     if (isLoading) {
//       return (
//         <div className="space-y-4">
//           {[...Array(3)].map((_, index) => (
//             <div
//               key={index}
//               className="h-20 bg-gray-100 rounded-lg animate-pulse"
//             ></div>
//           ))}
//         </div>
//       );
//     }

//     if (!resources || filteredResources.length === 0) {
//       return (
//         <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
//           <Image
//             src={growthFrame}
//             className="w-[80px] h-[120px] mx-auto"
//             alt="Frame"
//           />
//           <h4 className="text-xl font-rubikMedium my-2">
//             Your Resource Library is Empty
//           </h4>
//           <p className="text-md my-2">
//             There are no {activeTab === "quotes" ? "quotes" : "tips"} in your library yet. Once you add content, it'll appear here for easy access and management.
//           </p>
//           <div className="">
//             <button className="bg-weave-primary py-2 px-6 text-white rounded-md">
//               Add New Content
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return (
//        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {filteredResources.map((resource) => (
//           <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-4">
//             <div className="flex items-center justify-between">
//               <div className="flex-1">
//                 <div className="flex items- justify-between  gap-3 mb-3">
//                   <span className={`inline-flex items-center  px-3 py-1 rounded-full text-xs font-medium ${
//                     resource.status.toLowerCase() === "published"
//                       ? "bg-[#28A745] text-white"
//                       : "bg-[#FFA500] text-white"
//                   }`}>
//                     {resource.status}
//                   </span>
//                   <span className="text-sm text-gray-500">
//                     Display: {formatDate(resource.created_at)}
//                   </span>
//                 </div>
                
//                 <p className="text-gray-900 text-base leading-relaxed mb-4">
//                   "{resource.title}"
//                 </p>
//                 <div className="flex justify-end">
//                 <div className="flex items-center gap-6">
//                   <Link
//                     href={`?modal=edit-tip&resource_id=${resource.id}&contentType=${resource.type}`}
//                     className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2"
//                   >
//                     <i className="fa fa-pencil"></i>
//                     Edit
//                   </Link>
//                   <Link
//                     href={`?modal=delete-quote&resource_id=${resource.id}`}
//                     className="text-red-500 hover:text-red-700 text-sm flex items-center gap-2"
//                   >
//                     <i className="fa fa-trash"></i>
//                     Delete
//                   </Link>
//                 </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Content Area */}
//       <div className="py-6">
//         {/* Search and Filter Section */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex-1 max-w-md bg-white rounded-lg shadow-sm p-4">
//             <div className="relative">
//               <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//               <input
//                 type="text"
//                 className="bg-[#f5f6fa] rounded-md w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 placeholder="Search quotes and tips..."
//                 value={searchKey}
//                 onChange={(e) => setSearchKey(e.target.value)}
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <button
//               className="bg-teal-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
//               onClick={exportContents}
//             >
//               <i className="fa fa-download"></i>
//               Export
//             </button>
//             <button className="relative dropdown border border-gray-300 px-4 py-2 rounded-md text-base font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
//               <i className="fa fa-filter"></i>
//               Filter
//               <div className="absolute right-0 top-10 rounded-md p-2 shadow-lg bg-white text-base w-[200px] dropdown-menu border border-gray-200">
//                 <div className="flex flex-col text-left">
//                   <a
//                     className="p-2 rounded-md mb-1 cursor-pointer hover:bg-gray-50"
//                     onClick={() => setActiveTab("quotes")}
//                   >
//                     Motivational Quotes
//                   </a>
//                   <a
//                     className="p-2 rounded-md mb-1 cursor-pointer hover:bg-gray-50"
//                     onClick={() => setActiveTab("tips")}
//                   >
//                     Daily Tips
//                   </a>
//                 </div>
//               </div>
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6">
//           {/* Tab Navigation */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-6">
//               <button 
//                 className={`text-sm font-medium pb-1 transition-colors ${
//                   activeTab === "quotes" 
//                     ? "text-teal-600 border-b-2 border-teal-600" 
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//                 onClick={() => setActiveTab("quotes")}
//               >
//                 Motivational Quotes ({getQuotesCount()})
//               </button>
//               <button 
//                 className={`text-sm font-medium pb-1 transition-colors ${
//                   activeTab === "tips" 
//                     ? "text-teal-600 border-b-2 border-teal-600" 
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//                 onClick={() => setActiveTab("tips")}
//               >
//                 Daily Tips ({getTipsCount()})
//               </button>
//             </div>
//           </div>

//           {/* Content Grid */}
//           <div className="bg-white rounded-lg p-6">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Quote() {
//   return <QuoteRender />;
// }



import React, { useEffect, useState } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/EmptyState2.png";
import Link from "next/link";
import exportData from "@/lib/export";
import PaginatedItems from "@/components/elements/Pagination";
import api from "@/lib/api"; // Assuming you have an API client configured

function QuoteRender() {
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [activeTab, setActiveTab] = useState("quotes");
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState([]);

  // Fetch quotes and tips from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const quotesResponse = await api.get("/api/quotes");
        const tipsResponse = await api.get("/api/tips");
        
        // Combine quotes and tips, assuming API returns data in the same format as dummyData
        const combinedResources = [
          ...quotesResponse.data.map(quote => ({ ...quote, type: "quote" })),
          ...tipsResponse.data.map(tip => ({ ...tip, type: "tip" }))
        ];
        
        setResources(combinedResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setResources([]); // Set empty array on error to show empty state
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter resources based on active tab and search
  useEffect(() => {
    let filtered = getFilteredByTab(resources, activeTab);
    
    if (searchKey !== "") {
      filtered = filtered.filter((resource) =>
        Object.values(resource)
          .join(" ")
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    }
    
    // Sort by created_at date in descending order (newest first)
    const sortedResources = [...filtered].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );
    
    setFilteredResources(sortedResources);
  }, [searchKey, resources, activeTab]);

  // Filter resources based on active tab
  const getFilteredByTab = (data, tab) => {
    if (tab === "quotes") {
      return data.filter(item => item.type === "quote");
    } else if (tab === "tips") {
      return data.filter(item => item.type === "tip");
    }
    return data;
  };

  const exportContents = () => {
    exportData(
      filteredResources.map((resource) => ({
        title: resource.title,
        date_created: resource.created_at,
        status: resource.status,
        type: resource.type
      })),
      ["title", "date_created", "status", "type"],
      "resources"
    );
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getQuotesCount = () => resources.filter(item => item.type === "quote").length;
  const getTipsCount = () => resources.filter(item => item.type === "tip").length;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-20 bg-gray-100 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      );
    }

    if (!resources || filteredResources.length === 0) {
      return (
        <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
          <Image
            src={growthFrame}
            className="w-[80px] h-[120px] mx-auto"
            alt="Frame"
          />
          <h4 className="text-xl font-rubikMedium my-2">
            Your Resource Library is Empty
          </h4>
          <p className="text-md my-2">
            There are no {activeTab === "quotes" ? "quotes" : "tips"} in your library yet. Once you add content, it'll appear here for easy access and management.
          </p>
          <div className="">
            <button className="bg-weave-primary py-2 px-6 text-white rounded-md">
              Add New Content
            </button>
          </div>
        </div>
      );
    }

    return (
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items- justify-between  gap-3 mb-3">
                  <span className={`inline-flex items-center  px-3 py-1 rounded-full text-xs font-medium ${
                    resource.status.toLowerCase() === "published"
                      ? "bg-[#28A745] text-white"
                      : "bg-[#FFA500] text-white"
                  }`}>
                    {resource.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Display: {formatDate(resource.created_at)}
                  </span>
                </div>
                
                <p className="text-gray-900 text-base leading-relaxed mb-4">
                  "{resource.title}"
                </p>
                <div className="flex justify-end">
                <div className="flex items-center gap-6">
                  <Link
                    href={`?modal=edit-tip&resource_id=${resource.id}&contentType=${resource.type}`}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2"
                  >
                    <i className="fa fa-pencil"></i>
                    Edit
                  </Link>
                  <Link
                    href={`?modal=delete-quote&resource_id=${resource.id}`}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-2"
                  >
                    <i className="fa fa-trash"></i>
                    Delete
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Content Area */}
      <div className="py-6">
        {/* Search and Filter Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-md bg-white rounded-lg shadow-sm p-4">
            <div className="relative">
              <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                className="bg-[#f5f6fa] rounded-md w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Search quotes and tips..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
              onClick={exportContents}
            >
              <i className="fa fa-download"></i>
              Export
            </button>
            <button className="relative dropdown border border-gray-300 px-4 py-2 rounded-md text-base font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              <i className="fa fa-filter"></i>
              Filter
              <div className="absolute right-0 top-10 rounded-md p-2 shadow-lg bg-white text-base w-[200px] dropdown-menu border border-gray-200">
                <div className="flex flex-col text-left">
                  <a
                    className="p-2 rounded-md mb-1 cursor-pointer hover:bg-gray-50"
                    onClick={() => setActiveTab("quotes")}
                  >
                    Motivational Quotes
                  </a>
                  <a
                    className="p-2 rounded-md mb-1 cursor-pointer hover:bg-gray-50"
                    onClick={() => setActiveTab("tips")}
                  >
                    Daily Tips
                  </a>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <button 
                className={`text-sm font-medium pb-1 transition-colors ${
                  activeTab === "quotes" 
                    ? "text-teal-600 border-b-2 border-teal-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("quotes")}
              >
                Motivational Quotes ({getQuotesCount()})
              </button>
              <button 
                className={`text-sm font-medium pb-1 transition-colors ${
                  activeTab === "tips" 
                    ? "text-teal-600 border-b-2 border-teal-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("tips")}
              >
                Daily Tips ({getTipsCount()})
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="bg-white rounded-lg p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Quote() {
  return <QuoteRender />;
}