import React from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame.png";
import signupFrame from "@/assets/images/signupFrame.png";
import Link from "next/link";

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl">
        <i className="fa fa-home mr-4 text-xl bg-[#e8e8e8] rounded-full p-3"></i>
        Dashboard
      </h1>

      {/* app summary */}
      <div className="flex space-x-8 w-full my-4">
        <div className="w-1/4 bg-base-white p-4 px-6 rounded-2xl">
          <div className="flex">
            <div className="w-3/4">
              <h5 className="text-gray-500 mb-1">Total User</h5>
              <h6 className="font-rubikMedium text-2xl">0</h6>
            </div>
            <div className="w-1/4 flex text-3xl">
              <i className="fa fa-user m-auto"></i>
            </div>
          </div>

          <h5 className="text-red-500 text-sm mt-3">-4.5% from last month</h5>
        </div>

        <div className="w-1/4 bg-base-white p-4 px-6 rounded-2xl">
          <div className="flex">
            <div className="w-3/4">
              <h5 className="text-gray-500 mb-1">App User</h5>
              <h6 className="font-rubikMedium text-2xl">0</h6>
            </div>
            <div className="w-1/4 flex text-3xl">
              <i className="fa fa-user m-auto"></i>
            </div>
          </div>

          <h5 className="text-red-500 text-sm mt-3">-4.5% from last month</h5>
        </div>

        <div className="w-1/4 bg-base-white p-4 px-6 rounded-2xl">
          <div className="flex">
            <div className="w-3/4">
              <h5 className="text-gray-500 mb-1">Internal User</h5>
              <h6 className="font-rubikMedium text-2xl">0</h6>
            </div>
            <div className="w-1/4 flex text-3xl">
              <i className="fa fa-user m-auto"></i>
            </div>
          </div>

          <h5 className="text-red-500 text-sm mt-3">-4.5% from last month</h5>
        </div>

        <div className="w-1/4 bg-base-white p-4 px-6 rounded-2xl">
          <div className="flex">
            <div className="w-3/4">
              <h5 className="text-gray-500 mb-1">Average Check-in</h5>
              <h6 className="font-rubikMedium text-2xl">0</h6>
            </div>
            <div className="w-1/4 flex text-3xl">
              <i className="fa fa-clock-o m-auto"></i>
            </div>
          </div>

          <h5 className="text-red-500 text-sm mt-3">-4.5% from last month</h5>
        </div>
      </div>

      {/* chart section */}
      <div className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-xl font-rubikMedium">User Growth</h3>

        <div className="flex flex-col text-center justify-center py-12">
          <Image
            src={growthFrame}
            className="w-[80px] h-[120px] mx-auto"
            alt="Frame"
          />
          <h4 className="text-xl font-rubikMedium my-2">
            Track your Growth Journey
          </h4>
          <h4 className="text-gray-400 text-sm">
            No user growth data to display just yet.
          </h4>
        </div>
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

        <div className="flex flex-col text-center justify-center py-12 max-w-[300px] mx-auto">
          <Image
            src={signupFrame}
            className="w-[80px] h-[120px] mx-auto"
            alt="Frame"
          />
          <h4 className="text-xl font-rubikMedium my-2">
            Your Community is Waiting to Grow!
          </h4>
          <h4 className="text-gray-400 text-sm">
            It looks like there haven’t been any new sign-ups recently.
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
