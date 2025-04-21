"use client";
import React from "react";
import { clearAuthTokens } from "@/lib/api";
import { useRouter } from "next/navigation";

function LogoutBtn() {
  const router = useRouter();
  
  const handleLogout = () => {
    // Use the clearAuthTokens function to remove all auth tokens
    clearAuthTokens();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 rounded-md p-3 px-5 text-left"
    >
      <i className="fa fa-lock mr-4 text-xl"></i>
      Logout
    </button>
  );
}

export default LogoutBtn;