"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle, Home } from "lucide-react";

export default function PaymentCancel() {
  const [isVisible, setIsVisible] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    if (!session_id) {
      setError("No payment session ID provided");
      setIsLoading(false);
    //   setTimeout(() => router.push("/"), 2000);
      return;
    }

    setSessionId(session_id);
    setIsLoading(false);
    setTimeout(() => setIsVisible(true), 100);
  }, [searchParams, router]);

//   const handleRetryPayment = () => {
//     router.push("/payment"); // Adjust to your payment page route
//   };

  const handleGoHome = () => {
    // router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-red-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Canceled</h1>
          <p className="text-lg text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleGoHome}
            aria-label="Go to home page"
            className="flex items-center justify-center px-6 py-3 bg-gray-100 
                       border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 
                       transition-all duration-300 hover:scale-105 font-medium"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-red-100 to-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #f00404ff 0%, transparent 40%), 
                            radial-gradient(circle at 80% 70%, #ce1a1aff 0%, transparent 40%)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div
          className={`max-w-lg mx-auto transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          } bg-white rounded-2xl shadow-xl p-8`}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <XCircle className="w-12 h-12 text-red-600 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Payment Canceled
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Your payment process was canceled. No charges were made.
            </p>
            {/* {sessionId && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 font-medium text-sm">
                  Payment Session ID: <span className="font-mono">{sessionId}</span>
                </p>
              </div>
            )} */}
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleRetryPayment}
              aria-label="Retry payment"
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r 
                         from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 
                         hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-md 
                         font-medium"
            >
              Retry Payment
              <ArrowLeft className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={handleGoHome}
              aria-label="Go to home page"
              className="flex items-center justify-center px-6 py-3 bg-gray-100 
                         border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 
                         transition-all duration-300 hover:scale-105 font-medium"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </button>
          </div> */}

          {/* <div className="text-center mt-6 text-gray-500 text-sm">
            <p>
              Need assistance? Contact{" "}
              <a
                href="mailto:support@founderthrive.com"
                className="text-blue-600 hover:underline"
              >
                support@founderthrive.com
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}