import AddAdmin from "@/ModalPages/Admin/Add";
import DeleteAdmin from "@/ModalPages/Admin/Delete";
import EditAdmin from "@/ModalPages/Admin/Edit";
import SuspendAdmin from "@/ModalPages/Admin/Suspend";
import ActivateAppUser from "@/ModalPages/App_User/Activate";
import DeleteAppUser from "@/ModalPages/App_User/Delete";
import SuspendAppUser from "@/ModalPages/App_User/Suspend";
import AddNotification from "@/ModalPages/Notification/Add";
import Notifications from "@/ModalPages/Notification/List";
import AddContent from "@/ModalPages/Resources/Add";
import ContentInfo from "@/ModalPages/Resources/ContentInfo";
import DeleteResource from "@/ModalPages/Resources/Delete";
import EditResource from "@/ModalPages/Resources/Edit";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const ModalContext = createContext();

export default function Modal() {
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

  const searchParams = useSearchParams();
  const usage = searchParams.get("modal");

  const router = useRouter();
  const onClose = () => {
    router.back();
  };

  return (
    <ModalContext.Provider value={{ showMessage }}>
      {usage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            overflow: "auto",
            padding: 100,
            paddingTop: "10%",
          }}
          onClick={onClose}
        >
          {usage === "notifications" ? (
            <div
              className="bg-base-white p-4 md:p-8 rounded-xl absolute top-16"
              style={{
                width: "80%",
                maxWidth: "400px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="float-right">
                <button className="text-2xl text-gray-700" onClick={onClose}>
                  &times;
                </button>
              </div>
              <Notifications />
            </div>
          ) : (
            <div
              className="bg-base-white p-4 md:p-8 rounded-xl"
              style={{
                width: "80%",
                maxWidth:
                  usage.startsWith("delete") || usage.startsWith("suspend")
                    ? "500px"
                    : "750px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="float-right">
                <button className="text-2xl text-gray-700" onClick={onClose}>
                  &times;
                </button>
              </div>

              <div className="clear-both">
                <ModalContent usage={usage} />
              </div>
            </div>
          )}
          {/* <div
        className="bg-base-white p-4 md:p-8 rounded-xl"
        style={{
          width: "80%",
          maxWidth:
            usage.startsWith("delete") || usage.startsWith("suspend")
              ? "500px"
              : "750px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="float-right">
          <button className="text-2xl text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="clear-both">
          <ModalContent usage={usage} />
        </div>
      </div> */}
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </ModalContext.Provider>
  );
}

const ModalContent = ({ usage, params }) => {
  if (usage === "delete-app-user") return <DeleteAppUser />;
  if (usage === "activate-app-user") return <ActivateAppUser />;
  if (usage === "suspend-app-user") return <SuspendAppUser />;
  if (usage === "add-admin") return <AddAdmin />;
  if (usage === "add-admin") return <AddAdmin />;
  if (usage === "delete-admin") return <DeleteAdmin />;
  if (usage === "edit-admin") return <EditAdmin />;
  if (usage === "suspend-admin") return <SuspendAdmin />;
  if (usage === "delete-resource") return <DeleteResource />;
  if (usage === "add-content") return <AddContent />;
  if (usage === "add-content-info") return <ContentInfo />;
  if (usage === "edit-resource") return <EditResource />;
  if (usage === "add-notification") return <AddNotification />;
};

export const useModalContext = () => useContext(ModalContext);
