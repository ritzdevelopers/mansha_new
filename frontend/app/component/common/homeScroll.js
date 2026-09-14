export const HOME_SCROLL_KEY = "mansha-home-scroll-y";

export function saveHomeScrollPosition() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
}

export function getHomeScrollPosition() {
  if (typeof window === "undefined") return null;

  const saved = sessionStorage.getItem(HOME_SCROLL_KEY);
  if (saved === null) return null;

  const y = Number(saved);
  return Number.isFinite(y) ? y : null;
}

export function clearHomeScrollPosition() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(HOME_SCROLL_KEY);
}

export function scrollToHomePosition(y) {
  window.scrollTo({ top: y, left: 0, behavior: "auto" });
}

/** Logo click: reload home from the top (clears restored scroll). */
export function goToHomeFromLogo(event) {
  if (event) event.preventDefault();
  clearHomeScrollPosition();
  if (typeof window === "undefined") return;

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/") {
    window.location.reload();
    return;
  }

  window.location.assign("/");
}
