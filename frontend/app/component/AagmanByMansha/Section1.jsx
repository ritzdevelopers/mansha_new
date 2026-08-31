"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ProjectHeroHeader from "../common/ProjectHeroHeader";

const VEGA_SLIDES = ["/mansha-image/residential-hero.png"];

const Section1 = () => {
  const [activeVegaSlide, setActiveVegaSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveVegaSlide((prev) => (prev + 1) % VEGA_SLIDES.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <ProjectHeroHeader />
      <section className="about-hero relative min-h-[calc(100vh-50px)] md:h-[388px] md:min-h-[388px] md:max-h-[388px] lg:h-[518px] lg:min-h-[518px] lg:max-h-[518px] xl:min-h-screen xl:h-screen xl:max-h-none">
        <Image
          src="/aagman/aagman-mobile-banner.jpg"
          alt="Aagman by Mansha"
          fill
          priority
          className="object-cover md:hidden"
          sizes="100vw"
        />
        <Image
          src="/aagman/aagman-banner.jpg"
          alt="Aagman by Mansha"
          fill
          priority
          className="hidden object-cover md:block"
          sizes="100vw"
        />
        {/* <div className="absolute inset-0 bg-[#10040445]" /> */}

        <div className="relative z-20 mx-auto flex min-h-[calc(100vh-50px)] w-full max-w-8xl items-start justify-center px-5 pt-28 sm:px-8 md:h-[388px] md:min-h-[388px] md:items-end md:justify-end md:pt-0 md:pb-10 lg:h-[518px] lg:min-h-[518px] lg:px-[75px] lg:pb-12 xl:min-h-screen xl:h-screen">
          <div className="flex items-stretch gap-4 sm:gap-5">
            <span className="hidden w-px shrink-0 self-stretch bg-white md:block border-2 border-white" aria-hidden />
            <div className="text-center text-white md:text-left">
              <h1 className="whitespace-nowrap font-optima text-[18px] md:text-[25px] lg:text-[36px] font-medium leading-[42px] tracking-[0] capitalize text-white">
              Space That Holds You
              </h1>
              {/* <p className="mt-0 md:mt-2 font-optima text-[18px] md:text-[25px] lg:text-[36px] font-medium leading-[100%] tracking-[0] capitalize text-white">
              Mansha
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section1;