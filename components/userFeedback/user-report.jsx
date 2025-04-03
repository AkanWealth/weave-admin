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

  // Function to generate dummy data for testing
  // const generateDummyData = () => {
  //   const statuses = ["New", "In-progress", "Resolved", "Closed"];
  //   const dummyData = [];
    
  //   for (let i = 1; i <= 30; i++) {
  //     const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
  //     dummyData.push({
  //       id: `WV${1234 + i}`,
  //       userId: `WV${1234 + i}`,
  //       username: "Hassan Taiwo Adeola",
  //       dateTime: "2024-12-08 - 08:30 AM",
  //       created_at: "2024-12-08 - 08:30 AM",
  //       issueSummary: "App crashes on load and can't register for an account",
  //       summary: "App crashes on load and can't register for an account",
  //       status: randomStatus,
  //       role: { name: i % 3 === 0 ? "admin" : i % 2 === 0 ? "user" : "manager" }
  //     });
  //   }
    
  //   return dummyData;
  // };

  // Function to map backend status to frontend display status
  const mapStatusForDisplay = (backendStatus) => {
    if (backendStatus === "Pending") {
      return "In-progress";
    }
    else if (backendStatus === "In Progress") {
      return "In-progress";

    }
    return backendStatus;
  };

  const fetchStatuses = async () => {
    try {
      // For testing, dummy statuses instead of API call
      const dummyStatuses = [
        // { id: 1, name: "New" },
        { id: 1, name: "In-progress" },
        { id: 2, name: "Resolved" },
        { id: 3, name: "Closed" }
      ];
      setStatuses(dummyStatuses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!users || selectedStatus === "") return setFilteredlist(users);
    setSearchKey("");
    const filtered = users.filter((user) => mapStatusForDisplay(user.status) === selectedStatus);
    setFilteredlist(filtered);
  }, [selectedStatus, users]);

  const fetchUsers = async () => {
    setFetchingUsers(true);
    try {

      const response = await api.get('/help-support/issue-report');
      console.log(response.status);
      console.log("issue:",response.data.issueReports);
      console.log("attachmentUrl:",response.data.issueReports.attachmentUrl);
      
      
      if (response.status === 200 && response.data.issueReports) {
      
        const mappedData = response.data.issueReports.map(issue => ({
          id: issue.id,
          userId: issue.id,
          username: issue.email,
          dateTime: new Date(issue.created_at).toLocaleString(),
          issueSummary: `${issue.description}`,
          attachmentUrl: issue.attachmentUrl, 
          status: issue.status,
          assignedAdmin: {
            id: issue.assignedAdmin?.id || null,
            username: issue.assignedAdmin?.username || 'Unassigned'
          },
        }));
        console.log("map", mappedData)
        setUsers(mappedData);
        setFilteredlist(mappedData);
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
    const matchresult = users.filter((user) =>
      Object.values(user)
        .join("  ")
        .toLowerCase()
        .includes(searchKey.toLowerCase())
    );

    setFilteredlist(matchresult);
  }, [searchKey, users]);

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