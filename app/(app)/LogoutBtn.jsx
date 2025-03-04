"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function LogoutBtn() {
  const router = useRouter();
  const deleteCookie = () => {
    Cookies.remove("session");
    router.push("/");
  };

  return (
    <button
      onClick={() => deleteCookie()}
      className="text-red-600 rounded-md p-3 px-5 text-left"
    >
      <i className="fa fa-lock mr-4 text-xl"></i>
      Logout
    </button>
  );
}

export default LogoutBtn;
