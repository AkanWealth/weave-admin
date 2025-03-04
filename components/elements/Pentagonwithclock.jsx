import React from "react";
import { Pentagon,Clock10 } from "lucide-react";

const Pentagonwithclock = ({ className = "" }) => {
    return (
      <div className={`relative inline-block ${className}`}>
        <Pentagon className="w-5 h-5"/>
        
        {/* Circle icon (inner shape) positioned absolutely in the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Clock10 className="w-2 h-2"/>
        </div>
      </div>
    );
  };
  
  export default Pentagonwithclock;