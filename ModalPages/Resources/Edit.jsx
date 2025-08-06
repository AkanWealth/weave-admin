"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RichTextEditor from "@/components/elements/RichTextEditor";
import ResourceLibraryProvider, { useResourceLibrary } from "@/contexts/ResourceLibraryContext";
import Cookies from "js-cookie";
import { ToastContext, useToastContext } from "@/contexts/toast";
import api from "@/lib/api";
import { baseUrl } from "@/lib/envfile";
import InputField from "@/components/elements/TextField";
import { CloudUpload, X } from "lucide-react";

function EditResource() {
  const searchParams = useSearchParams();
  const resource_id = searchParams.get("resource_id");
  const contentType = searchParams.get("contentType");
  const router = useRouter();
  const { showMessage } = useToastContext();
  const { resources, getSingleProduct, refreshResources } = useResourceLibrary();

  // Form states
  const [activeTab, setActiveTab] = useState("info");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedPillarId, setSelectedPillarId] = useState("");
  const [pillars, setPillars] = useState([]);
  const [loadingPillars, setLoadingPillars] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPillarLocked, setIsPillarLocked] = useState(false);

  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [duration, setDuration] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [fileUploadContent, setFileUploadContent] = useState(null);
  const [fileUploadContentName, setFileUploadContentName] = useState("");
  const [transcript, setTranscript] = useState(null);
  const [transcriptName, setTranscriptName] = useState("");
  const [author, setAuthor] = useState("");
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load resource info from API/context
 useEffect(() => {
  // Fetch the resource from API/context
  const resource = getSingleProduct(resource_id);
  if (!resource) return;

  setTitle(resource.title || "");
  setDescription(resource.description || "");
  setDuration(resource.duration || "");
  setSessionTime(resource.sessionTime || "");
  setAuthor(resource.author || "");
  const content = resource.content || "";
  setArticleBody(content);
  setIsContentLoaded(true);
  setFileUploadContentName(resource.resourceUrl ? resource.resourceUrl.split("/").pop() : "");
  setTranscriptName(
  typeof resource.transcript === "string" && resource.transcript
    ? resource.transcript.split("/").pop()
    : ""
);
  setCoverImagePreview(resource.coverImage || ""); // Use coverImage for preview
  console.log("content: ", articleBody);

  // Pillar/category
  setSelectedPillarId(resource.pillar?.id || "");
  setCategory(resource.pillar?.name || "");
  setIsPillarLocked(!!resource.pillar?.id);

  // Tags (if present)
  setTags(resource.tags || []);
  console.log("content loaded: ", content)
}, [resource_id, resources]);


  // Fetch pillars for dropdown
  useEffect(() => {
    const fetchPillars = async () => {
      try {
        setLoadingPillars(true);
        const response = await api.get("/pillars");
        if (response.status === 200) {
          setPillars(response.data);
        }
      } catch (error) {
        showMessage("Failed to load categories", "error");
      } finally {
        setLoadingPillars(false);
      }
    };
    fetchPillars();
  }, []);

  // Tag management
  const addToTag = (tag) => {
    if (!tag) return;
    if (!tags.includes(tag)) setTags([...tags, tag]);
    setTagName("");
  };
  const removeFromTag = (tag) => setTags(tags.filter((t) => t !== tag));

  // Handle pillar/category selection
  const handleCategorySelect = (pillar) => {
    setCategory(pillar.name);
    setSelectedPillarId(pillar.id);
    setIsDropdownOpen(false);
  };

  // Cover image preview
  useEffect(() => {
    if (coverImage) {
      const url = URL.createObjectURL(coverImage);
      setCoverImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [coverImage]);

  // Form validation
  const infoTabValid = title && description && selectedPillarId && category;
  const detailsTabValid =
    contentType === "Article"
      ? articleBody && duration && sessionTime
      : fileUploadContentName && duration && sessionTime;

  // Submit handler
  const updateResource = async (status) => {
    setIsSubmitting(true);
    let btn = document.getElementById(`${status.toLowerCase()}-btn`);
    let btnTitle = btn?.textContent;
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Please wait...";
    }
    try {
      let formdata = new FormData();
      formdata.append("title", title);
      formdata.append("pillarId", selectedPillarId);
      formdata.append("description", description);
      formdata.append("sessionTime", sessionTime);
      formdata.append("duration", duration);
      // formdata.append("author", author);
      // formdata.append("tags", JSON.stringify(tags));
      formdata.append("status", status);

      if (coverImage) formdata.append("coverImage", coverImage);
      if (contentType === "Article") {
        formdata.append("content", articleBody);
      } else {
        if (fileUploadContent) formdata.append("file", fileUploadContent);
        if (transcript) formdata.append("transcriptFile", transcript);
      }

      const accessToken = Cookies.get("session");
      const response = await fetch(
        `${baseUrl}/resource-library/${resource_id}`,
        {
          method: "PATCH",
          body: formdata,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const respbody = await response.json();

      if (response.ok) {
        showMessage("Update Successful", respbody.message, "success");
        await refreshResources();
        setTimeout(() => {
          router.push("/contentsManagement?refresh=" + Date.now());
        }, 1000);
      } else {
        showMessage("Error", respbody.message || "Error updating content", "error");
      }
    } catch (err) {
      showMessage("Error", "Error updating content", "error");
    } finally {
      setIsSubmitting(false);
      if (btn) {
        btn.disabled = false;
        btn.textContent = btnTitle;
      }
    }
  };

  return (
    <div>
      <h5 className="capitalize font-rubikBold text-2xl">{contentType}</h5>
      <p className="text-sm text-gray-500 my-2">
        Edit the details below to update this content.
      </p>
      <div className="w-2/3 my-6">
        <button
          className="text-gray-500 pr-6"
          onClick={() => setActiveTab("info")}
        >
          <i className="fa fa-file mx-2"></i> Content Information
        </button>
        <button
          className="text-gray-500 px-4"
          onClick={() => setActiveTab("file")}
        >
          <i className="fa fa-copy mx-2"></i> Content Details
        </button>
      </div>

      <form onSubmit={e => e.preventDefault()}>
        <div className={activeTab === "info" ? "" : "hidden"}>
          <InputField
            label={"Title"}
            value={title}
            setValue={setTitle}
            className={"mb-3"}
            required={true}
          />
          <InputField
            label={"Description"}
            value={description}
            setValue={setDescription}
            required={true}
          />

          {/* Pillar/Category Dropdown */}
          <div className="my-4">
            <label className="font-rubikMedium">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="category-dropdown relative mt-2">
              <button
                type="button"
                className={`w-full text-left px-4 py-2 border rounded-md bg-white flex items-center justify-between ${
                  category ? "border-weave-primary" : "border-gray-300"
                } ${isPillarLocked ? "bg-gray-100 cursor-not-allowed" : ""}`}
                onClick={() => !isPillarLocked && setIsDropdownOpen(!isDropdownOpen)}
                disabled={loadingPillars || isPillarLocked}
              >
                <span className={`${category ? "text-black" : "text-gray-500"} ${isPillarLocked ? "text-gray-600" : ""}`}>
                  {loadingPillars
                    ? "Loading categories..."
                    : category || "Select a category"}
                </span>
                {isPillarLocked ? (
                  <i className="fa fa-lock text-gray-400"></i>
                ) : (
                  <i className={`fa fa-chevron-${isDropdownOpen ? "up" : "down"} text-gray-400`}></i>
                )}
              </button>
              {isPillarLocked && (
                <p className="text-xs text-gray-500 mt-1">
                  Category is pre-selected and cannot be changed
                </p>
              )}
              {isDropdownOpen && !loadingPillars && !isPillarLocked && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {pillars.length > 0 ? (
                    pillars.map((pillar) => (
                      <button
                        key={pillar.id}
                        type="button"
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                          selectedPillarId === pillar.id
                            ? "bg-blue-50 text-weave-primary"
                            : "text-gray-700"
                        }`}
                        onClick={() => handleCategorySelect(pillar)}
                      >
                        {pillar.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No categories available
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
                  
          {isPillarLocked && (
            <button
              type="button"
              className="text-xs text-blue-300 bg-[#2345325] underline mt-1"
              onClick={() => setIsPillarLocked(false)}
            >
              Change Category
            </button>
          )}

          {/* Cover Image */}
          <div className="mb-1">
            <label className="font-rubikMedium">
              Cover Image <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="file"
                id="coverImage-file"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
              <label
                htmlFor="coverImage-file"
                className="rounded-xl flex flex-col text-center cursor-pointer"
                style={{
                  padding: "1.5rem",
                  border: "2px dashed #777",
                  margin: "8px 0",
                }}
              >
                {coverImagePreview ? (
                  <div className="flex flex-col items-center">
                    <img src={coverImagePreview} alt="Cover" className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-weave-primary">{coverImage?.name || "Current Image"}</span>
                    {coverImage && (
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={e => {
                          e.preventDefault();
                          setCoverImage(null);
                          setCoverImagePreview("");
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center rounded-full bg-gray-200 w-26 h-26 mx-auto mb-2 p-2">
                      <CloudUpload className="text-gray-600 w-8 h-8" />
                    </div>
                    <span className="font-bold">Drag and drop your cover image</span>
                    <span className="text-gray-500 text-sm">PNG, JPEG</span>
                    <span className="mt-2">
                      <span className="inline-block px-4 py-2 text-sm text-base-white bg-weave-primary rounded-xl">
                        Select Image
                      </span>
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="flex" style={{ gap: 20 }}>
            <div className="flex-2"></div>
            <div className="flex-1">
              <button
                className="border border-black py-2 w-full font-rubikMedium rounded-md"
                onClick={() => router.back()}
                type="button"
              >
                Back
              </button>
            </div>
            <div className="flex-1">
              <button
                className={`bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md ${!infoTabValid ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setActiveTab("file")}
                type="button"
                disabled={!infoTabValid}
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* Details Tab */}
        <div className={activeTab === "info" ? "hidden" : ""}>
          <InputField
            label={contentType === "Article" ? "Read Time(mins)" : "Duration(mins)"}
            placeholder={"e.g 3min 4sec"}
            value={duration}
            setValue={setDuration}
            className="mb-3"
            required={true}
          />
          <div className="my-4">
            <label className="font-rubikMedium">
              Session Time <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full text-left px-4 py-2 border rounded-md bg-white mt-2"
              value={sessionTime}
              onChange={e => setSessionTime(e.target.value)}
              required
            >
              <option value="">Select session time</option>
              <option value="All Day">All Day</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          {contentType === "Article" && isContentLoaded ? (
            <>
              <h6 className="text-xl font-rubikBold my-2 capitalize">
                Content Body <span className="text-red-500">*</span>
              </h6>
              <div className="mb-4">
                <RichTextEditor value={articleBody} setValue={setArticleBody} />
              </div>
            </>
          ) : (
            <>
              <label className="font-rubikMedium">
                {contentType} File Upload <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                onChange={e => {
                  setFileUploadContent(e.target.files[0]);
                  setFileUploadContentName(e.target.files[0]?.name || "");
                }}
              />
              <label
                htmlFor="file"
                className="rounded-xl flex flex-col text-center cursor-pointer hover:bg-gray-50 transition-colors"
                style={{
                  padding: "2rem",
                  border: "2px dashed #777",
                  gap: 4,
                  margin: "15px auto",
                }}
              >
                {fileUploadContentName || (
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
              <div className="mb-4">
                <label className="font-rubikMedium">
                  Transcript <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="file"
                  id="transcript-file"
                  className="hidden"
                  accept=".txt,.doc,.docx,.pdf,.srt"
                  onChange={e => {
                    setTranscript(e.target.files[0]);
                    setTranscriptName(e.target.files[0]?.name || "");
                  }}
                />
                <label
                  htmlFor="transcript-file"
                  className="rounded-xl flex flex-col text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{
                    padding: "1.5rem",
                    border: "2px dashed #777",
                    margin: "8px 0",
                  }}
                >
                  {transcriptName ? (
                    <div className="flex items-center justify-center">
                      <span className="text-weave-primary">{transcriptName}</span>
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={e => {
                          e.preventDefault();
                          setTranscript(null);
                          setTranscriptName("");
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span>Upload transcript file</span>
                      <span className="text-gray-500">TXT, DOC, DOCX, PDF</span>
                      <span className="mt-2">
                        <span className="inline-block px-4 py-2 text-sm text-base-white bg-weave-primary rounded-xl">
                          Select File
                        </span>
                      </span>
                    </>
                  )}
                </label>
              </div>
            </>
          )}

          {/* <InputField
            label={"Author"}
            placeholder={"Enter Author name"}
            value={author}
            setValue={setAuthor}
            className="mb-2"
            required={true}
          /> */}

          {/* <label className="capitalize font-rubikMedium">Tags </label>
          <div className="border border-weave-primary rounded-md p-2 flex flex-row flex-wrap my-2">
            {tags.length > 0 &&
              tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-gray-200 rounded-md text-gray-700 p-1 text-sm mr-2"
                >
                  {tag}
                  <button
                    onClick={() => removeFromTag(tag)}
                    type="button"
                  >
                    <span className="fa fa-remove ml-2"></span>
                  </button>
                </div>
              ))}
            <input
              type="text"
              className="focus:outline-none flex-1 px-2"
              value={tagName}
              onChange={e => setTagName(e.target.value)}
              onBlur={e => addToTag(e.target.value)}
            />
          </div> */}

          <div className="flex" style={{ gap: 20, marginTop: 20 }}>
            <div className="flex-1"></div>
            <div className="flex-1">
              <button
                className="border border-black py-2 w-full font-rubikMedium rounded-md"
                onClick={() => setActiveTab("info")}
                type="button"
              >
                Back
              </button>
            </div>
            <div className="flex-1">
              <button
                className="bg-gray-300 text-black py-2 w-full font-rubikMedium rounded-md"
                onClick={() => updateResource("Draft")}
                id="draft-btn"
                disabled={isSubmitting}
              >
                Save as Draft
              </button>
            </div>
            <div className="flex-1">
              <button
                className={`bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md ${!detailsTabValid ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => updateResource("Published")}
                id="published-btn"
                disabled={isSubmitting || !detailsTabValid}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function Edit() {
  return (
    <ToastContext>
      <ResourceLibraryProvider>
        <EditResource />
      </ResourceLibraryProvider>
    </ToastContext>
  );
}