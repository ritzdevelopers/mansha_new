"use client";

import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    question: "What Is Off-Plan Real Estate And Is It Worth Investing In?",
    answer:
      "Off-plan real estate refers to properties that are purchased before construction is completed. Investors often benefit from lower entry prices, flexible payment plans, and higher appreciation potential once the project is delivered. However, choosing a reliable developer is key to minimizing risks. "
  },
  {
    question: " Why Should You Invest In Faridabad Real Estate?",
    answer:
      "Faridabad is rapidly emerging as a high-growth real estate destination, driven by improved connectivity, expanding infrastructure, and competitive pricing compared to other NCR regions. It offers strong potential for both end-users and investors.",
  },
  {
    question: "Are Mansha Group Projects RERA Approved?",
    answer:
      "Yes, Mansha Group projects are RERA approved, ensuring transparency, legal compliance, and security for buyers. This helps investors make confident and informed decisions.",
  },
  {
    question: " What Types Of Properties Does Mansha Group Offer?",
    answer:
      "Mansha Group offers a range of residential plots, independent floors, and commercial spaces designed to meet the needs of modern buyers and investors",
  },
  {
    question: "How Do I Choose The Right Property For Investment?",
    answer:
      "The right property depends on factors like location, future development, connectivity, and developer credibility. It’s important to evaluate long-term appreciation potential and your investment goals before making a decision.",
  },
];

const 
FAQCommon = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleItem = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="mx-auto w-full max-w-[1500px] bg-white px-0">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-4 px-5 pb-[35px] sm:px-8 lg:grid-cols-[420px_1fr] lg:gap-0 lg:px-[75px] lg:pb-[0px] xl:grid-cols-[500px_1fr]">
        <div>
          <h2 className="text-center font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[28px] font-[500] leading-[30px] tracking-normal capitalize text-[#111111] md:text-[36px] md:leading-[42px] md:text-left lg:whitespace-nowrap">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 md:mt-2 font-montserrat text-[14px] font-normal leading-[100%] tracking-normal capitalize text-[#333333] text-center md:text-[16px] md:text-left xl:mt-7">
            If you have any other questions, please email us.
          </p>

          <div className="relative mt-5 lg:mt-12 xl:mt-[85px] w-full overflow-hidden">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[331px] sm:w-[331px] lg:mx-0">
              <Image
                src="/mansha-image/homepage-faq.jpg"
                alt="Commercial workspace"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 331px"
              />
              <div
                className="pointer-events-none absolute inset-[5%] z-[1] border-2 border-white"
                aria-hidden
              />
              <div className="absolute bottom-[calc(5%+10px)] left-[calc(5%+10px)] z-[2]">
                <Image
                  src="/mansha-svg/commerical-logo.svg"
                  alt="Mansha"
                  width={60}
                  height={60}
                  className="h-9 w-auto object-contain sm:h-10 md:h-11"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full space-y-0 text-left lg:justify-self-start lg:pt-20 xl:pt-35 lg:-translate-x-16 xl:-translate-x-10">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <article key={index} className="border-b border-[#A9A9A9] py-5 text-left">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                >
                  <span className="min-w-0 flex-1 truncate pr-2 font-montserrat text-[16px] font-medium capitalize tracking-normal text-[#333333] leading-[20px] md:text-[20px] md:leading-[20px] lg:text-[15px] lg:font-normal lg:leading-[22px] xl:text-[24px] xl:font-medium xl:leading-[100%]">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border text-[20px] ${
                      isOpen
                        ? "border-[#333333] bg-[#333333] text-white"
                        : "border-[#A9A9A9] bg-white text-[#333333]"
                    }`}
                  >
                    <i className={isOpen ? "ri-arrow-up-line" : "ri-arrow-down-line"} />
                  </span>
                </button>

                <div
                  className={`w-full overflow-hidden text-left transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-60 lg:pt-4 pt-0 opacity-100" : "max-h-0 pt-0 opacity-0"
                  }`}
                >
                  <p className="mt-2 md:mt-0 font-montserrat text-[16px] font-normal leading-[20px] md:leading-[24px] tracking-normal text-left text-[#00000099] lg:text-[14px] lg:leading-[20px] xl:text-[16px] xl:leading-[24px]">
                    {item.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQCommon;