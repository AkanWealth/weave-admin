import Button from "@/components/elements/Button";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      <h1 className="text-2xl font-rubikMedium my-2">
        <span className="text-gray-500"> Dashboard</span> {">"} App Users
      </h1>

      <div className="rounded-2xl bg-white p-6 my-4">
        <div className="flex">
          <div className="w-3/5">
            <form action="" className="border px-8 py-2 rounded-md">
              <input
                type="text"
                className="bg-[#f5f6fa] rounded-md w-2/3 px-4 py-2"
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

        <table className="my-4 w-full">
          <tbody>
            <tr className="bg-[#f5f6fa] ">
              <th>User Id</th>
              <th className="text-left px-16">Username</th>
              <th>Date</th>
              <th>Status</th>
              <th>Device</th>
              <th>Last Login</th>
              <th></th>
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
              <td>Android</td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
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
                        <i className="fa fa-user-times mr-2"></i> Deactivate
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-envelope mr-2"></i> Send Message
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-3"></i> Delete User{" "}
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
              <td>Android</td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
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
                        <i className="fa fa-user-times mr-2"></i> Deactivate
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-envelope mr-2"></i> Send Message
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-3"></i> Delete User{" "}
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
              <td>Android</td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
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
                        <i className="fa fa-user-times mr-2"></i> Deactivate
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-envelope mr-2"></i> Send Message
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-3"></i> Delete User{" "}
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
              <td>Android</td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
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
                        <i className="fa fa-user-times mr-2"></i> Deactivate
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-envelope mr-2"></i> Send Message
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-3"></i> Delete User{" "}
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
              <td>Android</td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
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
                        <i className="fa fa-user-times mr-2"></i> Deactivate
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-envelope mr-2"></i> Send Message
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-3"></i> Delete User{" "}
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
              <td>Android</td>
              <td>
                <h6>2025-01-04</h6>
                <h6>08:30 AM</h6>
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
                        <i className="fa fa-user-times mr-2"></i> Deactivate
                      </Link>
                      <Link href={"/"} className="px-3 py-1">
                        {" "}
                        <i className="fa fa-envelope mr-2"></i> Send Message
                      </Link>
                      <Link href={"/"} className="text-red-500 px-3 py-1">
                        {" "}
                        <i className="fa fa-trash mr-3"></i> Delete User{" "}
                      </Link>
                    </div>
                  </div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
