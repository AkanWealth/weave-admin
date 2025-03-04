import { useModalContext } from "@/components/elements/Modal";
import ResourceLibraryProvider, {
  useResourceLibrary,
} from "@/contexts/ResourceLibraryContext";
import { ToastContext } from "@/contexts/toast";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function DeleteResource() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get("resource_id");
  const [deleting, setDeleting] = useState(false);
  const { resources } = useResourceLibrary();
  const [resourceInfo, setResourceInfo] = useState(null);
  const { closeModal, showMessage } = useModalContext();

  useEffect(() => {
    const resource = resources.find((resource) => resource.id === itemId);
    setResourceInfo(resource);
  }, [itemId]);

  const deleteResource = async () => {
    setDeleting(true);
    try {
      const response = await api.delete(`/resource-library/${itemId}`);
      showMessage(response.data.message, "success");
      closeModal();
    } catch (error) {
      console.log(error);
      showMessage("Error deleting resource", "error");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="text-sm">
      <div className="flex" style={{ gap: 20 }}>
        <div
          style={{
            minWidth: 50,
            height: 50,
            background: "#FFDEDE",
            borderRadius: "50%",
            display: "flex",
          }}
        >
          <i className="fa fa-trash m-auto"></i>
        </div>
        <div className="">
          <h4 className="font-rubikMedium text-xl">Delete Resource</h4>
          <p className="text-gray-500 my-4">
            Are you sure you want to delete this resource? This action cannot be
            undone.
          </p>
        </div>
      </div>
      {resourceInfo && (
        <div className="text-gray-700 my-4 w-2/3 mx-auto font-rubikRegular text-md">
          <div className="flex flex-row my-2" style={{ gap: 6 }}>
            <div className="w-1/6 text-right">
              {" "}
              <i className="fa fa-briefcase mr-3"></i> Title:
            </div>
            <div className="w-5/6">{resourceInfo.title}</div>
          </div>
          <div className="flex flex-row my-2" style={{ gap: 6 }}>
            <div className="w-1/6 text-right">
              {" "}
              <i className="fa fa-tag mr-3"></i> Type:
            </div>
            <div className="w-5/6">{resourceInfo.resourceType}</div>
          </div>
          <div className="flex flex-row my-2" style={{ gap: 6 }}>
            <div className="w-1/6 text-right">
              {" "}
              <i className="fa fa-paperclip mr-3"></i> Tags:
            </div>
            <div className="w-5/6">
              {resourceInfo.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex" style={{ gap: 10 }}>
        <div className="flex-1">
          <button
            className="bg-red-500 text-base-white py-2 w-full font-rubikMedium rounded-md"
            onClick={() => {
              deleteResource();
            }}
          >
            {deleting ? "Deleting" : "Confirm"}
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

export default function Delete() {
  return (
    <ToastContext>
      <ResourceLibraryProvider>
        <DeleteResource />
      </ResourceLibraryProvider>
    </ToastContext>
  );
}
