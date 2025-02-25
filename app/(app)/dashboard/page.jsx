import React from "react";
import Link from "next/link";
import AppSummary from "./AppSummary";
import NewSignups from "./NewSignups";
import GrowthChart from "./GrowthChart";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl">
        <i className="fa fa-home mr-4 text-xl bg-[#e8e8e8] rounded-full p-3"></i>
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

        <NewSignups />
      </div>
    </div>
  );
}
