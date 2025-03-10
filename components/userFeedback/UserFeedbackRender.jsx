"use client";
import React, { useState } from "react";
import { Eye, MessageSquareMore } from "lucide-react";
import IssueResolutionModal from "@/ModalPages/User_Feedback/Issue_Resolution";
import { createPortal } from "react-dom";

const UserFeedbackRender = ({ info, onStatusUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Function to get the appropriate status badge color
  const getStatusBadge = (status) => {
    const statusStyles = {
      "New": "bg-teal-500 text-white",
      "In-progress": "bg-orange-500 text-white",
      "Resolved": "bg-[#24983F] text-white",
      "Closed": "bg-gray-500 text-white",
      "default": "bg-gray-200 text-gray-800"
    };
    
    const style = statusStyles[status] || statusStyles.default;
    
    return (
      <div className={`${style} px-3 py-1 rounded-full text-sm font-medium inline-block w-auto whitespace-nowrap`}>
        {status}
      </div>
    );
  };

  const truncateText = (text, maxLength = 40) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle status updates from the modal
  const handleStatusUpdate = (userId, newStatus) => {
    if (onStatusUpdate) {
      onStatusUpdate(userId, newStatus);
    }
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-50 text-sm text-gray-600">
        <td className="py-3 px-6 whitespace-nowrap">{info.userId}</td>
        <td className="py-3 whitespace-nowrap">{info.username}</td>
        <td className="py-3 whitespace-nowrap">{info.dateTime}</td>
        <td className="py-3 max-w-xs">{truncateText(info.issueSummary, 40)}</td>
        <td className="py-3 whitespace-nowrap">
          {getStatusBadge(info.status)}
        </td>
        <td className="py-3 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <button 
              className="text-weave-primary hover:text-blue-600"
              onClick={handleOpenModal}
              aria-label="View issue details"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              className="text-gray-600 hover:text-blue-600"
              aria-label="Message user"
            >
              <MessageSquareMore className="w-5 h-5" />
            </button>
          </div>
        </td>
      </tr>

      {/* Render modal with portal outside the table structure */}
      {isModalOpen && typeof document !== 'undefined' && 
        createPortal(
          <IssueResolutionModal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
            issueData={info}
            onStatusUpdate={handleStatusUpdate}
          />,
          document.body
        )
      }
    </>
  );
};

export default UserFeedbackRender;