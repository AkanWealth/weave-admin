// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import InputField from "@/components/elements/TextField";
// import { CloudUpload, X } from "lucide-react";

// function EditTip() {
//     const [sponsorName, setSponsorName] = useState('');
//     const [logoFile, setLogoFile] = useState('');
//     const [status, setStatus] = useState('');
//     const [duration, setDuration] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [quoteText, setQuoteText] = useState('');
//     const [displayDate, setDisplayDate] = useState('');
//     const router = useRouter();


//     const isFormValid = () => {
//         return quoteText && displayDate;
//     };

//     const handleSubmit = () => {
//         if (isFormValid()) {
//             console.log({
//                 sponsorName,
//                 logoFile,
//                 status,
//                 duration,
//                 startDate,
//                 endDate,
//                 quoteText,
//                 displayDate
//             });
//             // Handle form submission logic here
//             router.push("/success");
//         }
//     };

//     const handleSaveAsDraft = () => {
//         console.log("Saving as draft:", {
//             sponsorName,
//             logoFile,
//             status,
//             duration,
//             startDate,
//             endDate,
//             quoteText,
//             displayDate
//         });
//         // Handle save as draft logic here
//     };

//     return (
//         <div className="mx-auto">
//             <div className="flex items-center justify-between mb-6">
//                 <h5 className="text-2xl font-rubikBold">Edit Motivational Quotes</h5>
//             </div>

//             <div className="flex flex-col space-y-4">
//                 {/* Quote Text */}
//                 <div>
//                     <label className="block font-rubikMedium mb-2">Quote Text</label>
//                     <textarea
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
//                         placeholder="Enter your motivational quote..."
//                         value={quoteText}
//                         onChange={(e) => setQuoteText(e.target.value)}
//                         rows={4}
//                     />
//                 </div>

//                 {/* Display Date */}
//                 <div>
//                     <label className="block font-rubikMedium mb-2">Display Date</label>
//                     <input
//                         type="date"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
//                         value={displayDate}
//                         onChange={(e) => setDisplayDate(e.target.value)}
//                     />
//                     <span className="text-gray-500 text-sm mt-1 block">
//                         The date when this content will be displayed to users
//                     </span>
//                 </div>

//                 {/* Preview Section */}
//                 <div className="bg-yellow-200 rounded-lg p-4 border border-blue-100">
//                     <label className="block font-rubikMedium mb-2">Preview</label>
//                     <div className="rounded-lg p-4 ">
//                         <div className="bg-blue-200 rounded-lg">
//                             <div className="flex items-center justify-between mb-3">
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#28A745] text-white">
//                                     Published
//                                 </span>
                    
//                             </div>

//                             <p className="text-gray-900 text-base leading-relaxed mb-4">
//                                 "{quoteText || 'Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.'}"
//                             </p>

                           
//                         </div>

                        
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 mt-8">
//                     <button
//                         className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-rubikMedium rounded-lg hover:bg-gray-50 transition-colors"
//                         onClick={handleSaveAsDraft}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className={`flex-1 py-3 px-4 font-rubikMedium rounded-lg transition-colors ${isFormValid()
//                             ? "bg-weave-primary text-white hover:bg-weave-primary/90"
//                             : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                             }`}
//                         onClick={handleSubmit}
//                         disabled={!isFormValid()}
//                     >
//                         Save Quote
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EditTip;

"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import api from "@/lib/api"; // Assuming API client is configured

function EditTip() {
    const [sponsorName, setSponsorName] = useState('');
    const [logoFile, setLogoFile] = useState('');
    const [status, setStatus] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [quoteText, setQuoteText] = useState('');
    const [displayDate, setDisplayDate] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const resourceId = searchParams.get('resource_id');
    const contentType = searchParams.get('contentType');

    useEffect(() => {
        const fetchResource = async () => {
            if (resourceId && contentType) {
                try {
                    const endpoint = contentType === 'quote' ? `/api/quotes/${resourceId}` : `/api/tips/${resourceId}`;
                    const response = await api.get(endpoint);
                    const data = response.data;
                    setSponsorName(data.sponsorName || '');
                    setLogoFile(data.logoFile || '');
                    setStatus(data.status || '');
                    setDuration(data.duration || '');
                    setStartDate(data.startDate || '');
                    setEndDate(data.endDate || '');
                    setQuoteText(data.title || '');
                    setDisplayDate(data.created_at || '');
                } catch (error) {
                    console.error(`Error fetching ${contentType}:`, error);
                    // Handle error (e.g., show error message to user)
                }
            }
        };

        fetchResource();
    }, [resourceId, contentType]);

    const isFormValid = () => {
        return quoteText && displayDate;
    };

    const handleSubmit = async () => {
        if (isFormValid()) {
            try {
                const payload = {
                    title: quoteText,
                    created_at: displayDate,
                    status: status || 'draft',
                    type: contentType,
                    sponsorName,
                    logoFile,
                    duration,
                    startDate,
                    endDate
                };
                const endpoint = contentType === 'quote' ? `/api/quotes/${resourceId}` : `/api/tips/${resourceId}`;
                await api.put(endpoint, payload);
                router.push("/success");
            } catch (error) {
                console.error(`Error updating ${contentType}:`, error);
                // Handle error (e.g., show error message to user)
            }
        }
    };

    const handleSaveAsDraft = async () => {
        try {
            const payload = {
                title: quoteText,
                created_at: displayDate,
                status: 'draft',
                type: contentType,
                sponsorName,
                logoFile,
                duration,
                startDate,
                endDate
            };
            const endpoint = contentType === 'quote' ? `/api/quotes/${resourceId}` : `/api/tips/${resourceId}`;
            await api.put(endpoint, payload);
            // Handle success (e.g., show success message or redirect)
        } catch (error) {
            console.error(`Error saving ${contentType} as draft:`, error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-2xl font-rubikBold">
                    Edit {contentType === 'quote' ? 'Motivational Quote' : 'Daily Tip'}
                </h5>
            </div>

            <div className="flex flex-col space-y-4">
                {/* Text Input */}
                <div>
                    <label className="block font-rubikMedium mb-2">
                        {contentType === 'quote' ? 'Quote Text' : 'Tip Text'}
                    </label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                        placeholder={`Enter your ${contentType === 'quote' ? 'motivational quote' : 'daily tip'}...`}
                        value={quoteText}
                        onChange={(e) => setQuoteText(e.target.value)}
                        rows={4}
                    />
                </div>

                {/* Display Date */}
                <div>
                    <label className="block font-rubikMedium mb-2">Display Date</label>
                    <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                        value={displayDate}
                        onChange={(e) => setDisplayDate(e.target.value)}
                    />
                    <span className="text-gray-500 text-sm mt-1 block">
                        The date when this content will be displayed to users
                    </span>
                </div>

                {/* Preview Section */}
                <div className="bg-yellow-200 rounded-lg p-4 border border-blue-100">
                    <label className="block font-rubikMedium mb-2">Preview</label>
                    <div className="rounded-lg p-4">
                        <div className="bg-blue-200 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#28A745] text-white">
                                    {status || 'Published'}
                                </span>
                            </div>
                            <p className="text-gray-900 text-base leading-relaxed mb-4">
                                "{quoteText || 'Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.'}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                    <button
                        className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-rubikMedium rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={handleSaveAsDraft}
                    >
                        Save as Draft
                    </button>
                    <button
                        className={`flex-1 py-3 px-4 font-rubikMedium rounded-lg transition-colors ${isFormValid()
                            ? "bg-weave-primary text-white hover:bg-weave-primary/90"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                    >
                        Save {contentType === 'quote' ? 'Quote' : 'Tip'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTip;

