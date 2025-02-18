import React, { Suspense } from "react";
import { Bounce, ToastContainer } from "react-toastify";

function AuthLayout({ children }) {
  return (
    <Suspense>
      <main className="fixed w-full h-full flex justify-center font-rubikRegular">
        <div className="w-1/2 banner"></div>
        <div className="w-1/2 h-full p-12 flex" style={{ overflow: "auto" }}>
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
