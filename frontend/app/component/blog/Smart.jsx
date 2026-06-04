"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BLOG_POSTS } from "./blogPosts";

const SLIDER_CARDS = BLOG_POSTS;

const MOBILE_SLIDE_MS = 500;

const Smart = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [mobileTransition, setMobileTransition] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile || activeMobileIndex !== SLIDER_CARDS.length) return;

    const timeout = window.setTimeout(() => {
      setMobileTransition(false);
      setActiveMobileIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setMobileTransition(true));
      });
    }, MOBILE_SLIDE_MS);

    return () => window.clearTimeout(timeout);
  }, [activeMobileIndex, isMobile]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    let timer;

    const start = () => {
      window.clearInterval(timer);
      if (!mq.matches) return;
      timer = window.setInterval(() => {
        setActiveMobileIndex((prev) =>
          prev >= SLIDER_CARDS.length ? prev : prev + 1
        );
      }, 4000);
    };

    start();
    mq.addEventListener("change", start);
    return () => {
      window.clearInterval(timer);
      mq.removeEventListener("change", start);
    };
  }, []);
  

  return (
    <section
      className="w-full  border-[#00000033] bg-white bg-cover bg-center bg-no-repeat py-[35px] lg:py-[70px]"
      style={{ backgroundImage: "url('/media/Opportunities.png')" }}
    >
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <h2 className="font-optima text-[22px] max-w-[900px] font-semibold text-center md:text-left capitalize leading-[25px] tracking-normal text-[#111111] md:text-[22px] md:leading-[30px] lg:text-[30px] xl:text-[36px] lg:leading-[35px] md:mx-30 ">
        The Beginning Of Smarter Moves In Property And Better Living.
        </h2>

        <div className="lg:mt-18 mt-5 h-px w-full bg-gray-400 mx-30 xl:max-w-[1200px] lg:max-w-[800px] max-w-[430px] hidden md:block" aria-hidden />

        <div className="mt-5 flex items-center gap-3 md:mx-30 ">
          <span className="h-3 w-3 rounded-full bg-black" aria-hidden />
          <p className="font-montserrat text-[18px] font-medium capitalize leading-[100%] tracking-[0px] text-[#000000BD]">
          Featured Blog
          </p>
        </div>
      </div>
      <div className="cards-sldier mt-8 overflow-hidden border-y border-[#3C3C3C] bg-white py-5">
        <div
          className={`media-slider-track flex w-max gap-5 max-md:duration-500 max-md:ease-in-out ${
            mobileTransition ? "max-md:transition-transform" : "max-md:transition-none"
          }`}
          style={
            isMobile
              ? {
                  transform: `translateX(calc(7.5vw - ${activeMobileIndex} * (85vw + 1.25rem)))`,
                }
              : undefined
          }
        >
          {[...SLIDER_CARDS, ...SLIDER_CARDS].map((card, index) => (
            <article
              key={`${card.id}-${index}`}
              className={`grid w-[940px] shrink-0 grid-cols-[1fr_0.9fr] items-center gap-5 overflow-hidden rounded-xl border border-[#E6E6E6] bg-white p-2.5 max-lg:w-[740px] md:items-start lg:items-center lg:grid-cols-[390px_1fr] lg:gap-[30px] xl:grid-cols-[390px_1fr] xl:gap-[30px] max-md:w-[85vw] max-md:items-stretch max-md:grid-cols-1 ${
                index > SLIDER_CARDS.length ? "hidden md:grid" : ""
              }`}
            >
              <div className="relative h-auto overflow-hidden rounded-lg lg:h-[337px] lg:w-[390px] xl:h-[337px] xl:w-[390px]">
                <Image
                  src={card.image}
                  alt="Property event"
                  width={580}
                  height={300}
                  className="h-auto w-full object-cover md:h-auto md:object-contain md:object-center lg:h-[337px] lg:w-[390px] lg:object-cover xl:h-[337px] xl:w-[390px]"
                  sizes="(max-width: 768px) 85vw, 580px"
                />
              </div>

              <div className="flex h-auto min-w-0 flex-col justify-start py-1 max-md:px-2 md:h-auto md:py-0 md:pl-0 md:pr-6 lg:h-[337px]">
                <p className="font-montserrat text-[15px] font-semibold capitalize leading-[24px] tracking-normal text-[#00000066]">
                  {card.date}
                </p>
                <h3 className="mt-1.5 md:line-clamp-3 line-clamp-2 overflow-hidden min-w-0 font-montserrat text-[16px] md:text-[16px] lg:mt-5 lg:line-clamp-3 lg:text-[20px] font-semibold capitalize leading-[23px] md:leading-[24px] lg:leading-[26px] tracking-normal text-[#111111]">
                  {card.title}
                </h3>
                {Array.isArray(card.description) ? (
                  <ul className="mt-1.5 md:mt-5  list-disc space-y-0.5  font-montserrat text-[14px] font-normal capitalize leading-[20px] tracking-normal text-[#151515]">
                    {card.description.map((point, pointIndex) =>
                      typeof point === "object" && point?.lead ? (
                        <li
                          key={pointIndex}
                          className="line-clamp-1 min-w-0 max-w-[350px] overflow-hidden"
                        >
                          {point.lead}
                          <span aria-hidden="true">...</span>
                          <span className="sr-only"> {point.body}</span>
                        </li>
                      ) : (
                        <li
                          key={pointIndex}
                          className="line-clamp-1 min-w-0 max-w-[350px] overflow-hidden"
                        >
                          {point}
                        </li>
                      )
                    )}
                  </ul>
                ) : null}
                {card.descriptionLead ? (
                  <p className="mt-1.5 lg:mt-2 xl:mt-5 min-w-0 font-montserrat text-[14px] font-normal leading-[20px] tracking-normal text-[#151515] md:line-clamp-4 lg:line-clamp-4 xl:line-clamp-4 line-clamp-2">
                    {card.descriptionLead}
                    <span aria-hidden="true">...</span>
                    <span className="sr-only">{card.descriptionBody}</span>
                  </p>
                ) : null}
                <Link
                  href={`/blog/${card.slug}`}
                  className=" lg:mb-[20px] lg:mb-0 lg:mt-auto inline-flex w-fit items-center gap-1 pt-3 font-montserrat text-[14px] font-medium capitalize leading-[100%] tracking-normal text-[#652A27] mt-2"
                >
                  Read More
                  <i className="ri-arrow-right-line text-[22px]" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .media-slider-track {
            animation: media-card-slide 30s linear infinite;
          }

          .cards-sldier:hover .media-slider-track {
            animation-play-state: paused;
          }
        }

        @keyframes media-card-slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 16px));
          }
        }
      `}</style>
    </section>
  );
};

export default Smart;
