import React, { Suspense } from "react";
import Image from "next/image";
import { Bounce, ToastContainer } from "react-toastify";
import logo from "@/assets/images/logo.png";

function Layout({ children }) {
  return (
    <Suspense>
      <main className="fixed w-full h-full flex justify-center font-rubikRegular text-sm">
        <div className="w-10/12 max-w-[500px] max-h-[80vh] overflow-y-auto hide-scrollbar m-auto">
          <Image src={logo} className="w-[200px] m-auto" alt="Weave logo" />
          {children}
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
        </div>
      </main>
    </Suspense>
  );
}

export default Layout;