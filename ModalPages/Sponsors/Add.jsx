"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import InputField from "@/components/elements/TextField";
import { CloudUpload, X, ChevronDown } from "lucide-react";

function AddSponsor() {
    const [sponsorName, setSponsorName] = useState('');
    const [logoFile, setLogoFile] = useState('');
    const [status, setStatus] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    // Dropdown states
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
    
    const statusDropdownRef = useRef(null);
    const durationDropdownRef = useRef(null);
    
    const router = useRouter();

    const statusOptions = [
        { value: 'Bronze Tier', label: '£200 - Bronze Tier' },
        { value: 'Silver Tier', label: '£800 - Silver Tier' },
        { value: 'Gold Tier', label: '£1,500 - Gold Tier' }
    ];

    const durations = [
        { value: '1-month', label: '1 Month' },
        { value: '3-months', label: '3 Months' },
        { value: '6-months', label: '6 Months' },
        { value: '12-months', label: '12 Months' }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false);
            }
            if (durationDropdownRef.current && !durationDropdownRef.current.contains(event.target)) {
                setIsDurationDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
    };

    // Custom Dropdown Component
    const CustomDropdown = ({ 
        label, 
        value, 
        options, 
        onSelect, 
        placeholder, 
        isOpen, 
        setIsOpen, 
        dropdownRef 
    }) => {
        const selectedOption = options.find(option => option.value === value);
        
        return (
            <div className="w-full" ref={dropdownRef}>
                <label className="block font-rubikMedium mb-2">
                    {label}
                </label>
                <div className="relative">
                    <button
                        type="button"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent bg-white text-left flex items-center justify-between"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            <div className="p-2">
                                {options.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                                        onClick={() => {
                                            onSelect(option.value);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name={label}
                                            value={option.value}
                                            checked={value === option.value}
                                            onChange={() => {}}
                                            className="mr-3 text-weave-primary focus:ring-weave-primary"
                                        />
                                        <span className="text-gray-900">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-rubikBold">Add New Sponsor</h5>
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

                {/* Two Column Layout for Status and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomDropdown
                        label="Sponsorship Tier"
                        value={status}
                        options={statusOptions}
                        onSelect={setStatus}
                        placeholder="Select status"
                        isOpen={isStatusDropdownOpen}
                        setIsOpen={setIsStatusDropdownOpen}
                        dropdownRef={statusDropdownRef}
                    />
                    
                    <CustomDropdown
                        label="Duration"
                        value={duration}
                        options={durations}
                        onSelect={setDuration}
                        placeholder="Select duration"
                        isOpen={isDurationDropdownOpen}
                        setIsOpen={setIsDurationDropdownOpen}
                        dropdownRef={durationDropdownRef}
                    />
                </div>

                {/* Two Column Layout for Start Date and End Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                        <label className="block font-rubikMedium mb-2">
                            Start Date 
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block font-rubikMedium mb-2">
                            End Date 
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                        />
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
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddSponsor;