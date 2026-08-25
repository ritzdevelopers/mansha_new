"use client";

import Image from "next/image";
import ProjectHeroHeader from "../common/ProjectHeroHeader";

const Section = () => {

  return (
    <>
      <ProjectHeroHeader />
      <section className="about-hero relative min-h-[calc(100vh-50px)] overflow-hidden md:h-[388px] md:min-h-[388px] md:max-h-[388px] lg:h-[518px] lg:min-h-[518px] lg:max-h-[518px] xl:min-h-screen xl:h-screen xl:max-h-none">
        <Image
          src="/delieverd/model-town-mobile.jpg"
          alt="Mansha Model Town"
          fill
          priority
          className="object-cover md:hidden"
          sizes="100vw"
        />
        <Image
          src="/delieverd/model-banner.jpg"
          alt="Mansha Model Town"
          fill
          priority
          className="hidden object-cover md:block"
          sizes="100vw"
        />
        {/* <div className="absolute inset-0 bg-[#10040445]" /> */}
      </section>
    </>
  );
};

export default Section;
