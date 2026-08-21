import axios from "axios";

const rawApiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://mansha-backend-ov04.onrender.com"
    : "http://localhost:3001");

const normalizedApiUrl = rawApiUrl.replace(/\/+$/, "").replace(/\/api$/, "");
const PROD_API = "https://mansha-backend-ov04.onrender.com";

function apiOrigin() {
  const fromEnv = (process.env.NEXT_PUBLIC_API_URL || "")
    .replace(/\/+$/, "")
    .replace(/\/api$/, "");

  if (process.env.NODE_ENV === "production") {
    // Ignore the old suspended Render URL if it is still set on Vercel.
    if (!fromEnv || fromEnv.includes("dxti.onrender.com")) {
      return PROD_API;
    }
    return fromEnv;
  }

  return fromEnv || "http://localhost:3001";
}

const axiosInstance = axios.create({
  baseURL: `${apiOrigin()}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
