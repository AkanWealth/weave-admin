import axios from "axios";

import Cookies from "js-cookie";
import { baseUrl } from "./envfile";

// const accessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlOTJkNzA2OS0xYzYwLTQ4YmYtOTE2ZS1lZjVlNWI3ZmMwYjQiLCJlbWFpbCI6Im53YWJ1ZXplYW1hcmFjaGkyOEBnbWFpbC5jb20iLCJpYXQiOjE3Mzc1Njc5ODUsImV4cCI6MTczNzU4NTk4NX0.vLGqLgfj3xPVWnfCNzjqFcLTDyABuRbREN7jtkY1w9Y";
const api = axios.create({
  baseURL: baseUrl, // Replace with your API base URL
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    // For example, add an authentication token to the headers
    // const token = localStorage.getItem("authToken"); // Retrieve auth token from localStorage
    const token = Cookies.get("session"); // Retrieve auth token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

export default api;
