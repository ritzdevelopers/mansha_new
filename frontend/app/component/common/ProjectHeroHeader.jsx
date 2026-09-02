"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NavSideMenu from "./NavSideMenu";

const PHONE = "tel:+917070705457";
const WHATSAPP = "https://wa.me/918010003838";
const IDLE_HIDE_MS = 1400;
const TOP_THRESHOLD = 16;

const ProjectHeroHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [idleHidden, setIdleHidden] = useState(false);
  const idleTimer = useRef(null);

  useEffect(() => {
    const clearIdle = () => {
      if (idleTimer.current) {
        window.clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
    };

    const onScroll = () => {
      const isScrolled = window.scrollY > TOP_THRESHOLD;
      setScrolled(isScrolled);
      setIdleHidden(false);
      clearIdle();

      if (!isScrolled) return;

      idleTimer.current = window.setTimeout(() => {
        if (window.scrollY > TOP_THRESHOLD) setIdleHidden(true);
      }, IDLE_HIDE_MS);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearIdle();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    const onKeyUp = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, []);

  const hideBar = idleHidden && !open;
  const lightBar = scrolled;

  const iconBtn = lightBar
    ? "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-[#2c2c2a] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2c2c2a]/40 active:opacity-60"
    : "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:opacity-60";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 overflow-visible rounded-none border-b transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out ${
          hideBar ? "-translate-y-full pointer-events-none" : "translate-y-0"
        } ${
          lightBar
            ? "border-[#E8E4DC] bg-[#FAFAFA] shadow-sm"
            : "border-white/10 bg-[#FAFAFA2B]"
        }`}
      >
        {open && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/20"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="relative z-50 mx-auto flex h-14 max-w-8xl items-center justify-between px-5 py-10 sm:px-8 lg:px-[75px]">
          <Link
            href="/"
            className={`flex shrink-0 items-center py-1 outline-offset-4 focus-visible:outline focus-visible:outline-2 ${
              lightBar
                ? "focus-visible:outline-[#6b3d3d]/50"
                : "focus-visible:outline-white/50"
            }`}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/mansha-svg/mansha-logo.svg"
              width={100}
              height={70}
              alt="Mansha"
              title="Mansha"
              className={`h-12 w-auto sm:h-15 ${
                lightBar
                  ? ""
                  : "brightness-0 invert drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
              }`}
              priority
            />
          </Link>

          <div className="flex shrink-0 items-center gap-0 sm:gap-3">
            <a href={PHONE} className={iconBtn} aria-label="Call us">
              <i className="ri-phone-line text-[22px] leading-none" aria-hidden />
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className={iconBtn}
              aria-label="WhatsApp"
            >
              <i className="ri-whatsapp-line text-[22px] leading-none" aria-hidden />
            </a>
            <button
              type="button"
              className={`inline-flex h-11 w-11 cursor-pointer items-center justify-center transition-opacity active:opacity-60 ${
                lightBar ? "text-[#2c2c2a]" : "text-white"
              }`}
              aria-controls="mobile-navigation"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((prev) => !prev)}
            >
              <Image
                src="/mansha-svg/humburger-sanskar.svg"
                width={22}
                height={22}
                alt="menu"
                className={lightBar ? "brightness-0" : "brightness-0 invert"}
              />
            </button>
          </div>
        </div>
      </header>

      <NavSideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ProjectHeroHeader;
