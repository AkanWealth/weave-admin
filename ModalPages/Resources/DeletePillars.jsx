import { useModalContext } from "@/components/elements/Modal";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { useToastContext } from "@/contexts/toast";

function DeletePillar() {
    const [loading, setLoading] = useState(false);
    const [pillarData, setPillarData] = useState(null);
    const [fetchingData, setFetchingData] = useState(true);
    const params = useSearchParams();
    const pillarId = params.get("id");

    const router = useRouter();
    const { showMessage } = useToastContext();

    // Fetch pillar data to show name in confirmation
    useEffect(() => {
        if (pillarId) {
            fetchPillarData();
        }
    }, [pillarId]);

    const fetchPillarData = async () => {
        try {
            setFetchingData(true);
            const response = await api.get(`/api/pillars/${pillarId}`);
            setPillarData(response.data);
        } catch (error) {
            console.error('Error fetching pillar data:', error);
            showMessage({
                type: 'error',
                text: 'Failed to load pillar data'
            });
        } finally {
            setFetchingData(false);
        }
    };

    const invokeDelete = async () => {
        if (!pillarId) {
            showMessage({
                type: 'error',
                text: 'No pillar selected for deletion'
            });
            return;
        }

        setLoading(true);
        try {
            const response = await api.delete(`/api/pillars/${pillarId}`);

            if (response.status === 200 || response.status === 204) {
                showMessage({
                    type: 'success',
                    text: 'Pillar deleted successfully'
                });
                
                setTimeout(() => {
                    router.push("/contentsManagement?refresh=" + Date.now());
                }, 100);
                return;
            }
            
            showMessage({
                type: 'error',
                text: 'Error deleting pillar. Please try again later'
            });
        } catch (error) {
            console.error('Error deleting pillar:', error);
            
            let errorMessage = 'An unexpected error occurred';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.status === 404) {
                errorMessage = 'Pillar not found';
            } else if (error.response?.status === 403) {
                errorMessage = 'You do not have permission to delete this pillar';
            } else if (error.response?.status === 409) {
                errorMessage = 'Cannot delete pillar as it contains content items';
            }

            showMessage({
                type: 'error',
                text: errorMessage
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    if (fetchingData) {
        return (
            <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center py-8">
                    <div className="text-gray-600">Loading pillar information...</div>
                </div>
            </div>
        );
    }

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
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Pillar</h2>
                    {pillarData && (
                        <p className="font-semibold text-black mb-1">
                            Are you sure you want to delete "{pillarData.name}"?
                        </p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">
                        This will permanently remove this pillar and all associated subcategories and content within it. This action cannot be undone.
                    </p>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
                <button
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCancel}
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center ${
                        loading 
                            ? 'bg-red-400 cursor-not-allowed' 
                            : 'bg-red-500 hover:bg-red-600'
                    } text-white`}
                    onClick={invokeDelete}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Deleting...
                        </>
                    ) : (
                        'Delete Pillar'
                    )}
                </button>
            </div>
        </div>
    );
}

export default DeletePillar;