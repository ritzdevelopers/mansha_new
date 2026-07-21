"use client";

import Link from "next/link";
import { saveHomeScrollPosition } from "../common/homeScroll";
import { trendingLocations } from "../event/eventData";

const eventPillClassName =
  "inline-flex rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-5 py-2.5 font-montserrat text-[14px] font-medium text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#652A27] hover:bg-[#652A27] hover:text-white hover:shadow-[0_6px_16px_rgba(101,42,39,0.2)]";

const Manshagroup = () => {
  const handleEventNav = () => {
    saveHomeScrollPosition();
  };

  return (
    <section id="trending" className="w-full max-w-[1500px] bg-white px-0 mx-auto">
      <div className="mx-auto max-w-8xl px-5 py-[35px] lg:py-[70px] sm:px-8 lg:px-[75px]">
        <h2 className="mb-3 md:mb-8 max-w-full break-words font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[28px] md:text-[36px] font-[500] leading-[100%] tracking-normal capitalize text-[#111111] text-center md:text-left">
          What&apos;s Trending at manshagroup
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6">
          {trendingLocations.map((location) => (
            <article
              key={location.slug}
              className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden border border-[#E8E8E8] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:border-[#111111]/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] sm:p-8"
            >
              <span className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[#F7F7F7] transition-transform duration-500 group-hover:scale-110" />

              <div className="relative z-10">
                <p className="font-montserrat text-[11px] font-medium uppercase tracking-[0.24em] text-[#666666]">
                  Location
                </p>
                <Link
                  href={`/event/${location.slug}`}
                  onClick={handleEventNav}
                  className="mt-3 block font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[32px] font-[500] leading-[100%] tracking-normal text-[#111111] transition-colors hover:text-[#652A27] md:text-[36px]"
                >
                  {location.title}
                </Link>
                <p className="mt-3 max-w-[320px] font-montserrat text-[14px] font-normal leading-[22px] text-[#333333]">
                  {location.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {location.events.map((event) => (
                    <Link
                      key={event.slug}
                      href={`/event/${location.slug}?event=${event.slug}`}
                      onClick={handleEventNav}
                      className={eventPillClassName}
                    >
                      {event.cardLabel ?? event.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-8 flex items-center justify-between border-t border-[#F0F0F0] pt-5">
                <Link
                  href={`/event/${location.slug}`}
                  onClick={handleEventNav}
                  className="font-montserrat text-[13px] font-medium text-[#111111] transition-colors hover:text-[#652A27]"
                >
                  Explore events
                </Link>
                <Link
                  href={`/event/${location.slug}`}
                  onClick={handleEventNav}
                  aria-label={`View events in ${location.title}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111111] text-[#111111] transition-all duration-300 hover:border-[#652A27] hover:bg-[#652A27] hover:text-white"
                >
                  <i className="ri-arrow-right-up-line text-lg leading-none" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manshagroup;
