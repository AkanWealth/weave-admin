"use client";
import React, { Suspense, useState, useEffect } from "react";
import ResourcesRender from "./resoucesRender";
import FeedbackRender from "./feedBackRender";
import MusicRender from "./music";
import QuoteRender from "./quote-tip";
import SponsorsRender from "./sponsor";
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
      {/* <ToastContext> */}
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
              null
              ) :  activeTab === "sponsors" ? (
                <Link
                  href={"?modal=add-sponsor"}
                  className="px-4 py-2 text-sm text-base-white bg-weave-primary rounded-md font-rubikMedium"
                >
                  Add Sponsor
                </Link>
              ): activeTab === "music" ? (
                <Link
                  href={"?modal=add-music"}
                  className="px-4 py-2 text-sm text-base-white bg-weave-primary rounded-md font-rubikMedium"
                >
                  Add Song
                </Link>
              ): activeTab === "quote" ? (
                <div className="flex items-center space-x-2">
                <Link
                  href={"?modal=add-tip"}
                  className="px-4 py-2 text-sm text-weave-primary border border-weave-primary rounded-md font-rubikMedium"
                >
                  Add Tip
                </Link>
                <Link
                  href={"?modal=add-quote"}
                  className="px-4 py-2 text-sm text-base-white bg-weave-primary rounded-md font-rubikMedium"
                >
                  Add Quote
                </Link>
                </div>
              ):
              (
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
            <div className="bg-gray-200 p-0 rounded-md font-rubikMedium flex">
              {["resources", "music","feedback","sponsors","quote"].map((tab) => (
                <button
                  key={tab}
                  className={`p-2 px-4 rounded-md ${
                    activeTab === tab ? "bg-weave-primary text-base-white" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "resources" ? "Library" : tab === "feedback" ? "Feedback" : tab === "sponsors" ? "Sponsorship" : tab === "music" ? "Music": "Quotes & Tips"}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === "resources" ? <ResourcesRender key={key} /> :
          activeTab === "music" ? <MusicRender key={key} /> : 
           activeTab === "feedback" ? <FeedbackRender key={key} /> :           
            activeTab === "sponsors" ? <SponsorsRender key={key} />:
            activeTab === "quote" ? <QuoteRender key={key} /> 
           : null}
        </div>
      {/* </ToastContext> */}
    </Suspense>
  );
}