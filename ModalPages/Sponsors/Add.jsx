// "use client";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect, useRef } from "react";
// import InputField from "@/components/elements/TextField";
// import { CloudUpload, X, ChevronDown } from "lucide-react";
// import api from "@/lib/api";
// import { useToastContext } from "@/contexts/toast";

// function AddSponsor() {
//     const [sponsorName, setSponsorName] = useState('');
//     const [logoFile, setLogoFile] = useState('');
//     const [status, setStatus] = useState('');
//     const [duration, setDuration] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const { showMessage } = useToastContext();
    
    
//     // Dropdown states
//     const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
//     const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
    
//     const statusDropdownRef = useRef(null);
//     const durationDropdownRef = useRef(null);
    
//     const router = useRouter();

//     const statusOptions = [
//         { value: 'Growth package', label: 'Growth package' },
//         { value: 'Spotlight package', label: 'Spotlight package' },
//         { value: 'Boast package', label: 'Boast package' }
//     ];

//     const durations = [
//         { value: '1-month', label: '1 Month' },
//         { value: '3-months', label: '3 Months' },
//         { value: '6-months', label: '6 Months' },
//         { value: '12-months', label: '12 Months' }
//     ];

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
//                 setIsStatusDropdownOpen(false);
//             }
//             if (durationDropdownRef.current && !durationDropdownRef.current.contains(event.target)) {
//                 setIsDurationDropdownOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const isFormValid = () => {
//         return sponsorName && logoFile && status && duration && startDate && endDate;
//     };

//     const handleSubmit = async () => {
//         if (!isFormValid()) {
//             setError('Please fill in all required fields');
//             return;
//         }

//         setIsLoading(true);
//         setError('');

//         try {
//             // Create FormData for file upload
//             const formData = new FormData();
//             formData.append('sponsorName', sponsorName);
//             formData.append('logo', logoFile);
//             formData.append('sponsorshipTier', status);
//             formData.append('duration', duration);
//             formData.append('startDate', startDate);
//             formData.append('endDate', endDate);

//             const response = await api.post("/api/sponsors", formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.status === 200 || response.status === 201) {
//                 console.log('Sponsor created successfully:', response.data);
//                 showMessage("Sponsor created successfully", "", "success");
//                 router.push("/contentsManagement?refresh=" + Date.now());
//             }
//         } catch (error) {
//             console.error('Error creating sponsor:', error);
//             showMessage("Error creating sponsor", "", "error");
//             setError(error.response?.data?.message || 'Failed to create sponsor. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSaveAsDraft = async () => {
//         setIsLoading(true);
//         setError('');

//         try {
//             // Create FormData for file upload
//             const formData = new FormData();
//             formData.append('sponsorName', sponsorName);
//             if (logoFile) formData.append('logo', logoFile);
//             formData.append('sponsorshipTier', status);
//             formData.append('duration', duration);
//             formData.append('startDate', startDate);
//             formData.append('endDate', endDate);
//             formData.append('isDraft', 'true'); // Add draft flag

//             const response = await api.post("/api/sponsors", formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.status === 200 || response.status === 201) {
//                 // console.log('Draft saved successfully:', response.data);
//                 showMessage("Draft saved successfully", "", "sucess")
//                 router.push("/contentsManagement?refresh=" + Date.now());
//             }
//         } catch (error) {
//             // console.error('Error saving draft:', error);
//             showMessage("Error saving draft","", "error")
//             setError(error.response?.data?.message || 'Failed to save draft. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Custom Dropdown Component
//     const CustomDropdown = ({ 
//         label, 
//         value, 
//         options, 
//         onSelect, 
//         placeholder, 
//         isOpen, 
//         setIsOpen, 
//         dropdownRef 
//     }) => {
//         const selectedOption = options.find(option => option.value === value);
        
//         return (
//             <div className="w-full" ref={dropdownRef}>
//                 <label className="block font-rubikMedium mb-2">
//                     {label}
//                 </label>
//                 <div className="relative">
//                     <button
//                         type="button"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent bg-white text-left flex items-center justify-between"
//                         onClick={() => setIsOpen(!isOpen)}
//                     >
//                         <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
//                             {selectedOption ? selectedOption.label : placeholder}
//                         </span>
//                         <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//                     </button>
                    
//                     {isOpen && (
//                         <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                             <div className="p-2">
//                                 {options.map((option) => (
//                                     <label
//                                         key={option.value}
//                                         className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
//                                         onClick={() => {
//                                             onSelect(option.value);
//                                             setIsOpen(false);
//                                         }}
//                                     >
//                                         <input
//                                             type="radio"
//                                             name={label}
//                                             value={option.value}
//                                             checked={value === option.value}
//                                             onChange={() => {}}
//                                             className="mr-3 text-weave-primary focus:ring-weave-primary"
//                                         />
//                                         <span className="text-gray-900">{option.label}</span>
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="mx-auto">
//             <div className="flex items-center justify-between mb-6">
//                 <h5 className="text-xl font-rubikBold">Add New Sponsor</h5>
//             </div>

//             {/* Error Message */}
//             {error && (
//                 <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//                     {error}
//                 </div>
//             )}

//             <div className="flex flex-col space-y-4">
//                 {/* Sponsor Name */}
//                 <div>
//                     <InputField
//                         label="Sponsor Name"
//                         placeholder="Enter sponsor name"
//                         value={sponsorName}
//                         setValue={setSponsorName}
//                     />
//                 </div>

//                 {/* Upload Logo */}
//                 <div>
//                     <label className="font-rubikMedium">
//                         Upload Logo 
//                     </label>
//                     <div className="mt-2">
//                         <input
//                             type="file"
//                             id="logo-file"
//                             className="hidden"
//                             accept="image/png, image/jpeg, image/jpg"
//                             onChange={(e) => setLogoFile(e.target.files[0])}
//                         />
//                         <label
//                             htmlFor="logo-file"
//                             className="rounded-lg flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed border-gray-300 p-8 hover:border-weave-primary transition-colors"
//                             style={{
//                                 padding: "1.5rem",
//                                 border: "2px dashed #777",
//                                 margin: "8px 0",
//                             }}
//                         >
//                             {logoFile?.name ? (
//                                 <div className="flex items-center justify-center">
//                                     <span className="text-weave-primary">{logoFile.name}</span>
//                                     <button
//                                         type="button"
//                                         className="ml-2 text-red-500"
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             e.stopPropagation();
//                                             setLogoFile(null);
//                                         }}
//                                     >
//                                         <X className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <>
//                                     <div className="flex items-center justify-center rounded-full bg-gray-200 w-16 h-16 mb-4">
//                                         <CloudUpload className="text-gray-600 w-8 h-8" />
//                                     </div>
//                                     <span className="font-medium text-gray-700">Drag and drop image</span>
//                                     <span className="text-gray-500 text-sm">PNG, JPEG, JPG</span>
//                                     <span className="mt-3">
//                                         <span className="inline-block px-4 py-2 text-sm text-white bg-weave-primary rounded-lg">
//                                             Select a file
//                                         </span>
//                                     </span>
//                                 </>
//                             )}
//                         </label>
//                     </div>
//                 </div>

//                 {/* Two Column Layout for Status and Duration */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <CustomDropdown
//                         label="Sponsorship Tier"
//                         value={status}
//                         options={statusOptions}
//                         onSelect={setStatus}
//                         placeholder="Select status"
//                         isOpen={isStatusDropdownOpen}
//                         setIsOpen={setIsStatusDropdownOpen}
//                         dropdownRef={statusDropdownRef}
//                     />
                    
//                     <CustomDropdown
//                         label="Duration"
//                         value={duration}
//                         options={durations}
//                         onSelect={setDuration}
//                         placeholder="Select duration"
//                         isOpen={isDurationDropdownOpen}
//                         setIsOpen={setIsDurationDropdownOpen}
//                         dropdownRef={durationDropdownRef}
//                     />
//                 </div>

//                 {/* Two Column Layout for Start Date and End Date */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="w-full">
//                         <label className="block font-rubikMedium mb-2">
//                             Start Date 
//                         </label>
//                         <input
//                             type="date"
//                             value={startDate}
//                             onChange={(e) => setStartDate(e.target.value)}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
//                         />
//                     </div>
//                     <div className="w-full">
//                         <label className="block font-rubikMedium mb-2">
//                             End Date 
//                         </label>
//                         <input
//                             type="date"
//                             value={endDate}
//                             onChange={(e) => setEndDate(e.target.value)}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent"
//                         />
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 mt-8">
//                     <button
//                         className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-rubikMedium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         onClick={handleSaveAsDraft}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? 'Saving...' : 'Save as Draft'}
//                     </button>
//                     <button
//                         className={`flex-1 py-3 px-4 font-rubikMedium rounded-lg transition-colors ${isFormValid() && !isLoading
//                                 ? "bg-weave-primary text-white hover:bg-weave-primary/90"
//                                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                             }`}
//                         onClick={handleSubmit}
//                         disabled={!isFormValid() || isLoading}
//                     >
//                         {isLoading ? 'Publishing...' : 'Publish'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddSponsor;




"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import InputField from "@/components/elements/TextField";
import { CloudUpload, X, ChevronDown } from "lucide-react";
import api from "@/lib/api";
import { useToastContext } from "@/contexts/toast";

function AddSponsor() {
    const [sponsorName, setSponsorName] = useState('');
    const [logoFile, setLogoFile] = useState('');
    const [sponsorshipTier, setSponsorshipTier] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { showMessage } = useToastContext();
    
    // Dropdown state
    const [isTierDropdownOpen, setIsTierDropdownOpen] = useState(false);
    const tierDropdownRef = useRef(null);
    
    const router = useRouter();

    // Updated tier options with durations
    const tierOptions = [
        { value: 'Boost Package', label: 'Boost Package', duration: 3, durationLabel: '3 Months' },
        { value: 'Growth Package', label: 'Growth Package', duration: 6, durationLabel: '6 Months' },
        { value: 'Spotlight Package', label: 'Spotlight Package', duration: 12, durationLabel: '1 Year' }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tierDropdownRef.current && !tierDropdownRef.current.contains(event.target)) {
                setIsTierDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Calculate start and end dates based on selected tier
    const calculateDates = (tier) => {
        const startDate = new Date();
        const selectedTier = tierOptions.find(option => option.value === tier);
        
        if (!selectedTier) return { startDate: null, endDate: null };

        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + selectedTier.duration);

        return {
            startDate: startDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
            endDate: endDate.toISOString().split('T')[0]
        };
    };

    // Get selected tier info for display
    const getSelectedTierInfo = () => {
        const selectedTier = tierOptions.find(option => option.value === sponsorshipTier);
        if (!selectedTier) return null;

        const { startDate, endDate } = calculateDates(sponsorshipTier);
        return {
            ...selectedTier,
            startDate,
            endDate
        };
    };

    const isFormValid = () => {
        return sponsorName && logoFile && sponsorshipTier;
    };

    const handleSubmit = async () => {
        if (!isFormValid()) {
            setError('Please fill in all required fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const { startDate, endDate } = calculateDates(sponsorshipTier);
            const selectedTier = tierOptions.find(option => option.value === sponsorshipTier);

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('sponsorName', sponsorName);
            formData.append('logo', logoFile);
            formData.append('sponsorshipTier', sponsorshipTier);
            formData.append('duration', `${selectedTier.duration}-months`);
            formData.append('startDate', startDate);
            formData.append('endDate', endDate);

            const response = await api.post("/sponsors", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Sponsor created successfully:', response.data);
                showMessage("Sponsor created successfully", "", "success");
                router.push("/contentsManagement?refresh=" + Date.now());
            }
        } catch (error) {
            console.error('Error creating sponsor:', error);
            showMessage("Error creating sponsor", "", "error");
            setError(error.response?.data?.message || 'Failed to create sponsor. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAsDraft = async () => {
        setIsLoading(true);
        setError('');

        try {
            const { startDate, endDate } = calculateDates(sponsorshipTier);
            const selectedTier = tierOptions.find(option => option.value === sponsorshipTier);

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('sponsorName', sponsorName);
            if (logoFile) formData.append('logo', logoFile);
            formData.append('sponsorshipTier', sponsorshipTier);
            if (selectedTier) formData.append('duration', `${selectedTier.duration}-months`);
            if (startDate) formData.append('startDate', startDate);
            if (endDate) formData.append('endDate', endDate);
            formData.append('isDraft', 'true'); // Add draft flag

            const response = await api.post("/sponsors", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200 || response.status === 201) {
                showMessage("Draft saved successfully", "", "success");
                router.push("/contentsManagement?refresh=" + Date.now());
            }
        } catch (error) {
            showMessage("Error saving draft", "", "error");
            setError(error.response?.data?.message || 'Failed to save draft. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Custom Dropdown Component for Sponsorship Tier
    const TierDropdown = () => {
        const selectedOption = tierOptions.find(option => option.value === sponsorshipTier);
        
        return (
            <div className="w-full" ref={tierDropdownRef}>
                <label className="block font-rubikMedium mb-2">
                    Sponsorship Tier
                </label>
                <div className="relative">
                    <button
                        type="button"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent bg-white text-left flex items-center justify-between"
                        onClick={() => setIsTierDropdownOpen(!isTierDropdownOpen)}
                    >
                        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
                            {selectedOption ? selectedOption.label : "Select tier"}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isTierDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isTierDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            <div className="p-2">
                                {tierOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer"
                                        onClick={() => {
                                            setSponsorshipTier(option.value);
                                            setIsTierDropdownOpen(false);
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="sponsorshipTier"
                                            value={option.value}
                                            checked={sponsorshipTier === option.value}
                                            onChange={() => {}}
                                            className="mr-3 text-weave-primary focus:ring-weave-primary"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-medium">{option.label}</span>
                                            <span className="text-gray-500 text-sm">{option.durationLabel}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const selectedTierInfo = getSelectedTierInfo();

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-rubikBold">Add New Sponsor</h5>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

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

                {/* Sponsorship Tier */}
                <TierDropdown />

                {/* Display calculated duration and end date (read-only) */}
                {selectedTierInfo && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="w-full">
                            <label className="block font-rubikMedium mb-2 text-gray-600">
                                Package Duration
                            </label>
                            <div className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                                {selectedTierInfo.durationLabel}
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="block font-rubikMedium mb-2 text-gray-600">
                                End Date
                            </label>
                            <div className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                                {selectedTierInfo.endDate ? new Date(selectedTierInfo.endDate).toLocaleDateString() : 'N/A'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                    <button
                        className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-rubikMedium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSaveAsDraft}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save as Draft'}
                    </button>
                    <button
                        className={`flex-1 py-3 px-4 font-rubikMedium rounded-lg transition-colors ${isFormValid() && !isLoading
                                ? "bg-weave-primary text-white hover:bg-weave-primary/90"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        onClick={handleSubmit}
                        disabled={!isFormValid() || isLoading}
                    >
                        {isLoading ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddSponsor;