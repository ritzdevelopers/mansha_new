"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    image: "/mansha-image/testimonial-image-1.jpg",
    name: "Ravi Gupta",
  },
  {
    image: "/mansha-image/testimonial-image-2.jpg",
    name: "Amit Kumar",
  },
  {
    image: "/mansha-image/testimonial-image-1.jpg",
    name: "Ravi Gupta",
  },
  {
    image: "/mansha-image/testimonial-image-2.jpg",
    name: "Amit Kumar",
  },
];

export default function Testiimonial() {
  const swiperRef = useRef(null);

  return (
    <section className="relative w-full max-w-[1500px] bg-[#FFFFFF] px-0 mx-auto">
      <div className="absolute bottom-0 left-[45%] right-0 top-16 z-0 hidden bg-[#F7F7F7] lg:block" />
      <div className="relative z-10 mx-auto w-full max-w-8xl overflow-x-hidden px-5 py-[35px] sm:px-8 lg:px-[75px] lg:py-[70px]">
        <div className="flex flex-col items-start lg:gap-8 gap-3 lg:flex-row lg:items-center xl:items-start">
          <div className="mt-0 flex w-full flex-col items-center pt-1 text-center lg:mt-0 lg:w-[30%] lg:items-start lg:text-left xl:mt-[100px] xl:w-[26%]">
            <h2 className="font-montserrat text-[16px] font-semibold uppercase leading-[28px] tracking-normal text-[#652A27]">
              Clients Testimonials
            </h2>
            <h3 className="lg:mt-3 mt-0 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[22px] md:text-[30px] font-bold xl:leading-[50px] leading-[35px] tracking-normal text-[#000000]">
              What Our Clients Say
            </h3>
            <p className="lg:mt-3 mt-0 w-full max-lg:max-w-none font-montserrat text-[16px] font-normal xl:leading-[28px] leading-[25px] tracking-normal text-[#000000] lg:mx-0 lg:max-w-[281px]">
              Don&apos;t just take our word for it, hear from the brands we&apos;ve
              helped transform.
            </p>
          </div>

          <div className="relative w-full overflow-x-hidden lg:w-[78%]">
            <div className="absolute right-2 top-6 z-20 hidden lg:block">
              {/* <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border border-[#9f9f9f] text-[14px] text-[#333333]"
                >
                  <i className="ri-arrow-left-s-line" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => swiperRef.current?.slideNext()}
                  className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border border-[#9f9f9f] text-[14px] text-[#333333]"
                >
                  <i className="ri-arrow-right-s-line" />
                </button>
              </div> */}
            </div>

            <div className="relative z-10 w-full lg:ml-19 lg:pt-14">
              <Swiper
                className="[&_.swiper-wrapper]:items-stretch"
                modules={[Autoplay]}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop
                slidesPerView={1}
                spaceBetween={12}
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 12 },
                  768: { slidesPerView: 2, spaceBetween: 16 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1280: { slidesPerView: 2, spaceBetween: 25 },
                }}
              >
                {testimonials.map((item, index) => (
                  <SwiperSlide
                    key={`${item.name}-${index}`}
                    className="!box-border p-2"
                  >
                    <div className="relative mx-auto h-[360px] w-full overflow-hidden border border-[#E7E7E7] shadow-[0px_2px_15px_0px_#D0D0D040] lg:mx-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/25" />
                      {(item.name === "Ravi Gupta" || item.name === "Amit Kumar") && (
                        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white text-white">
                          <i className="ri-play-fill text-xl" />
                        </div>
                      )}
                      <p className="absolute bottom-4 left-4 font-montserrat text-[16px] font-medium leading-[100%] tracking-normal text-[#FFFFFF66]">
                        {item.name}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-2 flex justify-center lg:hidden">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border border-[#9f9f9f] text-[14px] text-[#333333]"
                >
                  <i className="ri-arrow-left-s-line" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => swiperRef.current?.slideNext()}
                  className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border border-[#9f9f9f] text-[14px] text-[#333333]"
                >
                  <i className="ri-arrow-right-s-line" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}