"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import AppSummary from "./AppSummary";
import NewSignups from "./NewSignups";
import { useSearchParams } from "next/navigation";
import GrowthChart from "./GrowthChart";
import PentagonWithCircleIcon from "@/components/elements/PentagonWithCircleIcon";


export default function Dashboard() {
  const [key, setKey] = useState(0);
  
    const searchParams = useSearchParams();
    const refreshParam = searchParams.get("refresh");


    useEffect(() => {
        // When refresh parameter changes, update the key
        if (refreshParam) {
          setKey(prevKey => prevKey + 1);
        }
      }, [refreshParam]);


  return (
    <div>
      <h1 className="text-2xl flex items-center">
        <span className="inline-flex items-center justify-center mr-4">
          <PentagonWithCircleIcon className="bg-[#e8e8e8] text-weave-primary rounded-full p-3" />
        </span>
        Dashboard
      </h1>

      {/* app summary */}
      <AppSummary />

      {/* chart section */}
      <div className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-xl font-rubikMedium">User Growth</h3>

        <GrowthChart />
      </div>

      {/* sign up activity tab */}
      <div className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-xl font-rubikMedium">
          New Signup
          <Link
            href={"/dashboard/users"}
            className="p-1 px-3 text-sm text-gray-500 border border-1 hover:outline-none hover:bg-gray-500 hover:text-base-white rounded-md float-right"
          >
            View All
          </Link>
        </h3>

        <NewSignups key={key}/>
      </div>
    </div>
  );
}
