"use client";
import Button from "@/components/elements/Button";
import InputField from "@/components/elements/TextField";
import Link from "next/link";
import React from "react";
import ManageRoles from "./ManageRoles";
import { ToastContext } from "@/contexts/toast";

function Page() {
  return (
    <div className="relative">
      <h1 className="text-xl my-2">
        <Link href={"/users"} className="text-gray-500">
          User Management
        </Link>
        {" > "}
        <Link href={"/users/manage-roles"} className="text-gray-500">
          Manage Roles
        </Link>
        {" > "} Add New Roles
      </h1>

      <ManageRoles />
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
