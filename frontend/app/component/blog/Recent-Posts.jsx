"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const SIDEBAR_POSTS = [
  {
    id: 1,
    title: "Why Is Ghaziabad Becoming the Ultimate Investment Hub?",
    date: "April 18, 2026",
  },
  {
    id: 2,
    title: "Why Is Ghaziabad Becoming the Ultimate Investment Hub?",
    date: "April 12, 2026",
  },
  {
    id: 3,
    title: "Why Is Ghaziabad Becoming the Ultimate Investment Hub?",
    date: "April 8, 2026",
  },
  {
    id: 4,
    title: "Why Is Ghaziabad Becoming the Ultimate Investment Hub?",
    date: "March 28, 2026",
  },
];

const MAIN_CARDS = [
  {
    id: 1,
    date: "Jan 6, 2026",
    title: "Top 5 Locations to Buy Residential Plots in Faridabad – Mansha Group Perspective",
    descriptionLead:
      "As a result of its ever-developing infrastructure and easy accessibility through expressways and the ever-expanding metro, Faridabad is becoming a hotspot for real-estate investments  within the NCR region. It holds great potential for investments with a high return on investment. However, the location chosen for investing in a residential plot within Farida",
    image: "/aagman/aagman-slider2.jpg",
    slug: "top-5-locations-to-buy-residential-plots-in-faridabad",
  },
  {
    id: 2,
    date: "Jan 6, 2026",
    title: "Mansha Vega Street: A Smart Commercial Investment Opportunity in Faridabad",
    descriptionLead:
      "Faridabad Is Growing Fast &  The Smart Investors Already Know It A few years ago, most NCR investors looked only at Gurgaon or Noida for commercial real estate. But in 2026, the conversation is changing rapidly. Faridabad is emerging as one of the most promising real estate destinations in NCR  and investors are moving early.",

    image: "/aagman/aagman-slider2.jpg",
    slug: "Buy Residential Plots for Sale in Sonipat",
  },
];

const RecentPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMainCards = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return MAIN_CARDS;
    return MAIN_CARDS.filter((card) => card.title.toLowerCase().includes(query));
  }, [searchQuery]);

  const filteredSidebarPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return SIDEBAR_POSTS;
    return SIDEBAR_POSTS.filter((post) => post.title.toLowerCase().includes(query));
  }, [searchQuery]);

  return (
    <section className="w-full bg-white pb-[35px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <div className="mb-8 flex w-full justify-center lg:mb-10">
          <div className="w-[700px] max-w-full">
            <label className="relative block w-full">
              <span className="sr-only">Search blog</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search..."
                className="w-full rounded-full border border-[#E0E0E0] bg-[#FAFAFA] py-3 pl-5 pr-12 font-montserrat text-[14px] font-normal text-[#333333] outline-none transition-[border-color,box-shadow] placeholder:text-[#999999] focus:border-[#652A27]/30 focus:ring-2 focus:ring-[#652A27]/15"
              />
              <i
                className="ri-search-line pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px] text-[#515151]"
                aria-hidden
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12 xl:gap-20">
          {/* Left — Recent Posts */}
          <div className="w-full shrink-0 lg:max-w-[320px] xl:max-w-[340px]">
            <aside className="w-full">
            <h2 className="font-optima text-[28px] font-[500] capitalize leading-[100%] tracking-[0] text-[#111111]">
              Recent Posts
            </h2>
            <div
              className="mt-3 h-px w-full bg-[#111111]/20"
              aria-hidden
            />

            <ul className="mt-8 flex flex-col gap-6">
              {filteredSidebarPosts.map((post) => (
                <li key={post.id}>
                  <a
                    href="#"
                    className="group flex gap-3 outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#652A27]/40 focus-visible:ring-offset-2"
                  >
                    <div className="relative h-[88px] w-[108px] shrink-0 overflow-hidden rounded-lg bg-[#f5f5f5]">
                      <Image
                        src="/blog/recent-blog.png"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="108px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-montserrat text-[14px] font-medium capitalize leading-[20px] tracking-[0] text-[#515151] line-clamp-2">
                        {post.title}
                      </p>
                      <p className="mt-1 font-montserrat text-[13px] font-medium capitalize leading-[19px] tracking-[0] text-[#00000066]">
                        {post.date}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            </aside>
          </div>

          {/* Right — blog cards */}
          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-1 lg:gap-10">
              {filteredMainCards.map((card) => (
                <article
                  key={card.id}
                  className="grid w-full grid-cols-1 items-stretch gap-4 overflow-hidden rounded-xl border border-[#E6E6E6] bg-white p-2.5 md:gap-4 lg:gap-[30px] xl:grid-cols-[390px_1fr] xl:items-center xl:gap-[30px]"
                >
                  <div className="relative h-auto w-full overflow-hidden rounded-lg md:h-[200px] lg:h-[337px] lg:w-full xl:h-[337px] xl:w-[390px]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={580}
                      height={300}
                      className="h-auto w-full object-cover md:h-[200px] lg:h-[337px] lg:w-full lg:object-cover xl:h-[337px] xl:w-[390px] xl:object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 390px"
                      priority={card.id === 1}
                    />
                  </div>

                  <div className="flex h-auto min-w-0 flex-col justify-start py-1 max-md:px-2 md:px-2 md:pb-2 lg:px-2 lg:pb-2 xl:h-[337px] xl:px-0 xl:pb-0 xl:pr-6">
                    <p className="font-montserrat text-[15px] font-semibold capitalize leading-[24px] tracking-normal text-[#00000066]">
                      {card.date}
                    </p>
                    <h3 className="mt-1.5 line-clamp-2 overflow-hidden min-w-0 font-montserrat text-[16px] font-semibold capitalize leading-[23px] tracking-normal text-[#111111] md:text-[15px] md:leading-[22px] lg:mt-5 lg:line-clamp-3 lg:text-[20px] lg:leading-[26px]">
                      {card.title}
                    </h3>
                    {Array.isArray(card.points) ? (
                      <ul className="mt-1.5 list-disc space-y-0.5 pl-5 font-montserrat text-[14px] font-normal capitalize leading-[20px] tracking-normal text-[#151515] md:mt-5">
                        {card.points.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="line-clamp-1 min-w-0 max-w-[350px] overflow-hidden"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : card.descriptionLead ? (
                      <p className="mt-1.5 line-clamp-2 min-w-0 font-montserrat text-[14px] font-normal leading-[20px] tracking-normal text-[#151515] md:line-clamp-3 lg:mt-2 xl:mt-5 lg:line-clamp-4 xl:line-clamp-4">
                        {card.descriptionLead}
                        <span aria-hidden="true">...</span>
                      </p>
                    ) : card.excerpt ? (
                      <p className="mt-1.5 line-clamp-4 min-w-0 font-montserrat text-[14px] font-normal leading-[20px] tracking-normal text-[#151515] md:mt-5">
                        {card.excerpt}
                      </p>
                    ) : null}
                    {card.slug ? (
                      <Link
                        href={`/blog/${card.slug}`}
                        className="mt-2 inline-flex w-fit items-center gap-1 pt-3 font-montserrat text-[14px] font-medium capitalize leading-[100%] tracking-normal text-[#652A27] md:mt-3 lg:mt-4 xl:mt-auto"
                      >
                        Read More
                        <i className="ri-arrow-right-line text-[22px]" aria-hidden />
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="mt-2 inline-flex w-fit items-center gap-1 pt-3 font-montserrat text-[14px] font-medium capitalize leading-[100%] tracking-normal text-[#652A27] md:mt-3 lg:mt-4 xl:mt-auto"
                      >
                        Read More
                        <i className="ri-arrow-right-line text-[22px]" aria-hidden />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
