// "use client";
// import React, { useState, useEffect } from "react";
// import TextField from "@/components/elements/TextField";
// import PasswordField from "@/components/elements/PasswordField";
// import Button from "@/components/elements/Button";
// import Link from "next/link";
// import api, { setAuthTokens, getTokenExpirationStatus } from "@/lib/api";
// import { ToastContext, useToastContext } from "@/contexts/toast";
// import { useRouter } from "next/navigation";

// export default function Page() {
//   return (
//     <ToastContext>
//       <Login />
//     </ToastContext>
//   );
// }

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { showMessage } = useToastContext();
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true);
    
//     // Check if user is already authenticated when component mounts
//     if (typeof window !== "undefined") {
//       const tokenStatus = getTokenExpirationStatus();
//       console.log("Initial token status:", tokenStatus);
      
//       if (tokenStatus.status === 'valid' || tokenStatus.status === 'about_to_expire') {
//         // User has valid tokens, redirect to dashboard
//         const userInfo = localStorage.getItem("userinfo");
//         if (userInfo) {
//           try {
//             const user = JSON.parse(userInfo);
//             if (user.firstName && user.lastName) {
//               router.push("/dashboard");
//             } else {
//               router.push("/setup/profile");
//             }
//           } catch (e) {
//             console.error("Error parsing user info:", e);
//           }
//         }
//       }
//     }
//   }, [router]);

//   const btnDisabled = !isClient || email === "" || password === "" || isLoading;

//   const login = async () => {
//     setIsLoading(true);
//     console.log('StartingA login process...');
    
//     try {
//       console.log('Making login API request...');
      
//       const resp = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       console.log('Login response received:', resp.status);

//       if (resp.status === 200) {
//         // Check user role authorization
//         if (resp.data.user.role === null) {
//           showMessage("Authorised personnels only", "error");
//           return;
//         }

//         // Check if user is verified
//         if (!resp.data.user.verified) {
//           router.push(`/otp?email=${email}&usage=signup`);
//           return;
//         }

//         // // Validate that we have both tokens
//         // if (!resp.data.accessToken || !resp.data.refreshToken) {
//         //   console.error("Missing tokens in login response:", {
//         //     hasAccessToken: !!resp.data.accessToken,
//         //     hasRefreshToken: !!resp.data.refreshToken
//         //   });
//         //   showMessage(
//         //     "Login Failed",
//         //     "Authentication tokens missing. Please contact support.",
//         //     "error"
//         //   );
//         //   return;
//         // }

//         console.log("Login successful, tokens received:");
//         console.log("- Access token:", resp.data.accessToken ? "✓" : "✗");
//         console.log("- Refresh token:", resp.data.refreshToken ? "✓" : "✗");

//         // Set both access token and refresh token
//         setAuthTokens(resp.data.accessToken, resp.data.refreshToken);

//         // Store user info with refresh token for additional redundancy
//         if (typeof window !== "undefined") {
//           const userInfoWithTokens = {
//             ...resp.data.user,
//             refreshToken: resp.data.refreshToken
//           };
//           localStorage.setItem("userinfo", JSON.stringify(userInfoWithTokens));
//           console.log("User info stored successfully");
//         }

//         // Show success message
//         showMessage("Login Successful", "Welcome back!", "success");

//         // Navigate based on user profile completion
//         setTimeout(() => {
//           if (
//             resp.data.user.firstName == null ||
//             resp.data.user.lastName == null
//           ) {
//             console.log("Redirecting to profile setup");
//             router.push("/setup/profile");
//           } else {
//             console.log("Redirecting to dashboard");
//             router.push("/dashboard");
//           }
//         }, 500);

//         return;
//       }

//       // Handle non-200 responses
//       showMessage(
//         "Login Failed",
//         resp.data.message || "Incorrect email or password. Please try again.",
//         "error"
//       );
//     } catch (err) {
//       console.error("Login error details:", {
//         message: err.message,
//         code: err.code,
//         status: err.response?.status,
//         statusText: err.response?.statusText,
//         data: err.response?.data
//       });
      
//       // Detailed error handling
//       let errorMessage = "An unexpected error occurred. Please try again.";
//       let errorTitle = "Login Failed";
      
//       if (err.code === 'ECONNABORTED') {
//         errorTitle = "Connection Timeout";
//         errorMessage = "Server is taking too long to respond. Please try again.";
//       } else if (err.response?.status === 0 || err.code === 'ERR_NETWORK') {
//         errorTitle = "Network Error";
//         errorMessage = "Unable to reach server. Please check your internet connection.";
//       } else if (err.response?.status >= 500) {
//         errorTitle = "Server Error";
//         errorMessage = "Server is experiencing issues. Please try again later.";
//       } else if (err.response?.status === 401) {
//         errorMessage = "Invalid email or password. Please check your credentials.";
//       } else if (err.response?.status === 400) {
//         errorMessage = err.response?.data?.message || "Invalid request. Please check your input.";
//       } else if (err.response?.data?.message) {
//         errorMessage = err.response.data.message;
//       }
      
//       showMessage(errorTitle, errorMessage, "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!btnDisabled) {
//       login();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1 className="text-3xl font-rubikBold text-gray-900">
//         Login as the FounderThrive Admin
//       </h1>
//       <p className="text-md my-4 mb-8">
//         Enter your account correct login details below
//       </p>
      
//       <div className="my-6 flex-col space-y-4">
//         <TextField
//           label="Email Address"
//           placeholder="admin@gmail.com"
//           value={email}
//           setValue={setEmail}
//           type="email"
//           required
//         />
//         <PasswordField
//           label="Password"
//           placeholder="••••••••••••"
//           value={password}
//           setValue={setPassword}
//           required
//         />
//       </div>
      
//       <div className="my-8">
//         <Button
//           title={isLoading ? "Logging in..." : "Login"}
//           disabled={btnDisabled}
//           onClick={login}
//           type="submit"
//         />
//       </div>
      
//       <Link href="/forgot-password" className="text-weave-primary">
//         Forgot Password
//       </Link>
//     </form>
//   );
// }



///working
// "use client";
// import React, { useState, useEffect } from "react";
// import TextField from "@/components/elements/TextField";
// import PasswordField from "@/components/elements/PasswordField";
// import Button from "@/components/elements/Button";
// import Link from "next/link";
// import api, { 
//   setAuthTokens, 
//   getTokenExpirationStatus, 
//   debug,
//   checkAuthStatus,
//   getCurrentUser 
// } from "@/lib/api";
// import { ToastContext, useToastContext } from "@/contexts/toast";
// import { useRouter } from "next/navigation";

// export default function Page() {
//   return (
//     <ToastContext>
//       <Login />
//     </ToastContext>
//   );
// }

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isClient, setIsClient] = useState(false);
//   const { showMessage } = useToastContext();
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true);
    
//     // Enhanced auth check using the new system
//     const checkExistingAuth = async () => {
//       if (typeof window !== "undefined") {
//         debug("Checking existing authentication on login page load");
        
//         try {
//           const isAuthenticated = await checkAuthStatus();
//           debug("Auth status check result:", { isAuthenticated });
          
//           if (isAuthenticated) {
//             const user = getCurrentUser();
//             debug("User found in storage:", { 
//               hasUser: !!user,
//               hasNames: !!(user?.firstName && user?.lastName)
//             });
            
//             if (user) {
//               // Navigate based on user profile completion
//               if (user.firstName && user.lastName) {
//                 debug("Redirecting authenticated user to dashboard");
//                 router.push("/dashboard");
//               } else {
//                 debug("Redirecting authenticated user to profile setup");
//                 router.push("/setup/profile?email=");
//               }
//             }
//           } else {
//             debug("User not authenticated, staying on login page");
//           }
//         } catch (error) {
//           debug("Error during auth check:", error);
//         }
//       }
//     };

//     checkExistingAuth();
//   }, [router]);

//   const btnDisabled = !isClient || email === "" || password === "" || isLoading;

//   const login = async () => {
//     setIsLoading(true);
//     debug('Starting enhanced login process...', { email });
    
//     try {
//       debug('Making login API request...');
      
//       const resp = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       debug('Login response received:', {
//         status: resp.status,
//         hasUser: !!resp.data.user,
//         hasAccessToken: !!resp.data.accessToken,
//         hasRefreshToken: !!resp.data.refreshToken,
//         userRole: resp.data.user?.role,
//         userVerified: resp.data.user?.verified
//       });

//       if (resp.status === 200) {
//         // Check user role authorization
//         if (resp.data.user.role === null) {
//           debug("User role is null, access denied");
//           showMessage("Authorised personnels only", "error");
//           return;
//         }

//         // Check if user is verified
//         if (!resp.data.user.verified) {
//           debug("User not verified, redirecting to OTP");
//           router.push(`/otp?email=${email}&usage=signup`);
//           return;
//         }

//         // Validate that we have both tokens
//         if (!resp.data.accessToken || !resp.data.refreshToken) {
//           debug("Missing tokens in login response:", {
//             hasAccessToken: !!resp.data.accessToken,
//             hasRefreshToken: !!resp.data.refreshToken
//           });
//           showMessage(
//             "Login Failed",
//             "Authentication tokens missing. Please contact support.",
//             "error"
//           );
//           return;
//         }

//         debug("Login successful, processing tokens...");

//         // Set both access token and refresh token using enhanced method
//         setAuthTokens(resp.data.accessToken, resp.data.refreshToken);

//         // Store user info in localStorage
//         if (typeof window !== "undefined") {
//           const userInfoWithTokens = {
//             ...resp.data.user,
//             refreshToken: resp.data.refreshToken // Keep for backward compatibility
//           };
//           localStorage.setItem("userinfo", JSON.stringify(userInfoWithTokens));
//           debug("User info stored successfully");
//         }

//         // Verify tokens were set correctly
//         const tokenStatus = getTokenExpirationStatus();
//         debug("Post-login token status:", tokenStatus);

//         // Show success message
//         showMessage("Login Successful", "Welcome back!", "success");

//         // Navigate based on user profile completion
//         setTimeout(() => {
//           if (
//             resp.data.user.firstName == null ||
//             resp.data.user.lastName == null
//           ) {
//             debug("Redirecting to profile setup");
//             router.push("/setup/profile");
//           } else {
//             debug("Redirecting to dashboard");
//             router.push("/dashboard");
//           }
//         }, 500);

//         return;
//       }

//       // Handle non-200 responses
//       debug("Non-200 response received:", resp.status);
//       showMessage(
//         "Login Failed",
//         resp.data.message || "Incorrect email or password. Please try again.",
//         "error"
//       );
//     } catch (err) {
//       debug("Login error details:", {
//         message: err.message,
//         code: err.code,
//         status: err.response?.status,
//         statusText: err.response?.statusText,
//         data: err.response?.data
//       });
      
//       // Enhanced error handling
//       let errorMessage = "An unexpected error occurred. Please try again.";
//       let errorTitle = "Login Failed";
      
//       if (err.code === 'ECONNABORTED') {
//         errorTitle = "Connection Timeout";
//         errorMessage = "Server is taking too long to respond. Please try again.";
//       } else if (err.response?.status === 0 || err.code === 'ERR_NETWORK') {
//         errorTitle = "Network Error";
//         errorMessage = "Unable to reach server. Please check your internet connection.";
//       } else if (err.response?.status >= 500) {
//         errorTitle = "Server Error";
//         errorMessage = "Server is experiencing issues. Please try again later.";
//       } else if (err.response?.status === 401) {
//         errorMessage = "Invalid email or password. Please check your credentials.";
//       } else if (err.response?.status === 400) {
//         errorMessage = err.response?.data?.message || "Invalid request. Please check your input.";
//       } else if (err.response?.data?.message) {
//         errorMessage = err.response.data.message;
//       }
      
//       showMessage(errorTitle, errorMessage, "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!btnDisabled) {
//       login();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1 className="text-3xl font-rubikBold text-gray-900">
//         Login as the FounderThrive Admin
//       </h1>
//       <p className="text-md my-4 mb-8">
//         Enter your account correct login details below
//       </p>
      
//       <div className="my-6 flex-col space-y-4">
//         <TextField
//           label="Email Address"
//           placeholder="admin@gmail.com"
//           value={email}
//           setValue={setEmail}
//           type="email"
//           required
//         />
//         <PasswordField
//           label="Password"
//           placeholder="••••••••••••"
//           value={password}
//           setValue={setPassword}
//           required
//         />
//       </div>
      
//       <div className="my-8">
//         <Button
//           title={isLoading ? "Logging in..." : "Login"}
//           disabled={btnDisabled}
//           onClick={login}
//           type="submit"
//         />
//       </div>
      
//       <Link href="/forgot-password" className="text-weave-primary">
//         Forgot Password
//       </Link>
//     </form>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import TextField from "@/components/elements/TextField";
import PasswordField from "@/components/elements/PasswordField";
import Button from "@/components/elements/Button";
import Link from "next/link";
import api, { 
  setAuthTokens, 
  getTokenExpirationStatus, 
  debug,
  checkAuthStatus,
  getCurrentUser 
} from "@/lib/api";
import { ToastContext, useToastContext } from "@/contexts/toast";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <ToastContext>
      <Login />
    </ToastContext>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { showMessage } = useToastContext();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    
    const checkExistingAuth = async () => {
      if (typeof window !== "undefined") {
        debug("Checking existing authentication on login page load");
        
        try {
          const isAuthenticated = await checkAuthStatus();
          debug("Auth status check result:", { isAuthenticated });
          
          if (isAuthenticated) {
            const user = getCurrentUser();
            debug("User found in storage:", { 
              hasUser: !!user,
              hasNames: !!(user?.firstName && user?.lastName)
            });
            
            if (user) {
              if (user.firstName && user.lastName) {
                debug("Redirecting authenticated user to dashboard");
                router.push("/dashboard");
              } else {
                debug("Redirecting authenticated user to profile setup");
                router.push("/setup/profile");
              }
            }
          } else {
            debug("User not authenticated, staying on login page");
          }
        } catch (error) {
          debug("Error during auth check:", error);
        }
      }
    };

    checkExistingAuth();
  }, [router]);

  const btnDisabled = !isClient || email === "" || password === "" || isLoading;

  const login = async () => {
    setIsLoading(true);
    debug('Starting enhanced login process...', { email });
    
    try {
      debug('Making login API request with credentials...', { endpoint: '/auth/login' });
      
      // Use fetch for login to ensure proper cookie handling
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://founderthrive-cabf912c3adc.herokuapp.com/api/v1'}/auth/login`, {
        method: 'POST',
        credentials: 'include', // This is crucial for receiving the refresh token cookie
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      debug('Login response received:', {
        status: response.status,
        ok: response.ok,
        hasUser: !!data.user,
        hasAccessToken: !!data.accessToken,
        userRole: data.user?.role,
        userVerified: data.user?.verified
      });

      if (response.ok && response.status === 200) {
        if (data.user.role === null) {
          debug("User role is null, access denied");
          showMessage("Authorised personnels only", "error");
          return;
        }

        if (!data.user.verified) {
          debug("User not verified, redirecting to OTP");
          router.push(`/otp?email=${email}&usage=signup`);
          return;
        }

        if (!data.accessToken) {
          debug("Missing access token in login response");
          showMessage(
            "Login Failed",
            "Authentication token missing. Please contact support.",
            "error"
          );
          return;
        }

        debug("Login successful, processing tokens...");

        // Set the access token - refresh token is automatically stored as HttpOnly cookie by the server
        setAuthTokens(data.accessToken);

        if (typeof window !== "undefined") {
          const userInfo = {
            ...data.user
          };
          localStorage.setItem("userinfo", JSON.stringify(userInfo));
          debug("User info stored successfully");
        }

        const tokenStatus = getTokenExpirationStatus();
        debug("Post-login token status:", tokenStatus);

        showMessage("Login Successful", "Welcome back!", "success");

        setTimeout(() => {
          if (
            data.user.firstName == null ||
            data.user.lastName == null
          ) {
            debug("Redirecting to profile setup");
            router.push("/setup/profile");
          } else {
            debug("Redirecting to dashboard");
            router.push("/dashboard");
          }
        }, 500);

        return;
      }

      debug("Non-200 response received:", response.status);
      showMessage(
        "Login Failed",
        data.message || "Incorrect email or password. Please try again.",
        "error"
      );
    } catch (err) {
      debug("Login error details:", {
        message: err.message,
        name: err.name,
        stack: err.stack
      });
      
      let errorMessage = "An unexpected error occurred. Please try again.";
      let errorTitle = "Login Failed";
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorTitle = "Network Error";
        errorMessage = "Unable to reach server. Please check your internet connection.";
      } else if (err.message.includes('timeout')) {
        errorTitle = "Connection Timeout";
        errorMessage = "Server is taking too long to respond. Please try again.";
      } else {
        errorMessage = err.message || errorMessage;
      }
      
      showMessage(errorTitle, errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!btnDisabled) {
      login();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-rubikBold text-gray-900">
        Login as the FounderThrive Admin
      </h1>
      <p className="text-md my-4 mb-8">
        Enter your account correct login details below
      </p>
      
      <div className="my-6 flex-col space-y-4">
        <TextField
          label="Email Address"
          placeholder="admin@gmail.com"
          value={email}
          setValue={setEmail}
          type="email"
          required
        />
        <PasswordField
          label="Password"
          placeholder="••••••••••••"
          value={password}
          setValue={setPassword}
          required
        />
      </div>
      
      <div className="my-8">
        <Button
          title={isLoading ? "Logging in..." : "Login"}
          disabled={btnDisabled}
          onClick={login}
          type="submit"
        />
      </div>
      
      <Link href="/forgot-password" className="text-weave-primary">
        Forgot Password
      </Link>
    </form>
  );
}