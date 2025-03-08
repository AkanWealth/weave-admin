"use client";
import React, { Suspense, useState } from "react";
import ResourcesRender from "./resoucesRender";
import FeedbackRender from "./feedBackRender";
import Link from "next/link";
import { ToastContext } from "@/contexts/toast";
import { NotepadText } from "lucide-react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("resources");

  return (
    <Suspense>
      <ToastContext>
        <div>
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
          {activeTab === "resources" ? <ResourcesRender /> : <FeedbackRender />}
        </div>
      </ToastContext>
    </Suspense>
  );
}
