"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavSideMenu from "../common/NavSideMenu";

const PHONE = "tel:+919876543210";
const WHATSAPP = "https://wa.me/919876543210";

const iconBtn =
  "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-[#2c2c2a] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2c2c2a]/40 active:opacity-60";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const buildTrustSection = document.getElementById("build-trust-section");
      if (!buildTrustSection) return;

      const shouldShowFixedNav = window.scrollY >= buildTrustSection.offsetTop;
      setShowFixedNav((prev) =>
        prev === shouldShowFixedNav ? prev : shouldShowFixedNav
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <>
      <header
        className={`z-50 bg-[#FAFAFA] ${
          showFixedNav
            ? "navbar-slide-down fixed left-0 right-0 top-0 shadow-sm"
            : "relative"
        }`}
      >
        {open && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/15"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="relative z-50 mx-auto flex h-14 max-w-8xl items-center justify-between px-5 py-10 sm:px-8 lg:px-[75px]">
          <Link
            href="/"
            className="flex shrink-0 items-center py-1 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6b3d3d]/50"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/mansha-svg/mansha-logo.svg"
              width={100}
              height={70}
              alt="Mansha"
              title="Mansha"
              className="h-12 w-auto sm:h-15"
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
              // onClick={()=>setOpen((prev)=>!prev)}
              className={iconBtn}
              aria-label="WhatsApp"
               // onClick={() => setOpen((prev) => !prev)}
            >
              <i className="ri-whatsapp-line text-[22px] leading-none" aria-hidden />
            </a>
            <button
              type="button"
              className="inline-flex cursor-pointer h-11 w-11 items-center justify-center text-[#2c2c2a] transition-opacity  active:opacity-60"
              aria-controls="mobile-navigation"
              aria-expanded={open}
             onClick={()=>setOpen((prev)=>!prev)}
            >
              <Image src="/mansha-svg/humburger-sanskar.svg" alt="humburger-sanskar" width={22} height={22}  className="brightness-0" title="humburger-sanskar" />
            </button>
          </div>
        </div>
      </header>

      <NavSideMenu open={open} onClose={() => setOpen(false)} />

      <style jsx global>{`
        @keyframes navbar-slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .navbar-slide-down {
          animation: navbar-slide-down 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

      `}</style>
    </>
  );
}

export default Navbar;
