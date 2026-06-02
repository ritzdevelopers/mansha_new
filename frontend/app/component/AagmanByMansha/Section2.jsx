"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import BookASite from "../common/Book-a-site";

const RESIDENTIAL_SLIDES = [
  "/aagman/girl.jpg",
  "/aagman/gym-girl.jpg",
  "/aagman/road.jpg",
];

const Section2 = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [bookSiteOpen, setBookSiteOpen] = useState(false);
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
              Home | Residential | <span className="text-[#652A27] font-semibold">Aagman</span>
            </p>

            <h2 className="xl:mt-15 mt-5 font-optima xl:text-[36px] text-[28px] font-[550] xl:leading-[54px] md:leading-[40px] leading-[30px] capitalize text-[#000000]">
            An Initiative by Mansha Group
            </h2>

            <p className="xl:mt-7 mt-2 font-montserrat xl:text-[16px] text-[14px] font-normal xl:leading-[28px] leading-[25px] xl:w-full lg:w-[400px]  capitalize text-[#333333]">
            Mansha Aagram is crafted to offer a modern lifestyle defined by space, comfort, and connectivity. Located in Sector 83–84, Sonipat, the project brings thoughtfully designed 3 BHK luxury floors within a calm residential setting. With well-planned layouts and contemporary infrastructure, it blends everyday convenience with peaceful living. Wide roads, landscaped surroundings, and curated amenities create a balanced and vibrant environment. The project emphasizes quality construction, efficient design, and a sense of community living. Every home is planned to maximize openness, natural light, and everyday comfort.



            </p>

            <div className="xl:mt-5 mt-2">
              <p className="font-montserrat xl:text-[16px] text-[14px] font-normal xl:leading-[28px] leading-[25px]  xl:w-full lg:w-[400px]  capitalize text-[#333333]">
              Strategically located, Mansha Aagram ensures seamless access to schools, healthcare, shopping hubs, and key city routes. The location enhances daily convenience while keeping you well-connected to emerging growth corridors.
              </p>
            </div>

            <div className="xl:mt-5 mt-2">
              <p className="font-montserrat xl:text-[16px] text-[14px] font-normal xl:leading-[28px] leading-[25px]  xl:w-full lg:w-[400px]  capitalize text-[#333333]">
              With a vision to redefine modern low-rise living, Mansha Aagram offers an ideal destination for families and future investments. Experience a lifestyle where space, comfort, and connectivity come together effortlessly.

              </p>
            </div>

            

            <div className="xl:mt-12 mt-7 grid grid-cols-1 xl:gap-5 lg:gap-0 gap-3 sm:grid-cols-2">
              <div className="flex items-center xl:gap-5 lg:gap-2 gap-3">
                <Image
                  src="/aagman/kids-play-area.png"
                  alt="Forest themed icon"
                  width={60}
                  height={60}
                  className="h-[50px] w-[50px] object-contain xl:h-20 xl:w-20"
                />
                <p className="font-montserrat xl:text-[16px] text-[14px] font-normal leading-[24px] capitalize text-[#333333]">
                Kids play area 
                </p>
              </div>

              <div className="flex items-center xl:gap-5 lg:gap-2 gap-3">
                <Image
                  src="/aagman/open-gym-area.png"
                  alt="Forest themed icon"
                  width={60 }
                  height={60}
                  className="h-[50px] w-[50px] object-contain xl:h-20 xl:w-20"
                />
                <p className="font-montserrat xl:text-[16px] text-[14px] font-normal leading-[24px] capitalize text-[#333333]">
                Open gym area 
                </p>
              </div>
            </div>

            <div className="xl:mt-8 md:mt-7 mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setBookSiteOpen(true)}
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
            </div>
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
              <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
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
      </div>

      <BookASite open={bookSiteOpen} onClose={() => setBookSiteOpen(false)} />
    </section>
  );
};

export default Section2;