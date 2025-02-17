"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

import logo from "@/assets/images/logo.png";
import placeholderAvatar from "@/assets/images/3d_avatar_1.png";
import { usePathname, useSearchParams } from "next/navigation";
import Modal from "@/components/elements/Modal";
import LogoutBtn from "./LogoutBtn";

function Layout({ children }) {
  const pathname = usePathname();
  let userInfo = window.localStorage.getItem("userinfo");

  if (userInfo) {
    userInfo = JSON.parse(userInfo);
  }

  return (
    <Suspense>
      <div>
        <nav className="w-[280px] fixed left-0 top-0 bottom-0 font-rubikRegular">
          <div className="p-4 py-6 border border-bottom-1">
            <Image src={logo} className="w-2/3" alt="Weave Logo" />
          </div>
          <div className="h-3/5 p-2 flex flex-col py-6 space-y-3">
            <Link
              href={"/dashboard"}
              className={
                (pathname.startsWith("/dashboard")
                  ? "bg-weave-primary text-base-white "
                  : "text-gray-600 ") + "rounded-md p-3 px-5"
              }
            >
              <i className="fa fa-home mr-4 text-xl"></i>
              Dashboard
            </Link>
            <Link
              href={"/users"}
              className={
                (pathname.startsWith("/users")
                  ? "bg-weave-primary text-base-white "
                  : "text-gray-600 ") + "rounded-md p-3 px-5"
              }
            >
              <i className="fa fa-user mr-4 text-xl"></i>
              User Management
            </Link>
            <Link
              href={"/contentsManagement"}
              className={
                (pathname.startsWith("/contentsManagement")
                  ? "bg-weave-primary text-base-white "
                  : "text-gray-600 ") + "rounded-md p-3 px-5"
              }
            >
              <i className="fa fa-copy mr-4 text-xl"></i>
              Content Management
            </Link>
            <Link
              href={"/auditLog"}
              className={
                (pathname.startsWith("/auditLog")
                  ? "bg-weave-primary text-base-white "
                  : "text-gray-600 ") + "rounded-md p-3 px-5"
              }
            >
              <i className="fa fa-tag mr-4 text-xl"></i>
              Audit Logs
            </Link>
          </div>

          <div className="h-1/5 p-2 flex flex-col py-6">
            <Link
              href={"/settings"}
              className={
                (pathname.startsWith("/settings")
                  ? "bg-weave-primary text-base-white "
                  : "text-gray-500 ") + "rounded-md p-3 px-5"
              }
            >
              <i className="fa fa-cog mr-4 text-xl"></i>
              Settings
            </Link>
            <LogoutBtn />
          </div>
        </nav>
        <main className="bg-[#F5F6FA] fixed left-[280px] right-0 top-0 bottom-0">
          <nav className="fixed top-0 right-0 left-[280px] h-[60px] flex bg-white p-2 font-rubikRegular overflow-hidden">
            <div className="w-1/2 pl-16">
              <form action="" className="flex">
                <input
                  type="text"
                  className="rounded-full w-2/3 my-auto p-2 px-4 border border-1 bg-[#f5f6fa]"
                  placeholder="Search"
                />
              </form>
            </div>
            <div className="w-1/2 flex">
              <div className="w-1/2 flex space-x-8">
                <button className="my-auto text-xl relative">
                  <span className="absolute bg-red-500 text-xs h-[16px] w-[16px] rounded-full -top-2 -right-2 text-white">
                    4
                  </span>
                  <i className="fa fa-bell-o"></i>
                </button>
                <select className="text-gray-600 p-2 px-4 w-[150px]">
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>
              <div className="w-1/2 flex space-x-2">
                <Image
                  src={placeholderAvatar}
                  width={45}
                  height={45}
                  alt="User Image"
                />
                <div className="relative px-12 text-gray-600">
                  <h1 className="font-rubikMedium italic">
                    {userInfo.username}
                  </h1>
                  <h1>{userInfo.role.name}</h1>
                </div>
              </div>
            </div>
          </nav>

          <section className="absolute top-[60px] right-0 left-0 bottom-0 p-4 font-rubikRegular overflow-auto">
            {children}
          </section>
        </main>
        <Modal />
      </div>
    </Suspense>
  );
}

export default Layout;
