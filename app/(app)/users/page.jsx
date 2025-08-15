
"use client";
import Link from "next/link";
import React from "react";
import { useState,useEffect } from "react";
import { useSearchParams } from "next/navigation";
import users from "@/dummyData/adminUser";
import Analytics from "@/components/usersList/analytics";
import AdminList from "@/components/usersList/adminList";
import { ToastContext } from "@/contexts/toast";
import { User } from "lucide-react";

function Page() {
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
    <div className="text-gray-800 ">
      <h3 className="text-2xl text-gray-800  flex items-center">
        <span className="mr-4 bg-[#e8e8e8] rounded-full p-3 flex items-center justify-center">
          <User className="w-7 h-7 text-weave-primary" />
        </span>
        User Management
        <div className="ml-auto">
          <Link
            href={"/users/manage-roles"}
            className="px-4 p-2 text-gray-800  border border-black text-sm rounded-md mr-4"
          >
            Manage Roles
          </Link>

          <Link
            href={"?modal=add-admin"}
            className="px-4 p-2  border border-weave-primary bg-weave-primary text-base-white text-sm rounded-md"
          >
            Add Admin User
          </Link>
        </div>
      </h3>

      <Analytics />

      {/* search pane */}

      <AdminList key={key}/>
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
