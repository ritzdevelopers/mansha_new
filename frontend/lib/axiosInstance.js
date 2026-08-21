import axios from "axios";

const rawApiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://mansha-backend-ov04.onrender.com"
    : "http://localhost:3001");

const normalizedApiUrl = rawApiUrl.replace(/\/+$/, "").replace(/\/api$/, "");

// Production browser traffic stays on manshagroup.com so login is not a
// cross-origin call (avoids CORS when the API is on Render).
const useSameOriginProxy =
  typeof window !== "undefined" && process.env.NODE_ENV === "production";

const axiosInstance = axios.create({
  baseURL: useSameOriginProxy ? "/api-proxy" : `${normalizedApiUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
