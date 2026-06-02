"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavSideMenu from "../common/NavSideMenu";

const PHONE = "tel:+919876543210";
const WHATSAPP = "https://wa.me/919876543210";
const VEGA_SLIDES = [
  "/vega-street/vega-street1.jpg",
  "/vega-street/vega-street2.jpg",
  "/vega-street/vega-street3.jpg",

];

const iconBtn =
  "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:opacity-60";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeVegaSlide, setActiveVegaSlide] = useState(0);

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveVegaSlide((prev) => (prev + 1) % VEGA_SLIDES.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="about-hero relative min-h-[calc(100vh-50px)] overflow-hidden md:h-[388px] md:min-h-[388px] md:max-h-[388px] lg:h-[518px] lg:min-h-[518px] lg:max-h-[518px] xl:min-h-screen xl:h-screen xl:max-h-none">
        <Image
          src="/vega-street/vega-street-mobile-banner.jpg"
          alt="Vega Street"
          fill
          priority
          className="object-cover md:hidden"
          sizes="100vw"
        />
        <Image
          src="/vega-street/vega-street-banner.jpg"
          alt="Vega Street"
          fill
          priority
          className="hidden object-cover object-[center_30%] md:block lg:object-center"
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

        <div className="relative z-20 mx-auto flex min-h-[calc(100vh-50px)] w-full max-w-8xl items-start justify-center px-5 pt-28 sm:px-8 md:h-[388px] md:min-h-[388px] md:items-end md:justify-end md:pt-0 md:pb-10 lg:h-[518px] lg:min-h-[518px] lg:px-[75px] lg:pb-12 xl:min-h-screen xl:h-screen">
          <div className="flex items-stretch gap-4 sm:gap-5">
            <span className="hidden w-px shrink-0 self-stretch bg-white md:block" aria-hidden />
            <div className="text-center text-white md:text-left">
              <h1 className="whitespace-nowrap font-optima text-[18px] md:text-[25px] lg:text-[36px] font-medium leading-[42px] tracking-[0] capitalize text-white">
              Designed For Modern Luxury
              </h1>
              <p className="mt-0 md:mt-2 font-optima text-[16px] md:text-[18px] lg:text-[27px] font-medium leading-[100%] tracking-[0] capitalize text-white">
              Refined Urban Living
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full  bg-white py-[35px] lg:py-[70px]">
        <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
          <div className="mb-6 flex items-center justify-center gap-1 font-montserrat text-[16px] font-normal leading-[100%] tracking-[0] capitalize text-white sm:mb-8 md:justify-start">
            <span className="text-[#666666]">Home</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#666666]">Residential</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#652A27] font-semibold">Vega Street</span>
          </div>

          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[230px_1fr] xl:grid-cols-[260px_1fr] xl:gap-15">
            <div className="flex justify-center lg:justify-start">
              <div className="relative h-[230px] w-[230px] overflow-hidden rounded-full xl:h-[260px] xl:w-[260px]">
                <Image
                  src="/vega-street/circle.jpg"
                  alt="Vega Street circular preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1279px) 230px, 260px"
                />
              </div>
            </div>

            <div className="relative overflow-hidden border border-[#E2E2E2] bg-white lg:mr-[-70px]">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeVegaSlide * 100}%)` }}
              >
                {VEGA_SLIDES.map((src) => (
                  <div key={src} className="relative h-[150px] w-full shrink-0 md:h-[280px] lg:h-[280px] xl:h-[470px]">
                    <Image
                      src={src}
                      alt="Vega Street slider visual"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 75vw"
                    />
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {VEGA_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setActiveVegaSlide(idx)}
                    className={`pointer-events-auto h-2 rounded-full transition-all ${
                      activeVegaSlide === idx ? "w-7 bg-white" : "w-2 h-2 bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white pb-[35px] lg:pb-[70px]">
        <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
          <div className="grid grid-cols-1 justify-items-center gap-4 lg:grid-cols-[1fr_1.7fr] md:justify-items-start xl:gap-0">
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="font-optima text-[24px] md:text-[36px] lg:text-[36px] font-medium leading-[100%] tracking-[0] text-black text-center md:text-left">
              The Future of High-Street Living
              </h2>
              <Link href="/contact">
              <button
  type="button"
  className="group relative mt-4 hidden w-fit items-center gap-2 overflow-hidden rounded-full border border-[#652A27] bg-[#652A27] px-6 py-4 font-montserrat text-[16px] font-normal leading-[100%] tracking-[0] text-white transition-all duration-500 lg:mt-8 lg:inline-flex cursor-pointer"
>
  {/* Hover Background */}
  <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>

  {/* Text */}
  <span className="relative z-10 transition-colors duration-500 group-hover:text-[#652A27]">
    Enquire Now
  </span>

  {/* Icon */}
  <i
    className="ri-arrow-right-line relative z-10 text-[20px] transition-colors duration-500 group-hover:text-[#652A27]"
    aria-hidden
  />
</button>
            </Link>
            </div>
            <p className="text-center font-montserrat text-[16px] font-normal leading-[25px] md:leading-[28px] tracking-[0px] capitalize text-[#333333] md:text-left">
            An initiative by Mansha Group, Vega Street is envisioned as a landmark destination that brings together premium retail, lifestyle, and leisure. Designed to reflect global high-street experiences, it creates a space where brands,people, and experiences seamlessly connect. With a thoughtfully planned layout and modern infrastructure, it offers the perfect blend of accessibility and elegance. Curated to host renowned brands, fine dining, and vibrant social spaces, it redefines everyday experiences. Every element is crafted to enhance footfall, engagement, and long-term value. Its strategic location ensures excellent visibility and consistent growth potential. More than just a commercial space, it is designed to become a thriving lifestyle hub.

            </p>
            
            <button
              type="button"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#652A27] px-6 py-3 font-montserrat text-[16px] font-normal leading-[100%] tracking-[0] text-white lg:hidden"
            >
              Enquire Now
              <i className="ri-arrow-right-line text-[20px]" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      <NavSideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;