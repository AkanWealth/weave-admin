import { useToastContext } from "@/contexts/toast";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { UserRoundX } from "lucide-react";

function SuspendAppUser() {
  const params = useSearchParams();
  const userId = params.get("id");
  const { showMessage } = useToastContext();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const invokeSuspension = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch(`/usage-analytics/deactivate/${userId}`);
      console.log(response);
      if (response.status === 200) {
        showMessage(
          "User suspended successfully", "",
          "success"
        );
        setTimeout(() => {
          router.push("/dashboard/users?refresh=" + Date.now());
        }, 100);
        return;

        
      }

      showMessage("Error executing action","Try Again", "error");
    } catch (err) {
      console.log(err);
      showMessage("Error executing action", "Try Again","error");
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
            color: 'red',
            display: "flex",
          }}
        >
          <UserRoundX className="fa fa-user-plus m-auto"/>
        </div>
        <div className="">
          <h4 className="font-rubikMedium text-xl">Deactivate User</h4>
          <p className="text-gray-500 my-2">
            Deactivating this user will restrict their access to the App. You
            can reactivate their account later if needed.
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
            {loading ? "Please wait" : "Deactivate"}
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

export default SuspendAppUser;
