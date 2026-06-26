"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import NavSideMenu from "../common/NavSideMenu";

const PHONE = "tel:+919876543210";
const WHATSAPP = "https://wa.me/919876543210";

const iconBtn =
  "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-black transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 active:opacity-60";

const EventImageSlider = ({ images, title }) => {
  const mainSwiperRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [modalSwiper, setModalSwiper] = useState(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.classList.add("overflow-hidden");
    const onKeyUp = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keyup", onKeyUp);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [lightboxIndex]);

  return (
    <>
    <div className="overflow-hidden rounded-[24px] border border-[#E8E4DC] bg-gradient-to-br from-white via-[#F9F8F3] to-[#F0EBE3] p-4 shadow-[0_20px_60px_-24px_rgba(101,42,39,0.2)] sm:p-6 lg:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-montserrat text-[12px] font-medium uppercase tracking-[0.18em] text-[#652A27]">
          Event Gallery
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => mainSwiperRef.current?.slidePrev()}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#652A27]/30 bg-white text-[#652A27] transition-all hover:border-[#652A27] hover:bg-[#652A27] hover:text-white"
          >
            <i className="ri-arrow-left-s-line text-xl" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => mainSwiperRef.current?.slideNext()}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#652A27]/30 bg-white text-[#652A27] transition-all hover:border-[#652A27] hover:bg-[#652A27] hover:text-white"
          >
            <i className="ri-arrow-right-s-line text-xl" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation, Pagination, Thumbs]}
        onSwiper={(swiper) => {
          mainSwiperRef.current = swiper;
        }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        loop
        centeredSlides
        spaceBetween={16}
        slidesPerView={1}
        speed={700}
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{
          clickable: true,
          el: ".event-page-pagination",
          bulletClass:
            "inline-block h-2 w-2 mx-1 rounded-full bg-[#652A27]/30 cursor-pointer transition-all duration-300",
          bulletActiveClass: "!w-7 !bg-[#652A27]",
        }}
        className="event-page-main-swiper"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={`${src}-${idx}`}>
            <button
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group relative block h-[300px] w-full cursor-pointer overflow-hidden"
              aria-label={`View ${title} photo ${idx + 1} in full size`}
            >
              <Image
                src={src}
                alt={`${title} — photo ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-montserrat text-[11px] font-medium uppercase tracking-wider text-[#652A27] backdrop-blur-sm">
                {String(idx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="event-page-pagination mt-5 flex items-center justify-center" />

      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress
        loop
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 4, spaceBetween: 12 },
          1024: { slidesPerView: 5, spaceBetween: 14 },
        }}
        className="mt-5"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={`thumb-${src}-${idx}`} className="!h-auto cursor-pointer">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-transparent transition-all [.swiper-slide-thumb-active_&]:border-[#652A27] [.swiper-slide-thumb-active_&]:shadow-md">
              <Image src={src} alt={`${title} thumbnail ${idx + 1}`} fill className="object-cover" sizes="120px" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-[70] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-white max-md:right-3 max-md:top-3 max-md:h-9 max-md:w-9"
            aria-label="Close image popup"
          >
            <i className="ri-close-line text-[22px]" />
          </button>

          <button
            type="button"
            onClick={() => modalSwiper?.slidePrev()}
            className="absolute left-4 top-1/2 z-[70] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-white max-md:left-3 max-md:h-9 max-md:w-9"
            aria-label="Previous image"
          >
            <i className="ri-arrow-left-s-line text-[22px]" />
          </button>

          <div className="relative z-10 h-[80vh] w-full max-w-5xl">
            <Swiper
              loop
              speed={500}
              slidesPerView={1}
              initialSlide={lightboxIndex}
              onSwiper={setModalSwiper}
              className="h-full w-full"
            >
              {images.map((src, idx) => (
                <SwiperSlide key={`popup-${src}-${idx}`}>
                  <div className="relative h-full w-full">
                    <Image
                      src={src}
                      alt={`${title} — photo ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            type="button"
            onClick={() => modalSwiper?.slideNext()}
            className="absolute right-4 top-1/2 z-[70] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-white max-md:right-3 max-md:h-9 max-md:w-9"
            aria-label="Next image"
          >
            <i className="ri-arrow-right-s-line text-[22px]" />
          </button>
        </div>
      )}
    </>
  );
};

const EventDetail = ({ event }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    const onKeyUp = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, []);

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
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-1 font-montserrat text-[13px] font-medium text-[#652A27] transition-opacity hover:opacity-70"
          >
            <i className="ri-arrow-left-s-line text-lg" />
            Back to Home
          </Link>

          <div className="mt-5 rounded-[20px] bg-[#F9F8F3] px-4 py-10 text-center sm:px-8 sm:py-12 lg:py-14">
            <p className="font-montserrat text-[11px] font-medium uppercase tracking-[0.22em] text-[#888888] sm:text-[12px]">
              Mansha Group Events
            </p>
            <h1 className="mt-4 font-optima text-[32px] font-medium capitalize leading-[110%] text-[#111111] sm:text-[40px] lg:text-[48px]">
              {event.title}
            </h1>
            <p className="mt-3 font-montserrat text-[13px] font-medium text-[#652A27] sm:text-[14px]">
              {event.date}
            </p>
            <p className="mx-auto mt-5 max-w-2xl font-montserrat text-[14px] font-normal leading-[160%] text-[#555555] sm:text-[15px] lg:text-[16px]">
              {event.description}
            </p>
          </div>

          <div className="mt-8 lg:mt-10">
            <EventImageSlider images={event.images} title={event.title} />
          </div>
        </div>
      </section>

      <NavSideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default EventDetail;
