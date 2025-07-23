// "use client";
// import React, { useRef, useEffect } from "react";
// import { X, CreditCard, FileText, User, Mail, Calendar, Clock, Shield } from "lucide-react";

// function ViewDetailsModal({ subscriber, onClose }) {
//   const statusDropdownRef = useRef(null);

//   // Default data if no subscriber is provided
//   const defaultSubscriber = {
//     user: "Unknown User",
//     email: "unknown@email.com",
//     plan: "N/A",
//     annualMembership: "N/A",
//     status: "Unknown",
//     startDate: "N/A",
//     nextBilling: "N/A",
//     trialAccess: "N/A",
//     paymentMethod: "N/A",
//     paymentDetails: "No payment details available",
//   };

//   const data = subscriber || defaultSubscriber;

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
//     <div className="mx-auto max-w-4xl">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
//         <h5 className="text-2xl font-rubikBold text-gray-900">Subscription Details</h5>
//         <div className={getStatusBadge(data.status)}>
//           {data.status}
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* User Information Card */}
//         <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <User className="h-5 w-5 text-blue-600" />
//             </div>
//             <h3 className="text-lg font-rubikMedium text-gray-900">User Information</h3>
//           </div>
//           <div className="space-y-3">
//             <div className="flex items-center gap-3">
//               <User className="h-4 w-4 text-gray-500" />
//               <div>
//                 <p className="text-sm text-gray-600">Name</p>
//                 <p className="font-rubikMedium text-gray-900">{data.user}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <Mail className="h-4 w-4 text-gray-500" />
//               <div>
//                 <p className="text-sm text-gray-600">Email</p>
//                 <p className="font-rubikMedium text-gray-900">{data.email}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Subscription Plan Card */}
//         <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <Shield className="h-5 w-5 text-green-600" />
//             </div>
//             <h3 className="text-lg font-rubikMedium text-gray-900">Plan Details</h3>
//           </div>
//           <div className="space-y-3">
//             <div>
//               <p className="text-sm text-gray-600">Current Plan</p>
//               <p className="font-rubikMedium text-gray-900 text-lg">{data.plan}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Annual Membership</p>
//               <p className="font-rubikMedium text-gray-900">{data.annualMembership}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Trial Access</p>
//               <p className="font-rubikMedium text-gray-900">{data.trialAccess}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Billing Information */}
//       <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 mb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 bg-purple-100 rounded-lg">
//             <Calendar className="h-5 w-5 text-purple-600" />
//           </div>
//           <h3 className="text-lg font-rubikMedium text-gray-900">Billing Information</h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="flex items-center gap-3">
//             <Calendar className="h-4 w-4 text-gray-500" />
//             <div>
//               <p className="text-sm text-gray-600">Start Date</p>
//               <p className="font-rubikMedium text-gray-900">{data.startDate}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <Clock className="h-4 w-4 text-gray-500" />
//             <div>
//               <p className="text-sm text-gray-600">Next Billing</p>
//               <p className="font-rubikMedium text-gray-900">{data.nextBilling}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Payment Details Section */}
//       <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-100 mb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 bg-orange-100 rounded-lg">
//             <CreditCard className="h-5 w-5 text-orange-600" />
//           </div>
//           <h3 className="text-lg font-rubikMedium text-gray-900">Payment Details</h3>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <p className="text-sm text-gray-600 mb-2">Payment Method</p>
//             <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
//               <CreditCard className="h-4 w-4 text-gray-500" />
//               <p className="font-rubikMedium text-gray-900">{data.paymentMethod}</p>
//             </div>
//           </div>
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <div className="flex items-start gap-3">
//               <FileText className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
//               <div>
//                 <p className="text-sm font-rubikMedium text-blue-900 mb-1">Additional Information</p>
//                 <p className="text-sm text-blue-800">{data.paymentDetails}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-4 pt-4 border-t border-gray-200">
//         <button
//           className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-rubikMedium rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ViewDetailsModal;


"use client";
import React, { useRef, useEffect, useState } from "react";
import { X, CreditCard, FileText, User, Mail, Calendar, Clock, Shield } from "lucide-react";
import api from "@/lib/api";

function ViewDetailsModal({ subscriber, onClose }) {
  const statusDropdownRef = useRef(null);
  const [subscriberData, setSubscriberData] = useState(null);

  const defaultSubscriber = {
    user: "Unknown User",
    email: "unknown@email.com",
    plan: "N/A",
    annualMembership: "N/A",
    status: "Unknown",
    startDate: "N/A",
    nextBilling: "N/A",
    trialAccess: "N/A",
    paymentMethod: "N/A",
    paymentDetails: "No payment details available",
  };

  useEffect(() => {
    const fetchSubscriberDetails = async () => {
      if (subscriber?.id) {
        try {
          const response = await api.get(`/api/subscriptions/${subscriber.id}`);
          setSubscriberData(response.data);
        } catch (error) {
          console.error("Error fetching subscriber details:", error);
          setSubscriberData(defaultSubscriber);
        }
      } else {
        setSubscriberData(defaultSubscriber);
      }
    };
    fetchSubscriberDetails();
  }, [subscriber]);

  const data = subscriberData || defaultSubscriber;

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
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h5 className="text-2xl font-rubikBold text-gray-900">Subscription Details</h5>
        <div className={getStatusBadge(data.status)}>
          {data.status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-rubikMedium text-gray-900">User Information</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-rubikMedium text-gray-900">{data.user}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-rubikMedium text-gray-900">{data.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-rubikMedium text-gray-900">Plan Details</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Current Plan</p>
              <p className="font-rubikMedium text-gray-900 text-lg">{data.plan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Annual Membership</p>
              <p className="font-rubikMedium text-gray-900">{data.annualMembership}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Trial Access</p>
              <p className="font-rubikMedium text-gray-900">{data.trialAccess}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-rubikMedium text-gray-900">Billing Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Start Date</p>
              <p className="font-rubikMedium text-gray-900">{data.startDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Next Billing</p>
              <p className="font-rubikMedium text-gray-900">{data.nextBilling}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-100 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-orange-100 rounded-lg">
            <CreditCard className="h-5 w-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-rubikMedium text-gray-900">Payment Details</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Payment Method</p>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <p className="font-rubikMedium text-gray-900">{data.paymentMethod}</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-rubikMedium text-blue-900 mb-1">Additional Information</p>
                <p className="text-sm text-blue-800">{data.paymentDetails}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <button
          className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-rubikMedium rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewDetailsModal;