"use client";
import React, { Suspense, useState, useEffect } from "react";
import ResourcesRender from "./resoucesRender";
import FeedbackRender from "./feedBackRender";
import Link from "next/link";
import { ToastContext } from "@/contexts/toast";
import { NotepadText } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Page() {
  const [activeTab, setActiveTab] = useState("resources");
  const [key, setKey] = useState(0); // Add a key state to force re-render
  const router = useRouter();
  const pathname = usePathname();


  const searchParams = useSearchParams();
const refreshParam = searchParams.get("refresh");

useEffect(() => {
  // When refresh parameter changes, update the key
  if (refreshParam) {
    setKey(prevKey => prevKey + 1);
  }
}, [refreshParam]);

  // Effect that runs when pathname changes or component mounts
  useEffect(() => {

    // Increment the key to force a complete re-render
    setKey(prevKey => prevKey + 1);
    
    // You can also reset to initial state if needed
    setActiveTab("resources");
    
    // Optional: Scroll to top of page
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense>
      <ToastContext>
        {/* Use the key prop to force the entire component tree to re-render */}
        <div key={key}>
          {/* Header Section */}
          <div className="flex items-center justify-between">
            {/* Title with Icon */}
            <div className="flex items-center">
              <NotepadText className="w-12 h-10 mr-4 bg-[#e8e8e8] text-weave-primary rounded-full p-3"/>
              <h1 className="text-2xl font-bold">Content Management</h1>
            </div>
            
            {/* Buttons on the Right */}
            <div>
              {activeTab === "resources" ? (
                <Link
                  href={"?modal=add-content"}
                  className="px-4 py-2 text-sm text-base-white bg-weave-primary rounded-md font-rubikMedium"
                >
                  Add New Content
                </Link>
              ) : (
                <>
                  <Link
                    href={"?modal=notifications"}
                    className="p-2 mr-2 text-sm bg-base-white border border-black focus:border-weave-primary rounded-full font-rubikMedium"
                  >
                    <i className="fa fa-bell"></i>
                  </Link>
                  <Link
                    href={"?modal=add-notification"}
                    className="px-4 py-2 text-sm text-base-white bg-weave-primary rounded-md font-rubikMedium"
                  >
                    Create New Notification
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Search Pane */}
          <div className="my-4 flex">
            <div className="bg-gray-300 p-0 rounded-md font-rubikMedium flex">
              {["resources", "feedback"].map((tab) => (
                <button
                  key={tab}
                  className={`p-2 px-4 rounded-md ${
                    activeTab === tab ? "bg-weave-primary text-base-white" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "resources" ? "Library" : "Feedback"}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === "resources" ? <ResourcesRender key={key} /> : <FeedbackRender key={key} />}
        </div>
      </ToastContext>
    </Suspense>
  );
}