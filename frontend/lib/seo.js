export const SITE_ORIGIN = "https://www.manshagroup.in";

export function blogCanonicalUrl(slug) {
  const clean = String(slug || "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/^blog\//, "");
  if (!clean) return `${SITE_ORIGIN}/blog`;
  return `${SITE_ORIGIN}/blog/${clean}`;
}

export function parseKeywords(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function absoluteUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
