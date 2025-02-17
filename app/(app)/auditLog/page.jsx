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
        <AuditLogs />

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
