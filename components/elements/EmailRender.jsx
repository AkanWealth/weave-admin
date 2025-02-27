"use client";
import React, { useState } from "react";
import copy from "clipboard-copy";

function EmailRender({ email }) {
  const [isCopied, setIsCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await copy(email);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };
  return (
    <>
      <span className="text-gray-500 text-sm">{email}</span>
      <button className="mx-2 p-1" onClick={copyEmail}>
        {isCopied ? (
          <span className="text-xs">Copied!</span>
        ) : (
          <i className="fa fa-copy"></i>
        )}
      </button>
    </>
  );
}

export default EmailRender;
