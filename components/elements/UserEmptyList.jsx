import React from "react";
import feedback from "@/assets/images/emptylogo.png";
import Image from "next/image";

function UserEmptyList() {
  return (
    <div className="flex flex-col text-center justify-center py-12 max-w-[300px] mx-auto">
      <Image
        src={feedback}
        className="w-[80px] h-[120px] mx-auto"
        alt="Frame"
      />
      <h4 className="text-xl font-rubikMedium my-2">
        No Report yet
      </h4>
      <h4 className="text-gray-400 text-sm">
      Reported issues by users will appear here
      </h4>
    </div>
  );
}

export default UserEmptyList;
