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
    title: "The Benefits of Owning a Commercial Property in Faridabad (2026 Investment Guide)",
    points: [
      "The real estate game has changed significantly.",
      "And the smart investors are not interested in homes.",
      "But interested in commercial property in Faridabad.",
    ],
    image: "/aagman/aagman-slider2.jpg",
    slug: "benefits-of-owning-commercial-property-faridabad",
  },
  {
    id: 2,
    date: "Jan 6, 2026",
    title: "Everything You Need to Know About Mansha Heritage Sonipat",
    descriptionLead:
      "In today's market finding the best property in NCR means buying much more than just land; it is about securing a life ready for the future,",
    descriptionBody:
      "poised for growth and a location at the core of a rapidly developing future. This is precisely why projects in Sonipat are fast capturing the eye of many homebuyers and investors.",
    image: "/aagman/aagman-slider2.jpg",
    slug: "everything-you-need-to-know-mansha-heritage-sonipat",
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
                    <div className="relative h-[72px] w-[88px] shrink-0 overflow-hidden rounded-lg bg-[#f5f5f5]">
                      <Image
                        src="/blog/recent-blog.png"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="88px"
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
            <div className="flex flex-col gap-8 lg:gap-10">
              {filteredMainCards.map((card) => (
                <article
                  key={card.id}
                  className="grid gap-5 overflow-hidden rounded-xl border border-[#E6E6E6] bg-white p-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-6 md:p-3 lg:gap-8"
                >
                  <div className="relative aspect-[4/3]  w-full overflow-hidden rounded-lg bg-[#f0f0f0] md:aspect-auto ">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority={card.id === 1}
                    />
                  </div>

                  <div className="flex h-full min-h-0 flex-col px-1 pb-2 pt-1 md:px-2 md:py-4 lg:pr-6">
                    <time
                      dateTime="2026-01-06"
                      className="font-montserrat text-[18px] font-semibold capitalize leading-[29px] tracking-[0] text-[#00000066]"
                    >
                      {card.date}
                    </time>
                    <h3 className="mt-3 line-clamp-2 min-w-0 font-montserrat text-[15px] xl:text-[20px] font-semibold capitalize leading-[20px] xl:leading-[29px] tracking-[0] text-[#111111] max-w-[350px]">
                      {card.title}
                    </h3>
                    {Array.isArray(card.points) ? (
                      <ul className="mt-3 list-disc space-y-1 pl-5 font-montserrat text-[14px] font-normal capitalize leading-[22px] tracking-[0] text-[#515151]">
                        {card.points.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    ) : card.descriptionLead ? (
                      <div className="mt-3 min-w-0 max-w-[350px]">
                        <p className="font-montserrat text-[14px] font-normal capitalize leading-[22px] tracking-[0] text-[#515151]">
                          {card.descriptionLead}
                        </p>
                        {/* <p className="line-clamp-2 overflow-hidden font-montserrat text-[14px] font-normal capitalize leading-[22px] tracking-[0] text-[#515151]">
                          {card.descriptionBody}
                        </p> */}
                      </div>
                    ) : (
                      <p className="mt-3 font-montserrat text-[14px] font-normal capitalize leading-[22px] tracking-[0] text-[#515151] line-clamp-4">
                        {card.excerpt}
                      </p>
                    )}
                    {card.slug ? (
                      <Link
                        href={`/blog/${card.slug}`}
                        className="mt-5 inline-flex w-fit shrink-0 items-center gap-1 self-start font-montserrat text-[14px] font-medium capitalize leading-[100%] tracking-[0] text-[#652A27] transition-opacity md:mt-6"
                      >
                        Read More
                        <span aria-hidden className="text-[16px] leading-none">
                          <i className="ri-arrow-right-line" aria-hidden />
                        </span>
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="mt-5 inline-flex w-fit shrink-0 items-center gap-1 self-start font-montserrat text-[14px] font-medium capitalize leading-[100%] tracking-[0] text-[#652A27] transition-opacity md:mt-6"
                      >
                        Read More
                        <span aria-hidden className="text-[16px] leading-none">
                          <i className="ri-arrow-right-line" aria-hidden />
                        </span>
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
