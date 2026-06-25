"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const trendingCards = [
  {
    image: "/facility/Bhoomi-Pujan.jpg",
    title: "Bhoomi Pujan",
    date: "18 August, 2025",
  },
  {
    image: "/facility/Property-Carnival.jpg",
    title: "Property Carnival",
    date: "15 August, 2024",
  },
  {
      image: "/facility/tournament.jpg",
      title: "Tournament",
    date: "18 August, 2025",
  },
  // {
  //   image: "/facility/Community-party.jpg",
  //   title: "Jagran Achievers Award – Bali, Indonesia",
  //   date: "18 August, 2025",
  // },
  // {
  //   image: "/facility/yoga.jpg",
  //   title: "Channel Partners Meet",
  //   date: "15 August, 2024",
  // },
];



const loopCards = [...trendingCards, ...trendingCards];

const Manshagroup = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const isBackwardPrep = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((prev) => {
        if (prev >= trendingCards.length) return prev;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const resetToStart = () => {
    setEnableTransition(false);
    setSlideIndex(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnableTransition(true));
    });
  };

  const handleTransitionEnd = () => {
    if (slideIndex === trendingCards.length && !isBackwardPrep.current) {
      resetToStart();
    }
  };

  const handleNext = () => {
    if (slideIndex >= trendingCards.length) return;
    setEnableTransition(true);
    setSlideIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (slideIndex === 0) {
      isBackwardPrep.current = true;
      setEnableTransition(false);
      setSlideIndex(trendingCards.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
          setSlideIndex(trendingCards.length - 1);
          isBackwardPrep.current = false;
        });
      });
      return;
    }

    setEnableTransition(true);
    setSlideIndex((prev) => prev - 1);
  };

  const renderEventCard = (card, index) => (
    <article
      key={`${card.title}-${card.date}-${index}`}
      className="group flex w-[calc((100%-10px)/2)] shrink-0 flex-col overflow-hidden border border-[#E0E0E0] bg-white"
    >
      <Link href="#" className="block w-full overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          title={card.title}
          width={1200}
          height={800}
          className="h-auto w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className="p-4 sm:p-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-montserrat text-[16px] font-medium xl:leading-[100%] tracking-normal text-[#144168] leading-[17px]">
            {card.title}
          </h3>
          <Link
            href="/awards-accolades"
            aria-label={`Read more about ${card.title}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#515151] text-[#144168] transition-colors hover:border-[#144168] hover:bg-[#f8f8f8]"
          >
            <i className="ri-arrow-right-up-line text-xl leading-none text-[#515151] hover:border-[#144168] hover:text-[#144168]" />
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <section className="w-full max-w-[1500px] bg-white px-0 mx-auto">
      <div className="mx-auto max-w-8xl px-5 py-[35px] lg:py-[70px] sm:px-8 lg:px-[75px]">
        <div className="mb-3 md:mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-full break-words font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[28px] md:text-[36px] font-[500] leading-[100%] tracking-normal capitalize text-[#111111] text-center md:text-left">
            What&apos;s Trending at manshagroup
          </h2>
          <div className="flex items-center justify-center gap-2 sm:justify-end">
            <button
              type="button"
              aria-label="Previous event"
              onClick={handlePrev}
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-[#9f9f9f] text-[14px] text-[#333333]"
            >
              <i className="ri-arrow-left-line" />
            </button>
            <button
              type="button"
              aria-label="Next event"
              onClick={handleNext}
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-[#9f9f9f] text-[14px] text-[#333333]"
            >
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <article className="flex min-h-[200px] flex-col border border-[#E3E3E3] bg-white p-3 xl:p-6 lg:p-4 md:p-6 sm:p-8 md:min-h-0">
            <h3 className="font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[20px] md:text-[28px] lg:text-[20px] xl:text-[28px] lg:leading-[25px] leading-[100%] font-[500] xl:leading-[100%] tracking-normal capitalize text-[#111111] md:leading-[30px]">
              Luxury Living By Mansha
            </h3>
            <p className="mt-2 xl:mt-4 lg:mt-1 flex-1 font-montserrat xl:text-[16px] lg:text-[14px] text-[14px] font-normal xl:leading-[28px] lg:leading-[20px] md:leading-[21px] md:text-[14px] leading-[20px] tracking-normal text-[#515151]">
            At Mansha Group, luxury is not just about aesthetics — it’s about creating experiences that elevate everyday living. From thoughtfully planned spaces to vibrant communities, every detail is designed to bring comfort, convenience, and a sense of belonging.

              {/* <Link
                href="#"
                className="inline font-montserrat text-[16px] font-semibold leading-[28px] tracking-normal text-[#144168] hover:underline"
              >
                Read More...
              </Link> */}
            </p>
          </article>

          <div className="overflow-hidden md:col-span-1 lg:col-span-2">
            <div
              className={`flex gap-[10px] transition-transform duration-700 ease-out ${
                enableTransition ? "" : "transition-none"
              }`}
              style={{
                transform: `translateX(calc(-${slideIndex} * (50% + 5px)))`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {loopCards.map((card, index) => renderEventCard(card, index))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manshagroup;
