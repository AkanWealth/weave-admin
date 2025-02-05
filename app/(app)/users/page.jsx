import Link from "next/link";
import React from "react";
import users from "@/dummyData/adminUser";
import Analytics from "@/components/usersList/analytics";
import AdminList from "@/components/usersList/adminList";
import { ToastContext } from "@/contexts/toast";

function Page() {
  return (
    <div>
      <h3 className="text-2xl">
        <i className="fa fa-users mr-4 text-xl bg-[#e8e8e8] rounded-full p-3"></i>
        User Management
        <div className="float-right">
          <Link
            href={"/users/manage-roles"}
            className="px-4 p-2 border border-black text-sm rounded-md mr-4"
          >
            Manage Roles
          </Link>

          <Link
            href={"?modal=add-admin"}
            className="px-4 p-2 border border-weave-primary bg-weave-primary text-base-white text-sm rounded-md"
          >
            Add Admin User
          </Link>
        </div>
      </h3>

      <Analytics />

      {/* search pane */}
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

      <AdminList />
    </div>
  );
}

export default function () {
  return (
    <ToastContext>
      <Page />
    </ToastContext>
  );
}
