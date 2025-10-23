import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL || "";

// Axios instance for app API calls.
// Do not hardcode URLs; uses REACT_APP_API_BASE_URL from environment.
export const apiClient = axios.create({
  baseURL,
  timeout: 15000
});

// Basic response interceptor for future global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally centralize error logging/notifications here
    return Promise.reject(error);
  }
);
