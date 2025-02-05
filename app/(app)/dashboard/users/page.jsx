import Button from "@/components/elements/Button";
import Link from "next/link";
import React, { Suspense } from "react";
import AppUsers from "./AppUsers";

export default function Page() {
  return (
    <Suspense>
      <div>
        <h1 className="text-2xl font-rubikMedium my-2">
          <span className="text-gray-500"> Dashboard</span> {">"} App Users
        </h1>

        <div className="rounded-2xl bg-white p-6 my-4">
          <AppUsers />
        </div>
      </div>
    </Suspense>
  );
}
