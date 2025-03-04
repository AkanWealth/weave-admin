import React, { Suspense } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import Image from "next/image";
import LoginImage from "@/assets/images/loginImg.png";

function AuthLayout({ children }) {
  return (
    <Suspense>
      <main className="fixed w-full h-full flex justify-center font-rubikRegular">
        {/* Modified banner div with smaller width and centered image */}
        <div className="w-[1100px] h-full banner relative">
          <Image 
            src={LoginImage} 
            alt="Banner image"
            width={277}
            height={218.6}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        
        {/* Adjusted width for children's container */}
        <div className="w-full h-full p-12 flex" style={{ overflow: "auto" }}>
          <div
            className="w-full max-w-[500px] min-h-[400px] m-auto"
            style={{ overflow: "auto" }}
          >
            {children}
          </div>
        </div>
        
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </main>
    </Suspense>
  );
}

export default AuthLayout;