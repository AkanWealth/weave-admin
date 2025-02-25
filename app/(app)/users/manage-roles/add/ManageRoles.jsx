"use client";
import Button from "@/components/elements/Button";
import InputField from "@/components/elements/TextField";
import { useMessageContext } from "@/contexts/toast";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ManageRoles() {
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const router = useRouter();
  const { showMessage } = useMessageContext();
  const [saving, setSaving] = useState(false);

  const fetchAvailablePermissions = async () => {
    try {
      const response = await api.get("/role");
      const super_admin = response.data.find(
        (role) => role.name === "super_admin"
      );
      setAvailablePermissions(super_admin.permissions);
    } catch (error) {
      showMessage(
        error.response.data.message || "Error fetching available permissions",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchAvailablePermissions();
  }, []);

  const addToPerm = (e) => {
    if (e.target.checked) {
      const exist = selectedPermissions.find(
        (perm) => perm.id === e.target.value
      );
      if (exist) return;
      const perm = availablePermissions.find(
        (perm) => perm.id === e.target.value
      );

      setSelectedPermissions([...selectedPermissions, perm]);
    } else {
      let notperm = selectedPermissions.filter(
        (perm) => perm.id !== e.target.value
      );
      setSelectedPermissions(notperm);
    }
  };

  const checkInPerm = (permission) => {
    let ischecked = selectedPermissions.find((perm) => perm.id === permission);
    return ischecked ? true : false;
  };

  const enable_all = (e) => {
    if (e.target.checked) {
      setSelectedPermissions(availablePermissions);
    } else {
      setSelectedPermissions([]);
    }
  };

  const saveNewRole = async () => {
    setSaving(true);
    const permissionNames = selectedPermissions.map(
      (permission) => permission.name
    );

    try {
      const response = await api.post("/role", {
        name: newRoleName,
        permissionNames,
      });
      if (response.status === 201) {
        showMessage("Role Created successfully", "success");
        router.push("/users/manage-roles");
      }
    } catch (error) {
      showMessage(
        error.response.data.message || "Error creating role",
        "error"
      );
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="max-w-[300px]">
        <InputField
          label={"Role"}
          placeholder={"Data Analyst"}
          value={newRoleName}
          setValue={setNewRoleName}
        />
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
                Enable All{" "}
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => enable_all(e)}
                  checked={
                    selectedPermissions.length === availablePermissions.length
                  }
                />
              </div>
              <button
                className="px-4 py-2 mr-4 rounded-md font-rubikMedium"
                onClick={() => setSelectedPermissions([])}
              >
                Reset
              </button>
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
            {availablePermissions.length > 0 ? (
              availablePermissions.map((permission) => (
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
                      onChange={(e) => addToPerm(e)}
                      checked={checkInPerm(permission.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex my-4 w-2/3 max-w-[600px] absolute right-0">
        <div className="flex-1 px-2">
          <button
            className="w-full py-2 border border-1 border-gray-900 font-rubikMedium rounded-md"
            onClick={() => router.back()}
          >
            Cancel
          </button>
        </div>
        <div className="flex-1 px-2">
          <Button
            title={saving ? "Saving..." : "Save"}
            onClick={() => {
              saveNewRole();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ManageRoles;
