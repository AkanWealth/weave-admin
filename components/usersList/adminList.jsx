"use client";
import { useToastContext } from "@/contexts/toast";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import EmptyList from "../elements/EmptyList";
import UserRender from "./userRender";
import PaginatedItems from "../elements/Pagination";
import { Search, ChevronUp } from "lucide-react";
import TableExportPDF from "@/components/elements/ExportasPDF";

// import { useRouter } from "next/router";

// import users from "@/dummyData/adminUser";

function AdminList() {
  const [users, setUsers] = useState(null);
  const [filteredList, setFilteredlist] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { showMessage } = useToastContext();
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const fetchRoles = async () => {
    try {
      const response = await api.get("/role");
      if (response.status === 200) {
        console.log(response);
        setRoles(response.data);
        return;
      }
      showMessage("Unable to fetch roles","", "error");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedRole === "") return setFilteredlist(users);
    setSearchKey("");
    const filtered = users.filter((user) => user.role.name === selectedRole);
    setFilteredlist(filtered);
  }, [selectedRole]);

  const fetchUsers = async () => {
    setFetchingUsers(true);
    try {
      const response = await api.get("/usage-analytics/admin");
      console.log(response.data);
      if (response.status === 200) {
        setUsers(response.data);
        setFilteredlist(response.data);
        return;
      }
      showMessage("Unable to fetch admin users", "","error");
    } catch (err) {
      console.log(err);
      showMessage("Error fetching admin users", "","error");
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
      showMessage("Invite resent to user", "","success");
    } catch (error) {
      showMessage(
        error.response.data.message || "Error resending invite","",
        "error"
      );
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchKey === "") return;
    const matchresult = users.filter((user) =>
      Object.values(user)
        .join("  ")
        .toLowerCase()
        .includes(searchKey.toLowerCase())
    );

    setFilteredlist(matchresult);
  }, [searchKey]);

  return (
    <>
      {/* <div className="flex my-4">
        <div className="w-3/5">
          <div className="bg-white border px-8 py-2 rounded-md">
            <input
              type="text"
              className="bg-[#f5f6fa] rounded-md w-full px-4 py-2"
              placeholder="Search here"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
        </div>
        <div className="w-2/5 text-right">
          <button
            className="bg-weave-primary text-base-white p-2 px-4 mr-3 rounded-md font-rubikMedium"
            onClick={() =>
              exportData(
                filteredList.map((user) => ({
                  ...user,
                  status: user.isActive ? "Active" : "Inactive",
                  role: user.role.name,
                })),
                ["username", "email", "created_at", "status", "role"],
                "usersList"
              )
            }
          >
            Export
            <i className="fa fa-window-maximize ml-2"></i>
          </button>
          <button className="relative dropdown border p-2 rounded-md font-rubikMedium">
            <span className="px-2">
              Filter
              <i className="fa fa-list ml-2"></i>
            </span>
            <div className="absolute right-0 rounded-md p-1 shadow bg-white text-xs w-[200px]  dropdown-menu">
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
          {/* <button className="border p-2 px-4 rounded-md font-rubikMedium">
            Filter
            <i className="fa fa-list ml-2"></i>
          </button>
        </div>
      </div> */}
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
            data={filteredList ? filteredList.map((user) => ({
              ...user,
              status: user.isActive ? "Active" : "Inactive",
              role: user.role?.name || "N/A",
              created_date: new Date(user.created_at).toLocaleDateString(),
              username: user.username || user.email
            })) : []}
            columns={[
              { header: "Username", accessor: "username" },
              { header: "Email", accessor: "email" },
              { header: "Role", accessor: "role" },
              { header: "Date Created", accessor: "created_date" },
              { header: "Status", accessor: "status" }
            ]}
            fileName="Admin_Users_List.pdf"
            title="Admin Users List"
            buttonText="Export"
          />
          <button className="border py-2 px-4 rounded-md font-medium flex items-center">
            Filter
            <ChevronUp className="w-4 h-4 ml-2 rotate-180" />
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

      {/* {users ? (
        <div className="bg-base-white my-4 shadow">
          <table className="my-4 w-full">
            <tbody>
              <tr className="bg-[#f5f6fa] ">
                <th className="text-left px-16">Username</th>
                <th className="text-left">Date</th>
                <th className="text-left">Status</th>
                <th className="text-left">Role</th>
                <th className="text-left"></th>
              </tr>

              {filteredList.map((user) => {
                const date = new Date(user.created_at);
                return (
                  <UserRender
                    info={user}
                    date={date}
                    key={Math.random()}
                    resendInvite={resendInvite}
                  />
                );
              })} */}

      {/* <tr>
              <td>WV1234</td>
              <td className="text-left px-6">
                <h6 className="font-rubikMedium text-black">Mary Gideon</h6>
                <span className="text-gray-500 text-sm">
                  marygideon@gmail.com
                </span>
                <button className="mx-2 p-1">
                  <i className="fa fa-copy"></i>
                </button>
              </td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
              </td>
              <td>
                <button className="bg-[#28A745] px-4 rounded-full py-1 text-sm text-base-white">
                  Active
                </button>
              </td>
              <td>
                <h6>Super Admin</h6>
              </td>
              <td>
                <button className="relative px-2 py-1 mr-8 dropdown">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>

                  <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px]  dropdown-menu">
                    <div className="flex flex-col text-left">
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-pencil mr-2"></i> Edit User
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-2"></i> Delete User{" "}
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-user-times mr-2"></i> Suspend User{" "}
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-share mr-2"></i> Resend Invite
                      </Link>
                    </div>
                  </div>
                </button>
              </td>
            </tr>
            <tr>
              <td>WV1234</td>
              <td className="text-left px-6">
                <h6 className="font-rubikMedium text-black">Mary Gideon</h6>
                <span className="text-gray-500 text-sm">
                  marygideon@gmail.com
                </span>
                <button className="mx-2 p-1">
                  <i className="fa fa-copy"></i>
                </button>
              </td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
              </td>
              <td>
                <button className="bg-[#28A745] px-4 rounded-full py-1 text-sm text-base-white">
                  Active
                </button>
              </td>
              <td>
                <h6>Admin</h6>
              </td>
              <td>
                <button className="relative px-2 py-1 mr-8 dropdown">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>

                  <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px]  dropdown-menu">
                    <div className="flex flex-col text-left">
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-pencil mr-2"></i> Edit User
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-2"></i> Delete User{" "}
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-user-times mr-2"></i> Suspend User{" "}
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-share mr-2"></i> Resend Invite
                      </Link>
                    </div>
                  </div>
                </button>
              </td>
            </tr>
            <tr>
              <td>WV1234</td>
              <td className="text-left px-6">
                <h6 className="font-rubikMedium text-black">Mary Gideon</h6>
                <span className="text-gray-500 text-sm">
                  marygideon@gmail.com
                </span>
                <button className="mx-2 p-1">
                  <i className="fa fa-copy"></i>
                </button>
              </td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
              </td>
              <td>
                <button className="bg-[#28A745] px-4 rounded-full py-1 text-sm text-base-white">
                  Active
                </button>
              </td>
              <td>
                <h6>Content Manager</h6>
              </td>
              <td>
                <button className="relative px-2 py-1 mr-8 dropdown">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>

                  <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px]  dropdown-menu">
                    <div className="flex flex-col text-left">
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-pencil mr-2"></i> Edit User
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-2"></i> Delete User{" "}
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-user-times mr-2"></i> Suspend User{" "}
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-share mr-2"></i> Resend Invite
                      </Link>
                    </div>
                  </div>
                </button>
              </td>
            </tr>
            <tr>
              <td>WV1234</td>
              <td className="text-left px-6">
                <h6 className="font-rubikMedium text-black">Mary Gideon</h6>
                <span className="text-gray-500 text-sm">
                  marygideon@gmail.com
                </span>
                <button className="mx-2 p-1">
                  <i className="fa fa-copy"></i>
                </button>
              </td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
              </td>
              <td>
                <button className="bg-[#28A745] px-4 rounded-full py-1 text-sm text-base-white">
                  Active
                </button>
              </td>
              <td>
                <h6>Super Admin</h6>
              </td>
              <td>
                <button className="relative px-2 py-1 mr-8 dropdown">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>

                  <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px]  dropdown-menu">
                    <div className="flex flex-col text-left">
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-pencil mr-2"></i> Edit User
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-2"></i> Delete User{" "}
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-user-times mr-2"></i> Suspend User{" "}
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-share mr-2"></i> Resend Invite
                      </Link>
                    </div>
                  </div>
                </button>
              </td>
            </tr>
            <tr>
              <td>WV1234</td>
              <td className="text-left px-6">
                <h6 className="font-rubikMedium text-black">Mary Gideon</h6>
                <span className="text-gray-500 text-sm">
                  marygideon@gmail.com
                </span>
                <button className="mx-2 p-1">
                  <i className="fa fa-copy"></i>
                </button>
              </td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
              </td>
              <td>
                <button className="bg-red-500 px-4 rounded-full py-1 text-sm text-base-white">
                  Inactive
                </button>
              </td>
              <td>
                <h6>Super Admin</h6>
              </td>
              <td>
                <button className="relative px-2 py-1 mr-8 dropdown">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>

                  <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px]  dropdown-menu">
                    <div className="flex flex-col text-left">
                      <Link
                        href={"?modal=edit&user=1809"}
                        className="px-3 py-1"
                      >
                        {" "}
                        <i className="fa fa-pencil mr-2"></i> Edit User
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-2"></i> Delete User{" "}
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-user-times mr-2"></i> Suspend User{" "}
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-share mr-2"></i> Resend Invite
                      </Link>
                    </div>
                  </div>
                </button>
              </td>
            </tr> */}
      {/* </tbody>
          </table>
        </div>
      ) : (
        <EmptyList />
      )} */}
    </>
  );
}

export default AdminList;
