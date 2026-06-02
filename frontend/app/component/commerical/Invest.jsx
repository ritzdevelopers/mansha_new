"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INVEST_SLIDES = [
  "/vega-street/location1.jpg",
  "/vega-street/location2.jpg",
  "/vega-street/location3.jpg",
  "/vega-street/location4.jpg",
];

const Invest = () => {
  const leftSectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const leftSection = leftSectionRef.current;
    if (!leftSection) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftSection,
        { autoAlpha: 0, x: -120 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftSection,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, leftSection);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % INVEST_SLIDES.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="w-full pb-[35px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:gap-10">
          <div ref={leftSectionRef} className="-ml-5 bg-none lg:bg-[#F7F7F7] px-4 py-7 pl-5 sm:-ml-8 sm:px-6  sm:pl-8 lg:-ml-[70px] lg:px-8 xl:py-[100px] lg:py-[50px] lg:pl-[70px]">
            <h2 className="font-optima text-[28px] font-medium leading-[100%] tracking-[0] capitalize text-[#111111] md:text-[32px] lg:text-[28px] xl:text-[36px] text-center md:text-left">
            Why invest in Vega Street 
            </h2>
            <p className="mt-2 md:mt-6 font-montserrat text-[16px] font-normal xl:max-w-[700px] lg:max-w-[500px] leading-[25px] tracking-[0px] capitalize text-[#333333] text-center md:text-left">
            Vega Street offers a compelling investment opportunity with its strategic location on a prime 60 mtr. master road in the heart of Faridabad’s commercial hub, ensuring excellent visibility and accessibility. Designed with world-class architecture and modern infrastructure, it is built to attract high footfall and premium brands. Surrounded by well-established residential societies, it benefits from consistent demand and a ready customer base. Wide internal roads, seamless connectivity, and thoughtfully planned amenities further enhance the overall experience. As a future-ready high-street destination, Vega Street is positioned to deliver strong returns and long-term value. 
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[12px_12px_0px_0px] bg-white">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {INVEST_SLIDES.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="relative h-[240px] w-full shrink-0 overflow-hidden  sm:h-[300px] lg:h-[300px]"
                >
                  <Image
                    src={src}
                    alt="Investment slider visual"
                    fill
                    className="rounded-[12px 12px 0px 0px] object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              ))}
            </div>
            <p className="mx-auto max-w-[328px] px-4 pb-2 pt-4 text-center font-montserrat text-[16px] font-medium leading-[23px] tracking-[0px] capitalize text-black lg:pt-3">
              Just 2 Minutes Drive to Delhi-Mumbai Expressway
            </p>
            <div className="mt-3 flex justify-center gap-1.5 pb-3">
              {INVEST_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to investment slide ${idx + 1}`}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx ? "w-8 bg-[#333333]" : "w-2 bg-[#333333]/45"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invest;