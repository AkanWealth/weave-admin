import React from "react";
import Image from "next/image";
import Link from "next/link";
import growthFrame from "@/assets/images/EmptyState.png";

const EmptySubState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 max-w-[500px] mx-auto text-center">
      <Image
        src={growthFrame}
        className="w-[120px] h-auto mx-auto mb-4"
        alt="No songs uploaded"
      />
      <h4 className="text-xl font-rubikMedium mb-2">No Subscriptions Yet</h4>
      <p className="text-md text-gray-500 mb-4">You’ll see all active and expired user subscriptions here <br /> once signups begin.</p>
      {/* <Link href="?modal=add-music">
        <button className="bg-weave-primary text-white py-2 px-6 rounded-md font-rubikMedium">
          Add Song
        </button>
      </Link> */}
    </div>
  );
};

export default EmptySubState;