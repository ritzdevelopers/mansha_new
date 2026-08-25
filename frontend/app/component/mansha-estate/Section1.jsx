"use client";

import Image from "next/image";
import ProjectHeroHeader from "../common/ProjectHeroHeader";

const Section1 = () => {

  return (
    <>
      <ProjectHeroHeader />
      <section className="about-hero relative min-h-[calc(100vh-50px)] overflow-hidden md:h-[388px] md:min-h-[388px] md:max-h-[388px] lg:h-[518px] lg:min-h-[518px] lg:max-h-[518px] xl:min-h-screen xl:h-screen xl:max-h-none">
        <Image
          src="/delieverd/estate-mobile.jpg"
          alt="Mansha Estate"
          fill
          priority
          className="object-cover md:hidden"
          sizes="100vw"
        />
        <Image
          src="/delieverd/estate-banner.jpg"
          alt="Mansha Estate"
          fill
          priority
          className="hidden object-cover md:block"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#10040445]" />

        <div className="relative z-20 mx-auto flex min-h-[calc(100vh-50px)] w-full max-w-8xl items-start justify-center px-5 pt-28 sm:px-8 md:h-[388px] md:min-h-[388px] md:items-end md:justify-end md:pt-0 md:pb-10 lg:h-[518px] lg:min-h-[518px] lg:px-[75px] lg:pb-12 xl:min-h-screen xl:h-screen">
         
        </div>
      </section>
    </>
  );
};

export default Section1;
