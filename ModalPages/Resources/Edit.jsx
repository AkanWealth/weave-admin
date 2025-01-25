"use client";
import InputField from "@/components/elements/TextField";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

import Image from "next/image";
import videoIcon from "@/assets/images/video 1.png";
import articleIcon from "@/assets/images/article 3.png";
import audioIcon from "@/assets/images/audio 1.png";
import fileIcon from "@/assets/images/file-document 1.png";
import RichTextEditor from "@/components/elements/RichTextEditor";
import ResourceLibraryProvider, {
  useResourceLibrary,
} from "@/contexts/ResourceLibraryContext";
import Cookies from "js-cookie";
import { ToastContext, useMessageContext } from "@/contexts/toast";
import api from "@/lib/api";

function EditResource() {
  const searchParams = useSearchParams();
  const resource_id = searchParams.get("resource_id");
  const contentType = searchParams.get("contentType");
  const [activeTab, setActiveTab] = useState("info");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const { showMessage } = useMessageContext();
  useEffect(() => {
    console.log(articleBody);
  }, [articleBody]);

  const [resourceInfo, setResourceInfo] = useState(null);
  const { resources } = useResourceLibrary();

  useEffect(() => {
    const resource = resources.find((resource) => resource.id === resource_id);
    setResourceInfo(resource);
  }, [resource_id, resources]);

  const accessToken = Cookies.get("session");

  const [loadingThumbnail, setLoadingThumbnail] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [thumbNailSelected, setThumbnailSelected] = useState(null);
  const [isUploadingThumbnail, setIsuploadingThumbnail] = useState(false);
  useEffect(() => {
    readAndUploadThumbnail();
  }, [thumbNailSelected]);

  const readAndUploadThumbnail = async () => {
    if (!thumbNailSelected) return;
    setIsuploadingThumbnail(true);
    let formdata = new FormData();
    formdata.append("file", thumbNailSelected);

    try {
      const resp = await fetch(`${baseUrl}/thumbnails`, {
        body: formdata,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          contentType: "multipart/formdata",
        },
      });

      const respBody = await resp.json();
      showMessage(respBody.message, "success");
    } catch (e) {
      showMessage(e.message, "error");
    } finally {
      setIsuploadingThumbnail(false);
    }
  };

  const getThumbnails = async () => {
    setLoadingThumbnail(true);
    try {
      const response = await api.get("/thumbnails");

      if (response.status === 200) {
        setThumbnails(response?.data.thumbnails);
      }
    } catch (error) {
      showMessage("Unable to fetch thumbnails", "error");
    } finally {
      setLoadingThumbnail(false);
    }
  };

  useEffect(() => {
    getThumbnails();
  }, []);

  return (
    <Suspense>
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

        {resourceInfo && (
          <div>
            <div className={activeTab === "info" ? "" : "hidden"}>
              <label className="capitalize font-rubikMedium">
                Content Title
              </label>
              <input
                type="text"
                className={`w-full p-2 border border-base-black focus:border-weave-primary focus:outline-none rounded-md font-rubikRegular mb-3`}
                value={resourceInfo.title}
                onChange={(e) =>
                  setResourceInfo({ ...resourceInfo, title: e.target.value })
                }
              />

              <label className="capitalize font-rubikMedium">Description</label>
              <input
                type="text"
                className={`w-full p-2 border border-base-black focus:border-weave-primary focus:outline-none rounded-md font-rubikRegular mb-3`}
                value={resourceInfo.description}
                onChange={(e) =>
                  setResourceInfo({
                    ...resourceInfo,
                    description: e.target.value,
                  })
                }
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
                <div className="flex flex-wrap">
                  {loadingThumbnail ? (
                    <div className="text-center p-6 font-rubikMedium w-full">
                      Loading thumbnails...
                    </div>
                  ) : thumbnails.length !== 0 ? (
                    thumbnails.map((item) => (
                      <div className=" w-1/4 p-1" key={item.id}>
                        <label
                          className={`border border-${
                            thumbnail === item.fileUrl
                              ? "weave-primary"
                              : "gray-500"
                          } rounded-md p-6  flex flex-col h-full`}
                        >
                          <img
                            src={`${item.fileUrl}`}
                            className="w-full my-auto h-3/4"
                            alt="Icon"
                          />
                          <div className=".h-1/4 text-center">
                            <input
                              type="radio"
                              name="thumbnail"
                              value={item.fileUrl}
                              className="mr-2"
                              onChange={(e) => setThumbnail(e.target.value)}
                            />
                          </div>
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-6 font-rubikMedium w-full">
                      No thumbnail found
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <input
                    type="file"
                    className="hidden"
                    id="thumbnail-input"
                    onChange={(e) => setThumbnailSelected(e.target.files[0])}
                  />
                  <label
                    htmlFor="thumbnail-input"
                    className="border border-2 border-black rounded-xl mx-auto p-2 px-4 w-[300px] text-md font-rubikMedium"
                  >
                    {isUploadingThumbnail
                      ? "Uploading thumbnail..."
                      : "Add New Thumbnail"}
                  </label>
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
                  <button
                    className="bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md"
                    onClick={() => setActiveTab("file")}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
            <div className={activeTab !== "info" ? "" : "hidden"}>
              {contentType === "article" ? (
                <>
                  <h6 className="text-xl font-rubikBold my-2 capitalize">
                    Content Body
                  </h6>

                  <div className="mb-4">
                    <RichTextEditor setValue={setArticleBody} />
                  </div>

                  <InputField
                    label={"Author"}
                    placeholder={"Enter your name"}
                  />
                </>
              ) : (
                <>
                  <h6 className="text-xl font-rubikBold my-2 capitalize">
                    {contentType} File Upload
                  </h6>

                  <form action="" encType="multipart/formdata">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="hidden"
                    />
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
          </div>
        )}
      </div>
    </Suspense>
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

export default function Edit() {
  return (
    <ToastContext>
      <ResourceLibraryProvider>
        <EditResource />
      </ResourceLibraryProvider>
    </ToastContext>
  );
}
