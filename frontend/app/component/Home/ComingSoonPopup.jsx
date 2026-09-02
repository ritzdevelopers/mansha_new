"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const STORAGE_KEY = "mansha-coming-soon-popup-seen";
const COOKIE_NAME = "mansha_coming_soon_seen";
const SEEN_VALUE = "1";
const ONE_YEAR_SEC = 60 * 60 * 24 * 365;

function hasSeenPopup() {
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === SEEN_VALUE) return true;
  } catch {
    /* storage blocked */
  }
  try {
    return document.cookie.split(";").some((part) => part.trim() === `${COOKIE_NAME}=${SEEN_VALUE}`);
  } catch {
    return false;
  }
}

function markPopupSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, SEEN_VALUE);
  } catch {
    /* storage blocked */
  }
  try {
    const host = window.location.hostname;
    const domain =
      host.endsWith("manshagroup.com") || host.endsWith("manshagroup.in")
        ? `; Domain=.${host.split(".").slice(-2).join(".")}`
        : "";
    document.cookie = `${COOKIE_NAME}=${SEEN_VALUE}; Path=/; Max-Age=${ONE_YEAR_SEC}; SameSite=Lax${domain}`;
  } catch {
    /* cookies blocked */
  }
}

export default function ComingSoonPopup() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const path = window.location.pathname || "";
    if (path.startsWith("/dashboard") || path.startsWith("/upcoming-project")) {
      return undefined;
    }
    if (hasSeenPopup()) return undefined;

    const showTimer = setTimeout(() => {
      markPopupSeen();
      setMounted(true);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    markPopupSeen();
    setVisible(false);
    setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, 300);
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 sm:p-6 transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Coming Soon"
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-[960px] overflow-hidden rounded-md border-[3px] border-[#d4a84b] bg-black shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-all duration-300 ease-out ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
        >
          <i className="ri-close-line text-2xl leading-none" aria-hidden="true" />
        </button>

        <Link href="/upcoming-project" onClick={handleClose} className="block cursor-pointer">
          <Image
            src="/coming-soon-popup.jpeg"
            alt="Coming Soon — Sector-104 Faridabad. A Different View Lies Ahead."
            title="Coming Soon — Sector-104 Faridabad"
            width={1600}
            height={900}
            priority
            className="h-auto w-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
