"use client";
import React, { useState } from "react";
import ResourcesRender from "./resoucesRender";
import FeedbackRender from "./feedBackRender";
import Link from "next/link";

function Page() {
  const [activeTab, setActiveTab] = useState("resources");

  return (
    <div>
      <h1 className="text-2xl">
        <i className="fa fa-copy mr-4 text-xl bg-[#e8e8e8] rounded-full p-3"></i>
        Content Management
        <div className="float-right">
          {activeTab === "resources" ? (
            <Link
              href={"?modal=add-content"}
              className="px-4 py-2 text-sm text-base-white bg-weave-primary rounded-md font-rubikMedium"
            >
              {" "}
              Add New Content{" "}
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
      </h1>

      {/* search pane */}
      <div className="my-4 flex">
        <div className="bg-gray-300 p-0 rounded-md font-rubikMedium">
          <button
            className={`${
              activeTab === "resources"
                ? "bg-weave-primary text-base-white"
                : ""
            } p-2 px-4 rounded-md`}
            onClick={() => setActiveTab("resources")}
          >
            Library
          </button>
          <button
            className={`${
              activeTab === "resources"
                ? ""
                : "bg-weave-primary text-base-white"
            } p-2 px-4 rounded-md`}
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
        </div>
      </div>

      {activeTab === "resources" ? <ResourcesRender /> : <FeedbackRender />}
    </div>
  );
}

export default Page;
