import api from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function NotificationIcon() {
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    console.log("fetching notifications");
    try {
      const response = await api.get("/notification/admin");
      if (response.status === 200) {
        setNotifications(response.data.notifications);
        console.log(response.data.notifications);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const router = useRouter();

  return (
    <div className="relative">
      <button
        className="relative p-1"
        onClick={() => router.push("?modal=notifications")}
      >
        <span className="absolute bg-red-400 text-xs h-[17px] w-[17px] flex items-center justify-center rounded-full -top-1 -right-1 text-white">
          {notifications.length}
        </span>
        <i className="fa fa-bell-o text-gray-600"></i>
      </button>
    </div>
  );
}

export default NotificationIcon;
