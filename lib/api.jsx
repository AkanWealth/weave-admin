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

// ⏳ Check if token is about to expire (within 5 minutes)
const isTokenAboutToExpire = () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return true;

  try {
    const tokenParts = accessToken.split('.');
    if (tokenParts.length !== 3) return true;

    const payload = JSON.parse(atob(tokenParts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiration = payload.exp - currentTime;

    return timeUntilExpiration <= 300;
  } catch (error) {
    console.error("Token decode error:", error);
    return true;
  }
};

// 🔁 Replace accessToken using refreshToken from localStorage
const replaceAccessTokenWithRefreshToken = async () => {
  try {
    let refreshToken =
      Cookies.get("refreshToken") ||
      localStorage.getItem("refreshToken") ||
      JSON.parse(localStorage.getItem("userinfo") || "{}")?.refreshToken;

    if (!refreshToken) {
      console.error("No refresh token found");
      return false;
    }

    const response = await axios.post(`${baseUrl}/auth/refresh-token`, {
      refreshToken,
    });

    const newAccessToken = response.data.accessToken;
    if (!newAccessToken) {
      console.error("No access token returned");
      return false;
    }

    Cookies.set("accessToken", newAccessToken, {
      expires: 1 / 24, // 1 hour
      sameSite: 'lax'
    });

    Cookies.set("session", newAccessToken, {
      expires: 1 / 24,
      sameSite: 'lax'
    });

    api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
    console.log("Access token refreshed successfully");
    return true;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return false;
  }
};

// ❌ Handle token expiration (logout)
const handleTokenExpiration = () => {
  console.log("Tokens expired, logging out");
  clearAuthTokens();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

// 🛑 Request Interceptor
api.interceptors.request.use(
  async (config) => {
    if (isTokenAboutToExpire()) {
      console.log("Access token about to expire, refreshing...");
      const success = await replaceAccessTokenWithRefreshToken();
      if (!success) {
        console.warn("Token refresh failed");
      }
    }

    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔐 Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("401 detected, trying token refresh...");

      const success = await replaceAccessTokenWithRefreshToken();
      if (success) {
        const token = Cookies.get("accessToken");
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      } else {
        handleTokenExpiration();
        return Promise.reject(error);
      }
    }

    if (error.response?.status === 401 && originalRequest._retry) {
      handleTokenExpiration();
    }

    return Promise.reject(error);
  }
);

// ✅ Set tokens after login
export const setAuthTokens = (accessToken, refreshToken) => {
  Cookies.set("accessToken", accessToken, { expires: 1 / 24, sameSite: "lax" });
  Cookies.set("refreshToken", refreshToken, { expires: 7, sameSite: "lax" });
  Cookies.set("session", accessToken, { expires: 1 / 24, sameSite: "lax" });

  if (typeof window !== "undefined") {
    localStorage.setItem("refreshToken", refreshToken);
    const existingUserInfo = localStorage.getItem("userinfo");
    if (existingUserInfo) {
      try {
        const user = JSON.parse(existingUserInfo);
        user.refreshToken = refreshToken;
        localStorage.setItem("userinfo", JSON.stringify(user));
      } catch (e) {
        console.error("Failed to update userinfo with refresh token");
      }
    }
  }

  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// 🚪 Clear tokens on logout
export const clearAuthTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("session");

  if (typeof window !== "undefined") {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userinfo");
  }

  delete api.defaults.headers.common["Authorization"];
};

// ✅ Auth status check
export const isAuthenticated = () => {
  return !!(
    Cookies.get("accessToken") ||
    Cookies.get("refreshToken") ||
    localStorage.getItem("refreshToken")
  );
};

// ✅ Get user info
export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("userinfo");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// 🔧 Manual token refresh (for testing)
export const manualTokenReplacement = () => {
  return replaceAccessTokenWithRefreshToken();
};

// ✅ Get token expiration status
export const getTokenExpirationStatus = () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken") || localStorage.getItem("refreshToken");

  if (!accessToken && !refreshToken) {
    return { status: "no_tokens", message: "No tokens available" };
  }

  if (!accessToken && refreshToken) {
    return { status: "access_expired", message: "Access token expired, refresh token available" };
  }

  if (isTokenAboutToExpire()) {
    return { status: "about_to_expire", message: "Access token expires soon" };
  }

  return { status: "valid", message: "Access token is valid" };
};

// 🕒 Refresh every 5 minutes
if (typeof window !== "undefined") {
  setInterval(async () => {
    const status = getTokenExpirationStatus();
    console.log("Token status check:", status);

    if (status.status === "about_to_expire" || status.status === "access_expired") {
      await replaceAccessTokenWithRefreshToken();
    }
  }, 5 * 60 * 1000); // 5 minutes
}

export default api;
