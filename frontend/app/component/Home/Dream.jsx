"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef, useEffect, useRef } from "react";

const DREAM_PROJECTS = [
  {
    src: "/mansha-image/vega-street-marquee.jpg",
    alt: "Mansha Vega Street",
    title: "Mansha Vega Street",
    href: "/vega-street",
    description:
      "A dynamic commercial space designed for modern business success",
    overlayClass: "bg-black/20",
    titleClass: "font-[500]",
  },
  {
    src: "/mansha-image/heritage-marquee.jpg",
    alt: "Mansha Heritage",
    title: "Mansha Heritage",
    href: "/mansha-heritage",
    description:
      "Refined living that blends comfort, greenery, connectivity and timeless elegance.",
    overlayClass: "bg-black/35",
    titleClass: "font-[500]",
  },
  {
    src: "/mansha-image/aagman-marquee.jpg",
    alt: "Aagman by Mansha",
    title: "Aagman by Mansha",
    href: "/aagman-by-mansha",
    description:
      "Where everyday comfort meets seamless connectivity and calm living",
    overlayClass: "bg-black/35",
    titleClass: "font-[550]",
  },
  {
    src: "/mansha-image/oasis-marquee.jpg",
    alt: "Mansha Oasis",
    title: "Mansha Oasis",
    href: "/mansha-oasis",
    description:
      "A prime junction of connectivity and growth designed for modern living",
    overlayClass: "bg-black/35",
    titleClass: "font-[500]",
  },
  {
    src: "/mansha-image/orchid-marquee.jpg",
    alt: "Mansha Orchid",
    title: "Mansha Orchid",
    href: "/mansha-orchid",
    description:
      "A promising location designed for secure and future ready living",
    overlayClass: "bg-black/35",
    titleClass: "font-[500]",
  },
  {
    src: "/mansha-image/oaks-marquee.jpg",
    alt: "Mansha Oaks",
    title: "Mansha Oaks",
    href: "/mansha-oaks-4",
    description:
      "A well-planned community offering secure living with premium amenities",
    overlayClass: "bg-black/35",
    titleClass: "font-[500]",
  },
];

const Dream = () => {
  const trackRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    const updateMarquee = () => {
      if (!trackRef.current || !groupRef.current) return;

      const groupWidth = groupRef.current.getBoundingClientRect().width;
      trackRef.current.style.setProperty(
        "--dream-marquee-distance",
        `-${groupWidth}px`
      );
    };

    updateMarquee();

    const resizeObserver = new ResizeObserver(updateMarquee);
    if (groupRef.current) resizeObserver.observe(groupRef.current);
    if (trackRef.current?.parentElement) {
      resizeObserver.observe(trackRef.current.parentElement);
    }

    window.addEventListener("resize", updateMarquee);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMarquee);
    };
  }, []);

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

      <div className="relative w-full overflow-hidden px-0 pt-[0px] pb-[0px]">
        <div ref={trackRef} className="dream-marquee-track flex w-max gap-3">
          <MarqueeGroup ref={groupRef} />
          <MarqueeGroup ariaHidden />
        </div>
      </div>

      <style>{`
        .dream-marquee-track {
          animation: dream-marquee-scroll 40s linear infinite;
          will-change: transform;
        }

        .dream-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes dream-marquee-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(var(--dream-marquee-distance, -50%), 0, 0);
          }
        }
      `}</style>
    </>
  );
};

const MarqueeGroup = forwardRef(function MarqueeGroup(
  { ariaHidden = false },
  ref
) {
  return (
    <div
      ref={ref}
      className="flex shrink-0 gap-3"
      aria-hidden={ariaHidden || undefined}
    >
      {DREAM_PROJECTS.map((project, index) => (
        <article
          key={`${ariaHidden ? "clone" : "item"}-${project.src}-${index}`}
          className="group relative min-h-[380px] w-[85vw] shrink-0 overflow-hidden cursor-pointer sm:w-[60vw] md:w-[45vw] lg:min-h-[400px] lg:w-[320px] xl:h-auto xl:min-h-0 xl:w-[380px]"
        >
          <Image
            src={project.src}
            alt={ariaHidden ? "" : project.alt}
            title={ariaHidden ? undefined : project.alt}
            width={760}
            height={1140}
            className="absolute inset-0 h-full w-full object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05] xl:static xl:h-auto xl:w-full xl:object-contain"
            sizes="(min-width: 1280px) 380px, (min-width: 1024px) 320px, (min-width: 768px) 45vw, 85vw"
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
            <p className="max-w-[390px] font-montserrat text-[16px] xl:text-[18px] font-[500] leading-[20px] xl:leading-[25px] capitalize text-white">
              {project.description}
            </p>
            <ReadMoreLink href={project.href} />
          </div>
        </article>
      ))}
    </div>
  );
});

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
