"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const LEFT_SLIDES = [
  {
    src: "/mansha-image/outdoor-cafe-big.jpg",
    alt: "A terrace for every home",
    title: "Living Made Better",
    text: " Open gym areas, landscaped greens, kids’ play zones, and secure spaces shaped for connected community living.",
  },
  {
    src: "/mansha-image/club-with-lawn-big.jpg",
    alt: "Club with lawn",
    title: "Harmony In Spaces",
    text: "Landscaped greens, open gym zones, and safe play areas bringing comfort, security, and community together.",
  },
  {
    src: "/mansha-image/club-pool-big.jpg",
    alt: "Club pool",
    title: "Closer Everyday Living",
    text: " Open gyms, green landscapes, children’s play areas, and strong security—built for easy community living.",
  },
];

const RIGHT_SLIDES = [
  {
    src: "/mansha-image/central-landscape-bog.jpg",
    alt: "Linear greens and themed landscapes",
    title: "Where Life Thrives",
    text: "Green landscapes, open fitness zones, secure surroundings, and fun play areas created for every community.",
  },
  {
    src: "/mansha-image/outdoor-cafe-big.jpg",
    alt: "Gym",
    title: "Elevated Daily Living",
    text: " A lifestyle with landscaped greens, open gym areas, kids’ play zones, and dependable community security.",
  },
  {
    src: "/mansha-image/central-landscape-bog.jpg",
    alt: "Gym",
    title: "Crafted For Living",
    text: " Landscaped greens, outdoor gym spaces, kids’ play areas, and secure surroundings designed for community comfort.",
  },
];
const ALL_SLIDES = [...LEFT_SLIDES, ...RIGHT_SLIDES];

const Section3 = () => {
  const leftSwiperRef = useRef(null);
  const rightSwiperRef = useRef(null);
  const mobileSwiperRef = useRef(null);
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const activeLeftSlide = LEFT_SLIDES[leftIndex] || LEFT_SLIDES[0];
  const activeRightSlide = RIGHT_SLIDES[rightIndex] || RIGHT_SLIDES[0];
  const activeMobileSlide = ALL_SLIDES[mobileIndex] || ALL_SLIDES[0];

  const goNext = () => {
    leftSwiperRef.current?.slideNext();
    rightSwiperRef.current?.slideNext();
    mobileSwiperRef.current?.slideNext();
  };
  const goPrev = () => {
    leftSwiperRef.current?.slidePrev();
    rightSwiperRef.current?.slidePrev();
    mobileSwiperRef.current?.slidePrev();
  };

  return (
    <section className="w-full py-[35px] lg:py-[70px] bg-[#FCFCFC]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <h2 className="font-optima text-center md:text-left md:text-[36px] text-[28px] font-[500] leading-[54px] capitalize text-[#000000]">
          Essence of Excellence
        </h2>

        <div className="mt-6 hidden grid-cols-1 gap-4 xl:grid xl:grid-cols-[3fr_1fr]">
          <article className="group relative overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              loop
              autoplay={{ delay: 3200, disableOnInteraction: false }}
              speed={700}
              slidesPerView={1}
              onSwiper={(swiper) => {
                leftSwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setLeftIndex(swiper.realIndex)}
              className="h-[496px] w-full"
            >
              {LEFT_SLIDES.map((slide, idx) => (
                <SwiperSlide key={`left-${slide.src}-${idx}`}>
                  <div className="relative h-full w-full bg-[#1a1a1a]">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 75vw"
                      priority={idx === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="absolute z-[2] bottom-6 left-6 right-6 text-white">
              <h3 className="font-montserrat text-[20px] font-bold leading-[100%] capitalize text-white">
                {activeLeftSlide.title}
              </h3>
              <p className="mt-3 font-montserrat text-[16px] font-medium leading-[25px] capitalize text-white">
                {activeLeftSlide.text}
              </p>
            </div>
          </article>

          <article className="group relative overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              loop
              autoplay={{ delay: 3200, disableOnInteraction: false }}
              speed={700}
              slidesPerView={1}
              onSwiper={(swiper) => {
                rightSwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setRightIndex(swiper.realIndex)}
              className="h-[496px] w-full"
            >
              {RIGHT_SLIDES.map((slide, idx) => (
                <SwiperSlide key={`right-${slide.src}-${idx}`}>
                  <div className="relative h-full w-full bg-[#1a1a1a]">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      priority={idx === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute z-[2] bottom-6 left-6 right-6 text-white">
              <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-montserrat text-[20px] font-bold leading-[100%] capitalize text-white">
                {activeRightSlide.title}
              </h3>
              <p className="mt-3 overflow-hidden text-ellipsis whitespace-nowrap font-montserrat text-[16px] font-medium leading-[25px] capitalize text-white">
                {activeRightSlide.text}
              </p>
            </div>
          </article>
        </div>

        <article className="relative mt-2 md:mt-6 overflow-hidden xl:hidden">
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            speed={700}
            slidesPerView={1}
            onSwiper={(swiper) => {
              mobileSwiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setMobileIndex(swiper.realIndex)}
            className="h-[150px] w-full lg:h-[380px] md:h-[330px]"
          >
            {ALL_SLIDES.map((slide, idx) => (
              <SwiperSlide key={`mobile-${slide.src}-${idx}`}>
                <div className="relative h-full w-full bg-[#1a1a1a]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    priority={idx === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
          <div className="absolute z-[2] bottom-2 left-2 md:left-6 right-2 md:right-6 text-white md:bottom-6">
            <h3 className="font-montserrat md:text-[20px] text-[10px] font-bold md:leading-[100%] leading-[12px] capitalize text-white">
              {activeMobileSlide.title}
            </h3>
            <p className="mt-1 font-montserrat md:text-[16px] text-[10px] font-medium md:leading-[25px] leading-[15px] capitalize text-white">
              {activeMobileSlide.text}
            </p>
          </div>
        </article>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#333333] shadow-[0px_4px_16px_0px_#0000001A]"
          >
            <i className="ri-arrow-left-line" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#333333] shadow-[0px_4px_16px_0px_#0000001A]"
          >
            <i className="ri-arrow-right-line" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Section3;
