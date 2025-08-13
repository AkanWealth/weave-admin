"use client";
import { useState, useEffect } from 'react';
import { CheckCircle, X, Home } from 'lucide-react';

export const PaymentSuccessModal = ({ 
  isOpen, 
  onClose, 
  sessionId 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 100);
      document.body.style.overflow = 'hidden';
      
      // Optional: Auto-close countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            handleGoHome(); // Auto close when countdown reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        document.body.style.overflow = 'unset';
        clearInterval(timer);
      };
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Handle ESC key to close modal only (not window)
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  const handleGoHome = () => {
    // Close modal first with animation
    setIsVisible(false);
    
    // Wait for modal close animation, then close window/tab
    setTimeout(() => {
      onClose();
      
      // Try multiple methods to close the window/tab
      setTimeout(() => {
        try {
          // Method 1: Standard window.close()
          window.close();
        } catch (e) {
          console.log('window.close() failed, trying alternatives...');
          
          try {
            // Method 2: Navigate to blank page (works in some browsers)
            window.location.href = 'about:blank';
            window.close();
          } catch (e2) {
            try {
              // Method 3: Try to navigate away
              window.location.replace('about:blank');
            } catch (e3) {
              // Method 4: Open a new window and close current (last resort)
              try {
                window.open('', '_self');
                window.close();
              } catch (e4) {
                // If all methods fail, show user instruction
                alert('Please close this tab manually by clicking the X button or pressing Ctrl+W (Cmd+W on Mac).');
              }
            }
          }
        }
      }, 100);
    }, 300);
  };

  const handleModalClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleModalClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transition-all duration-500 ease-out transform ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-8'
        }`}
      >
        {/* Close Button (X) - Only closes modal, not window */}
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Success Icon with Animation */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6 relative">
            <CheckCircle className="w-14 h-14 text-green-600" />
            {/* Animated success rings */}
            <div className="absolute inset-0 rounded-full border-2 border-green-200 animate-ping opacity-30" />
            <div className="absolute inset-2 rounded-full border-2 border-green-300 animate-ping opacity-40" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-4 rounded-full border-2 border-green-400 animate-ping opacity-50" style={{ animationDelay: '1s' }} />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            🎉 Payment Successful!
          </h2>
          
          {/* Description */}
          <p className="text-lg text-gray-600 mb-2">
            Your subscription has been activated successfully.
          </p>
          
          <p className="text-sm text-gray-500 mb-6">
            Welcome aboard! Your payment has been processed.
          </p>
          
          {/* Session ID Display */}
          {sessionId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border">
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Transaction ID</p>
              <p className="text-sm font-mono text-gray-700 break-all">
                {sessionId.length > 24 ? `...${sessionId.slice(-20)}` : sessionId}
              </p>
            </div>
          )}

          {/* Countdown Display */}
          <div className="bg-blue-50 rounded-lg p-3 mb-6 border border-blue-200">
            <p className="text-sm text-blue-700">
              🕒 Auto-closing in {countdown} seconds
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Primary Button - Go Home (Closes Window) */}
            <button
              onClick={handleGoHome}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 
                         hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium text-lg
                         transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Close & Go Home
            </button>
            
            {/* Secondary Button - Just Close Modal */}
            <button
              onClick={handleModalClose}
              className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium 
                         transition-all duration-200 hover:scale-105 border border-gray-300"
            >
              Continue on This Page
            </button>
          </div>

          {/* Info Text */}
          <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-700">
              💡 <strong>"Close & Go Home"</strong> will close this tab/window<br/>
              <strong>"Continue on This Page"</strong> keeps the tab open
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;