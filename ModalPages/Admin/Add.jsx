import React, { useState } from "react";
import InputField from "@/components/elements/TextField";
import Button from "@/components/elements/Button";

function AddAdmin() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDisabled = firstname === "" || lastname === "" || email === "";
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState("");

  const submitUser = async () => {
    setIsSubmitting(true);
    if (firstname == "" || lastname == "" || email == "") {
      setError("User name cannot be left empty");
      return;
    }
    try {
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="w-1/2 text-center mx-auto">
        <h1 className="text-2xl my-2 font-rubikBold">Add Admin User</h1>
        <p className="text-gray-400 text-sm">
          Fill out the form below to invite a new admin and assign appropriate
          permissions
        </p>
      </div>
      <div className="flex justify-center w-2/3 mx-auto my-4">
        <button className="text-gray-500 px-2">
          <i className="fa fa-user-plus"></i> Profile Information
        </button>

        <button className="text-gray-500 px-2">
          <i className="fa fa-cogs"></i>
          Permission Management
        </button>
      </div>
      {activeTab === "profile" ? (
        <form>
          <div className="flex flex-col space-y-4">
            <InputField
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
            />
            <InputField
              value={email}
              setValue={setEmail}
              label={"Email Address"}
              placeholder={"admin@example.com"}
              error={error}
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
        </form>
      ) : (
        <>
          <div className="bg-gray-300 p-4">
            <div className="flex">
              <div className="flex-1">
                <h5 className="text-xl font-rubikMedium flex">
                  <span className="flex-1">Role</span>

                  <select
                    name=""
                    id=""
                    className="text-sm p-2 rounded-md font-rubikRegular"
                  >
                    <option value="">Super Admin</option>
                    <option value="">Admin</option>
                    <option value="">Content Management</option>
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

          <div className="flex my-4">
            <div className="flex-1 px-2">
              <button
                className="w-full py-2 border border-1 border-gray-900 font-rubikMedium rounded-md"
                onClick={() => setActiveTab("profile")}
              >
                Back
              </button>
            </div>
            <div className="flex-1 px-2">
              <Button
                title={isSubmitting ? "Sending Invite" : "Invite User"}
                disabled={isDisabled}
                onClick={() => submitUser()}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddAdmin;
