"use client";
import { Bounce, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Modal from "@/components/elements/Modal";

const { createContext, useContext } = require("react");

const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const showMessage = (message, status) => {
    let toastOptions = {
      position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    };

    if (status === "success") {
      toast.success(message, toastOptions);
    } else if (status === "error") {
      toast.error(message, toastOptions);
    } else toast(message, toastOptions);
  };
  const query = useSearchParams();

  const modal = query.get("modal");

  return (
    <ModalContext.Provider value={{ showMessage }}>
      {modal && <Modal>{children}</Modal>}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
