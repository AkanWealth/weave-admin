import React from 'react';
import { User } from 'lucide-react';
const LayeredUserIcons = ({ 
   
}) => {
  return (
    <div className="relative inline-block ">
      <div className="absolute bottom-4 -right-3">
        <div className="rounded-full bg-white p-1 text-[20px]">
        <i className="fa fa-user"></i>
        </div>
      </div>
      
      {/* Primary (foreground) user icon */}
      <div className="relative z-30">
        <div className="bg-white">
          <i className="fa fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default LayeredUserIcons;