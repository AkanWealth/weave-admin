"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame-3.png";
import auditLogs from "@/dummyData/auditLogs";
import api from "@/lib/api";
import AuditLogs from "./auditLogs";

export default function Page() {
  return (
    <Suspense>
      <div className="text-gray-800 ">
        <h1 className="text-2xl">
          <i className="fa fa-tag mr-4 text-xl bg-[#e8e8e8] rounded-full p-3"></i>
          Audit Logs
        </h1>

        {/* resources section */}
        <AuditLogs />
      </div>
    </Suspense>
  );
}
