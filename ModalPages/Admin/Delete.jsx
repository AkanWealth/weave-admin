import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useToastContext } from "@/contexts/toast";

function DeleteAdmin() {
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const btndisabled = loading || confirmText !== "DELETE";
  const params = useSearchParams();
  const userId = params.get("id");

  const router = useRouter();
  const { showMessage } = useToastContext();

  const invokeDelete = async () => {
    setLoading(true);
    try {
      // const response = await api.delete(`/super-admin/${userId}`);
      const response = await api.delete(`/usage-analytics/delete/${userId}`);

      if (response.status === 200) {
        showMessage("User deleted","The user account has been deleted successfully.", "success");
        return;
      }

      console.log(response);
      showMessage("Error deleting user", "Please try again later","error");
    } catch (error) {
      console.log(error);
      showMessage("Error deleting the user", "Please try again later","error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-sm">
      <div className="flex" style={{ gap: 20 }}>
        <div
          style={{
            width: 50,
            height: 50,
            background: "#FFDEDE",
            borderRadius: "50%",
            display: "flex",
          }}
        >
          <i className="fa fa-trash m-auto"></i>
        </div>
        <div className="">
          <h4 className="font-rubikMedium text-xl">Delete Admin User</h4>
          <p className="text-gray-500">
            Are you sure you want to delete this account? This user will be
            deleted from the system
          </p>
        </div>
      </div>
      <div className="text-gray-700 my-4">
        To confirm this, type "DELETE"
        <input
          type="text"
          className="border border-black p-2 w-full rounded-md my-2"
          placeholder="Enter text"
          onChange={(e) => setConfirmText(e.target.value)}
        />
      </div>
      <div className="flex" style={{ gap: 10 }}>
        <div className="flex-1">
          <button
            className="text-base-white py-2 w-full font-rubikMedium rounded-md"
            style={{
              background: btndisabled ? "#e68b7e" : "#d44f3d",
            }}
            disabled={btndisabled}
            onClick={() => invokeDelete()}
          >
            Confirm
          </button>
        </div>
        <div className="flex-1">
          <button
            className="border border-black py-2 w-full font-rubikMedium rounded-md"
            onClick={() => router.back()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAdmin;
