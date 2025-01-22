import React from "react";

function Notifications() {
  const notifications = [
    {
      date: "12-12-2020",
      content:
        "CKEditor 5 boasts a modern and feature-rich design, complete with a clean and intuitive user interface. It stands out for its collaboration features, making it an excellent choice for projects requiring real-time editing. However, developers should consider the larger bundle size compared to some alternatives.",
      title: "CKEditor",
      recipients: "All Users",
    },
    {
      date: "12-12-2020",
      content:
        "CKEditor 5 boasts a modern and feature-rich design, complete with a clean and intuitive user interface. It stands out for its collaboration features, making it an excellent choice for projects requiring real-time editing. However, developers should consider the larger bundle size compared to some alternatives.",
      title: "CKEditor",
      recipients: "All Users",
    },
    {
      date: "12-12-2020",
      content:
        "CKEditor 5 boasts a modern and feature-rich design, complete with a clean and intuitive user interface. It stands out for its collaboration features, making it an excellent choice for projects requiring real-time editing. However, developers should consider the larger bundle size compared to some alternatives.",
      title: "CKEditor",
      recipients: "All Users",
    },
    {
      date: "12-12-2020",
      content:
        "CKEditor 5 boasts a modern and feature-rich design, complete with a clean and intuitive user interface. It stands out for its collaboration features, making it an excellent choice for projects requiring real-time editing. However, developers should consider the larger bundle size compared to some alternatives.",
      title: "CKEditor",
      recipients: "All Users",
    },
    {
      date: "12-12-2020",
      content:
        "CKEditor 5 boasts a modern and feature-rich design, complete with a clean and intuitive user interface. It stands out for its collaboration features, making it an excellent choice for projects requiring real-time editing. However, developers should consider the larger bundle size compared to some alternatives.",
      title: "CKEditor",
      recipients: "All Users",
    },
    {
      date: "12-12-2020",
      content:
        "CKEditor 5 boasts a modern and feature-rich design, complete with a clean and intuitive user interface. It stands out for its collaboration features, making it an excellent choice for projects requiring real-time editing. However, developers should consider the larger bundle size compared to some alternatives.",
      title: "CKEditor",
      recipients: "All Users",
    },
    {
      date: "12-12-2020",
      content:
        "CKEditor 5 boasts a modern and feature-rich design, complete with a clean and intuitive user interface. It stands out for its collaboration features, making it an excellent choice for projects requiring real-time editing. However, developers should consider the larger bundle size compared to some alternatives.",
      title: "CKEditor",
      recipients: "All Users",
    },
  ];

  return (
    <div>
      <h6 className="text-2xl font-rubikBold">Notifications</h6>
      <div className="flex flex-col space-y-6">
        {notifications.length === 0 ? (
          <div className="my-8">
            <div className="font-rubikMedium text-center">
              No notifications yet{" "}
            </div>
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <div key={Math.random()}>
                <p className="my-2  text-gray-500 text-sm">
                  {notification.date}
                </p>
                <h6
                  className="font-rubikMedium my-2"
                  style={{ position: "relative" }}
                >
                  {notification.title}

                  <button
                    className="text-red-500 p-2"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 20,
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </h6>

                <p className="text-gray-500 text-sm">{notification.content}</p>
                <div className="my-2">
                  <span className="p-1 px-4 text-sm text-base-white bg-weave-primary rounded-full inline-block ">
                    {notification.recipients}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Notifications;
