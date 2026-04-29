"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is off-plan real estate and is it worth investing in it?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  },
  {
    question: "What is off-plan real estate and is it worth investing in it?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "What is off-plan real estate and is it worth investing in it?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "What is off-plan real estate and is it worth investing in it?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "What is off-plan real estate and is it worth investing in it?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleItem = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="w-full max-w-[1500px] bg-white px-0 mx-auto">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-4 px-5 py-[35px] sm:px-8 lg:gap-5 lg:px-[75px] lg:py-[70px] xl:gap-0 xl:grid-cols-[500px_1fr]">
        <div>
          <h2 className="font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[22px] font-[500] leading-[42px] tracking-normal capitalize text-[#111111] md:text-[36px] text-center md:text-left">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 xl:mt-7 font-['Montserrat',sans-serif] md:text-[16px] text-[14px] font-normal leading-[100%] tracking-normal capitalize text-[#333333] text-center md:text-left">
            If you have any other questions, please email us.
          </p>
        </div>

        <div className="w-full space-y-0 text-left xl:pt-35 xl:-translate-x-10 xl:justify-self-start">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <article key={index} className="border-b border-[#A9A9A9] py-5 text-left">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                >
                  <span className="min-w-0 flex-1 truncate pr-2 font-['Montserrat',sans-serif] text-[16px] font-medium capitalize tracking-normal text-[#333333] leading-[20px] md:text-[20px] md:leading-[20px] lg:text-[24px] lg:leading-[100%]">
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
                  <p className="mt-2 md:mt-0 font-['Montserrat',sans-serif] text-[16px] font-normal leading-[20px] md:leading-[24px] tracking-normal text-left text-[#00000099]">
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

export default Faq;