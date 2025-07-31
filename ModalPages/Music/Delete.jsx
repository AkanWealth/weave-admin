// import { useModalContext } from "@/components/elements/Modal";
// import api from "@/lib/api";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useState } from "react";
// import { Trash } from "lucide-react";
// import { useToastContext } from "@/contexts/toast";

// function DeleteMusic() {
//     const [loading, setLoading] = useState(false);
//     const params = useSearchParams();
//     const userId = params.get("id");

//     const router = useRouter();
//     const { showMessage } = useToastContext();

//     const invokeDelete = async () => {
//         setLoading(true);
//         try {
//             const response = await api.delete(`/usage-analytics/delete/${userId}`);

//             if (response.status === 200) {
//                 showMessage("Sponsor Deleted", "The sponsor has been deleted successfully.", "success");
//                 setTimeout(() => {
//                     router.push("/sponsors?refresh=" + Date.now());
//                 }, 100);
//                 return;
//             }
//             showMessage("Error deleting sponsor", "Please try again later", "error");
//         } catch (error) {
//             showMessage("Error deleting the sponsor", error.message || "An unexpected error occurred", "error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto">
//             {/* Header with icon and title */}
//             <div className="flex items-start gap-4 mb-6">
//                 <div
//                     className="flex p-2 items-center justify-center w-12 h-12 rounded-full"
//                     style={{ backgroundColor: '#FFDEDE' }}
//                 >
//                     <Trash className="w-6 h-6 text-red-500" />
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Music</h2>
//                     <p className="font-semibold text-black">Are you sure you want to remove ReCreaX?</p>
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                         {/* <br /> */}
//                         This action will remove their logo from the General and Sponsorship Page.
//                     </p>
//                 </div>
//             </div>

//             {/* Action buttons */}
//             <div className="flex gap-3">
//                 <button
//                     className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     onClick={() => router.back()}
//                 //   disabled={loading}
//                 >
//                     Cancel
//                 </button>
//                 <button
//                     className="flex-1 bg-red-500 text-white px-4 py-2 text-sm font-medium rounded-md "
//                 //   onClick={invokeDelete}
//                 //   disabled={loading}
//                 >
//                     Confirm
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default DeleteMusic;




"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Trash } from "lucide-react";
import api from "@/lib/api";
import { useToastContext } from "@/contexts/toast";

function DeleteMusic() {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const resourceId = params.get("resource_id");

  const router = useRouter();
  const { showMessage } = useToastContext();

  const invokeDelete = async () => {
    if (!resourceId) {
      showMessage("Error", "No song ID provided", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await api.delete(`/songs/${resourceId}`);

      if (response.status === 200 || response.status === 204) {
        showMessage("Song Deleted", "The song has been deleted successfully.", "success");
        setTimeout(() => {
          router.push("/contentsManagement?refresh=" + Date.now());
        }, 1000);
      } else {
        showMessage("Error deleting song", "Please try again later", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showMessage("Error deleting the song", error.response?.data?.message || "An unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex p-2 items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: "#FFDEDE" }}>
          <Trash className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Song</h2>
          <p className="font-semibold text-black">Are you sure you want to delete this song?</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            This action will permanently remove the song from the music library.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="flex-1 bg-red-500 text-white px-4 py-2 text-sm font-medium rounded-md"
          onClick={invokeDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}

export default DeleteMusic;