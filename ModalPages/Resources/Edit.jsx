"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

import RichTextEditor from "@/components/elements/RichTextEditor";
import ResourceLibraryProvider, {
  useResourceLibrary,
} from "@/contexts/ResourceLibraryContext";
import Cookies from "js-cookie";
import { ToastContext, useMessageContext } from "@/contexts/toast";
import api from "@/lib/api";
import { readAndUploadThumbnail } from "@/lib/uploadThumbnail";
import { baseUrl } from "@/lib/envfile";

function EditResource() {
  const searchParams = useSearchParams();
  const resource_id = searchParams.get("resource_id");
  const contentType = searchParams.get("contentType");
  const [activeTab, setActiveTab] = useState("info");
  const [tagName, setTagName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [resourceFile, setResourceFile] = useState(null);
  const router = useRouter();

  const { showMessage } = useMessageContext();
  useEffect(() => {
    console.log(articleBody);
  }, [articleBody]);

  const [resourceInfo, setResourceInfo] = useState(null);
  const { resources, getSingleProduct } = useResourceLibrary();

  const addToTag = (tag) => {
    if (tag == "") return;
    const tagExist = resourceInfo.tags.find(
      (item) => item.toLowerCase() === tag.toLowerCase()
    );
    if (!tagExist)
      setResourceInfo({ ...resourceInfo, tags: [...resourceInfo.tags, tag] });
    setTagName("");
  };

  const removeFromTag = (tag) => {
    const otherTags = resourceInfo.tags.filter((item) => item !== tag);
    setResourceInfo({ ...resourceInfo, tags: otherTags });
  };

  useEffect(() => {
    const resource = getSingleProduct(resource_id);
    if (!resource) return;
    setResourceInfo(resource);
    setArticleBody(resource.content);
  }, [resource_id, resources]);

  const [loadingThumbnail, setLoadingThumbnail] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [thumbNailSelected, setThumbnailSelected] = useState(null);
  const [isUploadingThumbnail, setIsuploadingThumbnail] = useState(false);

  const accessToken = Cookies.get("session");
  useEffect(() => {
    if (!thumbNailSelected) return;
    setIsuploadingThumbnail(true);
    const uploadThumbnail = async () =>
      await readAndUploadThumbnail(thumbNailSelected);

    if (uploadThumbnail.status === "success") {
      showMessage("Thumbnail uploaded", "success");
    } else {
      showMessage("Error uploading thumbail", "error");
    }
  }, [thumbNailSelected]);

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

  useEffect(() => {
    setResourceInfo({ ...resourceInfo, content: articleBody });
  }, [articleBody]);

  const updateResource = async (status) => {
    setIsSubmitting(true);
    let btn = document.getElementById(`${status.toLowerCase()}-btn`);
    let btnTitle = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Please wait...";

    try {
      let formdata = new FormData();

      if (resourceFile) formdata.append("file", resourceFile);

      formdata.append("title", resourceInfo.title);
      formdata.append("category", resourceInfo.category);
      formdata.append("thumbnailUrl", resourceInfo.thumbnailUrl);
      formdata.append("author", resourceInfo.author);
      formdata.append("description", resourceInfo.description);
      if (contentType === "Article")
        formdata.append("content", resourceInfo.content);

      formdata.append("tags", resourceInfo.tags);
      formdata.append("status", status);

      const response = await fetch(
        `${baseUrl}/resource-library/${resourceInfo.id}`,
        {
          method: "PATCH",
          body: formdata,
          headers: {
            contentType: "multipart/formdata",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const respbody = await response.json();
      showMessage(respbody.message, "success");

      if (response.status) {
        router.push("/contentsManagement");
      }
    } catch (err) {
      console.log(err);
      showMessage("Error uploading content", "error");
    } finally {
      setIsSubmitting(false);
      btn.disabled = false;
      btn.textContent = btnTitle;
    }
  };

  const [thumbnailToDelete, setThumbnailToDelete] = useState("");
  const [isDeletingThumbnail, setIsdeletingThumbnail] = useState(false);

  const deleteThumbnail = async () => {
    setIsdeletingThumbnail(true);
    try {
      const response = await api.delete(`/thumbnails/${thumbNailSelected}`);
      showMessage(response.data.message, "success");
    } catch (error) {
      showMessage(
        error.response.data.message || "Error deleting thumbnail",
        "error"
      );
    } finally {
      setIsdeletingThumbnail(false);
    }
  };

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
                      checked={resourceInfo.category === "Sleep"}
                      onChange={(e) =>
                        setResourceInfo({
                          ...resourceInfo,
                          category: e.target.value,
                        })
                      }
                    />
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
                      checked={resourceInfo.category === "Happiness"}
                      onChange={(e) =>
                        setResourceInfo({
                          ...resourceInfo,
                          category: e.target.value,
                        })
                      }
                    />
                    Happiness
                  </label>
                </div>
                <div className="inline-block">
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value={"Meditation"}
                      className="mx-2"
                      checked={resourceInfo.category === "Meditation"}
                      onChange={(e) =>
                        setResourceInfo({
                          ...resourceInfo,
                          category: e.target.value,
                        })
                      }
                    />
                    Meditation
                  </label>
                </div>
                <div className="inline-block">
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value={"Sophrology"}
                      className="mx-2"
                      checked={resourceInfo.category === "Sophrology"}
                      onChange={(e) =>
                        setResourceInfo({
                          ...resourceInfo,
                          category: e.target.value,
                        })
                      }
                    />
                    Sophrology
                  </label>
                </div>
              </div>

              <div className="">Thumbnail/Illustration</div>
              <div className="border border-gray-500 p-4 my-4 rounded-xl">
                <div
                  className="flex flex-row p-2 px-4 text-sm text-red-500 rounded-xl"
                  style={{
                    background: "#f2fbf7",
                    display: thumbnailToDelete === "" ? "none" : "flex",
                  }}
                >
                  <p className="flex-1 my-auto">
                    Are you sure to delete this thumbnail
                  </p>
                  <div className="my-auto">
                    {isDeletingThumbnail ? (
                      <div className="p-2">Please wait</div>
                    ) : (
                      <>
                        <button
                          className="p-2 border-base-secondary rounded-md mr-4"
                          onClick={() => setThumbnailToDelete("")}
                        >
                          <span className="fa fa-remove"></span> No
                        </button>
                        <button
                          className="p-2 text-weave-primary rounded-md"
                          onClick={() => deleteThumbnail()}
                        >
                          <span className="fa fa-check"></span> Yes
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap">
                  {loadingThumbnail ? (
                    <div className="text-center p-6 font-rubikMedium w-full">
                      Loading thumbnails...
                    </div>
                  ) : thumbnails.length !== 0 ? (
                    thumbnails.map((item) => (
                      <div className=" w-1/4 p-1 relative" key={item.id}>
                        <button
                          className="absolute right-0 top-0 p-2 text-red-500 rounded-md w-24"
                          onClick={() => setThumbnailToDelete(item.id)}
                        >
                          <span className="fa fa-trash"></span>
                        </button>

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
                              checked={
                                resourceInfo.thumbnailUrl === item.fileUrl
                              }
                              onChange={(e) =>
                                setResourceInfo({
                                  ...resourceInfo,
                                  thumbnailUrl: e.target.value,
                                })
                              }
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
                  <button
                    className="border border-black py-2 w-full font-rubikMedium rounded-md"
                    onClick={() => router.back()}
                  >
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
              {contentType === "Article" ? (
                <>
                  <h6 className="text-xl font-rubikBold my-2 capitalize">
                    Content Body
                  </h6>

                  <div className="mb-4">
                    <RichTextEditor
                      value={articleBody}
                      setValue={setArticleBody}
                    />
                  </div>

                  <label className="capitalize font-rubikMedium">
                    Duration
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border border-base-black focus:border-weave-primary focus:outline-none rounded-md font-rubikRegular mb-3`}
                    value={resourceInfo.duration}
                    onChange={(e) =>
                      setResourceInfo({
                        ...resourceInfo,
                        duration: e.target.value,
                      })
                    }
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
                      onChange={(e) => setResourceFile(e.target.files[0])}
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
                  </form>
                </>
              )}

              <label className="capitalize font-rubikMedium">Author</label>
              <input
                type="text"
                className={`w-full p-2 border border-base-black focus:border-weave-primary focus:outline-none rounded-md font-rubikRegular mb-3`}
                value={resourceInfo.author}
                onChange={(e) =>
                  setResourceInfo({
                    ...resourceInfo,
                    author: e.target.value,
                  })
                }
              />

              <label className="capitalize font-rubikMedium">Tags </label>
              <div className="border border-weave-primary rounded-md p-2 flex flex-row flex-wrap my-2">
                {resourceInfo.tags && resourceInfo.tags.length > 0 ? (
                  resourceInfo.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-gray-200 rounded-md text-gray-700 p-1 text-sm mr-2"
                    >
                      {tag}
                      <button
                        onClick={(e) => {
                          removeFromTag(tag);
                        }}
                        type="button"
                      >
                        <span className="fa fa-remove ml-2"></span>
                      </button>
                    </div>
                  ))
                ) : (
                  <></>
                )}
                <input
                  type="text"
                  className="focus:outline-none flex-1 px-2"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  onBlur={(e) => addToTag(e.target.value)}
                />
              </div>

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
                  <button
                    className="bg-gray-300 text-black py-2 w-full font-rubikMedium rounded-md"
                    onClick={() => updateResource("Draft")}
                    id="draft-btn"
                  >
                    Save as Draft
                    {/* {isSubmitting ? "Please wait..." : "Save as Draft"} */}
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    className="bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md"
                    onClick={(e) => {
                      updateResource("Published");
                    }}
                    id="published-btn"
                  >
                    Publish
                    {/* {isSubmitting ? "Please wait..." : "Publish"} */}
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
