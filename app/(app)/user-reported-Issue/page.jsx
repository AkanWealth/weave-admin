"use client";

import React from "react";
import { User } from "lucide-react";
import UserReport from "@/components/userFeedback/user-report";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";
import { Suspense } from "react";



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
        <Suspense>
        <div className="text-gray-800 ">
            <h3 className="text-2xl flex items-center mb-2">
                <span className="mr-4 bg-[#e8e8e8] rounded-full p-3 flex items-center justify-center">
                    <User className="w-7 h-7 text-weave-primary" />
                </span>
                User Reported Issue

            </h3>

         <UserReport key={key}/>
        </div>
        </Suspense>
    );
}

export default function () {
    return (

        <Page />

    );
}
