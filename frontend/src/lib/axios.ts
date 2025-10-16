// frontend/utils/axios.ts
import axios from "axios";

// ✅ Standard API instance: uses httpOnly cookies for auth
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  withCredentials: true, // send cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: global response interceptor for API
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request - maybe token expired");
      // optional: redirect to login
    }
    return Promise.reject(error);
  }
);

// ✅ TokenAPI: for manual Bearer token usage (e.g., OAuth)
export const TokenAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  withCredentials: true, // no cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
