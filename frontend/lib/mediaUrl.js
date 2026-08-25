import { apiOrigin } from "./axiosInstance";

export function resolveMediaUrl(src) {
  if (!src) return "";
  const normalized = String(src).replace(/\\/g, "/");
  if (/^https?:\/\//i.test(normalized)) return normalized;
  if (normalized.startsWith("/uploads/") || normalized.startsWith("uploads/")) {
    return `${apiOrigin()}/${normalized.replace(/^\//, "")}`;
  }
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

export function formatBlogDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
