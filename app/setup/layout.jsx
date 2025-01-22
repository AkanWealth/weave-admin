'use client'
import Image from "next/image";
import React from "react";
import { Bounce, ToastContainer } from 'react-toastify'
import logo from '@/assets/images/logo.png'
import { createContext } from "vm";

export const MessageContext = createContext()
function Layout({ children }) {


  return (
    <main className='fixed w-full h-full flex justify-center font-rubikRegular text-sm'>
      <div className="w-10/12 max-w-[500px] min-h-[400px] m-auto">
        <Image src={logo} className='w-[200px] m-auto' alt='Weave logo' />
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
  );
}

export default Layout;
