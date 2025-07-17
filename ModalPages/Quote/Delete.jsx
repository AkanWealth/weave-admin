import { useModalContext } from "@/components/elements/Modal";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Trash } from "lucide-react";
import { useToastContext } from "@/contexts/toast";

function DeleteQuote() {
    const [loading, setLoading] = useState(false);
    const params = useSearchParams();
    const userId = params.get("id");

    const router = useRouter();
    const { showMessage } = useToastContext();

    const invokeDelete = async () => {
        setLoading(true);
        try {
            const response = await api.delete(`/usage-analytics/delete/${userId}`);

            if (response.status === 200) {
                showMessage("Sponsor Deleted", "The sponsor has been deleted successfully.", "success");
                setTimeout(() => {
                    router.push("/sponsors?refresh=" + Date.now());
                }, 100);
                return;
            }
            showMessage("Error deleting sponsor", "Please try again later", "error");
        } catch (error) {
            showMessage("Error deleting the sponsor", error.message || "An unexpected error occurred", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            {/* Header with icon and title */}
            <div className="flex items-start gap-4 mb-6">
                <div
                    className="flex p-2 items-center justify-center w-12 h-12 rounded-full"
                    style={{ backgroundColor: '#FFDEDE' }}
                >
                    <Trash className="w-6 h-6 text-red-500" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete this Item? </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Are you sure you want to delete this? This action cannot be undone.
                    </p>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
                <button
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => router.back()}
                //   disabled={loading}
                >
                    Cancel
                </button>
                <button
                    className="flex-1 bg-red-500 text-white px-4 py-2 text-sm font-medium rounded-md "
                //   onClick={invokeDelete}
                //   disabled={loading}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default DeleteQuote;