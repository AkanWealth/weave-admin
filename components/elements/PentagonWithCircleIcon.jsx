import React from "react";
import { Pentagon,CircleSmall } from "lucide-react";

const PentagonWithCircleIcon = ({ className = "" }) => {
    return (
      <div className={`relative inline-block ${className}`}>
        <Pentagon className="w-6 h-6"/>
        
        {/* Circle icon (inner shape) positioned absolutely in the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircleSmall className="w-4 h-4"/>
        </div>
      </div>
    );
  };
  
  export default PentagonWithCircleIcon;