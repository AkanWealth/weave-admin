// "use client";
// import InputField from "@/components/elements/TextField";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// import RichTextEditor from "@/components/elements/RichTextEditor";
// import { useModalContext } from "@/components/elements/Modal";
// import { useToastContext } from "@/contexts/toast";
// import api from "@/lib/api";
// import Cookies from "js-cookie";
// import { baseUrl } from "@/lib/envfile";

// function ContentInfo() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const contentType = searchParams.get("contentType");
//   const [activeTab, setActiveTab] = useState("info");

//   const [transcript, setTranscript] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [articleBody, setArticleBody] = useState("");
//   const [author, setAuthor] = useState("");
//   const [duration, setDuration] = useState("");
//   const [tags, setTags] = useState([]);
//   const [tagname, setTagName] = useState("");
//   const [fileUploadContent, setFileUploadContent] = useState(null);
//   const [category, setCategory] = useState("");

//   // Form validation states
//   const [infoTabValid, setInfoTabValid] = useState(false);
//   const [detailsTabValid, setDetailsTabValid] = useState(false);

//   // Validate info tab inputs whenever they change
//   useEffect(() => {
//     const isInfoTabValid =
//       title.trim() !== "" &&
//       description.trim() !== "" &&
//       category !== "" &&
//       thumbnail !== "";

//     setInfoTabValid(isInfoTabValid);
//   }, [title, description, category, thumbnail]);

//   // Validate details tab inputs whenever they change
//   useEffect(() => {
//     let isDetailsTabValid = false;

//     if (contentType === "article") {
//       isDetailsTabValid =
//         articleBody.trim() !== "" &&
//         duration.trim() !== "" &&
//         author.trim() !== "";
//     } else {
//       isDetailsTabValid =
//         fileUploadContent !== null &&
//         author.trim() !== "";
//     }

//     setDetailsTabValid(isDetailsTabValid);
//   }, [contentType, articleBody, duration, author, fileUploadContent]);

//   const addToTag = (tag) => {
//     if (tag == "") return;
//     const tagExist = tags.find(
//       (item) => item.toLowerCase() === tag.toLowerCase()
//     );
//     if (!tagExist) setTags([...tags, tag]);
//     setTagName("");
//   };

//   const removeFromTag = (tag) => {
//     const otherTags = tags.filter((item) => item !== tag);
//     setTags(otherTags);
//   };

//   const { showMessage } = useToastContext();
//   const accessToken = Cookies.get("session");

//   const [loadingThumbnail, setLoadingThumbnail] = useState(false);
//   const [thumbnails, setThumbnails] = useState([]);

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [thumbNailSelected, setThumbnailSelected] = useState(null);
//   const [isUploadingThumbnail, setIsuploadingThumbnail] = useState(false);
//   useEffect(() => {
//     readAndUploadThumbnail();
//   }, [thumbNailSelected]);

//   const readAndUploadThumbnail = async () => {
//     if (!thumbNailSelected) return;
//     setIsuploadingThumbnail(true);
//     let formdata = new FormData();
//     formdata.append("file", thumbNailSelected);

//     try {
//       const resp = await fetch(`${baseUrl}/thumbnails`, {
//         body: formdata,
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           contentType: "multipart/formdata",
//         },
//       });

//       const respBody = await resp.json();
//       showMessage(respBody.message, "success");
//     } catch (e) {
//       showMessage(e.message, "error");
//     } finally {
//       setIsuploadingThumbnail(false);
//     }
//   };

//   const getThumbnails = async () => {
//     setLoadingThumbnail(true);
//     try {
//       const response = await api.get("/thumbnails");

//       if (response.status === 200) {
//         console.log(response.data.thumbnails);
//         setThumbnails(response?.data.thumbnails);
//       }
//     } catch (error) {
//       showMessage("Unable to fetch thumbnails", "error");
//     } finally {
//       setLoadingThumbnail(false);
//     }
//   };

//   useEffect(() => {
//     getThumbnails();
//   }, []);

//   const submitForm = async (status) => {
//     setIsSubmitting(true);
//     // Get category value from state instead of form
//     const thumbnailUrl = thumbnail;

//     let btn = document.getElementById(`${status.toLowerCase()}-btn`);
//     let btnTitle = btn.textContent;
//     btn.disabled = true;
//     btn.textContent = "Please wait...";

//     try {
//       if (contentType === "article") {
//         const resp = await api.post("/resource-library/article", {
//           title,
//           category,
//           thumbnailUrl,
//           author,
//           content: articleBody,
//           description,
//           duration,
//           tags,
//           status,
//         });

//         showMessage(resp.data.message, "", "success");

//         setTimeout(() => {
//           router.push("/contentsManagement?refresh=" + Date.now());
//         }, 100);
//       } else {
//         let formdata = new FormData();
//         formdata.append("file", fileUploadContent);
//         formdata.append("title", title);
//         formdata.append("category", category);
//         formdata.append("thumbnailUrl", thumbnailUrl);
//         formdata.append("author", author);
//         formdata.append("description", description);
//         formdata.append("duration", duration);
//         formdata.append("tags", tags);
//         formdata.append("resourceType", contentType);
//         formdata.append("status", status);
//         // formdata.append("transcript", transcript); 


//         if (transcript) {
//           formdata.append("transcriptFile", transcript); // This will now be a file, not a string
//         }


//         const response = await fetch(`${baseUrl}/resource-library`, {
//           method: "POST",
//           body: formdata,
//           headers: {
//             contentType: "multipart/formdata",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         const respbody = await response.json();
//         const respstatus = response.status;
//         console.log({ respstatus });
//         console.log(respbody);


//         if (response.ok) {
//           showMessage(respbody.message || "Content uploaded successfully", "", "success");

//           setTimeout(() => {
//             router.push("/contentsManagement?refresh=" + Date.now());
//           }, 100);
//         } else {
//           showMessage(respbody.message || "Error uploading content", "", "error");
//         }


//       }
//     } catch (err) {
//       console.log(err);
//       showMessage("Error uploading content", "", "error");
//     } finally {
//       setIsSubmitting(false);

//       btn.disabled = false;
//       btn.textContent = btnTitle;
//     }
//   };

//   const [thumbnailToDelete, setThumbnailToDelete] = useState("");
//   const [isDeletingThumbnail, setIsdeletingThumbnail] = useState(false);

//   const deleteThumbnail = async () => {
//     setIsdeletingThumbnail(true);
//     try {
//       console.log(thumbnailToDelete);
//       const response = await api.delete(`/thumbnails/${thumbnailToDelete}`);
//       showMessage(response.data.message, "", "success");
//       getThumbnails();
//     } catch (error) {
//       console.log(error);
//       showMessage(
//         error.response.data.message || "Error deleting thumbnail", "",
//         "error"
//       );
//     } finally {
//       setIsdeletingThumbnail(false);
//     }
//   };

//   // Handle category selection
//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//   };

//   return (
//     <form name="content-form" onSubmit={(e) => e.preventDefault()}>
//       <h5 className="capitalize font-rubikBold text-2xl">{contentType}</h5>
//       <p className="text-sm text-gray-500 my-2">
//         Fill in the details below to add new content to the resource library.
//       </p>
//       <div className="w-2/3 my-6">
//         <button
//           className="text-gray-500 pr-6 "
//           onClick={() => {
//             setActiveTab("info");
//           }}
//           type="button"
//         >
//           <i className="fa fa-file mx-2"></i> Content Information
//         </button>

//         <button
//           className="text-gray-500 px-4"
//           onClick={() => {
//             setActiveTab("file");
//           }}
//           type="button"
//         >
//           <i className="fa fa-copy mx-2"></i>
//           Content Details
//         </button>
//       </div>
//       <div className={activeTab === "info" ? "" : "hidden"}>
//         <InputField
//           label={"Content Title"}
//           value={title}
//           setValue={setTitle}
//           className={"mb-3"}
//           required={true}
//         />
//         <InputField
//           label={"Description"}
//           value={description}
//           setValue={setDescription}
//           required={true}
//         />

//         <div className="my-4">
//           <label htmlFor="" className="font-rubikMedium">
//             Category <span className="text-red-500">*</span>
//           </label>
//           <br />
//           <div className="inline-block">
//             <label>
//               <input
//                 type="radio"
//                 name="category"
//                 value="Sleep"
//                 className="mx-2"
//                 checked={category === "Sleep"}
//                 onChange={handleCategoryChange}
//               />{" "}
//               Sleep
//             </label>
//           </div>
//           <div className="inline-block">
//             <label>
//               <input
//                 type="radio"
//                 name="category"
//                 value="Happiness"
//                 className="mx-2"
//                 checked={category === "Happiness"}
//                 onChange={handleCategoryChange}
//               />{" "}
//               Happiness
//             </label>
//           </div>
//           <div className="inline-block">
//             <label>
//               <input
//                 type="radio"
//                 name="category"
//                 value="Meditation"
//                 className="mx-2"
//                 checked={category === "Meditation"}
//                 onChange={handleCategoryChange}
//               />
//               Meditation
//             </label>
//           </div>
//           <div className="inline-block">
//             <label>
//               <input
//                 type="radio"
//                 name="category"
//                 value="Sophrology"
//                 className="mx-2"
//                 checked={category === "Sophrology"}
//                 onChange={handleCategoryChange}
//               />
//               Sophrology
//             </label>
//           </div>
//         </div>

//         <div className="">
//           Thumbnail/Illustration <span className="text-red-500">*</span>
//         </div>
//         <div className="border border-gray-500 p-4 my-4 rounded-xl">
//           <div
//             className="flex flex-row p-2 px-4 text-sm text-red-500 rounded-xl"
//             style={{
//               background: "#f2fbf7",
//               display: thumbnailToDelete === "" ? "none" : "flex",
//             }}
//           >
//             <p className="flex-1 my-auto">
//               Are you sure to delete this thumbnail
//             </p>
//             <div className="my-auto">
//               {isDeletingThumbnail ? (
//                 <div className="p-2">Please wait</div>
//               ) : (
//                 <>
//                   <button
//                     className="p-2 border-base-secondary rounded-md mr-4"
//                     onClick={() => setThumbnailToDelete("")}
//                   >
//                     <span className="fa fa-remove"></span> No
//                   </button>
//                   <button
//                     className="p-2 text-weave-primary rounded-md"
//                     onClick={() => deleteThumbnail()}
//                   >
//                     <span className="fa fa-check"></span> Yes
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="flex flex-wrap">
//             {loadingThumbnail ? (
//               <div className="text-center p-6 font-rubikMedium w-full">
//                 Loading thumbnails...
//               </div>
//             ) : thumbnails.length !== 0 ? (
//               thumbnails.map((item) => (
//                 <div className=" w-1/4 p-1 relative" key={item.id}>
//                   <button
//                     className="absolute right-0 top-0 p-2 text-red-500 rounded-md"
//                     onClick={() => setThumbnailToDelete(item.id)}
//                   >
//                     <span className="fa fa-trash"></span>
//                   </button>
//                   <label
//                     className={`border border-${thumbnail === item.fileUrl ? "weave-primary" : "gray-500"
//                       } rounded-md p-6  flex flex-col h-full`}
//                   >
//                     <img
//                       src={`${item.fileUrl}`}
//                       className="w-full my-auto h-3/4"
//                       alt="Icon"
//                     />
//                     <div className=".h-1/4 text-center">
//                       <input
//                         type="radio"
//                         name="thumbnail"
//                         value={item.fileUrl}
//                         className="mr-2"
//                         onChange={(e) => setThumbnail(e.target.value)}
//                       />
//                     </div>
//                   </label>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center p-6 font-rubikMedium w-full">
//                 No thumbnail found
//               </div>
//             )}
//           </div>
//           <div className="mt-4 text-center">
//             <input
//               type="file"
//               className="hidden"
//               id="thumbnail-input"
//               onChange={(e) => setThumbnailSelected(e.target.files[0])}
//             />
//             <label
//               htmlFor="thumbnail-input"
//               className="border border-2 border-black rounded-xl mx-auto p-2 px-4 w-[300px] text-md font-rubikMedium"
//             >
//               {isUploadingThumbnail
//                 ? "Uploading thumbnail..."
//                 : "Add New Thumbnail"}
//             </label>
//           </div>
//         </div>
//         <div className="flex" style={{ gap: 20 }}>
//           <div className="flex-2"></div>
//           <div className="flex-1">
//             <button
//               className="border border-black py-2 w-full font-rubikMedium rounded-md"
//               onClick={() => {
//                 router.back();
//               }}
//               type="button"
//             >
//               Back
//             </button>
//           </div>
//           <div className="flex-1">
//             <button
//               className={`bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md ${!infoTabValid ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               onClick={() => {
//                 setActiveTab("file");
//               }}
//               type="button"
//               disabled={!infoTabValid}
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className={activeTab === "info" ? "hidden" : ""}>
//         {contentType === "article" ? (
//           <>
//             <h6 className="text-xl font-rubikBold my-2 capitalize">
//               Content Body <span className="text-red-500">*</span>
//             </h6>

//             <div className="mb-4">
//               <RichTextEditor setValue={setArticleBody} />
//             </div>


//             {/* <InputField
//               label={"Duration"}
//               placeholder={"e.g 3min 4sec"}
//               value={duration}
//               setValue={setDuration}
//               className="mb-3"
//               required={true}
//             /> */}
//           </>
//         ) : (
//           <>
//             <h6 className="text-xl font-rubikBold my-2 capitalize">
//               {contentType} File Upload <span className="text-red-500">*</span>
//             </h6>

//             <input
//               type="file"
//               name="file"
//               id="file"
//               className="hidden"
//               onChange={(e) => {
//                 setFileUploadContent(e.target.files[0]);
//               }}
//             />
//             <label
//               htmlFor="file"
//               className="rounded-xl flex flex-col text-center"
//               style={{
//                 padding: "2rem",
//                 border: "2px dashed #777",
//                 gap: 4,
//                 margin: "15px auto",
//               }}
//             >
//               {fileUploadContent?.name || (
//                 <>
//                   <span>Drag or and drop your audio file here</span>
//                   <span className="text-gray-500">MP3, WAV</span>
//                   <span>
//                     <span className="inline-block px-4 py-2 text-md text-base-white bg-weave-primary rounded-xl">
//                       Select File
//                     </span>
//                   </span>
//                 </>
//               )}
//             </label>

//             {contentType !== "article" && (
//               <div className="mb-4">
//                 <label className="font-rubikMedium">
//                   Transcript <span className="text-gray-500">(Optional)</span>
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="file"
//                     id="transcript-file"
//                     className="hidden"
//                     accept=".txt,.doc,.docx,.pdf,.srt"
//                     onChange={(e) => {
//                       setTranscript(e.target.files[0]);
//                     }}
//                   />
//                   <label
//                     htmlFor="transcript-file"
//                     className="rounded-xl flex flex-col text-center cursor-pointer"
//                     style={{
//                       padding: "1.5rem",
//                       border: "2px dashed #777",
//                       margin: "8px 0",
//                     }}
//                   >
//                     {transcript?.name ? (
//                       <div className="flex items-center justify-center">
//                         <span className="text-weave-primary">
//                           {transcript.name}
//                         </span>
//                         <button
//                           type="button"
//                           className="ml-2 text-red-500"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             e.stopPropagation();
//                             setTranscript(null);
//                           }}
//                         >
//                           <span className="fa fa-times"></span>
//                         </button>
//                       </div>
//                     ) : (
//                       <>
//                         <span>Upload transcript file</span>
//                         <span className="text-gray-500">TXT, DOC, DOCX, PDF</span>
//                         <span className="mt-2">
//                           <span className="inline-block px-4 py-2 text-sm text-base-white bg-weave-primary rounded-xl">
//                             Select File
//                           </span>
//                         </span>
//                       </>
//                     )}
//                   </label>
//                 </div>
//               </div>
//             )}
//           </>
//         )}


//         <InputField
//           label={"Author"}
//           placeholder={"Enter Author name"}
//           value={author}
//           setValue={setAuthor}
//           className="mb-2"
//           required={true}
//         />

//         <label className="capitalize font-rubikMedium">Tags </label>
//         <div className="border border-weave-primary rounded-md p-2 flex flex-row flex-wrap my-2">
//           {tags.length > 0 ? (
//             tags.map((tag) => (
//               <div
//                 key={tag}
//                 className="bg-gray-200 rounded-md text-gray-700 p-1 text-sm mr-2"
//               >
//                 {tag}
//                 <button
//                   onClick={(e) => {
//                     removeFromTag(tag);
//                   }}
//                   type="button"
//                 >
//                   <span className="fa fa-remove ml-2"></span>
//                 </button>
//               </div>
//             ))
//           ) : (
//             <></>
//           )}
//           <input
//             type="text"
//             className="focus:outline-none flex-1 px-2"
//             value={tagname}
//             onChange={(e) => setTagName(e.target.value)}
//             onBlur={(e) => addToTag(e.target.value)}
//           />
//         </div>

//         <div className="flex" style={{ gap: 20, marginTop: 20 }}>
//           <div className="flex-1"> </div>
//           <div className="flex-1">
//             <button
//               className="border border-black py-2 w-full font-rubikMedium rounded-md"
//               onClick={() => {
//                 setActiveTab("info");
//               }}
//               type="button"
//             >
//               Back
//             </button>
//           </div>
//           <div className="flex-1">
//             <button
//               className="bg-gray-300 text-black py-2 w-full font-rubikMedium rounded-md"
//               type="button"
//               disabled={isSubmitting}
//               onClick={() => {
//                 submitForm("Draft");
//               }}
//               id="draft-btn"
//             >
//               Save as Draft
//             </button>
//           </div>
//           <div className="flex-1">
//             <button
//               type="button"
//               className={`bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md ${!detailsTabValid ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               onClick={(e) => {
//                 e.preventDefault();
//                 submitForm("Published");
//               }}
//               disabled={isSubmitting || !detailsTabValid}
//               id="published-btn"
//             >
//               Publish
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default ContentInfo;





"use client";
import InputField from "@/components/elements/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import RichTextEditor from "@/components/elements/RichTextEditor";
import { useModalContext } from "@/components/elements/Modal";
import { useToastContext } from "@/contexts/toast";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { baseUrl } from "@/lib/envfile";

function ContentInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentType = searchParams.get("contentType");
  const pillarId = searchParams.get("pillarId"); // Get pillarId from URL if available
  const [activeTab, setActiveTab] = useState("info");

  const [transcript, setTranscript] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [author, setAuthor] = useState("");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState([]);
  const [tagname, setTagName] = useState("");
  const [fileUploadContent, setFileUploadContent] = useState(null);
  const [category, setCategory] = useState("");

  // New states for pillars
  const [pillars, setPillars] = useState([]);
  const [loadingPillars, setLoadingPillars] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Form validation states
  const [infoTabValid, setInfoTabValid] = useState(false);
  const [detailsTabValid, setDetailsTabValid] = useState(false);

  // Fetch pillars from API
  useEffect(() => {
    fetchPillars();
  }, []);

  const fetchPillars = async () => {
    try {
      setLoadingPillars(true);
      const response = await api.get("/api/pillars");
      
      if (response.status === 200) {
        setPillars(response.data);
        
        // If pillarId is provided in URL, auto-select that pillar
        if (pillarId) {
          const selectedPillar = response.data.find(pillar => pillar.id === pillarId);
          if (selectedPillar) {
            setCategory(selectedPillar.name);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching pillars:', error);
      showMessage("Failed to load categories", "error");
    } finally {
      setLoadingPillars(false);
    }
  };

  // Validate info tab inputs whenever they change
  useEffect(() => {
    const isInfoTabValid =
      title.trim() !== "" &&
      description.trim() !== "" &&
      category !== "" &&
      thumbnail !== "";

    setInfoTabValid(isInfoTabValid);
  }, [title, description, category, thumbnail]);

  // Validate details tab inputs whenever they change
  useEffect(() => {
    let isDetailsTabValid = false;

    if (contentType === "article") {
      isDetailsTabValid =
        articleBody.trim() !== "" &&
        duration.trim() !== "" &&
        author.trim() !== "";
    } else {
      isDetailsTabValid =
        fileUploadContent !== null &&
        author.trim() !== "";
    }

    setDetailsTabValid(isDetailsTabValid);
  }, [contentType, articleBody, duration, author, fileUploadContent]);

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

  const { showMessage } = useToastContext();
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
      getThumbnails(); // Refresh thumbnails after upload
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
    // Get category value from state instead of form
    const thumbnailUrl = thumbnail;

    let btn = document.getElementById(`${status.toLowerCase()}-btn`);
    let btnTitle = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Please wait...";

    try {
      if (contentType === "article") {
        const resp = await api.post("/resource-library/article", {
          title,
          category, // This will now be the pillar name as string
          thumbnailUrl,
          author,
          content: articleBody,
          description,
          duration,
          tags,
          status,
        });

        showMessage(resp.data.message, "", "success");

        setTimeout(() => {
          router.push("/contentsManagement?refresh=" + Date.now());
        }, 100);
      } else {
        let formdata = new FormData();
        formdata.append("file", fileUploadContent);
        formdata.append("title", title);
        formdata.append("category", category); // This will now be the pillar name as string
        formdata.append("thumbnailUrl", thumbnailUrl);
        formdata.append("author", author);
        formdata.append("description", description);
        formdata.append("duration", duration);
        formdata.append("tags", tags);
        formdata.append("resourceType", contentType);
        formdata.append("status", status);

        if (transcript) {
          formdata.append("transcriptFile", transcript);
        }

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

        if (response.ok) {
          showMessage(respbody.message || "Content uploaded successfully", "", "success");

          setTimeout(() => {
            router.push("/contentsManagement?refresh=" + Date.now());
          }, 100);
        } else {
          showMessage(respbody.message || "Error uploading content", "", "error");
        }
      }
    } catch (err) {
      console.log(err);
      showMessage("Error uploading content", "", "error");
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
      showMessage(response.data.message, "", "success");
      getThumbnails();
    } catch (error) {
      console.log(error);
      showMessage(
        error.response.data.message || "Error deleting thumbnail", "",
        "error"
      );
    } finally {
      setIsdeletingThumbnail(false);
    }
  };

  // Handle category selection from dropdown
  const handleCategorySelect = (pillarName) => {
    setCategory(pillarName);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.category-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form name="content-form" onSubmit={(e) => e.preventDefault()}>
      <h5 className="capitalize font-rubikBold text-2xl">{contentType}</h5>
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
          required={true}
        />
        <InputField
          label={"Description"}
          value={description}
          setValue={setDescription}
          required={true}
        />

        <div className="my-4">
          <label htmlFor="" className="font-rubikMedium">
            Category <span className="text-red-500">*</span>
          </label>
          <br />
          <div className="category-dropdown relative mt-2">
            <button
              type="button"
              className={`w-full text-left px-4 py-2 border rounded-md bg-white flex items-center justify-between ${
                category ? 'border-weave-primary' : 'border-gray-300'
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={loadingPillars}
            >
              <span className={category ? 'text-black' : 'text-gray-500'}>
                {loadingPillars 
                  ? 'Loading categories...' 
                  : category || 'Select a category'
                }
              </span>
              <i className={`fa fa-chevron-${isDropdownOpen ? 'up' : 'down'} text-gray-400`}></i>
            </button>
            
            {isDropdownOpen && !loadingPillars && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {pillars.length > 0 ? (
                  pillars.map((pillar) => (
                    <button
                      key={pillar.id}
                      type="button"
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                        category === pillar.name ? 'bg-blue-50 text-weave-primary' : 'text-gray-700'
                      }`}
                      onClick={() => handleCategorySelect(pillar.name)}
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

        <div className="">
          Thumbnail/Illustration <span className="text-red-500">*</span>
        </div>
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
                    className={`border border-${thumbnail === item.fileUrl ? "weave-primary" : "gray-500"
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
              className="border border-2 border-black rounded-xl mx-auto p-2 px-4 w-[300px] text-md font-rubikMedium cursor-pointer hover:bg-gray-50 transition-colors"
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
          <div className="flex-1">
            <button
              className={`bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md ${!infoTabValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => {
                setActiveTab("file");
              }}
              type="button"
              disabled={!infoTabValid}
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
              Content Body <span className="text-red-500">*</span>
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
              required={true}
            />
          </>
        ) : (
          <>
            <h6 className="text-xl font-rubikBold my-2 capitalize">
              {contentType} File Upload <span className="text-red-500">*</span>
            </h6>
              <InputField
                label={"Duration"}
                placeholder={"e.g 3min 4sec"}
                value={duration}
                setValue={setDuration}
                className="mb-3"
                required={true}
              />
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
              className="rounded-xl flex flex-col text-center cursor-pointer hover:bg-gray-50 transition-colors"
              style={{
                padding: "2rem",
                border: "2px dashed #777",
                gap: 4,
                margin: "15px auto",
              }}
            >
              {fileUploadContent?.name || (
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

            {contentType !== "article" && (
              <div className="mb-4">
                <label className="font-rubikMedium">
                  Transcript <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="transcript-file"
                    className="hidden"
                    accept=".txt,.doc,.docx,.pdf,.srt"
                    onChange={(e) => {
                      setTranscript(e.target.files[0]);
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
                    {transcript?.name ? (
                      <div className="flex items-center justify-center">
                        <span className="text-weave-primary">
                          {transcript.name}
                        </span>
                        <button
                          type="button"
                          className="ml-2 text-red-500"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setTranscript(null);
                          }}
                        >
                          <span className="fa fa-times"></span>
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
              </div>
            )}
          </>
        )}

        <InputField
          label={"Author"}
          placeholder={"Enter Author name"}
          value={author}
          setValue={setAuthor}
          className="mb-2"
          required={true}
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
              className={`bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md ${!detailsTabValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={(e) => {
                e.preventDefault();
                submitForm("Published");
              }}
              disabled={isSubmitting || !detailsTabValid}
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

export default ContentInfo;