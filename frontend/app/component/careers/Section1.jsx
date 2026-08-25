"use client";

import Image from "next/image";
import Link from "next/link";
import ProjectHeroHeader from "../common/ProjectHeroHeader";

const Section1 = () => {

  return (
    <>
      <ProjectHeroHeader />
      <section className="about-hero relative min-h-screen overflow-hidden md:h-[388px] md:min-h-[388px] md:max-h-[388px] lg:h-[518px] lg:min-h-[518px] lg:max-h-[518px] xl:min-h-screen xl:h-screen xl:max-h-none">
        <Image
          src="/carrer/career-mobile-banner.jpg"
          alt="Careers Hero"
          fill
          priority
          className="object-cover md:hidden"
          sizes="100vw"
        />
        <Image
          src="/carrer/career-banner.jpg"
          alt="Careers Hero"
          fill
          priority
          className="hidden object-cover md:block"
          sizes="100vw"
        />
        {/* <div className="absolute inset-0 bg-[#10040445]" /> */}

        <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-8xl items-end px-5 pb-8 sm:px-8 md:h-[388px] md:min-h-[388px] lg:h-[518px] lg:min-h-[518px] lg:px-[75px] xl:min-h-screen xl:h-screen">
          <div className="text-white">
            <h1 className="font-[Optima] text-[36px] font-[500] leading-[48px] tracking-[0] text-center capitalize text-white">
              Careers
            </h1>
            <div className="mt-0 md:mt-2 flex items-center gap-1 font-[Montserrat] text-[16px] font-medium leading-[100%] tracking-[0] capitalize text-white">
              <Link href="/" className="hover:opacity-80">
                Home
              </Link>
              <i className="ri-arrow-right-s-line text-base" aria-hidden />
              <span>Careers</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section1;
