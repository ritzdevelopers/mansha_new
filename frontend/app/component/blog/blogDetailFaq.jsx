"use client";

import { useState } from "react";

const BlogDetailFaq = ({ items, bodyClass, subTitleClass }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleItem = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="relative z-10 mt-6 space-y-3">
      {items.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={`${index}-${faq.q}`}
            className="overflow-hidden rounded-sm border border-[#E6E6E6] bg-white"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              className={`${subTitleClass} flex w-full cursor-pointer items-center justify-between gap-3 bg-[#4A1F1F] px-4 py-3 text-left text-[16px] text-white transition-colors duration-300 ease-out`}
            >
              <span className="min-w-0 flex-1 pointer-events-none">Q: {faq.q}</span>
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center pointer-events-none">
                <i
                  className={`ri-add-fill absolute text-[20px] transition-all duration-300 ${
                    isOpen ? "scale-75 opacity-0" : "scale-100 opacity-100"
                  }`}
                  aria-hidden
                />
                <i
                  className={`ri-subtract-fill absolute text-[20px] transition-all duration-300 ${
                    isOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                  aria-hidden
                />
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className={`${bodyClass} px-4 pb-4 pt-3`}>A: {faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogDetailFaq;
