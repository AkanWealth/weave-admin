"use client";
import api from "@/lib/api";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import users from "@/dummyData/adminUser";

function AdminList() {
  const fetchUsers = async () => {
    try {
      const response = await api.get("/usage-analytics/users");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      {/* users list table */}
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

            {users.map((user) => {
              const date = new Date(user.created_at);
              return (
                <tr key={user.id}>
                  <td className="text-left px-6">
                    <h6 className="font-rubikMedium text-black">
                      {user.username}
                    </h6>
                    <span className="text-gray-500 text-sm">{user.email}</span>
                    <button className="mx-2 p-1">
                      <i className="fa fa-copy"></i>
                    </button>
                  </td>
                  <td>
                    <h6>{`${date.getFullYear()}-${
                      date.getMonth() + 1
                    }-${date.getDate()}`}</h6>
                    <h6>{`${date.getHours()}:${date.getMinutes()}`}</h6>
                  </td>
                  <td>
                    <button
                      className={`${
                        user.status === "active" ? "bg-[#28A745]" : "bg-red-500"
                      } px-4 rounded-full py-1 text-sm text-base-white capitalize`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td>
                    <h6>{user.role}</h6>
                  </td>
                  <td>
                    <button className="relative px-2 py-1 mr-8 dropdown">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>

                      <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px]  dropdown-menu">
                        {/* <div className="flex flex-col text-left">
                          <Link
                            href={`?modal=edit-admin&user=${user.id}`}
                            className="px-3 py-1"
                          >
                            {" "}
                            <i className="fa fa-pencil mr-2"></i> Edit User
                          </Link>
                          <Link
                            href={`?modal=delete-admin&user=${user.id}`}
                            className="text-red-500 px-3 py-1"
                          >
                            {" "}
                            <i className="fa fa-trash mr-2"></i> Delete User{" "}
                          </Link>
                          <Link
                            href={`?modal=suspend-admin&user=${user.id}`}
                            className="px-3 py-1"
                          >
                            {" "}
                            <i className="fa fa-user-times mr-2"></i> Suspend
                            User{" "}
                          </Link>
                          <Link
                            href={`?modal=resend-invite&user=${user.id}`}
                            className="px-3 py-1"
                          >
                            {" "}
                            <i className="fa fa-share mr-2"></i> Resend Invite
                          </Link>
                        </div> */}
                      </div>
                    </button>
                  </td>
                </tr>
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
    </>
  );
}

export default AdminList;
