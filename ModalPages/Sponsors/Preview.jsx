"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import InputField from "@/components/elements/TextField";
import { CloudUpload, X } from "lucide-react";

function PreviewSponsor() {
    const [sponsorName, setSponsorName] = useState('');
    const [logoFile, setLogoFile] = useState('');
    const [status, setStatus] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
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
        return sponsorName && logoFile && status && duration && startDate && endDate;
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            console.log({
                sponsorName,
                logoFile,
                status,
                duration,
                startDate,
                endDate
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
            endDate
        });
        // Handle save as draft logic here
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-rubikBold">Preview Sponsor</h5>
            </div>

            <div className="flex flex-col space-y-4">
                {/* Sponsor Name */}
                <div>
                    <InputField
                        label="Sponsor Name"
                        placeholder="Enter sponsor name"
                        value={sponsorName}
                        setValue={setSponsorName}
                    />
                </div>

                {/* Upload Logo */}
                <div>
                    <label className="font-rubikMedium">
                        Upload Logo 
                    </label>
                    <div className="mt-2">
                        <input
                            type="file"
                            id="logo-file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => setLogoFile(e.target.files[0])}
                        />
                        <label
                            htmlFor="logo-file"
                            className="rounded-lg flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed border-gray-300 p-8 hover:border-weave-primary transition-colors"
                            style={{
                                padding: "1.5rem",
                                border: "2px dashed #777",
                                margin: "8px 0",
                            }}
                        >
                            {logoFile?.name ? (
                                <div className="flex items-center justify-center">
                                    <span className="text-weave-primary">{logoFile.name}</span>
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setLogoFile(null);
                                        }}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-center rounded-full bg-gray-200 w-16 h-16 mb-4">
                                        <CloudUpload className="text-gray-600 w-8 h-8" />
                                    </div>
                                    <span className="font-medium text-gray-700">Drag and drop image</span>
                                    <span className="text-gray-500 text-sm">PNG, JPEG, JPG</span>
                                    <span className="mt-3">
                                        <span className="inline-block px-4 py-2 text-sm text-white bg-weave-primary rounded-lg">
                                            Select a file
                                        </span>
                                    </span>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="font-rubikMedium">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                        >
                            <option value="">Select status</option>
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="font-rubikMedium">
                            Duration 
                        </label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                        >
                            <option value="">Select duration</option>
                            {durations.map((dur) => (
                                <option key={dur.value} value={dur.value}>
                                    {dur.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="font-rubikMedium">
                            Start Date 
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="font-rubikMedium">
                            End Date 
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                
            </div>
        </div>
    );
}

export default PreviewSponsor;