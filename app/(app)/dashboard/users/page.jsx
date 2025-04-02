"use client";
import Button from "@/components/elements/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";
import React, { Suspense } from "react";
import AppUsers from "./AppUsers";

export default function Page() {
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
    <Suspense>
      <div>
        <h1 className="text-lg font-rubikMedium my-2">
          <span className="text-gray-500"> Dashboard</span> {" > "} App Users
        </h1>

        <div className="rounded-2xl bg-white p-6 my-4">
          <AppUsers key={key}/>
        </div>
      </div>
    </Suspense>
  );
}
