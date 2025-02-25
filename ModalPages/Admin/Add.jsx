"use client";
import React, { useEffect, useState } from "react";
import InputField from "@/components/elements/TextField";
import Button from "@/components/elements/Button";
import api from "@/lib/api";
import { useModalContext } from "@/components/elements/Modal";

function AddAdmin() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDisabled = email === "";
  // const isDisabled = firstname === "" || lastname === "" || email === "";
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const { showMessage } = useModalContext();
  const [availableRoles, setAvailableRoles] = useState([]);

  useEffect(() => {
    const matchRole = availableRoles.find((role) => role.id === selectedRole);
    if (matchRole) setPermissions(matchRole.permissions);
    // console.log(matchRole);
  }, [selectedRole]);

  const addTopermission = (elem) => {
    console.log(elem.target.checked);
    if (elem.target.checked) {
      let inPerms = selectedPermissions.find(
        (item) => elem.target.value === item
      );
      if (!inPerms) setSelectedPermissions([...permissions, elem.target.value]);
    } else {
      setSelectedPermissions(
        selectedPermissions.filter((item) => item !== elem.target.value)
      );
    }
  };

  const checkInPerm = (perm) => {
    console.log(perm);
    return selectedPermissions.find((item) => item === perm) || false;
  };

  const checkAllPerms = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      const perms = permissions.map((perm) => perm.id);
      setSelectedPermissions([...perms]);
    } else {
      setSelectedPermissions([]);
    }
  };

  useEffect(() => {
    console.log(permissions);
  }, [permissions]);

  const submitUser = async () => {
    setIsSubmitting(true);
    if (email == "") {
      // if (firstname == "" || lastname == "" || email == "") {
      setError("User name cannot be left empty");
      return;
    }
    try {
      const data = {
        // fullName: `${firstname} ${lastname}`,
        // userName: email,
        email,
        roleId: selectedRole,
        permissionIds: selectedPermissions,
      };

      const response = await api.post("/super-admin/invite", data);
      if (response.status === 201)
        return showMessage("User invite sent successfully", "success");

      showMessage("Error sending invite", "error");
    } catch (error) {
      showMessage(
        error.response.data.message || "Error sending invite",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <form name="add-admin-form">
      <div className="w-1/2 text-center mx-auto">
        <h1 className="text-2xl my-2 font-rubikBold">Add Admin User</h1>
        <p className="text-gray-400 text-sm">
          Fill out the form below to invite a new admin and assign appropriate
          permissions
        </p>
      </div>
      <div className="flex justify-center w-2/3 mx-auto my-4">
        <button
          className="text-gray-500 px-2"
          type="button"
          onClick={() => setActiveTab("profile")}
        >
          <i className="fa fa-user-plus"></i> Profile Information
        </button>

        <button
          className="text-gray-500 px-2"
          type="button"
          onClick={(e) => setActiveTab("role")}
        >
          <i className="fa fa-cogs"></i>
          Permission Management
        </button>
      </div>
      <div className={activeTab === "profile" ? "" : "hidden"}>
        <div className="flex flex-col space-y-6">
          {/* <InputField
            value={firstname}
            setValue={setFirstname}
            label={"First Name"}
            placeholder={"Enter user Firstname"}
            error={error}
          />
          <InputField
            value={lastname}
            setValue={setLastname}
            label={"Last Name"}
            placeholder={"Enter user Last name"}
            error={error}
          /> */}
          <InputField
            value={email}
            setValue={setEmail}
            label={"Email Address"}
            placeholder={"admin@example.com"}
            error={error}
            className={"mb-4"}
          />
        </div>

        <div className="flex my-4">
          <div className="flex-1 px-2">
            <button className="w-full py-2 border border-1 border-gray-900 font-rubikMedium rounded-md">
              Cancel
            </button>
          </div>
          <div className="flex-1 px-2">
            <Button
              title={"Next"}
              disabled={isDisabled}
              onClick={() => setActiveTab("role")}
            />
          </div>
        </div>
      </div>
      <div className={activeTab !== "profile" ? "" : "hidden"}>
        <div className="bg-gray-300 p-4">
          <div className="flex">
            <div className="flex-1">
              <h5 className="text-xl font-rubikMedium flex">
                <span className="flex-1">Role</span>

                <select
                  name=""
                  className="text-sm p-2 rounded-md font-rubikRegular"
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                  }}
                >
                  <option value=""> Select Role </option>
                  {availableRoles.map((role) => (
                    <option
                      value={role.id}
                      key={role.id}
                      className="capitalize"
                    >
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
                    value={"enable_all"}
                    onChange={(e) => checkAllPerms(e)}
                  />
                </div>
                <button className="px-4 py-2 mr-4 rounded-md" type="button">
                  Reset
                </button>
                <button
                  className="bg-weave-primary text-base-white px-4 py-2 mx-4 rounded-md"
                  type="button"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="w-full">
          <tbody>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>

            {permissions.length > 0 ? (
              permissions.map((permission) => (
                <tr key={permission.id}>
                  <td>{permission.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={permission.id}
                      onChange={(e) => addTopermission(e)}
                      checked={
                        selectedPermissions.find(
                          (perm) => perm === permission.id
                        )
                          ? true
                          : false
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No permissions here</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <table className="w-full">
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
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="VIEW_DASHBOARD"
                  checked={checkInPerm("VIEW_DASHBOARD")}
                />
              </td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="MANAGE_DASHBOARD"
                  checked={checkInPerm("MANAGE_DASHBOARD")}
                />
              </td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="EXPORT_DASHBOARD"
                  checked={checkInPerm("EXPORT_DASHBOARD")}
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-4 border">User Management</td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="VIEW_USERS"
                  checked={checkInPerm("VIEW_USERS")}
                />
              </td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="MANAGE_USERS"
                  checked={checkInPerm("MANAGE_USERS")}
                />
              </td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="EXPORT_USERS"
                  checked={(e)=>checkInPerm("EXPORT_USERS")}
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-4 border">Content Management</td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="VIEW_CONTENT"
                  checked={checkInPerm("VIEW_CONTENT")}
                />
              </td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="MANAGE_CONTENT"
                  checked={checkInPerm("MANAGE_CONTENT")}
                />
              </td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="EXPORT_CONTENT"
                  checked={checkInPerm("EXPORT_CONTENT")}
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-4 border">Audit Logs</td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="VIEW_AUDIT"
                  checked={checkInPerm("VIEW_AUDIT")}
                />
              </td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="MANAGE_AUDIT"
                  checked={checkInPerm("MANAGE_AUDIT")}
                />
              </td>
              <td className="p-4 border">
                <input
                  type="checkbox"
                  onChange={(e) => checkPermission(e)}
                  value="EXPORT_AUDIT"
                  checked={checkInPerm("EXPORT_AUDIT")}
                />
              </td>
            </tr>
          </tbody>
        </table> */}

        <div className="flex my-4">
          <div className="flex-1 px-2">
            <button
              className="w-full py-2 border border-1 border-gray-900 font-rubikMedium rounded-md"
              onClick={() => setActiveTab("profile")}
              type="button"
            >
              Back
            </button>
          </div>
          <div className="flex-1 px-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                submitUser();
              }}
              className={
                (isDisabled ? "bg-base-secondary" : "bg-weave-primary") +
                " py-2 text-base-white w-full rounded-md"
              }
              disabled={isDisabled}
            >
              {isSubmitting ? "Sending Invite" : "Invite User"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddAdmin;
