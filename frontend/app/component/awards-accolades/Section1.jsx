"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavSideMenu from "../common/NavSideMenu";

const PHONE = "tel:+919876543210";
const WHATSAPP = "https://wa.me/919876543210";

const AWARD_SLIDES = [
  "/award/mansha-award2.png",
  "/award/mansha-award3.jpg",
  "/award/mansha-award5.jpg",
  "/award/mansha-award6.jpg",
  "/award/mansha-award7.jpg",
  "/award/mansha-award8.jpg",
  "/award/mansha-award.png",
];

const STATS = [
  { value: "18+", label: "Years of trust" },
  { value: "6", label: "Major recognitions" },
  { value: "3", label: "Countries" },
];

const iconBtn =
  "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-black transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 active:opacity-60";

const Section1 = () => {
  const [open, setOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesVisible, setSlidesVisible] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const maxSlide = Math.max(0, AWARD_SLIDES.length - slidesVisible);
  const sliderSlides = [
    ...AWARD_SLIDES,
    ...AWARD_SLIDES.slice(0, slidesVisible),
  ];
  const dotIndex = activeSlide > maxSlide ? 0 : activeSlide;

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
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqSm = window.matchMedia("(min-width: 640px)");
    const update = () => {
      if (mqLg.matches) setSlidesVisible(3);
      else if (mqSm.matches) setSlidesVisible(2);
      else setSlidesVisible(1);
    };
    update();
    mqLg.addEventListener("change", update);
    mqSm.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqSm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    setActiveSlide(0);
    setIsTransitioning(true);
  }, [slidesVisible]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => prev + 1);
      setIsTransitioning(true);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const handleSliderTransitionEnd = () => {
    if (activeSlide >= AWARD_SLIDES.length) {
      setIsTransitioning(false);
      setActiveSlide(0);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsTransitioning(true)),
      );
    }
  };

  const slideWidth = 100 / slidesVisible;

  return (
    <>
      <section className="w-full pb-8 pt-0 lg:pb-12">
        <header className="sticky top-0 z-50 border-b border-[#E8E4DC] bg-[#F9F8F3]/95 backdrop-blur-sm">
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
              className="flex shrink-0 items-center py-1 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#652A27]/40"
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
                <i className="ri-whatsapp-line text-[22px] leading-none" aria-hidden />
              </a>
              <button
                type="button"
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-black transition-opacity active:opacity-60"
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
                  className="brightness-0"
                />
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
          <div className="rounded-[20px] mt-5  bg-[#F9F8F3] px-4 py-10 text-center sm:px-8 sm:py-12 lg:py-14">
            <p className="font-montserrat text-[11px] font-medium uppercase tracking-[0.22em] text-[#888888] sm:text-[12px]">
              Mansha Group
            </p>
            <h1 className="mt-4 font-optima text-[32px] font-medium capitalize leading-[110%] tracking-[0] text-[#111111] sm:text-[40px] lg:text-[48px]">
              Awards &amp; Accolades
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-montserrat text-[14px] font-normal leading-[160%] text-[#555555] sm:text-[15px] lg:text-[16px]">
              Excellence recognised. Trust earned. From Delhi NCR to global stages — our work
              speaks for itself.
            </p>

            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-stretch justify-center gap-8 sm:flex-row sm:items-center sm:gap-0">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex flex-1 flex-col items-center px-4 ${
                    index > 0 ? "sm:border-l sm:border-[#D8D4CC]" : ""
                  }`}
                >
                  <p className="font-optima text-[36px] font-medium leading-none text-[#111111] sm:text-[40px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-montserrat text-[13px] font-normal text-[#666666] sm:text-[14px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-6 overflow-hidden lg:mt-8">
            <div
              className="flex ease-out"
              style={{
                transform: `translateX(-${activeSlide * slideWidth}%)`,
                transitionProperty: "transform",
                transitionDuration: isTransitioning ? "700ms" : "0ms",
              }}
              onTransitionEnd={handleSliderTransitionEnd}
            >
              {sliderSlides.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="relative shrink-0 px-1.5 sm:px-2"
                  style={{ width: `${slideWidth}%` }}
                >
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={src}
                      alt={`Awards highlight ${(idx % AWARD_SLIDES.length) + 1}`}
                      width={1200}
                      height={800}
                      priority={idx < slidesVisible}
                      className="h-auto w-full object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-center gap-1.5">
              {Array.from({ length: maxSlide + 1 }, (_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide group ${idx + 1}`}
                  onClick={() => {
                    setIsTransitioning(true);
                    setActiveSlide(idx);
                  }}
                  className={`cursor-pointer rounded-full transition-all ${
                    dotIndex === idx ? "h-2 w-7 bg-[#652A27]" : "h-2 w-2 bg-[#652A27]/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <NavSideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Section1;
