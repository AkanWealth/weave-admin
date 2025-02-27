"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import signupFrame from "@/assets/images/signupFrame.png";
import { useRouter } from "next/navigation";
import PaginatedItems from "@/components/elements/Pagination";
import EmailRender from "@/components/elements/EmailRender";
import DateRender from "@/components/elements/DateRender";

function AppUsers() {
  const [appUsers, setAppUsers] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const router = useRouter();
  const [fetching, setIsFetching] = useState(true);

  const getUsers = async () => {
    try {
      const response = await api.get("/usage-analytics/users");
      if (response.status === 200) {
        setAppUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setFilteredList(appUsers);
  }, [appUsers]);

  useEffect(() => {
    if (searchKey === "") return;
    const matchresult = appUsers.filter((user) =>
      Object.values(user)
        .join("    ")
        .toLowerCase()
        .includes(searchKey.toLowerCase())
    );
    setFilteredList(matchresult);
  }, [searchKey]);

  return (
    <>
      <div className="flex">
        <div className="w-3/5">
          <form action="" className="border px-8 py-2 rounded-md">
            <input
              type="text"
              className="bg-[#f5f6fa] rounded-md w-2/3 px-4 py-2"
              placeholder="Search here"
              onChange={(e) => setSearchKey(e.target.value)}
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

      {fetching ? (
        <div className="min-h-[300px] bg-white flex flex-column justify-center">
          <div className="loader my-auto"></div>
        </div>
      ) : appUsers.length === 0 ? (
        <div className="flex flex-col text-center justify-center py-12 max-w-[300px] mx-auto">
          <Image
            src={signupFrame}
            className="w-[80px] h-[120px] mx-auto"
            alt="Frame"
          />
          <h4 className="text-xl font-rubikMedium my-2">
            Your Community is Waiting to Grow!
          </h4>
          <h4 className="text-gray-400 text-sm">
            It looks like there haven’t been any new sign-ups recently.
          </h4>
        </div>
      ) : (
        <PaginatedItems
          itemsPerPage={10}
          items={filteredList}
          displayType={"table"}
          renderTitle={() => (
            <tr className="bg-[#f5f6fa]">
              <th>Username</th>
              <th className="text-left px-16">Username</th>
              <th>Date Created </th>
              <th>Status</th>
              {/* <th>Device</th> */}
              <th>Last Login</th>
              <th></th>
            </tr>
          )}
          renderItems={(user) => {
            return (
              <tr key={Math.random()}>
                <td>
                  <h6 className="font-rubikMedium text-black px-5">
                    {user.username}
                  </h6>
                </td>
                <td className="text-left px-6">
                  <EmailRender email={user.email} />
                </td>
                <td>
                  <DateRender date={user.created_at} />
                </td>
                <td>
                  {user.isActive ? (
                    <button className="bg-[#28A745] px-4 rounded-full py-1 text-sm text-base-white">
                      Active
                    </button>
                  ) : (
                    <button className="bg-red-500 px-4 rounded-full py-1 text-sm text-base-white">
                      Inactive
                    </button>
                  )}
                </td>
                {/* <td>Android</td> */}
                <td>
                  <DateRender date={user.lastLogin} />
                </td>
                <td>
                  <button className="relative px-2 py-1 mr-8 dropdown">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>

                    <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px] dropdown-menu">
                      <div className="flex flex-col text-left">
                        <a
                          onClick={() =>
                            router.push(
                              `?modal=${
                                user.isActive ? "suspend" : "activate"
                              }-app-user&id=${user.id}`
                            )
                          }
                          className="px-3 py-1"
                        >
                          <i className="fa fa-user-times mr-2"></i>{" "}
                          {user.isActive ? "Deactivate" : "Activate"}
                        </a>
                        <a
                          onClick={() =>
                            router.push(
                              `?modal=send-message&id=${user.id}&name=${user.username}`
                            )
                          }
                          className="px-3 py-1"
                        >
                          {" "}
                          <i className="fa fa-envelope mr-2"></i> Send Message
                        </a>
                        <a
                          onClick={() =>
                            router.push(`?modal=delete-app-user&id=${user.id}`)
                          }
                          className="text-red-500 px-3 py-1"
                        >
                          {" "}
                          <i className="fa fa-trash mr-3"></i> Delete User{" "}
                        </a>
                      </div>
                    </div>
                  </button>
                </td>
              </tr>
            );
          }}
        />
        //    )}
        //   </tbody>
        // </table>
      )}
      {/* <table className="my-4 w-full">
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
          </table> */}
    </>
  );
}

export default AppUsers;
