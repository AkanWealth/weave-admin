import axios from "axios";

const api = axios.create({
  baseURL: "https://the-weave-server-3ekl.onrender.com/api/v1/", // Replace with your API base URL
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Add a request interceptor
// api.interceptors.request.use(
//   function (config) {
//     // Do something before the request is sent
//     // For example, add an authentication token to the headers
//     const token = localStorage.getItem("authToken"); // Retrieve auth token from localStorage
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

export default api;
