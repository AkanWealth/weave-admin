import Link from "next/link";
import React from "react";
import users from "@/dummyData/adminUser";

function Page() {
  return (
    <div>
      <h3 className="text-2xl">
        <i className="fa fa-users mr-4 text-xl bg-[#e8e8e8] rounded-full p-3"></i>
        User Management
        <div className="float-right">
          <Link
            href={"/users/manage-roles"}
            className="px-4 p-2 border border-black text-sm rounded-md mr-4"
          >
            Manage Roles
          </Link>

          <Link
            href={"?modal=add-admin"}
            className="px-4 p-2 border border-weave-primary bg-weave-primary text-base-white text-sm rounded-md"
          >
            Add Admin User
          </Link>
        </div>
      </h3>

      {/* user summary */}
      <div className="flex space-x-8 w-full my-4">
        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-500 mb-1">Super Admin</h5>
            <h6 className="font-rubikMedium text-2xl">0</h6>
          </div>
        </div>

        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-500 mb-1">Admin</h5>
            <h6 className="font-rubikMedium text-2xl">0</h6>
          </div>
        </div>

        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-500 mb-1">Content Manager</h5>
            <h6 className="font-rubikMedium text-2xl">0</h6>
          </div>
        </div>

        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-500 mb-1">Other Manager</h5>
            <h6 className="font-rubikMedium text-2xl">0</h6>
          </div>
        </div>
      </div>

      {/* search pane */}
      <div className="flex my-4">
        <div className="w-3/5">
          <form action="" className="bg-white border px-8 py-2 rounded-md">
            <input
              type="text"
              className="bg-[#f5f6fa] rounded-md w-full px-4 py-2"
              placeholder="Search here"
            />
          </form>
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
                        <div className="flex flex-col text-left">
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
                        </div>
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
    </div>
  );
}

export default Page;
