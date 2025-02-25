"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame-3.png";
import { useSearchParams } from "next/navigation";

function AuditLogs() {
  const [auditLogs, setAuditLogs] = useState([]);
  const params = useSearchParams();
  const adminId = params.get("admin");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const next = () => {
    setPage(page++);
  };

  const prev = () => {
    setPage(page--);
  };

  const fetchAudits = async () => {
    console.log("fetching");
    try {
      const query = {
        startDate,
        endDate,
        adminId,
        limit: 10,
        page,
        isSecurityEvent: true,
      };
      const queryString = new URLSearchParams(query).toString();
      console.log(queryString);
      // return;
      const response = await api.get(`/system-logs/`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchAudits();
  // }, []);

  return (
    <>
      <div className="flex my-4">
        <div className="w-3/5">
          <form action="" className="bg-white border px-8 py-2 rounded-md">
            <input
              type="text"
              className="bg-[#f5f6fa] rounded-md w-full px-4 py-2"
              placeholder="Search here"
            />
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 px-4 rounded-md font-rubikMedium"
            />
            {/* From */}
            {/* <i className="fa fa-list ml-2"></i> */}
            {/* </input> */}
            <input
              type="date"
              className="border p-2 px-4 rounded-md font-rubikMedium"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                fetchAudits();
              }}
            >
              Search
            </button>
          </form>
        </div>
        <div className="w-1/5"></div>
        <div className="w-1/5">
          <button className="bg-weave-primary text-base-white p-2 px-4 mr-3 rounded-md font-rubikMedium">
            Export
            <i className="fa fa-window-maximize ml-2"></i>
          </button>
          {/* <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 px-4 rounded-md font-rubikMedium"
          />
          {/* From */}
          {/* <i className="fa fa-list ml-2"></i> */}
          {/* </input> */}
          {/* <input
            type="date"
            className="border p-2 px-4 rounded-md font-rubikMedium"
            onChange={(e) => setEndDate(e.target.value)}
          />  */}
          {/* To */}
          {/* <i className="fa fa-list ml-2"></i> */}
          {/* </input> */}
        </div>
      </div>

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
    </>
  );
}

export default AuditLogs;
