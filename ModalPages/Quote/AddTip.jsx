// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";


// function AddTip() {
//     const [sponsorName, setSponsorName] = useState('');
//     const [logoFile, setLogoFile] = useState('');
//     const [status, setStatus] = useState('');
//     const [duration, setDuration] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [quoteText, setQuoteText] = useState('');
//     const [displayDate, setDisplayDate] = useState('');
//     const router = useRouter();

//     const statusOptions = [
//         { value: 'active', label: 'Active' },
//         { value: 'draft', label: 'Draft' }
//     ];

//     const durations = [
//         { value: '1-month', label: '1 Month' },
//         { value: '3-months', label: '3 Months' },
//         { value: '6-months', label: '6 Months' },
//         { value: '1-year', label: '1 Year' }
//     ];

//     const isFormValid = () => {
//          return quoteText && displayDate;
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
//                 <h5 className="text-xl font-rubikBold">Add New Tip</h5>
//             </div>

//             <div className="flex flex-col space-y-4">
//                 {/* Quote Text */}
//                 <div>
//                     <label className="block font-rubikMedium mb-2">Text Tip </label>
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
//                                 ? "bg-weave-primary text-white hover:bg-weave-primary/90"
//                                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                             }`}
//                         onClick={handleSubmit}
//                         disabled={!isFormValid()}
//                     >
//                         Save Tip
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddTip;


"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import api from "@/lib/api"; 
import { useToastContext } from "@/contexts/toast";

function AddTip() {
    const [quoteText, setQuoteText] = useState('');
    const [displayDate, setDisplayDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { showMessage } = useToastContext();

    const isFormValid = () => {
        return quoteText.trim() && displayDate;
    };

    const handleSubmit = async () => {
        if (isFormValid()) {
            try {
                setLoading(true);
                setError('');
                
                const payload = {
                    text: quoteText,
                    displayDate: displayDate
                };
                
                await api.post("/api/tips", payload);
                showMessage("Success", "Tip created successfully", "success");
                 setTimeout(() => {
            router.push("/contentsManagement?refresh=" + Date.now());
          }, 100);
            } catch (error) {
                console.error("Error creating tip:", error);
                showMessage("Error", "Failed to create tip. Please try again.", "error");
                setError("Failed to create tip. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSaveAsDraft = async () => {
        if (!quoteText.trim()) {
            setError("Please enter tip text before saving as draft.");
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            const payload = {
                text: quoteText,
                displayDate: displayDate || new Date().toISOString().split('T')[0], // Use current date if no date selected
                status: 'draft' // If your API supports status field
            };
            
            await api.post("/api/tips", payload);
            showMessage("Draft Saved", "Tip saved as draft successfully", "success");
            setTimeout(() => {
            router.push("/contentsManagement?refresh=" + Date.now());
          }, 100);
        } catch (error) {
            console.error("Error saving tip as draft:", error);
            showMessage("Error", "Failed to save tip as draft. Please try again.", "error");
            setError("Failed to save tip as draft. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-rubikBold">Add New Tip</h5>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <div className="flex flex-col space-y-4">
                {/* Tip Text */}
                <div>
                    <label className="block font-rubikMedium mb-2">Tip Text</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                        placeholder="Enter your daily tip..."
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
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
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
                            {quoteText || 'Your daily tip will appear here...'}
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
                        className={`flex-1 py-3 px-4 font-rubikMedium rounded-lg transition-colors ${
                            isFormValid() && !loading
                                ? "bg-weave-primary text-white hover:bg-weave-primary/90"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={handleSubmit}
                        disabled={!isFormValid() || loading}
                    >
                        {loading ? 'Saving...' : 'Save Tip'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTip;