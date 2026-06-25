"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    video: "https://otherassets.blob.core.windows.net/rmw/Testimonial_1.mp4",
    feedback:
      "Mansha Group delivered exactly what was promised. The quality of construction and timely possession made our",
  },
  {
    video: "https://otherassets.blob.core.windows.net/rmw/Testimonial_2.mp4",
    feedback:
      "Investing with Mansha Group was one of our best decisions. Transparent processes, professional team, and excellent project execution gave us complete peace of mind.",
  },
  {
    video: "https://otherassets.blob.core.windows.net/rmw/Testimonial_3.mp4",
    feedback:
      "Mansha Group delivered exactly what was promised. The quality of construction and timely possession made our home-buying experience truly smooth and trustworthy.",
  },
];



export default function TestimoniaCommon() {
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const [mutedStates, setMutedStates] = useState(() =>
    testimonials.map(() => true)
  );

  const toggleMute = (index) => {
    const willUnmute = mutedStates[index];

    setMutedStates((prev) => {
      const next = prev.map((isMuted, i) => (i === index ? !isMuted : true));
      videoRefs.current.forEach((video, i) => {
        if (video) video.muted = next[i];
      });
      return next;
    });

    if (willUnmute) {
      swiperRef.current?.autoplay?.stop();
    } else {
      swiperRef.current?.autoplay?.start();
    }
  };

  return (
    <section className="relative w-full max-w-[1500px] bg-[#FFFFFF] px-0 mx-auto">
      <div className="absolute bottom-0 left-[45%] right-0 top-0 z-0 hidden bg-[#F7F7F7] lg:block" />
      <div className="relative z-10 mx-auto w-full max-w-8xl overflow-x-hidden px-5 pb-[35px] sm:px-8 lg:px-[75px] lg:pb-[70px]">
        <div className="flex flex-col items-start lg:gap-8 gap-3 lg:flex-row lg:items-center xl:items-start">
          <div className="mt-0 flex w-full flex-col items-center pt-1 text-center lg:mt-0 lg:w-[30%] lg:items-start lg:text-left xl:mt-[100px] xl:w-[26%]">
            <h2 className="font-montserrat text-[16px] font-semibold uppercase leading-[28px] tracking-normal text-[#652A27]">
              Client Testimonials
            </h2>
            <h3 className="lg:mt-3 md:mt-2 mt-0 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[22px] md:text-[34px] font-bold xl:leading-[50px] leading-[35px] tracking-normal text-[#000000]">
            Trusted By Many 
            </h3>
            <p className="lg:mt-3 md:mt-2 mt-0 w-full max-lg:max-w-none font-montserrat text-[16px] font-normal xl:leading-[28px] leading-[25px] tracking-normal text-[#000000] lg:mx-0 lg:max-w-[281px]">
            Client experiences that highlight trust, reliability, and quality, building partnerships that stand strong over time.

            </p>
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-[#9f9f9f] text-[14px] text-[#333333]"
              >
                <i className="ri-arrow-left-line" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-[#9f9f9f] text-[14px] text-[#333333]"
              >
                <i className="ri-arrow-right-line" />
              </button>
            </div>
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

            <div className="relative z-10 w-full xl:-translate-x-[50px] lg:ml-19 lg:pt-14">
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
                  1024: { slidesPerView: 1, spaceBetween: 20 },
                  1280: { slidesPerView: 2, spaceBetween: 25 },
                }}
              >
                {testimonials.map((item, index) => (
                  <SwiperSlide
                    key={`${item.name}-${index}`}
                    className="!box-border p-2"
                  >
                    <div className="relative mx-auto h-[360px] w-full overflow-hidden border border-[#E7E7E7] shadow-[0px_2px_15px_0px_#D0D0D040] lg:mx-0 lg:w-[calc(100%-70px)] xl:w-full">
                      {/* <Image
                        src={item.image}
                        alt={item.name}
                        title={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/25" />
                      {(item.name === "Ravi Gupta" || item.name === "Amit Kumar") && (
                        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white text-white">
                          <i className="ri-play-fill text-xl" />
                        </div>
                      )} */}
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        src={item.video}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted={mutedStates[index]}
                        loop
                        playsInline
                      />
                      <button
                        type="button"
                        aria-label={mutedStates[index] ? "Unmute video" : "Mute video"}
                        onClick={() => toggleMute(index)}
                        className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-[18px] text-white"
                      >
                        <i
                          className={
                            mutedStates[index]
                              ? "ri-volume-mute-line"
                              : "ri-volume-up-line"
                          }
                        />
                      </button>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-4 pb-4 pt-10">
                        <p className="font-montserrat text-[13px] font-normal leading-[22px] tracking-normal text-white sm:text-[14px]">
                          {item.feedback}
                        </p>
                        <p className="mt-2 font-montserrat text-[16px] font-medium leading-[100%] tracking-normal text-[#FFFFFF66]">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}