import Link from "next/link";
import React from "react";
import users from "@/dummyData/adminUser";
import Analytics from "@/components/usersList/analytics";
import AdminList from "@/components/usersList/adminList";
import { ToastContext } from "@/contexts/toast";
import { User } from "lucide-react";
function Page() {
  return (
    <div>
      <h3 className="text-2xl flex items-center">
        <span className="mr-4 bg-[#e8e8e8] rounded-full p-3 flex items-center justify-center">
          <User className="w-7 h-7 text-weave-primary" />
        </span>
        User Management
        <div className="ml-auto">
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

      <AdminList />
    </div>
  );
}

export default function () {
  return (
    // <ToastContext>
      <Page />
    // {/* </ToastContext> */}
  );
}
