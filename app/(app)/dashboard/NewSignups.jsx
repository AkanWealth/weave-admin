"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api";
import EmptyList from "@/components/elements/EmptyList";

function NewSignups() {
  const [newSignups, setNewSignups] = useState([]);
  const getNewSignups = async () => {
    try {
      const newsignups = await api.get("/usage-analytics/new-signups");
      console.log(newsignups.data);
      if (newsignups.status == 200) {
        setNewSignups(newsignups.data);
      }
    } catch (error) {
      console.log(error);
    }
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
            <tr className="bg-[#f5f6fa] ">
              <th>User Id</th>
              <th className="text-left px-16">Username</th>
              <th>Date Created </th>
              <th>Status</th>
              {/* <th>Device</th> */}
              <th>Last Login</th>
              <th></th>
            </tr>

            {newSignups.map((user) => (
              <tr key={Math.random()}>
                <td>{user.id}</td>
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
                  {/* <h6>2025-01-04</h6>
                  <h6>08:30 AM</h6> */}
                  <h6>{user.created_at}</h6>
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
                  {/* <h6>2025-01-04</h6>
                  <h6>08:30 AM</h6> */}
                  <h6>{user.lastLogin}</h6>
                </td>
                <td>
                  <div className="relative px-2 py-1 mr-8 dropdown">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>

                    <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px]  dropdown-menu">
                      <div className="flex flex-col text-left">
                        <button className="px-3 py-1">
                          {" "}
                          <i className="fa fa-user-times mr-2"></i> Deactivate
                        </button>
                        <button className="px-3 py-1">
                          {" "}
                          <i className="fa fa-envelope mr-2"></i> Send Message
                        </button>
                        <button className="text-red-500 px-3 py-1">
                          {" "}
                          <i className="fa fa-trash mr-3"></i> Delete User{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default NewSignups;
