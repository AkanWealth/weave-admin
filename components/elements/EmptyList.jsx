import React from "react";
import signupFrame from "@/assets/images/signupFrame.png";
import Image from "next/image";

function EmptyList() {
  return (
    <div className="flex flex-col text-center justify-center py-12 max-w-[300px] mx-auto">
      <Image
        src={signupFrame}
        className="w-[80px] h-[120px] mx-auto"
        alt="Frame"
      />
      <h4 className="text-xl font-rubikMedium my-2">
        Your Community is Waiting to Grow!
      </h4>
      <h4 className="text-gray-400 text-sm">
        It looks like there haven’t been any new sign-ups recently.
      </h4>
    </div>
  );
}

export default EmptyList;
