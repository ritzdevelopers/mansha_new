"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./section4-swiper.css";

const ACHIEVEMENTS = [
  {
    images: [
      { src: "/award/section1.jpg", alt: "Phygital Retail Convention" },
      { src: "/award/section2.jpg", alt: "Vega Street exhibition stall" },
    ],
  },
  {
    images: [
      { src: "/award/section7.webp", alt: "Jagran Achiever Awards Singapore" },
      { src: "/award/section8.webp", alt: "Most Trusted Brand ceremony" },
    ],
  },
  {
    images: [
      { src: "/award/section12.webp", alt: "HT City Crowns of Delhi" },
      { src: "/award/section13.webp", alt: "Mansha at HT City Crowns" },
    ],
  },
  {
    images: [
      { src: "/award/section16.jpeg", alt: "Jagran Achievers Award Bali" },
      { src: "/award/section17.jpeg", alt: "Achievers Award ceremony Bali" },
    ],
  },
  {
    images: [
      { src: "/award/section27.jpg", alt: "JCTB Icons of Inspiration" },
      { src: "/award/section28.jpg", alt: "Jagran Coffee Table Book 2025" },
    ],
  },
  {
    images: [
      { src: "/award/section20.jpg", alt: "Channel Partners Meet" },
      { src: "/award/section21.png", alt: "Channel partners backdrop" },
    ],
  },
];

const CAROUSEL_SLIDES = ACHIEVEMENTS.flatMap((item) => item.images.slice(0, 2));

const Section4 = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (idx) => {
    swiperRef.current?.slideToLoop(idx);
    setActiveIndex(idx);
  };

  return (
    <section className="w-full py-[35px] lg:py-[70px] bg-[#F7F7F7]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <div className="relative flex min-h-[280px] items-center sm:min-h-[320px] lg:min-h-[433px]">
          <Swiper
            modules={[Autoplay]}
            loop
            centeredSlides
            slidesPerView="auto"
            spaceBetween={16}
            speed={800}
            watchOverflow
            dir="ltr"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            breakpoints={{
              640: { spaceBetween: 22 },
              1024: { spaceBetween: 28 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              swiper.autoplay.start();
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="awards-highlight-swiper awards-highlight-swiper--rtl w-full"
          >
            {CAROUSEL_SLIDES.map((image, idx) => (
              <SwiperSlide key={`${image.src}-${idx}`} className="!w-auto">
                <div className="award-slide-frame relative overflow-hidden rounded-[20px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 70vw, 662px"
                    priority={idx < 3}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-6 flex min-h-[8px] items-center justify-center gap-1.5">
          {CAROUSEL_SLIDES.map((_, idx) => (
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
    </section>
  );
};

export default Section4;
