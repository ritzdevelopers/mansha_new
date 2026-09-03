"use client";

import Image from "next/image";
import Link from "next/link";
import ProjectHeroHeader from "../common/ProjectHeroHeader";

const Section1 = () => {

  return (
    <>
      <ProjectHeroHeader />
      <section className="about-hero relative aspect-[1024/519] w-full overflow-hidden">
        <Image
          src="/carrer/career-hero.jpg"
          alt="Careers Hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* <div className="absolute inset-0 bg-[#10040445]" /> */}

        <div className="absolute inset-0 z-20 mx-auto flex w-full max-w-8xl items-end px-5 pb-8 sm:px-8 lg:px-[75px]">
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
