// import axios from "axios";

// import Cookies from "js-cookie";
// import { baseUrl } from "./envfile";

// // const accessToken =
// //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlOTJkNzA2OS0xYzYwLTQ4YmYtOTE2ZS1lZjVlNWI3ZmMwYjQiLCJlbWFpbCI6Im53YWJ1ZXplYW1hcmFjaGkyOEBnbWFpbC5jb20iLCJpYXQiOjE3Mzc1Njc5ODUsImV4cCI6MTczNzU4NTk4NX0.vLGqLgfj3xPVWnfCNzjqFcLTDyABuRbREN7jtkY1w9Y";
// const api = axios.create({
//   baseURL: baseUrl, // Replace with your API base URL
//   timeout: 20000,
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
// });

// // Add a request interceptor
// api.interceptors.request.use(
//   function (config) {
//     // Do something before the request is sent
//     // For example, add an authentication token to the headers
//     // const token = localStorage.getItem("authToken"); // Retrieve auth token from localStorage
//     const token = Cookies.get("session"); // Retrieve auth token from localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   function (error) {
//     // Handle the error
//     return Promise.reject(error);
//   }
// );

// export default api;



// api.js
// import axios from "axios";
// import Cookies from "js-cookie";
// import { baseUrl } from "./envfile";

// // Create axios instance
// const api = axios.create({
//   baseURL: baseUrl,
//   timeout: 20000,
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
// });

// // Token refresh function
// const refreshAccessToken = async () => {
//   try {
//     const refreshToken = Cookies.get("refreshToken");
//     if (!refreshToken) throw new Error("No refresh token available");

//     const response = await axios.post(`${baseUrl}/auth/refresh-token`, {
//       refreshToken: refreshToken
//     });

//     if (response.data && response.data.accessToken) {
//       Cookies.set("accessToken", response.data.accessToken, {
//         expires: 24 / 24, // 1 hour
//       });
      
//       // If the server also returns a new refresh token, update it
//       if (response.data.refreshToken) {
//         Cookies.set("refreshToken", response.data.refreshToken, {
//           expires: 7, // 7 days
//         });
//       }
      
//       return response.data.accessToken;
//     } else {
//       throw new Error("Failed to refresh token");
//     }
//   } catch (error) {
//     console.error("Token refresh failed:", error);
//     // Clear tokens on refresh failure
//     Cookies.remove("accessToken");
//     Cookies.remove("refreshToken");
//     localStorage.removeItem("userinfo");
    
//     // Redirect to login page if we're in a browser environment
//     // if (typeof window !== "undefined") {
//     //   window.location.href = "/login";
//     // }
    
//     throw error;
//   }
// };

// // Add request interceptor
// api.interceptors.request.use(
//   function (config) {
//     const token = Cookies.get("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor to handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // If error is 401 (Unauthorized) and we haven't tried to refresh the token yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         // Try to refresh the token
//         const newAccessToken = await refreshAccessToken();
        
//         // Update authorization header with new token
//         api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
//         // Retry the original request with new token
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Refresh token failed, redirect to login will happen in refreshAccessToken
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// // Function to set tokens after login
// export const setAuthTokens = (accessToken, refreshToken) => {
//   Cookies.set("accessToken", accessToken, {
//     expires: 1 / 24, // 1 hour
//   });
  
//   Cookies.set("refreshToken", refreshToken, {
//     expires: 7, // 7 days
//   });
  
//   // Also set the session cookie for backward compatibility
//   Cookies.set("session", accessToken, {
//     expires: 1 / 24, // 1 hour
//   });
  
//   api.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
// };

// // Function to clear tokens on logout
// export const clearAuthTokens = () => {
//   Cookies.remove("accessToken");
//   Cookies.remove("refreshToken");
//   Cookies.remove("session");
//   localStorage.removeItem("userinfo");
//   delete api.defaults.headers.common['Authorization'];
// };

// export default api;



// api.js
// api.js
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "./envfile";

// Create axios instance
const api = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Token refresh function
const refreshAccessToken = async () => {
  try {
    // Try to get refresh token from cookies first, then localStorage as fallback
    let refreshToken = Cookies.get("refreshToken");
    
    if (!refreshToken && typeof window !== "undefined") {
      // Fallback: try to get from localStorage
      const userInfo = localStorage.getItem("userinfo");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      
      if (storedRefreshToken) {
        refreshToken = storedRefreshToken;
        console.log("Using refresh token from localStorage");
      } else if (userInfo) {
        try {
          const user = JSON.parse(userInfo);
          if (user.refreshToken) {
            refreshToken = user.refreshToken;
            console.log("Using refresh token from userinfo");
          }
        } catch (e) {
          console.error("Error parsing userinfo:", e);
        }
      }
    }

    if (!refreshToken) {
      console.error("No refresh token found in cookies or localStorage");
      throw new Error("No refresh token available");
    }

    console.log("Attempting to refresh token with refresh token:", refreshToken.substring(0, 20) + "...");
    
    // Make the refresh request
    const response = await axios.post(`${baseUrl}/auth/refresh-token`, {
      refreshToken: refreshToken
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.data && response.data.accessToken) {
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken || refreshToken; // Use new refresh token if provided, otherwise keep the old one
      
      console.log("Token refresh successful");
      
      // Store the new tokens
      Cookies.set("accessToken", newAccessToken, {
        expires: 1 / 24, // 1 hour
        sameSite: 'lax'
      });
      
      // Store refresh token in both places for redundancy
      Cookies.set("refreshToken", newRefreshToken, {
        expires: 7, // 7 days
        sameSite: 'lax'
      });
      
      if (typeof window !== "undefined") {
        localStorage.setItem("refreshToken", newRefreshToken);
      }
      
      // Update the default authorization header with the NEW ACCESS TOKEN
      api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      
      return newAccessToken;
    } else {
      throw new Error("Failed to refresh token - no access token in response");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    
    // If it's a 401 or 403, the refresh token is invalid
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log("Refresh token is invalid, clearing all tokens");
      clearAuthTokens();
      
      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    
    throw error;
  }
};

// Add request interceptor
api.interceptors.request.use(
  function (config) {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        console.log("401 error detected, attempting token refresh...");
        // Try to refresh the token
        const newAccessToken = await refreshAccessToken();
        
        // Update authorization header with new token for the retry
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Retry the original request with new token
        console.log("Retrying original request with new token...");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed during request retry");
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Function to set tokens after login
export const setAuthTokens = (accessToken, refreshToken) => {
  console.log("Setting auth tokens...");
  
  // Set access token in cookies
  Cookies.set("accessToken", accessToken, {
    expires: 1 / 24, // 1 hour
    sameSite: 'lax'
  });
  
  // Set refresh token in cookies
  Cookies.set("refreshToken", refreshToken, {
    expires: 7, // 7 days
    sameSite: 'lax'
  });
  
  // Also store refresh token in localStorage for redundancy
  if (typeof window !== "undefined") {
    localStorage.setItem("refreshToken", refreshToken);
    
    // Update userinfo to include refresh token
    const existingUserInfo = localStorage.getItem("userinfo");
    if (existingUserInfo) {
      try {
        const userInfo = JSON.parse(existingUserInfo);
        userInfo.refreshToken = refreshToken;
        localStorage.setItem("userinfo", JSON.stringify(userInfo));
      } catch (e) {
        console.error("Error updating userinfo with refresh token:", e);
      }
    }
  }
  
  // Set the session cookie for backward compatibility
  Cookies.set("session", accessToken, {
    expires: 1 / 24, // 1 hour
    sameSite: 'lax'
  });
  
  // Set the Authorization header with ACCESS TOKEN
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
  console.log("Auth tokens set successfully");
  console.log("Access token (first 20 chars):", accessToken.substring(0, 20) + "...");
  console.log("Refresh token (first 20 chars):", refreshToken.substring(0, 20) + "...");
};

// Function to clear tokens on logout
export const clearAuthTokens = () => {
  console.log("Clearing auth tokens...");
  
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("session");
  
  if (typeof window !== "undefined") {
    localStorage.removeItem("userinfo");
    localStorage.removeItem("refreshToken");
  }
  
  delete api.defaults.headers.common['Authorization'];
  console.log("Auth tokens cleared");
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken") || (typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null);
  return !!(accessToken || refreshToken);
};

// Function to get current user info
export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userinfo");
    return userInfo ? JSON.parse(userInfo) : null;
  }
  return null;
};

// Function to manually refresh token (useful for testing)
export const manualRefreshToken = async () => {
  try {
    const newToken = await refreshAccessToken();
    console.log("Manual token refresh successful");
    return newToken;
  } catch (error) {
    console.error("Manual token refresh failed:", error);
    throw error;
  }
};

export default api;