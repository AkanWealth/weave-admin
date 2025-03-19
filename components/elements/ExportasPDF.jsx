"use client";
import React, { useState, useEffect, useRef } from "react";
import { SquareArrowOutUpRight, FileText, Download, ChevronDown } from "lucide-react";
// Import jsPDF as a namespace import
import { jsPDF } from "jspdf";
// Import autotable - newer versions require a different approach
import autoTable from 'jspdf-autotable';

const TableExport = ({ 
  data = [], 
  columns = [], 
  fileName = `Export_${new Date().toISOString().split('T')[0]}`,
  buttonText = "Export",
  title = "Exported Data",
  id = "export-button"
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    // Add event listener when the dropdown is open
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Clean up the event listener when component unmounts or dropdown closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const exportToPDF = () => {
    // Create a new document with proper import
    const pdf = new jsPDF('landscape');
    
    pdf.setFontSize(16);
    pdf.text(title, 14, 15);
    
    const tableData = data.map(item => {
      return columns.map(column => {
        if (typeof column.accessor === 'function') {
          return column.accessor(item);
        }
        
        if (column.accessor && column.accessor.includes('.')) {
          const accessorPath = column.accessor.split('.');
          return accessorPath.reduce((obj, key) => obj?.[key], item);
        }
        
        return item[column.accessor || column.id];
      });
    });
    
    const tableHeaders = columns.map(column => column.header || column.Header || column.id || column.accessor);
    
    // In jsPDF 3.0.0 with autotable 5.0.2, you should use the autoTable function directly
    autoTable(pdf, {
      head: [tableHeaders],
      body: tableData,
      startY: 25,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [66, 66, 66] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 25 }
    });
    
    const pageCount = pdf.internal.getNumberOfPages();
    pdf.setFontSize(10);
    for(let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.text(`Generated on: ${new Date().toLocaleString()}`, 14, pdf.internal.pageSize.height - 10);
      pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 10);
    }
    
    pdf.save(`${fileName}.pdf`);
    setShowDropdown(false);
  };

  const exportToExcel = () => {
    // Get headers from columns
    const tableHeaders = columns.map(column => column.header || column.Header || column.id || column.accessor);
    
    // Extract data for each row based on columns
    const tableData = data.map(item => {
      return columns.map(column => {
        if (typeof column.accessor === 'function') {
          return column.accessor(item);
        }
        
        if (column.accessor && column.accessor.includes('.')) {
          const accessorPath = column.accessor.split('.');
          return accessorPath.reduce((obj, key) => obj?.[key], item);
        }
        
        return item[column.accessor || column.id];
      });
    });
    
    // Create CSV content with headers and data
    const csvContent = [
      tableHeaders.join(','),
      ...tableData.map(row => 
        row.map(cell => 
          // Handle commas and quotes in CSV format
          typeof cell === 'string' && (cell.includes(',') || cell.includes('"')) 
            ? `"${cell.replace(/"/g, '""')}"` 
            : cell
        ).join(',')
      )
    ].join('\n');
    
    // Create a Blob object and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative" id={id} ref={dropdownRef}>
      <button
        className="bg-weave-primary text-white py-2 px-4 rounded-xl font-medium flex items-center"
        onClick={toggleDropdown}
      >
        {buttonText}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      
      {showDropdown && (
        <div className="absolute top-10 right-0 rounded-md p-1 shadow bg-white text-sm w-[150px] z-10">
          <div className="flex flex-col text-left">
            <button
              className="p-2 flex items-center hover:bg-gray-100 rounded-md text-gray-800"
              onClick={exportToPDF}
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </button>
            
            <button
              className="p-2 flex items-center hover:bg-gray-100 rounded-md text-gray-800"
              onClick={exportToExcel}
            >
              <FileText className="w-4 h-4 mr-2" />
              Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableExport;