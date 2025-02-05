import { useModalContext } from "@/components/elements/Modal";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function ActivateAppUser() {
  const params = useSearchParams();
  const userId = params.get("id");
  const { showMessage } = useModalContext();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const invokeReactivation = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch(`/usage-analytics/activate/${userId}`);
      console.log(response);
      if (response.status === 200) {
        showMessage(
          "User reactivated successfully, refresh to see changes",
          "success"
        );
        router.back();
        return;
      }

      showMessage("Error executing action", "error");
    } catch (err) {
      console.log(err);
      showMessage("Error executing action", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-sm">
      <div className="flex" style={{ gap: 20 }}>
        <div
          style={{
            width: 50,
            minWidth: 50,
            height: 50,
            background: "#eaf6ec",
            borderRadius: "50%",
            display: "flex",
          }}
        >
          <i className="fa fa-user-plus m-auto"></i>
        </div>
        <div className="">
          <h4 className="font-rubikMedium text-xl">Reactivate User</h4>
          <p className="text-gray-500 my-2">
            Reactivating this user will restore their access to the App. You can
            deactivate their account later if needed.
          </p>
        </div>
      </div>

      <div className="flex my-6" style={{ gap: 10 }}>
        <div className="flex-1">
          <button
            className={`bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md`}
            onClick={() => invokeReactivation()}
            disabled={loading}
          >
            {loading ? "Please wait..." : "Activate"}
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

export default ActivateAppUser;
