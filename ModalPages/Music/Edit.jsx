



// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import InputField from "@/components/elements/TextField";
// import { CloudUpload, X } from "lucide-react";
// import api from "@/lib/api";
// import { useToastContext } from "@/contexts/toast";

// // Cloudinary upload function
// const uploadToCloudinary = async (file, resourceType = "auto") => {
//   const formData = new FormData();
//   formData.append("file", file);
//   const uploadPreset = "founder_thrive";
//   formData.append("upload_preset", uploadPreset);
//   formData.append("cloud_name", "dhjx1ncqg");

//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/dhjx1ncqg/${resourceType}/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(`Upload failed: ${response.statusText} - ${JSON.stringify(errorData)}`);
//     }

//     const data = await response.json();
//     return data.secure_url;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw error;
//   }
// };

// function EditMusic() {
//   const [loading, setLoading] = useState(false);
//   const [pillars, setPillars] = useState([]);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [formData, setFormData] = useState({
//     title: "",
//     artiste: "",
//     pillarId: "",
//     status: "uploaded",
//   });
//   const [coverImage, setCoverImage] = useState(null);
//   const [songFile, setSongFile] = useState(null);
//   const [existingCoverImage, setExistingCoverImage] = useState(null);
//   const [existingSongFile, setExistingSongFile] = useState(null);
//   const [songData, setSongData] = useState(null);

//   const router = useRouter();
//   const { showMessage } = useToastContext();
//   const params = useSearchParams();
//   const resourceId = params.get("resource_id");

//   // Validate UUID format
//   const isValidUUID = (uuid) => {
//     const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
//     return uuidRegex.test(uuid);
//   };

//   // Fetch song details and pillars
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!resourceId) {
//         showMessage("Error", "No song ID provided", "error");
//         return;
//       }

//       try {
//         // Fetch pillars
//         const pillarsResponse = await api.get("/pillars");
//         setPillars(pillarsResponse.data);

//         // Fetch song details
//         const songResponse = await api.get(`/songs/${resourceId}`);
//         const song = songResponse.data;
        
//         setSongData(song);
//         setFormData({
//           title: song.title || "",
//           artiste: song.artiste || "",
//           pillarId: song.pillar?.id || song.pillarId || "",
//           status: song.status || "uploaded",
//         });
        
//         // Set existing media URLs/info
//         setExistingCoverImage(song.coverImage || song.coverImageUrl);
//         setExistingSongFile({
//           url: song.songFile || song.songFileUrl,
//           name: song.originalFileName || song.fileName || song.title || "Current song file"
//         });
//       } catch (error) {
//         console.error("Error fetching song or pillars:", error);
//         showMessage("Error", error.response?.data?.message || "Failed to load song details", "error");
//       }
//     };
//     fetchData();
//   }, [resourceId]);

//   // Handle form data changes
//   const handleFormChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Handle save as draft
//   const handleSaveAsDraft = async () => {
//     if (!formData.title || !formData.artiste) {
//       showMessage("Missing Fields", "Please fill in at least title and artist name", "error");
//       return;
//     }

//     if (formData.pillarId && !isValidUUID(formData.pillarId)) {
//       showMessage("Invalid Pillar ID", "Please select a valid pillar", "error");
//       return;
//     }

//     setLoading(true);
//     setUploadProgress({});

//     try {
//       let coverImageUrl = existingCoverImage;
//       let songFileUrl = existingSongFile?.url;

//       if (coverImage) {
//         showMessage("Uploading", "Uploading cover image...", "info");
//         setUploadProgress(prev => ({ ...prev, coverImage: 50 }));
//         coverImageUrl = await uploadToCloudinary(coverImage, "image");
//         setUploadProgress(prev => ({ ...prev, coverImage: 100 }));
//       }

//       if (songFile) {
//         showMessage("Uploading", "Uploading audio file...", "info");
//         setUploadProgress(prev => ({ ...prev, songFile: 50 }));
//         songFileUrl = await uploadToCloudinary(songFile, "video");
//         setUploadProgress(prev => ({ ...prev, songFile: 100 }));
//       }

//       const requestData = {
//         title: formData.title,
//         artiste: formData.artiste,
//         pillarId: formData.pillarId || "",
//         status: "draft",
//         ...(coverImageUrl && { coverImage: coverImageUrl }),
//         ...(songFileUrl && { songFile: songFileUrl }),
//       };

//       const response = await api.patch(`/songs/${resourceId}`, requestData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         timeout: 60000,
//       });

//       if (response.status === 200 || response.status === 201) {
//         showMessage("Draft Saved", "Song saved as draft successfully!", "success");
//         setTimeout(() => {
//           router.push("/contentsManagement?refresh=" + Date.now());
//         }, 1000);
//       }
//     } catch (error) {
//       console.error("Save draft error:", error);
//       showMessage("Save Error", error.message || "An error occurred while saving", "error");
//     } finally {
//       setLoading(false);
//       setUploadProgress({});
//     }
//   };

//   // Handle update song
//   const handleUpdateSong = async () => {
//     const hasCoverImage = coverImage || existingCoverImage;
//     const hasSongFile = songFile || existingSongFile;

//     if (!formData.title || !formData.artiste || !formData.pillarId || !hasCoverImage || !hasSongFile) {
//       showMessage("Missing Fields", "Please fill in all required fields", "error");
//       return;
//     }

//     if (!isValidUUID(formData.pillarId)) {
//       showMessage("Invalid Pillar ID", "Please select a valid pillar", "error");
//       return;
//     }

//     setLoading(true);
//     setUploadProgress({});

//     try {
//       let coverImageUrl = existingCoverImage;
//       let songFileUrl = existingSongFile?.url;

//       if (coverImage) {
//         showMessage("Uploading", "Uploading cover image...", "info");
//         setUploadProgress(prev => ({ ...prev, coverImage: 50 }));
//         coverImageUrl = await uploadToCloudinary(coverImage, "image");
//         setUploadProgress(prev => ({ ...prev, coverImage: 100 }));
//       }

//       if (songFile) {
//         showMessage("Uploading", "Uploading audio file...", "info");
//         setUploadProgress(prev => ({ ...prev, songFile: 50 }));
//         songFileUrl = await uploadToCloudinary(songFile, "video");
//         setUploadProgress(prev => ({ ...prev, songFile: 100 }));
//       }

//       const requestData = {
//         title: formData.title,
//         artiste: formData.artiste,
//         pillarId: formData.pillarId,
//         status: "uploaded",
//         coverImage: coverImageUrl,
//         songFile: songFileUrl,
//       };

//       const response = await api.patch(`/songs/url-upload/song/${resourceId}`, requestData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         timeout: 60000,
//       });

//       if (response.status === 200 || response.status === 201) {
//         showMessage("Success", "Song updated successfully!", "success");
//         setTimeout(() => {
//           router.push("/contentsManagement?refresh=" + Date.now());
//         }, 1000);
//       } else {
//         showMessage("Update Failed", "Failed to update song", "error");
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       showMessage("Update Error", error.message || "An error occurred while updating", "error");
//     } finally {
//       setLoading(false);
//       setUploadProgress({});
//     }
//   };

//   return (
//     <div>
//       <h5 className="text-2xl font-rubikBold mb-1">Edit Song</h5>
//       <p className="text-base text-gray-500 mb-6">Update the song details below</p>

//       {/* Upload Progress Display */}
//       {Object.keys(uploadProgress).length > 0 && (
//         <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//           <p className="text-sm font-medium text-blue-800 mb-2">Upload Progress:</p>
//           {Object.entries(uploadProgress).map(([key, progress]) => (
//             <div key={key} className="mb-1">
//               <div className="flex justify-between text-xs text-blue-600">
//                 <span>{key === 'coverImage' ? 'Cover Image' : 'Audio File'}</span>
//                 <span>{progress}%</span>
//               </div>
//               <div className="w-full bg-blue-200 rounded-full h-2">
//                 <div 
//                   className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="flex flex-col justify-center my-6" style={{ gap: 10 }}>
//         <InputField
//           label="Song Title"
//           placeholder="Enter song title"
//           className="mb-1"
//           required={true}
//           value={formData.title}
//           setValue={(value) => handleFormChange("title", value)}
//         />
//         <InputField
//           label="Artist Name"
//           placeholder="Enter artist name"
//           className="mb-1"
//           required={true}
//           value={formData.artiste}
//           setValue={(value) => handleFormChange("artiste", value)}
//         />
//         <div className="mb-1">
//           <label className="font-rubikMedium">
//             Pillar <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={formData.pillarId}
//             onChange={(e) => handleFormChange("pillarId", e.target.value)}
//             className="w-full p-2 border rounded-md"
//             required
//             disabled={loading}
//           >
//             <option value="">Select a Pillar</option>
//             {pillars.map((pillar) => (
//               <option key={pillar.id} value={pillar.id}>
//                 {pillar.name}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         {/* Cover Image Section */}
//         <div className="mb-1">
//           <label className="font-rubikMedium">
//             Cover Image <span className="text-red-500">*</span>
//           </label>
//           <div className="mt-2">
//             <input
//               type="file"
//               id="coverImage-file"
//               className="hidden"
//               accept="image/png, image/jpeg"
//               onChange={(e) => setCoverImage(e.target.files[0])}
//               disabled={loading}
//             />
            
//             {/* Show existing cover image preview */}
//             {existingCoverImage && !coverImage && (
//               <div className="mb-2">
//                 <p className="text-sm text-gray-600 mb-2">Current cover image:</p>
//                 <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
//                   <div className="flex items-center">
//                     <img 
//                       src={existingCoverImage} 
//                       alt="Current cover" 
//                       className="w-12 h-12 object-cover rounded mr-3"
//                       onError={(e) => {
//                         e.target.style.display = 'none';
//                       }}
//                     />
//                     <span className="text-sm">Current cover image</span>
//                   </div>
//                   <span className="text-xs text-gray-500">Replace by selecting a new image below</span>
//                 </div>
//               </div>
//             )}
            
//             <label
//               htmlFor="coverImage-file"
//               className="rounded-xl flex flex-col text-center cursor-pointer"
//               style={{
//                 padding: "1.5rem",
//                 border: "2px dashed #777",
//                 margin: "8px 0",
//               }}
//             >
//               {coverImage?.name ? (
//                 <div className="flex items-center justify-center">
//                   <span className="text-weave-primary">{coverImage.name}</span>
//                   <button
//                     type="button"
//                     className="ml-2 text-red-500"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       setCoverImage(null);
//                     }}
//                     disabled={loading}
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex items-center justify-center rounded-full bg-gray-200 w-26 h-26 mx-auto mb-2 p-2">
//                     <CloudUpload className="text-gray-600 w-8 h-8" />
//                   </div>
//                   <span className="font-bold">
//                     {existingCoverImage ? "Replace cover image" : "Drag and drop your cover image"}
//                   </span>
//                   <span className="text-gray-500 text-sm">PNG, JPEG</span>
//                   <span className="mt-2">
//                     <span className="inline-block px-4 py-2 text-sm text-base-white bg-weave-primary rounded-xl">
//                       Select Image
//                     </span>
//                   </span>
//                 </>
//               )}
//             </label>
//           </div>
//         </div>
        
//         {/* Song File Section */}
//         <div className="mb-1">
//           <label className="font-rubikMedium">
//             Song File <span className="text-red-500">*</span>
//           </label>
//           <div className="mt-2">
//             <input
//               type="file"
//               id="songFile-file"
//               className="hidden"
//               accept="audio/mpeg, audio/wav"
//               onChange={(e) => setSongFile(e.target.files[0])}
//               disabled={loading}
//             />
            
//             {/* Show existing song file info */}
//             {existingSongFile && !songFile && (
//               <div className="mb-2">
//                 <p className="text-sm text-gray-600 mb-2">Current song file:</p>
//                 <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
//                   <div className="flex items-center">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                       <span className="text-blue-600 text-xs font-semibold">♪</span>
//                     </div>
//                     <span className="text-sm">{existingSongFile.name}</span>
//                   </div>
//                   <span className="text-xs text-gray-500">Replace by selecting a new file below</span>
//                 </div>
//               </div>
//             )}
            
//             <label
//               htmlFor="songFile-file"
//               className="rounded-xl flex flex-col text-center cursor-pointer"
//               style={{
//                 padding: "1.5rem",
//                 border: "2px dashed #777",
//                 margin: "8px 0",
//               }}
//             >
//               {songFile?.name ? (
//                 <div className="flex items-center justify-center">
//                   <span className="text-weave-primary">{songFile.name}</span>
//                   <button
//                     type="button"
//                     className="ml-2 text-red-500"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       setSongFile(null);
//                     }}
//                     disabled={loading}
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex items-center justify-center rounded-full bg-gray-200 w-26 h-26 mx-auto mb-2 p-2">
//                     <CloudUpload className="text-gray-600 w-8 h-8" />
//                   </div>
//                   <span className="font-bold">
//                     {existingSongFile ? "Replace audio file" : "Drag and drop your audio here"}
//                   </span>
//                   <span className="text-gray-500 text-sm">MP3, WAV</span>
//                   <span className="mt-2">
//                     <span className="inline-block px-4 py-2 text-sm text-base-white bg-weave-primary rounded-xl">
//                       Select a File
//                     </span>
//                   </span>
//                 </>
//               )}
//             </label>
//           </div>
//         </div>
        
//         <div className="w-full mx-auto">
//           <div className="flex" style={{ gap: 20 }}>
//             <div className="flex-1">
//               <button
//                 className="border border-black py-2 w-full font-rubikMedium rounded-md"
//                 onClick={handleSaveAsDraft}
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save as Draft"}
//               </button>
//             </div>
//             <div className="flex-1">
//               <button
//                 className={`${
//                   (coverImage || existingCoverImage) && 
//                   (songFile || existingSongFile) && 
//                   formData.title && 
//                   formData.artiste && 
//                   formData.pillarId && 
//                   !loading
//                     ? "bg-weave-primary"
//                     : "bg-gray-300"
//                 } text-base-white py-2 w-full font-rubikMedium rounded-md`}
//                 onClick={handleUpdateSong}
//                 disabled={
//                   loading || 
//                   (!coverImage && !existingCoverImage) || 
//                   (!songFile && !existingSongFile) || 
//                   !formData.title || 
//                   !formData.artiste || 
//                   !formData.pillarId
//                 }
//               >
//                 {loading ? "Updating..." : "Update Song"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditMusic;


"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import InputField from "@/components/elements/TextField";
import { CloudUpload, X } from "lucide-react";
import api from "@/lib/api";
import { useToastContext } from "@/contexts/toast";

// Updated Cloudinary upload function to extract metadata
const uploadToCloudinary = async (file, resourceType = "auto") => {
  const formData = new FormData();
  formData.append("file", file);
  const uploadPreset = "founder_thrive";
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", "dhjx1ncqg");

  console.log("Using upload preset:", uploadPreset); // Debug log

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dhjx1ncqg/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary error response:", errorData);
      throw new Error(`Upload failed: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("Cloudinary response:", data); // Debug log to see all available fields
    
    // Return an object with all the metadata we need
    return {
      url: data.secure_url,
      bytes: data.bytes || 0, // File size in bytes
      duration: data.duration || 0, // Duration in seconds (for audio/video)
      format: data.format || '', // File format
      resource_type: data.resource_type || '', // audio, video, image, etc.
      width: data.width || 0, // For images/videos
      height: data.height || 0, // For images/videos
      public_id: data.public_id || '', // Cloudinary public ID
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

function EditMusic() {
  const [loading, setLoading] = useState(false);
  const [pillars, setPillars] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    artiste: "",
    pillarId: "",
    status: "uploaded",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [songFile, setSongFile] = useState(null);
  const [existingCoverImage, setExistingCoverImage] = useState(null);
  const [existingSongFile, setExistingSongFile] = useState(null);
  const [songData, setSongData] = useState(null);

  const router = useRouter();
  const { showMessage } = useToastContext();
  const params = useSearchParams();
  const resourceId = params.get("resource_id");

  // Validate UUID format
  const isValidUUID = (uuid) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  // Fetch song details and pillars
  useEffect(() => {
    const fetchData = async () => {
      if (!resourceId) {
        showMessage("Error", "No song ID provided", "error");
        return;
      }

      try {
        // Fetch pillars
        const pillarsResponse = await api.get("/pillars");
        setPillars(pillarsResponse.data);

        // Fetch song details
        const songResponse = await api.get(`/songs/${resourceId}`);
        const song = songResponse.data;
        
        setSongData(song);
        setFormData({
          title: song.title || "",
          artiste: song.artiste || "",
          pillarId: song.pillar?.id || song.pillarId || "",
          status: song.status || "uploaded",
        });
        
        // Set existing media URLs/info
        setExistingCoverImage(song.coverImage || song.coverImageUrl);
        setExistingSongFile({
          url: song.songFile || song.songFileUrl,
          name: song.originalFileName || song.fileName || song.title || "Current song file",
          size: song.songFileSize || 0,
          duration: song.songDuration || 0
        });
      } catch (error) {
        console.error("Error fetching song or pillars:", error);
        showMessage("Error", error.response?.data?.message || "Failed to load song details", "error");
      }
    };
    fetchData();
  }, [resourceId]);

  // Handle form data changes
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle save as draft
  const handleSaveAsDraft = async () => {
    if (!formData.title || !formData.artiste) {
      showMessage("Missing Fields", "Please fill in at least title and artist name", "error");
      return;
    }

    if (formData.pillarId && !isValidUUID(formData.pillarId)) {
      showMessage("Invalid Pillar ID", "Please select a valid pillar", "error");
      return;
    }

    setLoading(true);
    setUploadProgress({});

    try {
      let coverImageResponse = { url: existingCoverImage };
      let songFileResponse = { 
        url: existingSongFile?.url,
        bytes: existingSongFile?.size || 0,
        duration: existingSongFile?.duration || 0
      };

      if (coverImage) {
        showMessage("Uploading", "Uploading cover image...", "info");
        setUploadProgress(prev => ({ ...prev, coverImage: 50 }));
        coverImageResponse = await uploadToCloudinary(coverImage, "image");
        setUploadProgress(prev => ({ ...prev, coverImage: 100 }));
      }

      if (songFile) {
        showMessage("Uploading", "Uploading audio file...", "info");
        setUploadProgress(prev => ({ ...prev, songFile: 50 }));
        songFileResponse = await uploadToCloudinary(songFile, "video");
        setUploadProgress(prev => ({ ...prev, songFile: 100 }));
      }

      const requestData = {
        title: formData.title,
        artiste: formData.artiste,
        pillarId: formData.pillarId || "",
        status: "draft",
        ...(coverImageResponse.url && { coverImage: coverImageResponse.url }),
        ...(songFileResponse.url && { 
          songFile: songFileResponse.url,
          songFileSize: songFileResponse.bytes,
          songDuration: songFileResponse.duration,
        }),
      };

      console.log("Sending draft data to API:", requestData);

      const response = await api.patch(`/songs/url-upload/song/${resourceId}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 60000,
      });

      if (response.status === 200 || response.status === 201) {
        showMessage("Draft Saved", "Song saved as draft successfully!", "success");
        setTimeout(() => {
          router.push("/contentsManagement?refresh=" + Date.now());
        }, 1000);
      }
    } catch (error) {
      console.error("Save draft error:", error);
      showMessage("Save Error", error.message || "An error occurred while saving", "error");
    } finally {
      setLoading(false);
      setUploadProgress({});
    }
  };

  // Handle update song
  const handleUpdateSong = async () => {
    const hasCoverImage = coverImage || existingCoverImage;
    const hasSongFile = songFile || existingSongFile;

    if (!formData.title || !formData.artiste || !formData.pillarId || !hasCoverImage || !hasSongFile) {
      showMessage("Missing Fields", "Please fill in all required fields", "error");
      return;
    }

    if (!isValidUUID(formData.pillarId)) {
      showMessage("Invalid Pillar ID", "Please select a valid pillar", "error");
      return;
    }

    setLoading(true);
    setUploadProgress({});

    try {
      let coverImageResponse = { url: existingCoverImage };
      let songFileResponse = { 
        url: existingSongFile?.url,
        bytes: existingSongFile?.size || 0,
        duration: existingSongFile?.duration || 0
      };

      if (coverImage) {
        showMessage("Uploading", "Uploading cover image...", "info");
        setUploadProgress(prev => ({ ...prev, coverImage: 50 }));
        coverImageResponse = await uploadToCloudinary(coverImage, "image");
        setUploadProgress(prev => ({ ...prev, coverImage: 100 }));
      }

      if (songFile) {
        showMessage("Uploading", "Uploading audio file...", "info");
        setUploadProgress(prev => ({ ...prev, songFile: 50 }));
        songFileResponse = await uploadToCloudinary(songFile, "video");
        setUploadProgress(prev => ({ ...prev, songFile: 100 }));
      }

      const requestData = {
        title: formData.title,
        artiste: formData.artiste,
        pillarId: formData.pillarId,
        status: "uploaded",
        coverImage: coverImageResponse.url,
        songFile: songFileResponse.url,
        songFileSize: songFileResponse.bytes, // File size in bytes
        songDuration: songFileResponse.duration, // Duration in seconds
      };

      console.log("Sending update data to API:", requestData);

      const response = await api.patch(`/songs/url-upload/song/${resourceId}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 60000,
      });

      if (response.status === 200 || response.status === 201) {
        showMessage("Success", "Song updated successfully!", "success");
        setTimeout(() => {
          router.push("/contentsManagement?refresh=" + Date.now());
        }, 1000);
      } else {
        showMessage("Update Failed", "Failed to update song", "error");
      }
    } catch (error) {
      console.error("Update error:", error);
      showMessage("Update Error", error.message || "An error occurred while updating", "error");
    } finally {
      setLoading(false);
      setUploadProgress({});
    }
  };

  return (
    <div>
      <h5 className="text-2xl font-rubikBold mb-1">Edit Song</h5>
      <p className="text-base text-gray-500 mb-6">Update the song details below</p>

      {/* Upload Progress Display */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-800 mb-2">Upload Progress:</p>
          {Object.entries(uploadProgress).map(([key, progress]) => (
            <div key={key} className="mb-1">
              <div className="flex justify-between text-xs text-blue-600">
                <span>{key === 'coverImage' ? 'Cover Image' : 'Audio File'}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col justify-center my-6" style={{ gap: 10 }}>
        <InputField
          label="Song Title"
          placeholder="Enter song title"
          className="mb-1"
          required={true}
          value={formData.title}
          setValue={(value) => handleFormChange("title", value)}
        />
        <InputField
          label="Artist Name"
          placeholder="Enter artist name"
          className="mb-1"
          required={true}
          value={formData.artiste}
          setValue={(value) => handleFormChange("artiste", value)}
        />
        <div className="mb-1">
          <label className="font-rubikMedium">
            Pillar <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.pillarId}
            onChange={(e) => handleFormChange("pillarId", e.target.value)}
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
        
        {/* Cover Image Section */}
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
            
            {/* Show existing cover image preview */}
            {existingCoverImage && !coverImage && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 mb-2">Current cover image:</p>
                <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                  <div className="flex items-center">
                    <img 
                      src={existingCoverImage} 
                      alt="Current cover" 
                      className="w-12 h-12 object-cover rounded mr-3"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="text-sm">Current cover image</span>
                  </div>
                  <span className="text-xs text-gray-500">Replace by selecting a new image below</span>
                </div>
              </div>
            )}
            
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
                  <span className="font-bold">
                    {existingCoverImage ? "Replace cover image" : "Drag and drop your cover image"}
                  </span>
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
        
        {/* Song File Section */}
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
            
            {/* Show existing song file info */}
            {existingSongFile && !songFile && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 mb-2">Current song file:</p>
                <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-xs font-semibold">♪</span>
                    </div>
                    <div>
                      <span className="text-sm block">{existingSongFile.name}</span>
                      {existingSongFile.size > 0 && (
                        <span className="text-xs text-gray-500">
                          Size: {(existingSongFile.size / (1024 * 1024)).toFixed(2)} MB
                          {existingSongFile.duration > 0 && (
                            <span> • Duration: {Math.floor(existingSongFile.duration / 60)}:{(existingSongFile.duration % 60).toFixed(0).padStart(2, '0')}</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Replace by selecting a new file below</span>
                </div>
              </div>
            )}
            
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
                  <span className="font-bold">
                    {existingSongFile ? "Replace audio file" : "Drag and drop your audio here"}
                  </span>
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
                onClick={handleSaveAsDraft}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save as Draft"}
              </button>
            </div>
            <div className="flex-1">
              <button
                className={`${
                  (coverImage || existingCoverImage) && 
                  (songFile || existingSongFile) && 
                  formData.title && 
                  formData.artiste && 
                  formData.pillarId && 
                  !loading
                    ? "bg-weave-primary"
                    : "bg-gray-300"
                } text-base-white py-2 w-full font-rubikMedium rounded-md`}
                onClick={handleUpdateSong}
                disabled={
                  loading || 
                  (!coverImage && !existingCoverImage) || 
                  (!songFile && !existingSongFile) || 
                  !formData.title || 
                  !formData.artiste || 
                  !formData.pillarId
                }
              >
                {loading ? "Updating..." : "Update Song"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMusic;