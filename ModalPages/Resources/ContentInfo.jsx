"use client";
import InputField from "@/components/elements/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import RichTextEditor from "@/components/elements/RichTextEditor";
import { useModalContext } from "@/components/elements/Modal";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { baseUrl } from "@/lib/envfile";

function ContentInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentType = searchParams.get("contentType");
  const [activeTab, setActiveTab] = useState("info");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [author, setAuthor] = useState("");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState([]);
  const [tagname, setTagName] = useState("");
  const [fileUploadContent, setFileUploadContent] = useState(null);

  const addToTag = (tag) => {
    if (tag == "") return;
    const tagExist = tags.find(
      (item) => item.toLowerCase() === tag.toLowerCase()
    );
    if (!tagExist) setTags([...tags, tag]);
    setTagName("");
  };

  const removeFromTag = (tag) => {
    const otherTags = tags.filter((item) => item !== tag);
    setTags(otherTags);
  };

  const { showMessage } = useModalContext();
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
        console.log(response.data.thumbnails);
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

  const submitForm = async (status) => {
    setIsSubmitting(true);
    const form = document.forms["content-form"];
    const category = form["category"].value;
    const thumbnailUrl = form["thumbnail"].value;

    let btn = document.getElementById(`${status.toLowerCase()}-btn`);
    let btnTitle = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Please wait...";

    try {
      if (contentType === "article") {
        const resp = await api.post("/resource-library/article", {
          title,
          category,
          thumbnailUrl,
          author,
          content: articleBody,
          description,
          duration,
          tags,
          status,
        });

        showMessage(resp.data.message, "success");
        router.push("/contentsManagement");
      } else {
        let formdata = new FormData();
        formdata.append("file", fileUploadContent);
        formdata.append("title", title);
        formdata.append("category", category);
        formdata.append("thumbnailUrl", thumbnailUrl);
        formdata.append("author", author);
        formdata.append("description", description);
        formdata.append("tags", tags);
        formdata.append("resourceType", contentType);
        formdata.append("status", status);

        const response = await fetch(`${baseUrl}/resource-library`, {
          method: "POST",
          body: formdata,
          headers: {
            contentType: "multipart/formdata",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const respbody = await response.json();
        const respstatus = response.status;
        console.log({ respstatus });
        console.log(respbody);

        showMessage(respbody.message, "success");
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
      console.log(thumbnailToDelete);
      const response = await api.delete(`/thumbnails/${thumbnailToDelete}`);
      showMessage(response.data.message, "success");
      getThumbnails();
    } catch (error) {
      console.log(error);
      showMessage(
        error.response.data.message || "Error deleting thumbnail",
        "error"
      );
    } finally {
      setIsdeletingThumbnail(false);
    }
  };

  return (
    <form name="content-form" onSubmit={(e) => e.preventDefault()}>
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
          type="button"
        >
          <i className="fa fa-file mx-2"></i> Content Information
        </button>

        <button
          className="text-gray-500 px-4"
          onClick={() => {
            setActiveTab("file");
          }}
          type="button"
        >
          <i className="fa fa-copy mx-2"></i>
          Content Details
        </button>
      </div>
      <div className={activeTab === "info" ? "" : "hidden"}>
        <InputField
          label={"Content Title"}
          value={title}
          setValue={setTitle}
          className={"mb-3"}
        />
        <InputField
          label={"Description"}
          value={description}
          setValue={setDescription}
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
                value={"Meditation"}
                className="mx-2"
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
                    className="absolute right-0 top-0 p-2 text-red-500 rounded-md"
                    onClick={() => setThumbnailToDelete(item.id)}
                  >
                    <span className="fa fa-trash"></span>
                  </button>
                  <label
                    className={`border border-${
                      thumbnail === item.fileUrl ? "weave-primary" : "gray-500"
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
          <div className="flex-2"></div>
          <div className="flex-1">
            <button
              className="border border-black py-2 w-full font-rubikMedium rounded-md"
              onClick={() => {
                router.back();
              }}
              type="button"
            >
              Back
            </button>
          </div>
          {/* <div className="flex-1">
            <button
              className="bg-gray-300 text-black py-2 w-full font-rubikMedium rounded-md"
              type="button"
            >
              Save as Draft
            </button>
          </div> */}
          <div className="flex-1">
            <button
              className="bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md"
              onClick={() => {
                setActiveTab("file");
              }}
              type="button"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <div className={activeTab === "info" ? "hidden" : ""}>
        {contentType === "article" ? (
          <>
            <h6 className="text-xl font-rubikBold my-2 capitalize">
              Content Body
            </h6>

            <div className="mb-4">
              <RichTextEditor setValue={setArticleBody} />
            </div>

            <InputField
              label={"Duration"}
              placeholder={"e.g 3min 4sec"}
              value={duration}
              setValue={setDuration}
              className="mb-3"
            />
          </>
        ) : (
          <>
            <h6 className="text-xl font-rubikBold my-2 capitalize">
              {contentType} File Upload
            </h6>

            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              onChange={(e) => {
                setFileUploadContent(e.target.files[0]);
              }}
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
              {resourceFile?.name || (
                <>
                  <span>Drag or and drop your audio file here</span>
                  <span className="text-gray-500">MP3, WAV</span>
                  <span>
                    <span className="inline-block px-4 py-2 text-md text-base-white bg-weave-primary rounded-xl">
                      Select File
                    </span>
                  </span>
                </>
              )}
            </label>
          </>
        )}

        <InputField
          label={"Author"}
          placeholder={"Enter Author name"}
          value={author}
          setValue={setAuthor}
          className="mb-2"
        />

        <label className="capitalize font-rubikMedium">Tags </label>
        <div className="border border-weave-primary rounded-md p-2 flex flex-row flex-wrap my-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
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
            value={tagname}
            onChange={(e) => setTagName(e.target.value)}
            onBlur={(e) => addToTag(e.target.value)}
          />
        </div>

        <div className="flex" style={{ gap: 20, marginTop: 20 }}>
          <div className="flex-1"> </div>
          <div className="flex-1">
            <button
              className="border border-black py-2 w-full font-rubikMedium rounded-md"
              onClick={() => {
                setActiveTab("info");
              }}
              type="button"
            >
              Back
            </button>
          </div>
          <div className="flex-1">
            <button
              className="bg-gray-300 text-black py-2 w-full font-rubikMedium rounded-md"
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                submitForm("Draft");
              }}
              id="draft-btn"
            >
              Save as Draft
            </button>
          </div>
          <div className="flex-1">
            <button
              type="button"
              className="bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md"
              onClick={(e) => {
                e.preventDefault();
                submitForm("Published");
              }}
              disabled={isSubmitting}
              id="published-btn"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </form>
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
