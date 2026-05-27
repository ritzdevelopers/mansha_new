"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookASite from "../common/Book-a-site";

const Vegas = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [bookSiteOpen, setBookSiteOpen] = useState(false);

  const rightImages = [
    {
      src: "/mansha-image/mansha-vega-streetsection.jpg",
      alt: "Residential property",
      label: "Mansha Vega Street",
      href: "/vega-street",
    },
    {
      src: "/mansha-image/mansha-aagman.jpg",
      alt: "Facility area",
      label: "Aagman By Mansha",
      href: "/aagman-by-mansha",
    },
    {
      src: "/mansha-image/mansha-oasis.jpg",
      alt: "Mansha project exterior",
      label: "Mansha Oasis",
      href: "/mansha-oasis",
    },
  ];

  return (
    <section className="w-full bg-white px-0 max-w-[1500px] mx-auto">
      <div className="mx-auto max-w-8xl px-5 py-[35px] lg:py-[70px] sm:px-8 lg:px-[75px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1.9fr]">
          <div className="bg-[#f7f7f7] md:p-5 lg:p-5 p-3 border border-[#E0E0E0]">
            <Image
              src="/mansha-image/aagman-logo.png"
              alt="Aagman by Mansha logo"
              width={76}
              height={76}
              className="h-auto w-[76px]"
            />

            <h3 className="xl:mt-4 mt-2 text-left font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] md:text-[28px] text-[24px] font-normal leading-[100%] tracking-normal text-[#000000]">
              Vegas Street
            </h3>
            <p className="md:mt-5 xl:mt-5 lg:mt-3 mt-4 inline-block bg-white  font-['Open_Sans','Open Sans',sans-serif] md:text-[18px] text-[16px] font-normal leading-[26px] tracking-normal text-[#000000] rounded-full md:px-4 md:py-2 px-3 py-1">
            Project Overview
            </p>

            <div className="md:mt-6 xl:mt-5 lg:mt-3 mt-4 xl:space-y-2 lg:space-y-2 md:space-y-4 space-y-2 font-['Open_Sans','Open Sans',sans-serif] xl:text-[16px] lg:text-[14px] md:text-[18px] text-[14px] font-normal xl:leading-[24px] leading-[18px] tracking-normal text-[#000000]">
              <p className="flex items-center gap-2">
                <Image
                  src="/mansha-svg/location-icon.svg"
                  alt="Location icon"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                 Sector 82, Faridabad
                 Situated in the commercial hub of Greater Faridabad
              </p>
              <p className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-black"></i>
                RERA NUMBER: 275/2021
              </p>
              <p className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-black"></i>Status: Now Fully Operational              </p>
              
            </div>

            <div className="xl:mt-8 mt-4 md:mt-6 flex flex-wrap items-end justify-between xl:gap-4 gap-2 border-l-2 border-[#d0d0d0] xl:pl-4 pl-2">
              <div>
                <p className="font-montserrat text-[16px] font-normal leading-[29px] tracking-normal text-[#000000]">
                Price starting from- 
                </p>
                <p className="font-montserrat text-[24px] font-bold leading-[29px] tracking-normal text-[#000000]">
                  01.52 CR*
                </p>
              </div>
              <button
  type="button"
  onClick={() => setBookSiteOpen(true)}
  className="group relative cursor-pointer inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#6d2b2b] xl:px-6 xl:py-3 px-4 py-2 font-montserrat text-[12px] font-semibold text-[#6d2b2b] transition-colors duration-300 md:text-[16px] mt-2 md:mt-0"
>
  {/* Background Animation */}
  <span className="absolute inset-0 -translate-x-full bg-[#6d2b2b] transition-transform duration-300 group-hover:translate-x-0"></span>

  {/* Content */}
  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
    Book A Site Visit!

    <i className="ri-arrow-right-line transition-all duration-300 group-hover:translate-x-2 group-hover:text-white"></i>
  </span>
</button>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:min-h-[420px]">
            {rightImages.map((item, index) => (
              <Link
                key={`${item.src}-${index}`}
                href={item.href}
                onMouseEnter={() => setActiveImage(index)}
                className={`relative min-h-[220px] cursor-pointer overflow-hidden transition-all duration-500 sm:min-h-[320px] lg:min-h-[420px] ${
                  activeImage === index ? "flex-1 lg:flex-[2.2]" : "flex-1"
                }`}
              >
                <Image src={item.src} alt={item.alt} fill className="object-cover" />
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    activeImage === index ? "bg-black/20" : "bg-black/45"
                  }`}
                />

                {activeImage === index && (
                  <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/95">
                    <Image
                      src="/mansha-svg/rotate-arrow.svg"
                      alt="Open"
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                  </div>
                )}

                {activeImage === index ? (
                  <p className="absolute bottom-4 left-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] lg:text-[24px] md:text-[20px] text-[18px] font-[500] leading-[100%] tracking-normal capitalize text-[#fff]">
                    {item.label}
                  </p>
                ) : (
                  <p className="absolute bottom-4 right-3 [writing-mode:vertical-rl] rotate-180 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] lg:text-[24px] md:text-[20px] text-[18px] font-[500] leading-[100%] tracking-normal capitalize text-[#fff]">
                    {item.label}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BookASite open={bookSiteOpen} onClose={() => setBookSiteOpen(false)} />
    </section>
  );
};

export default Vegas;