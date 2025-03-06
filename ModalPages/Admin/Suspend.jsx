import { useModalContext } from "@/components/elements/Modal";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPen } from "lucide-react";
import React, { useState } from "react";

function SuspendAdmin() {
  const params = useSearchParams();
  const userId = params.get("id");
  const { showMessage } = useModalContext();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const invokeSuspension = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch(`/usage-analytics/deactivate/${userId}`);
      if (response.status === 200) {
        showMessage("User suspended successfully", "success");
        router.back();
        return;
      }

      showMessage("Error executing action", "error");
    } catch (err) {
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
            background: "#FFDEDE",
            borderRadius: "50%",
            display: "flex",
          }}
        >
          <i className="fa fa-user-plus m-auto"></i>
        </div>
        <div className="">
          <h4 className="font-rubikMedium text-xl">Suspend User</h4>
          <p className="text-gray-500 my-2">
            Are you sure you want to suspend this admin user? While suspended,
            they will lose access to all admin privileges and will not be able
            to log into the platform.
          </p>
        </div>
      </div>

      <div className="flex my-6" style={{ gap: 10 }}>
        <div className="flex-1">
          <button
            className={`bg-red-500 text-base-white py-2 w-full font-rubikMedium rounded-md`}
            onClick={() => invokeSuspension()}
            disabled={loading}
          >
            {loading ? "Please wait" : "Suspend"}
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

export default SuspendAdmin;
