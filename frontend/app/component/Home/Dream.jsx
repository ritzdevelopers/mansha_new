"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const DREAM_PROJECTS = [
  {
    src: "/mansha-image/Mansha-Heritage.jpg",
    alt: "Mansha Heritage",
    title: "Mansha Heritage",
    href: "/mansha-heritage",
    description:
      "Refined living that blends comfort, greenery, connectivity and timeless elegance.",
    overlayClass: "bg-black/35",
    titleClass: "font-[500]",
  },
  {
    src: "/mansha-image/mansha-vega-street.jpg",
    alt: "Mansha Vega Street",
    title: "Mansha Vega Street",
    href: "/vega-street",
    description:
      "A dynamic commercial space designed for modern business success",
    overlayClass: "bg-black/20",
    titleClass: "font-[500]",
  },
  {
    src: "/mansha-image/orchid.jpg",
    alt: "Mansha Orchid",
    title: "Mansha Orchid",
    href: "/mansha-orchid",
    description:
      "A promising location designed for secure and future ready living",
    overlayClass: "bg-black/35",
    titleClass: "font-[500]",
  },
  {
    src: "/mansha-image/mansha-agman.jpg",
    alt: "Aagman by Mansha",
    title: "Aagman by Mansha",
    href: "/aagman-by-mansha",
    description:
      "Where everyday comfort meets seamless connectivity and calm living",
    overlayClass: "bg-black/35",
    titleClass: "font-[550]",
  },
];

const Dream = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeLgCard, setActiveLgCard] = useState(1);
  const [hoveredXlCard, setHoveredXlCard] = useState(null);
  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Mobile: 1 card per view → 4 slides. Md (768–1023): 2 cards per view → 2 slides.
    const maxSteps = isMdScreen ? 2 : 4;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % maxSteps);
    }, 2500);

    return () => clearInterval(id);
  }, [isMdScreen]);

  useEffect(() => {
    setActiveSlide(0);
  }, [isMdScreen]);

  return (
    <>
      <div className="w-full bg-[#FFFFFF] mx-auto max-w-[1300px]" />
      <div className="mx-auto flex max-w-8xl flex-col items-center gap-[15px] px-5 py-[35px] text-center sm:px-8 md:items-start md:text-left lg:flex-row lg:items-center lg:gap-[0px] lg:justify-between lg:px-[75px] lg:py-[70px] 2xl:justify-center 2xl:gap-12">
      <div className="w-full shrink-0 lg:w-[28%] 2xl:w-auto">
      <h2 className="font-optima text-[28px] md:text-[36px] lg:text-[30px] xl:text-[36px] font-[400] not-italic leading-[30px] md:leading-[37px] tracking-normal capitalize text-[#111111]">
      Building Beyond  <br /> Expectations
</h2>
</div>
        <div className="w-full min-w-0 max-w-[800px]">
          <p className="font-montserrat text-[14px] lg:text-[16px] font-normal not-italic leading-[25px] lg:leading-[25px] xl:leading-7 tracking-[0px] capitalize text-[#6b6b6b]">
          More than infrastructure, creating the backbone of future growth.
 Driven by commitment, quality, and uncompromising performance.
 Shaping visions into powerful masterpieces that energize progress.

          </p>
        </div>

        <div className="w-full shrink-0 lg:w-[20%] 2xl:w-auto">
        <div className="flex justify-center md:justify-start lg:justify-end 2xl:justify-start">
          <Link href="/about-us">
        <button className="group cursor-pointer relative overflow-hidden inline-flex items-center gap-3 rounded-full border border-[#000000] px-3 py-[9px] font-montserrat text-[14px] lg:text-[10px] xl:text-[14px] font-semibold leading-none capitalize text-[#333333] cursor-pointer transition-all duration-300 hover:text-white focus:outline-none">

{/* Background fill */}
<span className="absolute left-0 top-0 h-full w-0 bg-[#333333] transition-all duration-500 group-hover:w-full group-focus-visible:w-full"></span>

{/* Text */}
<span className="relative z-10 whitespace-nowrap group-hover:text-white group-focus-visible:text-white">
  Discover Our Story
</span>

{/* Arrow */}
<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-current transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:border-white group-focus-visible:text-white group-focus-visible:translate-x-1 group-focus-visible:border-white">
  <i className="ri-arrow-right-up-line"></i>
</span>

</button>
</Link>
</div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden px-0 pt-[0px] pb-[0px] lg:hidden">
        <div
          className="flex transition-transform duration-700 ease-out md:gap-[10px]"
          style={{
            transform: `translateX(-${activeSlide * (isMdScreen ? 50 : 100)}%)`,
          }}
        >
          {DREAM_PROJECTS.map((project) => (
            <article
              key={project.title}
              className="group relative min-h-[380px] w-full shrink-0 overflow-hidden cursor-pointer md:w-1/2"
            >
              <Image
                src={project.src}
                alt={project.alt}
                title={project.alt}
                fill
                className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="100vw"
              />
              <div
                className={`absolute inset-0 transition-colors duration-300 group-hover:bg-transparent ${project.overlayClass}`}
              />
              <p
                className={`absolute left-4 top-4 font-optima text-[24px] ${project.titleClass} leading-none capitalize text-white`}
              >
                {project.title}
              </p>
              <div className="absolute bottom-5 left-4 right-4 translate-y-0 opacity-100 transition-all duration-300">
                <p className="max-w-[390px] font-montserrat text-[16px] font-[500] leading-[20px] capitalize text-white">
                  {project.description}
                </p>
                <ReadMoreLink href={project.href} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden w-full max-w-none items-stretch gap-3 px-0 pb-[35px] lg:flex lg:pb-[0px] xl:hidden">
        {DREAM_PROJECTS.map((project, index) => {
          const isActive = activeLgCard === index;

          return (
            <article
              key={project.title}
              onClick={() => setActiveLgCard(index)}
              className={`group relative h-[400px] min-h-[400px] max-h-[400px] shrink-0 self-stretch overflow-hidden transition-all duration-500 cursor-pointer ${
                isActive ? "flex-[1.7]" : "flex-1"
              }`}
            >
              <Image
                src={project.src}
                alt={project.alt}
                title={project.alt}
                fill
                className="object-cover object-center transition-all duration-500"
                sizes="(min-width: 1024px) and (max-width: 1279px) 50vw, 25vw"
              />
              <div
                className={`absolute inset-0 transition-colors duration-300 ${project.overlayClass} ${
                  isActive ? "bg-transparent" : ""
                }`}
              />
              <p
                className={`absolute left-4 top-4 font-optima text-[24px] ${project.titleClass} leading-none capitalize text-white`}
              >
                {project.title}
              </p>
              <div
                className={`absolute bottom-5 left-4 right-4 transition-all duration-300 ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                <p className="max-w-[390px] font-montserrat text-[16px] xl:text-[18px] font-[500] leading-[20px] xl:leading-[25px] capitalize text-white">
                  {project.description}
                </p>
                <ReadMoreLink href={project.href} stopPropagation />
              </div>
            </article>
          );
        })}
      </div>

      <div
        className="hidden w-full max-w-none gap-3 px-0 pb-[35px] xl:flex xl:pb-[0px]"
        onMouseLeave={() => setHoveredXlCard(null)}
      >
        <article
          className="group relative hidden min-h-[420px] flex-1 overflow-hidden transition-all duration-500 xl:block xl:hover:flex-[1.7] cursor-pointer"
          onMouseEnter={() => setHoveredXlCard(0)}
        >
          <Image
            src="/mansha-image/Mansha-Heritage.jpg"
            alt="Mansha Heritage"
            title="Mansha Heritage"
            fill
            className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-transparent" />
          <p className="absolute left-4 top-4 font-optima text-[24px] font-[500] leading-none capitalize text-white">
            Mansha Heritage
          </p>
          <div
            className={`absolute bottom-5 left-4 right-4 transition-all duration-300 ${
              hoveredXlCard === 0
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            <p className=" font-montserrat text-[18px] font-[500] leading-[25px] capitalize text-white">
              Refined living that blends comfort greenery connectivity and
              timeless elegance.
            </p>
            <ReadMoreLink href={DREAM_PROJECTS[0].href} />
          </div>
        </article>

        <article
          className="group relative min-h-[460px] w-full overflow-hidden transition-all duration-500 xl:min-h-[520px] xl:flex-[1.7] xl:hover:flex-[1.7] cursor-pointer"
          onMouseEnter={() => setHoveredXlCard(1)}
        >
          <Image
            src="/mansha-image/mansha-vega-street.jpg"
            alt="Mansha vega street"
            title="Mansha vega street"
            fill
            className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent" />
          <p className="absolute left-4 top-4 font-optima text-[24px] font-[500] leading-none capitalize text-white">
            Mansha Vega Street
          </p>
          <div
            className={`absolute bottom-5 left-4 right-4 transition-all duration-300 ${
              hoveredXlCard === null || hoveredXlCard === 1
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            <p className=" font-montserrat text-[18px] font-[500] leading-[25px] capitalize text-white">
              A dynamic commercial space designed for modern business success
            </p>
            <ReadMoreLink href={DREAM_PROJECTS[1].href} />
          </div>
        </article>

        <article
          className="group relative hidden min-h-[420px] flex-1 overflow-hidden transition-all duration-500 xl:block xl:hover:flex-[1.7] cursor-pointer"
          onMouseEnter={() => setHoveredXlCard(2)}
        >
          <Image
            src="/mansha-image/orchid.jpg"
            alt="Mansha Orchid"
            title="Mansha Orchid"
            fill
            className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-transparent" />
          <p className="absolute left-4 top-4 font-optima text-[24px] font-[500] leading-none capitalize text-white">
            Mansha Orchid
          </p>
          <div
            className={`absolute bottom-5 left-4 right-4 transition-all duration-300 ${
              hoveredXlCard === 2
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            <p className=" font-montserrat text-[18px] font-[500] leading-[25px] capitalize text-white">
              A promising location designed for secure and future ready living
            </p>
            <ReadMoreLink href={DREAM_PROJECTS[2].href} />
          </div>
        </article>

        <article
          className="group relative hidden min-h-[420px] flex-1 overflow-hidden transition-all duration-500 xl:block xl:hover:flex-[1.7] cursor-pointer"
          onMouseEnter={() => setHoveredXlCard(3)}
        >
          <Image
            src="/mansha-image/mansha-agman.jpg"
            alt="Aagman by Mansha"
            title="Aagman by Mansha"
            fill
            className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-transparent" />
          <p className="absolute left-4 top-4 font-optima text-[24px] font-[500] leading-none capitalize text-white">
            Aagman by Mansha
          </p>
          <div
            className={`absolute bottom-5 left-4 right-4 transition-all duration-300 ${
              hoveredXlCard === 3
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            <p className=" font-montserrat text-[18px] font-[500] leading-[25px] capitalize text-white">
              Where everyday comfort meets seamless connectivity and calm living
            </p>
            <ReadMoreLink href={DREAM_PROJECTS[3].href} />
          </div>
        </article>
      </div>
    </>
  );
};

function ReadMoreLink({ href, stopPropagation = false }) {
  return (
    <Link
      href={href}
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
      className="mt-4 inline-block rounded-full cursor-pointer bg-[#7B1E1E] px-4 py-2 font-montserrat text-[14px] font-semibold leading-none capitalize text-white"
    >
      Read More
    </Link>
  );
}

export default Dream;