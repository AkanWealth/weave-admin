"use client";
import { ToastContext, useToastContext } from "@/contexts/toast";
import api from "@/lib/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const { showMessage } = useToastContext();
  const [availableRoles, setAvailableRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRolePermission, setSelectedRolePermission] = useState([]);
  const [enabledPermissions, setEnabledPermissions] = useState([]);
  const [enableAll, setEnableAll] = useState(false);

  useEffect(() => {
    let matchRole = availableRoles.find((role) => role.id === selectedRole);
    if (matchRole) {
      setSelectedRolePermission(matchRole.permissions);
      // Reset enabled permissions when changing roles
      setEnabledPermissions([]);
      setEnableAll(false);
    }
  }, [selectedRole]);

  const fetchRoles = async () => {
    try {
      const response = await api.get("/role");
      setAvailableRoles(response.data);
    } catch (error) {
      console.log(error);
      showMessage("Error", "Unable to fetch available roles", "error");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const [deleting, setDeleting] = useState(false);
  const deleteSelectedRole = async () => {
    setDeleting(true);
    try {
      const response = await api.delete(`/role/${selectedRole}`);
      console.log(response);
      showMessage(
        "Role deleted successfully",
        "Role deleted successfully, refresh to see changes",
        "success"
      );
    } catch (error) {
      showMessage("Error", "Error deleting role", "error");
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  // Handle Enable All checkbox change
  const handleEnableAllChange = (e) => {
    const isChecked = e.target.checked;
    setEnableAll(isChecked);
    
    if (isChecked) {
      // If checked, enable all permissions
      const allPermissionIds = selectedRolePermission.map(permission => permission.id);
      setEnabledPermissions(allPermissionIds);
    } else {
      // If unchecked, disable all permissions
      setEnabledPermissions([]);
    }
  };

  // Handle individual permission checkbox change
  const handlePermissionChange = (permissionId, isChecked) => {
    if (isChecked) {
      // Add to enabled permissions
      setEnabledPermissions(prev => [...prev, permissionId]);
    } else {
      // Remove from enabled permissions
      setEnabledPermissions(prev => prev.filter(id => id !== permissionId));
    }
  };

  // Check if permission is in enabled permissions
  const isPermissionEnabled = (permissionId) => {
    return enabledPermissions.includes(permissionId);
  };

  // Update enableAll state when individual permissions change
  useEffect(() => {
    if (selectedRolePermission.length > 0 && enabledPermissions.length === selectedRolePermission.length) {
      setEnableAll(true);
    } else {
      setEnableAll(false);
    }
  }, [enabledPermissions, selectedRolePermission]);

  // Reset all permissions
  const handleReset = () => {
    setEnabledPermissions([]);
    setEnableAll(false);
  };

  // Save permissions
  const handleSave = async () => {
    // Implement your save logic here
    showMessage("Success", "Permissions saved successfully", "success");
  };

  return (
    <div>
      <h1 className="text-xl font-rubikMedium my-2">
        <Link href={"/users"} className="text-gray-500">
          {" "}
          User Management{" "}
        </Link>{" "}
        {" > "} Manage Roles
      </h1>

      <div className="text-right">
        <Link
          href={"/users/manage-roles/add"}
          className="px-4 p-2 border border-weave-primary bg-weave-primary text-base-white text-sm rounded-md"
        >
          Add New Role
        </Link>
      </div>

      <div
        className="mt-4 bg-base-white rounded-xl"
        style={{ overflow: "hidden" }}
      >
        {/* manage roles */}
        <div className="bg-gray-300 p-4">
          <div className="flex">
            <div className="flex-1">
              <h5 className="text-xl font-rubikMedium flex">
                <span className="flex-1">Role</span>

                <select
                  name=""
                  id=""
                  className="capitalize text-sm p-2 rounded-md font-rubikRegular"
                  onChange={(e) => setSelectedRole(e.target.value)}
                  value={selectedRole}
                >
                  <option value="">Select Role</option>
                  {availableRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name.replace(/_/, " ")}
                    </option>
                  ))}
                </select>
              </h5>
            </div>

            <div className="flex-1 px-4">
              <div className="flex text-sm font-rubikMedium text-center">
                <div className="m-auto flex-1">
                  Enable All{" "}
                  <input 
                    type="checkbox" 
                    checked={enableAll}
                    onChange={handleEnableAllChange}
                    disabled={selectedRolePermission.length === 0}
                  />
                </div>
                <button 
                  className="px-4 py-2 mr-4 rounded-md"
                  onClick={handleReset}
                  disabled={selectedRolePermission.length === 0}
                >
                  Reset
                </button>
                <button 
                  className="bg-weave-primary text-base-white px-4 py-2 mx-4 rounded-md"
                  onClick={handleSave}
                  disabled={selectedRolePermission.length === 0}
                >
                  Save
                </button>
                {selectedRole !== "" ? (
                  <button
                    className="bg-red-500 text-base-white px-4 py-2 mx-4 rounded-md"
                    onClick={() => deleteSelectedRole()}
                  >
                    {deleting ? "Deleting" : "Delete"}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* permission table */}
        <table className="w-full">
          <tbody>
            <tr className="border">
              <th className="p-4 border">Permission</th>
              <th className="p-4 border">Action</th>
            </tr>
            {selectedRolePermission.length > 0 ? (
              selectedRolePermission.map((permission) => (
                <tr className="border" key={permission.id}>
                  <td className="p-4 border capitalize">
                    {permission.name.replace(/_/, " ")}
                  </td>
                  <td className="p-4 border">
                    <input
                      type="checkbox"
                      name="permission"
                      id={permission.id}
                      value={permission.id}
                      checked={isPermissionEnabled(permission.id)}
                      onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-4 text-center">
                  Select a role to view permissions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function () {
  return (
    <ToastContext>
      <Page />
    </ToastContext>
  );
}