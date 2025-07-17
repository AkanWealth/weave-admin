import React from "react";
import Image from "next/image";
import Link from "next/link";
import growthFrame from "@/assets/images/EmptyState.png";

const EmptyMusicState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 max-w-[350px] mx-auto text-center">
      <Image
        src={growthFrame}
        className="w-[80px] h-[120px] mx-auto mb-4"
        alt="No songs uploaded"
      />
      <h4 className="text-xl font-rubikMedium mb-2">No songs uploaded yet.</h4>
      <p className="text-md text-gray-500 mb-4">Add your first track to get started.</p>
      <Link href="?modal=add-music">
        <button className="bg-weave-primary text-white py-2 px-6 rounded-md font-rubikMedium">
          Add Song
        </button>
      </Link>
    </div>
  );
};

export default EmptyMusicState;