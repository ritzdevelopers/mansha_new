"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const RESIDENTIAL_SLIDES = [
  "/orchid/orchird-girl.jpg",
  "/orchid/orchird-boy.jpg",
  "/orchid/orchird-dog.jpg",
];

const Section2 = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderSlides = [...RESIDENTIAL_SLIDES, RESIDENTIAL_SLIDES[0]];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => prev + 1);
      setIsTransitioning(true);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const handleSliderTransitionEnd = () => {
    if (activeSlide === RESIDENTIAL_SLIDES.length) {
      setIsTransitioning(false);
      setActiveSlide(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)));
    }
  };

  return (
    <section className="w-full  py-[35px] lg:py-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] xl:gap-15 lg:gap-0">
          <div>
            <p className="font-montserrat text-[16px] font-normal leading-[100%] capitalize text-[#333333]">
              Home | Residential | <span className="text-[#652A27] font-semibold">Mansha Orchid</span>
            </p>

            <h2 className="xl:mt-15 mt-5 font-optima xl:text-[36px] text-[28px] font-[550] xl:leading-[54px] md:leading-[40px] leading-[30px] capitalize text-[#000000]">
            A Smarter Place To Belong
            </h2>

            <p className="xl:mt-7 mt-2 font-montserrat xl:text-[16px] text-[14px] font-normal xl:leading-[28px] leading-[25px] xl:w-full lg:w-[400px]  capitalize text-[#333333]">
            Mansha Orchid brings you an opportunity to be part of one of Haryana’s most promising and fast-developing regions, Faridabad. As a key part of the NCR and included in the Smart City vision, the location offers the perfect balance of urban progress and natural surroundings.Surrounded by expanding residential zones and close to major infrastructure developments, the project is positioned to benefit from continuous growth. Its proximity to key healthcare institutions and essential services ensures that everyday needs are always within reach. With a focus on creating a secure and dependable living environment, every aspect is planned to complement the surroundings while enhancing quality of life. The layout, landscaping, and overall design reflect attention to detail and long-term vision.

            </p>

            <div className="xl:mt-5 mt-2">
              <p className="font-montserrat xl:text-[16px] text-[14px] font-normal xl:leading-[28px] leading-[25px]  xl:w-full lg:w-[400px]  capitalize text-[#333333]">
              Mansha Orchid is not just a place to own land, it’s an opportunity to be part of a growing destination where lifestyle, location, and future potential come together.

              </p>
            </div>

            <div className="xl:mt-12 mt-7 grid grid-cols-1 xl:gap-5 lg:gap-0 gap-3 sm:grid-cols-2">
              <div className="flex items-center xl:gap-5 lg:gap-2 gap-3">
                <Image
                  src="/orchid/comunity.png"
                  alt="Forest themed icon"
                  width={60}
                  height={60}
                  className="h-[50px] w-[50px] object-contain xl:h-20 xl:w-20"
                />
                <p className="font-montserrat xl:text-[16px] text-[14px] font-normal leading-[24px] capitalize text-[#333333]">
                Gated community 
                </p>
              </div>

              <div className="flex items-center xl:gap-5 lg:gap-2 gap-3">
                <Image
                  src="/orchid/security.png"
                  alt="Forest themed icon"
                  width={60 }
                  height={60}
                  className="h-[50px] w-[50px] object-contain xl:h-20 xl:w-15"
                />
                <p className="font-montserrat xl:text-[16px] text-[14px] font-normal leading-[24px] capitalize text-[#333333]">
                24/7 security
                </p>
              </div>
            </div>

            {/* <div className="xl:mt-12 md:mt-7 mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="group relative isolate inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-transparent bg-[#652A27] px-6 py-3 font-montserrat text-[16px] font-normal leading-[100%] text-white transition-colors duration-300 hover:border-[#652A27]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 z-0 h-full w-full origin-left translate-x-[-101%] rounded-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-0"
                />
                <span className="relative z-10 inline-flex items-center gap-2 text-white transition-colors duration-300 group-hover:text-[#652A27]">
                  Enquire Now{" "}
                  <i className="ri-arrow-right-line transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#652A27]" />
                </span>
              </button>
              <button
                type="button"
                className="group relative isolate inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[#652A27] bg-transparent px-6 py-3 font-montserrat text-[16px] font-normal leading-[100%] text-[#652A27]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 z-0 h-full w-full origin-left translate-x-[-101%] rounded-full bg-[#652A27] transition-transform duration-300 ease-out group-hover:translate-x-0"
                />
                <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                  Download Brochure{" "}
                  <i className="ri-arrow-right-line transition-all duration-300 group-hover:translate-x-1.5" />
                </span>
              </button>
            </div> */}
          </div>

          <div className="relative xl:mt-22 lg:mt-10 md:mt-3 mt-0">
            <div className="relative h-[300px] w-full overflow-hidden md:h-[570px] lg:h-[420px] xl:h-[570px]">
              <div
                className="flex h-full duration-700 ease-out"
                style={{
                  transform: `translateX(-${activeSlide * 100}%)`,
                  transitionProperty: "transform",
                  transitionDuration: isTransitioning ? "700ms" : "0ms",
                }}
                onTransitionEnd={handleSliderTransitionEnd}
              >
                {sliderSlides.map((src, idx) => (
                  <div key={`${src}-${idx}`} className="relative h-full w-full shrink-0">
                    <Image
                      src={src}
                      alt={`Residential project visual ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
              {RESIDENTIAL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => {
                    setIsTransitioning(true);
                    setActiveSlide(idx);
                  }}
                  className={`cursor-pointer rounded-full transition-all ${
                    activeSlide % RESIDENTIAL_SLIDES.length === idx ? "h-2 w-7 bg-white" : "h-2 w-2 bg-white/85"
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

export default Section2;