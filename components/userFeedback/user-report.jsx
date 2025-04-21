"use client";
import { useToastContext } from "@/contexts/toast";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import UserEmptyList from "../elements/UserEmptyList";
import PaginatedItems from "../elements/Pagination";
import { Search, ChevronUp } from "lucide-react";
import UserFeedbackRender from "./UserFeedbackRender";

function UserReport() {
  const [users, setUsers] = useState(null);
  const [filteredList, setFilteredlist] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { showMessage } = useToastContext();
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  

  // Function to map backend status to frontend display status
  const mapStatusForDisplay = (backendStatus) => {
    if (backendStatus === "Pending") {
      return "In Progress";
    }
    else if (backendStatus === "In Progress") {
      return "In Progress";
    }
    return backendStatus;
  };

  const fetchStatuses = async () => {
    try {
      // For testing, dummy statuses instead of API call
      const dummyStatuses = [
        { id: 1, name: "In Progress" },
        { id: 2, name: "Resolved" },
        { id: 3, name: "Closed" },
        { id: 4, name: "Unassigned" } // Add "Unassigned" filter option
      ];
      setStatuses(dummyStatuses);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get current user role and ID
  const getCurrentUserInfo = async () => {
    try {
      // Get current user info from API
      const response = await api.get('/auth/me');
      
      if (response.status === 200 && response.data && response.data.user) {
        // Extract role name from the user object based on the provided API response structure
        const roleName = response.data.user.role?.name || null;
        setUserRole(roleName);
        setCurrentUserId(response.data.user.id);
        console.log("Current user role:", roleName);
        console.log("Current user ID:", response.data.user.id);
      }
    } catch (error) {
      console.log("Error fetching user info:", error);
      // Fallback to localStorage if API fails
      try {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
          const userInfo = JSON.parse(storedUser);
          const roleName = userInfo.role?.name || null;
          setUserRole(roleName);
          setCurrentUserId(userInfo.id);
          console.log("Using stored user role:", roleName);
        }
      } catch (e) {
        console.log("Error parsing stored user info:", e);
      }
    }
  };

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  useEffect(() => {
    if (!users) return;
    
    // Apply status filter if selected
    let filtered = users;
    
    if (selectedStatus !== "") {
      filtered = users.filter((user) => {
        if (selectedStatus === "Unassigned") {
          return user.assignedAdmin?.id === null;
        }
        return mapStatusForDisplay(user.status) === selectedStatus;
      });
    }
    
    // Apply role-based filtering
    if (userRole && userRole !== "super_admin") {
      filtered = filtered.filter(issue => 
        issue.assignedAdmin && issue.assignedAdmin.id === currentUserId
      );
    }
    
    setFilteredlist(filtered);
    setSearchKey("");
  }, [selectedStatus, users, userRole, currentUserId]);

  const fetchUsers = async () => {
    setFetchingUsers(true);
    try {
      const response = await api.get('/help-support/issue-report');
      console.log(response.status);
      console.log("issue:", response.data.issueReports);
      console.log("attachmentUrl:", response.data.issueReports.attachmentUrl);
      
      if (response.status === 200 && response.data.issueReports) {
        const mappedData = response.data.issueReports.map(issue => ({
          id: issue.id,
          userId: issue.id,
          username: issue.email,
          dateTime: new Date(issue.created_at).toLocaleString(),
          created_at: issue.created_at, // Store the original date for sorting
          issueSummary: `${issue.description}`,
          attachmentUrl: issue.attachmentUrl, 
          status: issue.status,
          assignedAdmin: {
            id: issue.assignedAdmin?.id || null,
            username: issue.assignedAdmin?.username || 'Unassigned'
          },
        }));
        
        // Sort by created_at in descending order (newest first)
        const sortedData = mappedData.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        
        console.log("sorted data", sortedData);
        setUsers(sortedData);
        
        // Apply role-based filtering on initial data fetch
        if (userRole && userRole !== "super_admin" && currentUserId) {
          const roleFiltered = sortedData.filter(issue => 
            issue.assignedAdmin && issue.assignedAdmin.id === currentUserId
          );
          setFilteredlist(roleFiltered);
        } else {
          setFilteredlist(sortedData);
        }
      } else {
        // showMessage("Error fetching user reported issues", "", "error");
      }
      setFetchingUsers(false);
    } catch (err) {
      console.log(err);
      showMessage("Error fetching user reported issues", "", "error");
      setFetchingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStatuses();
  }, []);

  useEffect(() => {
    if (searchKey === "" || !users) return;
    
    // Get base list of issues the user is allowed to see
    let baseList = users;
    if (userRole && userRole !== "super_admin" && currentUserId) {
      baseList = users.filter(issue => 
        issue.assignedAdmin && issue.assignedAdmin.id === currentUserId
      );
    }
    
    // Apply search filter
    const matchresult = baseList.filter((user) =>
      Object.values(user)
        .join("  ")
        .toLowerCase()
        .includes(searchKey.toLowerCase())
    );

    setFilteredlist(matchresult);
  }, [searchKey, users, userRole, currentUserId]);

  return (
    <>
      <div className="flex flex-col lg:flex-row mb-4 items-start gap-4">
        <div className="w-full lg:w-3/4 h-1/2">
          <div className="relative border rounded-md px-8 py-2 bg-white">
            <div className="absolute inset-y-0 left-3 flex items-center pl-6">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-gray-200 rounded-md w-full pl-10 pr-4 py-2 placeholder:text-gray-500"
              placeholder="Search by user name of user ID"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex justify-end gap-3">
          {userRole && userRole !== "super_admin" && (
            <div className="bg-blue-100 text-blue-800 py-2 px-4 rounded-md text-sm">
              Viewing issues assigned to you
            </div>
          )}
          <button className="relative dropdown border py-2 px-4 rounded-md font-medium flex items-center">
            Filter
            <ChevronUp className="w-4 h-4 ml-2 rotate-180" />
            <div className="absolute top-10 right-0 rounded-md p-1 shadow bg-white text-xs w-[200px] dropdown-menu">
              <div className="flex flex-col text-left">
                <a
                  className={`p-2 capitalize rounded-md mb-1`}
                  onClick={() => setSelectedStatus("")}
                >
                  Reset Filter
                </a>
                {statuses.map((status) => (
                  <a
                    className={`p-2 capitalize rounded-md mb-1 ${
                      selectedStatus === status.name ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setSelectedStatus(status.name)}
                    key={status.id}
                  >
                    {status.name.replace(/_/, " ")}
                  </a>
                ))}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Users report table */}
      {fetchingUsers ? (
        <>
          {/* Table Rows Placeholder */}
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-6 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </>
      ) : users ? (
        <div className="bg-white my-4 shadow rounded-md overflow-x-auto">
          <PaginatedItems
            items={filteredList}
            itemsPerPage={10}
            displayType={"table"}
            tableClass="w-full table-fixed"
            renderItems={(item) => (
              <UserFeedbackRender
                info={{
                  userId: item.userId || item.id,
                  username: item.username || item.name,
                  dateTime: item.dateTime || item.created_at,
                  issueSummary: item.issueSummary || item.summary,
                  attachmentUrl: item.attachmentUrl || null,
                  status: mapStatusForDisplay(item.status),
                  assignedAdmin: item.assignedAdmin ? {
                    id: item.assignedAdmin.id || 'unassigned',
                    username: item.assignedAdmin.username || item.assignedAdmin || 'Unassigned'
                  } : {
                    id: 'unassigned',
                    username: 'Unassigned'
                  },
                }}
                key={item.id || Math.random()}
              />
            )}
            renderTitle={() => (
              <tr className="bg-[#f5f6fa] text-sm px-6">
                <th className="text-left px-6 py-3 whitespace-nowrap">User ID</th>
                <th className="text-left py-3 whitespace-nowrap">Username</th>
                <th className="text-left py-3 whitespace-nowrap">Date and Time</th>
                <th className="text-left py-3">Issue Summary</th>
                <th className="text-left py-3 whitespace-nowrap">Status</th>
                <th className="text-left px-6 py-3 whitespace-nowrap">Action</th>
              </tr>
            )}
          />
        </div>
      ) : (
        <UserEmptyList />
      )}
    </>
  );
}

export default UserReport;