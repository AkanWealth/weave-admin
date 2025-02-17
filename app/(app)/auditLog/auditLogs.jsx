"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame-3.png";

function AuditLogs() {
  const [auditLogs, setAuditLogs] = useState([]);
  const fetchAudits = async () => {
    console.log("fetching");
    try {
      const response = await api.get("/system-logs/stats");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);
  return (
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
            System logs and audit trails help you monitor platform usage, track
            changes, and ensure transparency across all actions.
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
                  <h6 className="text-sm text-gray-500">{audit.admin_role}</h6>
                </td>
                <td className="text-xs pl-6 text-left">{audit.description}</td>
                <td>{audit.actionType}</td>
                <td>{audit.affectedData}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AuditLogs;
