import React from "react";

const Loading = () => {
  return (
    <div className="w-full p-4">
      <div className="animate-pulse space-y-4">
        {/* Table Header Placeholder */}
        <div className="h-8 bg-gray-300 rounded w-1/4"></div>

        {/* Table Rows Placeholder */}
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-6 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
