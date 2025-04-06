"use client";
import { useToastContext } from "@/contexts/toast";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import EmptyList from "../elements/EmptyList";
import UserRender from "./userRender";
import PaginatedItems from "../elements/Pagination";
import { Search, ChevronUp } from "lucide-react";
import TableExportPDF from "@/components/elements/ExportasPDF";
import EditAdmin from "@/ModalPages/Admin/Edit";
import {X, Copy, CheckCircle } from "lucide-react";


function AdminList() {
  const [users, setUsers] = useState(null);
  const [filteredList, setFilteredlist] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { showMessage } = useToastContext();
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");


  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchRoles = async () => {
    try {
      const response = await api.get("/role");
      if (response.status === 200) {
        console.log(response);
        setRoles(response.data);
        return;
      }
      showMessage("Unable to fetch roles", "", "error");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedRole === "") return setFilteredlist(users);
    setSearchKey("");
    const filtered = users
      .filter((user) => user.role.name === selectedRole)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setFilteredlist(filtered);
  }, [selectedRole]);

  const fetchUsers = async () => {
    setFetchingUsers(true);
    try {
      const response = await api.get("/usage-analytics/admin");
      console.log(response.data);
      if (response.status === 200) {
        // Sort users by created_at date in descending order (newest first)
        const sortedUsers = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        
        setUsers(sortedUsers);
        setFilteredlist(sortedUsers);
        return;
      }
      showMessage("Unable to fetch admin users", "", "error");
    } catch (err) {
      console.log(err);
      showMessage("Error fetching admin users", "", "error");
    } finally {
      setFetchingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const resendInvite = async (email) => {
    try {
      const response = await api.post("/super-admin/resend-invitation", {
        email,
      });
      console.log(response);
      showMessage("Invite resent to user", "", "success");
      
    } catch (error) {
      showMessage(
        error.response.data.message || "Error resending invite",
        "",
        "error"
      );
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchKey === "") return;
    const matchresult = users
      .filter((user) =>
        Object.values(user)
          .join("  ")
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setFilteredlist(matchresult);
  }, [searchKey]);

  const handleEditUser = async (user) => {
    try {
      setFetchingUsers(true);
      // Fetch complete user details by ID
      const response = await api.get(`/users/profile/${user.id}`);
      console.log(response);

      if (response.status === 200) {
        // Combine fetched data with complete role object
        const userWithCompleteRole = {
          ...response.data,
          role: roles.find(r => r.id === response.data.role.id) || response.data.role
        };
        
        setSelectedUser(userWithCompleteRole);
        setShowEditModal(true);
      } else {
        showMessage("Failed to fetch user details", "", "error");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      showMessage(
        error.response?.data?.message || "Error fetching user details",
        "",
        "error"
      );
    } finally {
      setFetchingUsers(false);
    }
  };

  // Function to close the modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = async (updatedUser) => {
    try {
      if (users) {
        const updatedUsers = users
          .map(user => user.id === updatedUser.id ? updatedUser : user)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setUsers(updatedUsers);
        setFilteredlist(updatedUsers);
      }
      
      showMessage("User updated successfully", "", "success");
      closeEditModal();
      
      await fetchUsers(); // This will re-fetch and re-sort
    } catch (error) {
      console.error("Error updating user:", error);
      showMessage(
        "Error updating user",
        "",
        "error"
      );
    }
  };

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
              className="bg-gray-200 rounded-md w-full pl-10 pr-4 py-2 placeholder:text-gray-500 "
              placeholder="Search here..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex justify-end gap-3">
          <TableExportPDF
            data={
              filteredList
                ? filteredList.map((user) => ({
                    ...user,
                    status: user.isActive ? "Active" : "Inactive",
                    role: user.role?.name || "N/A",
                    created_date: new Date(
                      user.created_at
                    ).toLocaleDateString(),
                    username: user.username || user.email,
                  }))
                : []
            }
            columns={[
              { header: "Username", accessor: "username" },
              { header: "Email", accessor: "email" },
              { header: "Role", accessor: "role" },
              { header: "Date Created", accessor: "created_date" },
              { header: "Status", accessor: "status" },
            ]}
            fileName="Admin_Users_List.pdf"
            title="Admin Users List"
            buttonText="Export"
          />
          <button className="relative dropdown border py-2 px-4 rounded-md font-medium flex items-center">
            Filter
            <ChevronUp className="w-4 h-4 ml-2 rotate-180" />
            <div className="absolute top-10 right-0 rounded-md p-1 shadow bg-white text-xs w-[200px]  dropdown-menu">
              <div className="flex flex-col text-left">
                <a
                  className={`p-2 capitalize rounded-md mb-1`}
                  onClick={() => setSelectedRole("")}
                >
                  Reset Filter
                </a>
                {roles.map((role) => (
                  <a
                    className={`p-2 capitalize rounded-md mb-1 ${
                      selectedRole === role.name ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setSelectedRole(role.name)}
                    key={role.id}
                  >
                    {role.name.replace(/_/, " ")}
                  </a>
                ))}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* users list table */}
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
        <div className="bg-base-white my-4 shadow">
          <PaginatedItems
            items={filteredList}
            itemsPerPage={10}
            displayType={"table"}
            renderItems={(user) => (
              <UserRender
                info={user}
                date={new Date(user.created_at)}
                key={Math.random()}
                resendInvite={resendInvite}
                onEditClick={handleEditUser}
              />
            )}
            renderTitle={() => (
              <tr className="bg-[#f5f6fa] ">
                <th className="text-left px-16">Username</th>
                <th className="text-left">Role</th>
                <th className="text-left">Date</th>
                <th className="text-left">Status</th>
                <th className="text-left"></th>
              </tr>
            )}
          />
        </div>
      ) : (
        <EmptyList />
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit User</h2>
              <button 
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5"/>
              </button>
            </div>
            <EditAdmin 
              userData={selectedUser} 
              onSave={handleUserUpdate}
              onCancel={closeEditModal}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminList;