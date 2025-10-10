import axios from "axios";

// Standard API instance: includes cookies (withCredentials: true)
// Used for standard login/logout/loadUser where cookies are expected.
const API = axios.create({
  baseURL: "http://localhost:5000/api",  
  withCredentials: true,
});

// Request Interceptor: Inject the JWT from localStorage into the Authorization header
// This ensures that all calls made with the 'API' instance are authenticated
// if a token is present in local storage (e.g., after an OAuth login).
API.interceptors.request.use(
    (config) => {
        // Only run this logic in the browser environment
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            
            // If a token exists in localStorage, attach it to the request header
            // If the Authorization header is already set, we do not overwrite it.
            if (token && !config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// New Token API instance: EXCLUDES cookies (withCredentials: false)
// Used specifically for OAuth token validation, ensuring only the Bearer token is sent.
export const TokenAPI = axios.create({
  baseURL: "http://localhost:5000/api",  
  withCredentials: false, 
});

export default API;
