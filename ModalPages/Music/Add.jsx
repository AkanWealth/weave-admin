// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import InputField from "@/components/elements/TextField";
// import { CloudUpload, X } from "lucide-react";


// function AddMusic() {
//   const [activeTab, setActiveTab] = useState("singleUpload");
//   const [coverImage, setCoverImage] = useState('');
//   const [songFile, setSongFile] = useState('');
//   const [bulkFiles, setBulkFiles] = useState([]);
//   const [bulkFormsData, setBulkFormsData] = useState({});
//   const [sharedCoverImage, setSharedCoverImage] = useState('');
//   const [useSharedCover, setUseSharedCover] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     console.log(activeTab);
//   }, [activeTab]);

//   const handleBulkFileSelect = (e) => {
//     const files = Array.from(e.target.files);
//     setBulkFiles(files);
    
//     // Initialize form data for each file
//     const initialFormData = {};
//     files.forEach((file, index) => {
//       initialFormData[index] = {
//         songTitle: '',
//         artistName: '',
//         category: '',
//         coverImage: null
//       };
//     });
//     setBulkFormsData(initialFormData);
//   };

//   const updateBulkFormData = (fileIndex, field, value) => {
//     setBulkFormsData(prev => ({
//       ...prev,
//       [fileIndex]: {
//         ...prev[fileIndex],
//         [field]: value
//       }
//     }));
//   };

//   const removeBulkFile = (indexToRemove) => {
//     const newFiles = bulkFiles.filter((_, index) => index !== indexToRemove);
//     setBulkFiles(newFiles);
    
//     // Remove form data for removed file and reindex
//     const newFormData = {};
//     newFiles.forEach((file, newIndex) => {
//       const oldIndex = bulkFiles.findIndex(f => f === file);
//       newFormData[newIndex] = bulkFormsData[oldIndex];
//     });
//     setBulkFormsData(newFormData);
//   };

//   const clearAllBulkFiles = () => {
//     setBulkFiles([]);
//     setBulkFormsData({});
//   };

//   return (
//     <div>
//       <h5 className="text-2xl font-rubikBold mb-1">Upload New Song</h5>
//       <p className="text-base text-gray-500 mb-6">
//         Add a new track to the library by filling in the details below
//       </p>

//       {/* Tab Navigation */}
//       <div className="w-full mb-4">
//         <div className="bg-gray-200 p-1 rounded-lg font-rubikMedium flex w-full">
//           {["singleUpload", "bulk"].map((tab) => (
//             <button
//               key={tab}
//               className={`flex-1 py-2 px-4 rounded-md text-center transition-all ${
//                 activeTab === tab ? "bg-weave-primary text-base-white" : "text-gray-700"
//               }`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab === "singleUpload" ? "Single Upload" : "Bulk Upload"}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tab Content */}
//       {activeTab === "singleUpload" ? (
//         <div className="flex flex-col justify-center my-6" style={{ gap: 10 }}>
//           <InputField
//             label={"Song Title"}
//             placeholder={"Enter song title"}
//             className="mb-1"
//             required={true}
//           />
//           <InputField
//             label={"Artist Name"}
//             placeholder={"Enter artist name"}
//             className="mb-1"
//             required={true}
//           />
//           <div className="mb-1">
//             <label className="font-rubikMedium">
//               Cover Image <span className="text-red-500">*</span>
//             </label>
//             <div className="mt-2">
//               <input
//                 type="file"
//                 id="coverImage-file"
//                 className="hidden"
//                 accept="image/png, image/jpeg"
//                 onChange={(e) => setCoverImage(e.target.files[0])}
//               />
//               <label
//                 htmlFor="coverImage-file"
//                 className="rounded-xl flex flex-col text-center cursor-pointer"
//                 style={{
//                   padding: "1.5rem",
//                   border: "2px dashed #777",
//                   margin: "8px 0",
//                 }}
//               >
//                 {coverImage?.name ? (
//                   <div className="flex items-center justify-center">
//                     <span className="text-weave-primary">{coverImage.name}</span>
//                     <button
//                       type="button"
//                       className="ml-2 text-red-500"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         setCoverImage(null);
//                       }}
//                     >
//                       <span className="fa fa-times"></span>
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="flex items-center justify-center rounded-full bg-gray-200 w-26 h-26 mx-auto mb-2 p-2">
//                       <CloudUpload className="text-gray-600 w-8 h-8" />
//                     </div>
//                     <span className="font-bold">Drag and drop your cover image</span>
//                     <span className="text-gray-500 text-sm">PNG, JPEG</span>
//                     <span className="mt-2">
//                       <span className="inline-block px-4 py-2 text-sm text-base-white bg-weave-primary rounded-xl">
//                         Select Image
//                       </span>
//                     </span>
//                   </>
//                 )}
//               </label>
//             </div>
//           </div>
//           <InputField
//             label={"Category"}
//             placeholder={"Select category"}
//             className="mb-1"
//             required={true}
//           />
//           <div className="mb-1">
//             <label className="font-rubikMedium">
//               Song File <span className="text-red-500">*</span>
//             </label>
//             <div className="mt-2">
//               <input
//                 type="file"
//                 id="songFile-file"
//                 className="hidden"
//                 accept="audio/mpeg, audio/wav"
//                 onChange={(e) => setSongFile(e.target.files[0])}
//               />
//               <label
//                 htmlFor="songFile-file"
//                 className="rounded-xl flex flex-col text-center cursor-pointer"
//                 style={{
//                   padding: "1.5rem",
//                   border: "2px dashed #777",
//                   margin: "8px 0",
//                 }}
//               >
//                 {songFile?.name ? (
//                   <div className="flex items-center justify-center">
//                     <span className="text-weave-primary">{songFile.name}</span>
//                     <button
//                       type="button"
//                       className="ml-2 text-red-500"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         setSongFile(null);
//                       }}
//                     >
//                       <span className="fa fa-times"></span>
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="flex items-center justify-center rounded-full bg-gray-200 w-26 h-26 mx-auto mb-2 p-2">
//                       <CloudUpload className="text-gray-600 w-8 h-8" />
//                     </div>
//                     <span className="font-bold">Drag and drop your audio here</span>
//                     <span className="text-gray-500 text-sm">MP3, WAV</span>
//                     <span className="mt-2">
//                       <span className="inline-block px-4 py-2 text-sm text-base-white bg-weave-primary rounded-xl">
//                         Select a File
//                       </span>
//                     </span>
//                   </>
//                 )}
//               </label>
//             </div>
//           </div>
//           <div className="w-full mx-auto">
//             <div className="flex" style={{ gap: 20 }}>
//               <div className="flex-1">
//                 <button
//                   className="border border-black py-2 w-full font-rubikMedium rounded-md"
//                   onClick={() => router.back()}
//                 >
//                   Save as Draft
//                 </button>
//               </div>
//               <div className="flex-1">
//                 <button
//                   className={`${coverImage && songFile ? "bg-weave-primary" : "bg-gray-300"} text-base-white py-2 w-full font-rubikMedium rounded-md`}
//                   onClick={() => {
//                     if (coverImage && songFile) router.push("/success");
//                   }}
//                 >
//                   Upload Song
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col justify-center my-6" style={{ gap: 10 }}>
//           {/* File Selection */}
//           <div className="mb-1">
//             <label className="font-rubikMedium">
//               Select Audio Files <span className="text-red-500">*</span>
//             </label>
//             <div className="mt-2">
//               <input
//                 type="file"
//                 id="songFile-upload"
//                 className="hidden"
//                 accept="audio/mpeg, audio/wav"
//                 multiple
//                 onChange={handleBulkFileSelect}
//               />
//               <label
//                 htmlFor="songFile-upload"
//                 className="rounded-xl flex flex-col text-center cursor-pointer"
//                 style={{
//                   padding: "1.5rem",
//                   border: "2px dashed #777",
//                   margin: "8px 0",
//                 }}
//               >
//                 {bulkFiles.length > 0 ? (
//                   <div className="flex items-center justify-center">
//                     <span className="text-weave-primary">
//                       {bulkFiles.length} file{bulkFiles.length > 1 ? 's' : ''} selected
//                     </span>
//                     <button
//                       type="button"
//                       className="ml-2 text-red-500"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         clearAllBulkFiles();
//                       }}
//                     >
//                       <span className="fa fa-times"></span>
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="flex items-center justify-center rounded-full bg-gray-200 w-26 h-26 mx-auto mb-2 p-2">
//                       <CloudUpload className="text-gray-600 w-8 h-8" />
//                     </div>
//                     <span className="font-bold">Drag and drop multiple audio files</span>
//                     <span className="text-gray-500 text-sm">MP3, WAV</span>
//                     <span className="mt-2">
//                       <span className="inline-block px-4 py-2 text-sm text-base-white bg-weave-primary rounded-xl">
//                         Select Files
//                       </span>
//                     </span>
//                   </>
//                 )}
//               </label>
//             </div>
//           </div>

//           {/* Shared Cover Image Option */}
//           {bulkFiles.length > 0 && (
//             <div className="mb-4">
//               <div className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   id="useSharedCover"
//                   checked={useSharedCover}
//                   onChange={(e) => setUseSharedCover(e.target.checked)}
//                   className="mr-2"
//                 />
//                 <label htmlFor="useSharedCover" className="font-rubikMedium">
//                   Use the same cover image for all songs
//                 </label>
//               </div>
              
//               {useSharedCover && (
//                 <div className="mt-2">
//                   <label className="font-rubikMedium">
//                     Shared Cover Image <span className="text-red-500">*</span>
//                   </label>
//                   <div className="mt-2">
//                     <input
//                       type="file"
//                       id="sharedCoverImage-file"
//                       className="hidden"
//                       accept="image/png, image/jpeg"
//                       onChange={(e) => setSharedCoverImage(e.target.files[0])}
//                     />
//                     <label
//                       htmlFor="sharedCoverImage-file"
//                       className="rounded-xl flex flex-col text-center cursor-pointer"
//                       style={{
//                         padding: "1rem",
//                         border: "2px dashed #777",
//                         margin: "8px 0",
//                       }}
//                     >
//                       {sharedCoverImage?.name ? (
//                         <div className="flex items-center justify-center">
//                           <span className="text-weave-primary">{sharedCoverImage.name}</span>
//                           <button
//                             type="button"
//                             className="ml-2 text-red-500"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                               setSharedCoverImage(null);
//                             }}
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ) : (
//                         <>
//                           <div className="flex items-center justify-center rounded-full bg-gray-200 w-16 h-16 mx-auto mb-2 p-2">
//                             <CloudUpload className="text-gray-600 w-6 h-6" />
//                           </div>
//                           <span className="font-bold text-sm">Upload shared cover image</span>
//                           <span className="text-gray-500 text-xs">PNG, JPEG</span>
//                         </>
//                       )}
//                     </label>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Individual File Forms */}
//           {bulkFiles.length > 0 && (
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <h6 className="text-lg font-rubikMedium">Selected Files ({bulkFiles.length})</h6>
//                 <button
//                   type="button"
//                   className="text-sm text-red-500 hover:text-red-700"
//                   onClick={clearAllBulkFiles}
//                 >
//                   Clear All
//                 </button>
//               </div>
              
//               {bulkFiles.map((file, index) => (
//                 <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center">
//                       <div className="w-10 h-10 bg-weave-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
//                         {index + 1}
//                       </div>
//                       <div>
//                         <h6 className="font-rubikMedium text-weave-primary">{file.name}</h6>
//                         <p className="text-sm text-gray-500">
//                           {(file.size / (1024 * 1024)).toFixed(2)} MB
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       type="button"
//                       className="text-red-500 hover:text-red-700"
//                       onClick={() => removeBulkFile(index)}
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <InputField
//                       label="Song Title"
//                       placeholder="Enter song title"
//                       required={true}
//                       value={bulkFormsData[index]?.songTitle || ''}
//                       setValue={(value) => updateBulkFormData(index, 'songTitle', value)}
//                     />
//                     <InputField
//                       label="Artist Name"
//                       placeholder="Enter artist name"
//                       required={true}
//                       value={bulkFormsData[index]?.artistName || ''}
//                       setValue={(value) => updateBulkFormData(index, 'artistName', value)}
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                     <InputField
//                       label="Category"
//                       placeholder="Select category"
//                       required={true}
//                       value={bulkFormsData[index]?.category || ''}
//                       setValue={(value) => updateBulkFormData(index, 'category', value)}
//                     />
                    
//                     {!useSharedCover && (
//                       <div>
//                         <label className="font-rubikMedium">
//                           Cover Image <span className="text-red-500">*</span>
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="file"
//                             id={`coverImage-${index}`}
//                             className="hidden"
//                             accept="image/png, image/jpeg"
//                             onChange={(e) => updateBulkFormData(index, 'coverImage', e.target.files[0])}
//                           />
//                           <label
//                             htmlFor={`coverImage-${index}`}
//                             className="rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 p-3 hover:border-weave-primary"
//                           >
//                             {bulkFormsData[index]?.coverImage ? (
//                               <div className="flex items-center">
//                                 <span className="text-weave-primary text-sm">
//                                   {bulkFormsData[index].coverImage.name}
//                                 </span>
//                                 <button
//                                   type="button"
//                                   className="ml-2 text-red-500"
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     e.stopPropagation();
//                                     updateBulkFormData(index, 'coverImage', null);
//                                   }}
//                                 >
//                                   <X className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             ) : (
//                               <span className="text-sm text-gray-500">Add Image</span>
//                             )}
//                           </label>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Upload Button */}
//           <div className="w-full mx-auto">
//             <div className="flex gap-4">
//               <button
//                 className="border border-black py-2 px-4 flex-1 font-rubikMedium rounded-md"
//                 onClick={() => {
//                   // Save as draft logic
//                   console.log("Save as draft:", bulkFormsData);
//                 }}
//               >
//                 Save as Draft
//               </button>
//               <button
//                 className={`${
//                   bulkFiles.length > 0 && 
//                   Object.values(bulkFormsData).every(data => 
//                     data.songTitle && data.artistName && data.category && 
//                     (useSharedCover ? sharedCoverImage : data.coverImage)
//                   )
//                     ? "bg-weave-primary" 
//                     : "bg-gray-300"
//                 } text-base-white py-2 px-4 flex-1 font-rubikMedium rounded-md`}
//                 onClick={() => {
//                   if (bulkFiles.length > 0) {
//                     console.log("Bulk upload files:", bulkFiles);
//                     console.log("Bulk upload data:", bulkFormsData);
//                     console.log("Shared cover:", useSharedCover ? sharedCoverImage : null);
//                     // Handle bulk upload logic here
//                   }
//                 }}
//               >
//                 Upload All Songs
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddMusic;

"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import InputField from "@/components/elements/TextField";
import { CloudUpload, X } from "lucide-react";
import api from "@/lib/api";
import { useToastContext } from "@/contexts/toast";

function AddMusic() {
  const [activeTab, setActiveTab] = useState("singleUpload");
  const [loading, setLoading] = useState(false);
  const [pillars, setPillars] = useState([]); // Store pillars for dropdown

  // Single upload state
  const [singleFormData, setSingleFormData] = useState({
    title: "",
    artiste: "",
    pillarId: "",
    status: "uploaded",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [songFile, setSongFile] = useState(null);

  // Bulk upload state
  const [bulkFiles, setBulkFiles] = useState([]);
  const [bulkFormsData, setBulkFormsData] = useState({});
  const [sharedCoverImage, setSharedCoverImage] = useState(null);
  const [useSharedCover, setUseSharedCover] = useState(false);

  const router = useRouter();
  const { showMessage } = useToastContext();

  // Fetch pillars for dropdown
  useEffect(() => {
    const fetchPillars = async () => {
      try {
        const response = await api.get("/api/pillars");
        setPillars(response.data); // Assuming response.data is an array of { id: UUID, name: string }
      } catch (error) {
        console.error("Error fetching pillars:", error);
        showMessage("Error", "Failed to fetch pillars", "error");
      }
    };
    fetchPillars();
  }, []);

  // Validate UUID format
  const isValidUUID = (uuid) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  // Handle single form data changes
  const handleSingleFormChange = (field, value) => {
    setSingleFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle single upload
  const handleSingleUpload = async () => {
    if (!coverImage || !songFile || !singleFormData.title || !singleFormData.artiste || !singleFormData.pillarId) {
      showMessage("Missing Fields", "Please fill in all required fields", "error");
      return;
    }

    if (!isValidUUID(singleFormData.pillarId)) {
      showMessage("Invalid Pillar ID", "Please select a valid pillar", "error");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", singleFormData.title);
    formData.append("artiste", singleFormData.artiste);
    formData.append("pillarId", singleFormData.pillarId);
    formData.append("status", singleFormData.status);
    formData.append("coverImage", coverImage);
    formData.append("songFile", songFile);

    // Debug FormData contents
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await api.post("/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        showMessage("Success", "Song uploaded successfully!", "success");
        setTimeout(() => {
          router.push("/contentsManagement?refresh=" + Date.now());
        }, 1000);

      } else {
        showMessage("Upload Failed", "Failed to upload song", "error");
      }
    } catch (error) {
      console.error("Upload error:", error);
      showMessage("Upload Error", error.response?.data?.message || "An error occurred while uploading", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle save as draft for single upload
  const handleSingleSaveAsDraft = async () => {
    if (!singleFormData.title || !singleFormData.artiste) {
      showMessage("Missing Fields", "Please fill in at least title and artist name", "error");
      return;
    }

    if (singleFormData.pillarId && !isValidUUID(singleFormData.pillarId)) {
      showMessage("Invalid Pillar ID", "Please select a valid pillar", "error");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", singleFormData.title);
    formData.append("artiste", singleFormData.artiste);
    formData.append("pillarId", singleFormData.pillarId || "");
    formData.append("status", "draft");
    if (coverImage) formData.append("coverImage", coverImage);
    if (songFile) formData.append("songFile", songFile);

    // Debug FormData contents
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await api.post("/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        showMessage("Draft Saved", "Song saved as draft successfully!", "success");
        setTimeout(() => {
          router.back();
        }, 1000);
      }
    } catch (error) {
      console.error("Save draft error:", error);
      showMessage("Save Error", error.response?.data?.message || "An error occurred while saving", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkFileSelect = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      showMessage("Too Many Files", "Maximum 10 files allowed for bulk upload", "error");
      return;
    }

    setBulkFiles(files);

    // Initialize form data for each file
    const initialFormData = {};
    files.forEach((file, index) => {
      initialFormData[index] = {
        title: "",
        artiste: "",
        pillarId: "",
        status: "uploaded",
        coverImage: null,
      };
    });
    setBulkFormsData(initialFormData);
  };

  const updateBulkFormData = (fileIndex, field, value) => {
    setBulkFormsData((prev) => ({
      ...prev,
      [fileIndex]: {
        ...prev[fileIndex],
        [field]: value,
      },
    }));
  };

  const removeBulkFile = (indexToRemove) => {
    const newFiles = bulkFiles.filter((_, index) => index !== indexToRemove);
    setBulkFiles(newFiles);

    // Remove form data for removed file and reindex
    const newFormData = {};
    newFiles.forEach((file, newIndex) => {
      const oldIndex = bulkFiles.findIndex((f) => f === file);
      newFormData[newIndex] = bulkFormsData[oldIndex];
    });
    setBulkFormsData(newFormData);
  };

  const clearAllBulkFiles = () => {
    setBulkFiles([]);
    setBulkFormsData({});
    setSharedCoverImage(null);
  };

  // Handle bulk upload
  const handleBulkUpload = async () => {
    if (bulkFiles.length === 0) {
      showMessage("No Files", "Please select files to upload", "error");
      return;
    }

    // Validate all forms
    const isValid = Object.values(bulkFormsData).every(
      (data) =>
        data.title &&
        data.artiste &&
        data.pillarId &&
        isValidUUID(data.pillarId) &&
        (useSharedCover ? sharedCoverImage : data.coverImage)
    );

    if (!isValid) {
      showMessage("Missing Fields", "Please fill in all required fields and valid pillar IDs for all songs", "error");
      return;
    }

    setLoading(true);

    try {
      const uploadPromises = bulkFiles.map(async (file, index) => {
        const songData = bulkFormsData[index];
        const formData = new FormData();

        formData.append("title", songData.title);
        formData.append("artiste", songData.artiste);
        formData.append("pillarId", songData.pillarId);
        formData.append("status", songData.status);
        formData.append("songFile", file);

        if (useSharedCover && sharedCoverImage) {
          formData.append("coverImage", sharedCoverImage);
        } else if (songData.coverImage) {
          formData.append("coverImage", songData.coverImage);
        }

        // Debug FormData contents
        for (let pair of formData.entries()) {
          console.log(`File ${index + 1} - ${pair[0]}: ${pair[1]}`);
        }

        try {
          const response = await api.post("/songs/bulk", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return { index, status: "success", response };
        } catch (error) {
          return { index, status: "error", error: error.response?.data?.message || `Upload failed for file ${index + 1}` };
        }
      });

      const results = await Promise.all(uploadPromises);
      const errors = results.filter((result) => result.status === "error");

      if (errors.length > 0) {
        errors.forEach((err) => {
          showMessage(`Upload Error (File ${err.index + 1})`, err.error, "error");
        });
      } else {
        showMessage("Success", "All songs uploaded successfully!", "success");
        setTimeout(() => {
          router.push("/contentsManagement?refresh=" + Date.now());
        }, 1000);
      }
    } catch (error) {
      console.error("Bulk upload error:", error);
      showMessage("Upload Error", error.response?.data?.message || "An error occurred during bulk upload", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle bulk save as draft
  const handleBulkSaveAsDraft = async () => {
    if (bulkFiles.length === 0) {
      showMessage("No Files", "Please select files to save", "error");
      return;
    }

    setLoading(true);

    try {
      const uploadPromises = bulkFiles.map(async (file, index) => {
        const songData = bulkFormsData[index] || {};

        if (songData.title || songData.artiste) {
          const formData = new FormData();

          formData.append("title", songData.title || "");
          formData.append("artiste", songData.artiste || "");
          formData.append("pillarId", songData.pillarId || "");
          formData.append("status", "draft");
          formData.append("songFile", file);

          if (useSharedCover && sharedCoverImage) {
            formData.append("coverImage", sharedCoverImage);
          } else if (songData.coverImage) {
            formData.append("coverImage", songData.coverImage);
          }

          // Debug FormData contents
          for (let pair of formData.entries()) {
            console.log(`File ${index + 1} - ${pair[0]}: ${pair[1]}`);
          }

          try {
            const response = await api.post("/songs/bulk", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            return { index, status: "success", response };
          } catch (error) {
            return { index, status: "error", error: error.response?.data?.message || `Save failed for file ${index + 1}` };
          }
        }
        return Promise.resolve({ index, status: "skipped" });
      });

      const results = await Promise.all(uploadPromises);
      const errors = results.filter((result) => result.status === "error");

      if (errors.length > 0) {
        errors.forEach((err) => {
          showMessage(`Save Error (File ${err.index + 1})`, err.error, "error");
        });
      } else {
        showMessage("Drafts Saved", "Songs saved as drafts successfully!", "success");
        setTimeout(() => {
          router.push("/contentsManagement?refresh=" + Date.now());
        }, 1000);
      }
    } catch (error) {
      console.error("Save drafts error:", error);
      showMessage("Save Error", error.response?.data?.message || "An error occurred while saving drafts", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5 className="text-2xl font-rubikBold mb-1">Upload New Song</h5>
      <p className="text-base text-gray-500 mb-6">
        Add a new track to the library by filling in the details below
      </p>

      {/* Tab Navigation */}
      <div className="w-full mb-4">
        <div className="bg-gray-200 p-1 rounded-lg font-rubikMedium flex w-full">
          {["singleUpload", "bulk"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 rounded-md text-center transition-all ${
                activeTab === tab ? "bg-weave-primary text-base-white" : "text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
              disabled={loading}
            >
              {tab === "singleUpload" ? "Single Upload" : "Bulk Upload"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "singleUpload" ? (
        <div className="flex flex-col justify-center my-6" style={{ gap: 10 }}>
          <InputField
            label={"Song Title"}
            placeholder={"Enter song title"}
            className="mb-1"
            required={true}
            value={singleFormData.title}
            setValue={(value) => handleSingleFormChange("title", value)}
          />
          <InputField
            label={"Artist Name"}
            placeholder={"Enter artist name"}
            className="mb-1"
            required={true}
            value={singleFormData.artiste}
            setValue={(value) => handleSingleFormChange("artiste", value)}
          />
          <div className="mb-1">
            <label className="font-rubikMedium">
              Pillar <span className="text-red-500">*</span>
            </label>
            <select
              value={singleFormData.pillarId}
              onChange={(e) => handleSingleFormChange("pillarId", e.target.value)}
              className="w-full p-2 border rounded-md"
              required
              disabled={loading}
            >
              <option value="">Select a Pillar</option>
              {pillars.map((pillar) => (
                <option key={pillar.id} value={pillar.id}>
                  {pillar.name}
                </option>
              ))}
            </select>
          </div>
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
                disabled={loading}
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
                {coverImage?.name ? (
                  <div className="flex items-center justify-center">
                    <span className="text-weave-primary">{coverImage.name}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCoverImage(null);
                      }}
                      disabled={loading}
                    >
                      <X className="w-4 h-4" />
                    </button>
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
          <div className="mb-1">
            <label className="font-rubikMedium">
              Song File <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="file"
                id="songFile-file"
                className="hidden"
                accept="audio/mpeg, audio/wav"
                onChange={(e) => setSongFile(e.target.files[0])}
                disabled={loading}
              />
              <label
                htmlFor="songFile-file"
                className="rounded-xl flex flex-col text-center cursor-pointer"
                style={{
                  padding: "1.5rem",
                  border: "2px dashed #777",
                  margin: "8px 0",
                }}
              >
                {songFile?.name ? (
                  <div className="flex items-center justify-center">
                    <span className="text-weave-primary">{songFile.name}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSongFile(null);
                      }}
                      disabled={loading}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center rounded-full bg-gray-200 w-26 h-26 mx-auto mb-2 p-2">
                      <CloudUpload className="text-gray-600 w-8 h-8" />
                    </div>
                    <span className="font-bold">Drag and drop your audio here</span>
                    <span className="text-gray-500 text-sm">MP3, WAV</span>
                    <span className="mt-2">
                      <span className="inline-block px-4 py-2 text-sm text-base-white bg-weave-primary rounded-xl">
                        Select a File
                      </span>
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>
          <div className="w-full mx-auto">
            <div className="flex" style={{ gap: 20 }}>
              <div className="flex-1">
                <button
                  className="border border-black py-2 w-full font-rubikMedium rounded-md"
                  onClick={handleSingleSaveAsDraft}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save as Draft"}
                </button>
              </div>
              <div className="flex-1">
                <button
                  className={`${
                    coverImage && songFile && singleFormData.title && singleFormData.artiste && singleFormData.pillarId && !loading
                      ? "bg-weave-primary"
                      : "bg-gray-300"
                  } text-base-white py-2 w-full font-rubikMedium rounded-md`}
                  onClick={handleSingleUpload}
                  disabled={loading || !coverImage || !songFile || !singleFormData.title || !singleFormData.artiste || !singleFormData.pillarId}
                >
                  {loading ? "Uploading..." : "Upload Song"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center my-6" style={{ gap: 10 }}>
          {/* File Selection */}
          <div className="mb-1">
            <label className="font-rubikMedium">
              Select Audio Files <span className="text-red-500">*</span> (Max 10 files)
            </label>
            <div className="mt-2">
              <input
                type="file"
                id="songFile-upload"
                className="hidden"
                accept="audio/mpeg, audio/wav"
                multiple
                onChange={handleBulkFileSelect}
                disabled={loading}
              />
              <label
                htmlFor="songFile-upload"
                className="rounded-xl flex flex-col text-center cursor-pointer"
                style={{
                  padding: "1.5rem",
                  border: "2px dashed #777",
                  margin: "8px 0",
                }}
              >
                {bulkFiles.length > 0 ? (
                  <div className="flex items-center justify-center">
                    <span className="text-weave-primary">
                      {bulkFiles.length} file{bulkFiles.length > 1 ? "s" : ""} selected
                    </span>
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        clearAllBulkFiles();
                      }}
                      disabled={loading}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center rounded-full bg-gray-200 w-26 h-26 mx-auto mb-2 p-2">
                      <CloudUpload className="text-gray-600 w-8 h-8" />
                    </div>
                    <span className="font-bold">Drag and drop multiple audio files</span>
                    <span className="text-gray-500 text-sm">MP3, WAV (Max 10 files)</span>
                    <span className="mt-2">
                      <span className="inline-block px-4 py-2 text-sm text-base-white bg-weave-primary rounded-xl">
                        Select Files
                      </span>
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Shared Cover Image Option */}
          {bulkFiles.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="useSharedCover"
                  checked={useSharedCover}
                  onChange={(e) => setUseSharedCover(e.target.checked)}
                  className="mr-2"
                  disabled={loading}
                />
                <label htmlFor="useSharedCover" className="font-rubikMedium">
                  Use the same cover image for all songs
                </label>
              </div>

              {useSharedCover && (
                <div className="mt-2">
                  <label className="font-rubikMedium">
                    Shared Cover Image <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="sharedCoverImage-file"
                      className="hidden"
                      accept="image/png, image/jpeg"
                      onChange={(e) => setSharedCoverImage(e.target.files[0])}
                      disabled={loading}
                    />
                    <label
                      htmlFor="sharedCoverImage-file"
                      className="rounded-xl flex flex-col text-center cursor-pointer"
                      style={{
                        padding: "1rem",
                        border: "2px dashed #777",
                        margin: "8px 0",
                      }}
                    >
                      {sharedCoverImage?.name ? (
                        <div className="flex items-center justify-center">
                          <span className="text-weave-primary">{sharedCoverImage.name}</span>
                          <button
                            type="button"
                            className="ml-2 text-red-500"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSharedCoverImage(null);
                            }}
                            disabled={loading}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-center rounded-full bg-gray-200 w-16 h-16 mx-auto mb-2 p-2">
                            <CloudUpload className="text-gray-600 w-6 h-6" />
                          </div>
                          <span className="font-bold text-sm">Upload shared cover image</span>
                          <span className="text-gray-500 text-xs">PNG, JPEG</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Individual File Forms */}
          {bulkFiles.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h6 className="text-lg font-rubikMedium">Selected Files ({bulkFiles.length})</h6>
                <button
                  type="button"
                  className="text-sm text-red-500 hover:text-red-700"
                  onClick={clearAllBulkFiles}
                  disabled={loading}
                >
                  Clear All
                </button>
              </div>

              {bulkFiles.map((file, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-weave-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h6 className="font-rubikMedium text-weave-primary">{file.name}</h6>
                        <p className="text-sm text-gray-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeBulkFile(index)}
                      disabled={loading}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Song Title"
                      placeholder="Enter song title"
                      required={true}
                      value={bulkFormsData[index]?.title || ""}
                      setValue={(value) => updateBulkFormData(index, "title", value)}
                    />
                    <InputField
                      label="Artist Name"
                      placeholder="Enter artist name"
                      required={true}
                      value={bulkFormsData[index]?.artiste || ""}
                      setValue={(value) => updateBulkFormData(index, "artiste", value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="font-rubikMedium">
                        Pillar <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={bulkFormsData[index]?.pillarId || ""}
                        onChange={(e) => updateBulkFormData(index, "pillarId", e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                        disabled={loading}
                      >
                        <option value="">Select a Pillar</option>
                        {pillars.map((pillar) => (
                          <option key={pillar.id} value={pillar.id}>
                            {pillar.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {!useSharedCover && (
                      <div>
                        <label className="font-rubikMedium">
                          Cover Image <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                          <input
                            type="file"
                            id={`coverImage-${index}`}
                            className="hidden"
                            accept="image/png, image/jpeg"
                            onChange={(e) => updateBulkFormData(index, "coverImage", e.target.files[0])}
                            disabled={loading}
                          />
                          <label
                            htmlFor={`coverImage-${index}`}
                            className="rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 p-3 hover:border-weave-primary"
                          >
                            {bulkFormsData[index]?.coverImage ? (
                              <div className="flex items-center">
                                <span className="text-weave-primary text-sm">
                                  {bulkFormsData[index].coverImage.name}
                                </span>
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    updateBulkFormData(index, "coverImage", null);
                                  }}
                                  disabled={loading}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">Add Image</span>
                            )}
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <div className="w-full mx-auto">
            <div className="flex gap-4">
              <button
                className="border border-black py-2 px-4 flex-1 font-rubikMedium rounded-md"
                onClick={handleBulkSaveAsDraft}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save as Draft"}
              </button>
              <button
                className={`${
                  bulkFiles.length > 0 &&
                  Object.values(bulkFormsData).every(
                    (data) =>
                      data.title &&
                      data.artiste &&
                      data.pillarId &&
                      isValidUUID(data.pillarId) &&
                      (useSharedCover ? sharedCoverImage : data.coverImage)
                  ) &&
                  !loading
                    ? "bg-weave-primary"
                    : "bg-gray-300"
                } text-base-white py-2 px-4 flex-1 font-rubikMedium rounded-md`}
                onClick={handleBulkUpload}
                disabled={
                  loading ||
                  bulkFiles.length === 0 ||
                  !Object.values(bulkFormsData).every(
                    (data) =>
                      data.title &&
                      data.artiste &&
                      data.pillarId &&
                      isValidUUID(data.pillarId) &&
                      (useSharedCover ? sharedCoverImage : data.coverImage)
                  )
                }
              >
                {loading ? "Uploading..." : "Upload All Songs"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddMusic;