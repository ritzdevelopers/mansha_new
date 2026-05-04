"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Facility = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [activeFacility, setActiveFacility] = useState(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      titleRef.current,
      { x: -120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      },
    );

    gsap.fromTo(
      subtitleRef.current,
      { x: 120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      },
    );
  }, []);

  return (
    <section className="w-full overflow-hidden bg-[#F8F8F8] ">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-3 lg:gap-8 px-5 py-[35px] sm:px-8 lg:grid-cols-2 lg:items-start lg:px-[75px] lg:py-[70px] max-w-[1490px]">
        <div className="order-1 lg:order-1 ">
          <h2 ref={titleRef} className="font-optima lg:mb-6 mb-0 text-[28px] font-[500] md:text-[36px]  not-italic leading-none tracking-normal capitalize text-[#000000]">
            FACILITIES
          </h2>

        </div>

        <div className="order-2 lg:order-2">
          <p ref={subtitleRef} className="font-optima max-w-[560px] md:text-[25px] text-[22px] xl:text-[48px] lg:text-[44px] font-[500]  leading-[1.15] xl:leading-[55px] tracking-normal capitalize text-[#000000] lg:leading-[50px]">
            Carefully designed infrastructure for living, working, and growth
          </p>
        </div>
      </div>


      <div className="group/facility mx-auto grid max-w-8xl grid-cols-1 gap-8 px-5 pb-[0px] sm:px-8 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-[50px] lg:px-[75px] lg:pb-[70px] 2xl:mx-auto 2xl:flex 2xl:w-fit 2xl:max-w-full 2xl:flex-row 2xl:justify-center 2xl:gap-[50px]">
        <div className="shrink-0 lg:flex lg:h-full lg:items-center">
          <div className="relative h-[340px] w-full overflow-hidden md:h-[440px] md:w-full lg:h-[400px] lg:w-[400px] xl:h-[620px] xl:w-[620px]">
            <Image
              src="/mansha-image/residentail.jpg"
              alt="residentail"
              fill
              className="object-cover transition-transform duration-700 ease-out lg:group-hover/facility:-translate-y-full"
            />
            <Image
              src="/mansha-image/facility-image.jpg"
              alt="facility"
              fill
              className="translate-y-full object-cover transition-transform duration-700 ease-out lg:group-hover/facility:translate-y-0"
            />
          </div>
        </div>

        <div className="min-w-0 space-y-0 lg:min-w-0 2xl:w-auto 2xl:max-w-[640px]">
          <div
            className="group/item relative cursor-pointer overflow-hidden border-t border-[#6c6c6c] px-3 py-4 xl:py-5"
            onClick={() => setActiveFacility(0)}
          >
            <span className={`absolute inset-y-0 left-0 z-0 bg-black transition-all duration-500 ${activeFacility === 0 ? "w-full lg:w-0 lg:group-hover/item:w-full" : "w-0 lg:group-hover/item:w-full"}`} />
            <h3 className={`relative z-10 font-montserrat text-[24px] font-semibold not-italic leading-none tracking-normal uppercase transition-colors duration-300 lg:text-[18px] xl:text-[24px] ${activeFacility === 0 ? "text-white lg:text-[#000000] lg:group-hover/item:text-white" : "text-[#000000] lg:group-hover/item:text-white"}`}>
              BUSINESS HUB
            </h3>
            <p className={`relative z-10 mt-2 font-montserrat text-[14px] font-normal not-italic leading-5 tracking-normal transition-colors duration-300 lg:text-[12px] lg:leading-[20px] xl:text-[16px] xl:leading-7 ${activeFacility === 0 ? "text-white lg:text-[#000000] lg:group-hover/item:text-white" : "text-[#000000] lg:group-hover/item:text-white"}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>

          <div
            className="group/item relative cursor-pointer overflow-hidden px-3 py-4 xl:py-5 border-t border-[#6c6c6c]"
            onClick={() => setActiveFacility(1)}
          >
            <span className={`absolute inset-y-0 left-0 z-0 bg-black transition-all duration-500 ${activeFacility === 1 ? "w-full lg:w-0 lg:group-hover/item:w-full" : "w-0 lg:group-hover/item:w-full"}`} />
            <h3 className={`relative z-10 font-montserrat text-[24px] font-semibold not-italic leading-none tracking-normal uppercase transition-colors duration-300 lg:text-[18px] xl:text-[24px] ${activeFacility === 1 ? "text-white lg:text-[#000000] lg:group-hover/item:text-white" : "text-[#000000] lg:group-hover/item:text-white"}`}>
              BUSINESS HUB
            </h3>
            <p className={`relative z-10 mt-2 font-montserrat text-[14px] font-normal not-italic leading-5 tracking-normal transition-colors duration-300 lg:text-[12px] lg:leading-[20px] xl:text-[16px] xl:leading-7 ${activeFacility === 1 ? "text-white lg:text-[#000000] lg:group-hover/item:text-white" : "text-[#000000] lg:group-hover/item:text-white"}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div
            className="group/item relative cursor-pointer overflow-hidden px-3 py-4 xl:py-5 border-t border-[#6c6c6c]"
            onClick={() => setActiveFacility(2)}
          >
            <span className={`absolute inset-y-0 left-0 z-0 bg-black transition-all duration-500 ${activeFacility === 2 ? "w-full lg:w-0 lg:group-hover/item:w-full" : "w-0 lg:group-hover/item:w-full"}`} />
            <h3 className={`relative z-10 font-montserrat text-[24px] font-semibold not-italic leading-none tracking-normal uppercase transition-colors duration-300 lg:text-[18px] xl:text-[24px] ${activeFacility === 2 ? "text-white lg:text-[#000000] lg:group-hover/item:text-white" : "text-[#000000] lg:group-hover/item:text-white"}`}>
              BUSINESS HUB
            </h3>
            <p className={`relative z-10 mt-2 font-montserrat text-[14px] font-normal not-italic leading-5 tracking-normal transition-colors duration-300 lg:text-[12px] lg:leading-[20px] xl:text-[16px] xl:leading-7 ${activeFacility === 2 ? "text-white lg:text-[#000000] lg:group-hover/item:text-white" : "text-[#000000] lg:group-hover/item:text-white"}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div
            className="group/item relative cursor-pointer overflow-hidden border-b border-[#6c6c6c] px-3 py-5 xl:py-8 border-t border-[#6c6c6c]"
            onClick={() => setActiveFacility(3)}
          >
            <span className={`absolute inset-y-0 left-0 z-0 bg-black transition-all duration-500 ${activeFacility === 3 ? "w-full lg:w-0 lg:group-hover/item:w-full" : "w-0 lg:group-hover/item:w-full"}`} />
            <h3 className={`relative z-10 font-montserrat text-[24px] font-semibold not-italic leading-none tracking-normal uppercase transition-colors duration-300 lg:text-[18px] xl:text-[24px] ${activeFacility === 3 ? "text-white lg:text-[#000000] lg:group-hover/item:text-white" : "text-[#000000] lg:group-hover/item:text-white"}`}>
              BUSINESS HUB
            </h3>
            <p className={`relative z-10 mt-2 font-montserrat text-[14px] font-normal not-italic leading-5 tracking-normal transition-colors duration-300 lg:text-[12px] lg:leading-[20px] xl:text-[16px] xl:leading-7 ${activeFacility === 3 ? "text-white lg:text-[#000000] lg:group-hover/item:text-white" : "text-[#000000] lg:group-hover/item:text-white"}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div
            className="group/item relative cursor-pointer overflow-hidden px-3 py-4 xl:py-5"
            onClick={() => setActiveFacility(4)}
          >
            <span className={`absolute inset-y-0 left-0 z-0 bg-black transition-all duration-500 ${activeFacility === 4 ? "w-full lg:w-0 lg:group-hover/item:w-full" : "w-0 lg:group-hover/item:w-full"}`} />
            <h3 className={`relative z-10 font-montserrat text-[24px] font-semibold not-italic leading-none tracking-normal uppercase transition-colors duration-300 lg:text-[18px] xl:text-[24px] ${activeFacility === 4 ? "text-white lg:text-[#000000] lg:group-hover/item:text-white" : "text-[#000000] lg:group-hover/item:text-white"}`}>
              BUSINESS HUB
            </h3>
            <p className={`relative z-10 mt-2 font-montserrat text-[14px] font-normal not-italic leading-5 tracking-normal transition-colors duration-300 lg:text-[12px] lg:leading-[20px] xl:text-[16px] xl:leading-7 ${activeFacility === 4 ? "text-white lg:text-[#000000] lg:group-hover/item:text-white" : "text-[#000000] lg:group-hover/item:text-white"}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Facility;