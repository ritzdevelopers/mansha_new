"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PHONE = "tel:+919876543210";
const PHONE_TEXT = "+91 98765 43210";
const EMAIL = "mailto:info@manshagroup.in";
const EMAIL_TEXT = "info@manshagroup.in";
const WHATSAPP = "https://wa.me/919876543210";
const NAV_ITEMS = ["Home", "About", "Contact", " Carrers", "Blogs"];

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
              className="inline-flex cursor-pointer h-11 w-11 items-center justify-center text-[#2c2c2a] transition-opacity  active:opacity-60"
              aria-controls="mobile-navigation"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((prev) => !prev)}
            >
              <Image src="/mansha-image/humburger.svg" width={22} height={22} alt="menu" />
            </button>
          </div>
        </div>
      </header>

      <aside
        id="mobile-navigation"
        className={`fixed top-0 right-0 z-50 flex h-screen w-[450px] max-w-[90vw] flex-col bg-[#ECECEC] p-8 transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Main mobile"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
          className="absolute top-5 right-5 inline-flex h-9 w-9 cursor-pointer items-center justify-center text-black transition-opacity hover:opacity-70"
        >
          <i className="ri-close-large-line text-[20px]" aria-hidden />
        </button>
        <div className="flex justify-center">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src="/mansha-svg/mansha-logo.svg"
              width={100}
              height={56}
              alt="Mansha"
              className="h-auto w-[100px]"
            />
          </Link>
        </div>
        <nav className="mt-8" aria-label="Sidebar menu">
          <ul className="space-y-8 pl-2">
            {NAV_ITEMS.map((item, index) => (
              <li key={`mobile-${item}`}>
              <a
  href="#"
  onClick={() => setOpen(false)}
  className={`optima-menu-link block cursor-pointer text-black text-[30px] hover:text-[#652A27] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
  }`}
  style={{ transitionDelay: open ? `${200 + index * 120}ms` : "0ms" }}
>
  {item}
</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-8 pl-2">
          <a
            href={PHONE}
            className=" optima-menu-link block cursor-pointer text-[22px] font-medium text-black transition-colors hover:text-[#652A27]"
          >
            {PHONE_TEXT}
          </a>
          <a
            href={EMAIL}
            className="optima-menu-link mt-3 block cursor-pointer text-[22px] font-medium text-black transition-colors hover:text-[#652A27]"
          >
            {EMAIL_TEXT}
          </a>
        </div>
      </aside>

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

        .optima-menu-link {
          font-family: Optima, "Segoe UI", Candara, "Noto Sans", sans-serif;
       
          line-height: 1.2;
        }
      `}</style>
    </>
  );
}

export default Navbar;
