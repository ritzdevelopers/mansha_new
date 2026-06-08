 "use client";

import Image from "next/image";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function settledSlideIndexFromProgress(progress, totalSlides) {
  if (totalSlides <= 1) return 0;
  const numTransitions = totalSlides - 1;
  return Math.min(totalSlides - 1, Math.floor(progress * numTransitions + 1e-9));
}

const Journey = () => {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const incomingLayerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  /** Settled slide index after bottom→top image animation (same idea as Facility.jsx). */
  const [baseStep, setBaseStep] = useState(0);

  const steps = useMemo(
    () => [
      {
        image: "/about/slider1image.jpg",
        alt: "Journey visual one",
        year: "2006-2011",
        text: "Mansha Greens, Mansha Residency, Mansha Estate, and Mansha Royal Farms reflect a legacy of thoughtful development, modern infrastructure, and quality living.",
      },
      { 
        image: "/about/slider2image.jpg",
        year: "2011-2015",
        text: "Mansha Model Town, Mansha City, Mansha Floors, Mansha Luxury Floors.",
      },
      {
        image: "/about/slider3image.jpg",
        alt: "Journey visual three",
        year: "2015-2020",
        text: "Dummy content for journey stage three. This section can be replaced with actual milestones, project highlights, and key growth achievements of the brand.",
      },
    ],
    []
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky) return;

    const scrollPerSlide = () => sticky.offsetHeight || window.innerHeight;

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: () => `+=${scrollPerSlide() * (steps.length - 1)}`,
      pin: sticky,
      pinSpacing: true,
      scrub: 0.65,
      anticipatePin: 1,
      onUpdate(self) {
        const idx = settledSlideIndexFromProgress(self.progress, steps.length);
        setActiveStep(idx);
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      trigger.kill();
    };
  }, [steps.length]);

  useLayoutEffect(() => {
    const target = activeStep;
    if (target === baseStep) {
      if (incomingLayerRef.current) {
        gsap.killTweensOf(incomingLayerRef.current);
      }
      return;
    }

    const el = incomingLayerRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.set(el, { yPercent: 100 });
    gsap.to(el, {
      yPercent: 0,
      duration: 0.65,
      ease: "power2.out",
      onComplete: () => setBaseStep(target),
    });
  }, [activeStep, baseStep]);

  const currentStep = steps[activeStep];
  const baseStepData = steps[baseStep];

  return (
    <section className="w-full bg-white">
      <div
        ref={wrapperRef}
        className="mx-auto max-w-[1525px]"
        // style={{ height: `${steps.length * 100}dvh` }}
      >
        <div
          ref={stickyRef}
          className="relative h-[125vh] overflow-hidden md:h-screen lg:h-screen min-[1700px]:h-auto"
        >
            <div className="pointer-events-none absolute inset-0 z-0 md:inset-0 md:h-[800px] lg:inset-0 lg:bottom-0 lg:h-full">
              <Image
                src="/mansha-image/Journey.jpg"
                alt="Journey background"
                title="Journey background"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="relative z-10 h-full px-5 py-6 sm:px-8 sm:py-8 lg:px-[70px] lg:py-10 py-[35px] lg:py-[70px]">
              <div className="flex flex-col gap-4 text-center md:text-left lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-x-16 lg:gap-y-6 mt-0 md:mt-10 lg:mt-0 md:gap-y-6">
                <div className="mx-auto inline-flex w-fit rounded-full bg-[#3F8A3D]/80 px-5 py-[7px] font-montserrat text-[14px] font-medium leading-[100%] tracking-[0%] capitalize text-white md:mx-0">
                  Since 2006
                </div>
                <h2 className="font-optima text-[28px] md:text-[36px] font-normal leading-[100%] tracking-[0%] capitalize text-white">
                  Our Story
                </h2>
                <p className="max-w-[1100px] w-full md:max-w-full lg:max-w-[1100px] font-montserrat text-[16px] font-semibold leading-[24px] md:text-[17px] md:leading-[26px] lg:text-[20px] lg:leading-[35px] tracking-[0px] capitalize text-white lg:col-start-2">
                Over the years, our path has been shaped by-{" "}
                  <span className="text-[#FFFFFF99]">
                  innovation, resilience, and the drive to exceed expectations at every stage. By turning challenges into opportunities, we continue creating a legacy of progress and achievement.
                  </span>
                </p>
              </div>

              <div className="mt-2 md:mt-8 grid grid-cols-1 gap-3 px-5 sm:px-0 md:mt-10 md:grid-cols-[1fr_1fr] md:items-start md:gap-6 md:px-0 lg:gap-5 xl:gap-24 xl:px-[100px]">
                <div className="relative w-full min-w-0 overflow-hidden">
                  <Image
                    src={baseStepData.image}
                    alt={baseStepData.alt}
                    title={baseStepData.alt}
                    width={600}
                    height={300}
                    className="relative z-0 h-auto w-full object-cover"
                  />
                  {activeStep !== baseStep && (
                    <div
                      ref={incomingLayerRef}
                      className="pointer-events-none absolute inset-0 z-10 will-change-transform"
                    >
                      <Image
                        key={activeStep}
                        src={steps[activeStep].image}
                        alt={steps[activeStep].alt}
                        title={steps[activeStep].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 z-20 bg-black/25 md:hidden" />
                </div>
                <div className="flex min-w-0 w-full max-w-[465px] flex-col text-center md:mx-0 md:max-w-none md:text-left lg:max-w-[465px] lg:border-t lg:border-t-white/40 lg:pt-6 lg:text-left">
                  <h3 className="font-optima text-[28px] font-normal leading-[110%] tracking-[0%] capitalize text-white md:text-[32px] lg:text-[36px] lg:leading-[100%]">
                    {currentStep.year}
                  </h3>
                  <p className="mt-3 max-w-[465px] font-montserrat text-[15px] font-normal leading-[26px] tracking-[0px] capitalize text-white md:mt-4 md:max-w-none md:text-[16px] md:leading-[29px]">
                    {currentStep.text}
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;