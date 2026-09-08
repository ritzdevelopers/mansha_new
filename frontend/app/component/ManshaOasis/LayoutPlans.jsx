"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const LAYOUT_PLANS = [
  {
    title: "Old Layout Plan",
    src: "/oasis/old-layout-plan.jpg",
    alt: "Mansha Oasis old layout plan",
    width: 980,
    height: 686,
  },
  {
    title: "Provisional Revised Layout Plan",
    src: "/oasis/new-layout-plan.jpg",
    alt: "Mansha Oasis new layout plan",
    width: 980,
    height: 649,
  },
];

const LayoutPlans = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const activePlan = activeIndex !== null ? LAYOUT_PLANS[activeIndex] : null;

  return (
    <section id="layout-plans" className="w-full pb-[35px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          {LAYOUT_PLANS.map((plan, index) => (
            <article key={plan.src} className="flex min-w-0 flex-col">
              <h2 className="text-center font-optima text-[16px] font-medium capitalize leading-[120%] tracking-[0] text-[#111111] sm:text-[22px] md:text-left md:text-[28px] lg:text-[32px]">
                {plan.title}
              </h2>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="mt-4 flex h-full w-full cursor-pointer items-center overflow-hidden bg-[#F5F5F5] md:mt-6"
                aria-label={`View ${plan.title} larger`}
              >
                <Image
                  src={plan.src}
                  alt={plan.alt}
                  width={plan.width}
                  height={plan.height}
                  className="h-auto w-full object-contain"
                />
              </button>
            </article>
          ))}
        </div>
      </div>

      {activePlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-[60] flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-[20px] leading-none text-white max-md:right-2 max-md:top-2 max-md:h-8 max-md:w-8 max-md:text-[14px]"
            aria-label="Close layout plan"
          >
            <i className="ri-close-line" />
          </button>
          <div
            className="relative z-10 max-h-[90vh] w-full max-w-6xl overflow-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activePlan.src}
              alt={activePlan.alt}
              width={activePlan.width}
              height={activePlan.height}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default LayoutPlans;
