"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useState, useRef, useEffect } from "react";
import logo from "@/assets/images/backgrounglogo.png";
import { usePathname } from "next/navigation";
import Modal from "@/components/elements/Modal";
import LogoutBtn from "./LogoutBtn";
import { FaSearch } from "react-icons/fa";
import Usaflag from "@/assets/images/UsaFlag.png";
import { ChevronDown, User, NotepadText,OctagonAlert } from "lucide-react";
import Pentagonwithclock from "@/components/elements/Pentagonwithclock";
import { ToastContext } from "@/contexts/toast";
import UserInfo from "./userInfo";
import NotificationIcon from "./notificationIcon";

function Layout({ children }) {
  const pathname = usePathname();
  let userInfo = null;
  try {
    userInfo = localStorage.getItem("userinfo");

    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    }
  } catch (error) {}

  // Custom Language Dropdown Component
  const LanguageDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const dropdownRef = useRef(null);

    const languages = [
      { name: "English" },
      { name: "French" },
      { name: "Arabic" },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectLanguage = (language) => {
      setSelectedLanguage(language);
      setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative flex items-center" ref={dropdownRef}>
        <div className="mr-2 flex items-center">
          <Image
            src={Usaflag}
            width={40}
            height={27}
            alt="USA Flag"
            className="rounded-sm"
          />
        </div>
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between text-gray-500 text-sm py-2 px-2 min-w-[80px] bg-transparent focus:outline-none"
        >
          <span>{selectedLanguage}</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md py-1 z-50 min-w-[160px] border border-gray-200">
            {languages.map((language) => (
              <div
                key={language.name}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => selectLanguage(language.name)}
              >
                {language.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Suspense>
      <ToastContext>
        <div className="bg-[#F5F6FA]">
          <nav className="w-[280px] fixed left-0 top-0 bottom-0 font-rubikRegular">
            <div className="border-b-2 border-gray-100 flex p-4 py-8 justify-center item=center">
              <Image src={logo} className="w-[150px]" alt="Weave Logo" />
            </div>
            <div className="h-1/2 p-2 flex flex-col py-2 space-y-2 text-base">
              <Link
                href={"/dashboard"}
                className={
                  (pathname.startsWith("/dashboard")
                    ? "bg-weave-primary text-base-white "
                    : "text-gray-600") + "rounded-md p-3 px-5"
                }
              >
                <i className="fa fa-home mr-4 text-lg"></i>
                Dashboard
              </Link>
              <Link
                href={"/users"}
                className={
                  (pathname.startsWith("/users")
                    ? "bg-weave-primary text-base-white "
                    : "text-gray-600 ") +
                  "rounded-md p-3 px-5 flex items-center"
                }
              >
                <User className="mr-4 w-5 h-5 flex" />
                User Management
              </Link>
              <Link
                href={"/contentsManagement"}
                className={
                  (pathname.startsWith("/contentsManagement")
                    ? "bg-weave-primary text-base-white "
                    : "text-gray-600 ") +
                  "rounded-md p-3 px-5 flex items-center"
                }
              >
                <NotepadText className="w-5 h-5 mr-4 flex-shrink-0" />
                <span>Content Management</span>
              </Link>
              <Link
                href={"/auditLog"}
                className={
                  (pathname.startsWith("/auditLog")
                    ? "bg-weave-primary text-base-white "
                    : "text-gray-600 ") + "rounded-md p-3 px-5"
                }
              >
                <Pentagonwithclock className="mr-4 text-xl" />
                Audit Logs
              </Link>

              <Link
                href={"/user-reported-Issue"}
                className={
                  (pathname.startsWith("/user-reported-Issue")
                    ? "bg-weave-primary text-base-white "
                    : "text-gray-600 ") + "rounded-md p-3 px-5  flex items-center"
                }
              >
                <OctagonAlert className="w-5 h-5 mr-4 flex-shrink-0" />
                User-Reported Issue
              </Link>
            </div>

            <div className="h-2/5 p-2 flex flex-col py-6 text-base mt-4">
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
            <nav className="fixed top-0 right-0 left-[280px] h-[60px] flex items-center bg-white border-l-2 border-gray-100 px-6 font-rubikRegular z-40">
              {/* Search section - takes less space */}
              <div className="w-1/3 relative">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <FaSearch className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="rounded-full w-full py-2 px-9 border border-1 bg-[#f5f6fa] text-sm
          focus:outline-none focus:ring-1 focus:ring-blue-500
          transition-colors text-black"
                  />
                </div>
              </div>

              {/* Right side elements with tighter spacing */}
              <div className="flex-1 flex justify-end items-center space-x-4">
                {/* Notification bell */}
                <NotificationIcon />

                {/* Replaced the original language dropdown with the custom component */}
                {/* <LanguageDropdown /> */}

                {/* User profile section */}
                {/* <div className="flex items-center pl-2 space-x-2">
                  <Image
                    src={placeholderAvatar}
                    width={40}
                    height={40}
                    alt="User Image"
                    className="rounded-full"
                  />

                  <div className="ml-3 text-gray-600 ml-2">
                    <h1 className="font-rubikMedium text-sm">
                      {userInfo && userInfo.username}
                    </h1>
                    <h1 className="capitalize text-xs text-gray-500">
                      {userInfo && userInfo.role.name.replace(/_/, " ")}
                    </h1>
                  </div>
                  <div className="text-gray-500 mr-2">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div> */}

                <UserInfo />
              </div>
            </nav>

            <section className="absolute top-[60px] right-0 left-0 bottom-0 p-4 font-rubikRegular overflow-auto">
              {children}
            </section>
          </main>
          <Modal />
        </div>
      </ToastContext>
    </Suspense>
  );
}

export default Layout;
