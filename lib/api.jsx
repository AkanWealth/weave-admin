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
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(`${baseUrl}/auth/refresh-token`, {
      refreshToken: refreshToken
    });

    if (response.data && response.data.accessToken) {
      Cookies.set("accessToken", response.data.accessToken, {
        expires: 24 / 24, // 1 hour
      });
      
      // If the server also returns a new refresh token, update it
      if (response.data.refreshToken) {
        Cookies.set("refreshToken", response.data.refreshToken, {
          expires: 7, // 7 days
        });
      }
      
      return response.data.accessToken;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    // Clear tokens on refresh failure
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("userinfo");
    
    // Redirect to login page if we're in a browser environment
    if (typeof window !== "undefined") {
      window.location.href = "/login";
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
        // Try to refresh the token
        const newAccessToken = await refreshAccessToken();
        
        // Update authorization header with new token
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Retry the original request with new token
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, redirect to login will happen in refreshAccessToken
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Function to set tokens after login
export const setAuthTokens = (accessToken, refreshToken) => {
  Cookies.set("accessToken", accessToken, {
    expires: 1 / 24, // 1 hour
  });
  
  Cookies.set("refreshToken", refreshToken, {
    expires: 7, // 7 days
  });
  
  // Also set the session cookie for backward compatibility
  Cookies.set("session", accessToken, {
    expires: 1 / 24, // 1 hour
  });
  
  api.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
};

// Function to clear tokens on logout
export const clearAuthTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("session");
  localStorage.removeItem("userinfo");
  delete api.defaults.headers.common['Authorization'];
};

export default api;