"use client";
import { useMessageContext } from "@/contexts/toast";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import EmptyList from "../elements/EmptyList";
import UserRender from "./userRender";
// import { useRouter } from "next/router";

// import users from "@/dummyData/adminUser";

function AdminList() {
  const [users, setUsers] = useState(null);
  const [filteredList, setFilteredlist] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { showMessage } = useMessageContext();

  const fetchUsers = async () => {
    try {
      const response = await api.get("/usage-analytics/admin");
      console.log(response.data);
      if (response.status === 200) {
        setUsers(response.data);
        setFilteredlist(response.data);
        return;
      }
      showMessage("Unable to fetch admin users", "error");
    } catch (err) {
      console.log(err);
      showMessage("Error fetching admin users", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      <div className="flex my-4">
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
        <div className="w-1/5"></div>
        <div className="w-1/5">
          <button className="bg-weave-primary text-base-white p-2 px-4 mr-3 rounded-md font-rubikMedium">
            Export
            <i className="fa fa-window-maximize ml-2"></i>
          </button>
          <button className="border p-2 px-4 rounded-md font-rubikMedium">
            Filter
            <i className="fa fa-list ml-2"></i>
          </button>
        </div>
      </div>

      {/* users list table */}
      {users ? (
        <div className="bg-base-white my-4 shadow">
          <table className="my-4 w-full">
            <tbody>
              <tr className="bg-[#f5f6fa] ">
                <th className="text-left px-16">Username</th>
                <th>Date</th>
                <th>Status</th>
                <th>Role</th>
                <th></th>
              </tr>

              {filteredList.map((user) => {
                const date = new Date(user.created_at);
                return (
                  <UserRender info={user} date={date} key={Math.random()} />
                );
              })}

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
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
}

export default AdminList;
