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

function EditContentPillars() {
    // Set your default values here
    const [contentType, setContentType] = useState("");
    const [pillarName, setPillarName] = useState("Mind/Body Wellness");
    const [selectedIcon, setSelectedIcon] = useState("brain");
    const [description, setDescription] = useState("Mind-body wellness practices");
    const [unlocked, setUnlocked] = useState(true);
    const router = useRouter();

    // List of icons to select from
    const icons = [
        { name: "heart", src: heartIcon },
        { name: "leaf", src: leafIcon },
        { name: "apple", src: appleIcon },
        { name: "brain", src: brainIcon },
        { name: "sun", src: sunIcon },
        { name: "star", src: starIcon },
        // Add more as needed
    ];

    useEffect(() => {
        console.log(contentType);
    }, [contentType]);

    return (
        <div>
            <h5 className="font-rubikBold text-2xl">Add Pillars</h5>
            <div>
                <InputField
                    label={"Name"}
                    value={pillarName}
                    setValue={setPillarName}
                    required={true}
                />
            </div>

            {/* Select Icon */}
            {/* Select Icon */}
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
                `}
                onClick={() => setSelectedIcon(icon.name)}
                aria-label={`Select ${icon.name} icon`}
            >
                <Image
                    src={icon.src}
                    alt={icon.name}
                    width={32}
                    height={32}
                    className="object-contain"
                />
                {/* Selection indicator */}
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
    {/* Show selected icon name
    {selectedIcon && (
        <p className="mt-2 text-sm text-gray-600 font-rubikRegular">
            Selected: <span className="font-rubikMedium capitalize">{selectedIcon}</span>
        </p>
    )} */}
</div>

            {/* Description */}
            <div className="mt-4">
                <label className="block font-rubikMedium mb-2">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
                    placeholder="Enter short description of the pillar"
                    value={description}
                    onChange={(e) => {
                        if (e.target.value.length <= 45) setDescription(e.target.value);
                    }}
                    rows={2}
                    maxLength={45}
                    required
                />
                <div className="text-right text-xs text-gray-400 mt-1">
                    {description.length}/45 Characters
                </div>
            </div>

            {/* Updated Toggle Switch */}
            <div className="mt-4 flex items-center gap-3">
    <label className="relative inline-block w-12 h-6">
        <input
            type="checkbox"
            checked={unlocked}
            onChange={() => setUnlocked(!unlocked)}
            className="opacity-0 w-0 h-0 peer"
        />
        <span
            className={`absolute cursor-pointer inset-0 rounded-full transition duration-300 ${
                unlocked ? "bg-teal-500" : "bg-gray-300"
            }`}
        ></span>
        <span
            className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
                unlocked ? "translate-x-5" : "translate-x-0"
            }`}
        ></span>
    </label>

    <span className="font-rubikMedium text-gray-700">
        {unlocked ? "Unlocked" : "Locked"}
    </span>
</div>

            <div className="w-full mx-auto mt-6">
                <div className="flex" style={{ gap: 20 }}>
                    <div className="flex-1">
                        <button
                            className="border border-black py-2 w-full font-rubikMedium rounded-md"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            className={`${pillarName && selectedIcon && description
                                    ? "bg-weave-primary"
                                    : "bg-gray-300"
                                } text-base-white py-2 w-full font-rubikMedium rounded-md`}
                            disabled={!(pillarName && selectedIcon && description)}
                            onClick={() => {
                                // handle create pillar logic here
                            }}
                        >
                            Create Pillar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditContentPillars;