// "use client";
// import React, { useEffect, useState, useMemo } from "react";
// import Image from "next/image";
// import api from "@/lib/api";
// // import EmptyList from "@/components/elements/EmptyList";
// import EmptySubState from "@/components/elements/EmptyStateSub";
// import { useRouter } from "next/navigation";
// import { Copy, CheckCircle, ChevronDown } from "lucide-react";
// import ExportModal from "@/ModalPages/Subscriber/ExportModal";
// function Subscriber() {
//   // Dummy data
//   const dummyData = [
//     {
//       id: "1",
//       name: "Oloruntobi Dosunmu",
//       email: "tomidoss@gmail.com",
//       startDate: "2024-12-08",
//       status: "Active",
//       nextBilling: "2025-12-08"
//     },
//     {
//       id: "2", 
//       name: "Wade Warren",
//       email: "Wade.Warren@gmail.com",
//       startDate: "2024-12-08",
//       status: "Expired",
//       nextBilling: "2025-12-08"
//     },
//     {
//       id: "3",
//       name: "Jenny Wilson", 
//       email: "tomidoss@gmail.com",
//       startDate: "2024-12-08",
//       status: "Canceled",
//       nextBilling: "2025-12-08"
//     },
//     {
//       id: "4",
//       name: "Robert Fox",
//       email: "tomidoss@gmail.com", 
//       startDate: "2024-12-08",
//       status: "Expired",
//       nextBilling: "2025-12-08"
//     },
//     {
//       id: "5",
//       name: "Marvin McKinney",
//       email: "tomidoss@gmail.com",
//       startDate: "2024-12-08", 
//       status: "Active",
//       nextBilling: "2025-12-08"
//     },
//     {
//       id: "6",
//       name: "Ralph Edwards",
//       email: "tomidoss@gmail.com",
//       startDate: "2024-12-08",
//       status: "Active", 
//       nextBilling: "2025-12-08"
//     },
//     // Add more dummy data for pagination testing
//     {
//       id: "7",
//       name: "John Doe",
//       email: "john.doe@gmail.com",
//       startDate: "2024-12-07",
//       status: "Active",
//       nextBilling: "2025-12-07"
//     },
//     {
//       id: "8",
//       name: "Jane Smith",
//       email: "jane.smith@gmail.com",
//       startDate: "2024-12-06",
//       status: "Expired",
//       nextBilling: "2025-12-06"
//     },
//     {
//       id: "9",
//       name: "Michael Johnson",
//       email: "michael.johnson@gmail.com",
//       startDate: "2024-12-05",
//       status: "Active",
//       nextBilling: "2025-12-05"
//     },
//     {
//       id: "10",
//       name: "Sarah Wilson",
//       email: "sarah.wilson@gmail.com",
//       startDate: "2024-12-04",
//       status: "Canceled",
//       nextBilling: "2025-12-04"
//     }
//   ];

//   const [subscribers, setSubscribers] = useState(dummyData);
//   const [searchKey, setSearchKey] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [isExportModalOpen, setIsExportModalOpen] = useState(false);
//   const router = useRouter();
//   const [copiedEmail, setCopiedEmail] = useState(null);

//   const copyToClipboard = (email) => {
//     navigator.clipboard.writeText(email).then(() => {
//       setCopiedEmail(email);
//       setTimeout(() => {
//         setCopiedEmail(null);
//       }, 2000);
//     }).catch((err) => {
//       console.error('Failed to copy: ', err);
//     });
//   };

//   // Filter and search logic
//   const filteredSubscribers = useMemo(() => {
//     let filtered = [...subscribers];
//     if (searchKey.trim()) {
//       filtered = filtered.filter(
//         (user) =>
//           user.name?.toLowerCase().includes(searchKey.toLowerCase()) ||
//           user.email?.toLowerCase().includes(searchKey.toLowerCase())
//       );
//     }
//     if (filterStatus !== "all") {
//       filtered = filtered.filter(
//         (user) => user.status.toLowerCase() === filterStatus.toLowerCase()
//       );
//     }
//     return filtered;
//   }, [subscribers, searchKey, filterStatus]);

//   // Pagination logic
//   const totalItems = filteredSubscribers.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex);

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   // Generate page numbers for display
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxPagesToShow = 5;
//     let startPage = Math.max(1, currentPage - 2);
//     let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//     if (endPage - startPage < maxPagesToShow - 1) {
//       startPage = Math.max(1, endPage - maxPagesToShow + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }

//     return pageNumbers;
//   };

//   const clearFilters = () => {
//     setSearchKey("");
//     setFilterStatus("all");
//     setCurrentPage(1);
//   };

//   const hasActiveFilters = searchKey.trim() || filterStatus !== "all";

//   const getStatusBadge = (status) => {
//     const baseClasses = "px-3 py-1 text-sm font-medium rounded-full";
//     switch (status.toLowerCase()) {
//       case "active":
//         return `${baseClasses} bg-[#28A745] text-white`;
//       case "expired":
//         return `${baseClasses} bg-[#E74C3C] text-white`;
//       case "canceled":
//         return `${baseClasses} bg-[#FFA500] text-white`;
//       default:
//         return `${baseClasses} bg-gray-100 text-gray-800`;
//     }
//   };

//   return (
//     <>
//       {subscribers.length === 0 ? (
//         <EmptySubState />
//       ) : (
//         <div className="mt-4 mb-6">
//           {/* Search and Filter Section */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex-1 max-w-md bg-white border border-gray-300 rounded-md py-2 px-6">
//               <div className="relative">
//                 <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//                 <input
//                   type="text"
//                   className="bg-gray-200 border border-gray-300 rounded-md w-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                   placeholder="Search by name or email..."
//                   value={searchKey}
//                   onChange={(e) => setSearchKey(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 className="bg-weave-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
//                 onClick={() => setIsExportModalOpen(true)}
//               >
//                 <i className="fa fa-download"></i>
//                 Export ({filteredSubscribers.length})
//               </button>
//               <div className="relative">
//                 <button
//                   className={`relative border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 ${hasActiveFilters ? "bg-teal-50 border-teal-300" : "bg-white"}`}
//                   onClick={() => setShowFilterDropdown(!showFilterDropdown)}
//                 >
//                   <i className="fa fa-filter"></i>
//                   Filter
//                   {hasActiveFilters && (
//                     <span className="ml-1 bg-teal-500 text-white rounded-full px-2 py-0.5 text-xs">
//                       {[searchKey.trim() && "search", filterStatus !== "all" && "status"].filter(Boolean).length}
//                     </span>
//                   )}
//                   <ChevronDown className="h-4 w-4" />
//                 </button>
//                 {showFilterDropdown && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
//                     <div className="p-4">
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="font-medium text-gray-900">Filter by Status</h3>
//                         {hasActiveFilters && (
//                           <button
//                             onClick={clearFilters}
//                             className="text-sm text-teal-600 hover:text-teal-800"
//                           >
//                             Clear All
//                           </button>
//                         )}
//                       </div>
//                       <div className="mb-4">
//                         <select
//                           value={filterStatus}
//                           onChange={(e) => setFilterStatus(e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                         >
//                           <option value="all">All Status</option>
//                           <option value="active">Active</option>
//                           <option value="expired">Expired</option>
//                           <option value="canceled">Canceled</option>
//                         </select>
//                       </div>
//                       <div className="pt-2 border-t border-gray-200">
//                         <p className="text-sm text-gray-600">
//                           Showing {filteredSubscribers.length} of {subscribers.length} subscribers
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Results info */}
//           {hasActiveFilters && (
//             <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
//               <p className="text-sm text-blue-800">
//                 {filteredSubscribers.length} subscribers found
//                 {searchKey.trim() && ` matching "${searchKey}"`}
//                 {filterStatus !== "all" && ` • Status: ${filterStatus}`}
//               </p>
//             </div>
//           )}

//           {/* Table */}
//           <div className="bg-white rounded-lg shadow">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200 bg-gray-50">
//                   <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Name</th>
//                   <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Email</th>
//                   <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Start Date</th>
//                   <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
//                   <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Next Billing</th>
//                   <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedSubscribers.map((user, index) => (
//                   <tr key={user.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                     <td className="py-4 px-6">
//                       <div className="font-medium text-gray-900">{user.name}</div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="flex items-center gap-2">
//                         <span className="text-gray-600">{user.email}</span>
//                         <button
//                           className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
//                           onClick={() => copyToClipboard(user.email)}
//                           title="Copy email to clipboard"
//                         >
//                           {copiedEmail === user.email ? (
//                             <CheckCircle className="h-4 w-4 text-green-500" />
//                           ) : (
//                             <Copy className="h-4 w-4" />
//                           )}
//                         </button>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className="text-gray-600">{user.startDate}</span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className={getStatusBadge(user.status)}>{user.status}</span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className="text-gray-600">{user.nextBilling}</span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <button
//                         className="text-teal-600 hover:text-teal-800 font-medium text-sm"
//                         onClick={() => router.push(`?modal=view-subscriber-details&id=${user.id}`)}
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredSubscribers.length === 0 && subscribers.length > 0 && (
//             <div className="text-center py-8">
//               <p className="text-gray-500">No subscribers match your current filters.</p>
//               <button
//                 onClick={clearFilters}
//                 className="mt-2 text-teal-600 hover:text-teal-800 font-medium"
//               >
//                 Clear filters to show all subscribers
//               </button>
//             </div>
//           )}

//           {/* Pagination */}
//           <div className="flex items-center justify-between mt-6">
//             <div className="text-sm text-gray-600">
//               Page {currentPage} of {totalPages} (Total: {totalItems} subscribers)
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">
//                 {getPageNumbers().map((pageNumber) => (
//                   <button
//                     key={pageNumber}
//                     className={`w-8 h-8 flex items-center justify-center rounded text-sm ${
//                       currentPage === pageNumber
//                         ? "bg-weave-primary text-white"
//                         : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                     }`}
//                     onClick={() => handlePageChange(pageNumber)}
//                   >
//                     {pageNumber}
//                   </button>
//                 ))}
//                 {totalPages > 5 && currentPage < totalPages - 2 && (
//                   <span className="text-gray-500">...</span>
//                 )}
//                 {totalPages > 5 && currentPage < totalPages - 1 && (
//                   <button
//                     className="w-8 h-8 flex items-center justify-center rounded bg-gray-200 text-gray-700 text-sm hover:bg-gray-300"
//                     onClick={() => handlePageChange(totalPages)}
//                   >
//                     {totalPages}
//                   </button>
//                 )}
//               </div>
//               <div className="flex gap-2 ml-4">
//                 <button
//                   className={`px-3 py-1 rounded text-sm ${
//                     currentPage === 1
//                       ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                       : "bg-teal-600 text-white hover:bg-teal-700"
//                   }`}
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   className={`px-3 py-1 rounded text-sm ${
//                     currentPage === totalPages
//                       ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                       : "bg-teal-600 text-white hover:bg-teal-700"
//                   }`}
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Export Modal */}
//       <ExportModal
//         isOpen={isExportModalOpen}
//         onClose={() => setIsExportModalOpen(false)}
//         data={filteredSubscribers}
//         filteredCount={filteredSubscribers.length}
//       />
//     </>
//   );
// }

// export default Subscriber;


"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import api from "@/lib/api";
import EmptySubState from "@/components/elements/EmptyStateSub";
import { useRouter } from "next/navigation";
import { Copy, CheckCircle, ChevronDown } from "lucide-react";
import ExportModal from "@/ModalPages/Subscriber/ExportModal";

function Subscriber() {
  const [subscribers, setSubscribers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const router = useRouter();
  const [copiedEmail, setCopiedEmail] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await api.get("/subscriptions");
        setSubscribers(response.data || []);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
        setSubscribers([]);
      }
    };
    fetchSubscribers();
  }, []);

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      setTimeout(() => {
        setCopiedEmail(null);
      }, 2000);
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const filteredSubscribers = useMemo(() => {
    let filtered = [...subscribers];
    if (searchKey.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchKey.toLowerCase())
      );
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (user) => user.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }
    return filtered;
  }, [subscribers, searchKey, filterStatus]);

  const totalItems = filteredSubscribers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const clearFilters = () => {
    setSearchKey("");
    setFilterStatus("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchKey.trim() || filterStatus !== "all";

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 text-sm font-medium rounded-full";
    switch (status.toLowerCase()) {
      case "active":
        return `${baseClasses} bg-[#28A745] text-white`;
      case "expired":
        return `${baseClasses} bg-[#E74C3C] text-white`;
      case "canceled":
        return `${baseClasses} bg-[#FFA500] text-white`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <>
      {subscribers.length === 0 ? (
        <EmptySubState />
      ) : (
        <div className="mt-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 max-w-md bg-white border border-gray-300 rounded-md py-2 px-6">
              <div className="relative">
                <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  className="bg-gray-200 border border-gray-300 rounded-md w-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Search by name or email..."
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-weave-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
                onClick={() => setIsExportModalOpen(true)}
              >
                <i className="fa fa-download"></i>
                Export ({filteredSubscribers.length})
              </button>
              <div className="relative">
                <button
                  className={`relative border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 ${hasActiveFilters ? "bg-teal-50 border-teal-300" : "bg-white"}`}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <i className="fa fa-filter"></i>
                  Filter
                  {hasActiveFilters && (
                    <span className="ml-1 bg-teal-500 text-white rounded-full px-2 py-0.5 text-xs">
                      {[searchKey.trim() && "search", filterStatus !== "all" && "status"].filter(Boolean).length}
                    </span>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Filter by Status</h3>
                        {hasActiveFilters && (
                          <button
                            onClick={clearFilters}
                            className="text-sm text-teal-600 hover:text-teal-800"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                      <div className="mb-4">
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="expired">Expired</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Showing {filteredSubscribers.length} of {subscribers.length} subscribers
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                {filteredSubscribers.length} subscribers found
                {searchKey.trim() && ` matching "${searchKey}"`}
                {filterStatus !== "all" && ` • Status: ${filterStatus}`}
              </p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Start Date</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Next Billing</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSubscribers.map((user, index) => (
                  <tr key={user.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{user.email}</span>
                        <button
                          className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                          onClick={() => copyToClipboard(user.email)}
                          title="Copy email to clipboard"
                        >
                          {copiedEmail === user.email ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">{user.startDate}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={getStatusBadge(user.status)}>{user.status}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">{user.nextBilling}</span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="text-teal-600 hover:text-teal-800 font-medium text-sm"
                        onClick={() => router.push(`?modal=view-subscriber-details&id=${user.id}`)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubscribers.length === 0 && subscribers.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No subscribers match your current filters.</p>
              <button
                onClick={clearFilters}
                className="mt-2 text-teal-600 hover:text-teal-800 font-medium"
              >
                Clear filters to show all subscribers
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} (Total: {totalItems} subscribers)
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm ${
                      currentPage === pageNumber
                        ? "bg-weave-primary text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="text-gray-500">...</span>
                )}
                {totalPages > 5 && currentPage < totalPages - 1 && (
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded bg-gray-200 text-gray-700 text-sm hover:bg-gray-300"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-teal-600 text-white hover:bg-teal-700"
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-teal-600 text-white hover:bg-teal-700"
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={filteredSubscribers}
        filteredCount={filteredSubscribers.length}
      />
    </>
  );
}

export default Subscriber;