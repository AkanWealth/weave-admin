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

// function EditContentPillars() {
//     // Set your default values here
//     const [contentType, setContentType] = useState("");
//     const [pillarName, setPillarName] = useState("Mind/Body Wellness");
//     const [selectedIcon, setSelectedIcon] = useState("brain");
//     const [description, setDescription] = useState("Mind-body wellness practices");
//     const [unlocked, setUnlocked] = useState(true);
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
//     <label className="relative inline-block w-12 h-6">
//         <input
//             type="checkbox"
//             checked={unlocked}
//             onChange={() => setUnlocked(!unlocked)}
//             className="opacity-0 w-0 h-0 peer"
//         />
//         <span
//             className={`absolute cursor-pointer inset-0 rounded-full transition duration-300 ${
//                 unlocked ? "bg-teal-500" : "bg-gray-300"
//             }`}
//         ></span>
//         <span
//             className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
//                 unlocked ? "translate-x-5" : "translate-x-0"
//             }`}
//         ></span>
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

// export default EditContentPillars;


"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InputField from "@/components/elements/TextField";
import heartIcon from "@/assets/images/gym2.png";
import leafIcon from "@/assets/images/Icon1.png";
import appleIcon from "@/assets/images/task-list1.png";
import brainIcon from "@/assets/images/brain4.png";
import sunIcon from "@/assets/images/bib.png";
import starIcon from "@/assets/images/energy.png";
import api from "@/lib/api";
import { useToastContext } from "@/contexts/toast";

function EditContentPillars() {
    const [pillarName, setPillarName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const [description, setDescription] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const pillarId = searchParams.get('id');
    const { showMessage } = useToastContext();

    const icons = [
        { name: "heart", src: heartIcon },
        { name: "leaf", src: leafIcon },
        { name: "apple", src: appleIcon },
        { name: "brain", src: brainIcon },
        { name: "sun", src: sunIcon },
        { name: "star", src: starIcon },
    ];

    useEffect(() => {
        if (pillarId) {
            fetchPillar();
        }
    }, [pillarId]);

    const fetchPillar = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/api/pillars/${pillarId}`);
            const pillar = response.data;
            
            setPillarName(pillar.name || "");
            setSelectedIcon(pillar.icon || "");
            setDescription(pillar.description || "");
            setUnlocked(!pillar.locked);
            setError("");
        } catch (err) {
            console.error("Error fetching pillar:", err);
            setError("Failed to load pillar data. Please try again.");
            showMessage('Error','Failed to load pillar data',"error");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePillar = async () => {
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
            const data = {
                name: pillarName.trim(),
                icon: selectedIcon,
                description: description.trim(),
                locked: !unlocked
            };

            const response = await api.put(`/api/pillars/${pillarId}`, data);
            
            showMessage("Success", "Pillar updated successfully!", "success");

            router.push("/contentsManagement?refresh=" + Date.now());
            
        } catch (err) {
            console.error("Error updating pillar:", err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 400) {
                setError("Invalid data provided. Please check your inputs.");
            } else if (err.response?.status === 409) {
                setError("A pillar with this name already exists.");
            } else {
                setError("Failed to update pillar. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h5 className="font-rubikBold text-2xl">Edit Pillar</h5>
            
            {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="mt-4">
                    <p className="text-gray-600">Loading pillar data...</p>
                </div>
            ) : (
                <>
                    <div className="mt-4">
                        <InputField
                            label={"Name"}
                            value={pillarName}
                            setValue={setPillarName}
                            required={true}
                            disabled={loading}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block font-rubikMedium mb-2">
                            Select icon <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-3 flex-wrap">
                            {icons.map((icon) => (
                                <button
                                    type="button"
                                    key={icon.name}
                                    className={`
                                        relative rounded-full p-3 border-2 transition-all duration-200 
                                        hover:scale-105 hover:shadow-md
                                        ${selectedIcon === icon.name
                                            ? "border-weave-primary bg-weave-primary/10 shadow-lg ring-2 ring-weave-primary/20"
                                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                                        }
                                        ${loading ? "opacity-50 cursor-not-allowed" : ""}
                                    `}
                                    onClick={() => !loading && setSelectedIcon(icon.name)}
                                    aria-label={`Select ${icon.name} icon`}
                                    disabled={loading}
                                >
                                    <Image
                                        src={icon.src}
                                        alt={icon.name}
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                    {selectedIcon === icon.name && (
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
                            ))}
                        </div>
                    </div>

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

                    {/* <div className="mt-4 flex items-center gap-3">
                        <label className="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                checked={unlocked}
                                onChange={() => !loading && setUnlocked(!unlocked)}
                                className="opacity-0 w-0 h-0 peer"
                                disabled={loading}
                            />
                            <span
                                className={`absolute cursor-pointer inset-0 rounded-full transition duration-300 ${
                                    unlocked ? "bg-teal-500" : "bg-gray-300"
                                } ${loading ? "opacity-50" : ""}`}
                            ></span>
                            <span
                                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
                                    unlocked ? "translate-x-5" : "translate-x-0"
                                }`}
                            ></span>
                        </label>
                        <span className={`font-rubikMedium text-gray-700 ${loading ? "opacity-50" : ""}`}>
                            {unlocked ? "Unlocked" : "Locked"}
                        </span>
                    </div> */}

                {/* updated toggle switch */}
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
                                    onClick={handleUpdatePillar}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Pillar"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditContentPillars;