"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



const PHONE = "tel:+919876543210";
const WHATSAPP = "https://wa.me/919876543210";

function MenuMark() {
  return (
    <span className="flex w-[22px] flex-col items-end gap-[5px]" aria-hidden>
      <span className="h-0.5 w-full max-w-[22px] rounded-full bg-current" />
      <span className="h-0.5 w-[13px] rounded-full bg-current" />
    </span>
  );
}

const iconBtn =
  "inline-flex h-11 w-11 items-center justify-center rounded-md text-[#2c2c2a] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2c2c2a]/40 active:opacity-60";

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

        <div className="relative z-50 mx-auto flex h-14 max-w-8xl items-center justify-between px-5 py-8 sm:px-8 lg:px-[75px]">
          <Link
            href="/"
            className="flex shrink-0 items-center py-1 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6b3d3d]/50"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/mansha-svg/mansha-logo.svg"
              width={90}
              height={50}
              alt="Mansha"
              className="h-16 w-auto sm:h-12"
              priority
            />
          </Link>

          <nav
            id="main-navigation"
            className={`fixed inset-x-0 top-14 z-50 flex max-h-[min(72vh,calc(100dvh-3.5rem))] flex-col gap-0.5 overflow-y-auto border-b border-neutral-200/80 bg-[#f4f3f2] px-5 py-3 shadow-sm sm:absolute sm:right-5 sm:left-auto sm:top-full sm:mt-1.5 sm:w-52 sm:rounded-lg sm:border sm:border-neutral-200/80 sm:bg-[#f9f8f7] sm:py-2 sm:shadow-md lg:right-8 ${
              open ? "flex" : "hidden"
            }`}
            aria-label="Main"
          >
         
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
             
              aria-controls="main-navigation"
            
            >
             
             <Image src="/mansha-svg/humburger.svg" width={22} height={22} alt="menu" />
            
            </button>
          </div>
        </div>
      </header>

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
