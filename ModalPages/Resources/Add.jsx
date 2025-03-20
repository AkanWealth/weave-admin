"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import videoIcon from "@/assets/images/video 1.png";
import articleIcon from "@/assets/images/article 3.png";
import audioIcon from "@/assets/images/audio 1.png";
import fileIcon from "@/assets/images/file-document 1.png";

function AddContent() {
  const [contentType, setContentType] = useState("");
  const router = useRouter();
  useEffect(() => {
    console.log(contentType);
  }, [contentType]);

  return (
    <div>
      <h5 className="font-rubikBold">Set Content Type</h5>

      {/* <form> */}
      <div className="flex flex-row justify-center my-6" style={{ gap: 30 }}>
        <label
          className={`border border-${
            contentType === "Video" ? "weave-primary" : "gray-500"
          } rounded-md p-6`}
        >
          <Image src={videoIcon} width={80} height={80} alt="Icon" />
          <input
            type="radio"
            name="type"
            value={"Video"}
            className="mr-2"
            onChange={(e) => setContentType(e.target.value)}
          />
          Video
        </label>
        <label
          className={`border border-${
            contentType === "article" ? "weave-primary" : "gray-500"
          } rounded-md p-6`}
        >
          <Image src={articleIcon} width={80} height={80} alt="Icon" />
          <input
            type="radio"
            name="type"
            value={"article"}
            className="mr-2"
            onChange={(e) => setContentType(e.target.value)}
          />
          Article
        </label>
        <label
          className={`border border-${
            contentType === "Audio" ? "weave-primary" : "gray-500"
          } rounded-md p-6`}
        >
          <Image src={audioIcon} width={80} height={80} alt="Icon" />
          <input
            type="radio"
            name="type"
            value={"Audio"}
            className="mr-2"
            onChange={(e) => setContentType(e.target.value)}
          />
          Audio
        </label>
        {/* <label
          className={`border border-${
            contentType === "document" ? "weave-primary" : "gray-500"
          } rounded-md p-6`}
        >
          <Image src={fileIcon} width={80} height={80} alt="Icon" />
          <input
            type="radio"
            name="type"
            value={"document"}
            className="mr-2"
            onChange={(e) => setContentType(e.target.value)}
          />
          File
        </label> */}
      </div>

      <div className="w-2/3 mx-auto">
        <div className="flex" style={{ gap: 20 }}>
          <div className="flex-1">
            <button
              className="border border-black py-2 w-full font-rubikMedium rounded-md"
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
          <div className="flex-1">
            <button
              className={`${
                contentType !== "" ? "bg-weave-primary" : "bg-gray-300"
              } text-base-white py-2 w-full font-rubikMedium rounded-md`}
              onClick={() => {
                router.push(
                  `?modal=add-content-info&contentType=${contentType}`
                );
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}

export default AddContent;
