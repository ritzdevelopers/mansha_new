"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavSideMenu from "../common/NavSideMenu";

const PHONE = "tel:+919876543210";
const WHATSAPP = "https://wa.me/919876543210";

const iconBtn =
  "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:opacity-60";

const Section1 = () => {
  const [open, setOpen] = useState(false);

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
      <section className="about-hero relative min-h-[calc(100vh-50px)] overflow-hidden md:h-[388px] md:min-h-[388px] md:max-h-[388px] lg:h-[518px] lg:min-h-[518px] lg:max-h-[518px] xl:min-h-screen xl:h-screen xl:max-h-none">
        <Image
          src="/delieverd/royal-mobile.jpg"
          alt="Mansha Royal City"
          fill
          priority
          className="object-cover md:hidden"
          sizes="100vw"
        />
        <Image
          src="/delieverd/royal-banner.jpg"
          alt="Mansha Royal City"
          fill
          priority
          className="hidden object-cover md:block"
          sizes="100vw"
        />
        {/* <div className="absolute inset-0 bg-[#10040445]" /> */}

        <header className="absolute left-0 right-0 top-0 z-50 bg-[#FAFAFA2B] backdrop-blur-[1px] border-b border-white/10">
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
              className="flex shrink-0 items-center py-1 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/mansha-svg/mansha-logo.svg"
                width={100}
                height={70}
                alt="Mansha"
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
                className={iconBtn}
                aria-label="WhatsApp"
              >
                <i
                  className="ri-whatsapp-line text-[22px] leading-none"
                  aria-hidden
                />
              </a>
              <button
                type="button"
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-white transition-opacity active:opacity-60"
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
                  className="brightness-0 invert"
                />
              </button>
            </div>
          </div>
        </header>

        <div className="relative z-20 mx-auto flex min-h-[calc(100vh-50px)] w-full max-w-8xl items-start justify-center px-5 pt-28 sm:px-8 md:h-[388px] md:min-h-[388px] md:items-end md:justify-end md:pt-0 md:pb-10 lg:h-[518px] lg:min-h-[518px] lg:px-[75px] lg:pb-12 xl:min-h-screen xl:h-screen">
          <div className="flex items-stretch gap-4 sm:gap-5">
            <span className="hidden w-px shrink-0 self-stretch bg-white md:block border-2 border-white" aria-hidden />
            <div className="text-center text-white md:text-left">
              <h1 className="whitespace-nowrap font-optima text-[18px] md:text-[25px] lg:text-[36px] font-medium leading-[42px] tracking-[0] capitalize text-white">
                Your Dream. Your Sanctuary.
              </h1>
            </div>
          </div>
        </div>
      </section>

      <NavSideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Section1;
