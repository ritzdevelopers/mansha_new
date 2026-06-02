"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavSideMenu from "../common/NavSideMenu";

const PHONE = "tel:+919876543210";
const WHATSAPP = "https://wa.me/919876543210";

const iconBtn =
  "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:opacity-60";

const BlogDetailBanner = ({ title }) => {
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
      <section className="about-hero relative min-h-screen overflow-hidden md:h-[388px] md:min-h-[388px] md:max-h-[388px] lg:h-[518px] lg:min-h-[518px] lg:max-h-[518px] xl:min-h-screen xl:h-screen xl:max-h-none">
        <Image
          src="/blog/blog-mobile-banner.jpg"
          alt={title}
          fill
          priority
          className="object-cover md:hidden"
          sizes="100vw"
        />
        <Image
          src="/blog/blog-banner.jpg"
          alt={title}
          fill
          priority
          className="hidden object-cover md:block"
          sizes="100vw"
        />

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
                height={50}
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

        <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-8xl items-end px-5 pb-8 sm:px-8 md:h-[388px] md:min-h-[388px] lg:h-[518px] lg:min-h-[518px] lg:px-[75px] xl:min-h-screen xl:h-screen">
          <div className="max-w-4xl text-white">
            <h1 className="font-[Optima] text-[28px] font-[500] leading-[38px] tracking-[0] capitalize text-white sm:text-[32px] sm:leading-[42px] lg:text-[36px] lg:leading-[48px]">
              {title}
            </h1>
            {/* <div className="mt-2 flex flex-wrap items-center gap-1 font-[Montserrat] text-[16px] font-medium leading-[100%] tracking-[0] capitalize text-white">
              <Link href="/" className="hover:opacity-80">
                Home
              </Link>
              <i className="ri-arrow-right-s-line text-base" aria-hidden />
              <Link href="/blog" className="hover:opacity-80">
                Blogs
              </Link>
              <i className="ri-arrow-right-s-line text-base" aria-hidden />
              <span className="line-clamp-1">Blog Detail</span>
            </div> */}
          </div>
        </div>
      </section>

      <NavSideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default BlogDetailBanner;
