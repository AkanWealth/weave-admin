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
import api from "@/lib/api";
import { useToastContext } from "@/contexts/toast";


function EditTip() {
    const [quoteText, setQuoteText] = useState('');
    const [displayDate, setDisplayDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { showMessage } = useToastContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const resourceId = searchParams.get('resource_id');
    const contentType = searchParams.get('contentType');

    useEffect(() => {
        const fetchResource = async () => {
            if (resourceId && contentType) {
                try {
                    setLoading(true);
                    const endpoint = contentType === 'quote' ? `/api/quotes/${resourceId}` : `/api/tips/${resourceId}`;
                    const response = await api.get(endpoint);
                    const data = response.data;

                    // Map API response fields
                    setQuoteText(data.text || '');
                    setDisplayDate(data.displayDate || '');
                    setError('');
                } catch (error) {
                    console.error(`Error fetching ${contentType}:`, error);
                    setError(`Failed to load ${contentType}. Please try again.`);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchResource();
    }, [resourceId, contentType]);

    const isFormValid = () => {
        return quoteText.trim() && displayDate;
    };

    const handleSubmit = async () => {
        if (isFormValid()) {
            try {
                setLoading(true);
                const payload = {
                    text: quoteText,
                    displayDate: displayDate
                };

                const endpoint = contentType === 'quote' ? `/api/quotes/${resourceId}` : `/api/tips/${resourceId}`;
                await api.put(endpoint, payload);
                showMessage("Successful", ` ${contentType} updated sucessfully`, "success");

                setTimeout(() => {
                    router.push("/contentsManagement?refresh=" + Date.now());
                }, 100);
            } catch (error) {
                console.error(`Error updating ${contentType}:`, error);
                showMessage("Error", `Error updating ${contentType}:`, "error");
                setError(`Failed to update ${contentType}. Please try again.`);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSaveAsDraft = async () => {
        try {
            setLoading(true);
            const payload = {
                text: quoteText,
                displayDate: displayDate,
                status: 'draft' // If your API supports status
            };

            const endpoint = contentType === 'quote' ? `/api/quotes/${resourceId}` : `/api/tips/${resourceId}`;
            await api.put(endpoint, payload);

            setError('');
            showMessage("Successful", ` ${contentType} updated sucessfully`, "success");
            setTimeout(() => {
                router.push("/contentsManagement?refresh=" + Date.now());
            }, 100);
        } catch (error) {
            console.error(`Error saving ${contentType} as draft:`, error);
            showMessage("Error", `Error updating ${contentType}:`, "error");

            setError(`Failed to save ${contentType} as draft. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !quoteText) {
        return (
            <div className="mx-auto">
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-weave-primary"></div>
                    <span className="ml-2">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-2xl font-rubikBold">
                    Edit {contentType === 'quote' ? 'Motivational Quote' : 'Daily Tip'}
                </h5>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

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
                        disabled={loading}
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
                        disabled={loading}
                    />
                    <span className="text-gray-500 text-sm mt-1 block">
                        The date when this content will be displayed to users
                    </span>
                </div>

                {/* Preview Section */}
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <label className="block font-rubikMedium mb-2">Preview</label>
                    <div className="bg-white rounded-lg p-4 border">
                        <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#28A745] text-white">
                                Published
                            </span>
                            <span className="text-sm text-gray-500">
                                Display: {displayDate ? new Date(displayDate).toLocaleDateString() : 'No date selected'}
                            </span>
                        </div>
                        <p className="text-gray-900 text-base leading-relaxed mb-4">
                            {quoteText || `Your ${contentType === 'quote' ? 'quote' : 'tip'} will appear here...`}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                    <button
                        className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-rubikMedium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        onClick={handleSaveAsDraft}
                        disabled={loading || !quoteText.trim()}
                    >
                        {loading ? 'Saving...' : 'Save as Draft'}
                    </button>
                    <button
                        className={`flex-1 py-3 px-4 font-rubikMedium rounded-lg transition-colors ${isFormValid() && !loading
                                ? "bg-weave-primary text-white hover:bg-weave-primary/90"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        onClick={handleSubmit}
                        disabled={!isFormValid() || loading}
                    >
                        {loading ? 'Saving...' : `Save ${contentType === 'quote' ? 'Quote' : 'Tip'}`}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTip;