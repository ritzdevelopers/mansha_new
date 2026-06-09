"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 100, suffix: "+", label: "Verified Properties Sold" },
  { target: 200, suffix: "+", label: "Professional Trusted Agents" },
  { target: 98, suffix: "%", label: "Client Satisfaction Rate" },
];

const COUNT_DURATION_MS = 2000;

const Mansha = () => {
  const statsRef = useRef(null);
  const imageSectionRef = useRef(null);
  const hasCountedRef = useRef(false);
  const [counts, setCounts] = useState(() => STATS.map(() => 0));
  const [playReveal, setPlayReveal] = useState(false);

  useEffect(() => {
    const el = imageSectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setPlayReveal(entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasCountedRef.current) return;
        hasCountedRef.current = true;

        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / COUNT_DURATION_MS, 1);
          const eased = 1 - (1 - progress) ** 3;
          setCounts(STATS.map((stat) => Math.round(stat.target * eased)));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white mx-auto max-w-[1500px]">
      <div className="mx-auto flex max-w-8xl flex-col gap-6 px-5 py-[35px] sm:px-8 lg:flex-row lg:items-start lg:gap-[130px] lg:px-[75px] lg:py-[75px]">
        
        {/* Left Button */}
        <div className="shrink-0 mt-0 lg:mt-4">
          <button className="rounded-full border border-[#F1CD9C] bg-[#FCE0BA] px-6 py-2 font-montserrat text-[14px] font-medium capitalize leading-[100%] tracking-normal text-[#333333]">
            About
          </button>
        </div>

        {/* Right Content */}
        <div className="max-w-[1100px]">
          <h2 className="font-montserrat text-[17px] font-[400] md:font-[600] lg:leading-[38px] md:leading-[30px] tracking-normal text-black lg:text-[24px] md:text-[20px] leading-[25px]">
          At Mansha Group, we are proud to be one of the fastest-growing{" "}
            
            real estate developers in Faridabad, driven by a strong commitment to quality, innovation, and customer satisfaction.
            
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-8xl px-5 pb-[35px] sm:px-8 lg:px-[75px] lg:pb-[75px] mt-0 lg:mt-12">
        <div ref={imageSectionRef}>
        <div className="hidden w-full items-start justify-between gap-[20px] md:flex lg:hidden">
          <div className="w-full flex-1 overflow-hidden md:h-[280px]">
            <div
              className={`h-full w-full overflow-hidden ${
                playReveal ? "mansha-slide-left-reveal" : "mansha-slide-left-hidden"
              }`}
            >
              <Image
                src="/about/about-section2.jpg"
                alt="Building about"
                title="Building about"
                width={280}
                height={170}
                className={`h-auto w-full object-cover md:h-full ${playReveal ? "faq-common-img-zoom" : ""}`}
              />
            </div>
          </div>
          <div className="w-full flex-1 overflow-hidden md:h-[280px]">
            <div
              className={`h-full w-full overflow-hidden ${
                playReveal ? "faq-common-slide-reveal" : "faq-common-slide-hidden"
              }`}
            >
              <Image
                src="/about/about-section3.jpg"
                alt="Villa about"
                title="Villa about"
                width={280}
                height={170}
                className={`h-auto w-full object-cover md:h-full ${playReveal ? "faq-common-img-zoom" : ""}`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-[10px] md:gap-[20px] lg:gap-[20px] xl:gap-[120px] lg:flex-row lg:items-start">
          <div className="order-1 mx-auto w-full max-w-[330] overflow-hidden md:hidden lg:order-none lg:mx-0 lg:mt-[60px] lg:block lg:self-end">
            <div
              className={`overflow-hidden ${
                playReveal ? "mansha-slide-left-reveal" : "mansha-slide-left-hidden"
              }`}
            >
              <Image
                src="/about/about-section2.jpg"
                alt="Building about"
                title="Building about"
                width={280}
                height={170}
                className={`h-auto w-full object-cover ${playReveal ? "faq-common-img-zoom" : ""}`}
              />
            </div>
          </div>

          <div className="order-3 mt-2 md:mt-5 w-full max-w-[450px] text-center md:max-w-full md:text-left lg:order-none lg:mt-0 lg:max-w-[450px]">
            <p className="font-montserrat text-[16px]  font-normal leading-[25px] md:leading-[28px] tracking-[0px] capitalize text-[#333333]">
            Our portfolio includes both residential and commercial properties, thoughtfully designed with a focus on modernity, comfort, and sustainability. We believe a home is more than just a place to live; it is a space where memories are made, which is why every project is crafted with attention to detail.
            What sets us apart is our commitment to timely delivery and reliability. We take pride in completing projects on schedule while consistently exceeding expectations.

            </p>

            <button
  className="group relative mx-auto mt-3 md:mt-6 inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[#652A27]/90 px-6 py-3 font-montserrat text-[16px] font-normal leading-[100%] tracking-[0%] text-[#652A27] transition-colors duration-300 md:mx-0"
>
  {/* Background Animation */}
  <span className="absolute inset-0 -translate-x-full bg-[#652A27] transition-transform duration-500 ease-out group-hover:translate-x-0"></span>

  {/* Content */}
  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
    Download Brochure

    <i
      className="ri-arrow-right-line text-[16px] transition-all duration-300 group-hover:translate-x-2 group-hover:text-white"
      aria-hidden
    />
  </span>
</button>
          </div>

          <div className="order-2 mx-auto w-full max-w-[330px] overflow-hidden md:hidden lg:order-none lg:mx-0 lg:max-w-[320px] lg:-mt-[60px] lg:block lg:self-start">
            <div
              className={`overflow-hidden ${
                playReveal ? "faq-common-slide-reveal" : "faq-common-slide-hidden"
              }`}
            >
              <Image
                src="/about/about-section3.jpg"
                alt="Villa about"
                title="Villa about"
                width={280}
                height={170}
                className={`h-auto w-full object-cover ${playReveal ? "faq-common-img-zoom" : ""}`}
              />
            </div>
          </div>
        </div>
        </div>

        <div
          ref={statsRef}
          className="mt-5  md:mt-8 lg:mt-19 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="border border-[#0000001A] bg-white px-6 py-6 text-center"
            >
              <h3 className="number-shine font-optima text-[48px] font-bold leading-[100%] tracking-[0%] text-transparent">
                {counts[index]}
                {stat.suffix}
              </h3>
              <p className="mt-3 font-optima text-[20px] font-[550] leading-[33px] tracking-[0%] capitalize text-[#00000099]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes mansha-clip-left-reveal {
          from {
            clip-path: inset(0% 100% 0% 0%);
          }
          to {
            clip-path: inset(0% 0% 0% 0%);
          }
        }
        .mansha-slide-left-hidden {
          clip-path: inset(0% 100% 0% 0%);
        }
        .mansha-slide-left-reveal {
          animation: mansha-clip-left-reveal 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @keyframes faq-common-clip-reveal {
          from {
            clip-path: inset(0% 0% 0% 100%);
          }
          to {
            clip-path: inset(0% 0% 0% 0%);
          }
        }
        @keyframes faq-common-img-zoom {
          from {
            transform: scale(1.2);
          }
          to {
            transform: scale(1);
          }
        }
        .faq-common-slide-hidden {
          clip-path: inset(0% 0% 0% 100%);
        }
        .faq-common-slide-reveal {
          animation: faq-common-clip-reveal 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .faq-common-img-zoom {
          transform-origin: center center;
          animation: faq-common-img-zoom 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .mansha-slide-left-reveal,
          .faq-common-slide-reveal,
          .faq-common-img-zoom {
            animation-duration: 0.35s;
            animation-timing-function: ease-out;
          }
        }
      `}</style>

      <style jsx>{`
        .number-shine {
          background-image: repeating-linear-gradient(
            110deg,
            #000000 0%,
            #000000 46%,
            #c49b64 46%,
            #c49b64 50%,
            #000000 50%,
            #000000 100%
          );
          background-size: 200% 100%;
          background-repeat: repeat;
          -webkit-background-clip: text;
          background-clip: text;
          animation: number-shine-move 5s linear infinite;
        }

        @keyframes number-shine-move {
          0%,
          20% {
            background-position: 0% 50%;
          }
          100% {
            background-position: -200% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default Mansha;