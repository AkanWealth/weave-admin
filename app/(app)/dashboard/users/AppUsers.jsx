"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PaginatedItems from "@/components/elements/Pagination";
import { Search, AlignLeft, Copy, CheckCircle } from "lucide-react";
import TableExportPDF from "@/components/elements/ExportasPDF";

function AppUsers() {
  const [appUsers, setAppUsers] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const router = useRouter();
  const [fetching, setIsFetching] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const resourceTypes = ["Active", "Inactive"];
  const [resourceFilter, setResourceFilter] = useState("");
  
  const columns = [
    { header: "User ID", accessor: (user) => user.id.split("-")[0] },
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    {
      header: "Date Created",
      accessor: (user) => {
        const date = new Date(user.created_at || "2024-12-08T08:30:00");
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`;
      },
    },
    {
      header: "Status",
      accessor: (user) => (user.isActive ? "Active" : "Inactive"),
    },
    {
      header: "Last Login",
      accessor: (user) => {
        const date = new Date(user.lastLogin || "2024-12-08T08:30:00");
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`;
      },
    },
  ];

  const getUsers = async () => {
    try {
      const response = await api.get("/usage-analytics/users");
      if (response.status === 200) {
        // Sort the users by created_at date in descending order (newest first)
        const sortedUsers = response.data.sort((a, b) => {
          const dateA = new Date(a.created_at || "2024-12-08T08:30:00");
          const dateB = new Date(b.created_at || "2024-12-08T08:30:00");
          return dateB - dateA; // Descending order (newest first)
        });
        setAppUsers(sortedUsers);
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
    // Apply both search and filter when app users change
    applyFiltersAndSearch();
  }, [appUsers]);

  // Apply filters whenever resourceFilter changes
  useEffect(() => {
    applyFiltersAndSearch();
  }, [resourceFilter]);

  // Apply search whenever searchKey changes
  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchKey]);

  // Function to apply both filters and search
  const applyFiltersAndSearch = () => {
    let result = [...appUsers];
    
    // Apply status filter
    if (resourceFilter === "Active") {
      result = result.filter(user => user.isActive);
    } else if (resourceFilter === "Inactive") {
      result = result.filter(user => !user.isActive);
    }
    
    // Apply search
    if (searchKey) {
      result = result.filter((user) =>
        Object.values(user)
          .join("    ")
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    }
    
    // Sort by created_at date (newest first) - ensure chronological order is maintained even after filtering
    result = result.sort((a, b) => {
      const dateA = new Date(a.created_at || "2024-12-08T08:30:00");
      const dateB = new Date(b.created_at || "2024-12-08T08:30:00");
      return dateB - dateA;
    });
    
    setFilteredList(result);
  };

  // Function to copy email to clipboard
  const copyToClipboard = (email) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopiedEmail(email);
        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopiedEmail(null);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row mb-4 items-start gap-4">
        <div className="w-full lg:w-3/4 h-1/2">
          <div className="relative border rounded-md px-8 py-2">
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
            data={filteredList}
            columns={columns}
            fileName={`AppUsers_${new Date().toISOString().split("T")[0]}.pdf`}
            title="Application Users"
            buttonText="Export"
          />
          <div className="relative">
            <button className="relative dropdown border p-2 rounded-md font-medium flex items-center">
              <span className="px-2">
                {resourceFilter !== "" ? resourceFilter : "Filter"}
                <AlignLeft className="w-4 h-4 ml-2 rotate-180 inline" />
              </span>
              <div className="absolute right-0 top-full mt-1 rounded-md p-1 shadow bg-white text-xs w-[200px] dropdown-menu z-10">
                <div className="flex flex-col text-left">
                  <a
                    className="p-2 capitalize rounded-md mb-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setResourceFilter("")}
                  >
                    All Users
                  </a>
                  {resourceTypes.map((type) => (
                    <a
                      className={`p-2 capitalize rounded-md mb-1 hover:bg-gray-100 cursor-pointer ${
                        resourceFilter === type ? "bg-gray-200" : ""
                      }`}
                      onClick={() => setResourceFilter(type)}
                      key={type}
                    >
                      {type}
                    </a>
                  ))}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {fetching ? (
        <div className="min-h-[300px] bg-white flex flex-column justify-center">
          <div className="loader my-auto"></div>
        </div>
      ) : appUsers.length === 0 ? (
        <div className="flex flex-col text-center justify-center py-12 max-w-[300px] mx-auto">
          <Image
            src="/images/empty-state.png" // Updated to use a placeholder path
            width={80}
            height={120}
            className="w-[80px] h-[120px] mx-auto"
            alt="Empty state"
          />
          <h4 className="text-xl font-rubikMedium my-2">
            Your Community is Waiting to Grow!
          </h4>
          <h4 className="text-gray-400 text-sm">
            It looks like there haven't been any new sign-ups recently.
          </h4>
        </div>
      ) : (
        <PaginatedItems
          itemsPerPage={10}
          items={filteredList}
          displayType={"table"}
          renderTitle={() => (
            <tr className="bg-[#f5f6fa]">
              <th className="py-3 px-4 text-left font-medium">Username</th>
              <th className="py-3 px-8 text-left font-medium">Email</th>
              <th className="py-3 px-4 text-left font-medium">Date</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-left font-medium">Last Login</th>
              <th className="py-3 px-4 text-left font-medium"></th>
            </tr>
          )}
          renderItems={(user) => {
            const date = new Date(user.created_at || "2024-12-08T08:30:00");
            const lastLogin = new Date(user.lastLogin || "2024-12-08T08:30:00");
            const formatDate = (d) => {
              return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
                2,
                "0"
              )}-${String(d.getDate()).padStart(2, "0")}`;
            };
            const formatTime = (d) => {
              return `${String(d.getHours()).padStart(2, "0")}:${String(
                d.getMinutes()
              ).padStart(2, "0")} ${d.getHours() >= 12 ? "AM" : "PM"}`;
            };
            return (
              <tr key={user.id || Math.random()}>
                <td>
                  <h6 className="font-medium text-black px-4">
                    {user.username}
                  </h6>
                </td>
                <td className="text-left px-6">
                  <div>
                    <div className="flex items-center">
                      <span className="text-gray-500 text-sm">
                        {user.email}
                      </span>
                      <button
                        className="ml-2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                        onClick={() => copyToClipboard(user.email)}
                        title="Copy email to clipboard"
                      >
                        {copiedEmail === user.email ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap">
                  <div className="inline-block text-sm text-gray-600">
                    <span className="block">{formatDate(date)}</span>
                    <span className="block">{formatTime(date)}</span>
                  </div>
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
                <td className="whitespace-nowrap">
                  <div className="inline-block text-sm text-gray-600">
                    <span className="block">{formatDate(lastLogin)}</span>
                    <span className="block">{formatTime(lastLogin)}</span>
                  </div>
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
      )}
    </>
  );
}

export default AppUsers;