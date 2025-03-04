"use client";
import Button from "@/components/elements/Button";
import InputField from "@/components/elements/TextField";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";

function ManageRoles() {
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);

  const fetchAvailablePermissions = async () => {
    try {
      const response = await api.get("/role");
      const super_admin = response.data.find(
        (role) => role.name === "super_admin"
      );
      setAvailablePermissions(super_admin.permissions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAvailablePermissions();
  }, []);
  return (
    <>
      <div className="max-w-[300px]">
        <InputField label={"Role"} placeholder={"Data Analyst"} />
      </div>
      <div
        className="my-4 bg-base-white rounded-xl"
        style={{ overflow: "hidden" }}
      >
        {/* manage roles */}
        <div className="bg-gray-300 p-4">
          <div className="flex">
            <div className="flex-1">
              {/* <h5 className="text-xl font-rubikMedium flex">
                <span className="flex-2">Role</span>

                <select
                  name=""
                  id=""
                  className="text-sm p-2 rounded-md font-rubikRegular"
                >
                  <option value="">Super Admin</option>
                  <option value="">Admin</option>
                  <option value="">Content Management</option>
                </select>
              </h5> */}
            </div>

            <div className="flex-1 px-4 text-sm text-right">
              <div className="m-auto inline-block">
                Enable All <input type="checkbox" name="" id="" />
              </div>
              <button className="px-4 py-2 mr-4 rounded-md font-rubikMedium ">
                Reset
              </button>
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

      <div className="flex my-4 w-2/3 max-w-[600px] absolute right-0">
        <div className="flex-1 px-2">
          <button
            className="w-full py-2 border border-1 border-gray-900 font-rubikMedium rounded-md"
            onClick={() => {}}
          >
            Cancel
          </button>
        </div>
        <div className="flex-1 px-2">
          <Button title={"Save"} onClick={() => {}} />
        </div>
      </div>
    </>
  );
}

export default ManageRoles;
