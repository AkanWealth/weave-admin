"use client";
import React, { useState, useEffect } from "react";
import { X, Paperclip, ChevronDown, OctagonAlert, UserPen } from "lucide-react";
import api from "@/lib/api";
import Top from "@/assets/images/ScreenshotTop.png";
import Bottom from "@/assets/images/SceenShotBottom.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"
import { useToastContext } from "@/contexts/toast";

const IssueResolutionModal = ({ isOpen, onClose, issueData, onStatusUpdate }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(issueData?.status || "New");
  const [assignee, setAssignee] = useState("unassigned");
  const [notificationType, setNotificationType] = useState(true);
  const { showMessage } = useToastContext();
  const [conversations, setConversations] = useState([]);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const [newStatus, setNewStatus] = useState(status);
  const [assignees, setAssignees] = useState([]);
  const [loadingAssignees, setLoadingAssignees] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const router = useRouter();


  // Function to toggle message expansion
  const toggleMessageExpansion = (id) => {
    if (expandedMessageId === id) {
      setExpandedMessageId(null);
    } else {
      setExpandedMessageId(id);
    }
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Fetch assignees from API
  const fetchAssignees = async () => {
    setLoadingAssignees(true);
    try {
      const response = await api.get('/usage-analytics/admin');

      if (response.status === 200 && response.data) {
        // Add unassigned option at the beginning
        const assigneesData = [
          { id: 'unassigned', username: 'Unassigned' },
          ...response.data
        ];

        // If the current issue has an assigned admin, ensure it's in the list
        if (issueData?.assignedAdmin && issueData.assignedAdmin.id !== 'unassigned') {
          const isAdminInList = assigneesData.some(admin => admin.id === issueData.assignedAdmin.id);

          if (!isAdminInList) {
            assigneesData.push({
              id: issueData.assignedAdmin.id,
              username: issueData.assignedAdmin.username
            });
          }
        }

        setAssignees(assigneesData);
      } else {
        setAssignees([{ id: 'unassigned', username: 'Unassigned' }]);
        showMessage("Failed to load assignees", "", "error");
      }
    } catch (error) {
      console.error("Error fetching assignees:", error);
      setAssignees([{ id: 'unassigned', username: 'Unassigned' }]);
      showMessage("Failed to load assignees", "", "error");
    } finally {
      setLoadingAssignees(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAssignees();
    }
  }, [isOpen]);

  useEffect(() => {
    if (issueData) {
      setStatus(issueData.status || "New");
      setNewStatus(issueData.status || "New");

      setAttachment(issueData.attachmentUrl);
      setAssignee(issueData.assignedAdmin?.id || 'unassigned');
      console.log("assiggnAdmin", issueData.assignedAdmin?.id)

      // Set the conversation history based on the issue description from API
      setConversations([{
        id: 1,
        message: issueData?.issueSummary || "App crashes on submit...",
        timestamp: issueData?.dateTime || "03/07/2025, 2:23 PM",
        isUser: true
      }]);
    }
  }, [issueData]);

  useEffect(() => {
    if (issueData) {
      // console.log("Attachment URL:", issueData.attachmentUrl); // Debugging
      setAttachment(issueData.attachmentUrl);
    }
  }, [issueData]);

  // Status options from your component
  const statuses = [
    // { id: 1, name: "New" },
    { id: 1, name: "In Progress" },
    { id: 2, name: "Resolved" },
    { id: 3, name: "Closed" }
  ];

  const handleSubmitResponse = async () => {
    if (!response.trim()) return;

    setLoading(true);
    try {
      // Prepare the request payload
      const payload = {
        response: response.trim(),
        sendInAppNotification: notificationType
      };
      console.log("payload", payload);
      console.log("token", localStorage.getItem('token'));
      const token = Cookies.get("accessToken");

      // Make the API call to respond to the issue
      const result = await api.post(`/help-support/respond-to-issue/${issueData.userId}`, payload, {
        // headers: {
        //   'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'application/json'
        // }
      });

      console.log("result", result);

      if (result.status === 201) {
        showMessage("Response sent successfully", "", "success");
        router.push("/user-reported-Issue?refresh=" + Date.now());

        // Update conversation history
        setConversations(prev => [
          ...prev,
          {
            id: prev.length + 1,
            message: response,
            timestamp: new Date().toLocaleString(),
            isUser: false
          }
        ]);

        setResponse("");
        onClose();
      } else {
        showMessage("Failed to send response", "", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("Failed to send response", error.response?.data?.message || "An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    if (onStatusUpdate) {
      onStatusUpdate(issueData?.userId, newStatus);
    }
  };

  const handleSaveChanges = async () => {
    try {
      console.log("Assignee:", assignee);
      console.log("Status:", status);
      console.log("User ID:", issueData.userId);

      // Use the current values from `issueData` if the user hasn't changed them
      const formattedStatus = status || issueData.status;
      const formattedAssignee = assignee || issueData.assignedAdmin?.id || "unassigned";

      const result = await api.put(`/help-support/${issueData.userId}`, {
        status: formattedStatus,
        adminId: formattedAssignee,
      });

      console.log("Result:", result);

      if (result.status === 200) {
        // Simulate API call
        setTimeout(() => {
          showMessage("Changes saved successfully", result.data.message, "success");

          // Call the `onStatusUpdate` callback if provided
          if (onStatusUpdate) {
            onStatusUpdate(issueData?.userId, formattedStatus);
          }

          // Close the modal and refresh the page
          onClose();
          router.push("/user-reported-Issue?refresh=" + Date.now());
        }, 500);
      } else {
        showMessage("Failed to save changes", "", "error");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      showMessage("Failed to save changes", "", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-[600px] w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Modified Modal Header - Close button at top right */}
        <div className="flex justify-end py-3 px-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title centered below the close button */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-medium">Issue Resolution</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center w-2/3 mx-auto">
          <button
            className={`flex items-center px-4 py-2 text-sm relative ${activeTab === "details"
              ? "text-black font-medium"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("details")}
          >
            <OctagonAlert className="w-5 h-5 mr-2" />
            Issue Details
            {activeTab === "details" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
            )}
          </button>

          <button
            className={`flex items-center px-4 py-2 text-sm relative ${activeTab === "respond"
              ? "text-black font-medium"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("respond")}
          >
            <UserPen className="w-5 h-5 mr-2" />
            Respond to User
            {activeTab === "respond" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
            )}
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-5 overflow-y-auto flex-grow">
          {activeTab === 'details' ? (
            <div className="space-y-12">
              <div className="space-y-10">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Issue ID:</label>
                  <p className="text-gray-900 font-medium">{issueData?.userId || "WV1234"}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Submitted on:</label>
                  <p className="text-gray-900">{issueData?.dateTime || "22-04-2025, 3:30PM"}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Reported by:</label>
                  <p className="text-gray-900">{issueData?.username || "Taiwo Hassan"}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Description:</label>
                  <p className="text-gray-900 bg-gray-50 rounded-md">
                    {issueData?.issueSummary || "App crashes when clicking the 'Submit' button on checkout"}
                  </p>
                </div>

                <div className="mt-8 mb-4">
                  <label className="block text-sm font-medium text-gray-500 mb-2">Attached Screenshot:</label>
                  <div
                    style={{
                      border: '2px dotted #d1d5db',
                      borderRadius: '6px',
                      padding: '1.5rem'
                    }}
                    className=" rounded-md p-2 flex items-center justify-center">
                    {/* <div className="text-center">
                      <Image src={Top} width={50} height={50} alt="Screenshot placeholder" className="mx-auto mb-2" />
                      <Image src={Bottom} width={50} height={50} alt="Screenshot placeholder" className="mx-auto" />
                    </div> */}
                    {attachment ? (
                      <div className="text-center">
                        <Image
                          src={attachment}
                          width={300}
                          height={200}
                          alt="User submitted screenshot"
                          className="mx-auto"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <Image src={Top} width={50} height={50} alt="Screenshot placeholder" className="mx-auto mb-2" />
                        <Image src={Bottom} width={50} height={50} alt="Screenshot placeholder" className="mx-auto" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row space-x-4 mt-8 mb-20">
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-700 mb-2">Status:</label>
                    <div className="relative">
                      <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        {statuses.map((option) => (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="w-3/4">
                    <label className="block text-sm text-gray-700 mb-2">Assignee:</label>
                    <div className="relative">
                      {loadingAssignees ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm text-gray-500">Loading assignees...</span>
                        </div>
                      ) : (
                        <select
                          value={assignee || issueData?.assignedAdmin?.id || "unassigned"}
                          onChange={(e) => setAssignee(e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          {assignees.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.username}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="font-semibold text-black text-base mb-2">Conversation History</h3>
                <div className="rounded-md bg-gray-50 max-h-60 overflow-y-auto">
                  {conversations.map((conversation) => (
                    <div key={conversation.id} className={`mb-4 ${conversation.isUser ? "" : "pl-4"}`}>
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className="font-medium text-base">
                            <span className="text-gray-600">User Reported:"</span>
                            <span className="ml-1 text-black">
                              {expandedMessageId === conversation.id
                                ? conversation.message
                                : truncateText(conversation.message)}
                            </span>
                            {conversation.message && conversation.message.length > 50 && (
                              <button
                                onClick={() => toggleMessageExpansion(conversation.id)}
                                className="text-weave-primary ml-2 text-sm hover:underline"
                              >
                                {expandedMessageId === conversation.id ? "Collapse" : "Read more"}
                              </button>
                            )}"

                            <span className="text-xs text-gray-500 ml-2">[{conversation.timestamp}]</span>
                          </p>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-black text-base mb-3">Compose Response</h3>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={5}
                  placeholder="Type your message here..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                />
              </div>

              <div className="ml-2 mb-20">
                <h3 className="font-medium text-gray-900 mb-3">Notification Option</h3>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="notification"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={notificationType === true} // Set to true for "In-app Notification"
                      onChange={() => setNotificationType(true)} // Set to true
                    />
                    <span className="ml-2 text-sm text-gray-700">In-app Notification</span>
                  </label>
                  <label className="flex items-center ml-2">
                    <input
                      type="radio"
                      name="notification"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ml-2"
                      checked={notificationType === false} // Set to false for "Email Notification"
                      onChange={() => setNotificationType(false)} // Set to false
                    />
                    <span className="ml-2 text-sm text-gray-700">Email Notification</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer - Adjusted padding */}
        <div className="px-6 py-4 flex justify-center space-x-6">
          <button
            onClick={onClose}
            className="w-full px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={activeTab === 'details' ? handleSaveChanges : handleSubmitResponse}
            disabled={loading || (activeTab === 'respond' && !response.trim())}
            className={`w-full px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${(loading || (activeTab === 'respond' && !response.trim()))
              ? 'opacity-50 cursor-not-allowed'
              : ''
              }`}
          >
            {loading ? 'Processing...' : activeTab === 'details' ? 'Save Changes' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueResolutionModal;