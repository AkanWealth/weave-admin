"use client";
import React from "react";
import { SquareArrowOutUpRight } from "lucide-react";
// Import jsPDF as a namespace import
import { jsPDF } from "jspdf";
// Import autotable - newer versions require a different approach
import autoTable from 'jspdf-autotable';

const TableExportPDF = ({ 
  data = [], 
  columns = [], 
  fileName = `Export_${new Date().toISOString().split('T')[0]}.pdf`,
  buttonText = "Export",
  title = "Exported Data"
}) => {
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
    
    pdf.save(fileName);
  };

  return (
    <button
      className="bg-weave-primary text-white py-2 px-4 rounded-xl font-medium flex items-center"
      onClick={exportToPDF}
    >
      {buttonText}
      <SquareArrowOutUpRight className="w-4 h-4 ml-2" />
    </button>
  );
};

export default TableExportPDF;