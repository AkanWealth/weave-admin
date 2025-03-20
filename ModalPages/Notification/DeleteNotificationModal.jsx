import { useModalContext } from "@/components/elements/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useToastContext } from "@/contexts/toast";
import { Trash } from "lucide-react";
import api from "@/lib/api";


function DeleteNotificationModal() {
  const { showMessage } = useToastContext();
  const router = useRouter();

  const { closeModal } = useModalContext();

  const [notification, setNotification] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const searchParams = useSearchParams();
  const notificationId = searchParams.get("id");

  

  const handleDeleteNotification = async () => {
    if (isDeleting || !notificationId) return;

    setIsDeleting(true);
    try {
      const response = await api.delete(`/notification/${notificationId}`);
      if (response.status === 200) {
        showMessage("Notification deleted successfully", "", "success");
        closeModal();
      } else {
        showMessage(response.data.message, "", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage(error.response.data.message || "Failed to delete notification", "", "error");
    } finally {
      setIsDeleting(false);
    }
  };


  return (

    <div className="text-sm">
      <div className="flex" style={{ gap: 20 }}>
        <div
          style={{
            width: 50,
            minWidth: 50,
            height: 50,
            background: "#FFDEDE",
            borderRadius: "50%",
            color: 'red',
            display: "flex",
          }}
        >
          <Trash className="fa fa-user-plus m-auto" />
        </div>
        <div className="">
          <h4 className="font-rubikMedium text-xl">Delete Notification</h4>
          <p className="text-gray-500 my-2">

            Are you sure you want to delete this notification from the system? This action cannot be undone.
            If you have changed your mind click cancel.

          </p>
        </div>
      </div>

      <div className="flex my-6" style={{ gap: 10 }}>
        <div className="flex-1">
          <button
            className={`bg-red-500 text-base-white py-2 w-full font-rubikMedium rounded-md`}
            onClick={handleDeleteNotification}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Confrim"}
          </button>
        </div>
        <div className="flex-1">
          <button
            className="border border-black py-2 w-full font-rubikMedium rounded-md"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteNotificationModal;