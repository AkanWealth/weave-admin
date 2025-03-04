"use client";
import { toast, ToastContainer } from "react-toastify";
import { createContext, useContext } from "react";
import { AlertCircle, X } from "lucide-react";

import { FaSquareCheck } from "react-icons/fa6";

const MessageContext = createContext();

export function ToastContext({ children }) {
  const showMessage = (message, description, status = "default") => {
    const ToastContent = () => (
      <div className="flex items-start relative pl-6">
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
            {status === "success" && (
              <FaSquareCheck style={{ color: "#22C55E" }} className="w-5 h-5" />
            )}
            {status === "error" && <AlertCircle color="#EF4444" size={18} />}
            {status === "default" && <AlertCircle color="#6B7280" size={18} />}
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 ml-2">
          <h4 className="font-rubikbold text-gray-900">{message}</h4>
          {description && (
            <p className="text-xs text-gray-600">{description}</p>
          )}
        </div>
      </div>
    );

    // Define background styles based on status
    const getBgColor = () => {
      switch (status) {
        case "success":
          return {
            backgroundColor: "#EAF6EC",
            borderLeft: "4px solid #22C55E",
            padding: "16px 16px 16px 24px",
          };
        case "error":
          return {
            backgroundColor: "#FEE2E2",
            borderLeft: "4px solid #EF4444",
            padding: "16px 16px 16px 24px",
          };
        default:
          return {
            backgroundColor: "#F3F4F6",
            borderLeft: "4px solid #6B7280",
            padding: "16px 16px 16px 24px",
          };
      }
    };

    let toastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      closeButton: ({ closeToast }) => (
        <button onClick={closeToast} className="p-1">
          <X size={16} className="text-gray-500" />
        </button>
      ),
      className:
        "rounded-md shadow-lg w-[400px] border-gray-100 overflow-visible",
      bodyClassName: "p-0",
      style: getBgColor(),
    };

    toast(<ToastContent />, toastOptions);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      <ToastContainer />
      {children}
    </MessageContext.Provider>
  );
}

export function useToastContext() {
  return useContext(MessageContext);
}

export function useMessageContext() {
  return useContext(MessageContext);
}
