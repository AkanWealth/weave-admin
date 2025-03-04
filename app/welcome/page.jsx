import React from "react";
import Image from "next/image";

import welcomeGif from "@/assets/images/welcome_gig.gif";
import Link from "next/link";

function Welcome() {
  return (
    <main className="fixed w-full h-full flex justify-center font-rubikRegular text-sm">
      <div className="w-10/12 max-w-[500px] min-h-[400px] m-auto flex-col space-y-8">
        <Image
          src={welcomeGif}
          className="w-[300px] m-auto"
          alt="Welcome Gif"
        />

        <h1 className="text-center text-3xl font-rubikBold">
          Welcome to Admin Portal{" "}
        </h1>

        <Link
          href={"/dashboard"}
          className="block bg-weave-primary py-2 text-base-white text-center rounded-xl"
        >
          Proceed to Dashboard
        </Link>
      </div>
    </main>
  );
}

export default Welcome;
