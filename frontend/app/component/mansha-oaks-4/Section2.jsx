"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const HIGHLIGHT_SLIDES = [
  {
    image: "/oaks/slider1.png",
    title: "24/7 SECURITY",
    shortTitle: "Security",
    description:
      "Stay worry-free with 24/7 security, safeguarding your home and loved ones at all times.",
    imageAlt: "24/7 security at Mansha Oaks",
  },
  {
    image: "/oaks/slider2.png",
    title: "SEWER TREATMENT PLANT",
    shortTitle: "Sewer Plant",
    description:
      "Benefit from eco-friendly waste management with our state-of-the-art sewer treatment plant, designed for a healthier community.",
    imageAlt: "Sewer treatment plant at Mansha Oaks",
  },
  {
    image: "/oaks/slider3.png",
    title: "RAIN WATER HARVESTING",
    shortTitle: "Rain Harvest",
    description:
      "Conserve water with our efficient rainwater harvesting system, designed to support sustainability and eco-friendly living. Benefit from reduced water usage while helping the environment.",
    imageAlt: "Rainwater harvesting at Mansha Oaks",
  },
  {
    image: "/oaks/slider4.jpg",
    title: "KIDS PLAY AREA",
    shortTitle: "Kids Play",
    description:
      "Let your children explore and grow in our safe and vibrant kids' play area, designed for endless fun.",
    imageAlt: "Kids play area at Mansha Oaks",
  },
];

const AMENITIES = [
  { label: "Gated community" },
  { label: "3-Tier security" },
];

const Section2 = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeContent = HIGHLIGHT_SLIDES[activeIndex] ?? HIGHLIGHT_SLIDES[0];

  const goToSlide = (index) => {
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <section className="w-full py-[35px] lg:py-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-1 md:items-start lg:grid-cols-[minmax(0,460px)_1fr] lg:grid-rows-[auto_auto_auto_auto_auto] lg:gap-x-14 lg:gap-y-0 xl:gap-x-20">
          <p className="font-montserrat text-[14px] font-normal capitalize leading-[100%] text-[#333333] md:text-[16px] lg:col-start-1 lg:row-start-1">
            Home | Residential |{" "}
            <span className="font-semibold text-[#652A27]">mansha-oaks-4</span>
          </p>

          <h2 className="mt-3 font-optima text-[28px] font-[550] capitalize leading-[34px] text-[#000000] md:text-[32px] lg:col-start-1 lg:row-start-2 lg:text-[36px] lg:leading-[44px]">
            Key Highlights
          </h2>

          <div className="relative min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-5 lg:self-start">
            <div className="relative w-full overflow-hidden border border-[#E6E6E6] bg-[#F5F5F5]">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop
                speed={700}
                slidesPerView={1}
                autoplay={{ delay: 3200, disableOnInteraction: false }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full"
              >
                {HIGHLIGHT_SLIDES.map((slide, idx) => (
                  <SwiperSlide key={slide.title}>
                    <div className="relative aspect-[4/3] w-full sm:aspect-[5/4] md:aspect-[4/3] xl:aspect-auto xl:min-h-0">
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        width={1600}
                        height={1200}
                        priority={idx === 0}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="max-xl:absolute max-xl:inset-0 max-xl:h-full max-xl:w-full max-xl:object-cover xl:relative xl:mx-auto xl:h-auto xl:max-h-[520px] xl:w-full xl:object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                type="button"
                aria-label="Previous highlight"
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#652A27] shadow-md transition hover:bg-white md:left-4 md:h-10 md:w-10"
              >
                <i className="ri-arrow-left-s-line text-xl" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next highlight"
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#652A27] shadow-md transition hover:bg-white md:right-4 md:h-10 md:w-10"
              >
                <i className="ri-arrow-right-s-line text-xl" aria-hidden />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5">
              {HIGHLIGHT_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => goToSlide(idx)}
                  className={`cursor-pointer rounded-full transition-all ${
                    activeIndex === idx ? "h-2 w-7 bg-[#652A27]" : "h-2 w-2 bg-[#652A27]/35"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:col-start-1 lg:row-start-3">
            {HIGHLIGHT_SLIDES.map((slide, idx) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`shrink-0 cursor-pointer whitespace-nowrap border px-4 py-2.5 font-montserrat text-[12px] capitalize transition-all sm:text-[13px] ${
                  activeIndex === idx
                    ? "border-[#652A27] bg-[#652A27] text-white"
                    : "border-[#E6E6E6] bg-white text-[#555555] hover:border-[#652A27]/50"
                }`}
              >
                {slide.shortTitle}
              </button>
            ))}
          </div>

          <div className="mt-3 lg:col-start-1 lg:row-start-4">
            <p className="font-montserrat text-[14px] font-semibold capitalize leading-[22px] text-[#652A27] sm:text-[16px] xl:text-[18px]">
              {activeContent.title}
            </p>
            <p className="mt-3 font-montserrat text-[14px] font-normal capitalize leading-[25px] text-[#333333] sm:text-[16px] sm:leading-[28px]">
              {activeContent.description}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-6 sm:gap-8 lg:col-start-1 lg:row-start-5">
            {AMENITIES.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <Image
                  src="/mansha-svg/Forest-Themed-1.svg"
                  alt=""
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px] object-contain xl:h-15 xl:w-15"
                />
                <p className="font-montserrat text-[14px] font-normal capitalize leading-[24px] text-[#333333] xl:text-[16px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
