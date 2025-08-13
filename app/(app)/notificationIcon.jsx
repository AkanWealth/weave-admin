// import api from "@/lib/api";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// function NotificationIcon() {
//   const [notifications, setNotifications] = useState([]);
//   const fetchNotifications = async () => {
//     console.log("fetching notifications");
//     try {
//       const response = await api.get("/notification/admin");
//       if (response.status === 200) {
//         setNotifications(response.data.notifications);
//         console.log(response.data.notifications);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const router = useRouter();

//   return (
//     <div className="relative">
//       <button
//         className="relative p-1"
//         onClick={() => router.push("?modal=notifications")}
//       >
//         <span className="absolute bg-red-400 text-xs h-[17px] w-[17px] flex items-center justify-center rounded-full -top-1 -right-1 text-white">
//           {notifications.length}
//         </span>
//         <i className="fa fa-bell-o text-gray-600"></i>
//       </button>
//     </div>
//   );
// }

// export default NotificationIcon;



// import api from "@/lib/api";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// function NotificationIcon() {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [isFetching, setIsFetching] = useState(false);

//   const fetchNotifications = async () => {
//     if (isFetching) return;
    
//     setIsFetching(true);
//     console.log("fetching notifications");
//     try {
//       const response = await api.get("/notification/admin");
//       if (response.status === 200) {
//         setNotifications(response.data.notifications);
//         console.log(response.data.notifications);
//       }
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const fetchUnreadCount = async () => {
//     try {
//       const response = await api.get("/notification/notifications/unread/count");
//       if (response.status === 200) {
//         setUnreadCount(response.data.count || 0);
//       }
//     } catch (error) {
//       console.error("Error fetching unread count:", error);
//       // Fallback to calculating from notifications array if endpoint fails
//       const unread = notifications.filter(notification => !notification.is_read).length;
//       setUnreadCount(unread);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     fetchUnreadCount();

//     // Set up polling to periodically check for new notifications
//     const interval = setInterval(() => {
//       fetchUnreadCount();
//     }, 30000); // Check every 30 seconds

//     return () => clearInterval(interval);
//   }, []);

//   // Update unread count when notifications change
//   useEffect(() => {
//     if (notifications.length > 0) {
//       fetchUnreadCount();
//     }
//   }, [notifications]);

//   const router = useRouter();

//   return (
//     <div className="relative">
//       <button
//         className="relative p-1"
//         onClick={() => router.push("?modal=notifications")}
//         aria-label={`Notifications (${unreadCount} unread)`}
//       >
//         {unreadCount > 0 && (
//           <span className="absolute bg-red-400 text-xs h-[17px] w-[17px] flex items-center justify-center rounded-full -top-1 -right-1 text-white">
//             {unreadCount > 99 ? '99+' : unreadCount}
//           </span>
//         )}
//         <i className={`fa ${unreadCount > 0 ? 'fa-bell' : 'fa-bell-o'} text-gray-600`}></i>
//       </button>
//     </div>
//   );
// }

// export default NotificationIcon;



import api from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function NotificationIcon() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const fetchNotifications = async () => {
    if (isFetching) return;
    
    setIsFetching(true);
    console.log("fetching notifications");
    try {
      const response = await api.get("/notification/admin");
      if (response.status === 200) {
        setNotifications(response.data.notifications);
        console.log(response.data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get("/notification/notifications/unread");
      if (response.status === 200) {
        setUnreadCount(response.data.count || 0);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
      // Fallback to calculating from notifications array if endpoint fails
      const unread = notifications.filter(notification => !notification.isRead).length;
      setUnreadCount(unread);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();

    // Set up polling to periodically check for new notifications
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Update unread count when notifications change
  useEffect(() => {
    if (notifications.length > 0) {
      fetchUnreadCount();
    }
  }, [notifications]);

  const router = useRouter();

  return (
    <div className="relative">
      <button
        className="relative p-1"
        onClick={() => router.push("?modal=notifications")}
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        {unreadCount > 0 && (
          <span className="absolute bg-red-400 text-xs h-[17px] w-[17px] flex items-center justify-center rounded-full -top-1 -right-1 text-white">
            {unreadCount}
          </span>
        )}
        <i className={`fa ${unreadCount > 0 ? 'fa-bell' : 'fa-bell-o'} text-gray-600`}></i>
      </button>
    </div>
  );
}

export default NotificationIcon;