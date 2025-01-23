"use client";
import InputField from "@/components/elements/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import videoIcon from "@/assets/images/video 1.png";
import articleIcon from "@/assets/images/article 3.png";
import audioIcon from "@/assets/images/audio 1.png";
import fileIcon from "@/assets/images/file-document 1.png";
import RichTextEditor from "@/components/elements/RichTextEditor";
import { useModalContext } from "@/components/elements/Modal";
import api from "@/lib/api";
import Cookies from "js-cookie";

function ContentInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentType = searchParams.get("contentType");
  const [activeTab, setActiveTab] = useState("info");

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [author, setAuthor] = useState("");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState([]);

  const addToTag = (tag) => {
    if (tag == "") return;
    const tagExist = tags.find(
      (item) => item.toLowerCase() === tag.toLowerCase()
    );
    if (!tagExist) setTags([...tags, tag]);
  };

  const removeFromTag = (tag) => {
    const otherTags = tags.filter((item) => item !== tag);
    setTags(otherTags);
  };

  const { showMessage } = useModalContext();

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
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(thumbNailSelected);
    const accessToken = Cookies.get("session");
    let formdata = new FormData();
    formdata.append("file", thumbNailSelected);
    try {
      const resp = await fetch(
        "https://the-weave-server-3ekl.onrender.com/api/v1/thumbnails",
        {
          body: formdata,
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            contentType: "multipart/formdata",
          },
        }
      );

      const respBody = await resp.json();
      showMessage(respBody.message, "success");
    } catch (e) {
      showMessage(e.message, "error");
    } finally {
      setIsuploadingThumbnail(false);
    }
    // fileReader.onload = (e) => {
    //   console.log(e.target.result);
    //   api
    //     .post("/thumbnails", { file: e.target.result })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })

    //     .finally(() => {
    //       setIsuploadingThumbnail(false);
    //     });
    // };
  };

  const getThumbnails = async () => {
    setLoadingThumbnail(true);
    try {
      const response = await api.get("/thumbnails");

      if (response.status === 200) {
        setThumbnails(response?.data.thumbnails);
      }
    } catch (error) {
      showMessage(error.message, "error");
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

    try {
      const resp = await api.post("/resource-library/article", {
        title,
        category,
        thumbnailUrl,
        author,
        content: articleBody,
        description: articleBody,
        duration,
        tags,
        status,
      });

      showMessage(resp.data.message, "success");
    } catch (err) {
      console.log(err.response);
      showMessage(err.message, "error");
    } finally {
      setIsSubmitting(false);
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
          nae
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
              />
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
              />
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
              label={"Author"}
              placeholder={"Enter Author name"}
              value={author}
              setValue={setAuthor}
              className="mb-2"
            />
            <InputField
              label={"Duration"}
              placeholder={"e.g 3min 4sec"}
              value={duration}
              setValue={setDuration}
              className="mb-3"
            />
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
                onBlur={(e) => addToTag(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <h6 className="text-xl font-rubikBold my-2 capitalize">
              {contentType} File Upload
            </h6>

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
          </>
        )}

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
              onClick={() => {
                submitForm("Draft");
              }}
            >
              Save as Draft
            </button>
          </div>
          <div className="flex-1">
            <button
              type="submit"
              className="bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md"
              disabled={isSubmitting}
              onSubmit={(e) => {
                e.preventDefault;

                submitForm("Published");
              }}
            >
              {isSubmitting ? "Please wait..." : "Continue"}
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
