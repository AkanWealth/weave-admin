"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame-3.png";
import { useSearchParams } from "next/navigation";
import DateRender from "@/components/elements/DateRender";
import PaginatedItems from "@/components/elements/Pagination";
import Loader from "@/components/elements/Loader";
import exportData from "@/lib/export";

function AuditLogs() {
  const [auditLogs, setAuditLogs] = useState([]);
  const params = useSearchParams();
  const adminId = params.get("admin");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const next = () => {
    setPage(page++);
  };

  const prev = () => {
    setPage(page--);
  };

  const fetchAudits = async () => {
    setIsLoading(true);
    console.log("fetching");
    try {
      if (adminId || (startDate && endDate)) {
        const query = {
          startDate,
          endDate,
          limit: 10,
          page,
        };
        if (adminId) {
          query[adminId] = adminId;
        }

        const queryString = new URLSearchParams(query).toString();
        console.log(queryString);
        // return;
        const response = await api.get(`/system-logs?${queryString}`);
        if (response.status === 200) {
          setAuditLogs(response.data.logs);
        }
      } else {
        const response = await api.get(`/system-logs/all-admins-logs`);
        // console.log(response);
        if (response.status === 200) {
          setAuditLogs(response.data.logs);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const exportAudit = async () => {
    exportData(
      auditLogs.map((audit) => ({
        admin: audit.admin.username,
        details: audit.details.message,
        date: new Date(audit.created_at).toLocaleString().replace(/,/, " "),
        action: audit.action.replace(/_/g, " "),
        affectedResourceType: audit.affectedResourceType,
      })),
      ["date", "admin", "details", "action", "affectedResourceType"],
      "audit_logs"
    );
  };

  return (
    <>
      <div className="flex my-4">
        <div className="w-3/5">
          <form action="" className="bg-white border py-2 rounded-md">
            {/* <input
              type="text"
              className="bg-[#f5f6fa] rounded-md w-full px-4 py-2"
              placeholder="Search here"
            /> */}
            <div className="flex flex-row">
              <div className="flex-2 px-2">
                <label className="pr-3">From</label>
                <input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border p-2 px-4 rounded-md font-rubikMedium"
                />
              </div>
              <div className="flex-2 px-2">
                <label className="pr-3">To</label>
                <input
                  type="date"
                  className="border p-2 px-4 rounded-md font-rubikMedium"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <button
                  className="bg-weave-primary text-base-white p-2 px-4 mr-3 rounded-md font-rubikMedium"
                  onClick={(e) => {
                    e.preventDefault();
                    fetchAudits();
                  }}
                >
                  Search
                </button>
              </div>
              {/* From */}
              {/* <i className="fa fa-list ml-2"></i> */}
              {/* </input> */}
            </div>
          </form>
        </div>
        <div className="w-1/5"></div>
        <div className="w-1/5 text-right">
          <button
            className="bg-weave-primary text-base-white p-2 px-4 mr-3 rounded-md font-rubikMedium"
            onClick={() => exportAudit()}
          >
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

        {isLoading ? (
          <Loader />
        ) : auditLogs && auditLogs.length === 0 ? (
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
          <PaginatedItems
            items={auditLogs}
            itemsPerPage={10}
            displayType={"table"}
            renderTitle={() => (
              <tr className="bg-[#f5f6fa] ">
                <th className="text-left">Date/Time</th>
                <th className="text-left">Admin Username </th>
                <th className="text-left pl-12">Details </th>
                <th>Action Type</th>
                <th> Affected Data </th>
              </tr>
            )}
            renderItems={(audit) => (
              <tr key={Math.random()}>
                <td className="text-left px-6 py-4">
                  <DateRender date={audit.created_at} />
                </td>
                <td className="text-left px-6 capitalize">
                  <h6 className="font-rubikMedium text-black">
                    {audit.admin.username}
                  </h6>
                  <h6 className="text-sm text-gray-500">
                    {audit.admin.role &&
                      audit.admin.role.name.replace(/_/, " ")}
                  </h6>
                </td>
                <td className="pl-6 text-left">{audit.details.message}</td>
                <td>
                  <span className="capitalize">
                    {audit.action.replace(/_/, " ").toLowerCase()}
                  </span>
                </td>
                <td className="capitalize">
                  {audit.affectedResourceType &&
                    audit.affectedResourceType.toLowerCase()}
                </td>
              </tr>
            )}
          />
        )}
      </div>
    </>
  );
}

export default AuditLogs;
