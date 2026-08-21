import axios from "axios";

const rawApiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://mansha-backend-ov04.onrender.com"
    : "http://localhost:3001");

const normalizedApiUrl = rawApiUrl.replace(/\/+$/, "").replace(/\/api$/, "");

const axiosInstance = axios.create({
  baseURL: `${normalizedApiUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
