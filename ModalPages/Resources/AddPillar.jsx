// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import InputField from "@/components/elements/TextField";
// import heartIcon from "@/assets/images/gym2.png";
// import leafIcon from "@/assets/images/Icon1.png";
// import appleIcon from "@/assets/images/task-list1.png";
// import brainIcon from "@/assets/images/brain4.png";
// import sunIcon from "@/assets/images/bib.png";
// import starIcon from "@/assets/images/energy.png";

// function AddContentPillars() {
//     const [contentType, setContentType] = useState("");
//     const [pillarName, setPillarName] = useState("");
//     const [selectedIcon, setSelectedIcon] = useState("");
//     const [description, setDescription] = useState("");
//     const [unlocked, setUnlocked] = useState(false);
//     const router = useRouter();

//     // List of icons to select from
//     const icons = [
//         { name: "heart", src: heartIcon },
//         { name: "leaf", src: leafIcon },
//         { name: "apple", src: appleIcon },
//         { name: "brain", src: brainIcon },
//         { name: "sun", src: sunIcon },
//         { name: "star", src: starIcon },
//         // Add more as needed
//     ];

//     useEffect(() => {
//         console.log(contentType);
//     }, [contentType]);

//     return (
//         <div>
//             <h5 className="font-rubikBold text-2xl">Add Pillars</h5>
//             <div>
//                 <InputField
//                     label={"Name"}
//                     value={pillarName}
//                     setValue={setPillarName}
//                     required={true}
//                 />
//             </div>

//             {/* Select Icon */}
//             {/* Select Icon */}
// <div className="mt-4">
//     <label className="block font-rubikMedium mb-2">
//         Select icon <span className="text-red-500">*</span>
//     </label>
//     <div className="flex gap-3 flex-wrap">
//         {icons.map((icon) => (
//             <button
//                 type="button"
//                 key={icon.name}
//                 className={`
//                     relative rounded-full p-3 border-2 transition-all duration-200 
//                     hover:scale-105 hover:shadow-md
//                     ${selectedIcon === icon.name
//                         ? "border-weave-primary bg-weave-primary/10 shadow-lg ring-2 ring-weave-primary/20"
//                         : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
//                     }
//                 `}
//                 onClick={() => setSelectedIcon(icon.name)}
//                 aria-label={`Select ${icon.name} icon`}
//             >
//                 <Image
//                     src={icon.src}
//                     alt={icon.name}
//                     width={32}
//                     height={32}
//                     className="object-contain"
//                 />
//                 {/* Selection indicator */}
//                 {selectedIcon === icon.name && (
//                     <div className="absolute -top-1 -right-1 w-5 h-5 bg-weave-primary rounded-full flex items-center justify-center">
//                         <svg 
//                             className="w-3 h-3 text-white" 
//                             fill="currentColor" 
//                             viewBox="0 0 20 20"
//                         >
//                             <path 
//                                 fillRule="evenodd" 
//                                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
//                                 clipRule="evenodd" 
//                             />
//                         </svg>
//                     </div>
//                 )}
//             </button>
//         ))}
//     </div>
//     {/* Show selected icon name
//     {selectedIcon && (
//         <p className="mt-2 text-sm text-gray-600 font-rubikRegular">
//             Selected: <span className="font-rubikMedium capitalize">{selectedIcon}</span>
//         </p>
//     )} */}
// </div>

//             {/* Description */}
//             <div className="mt-4">
//                 <label className="block font-rubikMedium mb-2">
//                     Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
//                     placeholder="Enter short description of the pillar"
//                     value={description}
//                     onChange={(e) => {
//                         if (e.target.value.length <= 45) setDescription(e.target.value);
//                     }}
//                     rows={2}
//                     maxLength={45}
//                     required
//                 />
//                 <div className="text-right text-xs text-gray-400 mt-1">
//                     {description.length}/45 Characters
//                 </div>
//             </div>

//             {/* Updated Toggle Switch */}
//             <div className="mt-4 flex items-center gap-3">
//     <label className="relative inline-block w-10 h-4 cursor-pointer">
//         <input
//             type="checkbox"
//             checked={unlocked}
//             onChange={() => setUnlocked(!unlocked)}
//             className="opacity-0 absolute w-0 h-0 hidden"
//         />
//         {/* Background track */}
//         <div
//             className={`absolute inset-0 rounded-full transition-colors duration-300 ${
//                 unlocked ? "bg-teal-500" : "bg-gray-300"
//             }`}
//         />
//         {/* Sliding button */}
//         <div
//             className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"
//             style={{
//                 transform: unlocked ? 'translateX(24px)' : 'translateX(0px)'
//             }}
//         />
//     </label>

//     <span className="font-rubikMedium text-gray-700">
//         {unlocked ? "Unlocked" : "Locked"}
//     </span>
// </div>

//             <div className="w-full mx-auto mt-6">
//                 <div className="flex" style={{ gap: 20 }}>
//                     <div className="flex-1">
//                         <button
//                             className="border border-black py-2 w-full font-rubikMedium rounded-md"
//                             onClick={() => router.back()}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                     <div className="flex-1">
//                         <button
//                             className={`${pillarName && selectedIcon && description
//                                     ? "bg-weave-primary"
//                                     : "bg-gray-300"
//                                 } text-base-white py-2 w-full font-rubikMedium rounded-md`}
//                             disabled={!(pillarName && selectedIcon && description)}
//                             onClick={() => {
//                                 // handle create pillar logic here
//                             }}
//                         >
//                             Create Pillar
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddContentPillars;



// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import InputField from "@/components/elements/TextField";
// import heartIcon from "@/assets/images/gym2.png";
// import leafIcon from "@/assets/images/Icon1.png";
// import appleIcon from "@/assets/images/task-list1.png";
// import brainIcon from "@/assets/images/brain4.png";
// import sunIcon from "@/assets/images/bib.png";
// import starIcon from "@/assets/images/energy.png";
// import api from "@/lib/api"; // Assuming you have an API utility

// function AddContentPillars() {
//     const [pillarName, setPillarName] = useState("");
//     const [selectedIcon, setSelectedIcon] = useState("");
//     const [description, setDescription] = useState("");
//     const [unlocked, setUnlocked] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const router = useRouter();

//     // List of icons to select from
//     const icons = [
//         { name: "heart", src: heartIcon },
//         { name: "leaf", src: leafIcon },
//         { name: "apple", src: appleIcon },
//         { name: "brain", src: brainIcon },
//         { name: "sun", src: sunIcon },
//         { name: "star", src: starIcon },
//     ];

//     const handleCreatePillar = async () => {
//         // Validation
//         if (!pillarName.trim()) {
//             setError("Pillar name is required");
//             return;
//         }
//         if (!selectedIcon) {
//             setError("Please select an icon");
//             return;
//         }
//         if (!description.trim()) {
//             setError("Description is required");
//             return;
//         }

//         setLoading(true);
//         setError("");

//         try {
//             // Prepare data according to API specification
//             const data = {
//                 name: pillarName.trim(),
//                 icon: selectedIcon,
//                 description: description.trim(),
//                 locked: !unlocked // Note: API uses 'locked', UI uses 'unlocked'
//             };

//             // Make API call
//             const response = await api.post("/api/pillars", data);
            
//             console.log("Pillar created successfully:", response.data);
            
//             // Optional: Show success message
//             // You can use a toast notification here
            
//             // Navigate back or close modal
//             router.back();
            
//         } catch (err) {
//             console.error("Error creating pillar:", err);
            
//             // Handle different error types
//             if (err.response?.data?.message) {
//                 setError(err.response.data.message);
//             } else if (err.response?.status === 400) {
//                 setError("Invalid data provided. Please check your inputs.");
//             } else if (err.response?.status === 409) {
//                 setError("A pillar with this name already exists.");
//             } else {
//                 setError("Failed to create pillar. Please try again.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Clear error when user starts typing
//     useEffect(() => {
//         if (error) {
//             setError("");
//         }
//     }, [pillarName, selectedIcon, description, unlocked]);

//     return (
//         <div>
//             <h5 className="font-rubikBold text-2xl">Add Pillars</h5>
            
//             {/* Error Message */}
//             {error && (
//                 <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                     <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//             )}

//             <div>
//                 <InputField
//                     label={"Name"}
//                     value={pillarName}
//                     setValue={setPillarName}
//                     required={true}
//                     disabled={loading}
//                 />
//             </div>

//             {/* Select Icon */}
//             <div className="mt-4">
//                 <label className="block font-rubikMedium mb-2">
//                     Select icon <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-3 flex-wrap">
//                     {icons.map((icon) => (
//                         <button
//                             type="button"
//                             key={icon.name}
//                             className={`
//                                 relative rounded-full p-3 border-2 transition-all duration-200 
//                                 hover:scale-105 hover:shadow-md
//                                 ${selectedIcon === icon.name
//                                     ? "border-weave-primary bg-weave-primary/10 shadow-lg ring-2 ring-weave-primary/20"
//                                     : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
//                                 }
//                                 ${loading ? "opacity-50 cursor-not-allowed" : ""}
//                             `}
//                             onClick={() => !loading && setSelectedIcon(icon.name)}
//                             aria-label={`Select ${icon.name} icon`}
//                             disabled={loading}
//                         >
//                             <Image
//                                 src={icon.src}
//                                 alt={icon.name}
//                                 width={32}
//                                 height={32}
//                                 className="object-contain"
//                             />
//                             {/* Selection indicator */}
//                             {selectedIcon === icon.name && (
//                                 <div className="absolute -top-1 -right-1 w-5 h-5 bg-weave-primary rounded-full flex items-center justify-center">
//                                     <svg 
//                                         className="w-3 h-3 text-white" 
//                                         fill="currentColor" 
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path 
//                                             fillRule="evenodd" 
//                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
//                                             clipRule="evenodd" 
//                                         />
//                                     </svg>
//                                 </div>
//                             )}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Description */}
//             <div className="mt-4">
//                 <label className="block font-rubikMedium mb-2">
//                     Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                     className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     placeholder="Enter short description of the pillar"
//                     value={description}
//                     onChange={(e) => {
//                         if (e.target.value.length <= 45) setDescription(e.target.value);
//                     }}
//                     rows={2}
//                     maxLength={45}
//                     required
//                     disabled={loading}
//                 />
//                 <div className="text-right text-xs text-gray-400 mt-1">
//                     {description.length}/45 Characters
//                 </div>
//             </div>

//             {/* Toggle Switch */}
//             <div className="mt-4 flex items-center gap-3">
//                 <label className="relative inline-block w-10 h-4 cursor-pointer">
//                     <input
//                         type="checkbox"
//                         checked={unlocked}
//                         onChange={() => !loading && setUnlocked(!unlocked)}
//                         className="opacity-0 absolute w-0 h-0 hidden"
//                         disabled={loading}
//                     />
//                     {/* Background track */}
//                     <div
//                         className={`absolute inset-0 rounded-full transition-colors duration-300 ${
//                             unlocked ? "bg-teal-500" : "bg-gray-300"
//                         } ${loading ? "opacity-50" : ""}`}
//                     />
//                     {/* Sliding button */}
//                     <div
//                         className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"
//                         style={{
//                             transform: unlocked ? 'translateX(24px)' : 'translateX(0px)'
//                         }}
//                     />
//                 </label>

//                 <span className={`font-rubikMedium text-gray-700 ${loading ? "opacity-50" : ""}`}>
//                     {unlocked ? "Unlocked" : "Locked"}
//                 </span>
//             </div>

//             <div className="w-full mx-auto mt-6">
//                 <div className="flex" style={{ gap: 20 }}>
//                     <div className="flex-1">
//                         <button
//                             className={`border border-black py-2 w-full font-rubikMedium rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//                             onClick={() => router.back()}
//                             disabled={loading}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                     <div className="flex-1">
//                         <button
//                             className={`${
//                                 pillarName && selectedIcon && description && !loading
//                                     ? "bg-weave-primary hover:bg-weave-primary/90"
//                                     : "bg-gray-300 cursor-not-allowed"
//                             } text-base-white py-2 w-full font-rubikMedium rounded-md transition-colors flex items-center justify-center`}
//                             disabled={!(pillarName && selectedIcon && description) || loading}
//                             onClick={handleCreatePillar}
//                         >
//                             {loading ? (
//                                 <>
//                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Creating...
//                                 </>
//                             ) : (
//                                 "Create Pillar"
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddContentPillars;

/// old version

// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import InputField from "@/components/elements/TextField";
// import heartIcon from "@/assets/images/gym2.png";
// import leafIcon from "@/assets/images/Icon1.png";
// import appleIcon from "@/assets/images/task-list1.png";
// import brainIcon from "@/assets/images/brain4.png";
// import sunIcon from "@/assets/images/bib.png";
// import starIcon from "@/assets/images/energy.png";

// import mindIcon from "@/assets/svg/mind-body.svg";
// import movementIcon from "@/assets/svg/movement.svg";
// import nutritionIcon from "@/assets/svg/nutrition.svg";
// import sleepIcon from "@/assets/svg/sleep.svg";

// import api from "@/lib/api"; 
// import { useToastContext } from "@/contexts/toast";

// function AddContentPillars() {
//     const [pillarName, setPillarName] = useState("");
//     const [selectedIcon, setSelectedIcon] = useState(null); // Changed to store file object
//     const [selectedIconName, setSelectedIconName] = useState(""); // For UI display
//     const [description, setDescription] = useState("");
//     const [unlocked, setUnlocked] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const router = useRouter();
//     const { showMessage } = useToastContext();

//     // List of icons to select from
//     const icons = [
//         { name: "heart", src: heartIcon },
//         { name: "leaf", src: leafIcon },
//         { name: "apple", src: appleIcon },
//         { name: "brain", src: brainIcon },
//         { name: "sun", src: sunIcon },
//         { name: "star", src: starIcon },
//         { name: "mind", scr: mindIcon},
//         { name: "movement", scr: movementIcon},
//         { name: "sleep", scr: sleepIcon},
//         { name: "nutrition", scr: nutritionIcon},

//     ];

//     // Function to convert image import to File object
//     const convertImageToFile = async (imageSrc, filename) => {
//         try {
//             const response = await fetch(imageSrc.src || imageSrc);
//             const blob = await response.blob();
//             return new File([blob], filename, { type: blob.type });
//         } catch (error) {
//             console.error("Error converting image to file:", error);
//             return null;
//         }
//     };

//     const handleIconSelect = async (icon) => {
//         if (loading) return;
        
//         try {
//             const file = await convertImageToFile(icon.src, `${icon.name}-icon.png`);
//             if (file) {
//                 setSelectedIcon(file);
//                 setSelectedIconName(icon.name);
//             } else {
//                 setError("Failed to process selected icon");
//             }
//         } catch (error) {
//             console.error("Error selecting icon:", error);
//             setError("Failed to select icon");
//         }
//     };

//     const handleCreatePillar = async () => {
//         // Validation
//         if (!pillarName.trim()) {
//             setError("Pillar name is required");
//             return;
//         }
//         if (!selectedIcon) {
//             setError("Please select an icon");
//             return;
//         }
//         if (!description.trim()) {
//             setError("Description is required");
//             return;
//         }

//         setLoading(true);
//         setError("");

//         try {
//             // Create FormData for file upload
//             const formData = new FormData();
//             formData.append("name", pillarName.trim());
//             formData.append("icon", selectedIcon); // Append the file
//             formData.append("description", description.trim());
//             formData.append("locked", !unlocked); // Note: API uses 'locked', UI uses 'unlocked'

//             // Make API call with FormData
//             const response = await api.post("/pillars", formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
            
//             console.log("Pillar created successfully:", response.data);
            
//             // Show success toast
//             showMessage("Pillar created successfully!", "", "success");
            
//             // Navigate back and trigger reload
//             router.push("/contentsManagement?refresh=" + Date.now());
            
//         } catch (err) {
//             console.error("Error creating pillar:", err);
            
//             // Handle different error types
//             if (err.response?.data?.message) {
//                 setError(err.response.data.message);
//                 showMessage(err.response.data.message, "", "error");
//             } else if (err.response?.status === 400) {
//                 setError("Invalid data provided. Please check your inputs.");
//                 showMessage("Invalid data provided. Please check your inputs.", "", "error");
//             } else if (err.response?.status === 409) {
//                 setError("A pillar with this name already exists.");
//                 showMessage("A pillar with this name already exists.", "", "error");
//             } else {
//                 setError("Failed to create pillar. Please try again.");
//                 showMessage("Failed to create pillar. Please try again.", "", "error");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Clear error when user starts typing
//     useEffect(() => {
//         if (error) {
//             setError("");
//         }
//     }, [pillarName, selectedIconName, description, unlocked]);

//     return (
//         <div>
//             <h5 className="font-rubikBold text-2xl">Add Pillars</h5>
            
//             {/* Error Message */}
//             {error && (
//                 <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                     <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//             )}

//             <div>
//                 <InputField
//                     label={"Name"}
//                     value={pillarName}
//                     setValue={setPillarName}
//                     required={true}
//                     disabled={loading}
//                 />
//             </div>

//             {/* Select Icon */}
//             <div className="mt-4">
//                 <label className="block font-rubikMedium mb-2">
//                     Select icon <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-3 flex-wrap">
//                     {icons.map((icon) => (
//                         <button
//                             type="button"
//                             key={icon.name}
//                             className={`
//                                 relative rounded-full p-3 border-2 transition-all duration-200 
//                                 hover:scale-105 hover:shadow-md
//                                 ${selectedIconName === icon.name
//                                     ? "border-weave-primary bg-weave-primary/10 shadow-lg ring-2 ring-weave-primary/20"
//                                     : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
//                                 }
//                                 ${loading ? "opacity-50 cursor-not-allowed" : ""}
//                             `}
//                             onClick={() => handleIconSelect(icon)}
//                             aria-label={`Select ${icon.name} icon`}
//                             disabled={loading}
//                         >
//                             <Image
//                                 src={icon.src}
//                                 alt={icon.name}
//                                 width={32}
//                                 height={32}
//                                 className="object-contain"
//                             />
//                             {/* Selection indicator */}
//                             {selectedIconName === icon.name && (
//                                 <div className="absolute -top-1 -right-1 w-5 h-5 bg-weave-primary rounded-full flex items-center justify-center">
//                                     <svg 
//                                         className="w-3 h-3 text-white" 
//                                         fill="currentColor" 
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path 
//                                             fillRule="evenodd" 
//                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
//                                             clipRule="evenodd" 
//                                         />
//                                     </svg>
//                                 </div>
//                             )}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Description */}
//             <div className="mt-4">
//                 <label className="block font-rubikMedium mb-2">
//                     Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                     className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     placeholder="Enter short description of the pillar"
//                     value={description}
//                     onChange={(e) => {
//                         if (e.target.value.length <= 45) setDescription(e.target.value);
//                     }}
//                     rows={2}
//                     maxLength={45}
//                     required
//                     disabled={loading}
//                 />
//                 <div className="text-right text-xs text-gray-400 mt-1">
//                     {description.length}/45 Characters
//                 </div>
//             </div>

//             {/* Toggle Switch */}
//             <div className="mt-4 flex items-center gap-3">
//                 <label className="relative inline-block w-10 h-4 cursor-pointer">
//                     <input
//                         type="checkbox"
//                         checked={unlocked}
//                         onChange={() => !loading && setUnlocked(!unlocked)}
//                         className="opacity-0 absolute w-0 h-0 hidden"
//                         disabled={loading}
//                     />
//                     {/* Background track */}
//                     <div
//                         className={`absolute inset-0 rounded-full transition-colors duration-300 ${
//                             unlocked ? "bg-teal-500" : "bg-gray-300"
//                         } ${loading ? "opacity-50" : ""}`}
//                     />
//                     {/* Sliding button */}
//                     <div
//                         className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"
//                         style={{
//                             transform: unlocked ? 'translateX(24px)' : 'translateX(0px)'
//                         }}
//                     />
//                 </label>

//                 <span className={`font-rubikMedium text-gray-700 ${loading ? "opacity-50" : ""}`}>
//                     {unlocked ? "Unlocked" : "Locked"}
//                 </span>
//             </div>

//             <div className="w-full mx-auto mt-6">
//                 <div className="flex" style={{ gap: 20 }}>
//                     <div className="flex-1">
//                         <button
//                             className={`border border-black py-2 w-full font-rubikMedium rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//                             onClick={() => router.back()}
//                             disabled={loading}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                     <div className="flex-1">
//                         <button
//                             className={`${
//                                 pillarName && selectedIcon && description && !loading
//                                     ? "bg-weave-primary hover:bg-weave-primary/90"
//                                     : "bg-gray-300 cursor-not-allowed"
//                             } text-base-white py-2 w-full font-rubikMedium rounded-md transition-colors flex items-center justify-center`}
//                             disabled={!(pillarName && selectedIcon && description) || loading}
//                             onClick={handleCreatePillar}
//                         >
//                             {loading ? (
//                                 <>
//                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Creating...
//                                 </>
//                             ) : (
//                                 "Create Pillar"
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddContentPillars;



"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import InputField from "@/components/elements/TextField";
import heartIcon from "@/assets/images/gym2.png";
import leafIcon from "@/assets/images/Icon1.png";
import appleIcon from "@/assets/images/task-list1.png";
import brainIcon from "@/assets/images/brain4.png";
import sunIcon from "@/assets/images/bib.png";
import starIcon from "@/assets/images/energy.png";
// Import SVGs differently - you might need to adjust based on your setup
import mindIcon from "@/assets/svg/mind-body.svg";
import movementIcon from "@/assets/svg/movement.svg";
import nutritionIcon from "@/assets/svg/nutrition.svg";
import sleepIcon from "@/assets/svg/sleep.svg";

import api from "@/lib/api"; 
import { useToastContext } from "@/contexts/toast";

function AddContentPillars() {
    const [pillarName, setPillarName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedIconName, setSelectedIconName] = useState("");
    const [description, setDescription] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { showMessage } = useToastContext();

    // Fixed icons array - corrected 'scr' to 'src' and added validation
    const icons = [
        { name: "heart", src: heartIcon },
        { name: "leaf", src: leafIcon },
        { name: "apple", src: appleIcon },
        { name: "brain", src: brainIcon },
        { name: "sun", src: sunIcon },
        { name: "star", src: starIcon },
        { name: "mind", src: mindIcon },
        { name: "movement", src: movementIcon },
        { name: "sleep", src: sleepIcon },
        { name: "nutrition", src: nutritionIcon },
    ].filter(icon => icon.src); // Filter out any icons with empty/undefined src

    // Function to convert image import to File object
    const convertImageToFile = async (imageSrc, filename) => {
        try {
            // Handle different types of imports
            const srcUrl = typeof imageSrc === 'string' ? imageSrc : imageSrc.src || imageSrc.default;
            
            if (!srcUrl) {
                throw new Error('Invalid image source');
            }

            const response = await fetch(srcUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.status}`);
            }
            
            const blob = await response.blob();
            return new File([blob], filename, { type: blob.type || 'image/png' });
        } catch (error) {
            console.error("Error converting image to file:", error);
            return null;
        }
    };

    const handleIconSelect = async (icon) => {
        if (loading) return;
        
        try {
            const file = await convertImageToFile(icon.src, `${icon.name}-icon.png`);
            if (file) {
                setSelectedIcon(file);
                setSelectedIconName(icon.name);
            } else {
                setError("Failed to process selected icon");
            }
        } catch (error) {
            console.error("Error selecting icon:", error);
            setError("Failed to select icon");
        }
    };

    const handleCreatePillar = async () => {
        // Validation
        if (!pillarName.trim()) {
            setError("Pillar name is required");
            return;
        }
        if (!selectedIcon) {
            setError("Please select an icon");
            return;
        }
        if (!description.trim()) {
            setError("Description is required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append("name", pillarName.trim());
            formData.append("icon", selectedIcon);
            formData.append("description", description.trim());
            formData.append("locked", !unlocked);

            // Make API call with FormData
            const response = await api.post("/pillars", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            console.log("Pillar created successfully:", response.data);
            
            // Show success toast
            showMessage("Pillar created successfully!", "", "success");
            
            // Navigate back and trigger reload
            router.push("/contentsManagement?refresh=" + Date.now());
            
        } catch (err) {
            console.error("Error creating pillar:", err);
            
            // Handle different error types
            if (err.response?.data?.message) {
                setError(err.response.data.message);
                showMessage(err.response.data.message, "", "error");
            } else if (err.response?.status === 400) {
                setError("Invalid data provided. Please check your inputs.");
                showMessage("Invalid data provided. Please check your inputs.", "", "error");
            } else if (err.response?.status === 409) {
                setError("A pillar with this name already exists.");
                showMessage("A pillar with this name already exists.", "", "error");
            } else {
                setError("Failed to create pillar. Please try again.");
                showMessage("Failed to create pillar. Please try again.", "", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    // Clear error when user starts typing
    useEffect(() => {
        if (error) {
            setError("");
        }
    }, [pillarName, selectedIconName, description, unlocked]);

    // Helper function to get image src safely
    const getImageSrc = (iconSrc) => {
        if (typeof iconSrc === 'string') return iconSrc;
        return iconSrc?.src || iconSrc?.default || '';
    };

    return (
        <div>
            <h5 className="font-rubikBold text-2xl">Add Pillars</h5>
            
            {/* Error Message */}
            {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            <div>
                <InputField
                    label={"Name"}
                    value={pillarName}
                    setValue={setPillarName}
                    required={true}
                    disabled={loading}
                />
            </div>

            {/* Select Icon */}
            <div className="mt-4">
                <label className="block font-rubikMedium mb-2">
                    Select icon <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3 flex-wrap">
                    {icons.map((icon) => {
                        const imageSrc = getImageSrc(icon.src);
                        
                        // Skip rendering if no valid src
                        if (!imageSrc) {
                            console.warn(`Skipping icon ${icon.name} - no valid src`);
                            return null;
                        }

                        return (
                            <button
                                type="button"
                                key={icon.name}
                                className={`
                                    relative rounded-full p-3 border-2 transition-all duration-200 
                                    hover:scale-105 hover:shadow-md
                                    ${selectedIconName === icon.name
                                        ? "border-weave-primary bg-weave-primary/10 shadow-lg ring-2 ring-weave-primary/20"
                                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                                    }
                                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                                `}
                                onClick={() => handleIconSelect(icon)}
                                aria-label={`Select ${icon.name} icon`}
                                disabled={loading}
                            >
                                <Image
                                    src={imageSrc}
                                    alt={icon.name}
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                    onError={() => console.error(`Failed to load icon: ${icon.name}`)}
                                />
                                {/* Selection indicator */}
                                {selectedIconName === icon.name && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-weave-primary rounded-full flex items-center justify-center">
                                        <svg 
                                            className="w-3 h-3 text-white" 
                                            fill="currentColor" 
                                            viewBox="0 0 20 20"
                                        >
                                            <path 
                                                fillRule="evenodd" 
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                                clipRule="evenodd" 
                                            />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Description */}
            <div className="mt-4">
                <label className="block font-rubikMedium mb-2">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Enter short description of the pillar"
                    value={description}
                    onChange={(e) => {
                        if (e.target.value.length <= 45) setDescription(e.target.value);
                    }}
                    rows={2}
                    maxLength={45}
                    required
                    disabled={loading}
                />
                <div className="text-right text-xs text-gray-400 mt-1">
                    {description.length}/45 Characters
                </div>
            </div>

            {/* Toggle Switch */}
            <div className="mt-4 flex items-center gap-3">
                <label className="relative inline-block w-10 h-4 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={unlocked}
                        onChange={() => !loading && setUnlocked(!unlocked)}
                        className="opacity-0 absolute w-0 h-0 hidden"
                        disabled={loading}
                    />
                    {/* Background track */}
                    <div
                        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                            unlocked ? "bg-teal-500" : "bg-gray-300"
                        } ${loading ? "opacity-50" : ""}`}
                    />
                    {/* Sliding button */}
                    <div
                        className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"
                        style={{
                            transform: unlocked ? 'translateX(24px)' : 'translateX(0px)'
                        }}
                    />
                </label>

                <span className={`font-rubikMedium text-gray-700 ${loading ? "opacity-50" : ""}`}>
                    {unlocked ? "Unlocked" : "Locked"}
                </span>
            </div>

            <div className="w-full mx-auto mt-6">
                <div className="flex" style={{ gap: 20 }}>
                    <div className="flex-1">
                        <button
                            className={`border border-black py-2 w-full font-rubikMedium rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => router.back()}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            className={`${
                                pillarName && selectedIcon && description && !loading
                                    ? "bg-weave-primary hover:bg-weave-primary/90"
                                    : "bg-gray-300 cursor-not-allowed"
                            } text-base-white py-2 w-full font-rubikMedium rounded-md transition-colors flex items-center justify-center`}
                            disabled={!(pillarName && selectedIcon && description) || loading}
                            onClick={handleCreatePillar}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                "Create Pillar"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddContentPillars;