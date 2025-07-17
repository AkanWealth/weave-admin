// "use client";
// import React, { useRef, useEffect } from "react";
// import { X, ChevronDown } from "lucide-react";

// function ExportModal({ onClose }) {
//   const dropdownRef = useRef(null);
//   const [selectedFormat, setSelectedFormat] = React.useState("csv");

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         // Do not close the modal on outside click, let the X button handle it
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const formats = [
//     { value: "csv", label: "CSV" },
//     { value: "pdf", label: "PDF" },
//   ];

//   const CustomDropdown = ({
//     label,
//     value,
//     options,
//     onSelect,
//     placeholder,
//     isOpen,
//     setIsOpen,
//     dropdownRef,
//   }) => {
//     const selectedOption = options.find((option) => option.value === value);

//     return (
//       <div className="w-full" ref={dropdownRef}>
//         <label className="block font-rubikMedium mb-2">{label}</label>
//         <div className="relative">
//           <button
//             type="button"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-weave-primary focus:border-transparent bg-white text-left flex items-center justify-between"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
//               {selectedOption ? selectedOption.label : placeholder}
//             </span>
//             <ChevronDown
//               className={`w-4 h-4 transition-transform ${
//                 isOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//           {isOpen && (
//             <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//               <div className="p-2">
//                 {options.map((option) => (
//                   <label
//                     key={option.value}
//                     className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
//                     onClick={() => {
//                       onSelect(option.value);
//                       setIsOpen(false);
//                     }}
//                   >
//                     <input
//                       type="radio"
//                       name={label}
//                       value={option.value}
//                       checked={value === option.value}
//                       onChange={() => {}}
//                       className="mr-3 text-weave-primary focus:ring-weave-primary"
//                     />
//                     <span className="text-gray-900">{option.label}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const handleExport = () => {
//     if (selectedFormat === "csv") {
//       const csvHeader = "Name,Email,Start Date,Status,Next Billing\n";
//       const csvContent = filteredSubscribers
//         .map((user) =>
//           [user.name, user.email, user.startDate, user.status, user.nextBilling].join(",")
//         )
//         .join("\n");
//       const blob = new Blob([csvHeader + csvContent], { type: "text/csv" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `subscribers_${new Date().toISOString().split("T")[0]}.csv`;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } else if (selectedFormat === "pdf") {
//       const doc = new jsPDF();
//       doc.setFontSize(12);
//       doc.text("Subscriber Export", 10, 10);
//       const headers = ["Name", "Email", "Start Date", "Status", "Next Billing"];
//       const data = filteredSubscribers.map((user) => [
//         user.name,
//         user.email,
//         user.startDate,
//         user.status,
//         user.nextBilling,
//       ]);
//       doc.autoTable({
//         head: [headers],
//         body: data,
//         startY: 20,
//       });
//       doc.save(`subscribers_${new Date().toISOString().split("T")[0]}.pdf`);
//     }
//     onClose();
//   };

//   // Note: filteredSubscribers is not directly available here. We'll pass it via props or context.
//   // For now, assume it's passed via a parent component or context.

//   return (
//     <div className="mx-auto">
//       <div className="flex items-center justify-between mb-6">
//         <h5 className="text-xl font-rubikBold">Export Subscribers</h5>
//       </div>

//       <div className="flex flex-col space-y-4">
//         <CustomDropdown
//           label="Export Format"
//           value={selectedFormat}
//           options={formats}
//           onSelect={setSelectedFormat}
//           placeholder="Select format"
//           isOpen={false} // Controlled by parent or not used here
//           setIsOpen={() => {}} // Placeholder, not needed for this static display
//           dropdownRef={dropdownRef}
//         />

//         <div className="flex gap-4 mt-8">
//           <button
//             className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-rubikMedium rounded-lg hover:bg-gray-50 transition-colors"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="flex-1 py-3 px-4 bg-weave-primary text-white font-rubikMedium rounded-lg hover:bg-weave-primary/90 transition-colors"
//             onClick={handleExport}
//           >
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ExportModal;




import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const ExportModal = ({ isOpen, onClose, data, filteredCount }) => {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formats = [
    { value: 'pdf', label: 'PDF' },
    { value: 'csv', label: 'CSV' }
  ];

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
    setIsDropdownOpen(false);
  };

  const handleDownload = () => {
    if (!selectedFormat) return;

    if (selectedFormat === 'csv') {
      downloadCSV();
    } else if (selectedFormat === 'pdf') {
      downloadPDF();
    }
    
    onClose();
  };

  const downloadCSV = () => {
    const csvHeader = "Name,Email,Start Date,Status,Next Billing\n";
    const csvContent = data
      .map((user) => {
        return [user.name, user.email, user.startDate, user.status, user.nextBilling].join(",");
      })
      .join("\n");
    
    const blob = new Blob([csvHeader + csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    // Basic PDF generation using HTML to PDF approach
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Subscribers Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .header { margin-bottom: 20px; }
          .status-active { color: #28A745; font-weight: bold; }
          .status-expired { color: #E74C3C; font-weight: bold; }
          .status-canceled { color: #FFA500; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Subscribers Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <p>Total Records: ${data.length}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Next Billing</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(user => `
              <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.startDate}</td>
                <td class="status-${user.status.toLowerCase()}">${user.status}</td>
                <td>${user.nextBilling}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Export Data</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left focus:ring-2 focus:ring-teal-500 focus:border-transparent flex items-center justify-between"
              >
                <span className={selectedFormat ? 'text-gray-900' : 'text-gray-400'}>
                  {selectedFormat ? formats.find(f => f.value === selectedFormat)?.label : 'Select format'}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {formats.map((format) => (
                    <button
                      key={format.value}
                      onClick={() => handleFormatSelect(format.value)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-md last:rounded-b-md"
                    >
                      {format.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600">
              {filteredCount} subscribers will be exported
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={!selectedFormat}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedFormat
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;