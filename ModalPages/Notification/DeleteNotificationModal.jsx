import { useModalContext } from "@/components/elements/Modal";
import { useRouter,useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useToastContext } from "@/contexts/toast";
import api from "@/lib/api";


function DeleteNotificationModal() {
    const { showMessage} = useToastContext(); 
  const router = useRouter();

const { closeModal } = useModalContext();
  
  const [notification, setNotification] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const searchParams = useSearchParams();
  const notificationId = searchParams.get("id");
  
  // useEffect(() => {
  //   // Fetch notification details if needed
  //   if (notificationId) {
  //     fetchNotificationDetails(notificationId);
  //   }
  // }, [notificationId]);

  // const fetchNotificationDetails = async (id) => {
  //   try {
  //     const response = await api.get(`/notification/${id}`);
  //     if (response.status === 200) {
  //       setNotification(response.data.notification);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     showMessage(error.response?.data?.message || "Failed to fetch notification details", "error");
  //   }
  // };

  const handleDeleteNotification = async () => {
    if (isDeleting || !notificationId) return;

    setIsDeleting(true);
    try {
      const response = await api.delete(`/notification/${notificationId}`);
      if (response.status === 200) {
        showMessage("Notification deleted successfully","","success");
        closeModal();
      } else {
        showMessage(response.data.message, "","error");
      }
    } catch (error) {
      console.error(error);
      showMessage(error.response.data.message || "Failed to delete notification", "","error");
    } finally {
      setIsDeleting(false);
    }
  };

  // if (!notification && notificationId) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h2 className="text-xl font-rubikBold mb-4">Delete Notification</h2>
      <p className="mb-4">
        Are you sure you want to delete this notification?
        {/* {notification && <strong> "{notification.title}"</strong>} */}
      </p>
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={handleDeleteNotification}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
export default DeleteNotificationModal;