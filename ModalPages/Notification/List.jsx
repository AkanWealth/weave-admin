import Loader from "@/components/elements/Loader";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeleteNotificationModal from "./DeleteNotificationModal";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchAllNotifications();

    // Listen for the custom event to close modals
    const handleCloseAllModals = (event) => {
      const { exceptModalId } = event.detail;
      if (exceptModalId !== 'notification-detail-modal') {
        setIsNotificationModalOpen(false);
      }
    };

    document.addEventListener('closeAllModals', handleCloseAllModals);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('closeAllModals', handleCloseAllModals);
    };
  }, []);

  const fetchAllNotifications = async () => {
    setIsFetching(true);

    try {
      const response = await api.get("/notification/admin");
      if (response.status === 200) {
        setNotifications(response.data.notifications);
        return;
      }
      showMessage(response.data.message, "error");
    } catch (error) {
      console.log(error);
      showMessage(error.response?.data?.message || "An error occurred", "error");
    } finally {
      setIsFetching(false);
    }
  };

  const handleDeleteClick = (notification) => {
    router.push(`/users?modal=delete-notification&id=${notification.id}`);
  };

  const openDeleteModal = (notification) => {
    // Close any other open modal
    setIsNotificationModalOpen(false);

    // Open the delete modal
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const handleDeleteNotification = async () => {
    if (isDeleting || !selectedNotification) return;

    setIsDeleting(true);
    try {
      const response = await api.delete(`/notification/${selectedNotification.id}`);
      if (response.status === 200) {
        setNotifications(notifications.filter(notification => notification.id !== selectedNotification.id));
        showMessage("Notification deleted successfully", "success");
        closeModal();
      } else {
        showMessage(response.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      showMessage(error.response?.data?.message || "Failed to delete notification", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const showMessage = (message, type) => {
    console.log(`${type}: ${message}`);
  };

  // Add this function to open the notification detail modal
  const openNotificationModal = (notification) => {
    setSelectedNotification(notification);
    setIsNotificationModalOpen(true);
  };

  return (
    <div>
      <h6 className="text-2xl font-rubikBold">Notifications</h6>
      <div className="flex flex-col space-y-2 mt-4">
        {isFetching ? (
          <Loader />
        ) : notifications.length === 0 ? (
          <div className="my-8">
            <div className="font-rubikMedium text-center">
              No notifications yet{" "}
            </div>
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <div
                key={notification.id || Math.random()}
                className="p-4"
                style={{ background: "#f9f9f9", borderRadius: 5 }}
              >
                {/* Date and trash icon in the same row */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-xs font-rubikRegular">
                    {new Date(notification.created_at).toDateString()}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(notification);
                    }}
                    aria-label="Delete notification"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>

                <div
                  className="cursor-pointer"
                  onClick={() => openNotificationModal(notification)}
                >
                  <h6 className="font-rubikMedium my-2">
                    {notification.title}
                  </h6>

                  <p className="text-gray-500 text-sm">{notification.content}</p>
                  <div className="my-2">
                    <span className="p-1 px-4 text-sm text-base-white bg-weave-primary rounded-full inline-block capitalize">
                      {notification.recipient}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

     

      {isNotificationModalOpen && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="notification-detail-modal">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <h3 className="text-lg font-bold mb-2">{selectedNotification.title}</h3>
            <p className="text-gray-600 mb-4">{selectedNotification.content}</p>
            <button
              onClick={() => setIsNotificationModalOpen(false)}
              className="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;