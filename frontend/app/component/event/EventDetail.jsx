"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NavSideMenu from "../common/NavSideMenu";

const PHONE = "tel:+919876543210";
const WHATSAPP = "https://wa.me/917070705457";

const iconBtn =
  "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-black transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 active:opacity-60";

const LOADER_DURATION_MS = 2000;

const EventPageLoader = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F9F8F3]">
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-14 w-14">
        <span className="absolute inset-0 rounded-full border-2 border-[#E5E5E5]" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-[#111111] border-t-transparent" />
      </div>
      <p className="font-montserrat text-[12px] font-medium uppercase tracking-[0.28em] text-[#111111]">
        Loading
      </p>
    </div>
  </div>
);

const EventContentCards = ({ event }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const images = event.images ?? [];

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.classList.add("overflow-hidden");
    const onKeyUp = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keyup", onKeyUp);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [lightboxIndex, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden border border-[#ECECEC] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#111111]/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            aria-label={`View ${event.title} photo ${idx + 1}`}
          >
            <Image
              src={src}
              alt={`${event.title} — photo ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-[70] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-[#111111] max-md:right-3 max-md:top-3 max-md:h-9 max-md:w-9"
            aria-label="Close image popup"
          >
            <i className="ri-close-line text-[22px]" />
          </button>

          <button
            type="button"
            onClick={() =>
              setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
            }
            className="absolute left-4 top-1/2 z-[70] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#111111] max-md:left-3 max-md:h-9 max-md:w-9"
            aria-label="Previous image"
          >
            <i className="ri-arrow-left-s-line text-[22px]" />
          </button>

          <div className="relative z-10 h-[80vh] w-full max-w-5xl">
            <Image
              src={images[lightboxIndex]}
              alt={`${event.title} — photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
            }
            className="absolute right-4 top-1/2 z-[70] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#111111] max-md:right-3 max-md:h-9 max-md:w-9"
            aria-label="Next image"
          >
            <i className="ri-arrow-right-s-line text-[22px]" />
          </button>
        </div>
      )}
    </>
  );
};

const EventDetail = ({ location }) => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const imagesSectionRef = useRef(null);
  const activeEvent = location.events[activeTab];

  useEffect(() => {
    const eventSlug = searchParams.get("event");
    if (!eventSlug) return;

    const tabIndex = location.events.findIndex((event) => event.slug === eventSlug);
    if (tabIndex >= 0) setActiveTab(tabIndex);
  }, [searchParams, location.events]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const scrollToImages = () => {
      imagesSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

    const scrollTimer = setTimeout(scrollToImages, 150);
    return () => clearTimeout(scrollTimer);
  }, [isLoading, activeTab]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open || isLoading);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open, isLoading]);

  useEffect(() => {
    const onKeyUp = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, []);

  return (
    <>
      {isLoading && <EventPageLoader />}

      <section
        className={`w-full pb-8 pt-0 lg:pb-12 transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
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
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-1 font-montserrat text-[13px] font-medium text-[#652A27] transition-opacity hover:opacity-70"
          >
            <i className="ri-arrow-left-s-line text-lg" />
            Back to Home
          </Link>

          <div className="mt-5 px-4 py-10 sm:px-8 sm:py-12 lg:py-14">
            <p className="font-montserrat text-[11px] font-medium uppercase tracking-[0.22em] text-[#888888] sm:text-[12px]">
              Mansha Group Events
            </p>
            <h1 className="mt-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[32px] font-[500] capitalize leading-[110%] text-[#111111] sm:text-[40px] lg:text-[48px]">
              {location.title}
            </h1>
            <p className="mt-3 max-w-xl font-montserrat text-[15px] font-normal leading-[24px] text-[#333333]">
              {location.subtitle}
            </p>

            <div
              className="mt-8 flex flex-wrap gap-3"
              role="tablist"
              aria-label={`${location.title} events`}
            >
              {location.events.map((event, index) => (
                <button
                  key={event.slug}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === index}
                  onClick={() => setActiveTab(index)}
                  className={`rounded-full border px-5 py-2.5 font-montserrat text-[13px] font-medium transition-all duration-300 sm:text-[14px] ${
                    activeTab === index
                      ? "border-[#111111] bg-[#111111] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                      : "border-[#DDDDDD] bg-white text-[#111111] hover:border-[#111111]/30"
                  }`}
                >
                  {event.title}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={imagesSectionRef}
            className="scroll-mt-28 pb-10 sm:pb-12 lg:pb-16"
            role="tabpanel"
          >
            <EventContentCards key={activeEvent.slug} event={activeEvent} />
          </div>
        </div>
      </section>

      <NavSideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default EventDetail;
