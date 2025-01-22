"use client";
import InputField from "@/components/elements/TextField";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import videoIcon from "@/assets/images/video 1.png";
import articleIcon from "@/assets/images/article 3.png";
import audioIcon from "@/assets/images/audio 1.png";
import fileIcon from "@/assets/images/file-document 1.png";
import RichTextEditor from "@/components/elements/RichTextEditor";

function ContentInfo() {
  const searchParams = useSearchParams();
  const contentType = searchParams.get("contentType");
  const [activeTab, setActiveTab] = useState("info");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [articleBody, setArticleBody] = useState("");
  useEffect(() => {
    console.log(articleBody);
  }, [articleBody]);

  return (
    <div>
      <h5 className="capitalize font-rubikBold text-xl">{contentType}</h5>
      <p className="text-sm text-gray-500 my-2">
        Fill in the details below to add new content to the resource library.
      </p>

      <div className="w-2/3 my-6">
        <button
          className="text-gray-500 pr-6 "
          onClick={() => {
            setActiveTab("info");
          }}
        >
          <i className="fa fa-file mx-2"></i> Content Information
        </button>

        <button
          className="text-gray-500 px-4"
          onClick={() => setActiveTab("file")}
        >
          <i className="fa fa-copy mx-2"></i>
          Content Details
        </button>
      </div>

      {activeTab === "info" ? (
        <div>
          <InputField
            label={"Content Title"}
            value={title}
            setValue={setTitle}
          />

          <div className="my-4">
            <label htmlFor="" className="font-rubikMedium">
              Category
            </label>
            <br />
            <div className="inline-block">
              <label>
                <input
                  type="radio"
                  name="category"
                  value={"Sleep"}
                  className="mx-2"
                />{" "}
                Sleep
              </label>
            </div>
            <div className="inline-block">
              <label>
                <input
                  type="radio"
                  name="category"
                  value={"Happiness"}
                  className="mx-2"
                />{" "}
                Happiness
              </label>
            </div>
            <div className="inline-block">
              <label>
                <input
                  type="radio"
                  name="category"
                  value={"Concentration"}
                  className="mx-2"
                />{" "}
                Concentration
              </label>
            </div>
            <div className="inline-block">
              <label>
                <input
                  type="radio"
                  name="category"
                  value={"Energy"}
                  className="mx-2"
                />{" "}
                Energy
              </label>
            </div>
          </div>

          <div className="">Thumbnail/Illustration</div>
          <div className="border border-gray-500 p-4 my-4 rounded-xl">
            <div className="flex" style={{ gap: 10 }}>
              <label
                className={`border border-${
                  contentType === "video" ? "weave-primary" : "gray-500"
                } rounded-md p-6 w-1/4`}
              >
                <Image src={videoIcon} width={80} height={80} alt="Icon" />
                <input
                  type="radio"
                  name="type"
                  value={"video"}
                  className="mr-2"
                  onChange={(e) => setThumbnail(e.target.value)}
                />
                Video
              </label>
              <label
                className={`border border-${
                  contentType === "article" ? "weave-primary" : "gray-500"
                } rounded-md p-6 w-1/4`}
              >
                <Image src={articleIcon} width={80} height={80} alt="Icon" />
                <input
                  type="radio"
                  name="type"
                  value={"article"}
                  className="mr-2"
                  onChange={(e) => setThumbnail(e.target.value)}
                />
                Article
              </label>
              <label
                className={`border border-${
                  contentType === "audio" ? "weave-primary" : "gray-500"
                } rounded-md p-6 w-1/4`}
              >
                <Image src={audioIcon} width={80} height={80} alt="Icon" />
                <input
                  type="radio"
                  name="type"
                  value={"audio"}
                  className="mr-2"
                  onChange={(e) => setThumbnail(e.target.value)}
                />
                Audio
              </label>
              <label
                className={`border border-${
                  contentType === "document" ? "weave-primary" : "gray-500"
                } rounded-md p-6 w-1/4`}
              >
                <Image src={fileIcon} width={80} height={80} alt="Icon" />
                <input
                  type="radio"
                  name="type"
                  value={"document"}
                  className="mr-2"
                  onChange={(e) => setThumbnail(e.target.value)}
                />
                File
              </label>
            </div>
            <div className="mt-4 text-center">
              <button className="border border-2 border-black rounded-xl mx-auto p-2 w-[300px] text-md font-rubikMedium">
                Add New Thumbnail
              </button>
            </div>
          </div>
          <div className="flex" style={{ gap: 20 }}>
            <div className="flex-1"> </div>
            <div className="flex-1">
              <button className="border border-black py-2 w-full font-rubikMedium rounded-md">
                Back
              </button>
            </div>
            <div className="flex-1">
              <button className="bg-gray-300 text-black py-2 w-full font-rubikMedium rounded-md">
                Save as Draft
              </button>
            </div>
            <div className="flex-1">
              <button
                className="bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md"
                onClick={() => setActiveTab("file")}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {contentType === "article" ? (
            <>
              <h6 className="text-xl font-rubikBold my-2 capitalize">
                Content Body
              </h6>

              <div className="mb-4">
                <RichTextEditor setValue={setArticleBody} />
              </div>

              <InputField label={"Author"} placeholder={"Enter your name"} />
            </>
          ) : (
            <>
              <h6 className="text-xl font-rubikBold my-2 capitalize">
                {contentType} File Upload
              </h6>

              <form action="" encType="multipart/formdata">
                <input type="file" name="file" id="file" className="hidden" />
                <label
                  htmlFor="file"
                  className="rounded-xl flex flex-col text-center"
                  style={{
                    padding: "2rem",
                    border: "2px dashed #777",
                    gap: 4,
                    margin: "15px auto",
                  }}
                >
                  <span>Drag or and drop your audio file here</span>
                  <span className="text-gray-500">MP3, WAV</span>
                  <span>
                    <span className="inline-block px-4 py-2 text-md text-base-white bg-weave-primary rounded-xl">
                      Select File
                    </span>
                  </span>
                </label>

                <InputField label={"Duration"} placeholder={"e.g. 3:45"} />
              </form>
            </>
          )}

          <div className="flex" style={{ gap: 20, marginTop: 20 }}>
            <div className="flex-1"> </div>
            <div className="flex-1">
              <button
                className="border border-black py-2 w-full font-rubikMedium rounded-md"
                onClick={() => setActiveTab("info")}
              >
                Back
              </button>
            </div>
            <div className="flex-1">
              <button className="bg-gray-300 text-black py-2 w-full font-rubikMedium rounded-md">
                Save as Draft
              </button>
            </div>
            <div className="flex-1">
              <button className="bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// const AddResourceInfo = ({}) => {
//   const [title, setTitle] = useState("");
//   const [activeTab, setActiveTab] = useState("");

//   const [thumbnail, setThumbnail] = useState("");
//   const searchParams = useSearchParams();
//   const contentType = searchParams.get("contentType");

//   // const [title, setTitle] = useState("");

//   return (

//   );
// };

export default ContentInfo;
