import Loader from "@/components/elements/Loader";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const fetchAllNotifications = async () => {
    setIsFetching(true);
    // fetch all notifications from the server
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

  const openDeleteModal = (notification) => {
    setSelectedNotification(notification);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedNotification(null);
  };

  const handleDeleteNotification = async () => {
    if (isDeleting || !selectedNotification) return;
    
    setIsDeleting(true);
    try {
      const response = await api.delete(`/notification/${selectedNotification.id}`);
      if (response.status === 200) {
        // Remove the deleted notification from state
        setNotifications(notifications.filter(notification => notification.id !== selectedNotification.id));
        showMessage("Notification deleted successfully", "success");
        closeDeleteModal();
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

  // Utility function for displaying messages
  const showMessage = (message, type) => {
    // Implement your message display logic here
    // This could be a toast notification or other feedback mechanism
    console.log(`${type}: ${message}`);
  };

  useEffect(() => {
    fetchAllNotifications();
  }, []);

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
                    onClick={() => openDeleteModal(notification)}
                    aria-label="Delete notification"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
                
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
            ))}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <i className="fa fa-trash text-red-500 text-xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Delete Notification</h3>
              <p className="text-center text-gray-600">
                Are you sure you want to delete this notification from the system? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={handleDeleteNotification}
                disabled={isDeleting}
                className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
              <button
                onClick={closeDeleteModal}
                className="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;