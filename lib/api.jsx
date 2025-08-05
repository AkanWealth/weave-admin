// // import axios from "axios";
// // import Cookies from "js-cookie";
// // import { baseUrl } from "./envfile";

// // // Create axios instance
// // const api = axios.create({
// //   baseURL: baseUrl,
// //   timeout: 20000,
// //   headers: {
// //     'Accept': 'application/json, text/plain, */*',
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // ⏳ Check if token is about to expire (within 5 minutes)
// // const isTokenAboutToExpire = () => {
// //   const accessToken = Cookies.get("accessToken");
// //   if (!accessToken) return true;

// //   try {
// //     const tokenParts = accessToken.split('.');
// //     if (tokenParts.length !== 3) return true;

// //     const payload = JSON.parse(atob(tokenParts[1]));
// //     const currentTime = Math.floor(Date.now() / 1000);
// //     const timeUntilExpiration = payload.exp - currentTime;

// //     return timeUntilExpiration <= 300;
// //   } catch (error) {
// //     console.error("Token decode error:", error);
// //     return true;
// //   }
// // };

// // // 🔁 Replace accessToken using refreshToken from localStorage
// // const replaceAccessTokenWithRefreshToken = async () => {
// //   try {
// //     let refreshToken =
// //       Cookies.get("refreshToken") ||
// //       localStorage.getItem("refreshToken") ||
// //       JSON.parse(localStorage.getItem("userinfo") || "{}")?.refreshToken;

// //     if (!refreshToken) {
// //       console.error("No refresh token found");
// //       return false;
// //     }

// //     const response = await axios.post(`${baseUrl}/auth/refresh-token`, {
// //       refreshToken,
// //     });

// //     const newAccessToken = response.data.accessToken;
// //     if (!newAccessToken) {
// //       console.error("No access token returned");
// //       return false;
// //     }

// //     Cookies.set("accessToken", newAccessToken, {
// //       expires: 1 / 24, // 1 hour
// //       sameSite: 'lax'
// //     });

// //     Cookies.set("session", newAccessToken, {
// //       expires: 1 / 24,
// //       sameSite: 'lax'
// //     });

// //     api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
// //     console.log("Access token refreshed successfully");
// //     return true;
// //   } catch (error) {
// //     console.error("Failed to refresh token", error);
// //     return false;
// //   }
// // };

// // // ❌ Handle token expiration (logout)
// // const handleTokenExpiration = () => {
// //   console.log("Tokens expired, logging out");
// //   clearAuthTokens();
// //   if (typeof window !== "undefined") {
// //     window.location.href = "/login";
// //   }
// // };

// // // 🛑 Request Interceptor
// // api.interceptors.request.use(
// //   async (config) => {
// //     if (isTokenAboutToExpire()) {
// //       console.log("Access token about to expire, refreshing...");
// //       const success = await replaceAccessTokenWithRefreshToken();
// //       if (!success) {
// //         console.warn("Token refresh failed");
// //       }
// //     }

// //     const token = Cookies.get("accessToken");
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // 🔐 Response Interceptor
// // api.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;

// //     if (error.response?.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true;
// //       console.log("401 detected, trying token refresh...");

// //       const success = await replaceAccessTokenWithRefreshToken();
// //       if (success) {
// //         const token = Cookies.get("accessToken");
// //         originalRequest.headers["Authorization"] = `Bearer ${token}`;
// //         return api(originalRequest);
// //       } else {
// //         handleTokenExpiration();
// //         return Promise.reject(error);
// //       }
// //     }

// //     if (error.response?.status === 401 && originalRequest._retry) {
// //       handleTokenExpiration();
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // // ✅ Set tokens after login
// // export const setAuthTokens = (accessToken, refreshToken) => {
// //   Cookies.set("accessToken", accessToken, { expires: 1 / 24, sameSite: "lax" });
// //   Cookies.set("refreshToken", refreshToken, { expires: 7, sameSite: "lax" });
// //   Cookies.set("session", accessToken, { expires: 1 / 24, sameSite: "lax" });

// //   if (typeof window !== "undefined") {
// //     localStorage.setItem("refreshToken", refreshToken);
// //     const existingUserInfo = localStorage.getItem("userinfo");
// //     if (existingUserInfo) {
// //       try {
// //         const user = JSON.parse(existingUserInfo);
// //         user.refreshToken = refreshToken;
// //         localStorage.setItem("userinfo", JSON.stringify(user));
// //       } catch (e) {
// //         console.error("Failed to update userinfo with refresh token");
// //       }
// //     }
// //   }

// //   api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// // };

// // // 🚪 Clear tokens on logout
// // export const clearAuthTokens = () => {
// //   Cookies.remove("accessToken");
// //   Cookies.remove("refreshToken");
// //   Cookies.remove("session");

// //   if (typeof window !== "undefined") {
// //     localStorage.removeItem("refreshToken");
// //     localStorage.removeItem("userinfo");
// //   }

// //   delete api.defaults.headers.common["Authorization"];
// // };

// // // ✅ Auth status check
// // export const isAuthenticated = () => {
// //   return !!(
// //     Cookies.get("accessToken") ||
// //     Cookies.get("refreshToken") ||
// //     localStorage.getItem("refreshToken")
// //   );
// // };

// // // ✅ Get user info
// // export const getCurrentUser = () => {
// //   if (typeof window !== "undefined") {
// //     const user = localStorage.getItem("userinfo");
// //     return user ? JSON.parse(user) : null;
// //   }
// //   return null;
// // };

// // // 🔧 Manual token refresh (for testing)
// // export const manualTokenReplacement = () => {
// //   return replaceAccessTokenWithRefreshToken();
// // };

// // // ✅ Get token expiration status
// // export const getTokenExpirationStatus = () => {
// //   const accessToken = Cookies.get("accessToken");
// //   const refreshToken = Cookies.get("refreshToken") || localStorage.getItem("refreshToken");

// //   if (!accessToken && !refreshToken) {
// //     return { status: "no_tokens", message: "No tokens available" };
// //   }

// //   if (!accessToken && refreshToken) {
// //     return { status: "access_expired", message: "Access token expired, refresh token available" };
// //   }

// //   if (isTokenAboutToExpire()) {
// //     return { status: "about_to_expire", message: "Access token expires soon" };
// //   }

// //   return { status: "valid", message: "Access token is valid" };
// // };

// // // 🕒 Refresh every 5 minutes
// // if (typeof window !== "undefined") {
// //   setInterval(async () => {
// //     const status = getTokenExpirationStatus();
// //     console.log("Token status check:", status);

// //     if (status.status === "about_to_expire" || status.status === "access_expired") {
// //       await replaceAccessTokenWithRefreshToken();
// //     }
// //   }, 5 * 60 * 1000); // 5 minutes
// // }

// // export default api;


// import axios from "axios";
// import Cookies from "js-cookie";
// import { baseUrl } from "./envfile";

// // Create axios instance
// const api = axios.create({
//   baseURL: baseUrl,
//   timeout: 20000,
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json',
//   },
// });

// const DEBUG = true;

// // Debug logging function
// export const debug = (message, data = null) => {
//   if (DEBUG) {
//     const logEntry = {
//       timestamp: new Date().toISOString(),
//       message: `[WEAVE AuthService] ${message}`,
//       data: data || '',
//     };
//     console.log(logEntry.message, logEntry.data);
//   }
// };

// // Cookie options
// const accessTokenCookieOptions = {
//   expires: 1 / 24, // 1 hour
//   sameSite: 'lax',
//   secure: process.env.NODE_ENV === 'production'
// };

// const refreshTokenCookieOptions = {
//   expires: 7, // 7 days
//   sameSite: 'lax',
//   secure: process.env.NODE_ENV === 'production'
// };

// const sessionCookieOptions = {
//   expires: 1 / 24, // 1 hour
//   sameSite: 'lax',
//   secure: process.env.NODE_ENV === 'production'
// };

// // JWT decode function (simple implementation)
// const decodeJWT = (token) => {
//   try {
//     const tokenParts = token.split('.');
//     if (tokenParts.length !== 3) {
//       throw new Error('Invalid token format');
//     }
//     const payload = JSON.parse(atob(tokenParts[1]));
//     return payload;
//   } catch (error) {
//     debug("Error decoding JWT:", error);
//     throw error;
//   }
// };

// // Check if token is expired with buffer (default 5 minutes)
// export const isTokenExpired = (token, bufferSeconds = 300) => {
//   try {
//     const decoded = decodeJWT(token);
//     const expiresAt = decoded.exp;
//     const currentTime = Date.now() / 1000;
//     const timeLeft = expiresAt - currentTime;

//     debug('Token expiration check', {
//       expiresAt: new Date(expiresAt * 1000).toLocaleString(),
//       currentTime: new Date(currentTime * 1000).toLocaleString(),
//       timeLeftSeconds: timeLeft,
//       isExpired: timeLeft < bufferSeconds
//     });

//     return timeLeft < bufferSeconds;
//   } catch (error) {
//     debug("Error checking token expiration:", error);
//     return true;
//   }
// };

// // Get tokens from cookies and localStorage
// export const getAccessToken = () => {
//   return Cookies.get("accessToken") || null;
// };

// export const getRefreshToken = () => {
//   const cookieRefreshToken = Cookies.get("refreshToken");
//   const localStorageRefreshToken = localStorage.getItem("refreshToken");
//   const userInfoRefreshToken = (() => {
//     try {
//       const userInfo = localStorage.getItem("userinfo");
//       return userInfo ? JSON.parse(userInfo)?.refreshToken : null;
//     } catch {
//       return null;
//     }
//   })();

//   return cookieRefreshToken || localStorageRefreshToken || userInfoRefreshToken || null;
// };

// // Update auth cookies and localStorage (ICAN style)
// const updateAuthTokens = (accessToken, refreshToken = null) => {
//   try {
//     // Set access token cookie
//     Cookies.set("accessToken", accessToken, accessTokenCookieOptions);
//     Cookies.set("session", accessToken, sessionCookieOptions);

//     // Update refresh token if provided
//     if (refreshToken) {
//       Cookies.set("refreshToken", refreshToken, refreshTokenCookieOptions);
      
//       // Update localStorage
//       if (typeof window !== "undefined") {
//         localStorage.setItem("refreshToken", refreshToken);
        
//         // Update userinfo with refresh token
//         const existingUserInfo = localStorage.getItem("userinfo");
//         if (existingUserInfo) {
//           try {
//             const user = JSON.parse(existingUserInfo);
//             user.refreshToken = refreshToken;
//             localStorage.setItem("userinfo", JSON.stringify(user));
//           } catch (e) {
//             debug("Failed to update userinfo with refresh token:", e);
//           }
//         }
//       }
//       debug('Refresh token updated');
//     }

//     // Set authorization header
//     api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

//     // Log token info for debugging
//     try {
//       const decoded = decodeJWT(accessToken);
//       debug('Auth tokens updated successfully', {
//         tokenExpiry: new Date(decoded.exp * 1000).toLocaleString(),
//         hasRefreshToken: !!refreshToken,
//       });
//     } catch (e) {
//       debug('Auth tokens updated (could not decode for logging)');
//     }

//   } catch (error) {
//     debug('Failed to update auth tokens:', error);
//     throw error;
//   }
// };

// // ICAN-style token refresh - replace access token with refresh token
// export const refreshTokens = async () => {
//   debug('Refreshing tokens using ICAN strategy (replacing access with refresh)');

//   try {
//     const refreshToken = getRefreshToken();

//     if (!refreshToken) {
//       debug('No refresh token available');
//       return false;
//     }

//     // Check if refresh token is expired
//     if (isTokenExpired(refreshToken, 60)) { // 1 minute buffer for refresh token
//       debug('Refresh token is expired');
//       handleTokenExpiration();
//       return false;
//     }

//     // Replace the access token with the refresh token (ICAN strategy)
//     updateAuthTokens(refreshToken);

//     debug('Access token replaced with refresh token successfully');
//     return true;
//   } catch (error) {
//     debug('Failed to refresh tokens:', error);
//     handleTokenExpiration();
//     return false;
//   }
// };

// // Handle token expiration (logout)
// const handleTokenExpiration = () => {
//   debug("Tokens expired, logging out");
//   clearAuthTokens();
//   if (typeof window !== "undefined") {
//     window.location.href = "/login";
//   }
// };

// // Set tokens after login (enhanced version)
// export const setAuthTokens = (accessToken, refreshToken) => {
//   debug('Setting auth tokens after login', {
//     hasAccessToken: !!accessToken,
//     hasRefreshToken: !!refreshToken
//   });

//   updateAuthTokens(accessToken, refreshToken);

//   debug('Login tokens set successfully');
// };

// // Clear tokens on logout
// export const clearAuthTokens = () => {
//   debug('Clearing all auth tokens');
  
//   Cookies.remove("accessToken");
//   Cookies.remove("refreshToken");
//   Cookies.remove("session");

//   if (typeof window !== "undefined") {
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("userinfo");
//   }

//   delete api.defaults.headers.common["Authorization"];
  
//   debug('All auth tokens cleared');
// };

// // Auth status check
// export const isAuthenticated = () => {
//   const hasAccessToken = !!getAccessToken();
//   const hasRefreshToken = !!getRefreshToken();
  
//   debug('Authentication status check', {
//     hasAccessToken,
//     hasRefreshToken,
//     isAuthenticated: hasAccessToken || hasRefreshToken
//   });
  
//   return hasAccessToken || hasRefreshToken;
// };

// // Get user info
// export const getCurrentUser = () => {
//   if (typeof window !== "undefined") {
//     try {
//       const user = localStorage.getItem("userinfo");
//       return user ? JSON.parse(user) : null;
//     } catch (error) {
//       debug("Error parsing user info:", error);
//       return null;
//     }
//   }
//   return null;
// };

// // Get token expiration status (enhanced)
// export const getTokenExpirationStatus = () => {
//   const accessToken = getAccessToken();
//   const refreshToken = getRefreshToken();

//   if (!accessToken && !refreshToken) {
//     return { status: "no_tokens", message: "No tokens available" };
//   }

//   if (!accessToken && refreshToken) {
//     if (isTokenExpired(refreshToken, 60)) {
//       return { status: "all_expired", message: "All tokens expired" };
//     }
//     return { status: "access_expired", message: "Access token expired, refresh token available" };
//   }

//   if (accessToken && isTokenExpired(accessToken)) {
//     if (refreshToken && !isTokenExpired(refreshToken, 60)) {
//       return { status: "about_to_expire", message: "Access token expires soon, refresh available" };
//     } else {
//       return { status: "all_expired", message: "All tokens expired" };
//     }
//   }

//   return { status: "valid", message: "Access token is valid" };
// };

// // Get fresh access token
// export const getFreshAccessToken = async () => {
//   debug('Explicitly requesting fresh access token');
  
//   try {
//     const refreshed = await refreshTokens();
//     if (refreshed) {
//       const token = getAccessToken();
//       debug('Fresh access token obtained successfully');
//       return token;
//     } else {
//       debug('Failed to get fresh access token');
//       return null;
//     }
//   } catch (error) {
//     debug('Error getting fresh access token:', error);
//     return null;
//   }
// };

// // Request Interceptor (enhanced with ICAN strategy)
// api.interceptors.request.use(
//   async (config) => {
//     let token = getAccessToken();

//     // Check if the token is expired and replace it with the refresh token
//     if (token && isTokenExpired(token)) {
//       debug('Access token expired, replacing with refresh token');
//       const refreshed = await refreshTokens();
//       if (refreshed) {
//         token = getAccessToken(); // Get the new token (refresh token)
//         debug('Successfully replaced access token with refresh token');
//       } else {
//         debug('Failed to replace access token with refresh token');
//         token = null;
//       }
//     } else if (!token) {
//       // Try to get a fresh token if we don't have one
//       const refreshToken = getRefreshToken();
//       if (refreshToken && !isTokenExpired(refreshToken, 60)) {
//         debug('No access token but refresh token available, using refresh token');
//         const refreshed = await refreshTokens();
//         if (refreshed) {
//           token = getAccessToken();
//         }
//       }
//     }

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       debug('Added token to request headers');
//     } else {
//       debug('No token available for request headers');
//     }

//     return config;
//   },
//   (error) => {
//     debug('Request interceptor error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor (enhanced)
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       debug("401 detected, trying token refresh with ICAN strategy...");

//       const success = await refreshTokens();
//       if (success) {
//         const token = getAccessToken();
//         originalRequest.headers["Authorization"] = `Bearer ${token}`;
//         debug("Retrying request with refreshed token");
//         return api(originalRequest);
//       } else {
//         debug("Token refresh failed, handling expiration");
//         handleTokenExpiration();
//         return Promise.reject(error);
//       }
//     }

//     if (error.response?.status === 401 && originalRequest._retry) {
//       debug("401 after retry, handling token expiration");
//       handleTokenExpiration();
//     }

//     return Promise.reject(error);
//   }
// );

// // Enhanced auth status check
// export const checkAuthStatus = async () => {
//   const tokenStatus = getTokenExpirationStatus();
//   debug('Checking auth status', tokenStatus);
  
//   if (tokenStatus.status === 'no_tokens' || tokenStatus.status === 'all_expired') {
//     return false;
//   }
  
//   if (tokenStatus.status === 'access_expired' || tokenStatus.status === 'about_to_expire') {
//     return await refreshTokens();
//   }
  
//   return true;
// };

// // Periodic token check (enhanced)
// if (typeof window !== "undefined") {
//   setInterval(async () => {
//     const status = getTokenExpirationStatus();
//     debug("Periodic token status check:", status);

//     if (status.status === "about_to_expire" || status.status === "access_expired") {
//       await refreshTokens();
//     } else if (status.status === "all_expired") {
//       handleTokenExpiration();
//     }
//   }, 5 * 60 * 1000); // 5 minutes
// }

// // Export all functions for backward compatibility
// export default api;
// // export {
// //   debug,
// //   decodeJWT,
// //   updateAuthTokens,
// //   handleTokenExpiration
// // };


import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "./envfile";

// Create axios instance
const api = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
});

const DEBUG = true;

// Debug logging function
export const debug = (message, data = null) => {
  if (DEBUG) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message: `[WEAVE AuthService] ${message}`,
      data: data || '',
    };
    console.log(logEntry.message, logEntry.data);
  }
};

// Cookie options
const accessTokenCookieOptions = {
  expires: 1 / 24, // 1 hour
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production'
};

const refreshTokenCookieOptions = {
  expires: 7, // 7 days
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production'
};

const sessionCookieOptions = {
  expires: 1 / 24, // 1 hour
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production'
};

// JWT decode function
const decodeJWT = (token) => {
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload;
  } catch (error) {
    debug("Error decoding JWT:", error);
    throw error;
  }
};

// Check if token is expired with buffer (default 5 minutes)
export const isTokenExpired = (token, bufferSeconds = 300) => {
  if (!token) return true;
  
  try {
    const decoded = decodeJWT(token);
    const expiresAt = decoded.exp;
    const currentTime = Date.now() / 1000;
    const timeLeft = expiresAt - currentTime;

    debug('Token expiration check', {
      tokenPreview: token.substring(0, 20) + '...',
      expiresAt: new Date(expiresAt * 1000).toLocaleString(),
      currentTime: new Date(currentTime * 1000).toLocaleString(),
      timeLeftSeconds: timeLeft,
      isExpired: timeLeft < bufferSeconds
    });

    return timeLeft < bufferSeconds;
  } catch (error) {
    debug("Error checking token expiration:", error);
    return true;
  }
};

// Get tokens from cookies and localStorage
export const getAccessToken = () => {
  return Cookies.get("accessToken") || null;
};

export const getRefreshToken = () => {
  const cookieRefreshToken = Cookies.get("refreshToken");
  
  let localStorageRefreshToken = null;
  let userInfoRefreshToken = null;
  
  if (typeof window !== "undefined") {
    localStorageRefreshToken = localStorage.getItem("refreshToken");
    
    try {
      const userInfo = localStorage.getItem("userinfo");
      userInfoRefreshToken = userInfo ? JSON.parse(userInfo)?.refreshToken : null;
    } catch (e) {
      debug("Error parsing userinfo for refresh token:", e);
    }
  }

  const token = cookieRefreshToken || localStorageRefreshToken || userInfoRefreshToken;
  debug('Getting refresh token', {
    fromCookie: !!cookieRefreshToken,
    fromLocalStorage: !!localStorageRefreshToken,
    fromUserInfo: !!userInfoRefreshToken,
    hasToken: !!token,
    tokenPreview: token ? token.substring(0, 20) + '...' : 'none'
  });
  
  return token;
};

// Update auth cookies and localStorage
const updateAuthTokens = (accessToken, refreshToken = null) => {
  try {
    debug('Updating auth tokens', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      accessTokenPreview: accessToken ? accessToken.substring(0, 20) + '...' : 'none'
    });

    // Set access token cookie
    Cookies.set("accessToken", accessToken, accessTokenCookieOptions);
    Cookies.set("session", accessToken, sessionCookieOptions);

    // Update refresh token if provided
    if (refreshToken) {
      Cookies.set("refreshToken", refreshToken, refreshTokenCookieOptions);
      
      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("refreshToken", refreshToken);
        
        // Update userinfo with refresh token
        const existingUserInfo = localStorage.getItem("userinfo");
        if (existingUserInfo) {
          try {
            const user = JSON.parse(existingUserInfo);
            user.refreshToken = refreshToken;
            localStorage.setItem("userinfo", JSON.stringify(user));
            debug('Updated userinfo with new refresh token');
          } catch (e) {
            debug("Failed to update userinfo with refresh token:", e);
          }
        }
      }
    }

    // Set authorization header
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    // Log token info for debugging
    try {
      const decoded = decodeJWT(accessToken);
      debug('Auth tokens updated successfully', {
        tokenExpiry: new Date(decoded.exp * 1000).toLocaleString(),
        hasRefreshToken: !!refreshToken,
      });
    } catch (e) {
      debug('Auth tokens updated (could not decode for logging)');
    }

  } catch (error) {
    debug('Failed to update auth tokens:', error);
    throw error;
  }
};

// Direct token swap - replace access token with refresh token
export const refreshTokens = async () => {
  debug('Starting direct token swap (refresh token -> access token)');

  try {
    const currentAccessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    debug('Current token status', {
      hasAccessToken: !!currentAccessToken,
      hasRefreshToken: !!refreshToken,
      accessTokenExpired: currentAccessToken ? isTokenExpired(currentAccessToken, 0) : 'no token',
      refreshTokenExpired: refreshToken ? isTokenExpired(refreshToken, 60) : 'no token'
    });

    if (!refreshToken) {
      debug('No refresh token available for swap');
      return false;
    }

    // Check if refresh token is expired (with small buffer)
    if (isTokenExpired(refreshToken, 60)) { // 1 minute buffer for refresh token
      debug('Refresh token is expired, cannot swap');
      handleTokenExpiration();
      return false;
    }

    debug('Swapping refresh token to become access token');

    // Use the refresh token as the new access token
    // Keep the same refresh token (or you could generate/rotate it)
    updateAuthTokens(refreshToken, refreshToken);

    debug('Token swap completed successfully', {
      newAccessTokenPreview: refreshToken.substring(0, 20) + '...'
    });

    return true;

  } catch (error) {
    debug('Token swap failed', {
      message: error.message,
      stack: error.stack
    });

    return false;
  }
};

// Handle token expiration (logout)
const handleTokenExpiration = () => {
  debug("Handling token expiration - logging out");
  clearAuthTokens();
  if (typeof window !== "undefined") {
    // Add a small delay to ensure cleanup completes
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  }
};

// Set tokens after login
export const setAuthTokens = (accessToken, refreshToken) => {
  debug('Setting auth tokens after login', {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    accessTokenPreview: accessToken ? accessToken.substring(0, 20) + '...' : 'none',
    refreshTokenPreview: refreshToken ? refreshToken.substring(0, 20) + '...' : 'none'
  });

  if (!accessToken) {
    throw new Error('Access token is required');
  }

  if (!refreshToken) {
    throw new Error('Refresh token is required');
  }

  updateAuthTokens(accessToken, refreshToken);
  debug('Login tokens set successfully');
};

// Clear tokens on logout
export const clearAuthTokens = () => {
  debug('Clearing all auth tokens');
  
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("session");

  if (typeof window !== "undefined") {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userinfo");
  }

  delete api.defaults.headers.common["Authorization"];
  
  debug('All auth tokens cleared');
};

// Auth status check
export const isAuthenticated = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  
  const hasValidAccess = accessToken && !isTokenExpired(accessToken, 0); // No buffer for authentication check
  const hasValidRefresh = refreshToken && !isTokenExpired(refreshToken, 60); // 1 minute buffer for refresh
  
  debug('Authentication status check', {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    hasValidAccess,
    hasValidRefresh,
    isAuthenticated: hasValidAccess || hasValidRefresh
  });
  
  return hasValidAccess || hasValidRefresh;
};

// Get user info
export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    try {
      const user = localStorage.getItem("userinfo");
      const parsed = user ? JSON.parse(user) : null;
      debug('Getting current user', { hasUser: !!parsed });
      return parsed;
    } catch (error) {
      debug("Error parsing user info:", error);
      return null;
    }
  }
  return null;
};

// Get token expiration status
export const getTokenExpirationStatus = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  debug('Checking token expiration status', {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken
  });

  if (!accessToken && !refreshToken) {
    return { status: "no_tokens", message: "No tokens available" };
  }

  if (!refreshToken || isTokenExpired(refreshToken, 60)) {
    return { status: "all_expired", message: "All tokens expired" };
  }

  if (!accessToken || isTokenExpired(accessToken, 0)) {
    return { status: "access_expired", message: "Access token expired, refresh token available" };
  }

  if (isTokenExpired(accessToken, 300)) { // 5 minutes buffer
    return { status: "about_to_expire", message: "Access token expires soon" };
  }

  return { status: "valid", message: "Access token is valid" };
};

// Enhanced auth status check with automatic token swap
export const checkAuthStatus = async () => {
  const tokenStatus = getTokenExpirationStatus();
  debug('Checking auth status', tokenStatus);
  
  if (tokenStatus.status === 'no_tokens' || tokenStatus.status === 'all_expired') {
    return false;
  }
  
  if (tokenStatus.status === 'access_expired' || tokenStatus.status === 'about_to_expire') {
    debug('Attempting token swap due to expiration status');
    const swapped = await refreshTokens();
    debug('Token swap result:', { success: swapped });
    return swapped;
  }
  
  return true;
};

// Get fresh access token (ensures we have a valid token via swap if needed)
export const getFreshAccessToken = async () => {
  debug('Requesting fresh access token');
  
  const accessToken = getAccessToken();
  
  // If we have a valid access token, return it
  if (accessToken && !isTokenExpired(accessToken, 60)) { // 1 minute buffer
    debug('Current access token is still fresh');
    return accessToken;
  }
  
  // Try to swap tokens
  const swapped = await refreshTokens();
  if (swapped) {
    const newToken = getAccessToken();
    debug('Fresh access token obtained via token swap');
    return newToken;
  }
  
  debug('Failed to get fresh access token');
  return null;
};

// Request Interceptor - with token swap logic
api.interceptors.request.use(
  async (config) => {
    debug('Request interceptor triggered', { 
      url: config.url,
      method: config.method 
    });
    
    // Skip auth for login and other public endpoints
    if (config.url?.includes('/auth/login') || 
        config.url?.includes('/auth/register') ||
        config.url?.includes('/auth/forgot-password')) {
      debug('Skipping auth for public endpoint');
      return config;
    }

    let token = getAccessToken();

    // If token is expired or about to expire, swap it with refresh token
    if (!token || isTokenExpired(token, 60)) { // 1 minute buffer
      debug('Access token missing or expired, attempting token swap');
      const swapped = await refreshTokens();
      if (swapped) {
        token = getAccessToken();
        debug('Successfully swapped token for request');
      } else {
        debug('Failed to swap token for request');
        // Let the request proceed - response interceptor will handle 401s
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      debug('Added authorization header to request');
    } else {
      debug('No token available for request');
    }

    return config;
  },
  (error) => {
    debug('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - with token swap retry logic
api.interceptors.response.use(
  (response) => {
    debug('Response received', { 
      status: response.status, 
      url: response.config.url 
    });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    debug('Response error intercepted', {
      status: error.response?.status,
      url: originalRequest?.url,
      hasRetryFlag: !!originalRequest?._retry
    });

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      debug("401 detected, attempting token swap...");

      const success = await refreshTokens();
      if (success) {
        const token = getAccessToken();
        if (token) {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          debug("Retrying request with swapped token");
          return api(originalRequest);
        }
      }
      
      debug("Token swap failed or no token available, handling expiration");
      handleTokenExpiration();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && originalRequest._retry) {
      debug("401 after retry attempt, handling token expiration");
      handleTokenExpiration();
    }

    return Promise.reject(error);
  }
);

// Periodic token check with proactive swapping (runs every 3 minutes)
if (typeof window !== "undefined") {
  const startPeriodicTokenCheck = () => {
    debug('Starting periodic token check with swap strategy');
    
    const checkInterval = setInterval(async () => {
      const status = getTokenExpirationStatus();
      debug("Periodic token status check:", status);

      if (status.status === "about_to_expire") {
        debug("Proactively swapping token");
        await refreshTokens();
      } else if (status.status === "access_expired") {
        debug("Access token expired, swapping with refresh token");
        const swapped = await refreshTokens();
        if (!swapped) {
          debug("Token swap failed, clearing interval and handling expiration");
          clearInterval(checkInterval);
          handleTokenExpiration();
        }
      } else if (status.status === "all_expired" || status.status === "no_tokens") {
        debug("All tokens expired, clearing interval and handling expiration");
        clearInterval(checkInterval);
        handleTokenExpiration();
      }
    }, 3 * 60 * 1000); // 3 minutes (more frequent since we're doing direct swaps)

    return checkInterval;
  };

  // Start the periodic check
  startPeriodicTokenCheck();
}

export default api;