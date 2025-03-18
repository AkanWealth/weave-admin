import React, { useState, useEffect } from "react";
import InputField from "@/components/elements/TextField";
import Button from "@/components/elements/Button";
import api from "@/lib/api";
import Image from "next/image";
import avatar from "@/assets/images/3d_avatar_1.png";
import { UserPen, Settings2 } from "lucide-react";

function EditAdmin({ userData, onSave, onCancel }) {


  const [isUserDataLoading, setIsUserDataLoading] = useState(!userData);
  // Initialize state with the passed user data
  const [firstname, setFirstname] = useState(userData?.firstName || "");
  const [lastname, setLastname] = useState(userData?.lastName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [username, setUsername] = useState(userData?.username || "");
  const [role, setRole] = useState(userData?.role?.id || "");
  const [roles, setRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  
  // Add state for permissions checkboxes
  const [permissions, setPermissions] = useState({
    dashboard: { view: false, manage: false, export: false },
    userManagement: { view: false, manage: false, export: false },
    contentManagement: { view: false, manage: false, export: false },
    auditLogs: { view: false, manage: false, export: false }
  });
  
  // Add state for the "enable all" checkbox
  const [enableAll, setEnableAll] = useState(false);

  // Fetch roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/role");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setIsLoading(false);
      }
    };
   
    fetchRoles();
    
    if (userData) {
      setFirstname(userData.firstName || "");
      setLastname(userData.lastName || "");
      setEmail(userData.email || "");
      setUsername(userData.username || "");
      setRole(userData.role?.id || "");
      
      // Initialize permissions if userData has them
      if (userData.permissions) {
        setPermissions(userData.permissions);
        
        // Check if all permissions are enabled
        const allChecked = Object.values(userData.permissions)
          .flatMap(section => Object.values(section))
          .every(value => value);
          
        setEnableAll(allChecked);
      }
      
      setIsUserDataLoading(false);
    }
  }, [userData]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
    
  //   try {
  //     // Prepare updated user data
  //     const updatedUser = {
  //       firstName: firstname,
  //       lastName: lastname,
  //       email: email,
  //       username: username
  //     };
      
  //     console.log("Sending data:", updatedUser);
     
  //     const response = await api.put(`/super-admin/profile/${userData.id}`, updatedUser);
  //     console.log("User ID:", userData.id);
     
  //     if (response.status === 200) {
  //       onSave({
  //         ...userData,
  //         firstName: firstname,
  //         lastName: lastname,
  //         email: email,
  //         username: username
  //       });
  //     }
    
      
      
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     alert("Failed to update user. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // Handle the "Enable All" checkbox change
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use the current state values (what the user typed in the form)
      const updatedUser = {
        firstName: firstname, 
        lastName: lastname,   
        email: email,         
        username: username 
      };
      
      console.log("Sending updated data to API:", updatedUser);
      
      const response = await api.put(`/super-admin/profile/${userData.id}`, updatedUser);
      
      if (response.status === 200) {

        onSave({
          ...userData, // Keep all original fields
        firstName: firstname,
        lastName: lastname,
        email: email,
        username: username,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  
  const handleEnableAllChange = (e) => {
    const isChecked = e.target.checked;
    setEnableAll(isChecked);
    
    // Update all checkboxes to match the "Enable All" state
    const updatedPermissions = {};
    
    Object.keys(permissions).forEach(section => {
      updatedPermissions[section] = {
        view: isChecked,
        manage: isChecked,
        export: isChecked
      };
    });
    
    setPermissions(updatedPermissions);
  };
  
  // Handle individual checkbox changes
  const handlePermissionChange = (section, action, value) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [section]: {
        ...prevPermissions[section],
        [action]: value
      }
    }));
    
    // Check if all permissions are enabled after update
    setTimeout(() => {
      const allChecked = Object.values(permissions)
        .flatMap(section => Object.values(section))
        .every(value => value === true);
        
      setEnableAll(allChecked);
    }, 0);
  };
  
  // Reset all permissions
  const handleReset = () => {
    setEnableAll(false);
    setPermissions({
      dashboard: { view: false, manage: false, export: false },
      userManagement: { view: false, manage: false, export: false },
      contentManagement: { view: false, manage: false, export: false },
      auditLogs: { view: false, manage: false, export: false }
    });
  };
  
  // Save permissions
  const handleSavePermissions = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare permissions data
      const permissionsData = {

          id: userData.id,
          firstName: firstname,
          lastName: lastname,
          email: email,
          roleId: role
        
      };
      
      // Make API call to update permissions
      // const response = await api.put(`/super-admin/update-admin-permissions/${userData.id}`, permissionsData);
      
      // if (response.status === 200) {
      //   alert("Permissions saved successfully!");
      //   // Update the parent component with new data
      //   onSave({
      //     ...userData,
      //     role: { id: role },
      //     permissions: permissions
      //   });
      // }
    } catch (error) {
      console.error("Error updating permissions:", error);
      // alert("Failed to update permissions. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUserDataLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-weave-primary"></div>
      </div>
    );
  }

  const isDisabled = firstname === "" || lastname === "" || email === "" || role === "" || isSubmitting;

  return (
    <div className="">
      <div className="text-center">
        <div className="flex flex-col justify-center mb-6">
          <input type="file" className="hidden" id="profile_img" />
          <div className="w-[80px] h-[80px] mx-auto">
            <Image src={userData?.profileImage || avatar} alt="User Avatar" className="w-full rounded-full" />
          </div>
          <h5 className="text-lg mt-2">{userData?.username || `${firstname} ${lastname}`}</h5>
          <h5 className="text-sm text-gray-500">{userData?.email || email}</h5>
        </div>
      </div>

      <div className="flex justify-center w-2/3 mx-auto my-4">
        <button
          className={`flex items-center px-4 py-2 text-sm relative ${
            activeTab === "profile" 
              ? "text-black font-medium" 
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <UserPen className="w-5 h-5 mr-2"/>
          Profile Information
          {activeTab === "profile" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
          )}
        </button>

        <button
          className={`flex items-center px-4 py-2 text-sm relative ${
            activeTab === "role" 
              ? "text-black font-medium" 
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("role")}
        >
          <Settings2 className="w-5 h-5 mr-2"/>
          Permission Management
          {activeTab === "role" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
          )}
        </button>
      </div>
      {activeTab === "profile" ? (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <InputField
              value={firstname}
              setValue={setFirstname}
              label={"First Name"}
              placeholder={"Enter user Firstname"}
              required={true}
            />
            <InputField
              value={lastname}
              setValue={setLastname}
              label={"Last Name"}
              placeholder={"Enter user Last name"}
              required={true}
            />
            <InputField
              value={email}
              setValue={setEmail}
              label={"Email Address"}
              placeholder={"admin@example.com"}
              required={true}
            />
            
            {/* Role dropdown field */}
            <div className="flex-column space-y-2">
              <label className="capitalize font-rubikMedium">Select Role<span className="text-red-500">*</span></label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-base-black focus:border-weave-primary focus:outline-none rounded-md font-rubikRegular"
                required
              >
                <option value="">Select role</option>
                {isLoading ? (
                  <option disabled>Loading roles...</option>
                ) : (
                  roles.map((roleOption) => (
                    <option key={roleOption.id} value={roleOption.id}>
                      {roleOption.name.replace(/_/, " ")}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="flex my-4">
            <div className="flex-1 px-2">
              <button 
                type="button"
                className="w-full py-2 border border-1 border-gray-900 font-rubikMedium rounded-md"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
            <div className="flex-1 px-2">
            <button 
                      className="bg-weave-primary text-base-white px-4 py-2 w-full rounded-md"
                      onClick={handleSubmit}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="bg-gray-300 p-4">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 mb-4 md:mb-0">
                <h5 className="text-xl font-rubikMedium flex flex-col md:flex-row">
                  <span className="mb-2 md:mb-0 md:flex-1">Role</span>

                  <select
                    name="role"
                    id="role"
                    className="text-sm p-2 rounded-md font-rubikRegular"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select role</option>
                    {isLoading ? (
                      <option disabled>Loading roles...</option>
                    ) : (
                      roles.map((roleOption) => (
                        <option key={roleOption.id} value={roleOption.id}>
                          {roleOption.name.replace(/_/, " ")}
                          
                        </option>
                      ))
                    )}
                  </select>
                </h5>
              </div>

              <div className="flex-1 px-0 md:px-4">
                <div className="flex flex-col md:flex-row text-sm font-rubikMedium text-center">
                  <div className="m-auto flex-1 mb-4 md:mb-0">
                    Enable All{" "}
                    <input 
                      type="checkbox" 
                      checked={enableAll}
                      onChange={handleEnableAllChange}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button 
                      className="px-4 py-2 mr-4 rounded-md"
                      onClick={handleReset}
                      type="button"
                    >
                      Reset
                    </button>
                    <button 
                      className="bg-weave-primary text-base-white px-4 py-2 rounded-md"
                      onClick={handleSavePermissions}
                      type="button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
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
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.dashboard.view}
                      onChange={(e) => handlePermissionChange('dashboard', 'view', e.target.checked)}
                    />
                  </td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.dashboard.manage}
                      onChange={(e) => handlePermissionChange('dashboard', 'manage', e.target.checked)}
                    />
                  </td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.dashboard.export}
                      onChange={(e) => handlePermissionChange('dashboard', 'export', e.target.checked)}
                    />
                  </td>
                </tr>
                <tr className="border">
                  <td className="p-4 border">User Management</td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.userManagement.view}
                      onChange={(e) => handlePermissionChange('userManagement', 'view', e.target.checked)}
                    />
                  </td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.userManagement.manage}
                      onChange={(e) => handlePermissionChange('userManagement', 'manage', e.target.checked)}
                    />
                  </td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.userManagement.export}
                      onChange={(e) => handlePermissionChange('userManagement', 'export', e.target.checked)}
                    />
                  </td>
                </tr>
                <tr className="border">
                  <td className="p-4 border">Content Management</td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.contentManagement.view}
                      onChange={(e) => handlePermissionChange('contentManagement', 'view', e.target.checked)}
                    />
                  </td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.contentManagement.manage}
                      onChange={(e) => handlePermissionChange('contentManagement', 'manage', e.target.checked)}
                    />
                  </td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.contentManagement.export}
                      onChange={(e) => handlePermissionChange('contentManagement', 'export', e.target.checked)}
                    />
                  </td>
                </tr>
                <tr className="border">
                  <td className="p-4 border">Audit Logs</td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.auditLogs.view}
                      onChange={(e) => handlePermissionChange('auditLogs', 'view', e.target.checked)}
                    />
                  </td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.auditLogs.manage}
                      onChange={(e) => handlePermissionChange('auditLogs', 'manage', e.target.checked)}
                    />
                  </td>
                  <td className="p-4 border text-center">
                    <input 
                      type="checkbox" 
                      checked={permissions.auditLogs.export}
                      onChange={(e) => handlePermissionChange('auditLogs', 'export', e.target.checked)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex my-4">
            <div className="flex-1 px-2">
              <button
                type="button"
                className="w-full py-2 border border-1 border-gray-900 font-rubikMedium rounded-md"
                onClick={() => setActiveTab("profile")}
              >
                Back
              </button>
            </div>
            <div className="flex-1 px-2">
              <Button
                title={isSubmitting ? "Saving..." : "Save Changes"}
                disabled={isSubmitting}
                onClick={() => handleSavePermissions()}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditAdmin;