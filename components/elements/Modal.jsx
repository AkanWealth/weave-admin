import AddAdmin from "@/ModalPages/Admin/Add";
import DeleteAdmin from "@/ModalPages/Admin/Delete";
import EditAdmin from "@/ModalPages/Admin/Edit";
import SuspendAdmin from "@/ModalPages/Admin/Suspend";
import ActivateAppUser from "@/ModalPages/App_User/Activate";
import DeleteAppUser from "@/ModalPages/App_User/Delete";
import SendMessage from "@/ModalPages/App_User/SendMessage";
import SuspendAppUser from "@/ModalPages/App_User/Suspend";
import AddNotification from "@/ModalPages/Notification/Add";
import Notifications from "@/ModalPages/Notification/List";
import AddSponsor from "@/ModalPages/Sponsors/Add";
import AddContent from "@/ModalPages/Resources/Add";
import ContentInfo from "@/ModalPages/Resources/ContentInfo";
import DeleteResource from "@/ModalPages/Resources/Delete";
import EditResource from "@/ModalPages/Resources/Edit";
import AddMusic from "@/ModalPages/Music/Add";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import EditSponsor from "@/ModalPages/Sponsors/Edit";
import DeleteSponsor from "@/ModalPages/Sponsors/Delete";
import PreviewSponsor from "@/ModalPages/Sponsors/Preview";
import DeleteMusic from "@/ModalPages/Music/Delete";
import EditMusic from "@/ModalPages/Music/Edit";
import AddQuote from "@/ModalPages/Quote/Add";
import DeleteQuote from "@/ModalPages/Quote/Delete";
import AddTip from "@/ModalPages/Quote/AddTip";
import EditTip from "@/ModalPages/Quote/Edit";
import ViewDetailsModal from "@/ModalPages/Subscriber/ViewDetails";
import ExportModal from "@/ModalPages/Subscriber/ExportModal";
import AddContentPillars from "@/ModalPages/Resources/AddPillar";
import DeletePillar from "@/ModalPages/Resources/DeletePillars";
import EditContentPillars from "@/ModalPages/Resources/EditPillars";
import ViewContentPillars from "@/ModalPages/Resources/ViewPillars";
import DeleteNotificationModal from "@/ModalPages/Notification/DeleteNotificationModal";
import ActivateSponsor from "@/ModalPages/Sponsors/Activate";
import DeactivateSponsor from "@/ModalPages/Sponsors/Deactivate";
import ViewDetail from "@/ModalPages/Sponsors/Preview";

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
    <ModalContext.Provider value={{ showMessage, closeModal: onClose }}>
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
                maxHeight: "85vh",
                overflow: "auto",
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
                maxHeight: "85vh", // Add max height
                overflow: "auto",
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

      {/* <ToastContainer
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
      /> */}
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
  if (usage === "add-music") return <AddMusic />;
  if (usage === "add-content") return <AddContent />;
  if (usage === "add-content-info") return <ContentInfo />;
  if (usage === "edit-resource") return <EditResource />;
  if (usage === "add-notification") return <AddNotification />;
  if (usage === "send-message") return <SendMessage />;
  if (usage === "delete-notification") return <DeleteNotificationModal/>;
  if(usage === "add-sponsor") return <AddSponsor />;
  if (usage === "edit-sponsor") return <EditSponsor />;
  if (usage === "delete-sponsor") return <DeleteSponsor />;
  if (usage === "preview-sponsor") return <PreviewSponsor />;
  if (usage === "delete-music") return <DeleteMusic />;
  if (usage === "edit-music") return <EditMusic />;
  if (usage === "add-quote") return <AddQuote />;
  if (usage === "delete-quote") return <DeleteQuote />;
  if (usage === "add-tip") return <AddTip />; 
  if (usage === "edit-tip") return <EditTip />;
  if (usage === "view-subscriber-details") return <ViewDetailsModal />;
  if (usage === "export") return <ExportModal />;
  if (usage === "add-content-pillars") return <AddContentPillars />;  
  if (usage === "delete-pillars") return <DeletePillar />;
  if (usage === "edit-content-pillars") return <EditContentPillars />;
  if (usage === "view-content-pillars") return <ViewContentPillars />;
  if (usage === "activate-sponsor") return <ActivateSponsor />;
  if (usage === "deactivate-sponsor") return <DeactivateSponsor />;
  if (usage === "view-sponsor-details") return <ViewDetail />;
};

export const useModalContext = () => useContext(ModalContext);
