"use client";
import { useState, useEffect } from "react";
import React from "react";
import SubcriptionSummary from "./SubcriptionSummary";
import Subscriber from "./Subscribers";
import { useSearchParams } from "next/navigation";
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
      <h1 className="text-2xl flex items-center mb-4">
        <span className="inline-flex items-center justify-center mr-4">
          <PentagonWithCircleIcon className="bg-[#e8e8e8] text-weave-primary rounded-full p-3" />
        </span>
        Subscribers
      </h1>

      {/* app summary */}
      <SubcriptionSummary />

      <div className="rounded-2xl bg-white p-4 my-6">
        <h3 className="text-xl font-rubikMedium">Subscribers</h3>

        <Subscriber />
      </div>

      
    </div>
  );
}
