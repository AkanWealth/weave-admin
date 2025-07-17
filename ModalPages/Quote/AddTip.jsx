"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";


function AddTip() {
    const [sponsorName, setSponsorName] = useState('');
    const [logoFile, setLogoFile] = useState('');
    const [status, setStatus] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [quoteText, setQuoteText] = useState('');
    const [displayDate, setDisplayDate] = useState('');
    const router = useRouter();

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'draft', label: 'Draft' }
    ];

    const durations = [
        { value: '1-month', label: '1 Month' },
        { value: '3-months', label: '3 Months' },
        { value: '6-months', label: '6 Months' },
        { value: '1-year', label: '1 Year' }
    ];

    const isFormValid = () => {
         return quoteText && displayDate;
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            console.log({
                sponsorName,
                logoFile,
                status,
                duration,
                startDate,
                endDate,
                quoteText,
                displayDate
            });
            // Handle form submission logic here
            router.push("/success");
        }
    };

    const handleSaveAsDraft = () => {
        console.log("Saving as draft:", {
            sponsorName,
            logoFile,
            status,
            duration,
            startDate,
            endDate,
            quoteText,
            displayDate
        });
        // Handle save as draft logic here
    };

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-rubikBold">Add New Tip</h5>
            </div>

            <div className="flex flex-col space-y-4">
                {/* Quote Text */}
                <div>
                    <label className="block font-rubikMedium mb-2">Text Tip </label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                        placeholder="Enter your motivational quote..."
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

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                    <button
                        className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-rubikMedium rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={handleSaveAsDraft}
                    >
                        Cancel
                    </button>
                    <button
                        className={`flex-1 py-3 px-4 font-rubikMedium rounded-lg transition-colors ${isFormValid()
                                ? "bg-weave-primary text-white hover:bg-weave-primary/90"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                    >
                        Save Tip
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTip;