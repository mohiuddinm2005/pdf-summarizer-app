import axios from "axios";

/**
 * Axios instance configured for FastAPI backend communication.
 * Uses VITE_API_URL environment variable for the base URL.
 * Defaults to http://localhost:8000 for local development.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Request interceptor - logs outgoing requests in development
 */
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.debug(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor - handles errors consistently
 */
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.debug(`[API Response] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error("[API Error]", {
        status: error.response?.status,
        url: error.config?.url,
        message: error.response?.data?.detail || error.message,
      });
    }
    return Promise.reject(error);
  },
);

export default api;
