import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL || "";

/**
 * Build a safe, user-friendly error object from Axios error.
 * Prefers server-provided messages, falls back to status text or a constructed message.
 * No stack traces or sensitive payloads are exposed.
 */
function normalizeAxiosError(error) {
  // Network error: no response from server
  if (!error.response) {
    const message = error.message?.toLowerCase().includes("network")
      ? "Network error: please check your connection."
      : "Unable to reach the server. Please try again.";
    return {
      message,
      code: "NETWORK_ERROR",
      status: 0,
      fields: undefined
    };
  }

  const { status, statusText, data } = error.response || {};
  // Common server fields: message, error, errors (validation), detail
  const serverMessage =
    (data && (data.message || data.error || data.detail)) ||
    statusText ||
    null;

  // Collect field-level validation errors if present
  let fields;
  if (data && data.errors && typeof data.errors === "object") {
    // Keep only serializable simple structures
    fields = Array.isArray(data.errors) ? data.errors : { ...data.errors };
  }

  // Construct a final safe message
  const fallback = status
    ? `Request failed with status ${status}${statusText ? `: ${statusText}` : ""}`
    : "Request failed. Please try again.";
  const safeMessage = (typeof serverMessage === "string" && serverMessage.trim())
    ? serverMessage.trim()
    : fallback;

  return {
    message: safeMessage,
    code: data?.code || `HTTP_${status || "ERROR"}`,
    status: status ?? null,
    fields
  };
}

// Axios instance for app API calls.
// Do not hardcode URLs; uses REACT_APP_API_BASE_URL from environment.
export const apiClient = axios.create({
  baseURL,
  timeout: 15000
});

// Response interceptor to normalize and surface server-provided error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize error shape and reject with a safe object
    const normalized = normalizeAxiosError(error);
    // Do not log secrets; only minimal context if needed in future.
    return Promise.reject(normalized);
  }
);

// PUBLIC_INTERFACE
export function getNormalizedError(err) {
  /** Returns the normalized error (message, code, status, fields) for any Axios error-like input. */
  return normalizeAxiosError(err || {});
}
