"use client";

import Image from "next/image";
import ProjectHeroHeader from "../common/ProjectHeroHeader";

const BANNER = "/coming-soon/sector-104-banner.jpg";

export default function UpcomingHero() {
  return (
    <>
      <ProjectHeroHeader />
      <section className="about-hero relative min-h-screen overflow-hidden md:h-[388px] md:min-h-[388px] md:max-h-[388px] lg:h-[518px] lg:min-h-[518px] lg:max-h-[518px] xl:h-screen xl:min-h-screen xl:max-h-none">
        <Image
          src={BANNER}
          alt="Coming Soon — Sector 104 Faridabad. A different view lies ahead."
          title="Coming Soon — Sector 104 Faridabad"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </section>
    </>
  );
}
