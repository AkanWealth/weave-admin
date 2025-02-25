"use client";
import { ToastContext, useMessageContext } from "@/contexts/toast";
import api from "@/lib/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const { showMessage } = useMessageContext();
  const [availableRoles, setAvailableRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRolePermission, setSelectedRolePermission] = useState([]);

  useEffect(() => {
    matchRole = availableRoles.find((role) => role.id === selectedRole);
    console.log(matchRole);
    setSelectedRolePermission(matchRole.permissions);
  }, [selectedRole]);

  const fetchRoles = async () => {
    try {
      const response = await api.get("/role");
      setAvailableRoles(response.data);
    } catch (error) {
      console.log(error);
      showMessage("Unable to fetch available roles", "error");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

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
                  Enable All <input type="checkbox" name="" id="" />
                </div>
                <button className="px-4 py-2 mr-4 rounded-md">Reset</button>
                <button className="bg-weave-primary text-base-white px-4 py-2 mx-4 rounded-md">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* permission table */}
        <table className="w-full">
          <tbody>
            <tr className="border">
              <th className="p-4 border">Action</th>
              <th className="p-4 border">View</th>
              <th className="p-4 border">Manage</th>
              <th className="p-4 border">Export</th>
            </tr>
            <tr className="border">
              <td className="p-4 border">Dashboard</td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
            </tr>
            <tr className="border">
              <td className="p-4 border">User Management</td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
            </tr>
            <tr className="border">
              <td className="p-4 border">Content Management</td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
            </tr>
            <tr className="border">
              <td className="p-4 border">Audit Logs</td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
              <td className="p-4 border">
                <input type="checkbox" name="" id="" />
              </td>
            </tr>
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
