"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame-3.png";
import auditLogs from "@/dummyData/auditLogs";

export default function Page() {
  return (
    <Suspense>
      <div>
        <h1 className="text-2xl">
          <i className="fa fa-tag mr-4 text-xl bg-[#e8e8e8] rounded-full p-3"></i>
          Audit Logs
        </h1>

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

        {/* resources section */}
        <div className="rounded-2xl bg-white p-4 my-4">
          <h3 className="text-xl font-rubikMedium">Audit Logs </h3>

          {auditLogs && auditLogs.length === 0 ? (
            <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto my-16">
              <Image
                src={growthFrame}
                className="w-[80px] mx-auto my-4"
                alt="Frame"
              />
              <h4 className="text-xl font-rubikMedium my-2">
                No Logs or Audit Trails Available
              </h4>
              <p className="text-sm my-2">
                System logs and audit trails help you monitor platform usage,
                track changes, and ensure transparency across all actions.
              </p>
            </div>
          ) : (
            <table className="my-4 w-full text-sm">
              <tbody>
                <tr className="bg-[#f5f6fa] ">
                  <th className="text-left">Date/Time</th>
                  <th className="text-left">Admin Username </th>
                  <th className="text-left pl-12">Details </th>
                  <th>Action Type</th>
                  <th> Affected Data </th>
                </tr>
                {auditLogs.map((audit) => (
                  <tr key={Math.random()}>
                    <td className="text-left px-6 py-4">{audit.date}</td>
                    <td className="text-left px-6">
                      <h6 className="font-rubikMedium text-black">
                        {audit.admin_user}
                      </h6>
                      <h6 className="text-sm text-gray-500">
                        {audit.admin_role}
                      </h6>
                    </td>
                    <td className="text-xs pl-6 text-left">
                      {audit.description}
                    </td>
                    <td>{audit.actionType}</td>
                    <td>{audit.affectedData}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* pagination activity tab */}
        <div className="rounded-md bg-white p-4 my-4 md:flex md:justify-end">
          <div className="md:min-w-1/2 flex space-x-2">
            <p className="my-auto">Page 1 of 20</p>
            <button className="rounded-full w-[30px] h-[30px] bg-weave-primary text-base-white flex justify-center">
              <span className="m-auto">1</span>
            </button>
            <button className="rounded-full w-[30px] h-[30px] flex justify-center">
              <span className="m-auto">2</span>
            </button>
            <button className="rounded-full w-[30px] h-[30px] flex justify-center">
              <span className="m-auto">3</span>
            </button>
            <button className="rounded-full w-[30px] h-[30px] flex justify-center">
              <span className="m-auto">4</span>
            </button>
            <button className="rounded-full w-[30px] h-[30px] flex justify-center">
              <span className="m-auto">5</span>
            </button>
            <button className="rounded-full w-[30px] h-[30px] flex justify-center">
              <span className="m-auto">6</span>
            </button>

            <button className="rounded-full w-[30px] h-[30px] flex justify-center">
              <span className="m-auto">...</span>
            </button>

            <button className="rounded-md h-[30px] px-4 flex justify-center bg-weave-primary text-center text-base-white">
              <span className="m-auto">
                <i className="fa fa-plus"></i> Previous
              </span>
            </button>

            <button className="rounded-md h-[30px] px-4 flex justify-center border border-weave-black text-center">
              <span className="m-auto">
                Next <i className="fa fa-plus"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
