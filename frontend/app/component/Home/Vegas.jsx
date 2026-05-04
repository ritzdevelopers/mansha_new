"use client";

import Image from "next/image";
import { useState } from "react";

const Vegas = () => {
  const [activeImage, setActiveImage] = useState(0);

  const rightImages = [
    {
      src: "/mansha-image/residentail.jpg",
      alt: "Residential property",
      label: "Vega Street",
    },
    {
      src: "/mansha-image/facility-image.jpg",
      alt: "Facility area",
      label: "Aagman By Mansha",
    },
    {
      src: "/mansha-image/residentail.jpg",
      alt: "Mansha project exterior",
      label: "Mansha Oasis",
    },
  ];

  return (
    <section className="w-full bg-white px-0 max-w-[1500px] mx-auto">
      <div className="mx-auto max-w-8xl px-5 py-[35px] lg:py-[70px] sm:px-8 lg:px-[75px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1.9fr]">
          <div className="bg-[#f7f7f7] md:p-10 p-5 border border-[#E0E0E0]">
            <Image
              src="/mansha-image/aagman-logo.png"
              alt="Aagman by Mansha logo"
              width={76}
              height={76}
              className="h-auto w-[76px]"
            />

            <h3 className="mt-4 text-left font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[28px] font-normal leading-[100%] tracking-normal text-[#000000]">
              Vegas Street
            </h3>
            <p className="md:mt-7 mt-4 inline-block bg-white  font-['Open_Sans','Open Sans',sans-serif] text-[18px] font-normal leading-[26px] tracking-normal text-[#000000] rounded-full px-4 py-2">
              3/4 BHK Residences
            </p>

            <div className="md:mt-10 mt-4 space-y-2 font-['Open_Sans','Open Sans',sans-serif] text-[16px] font-normal leading-[24px] tracking-normal text-[#000000]">
              <p className="flex items-center gap-2">
                <Image
                  src="/mansha-svg/location-icon.svg"
                  alt="Location icon"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                Sector-10, Greater Noida (W)
              </p>
              <p className="flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-black"></i>
                RERA NUMBER: UPRERAPRJ503189
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-l-2 border-[#d0d0d0] pl-4">
              <div>
                <p className="font-montserrat text-[16px] font-normal leading-[29px] tracking-normal text-[#000000]">
                  Start From
                </p>
                <p className="font-montserrat text-[24px] font-bold leading-[29px] tracking-normal text-[#000000]">
                  01.52 CR*
                </p>
              </div>
              <button
  type="button"
  className="inline-flex items-center gap-2 bg-[#6d2b2b] px-6 py-4 font-montserrat text-[12px] md:text-[16px] font-semibold leading-[100%] tracking-normal text-white rounded-full cursor-pointer"
>
  Book A Site Visit!
  <i class="ri-arrow-right-line"></i>
</button>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:min-h-[420px]">
            {rightImages.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                onMouseEnter={() => setActiveImage(index)}
                onClick={() => setActiveImage(index)}
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
                  <p className="absolute bottom-4 left-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[24px] font-[500] leading-[100%] tracking-normal capitalize text-[#fff]">
                    {item.label}
                  </p>
                ) : (
                  <p className="absolute bottom-4 right-3 [writing-mode:vertical-rl] rotate-180 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[24px] font-[500] leading-[100%] tracking-normal capitalize text-[#fff]">
                    {item.label}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vegas;