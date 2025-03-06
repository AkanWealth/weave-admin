"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api";
import EmptyList from "@/components/elements/EmptyList";
import { useRouter } from "next/navigation";
import { Copy, CheckCircle } from "lucide-react";


function NewSignups() {
  const [newSignups, setNewSignups] = useState([]);
  const router = useRouter();
  const [copiedEmail, setCopiedEmail] = useState(null);

  const getNewSignups = async () => {
    try {
      const newsignups = await api.get("/usage-analytics/new-signups");
      // console.log(newsignups.data);
      if (newsignups.status == 200) {
        setNewSignups(newsignups.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setCopiedEmail(email);
        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopiedEmail(null);
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  useEffect(() => {
    getNewSignups();
  }, []);
  return (
    <>
      {newSignups.length === 0 ? (
        <EmptyList />
      ) : (
        <table className="my-4 w-full">
          <tbody>
            <tr className="bg-[#f5f6fa]">
              <th className="py-3 px-4 text-left font-medium">User ID</th>
              <th className="py-3 px-4 text-left font-medium">Username</th>
              <th className="py-3 px-4 text-left font-medium">Date</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              {/* <th className="py-3 px-4 text-left font-medium">Device</th> */}
              <th className="py-3 px-4 text-left font-medium">Last Login</th>
              <th className="py-3 px-4 text-left font-medium"></th>
            </tr>

            {newSignups.map((user) => {
              const date = new Date(user.created_at || "2024-12-08T08:30:00");
              const lastLogin = new Date(user.lastLogin || "2024-12-08T08:30:00");
              const formatDate = (d) => {
                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
              };
              const formatTime = (d) => {
                return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() >= 12 ? 'AM' : 'PM'}`;
              };
              return (
                <tr key={Math.random()}>
                  <td>
                    <h6 className="text-gray-600">
                      {user.id.split('-')[0].toUpperCase()}
                    </h6>
                  </td>
                  <td className="text-left px-6">
                    <div>
                      <h6 className="font-medium text-black">{user.username}</h6>
                      <div className="flex items-center">
                        <span className="text-gray-500 text-sm">{user.email}</span>
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
                      <button className="bg-[#28A745] px-3 rounded-full py-1 text-sm text-base-white">
                        Active
                      </button>
                    ) : (
                      <button className="bg-red-500 px-3 rounded-full py-1 text-sm text-base-white">
                        Inactive
                      </button>
                    )}
                  </td>
                  {/* <td className="py-4 px-4">
                    {user.device || (user.id % 2 === 0 ? "iOS" : "Android")}
                  </td> */}
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
                                `?modal=${user.isActive ? "suspend" : "activate"
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
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default NewSignups;
