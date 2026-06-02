"use client";

import Image from "next/image";
import React, { useState } from "react";

const Gallery = () => {
  const images = [
    { src: "/vega-street/vegagallery1.jpg", alt: "Gallery image one" },
    { src: "/vega-street/vegagallery2.jpg", alt: "Gallery image two" },
    { src: "/vega-street/vegagallery3.jpg", alt: "Gallery image three" },
    { src: "/vega-street/vegagallery4.jpg", alt: "Gallery image four" },
    { src: "/vega-street/vegagallery5.jpg", alt: "Gallery image five" },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const openModal = (index) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);
  const showNext = () =>
    setActiveIndex((prev) => (prev + 1) % images.length);
  const showPrev = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="w-full  pb-[35px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <h2 className="font-optima text-[28px] font-medium leading-[100%] tracking-[0] capitalize text-[#111111] md:text-[32px] lg:text-[36px] text-center md:text-left">
          Gallery
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:gap-5">
          <article className="border border-[#E6E6E6] bg-white p-4">
            <h3 className="font-optima text-[24px] font-medium leading-[25px] lg:leading-[100%] tracking-[0] capitalize text-black lg:text-[28px] ">
            Prime Commercial Hub Faridabad 
            </h3>
            <p className="mt-4 lg:mt-4 font-montserrat text-[16px] font-normal md:leading-[25px] lg:leading-[28px] tracking-[0] text-[#00000099]">
            At the heart of Faridabad’s evolving commercial landscape, where energy and opportunity converge. A destination shaped by growing footfall, vibrant surroundings, and urban momentum. Where business, lifestyle, and a thriving city come together seamlessly.
            </p>
          </article>

          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => openModal(index)}
              className="relative h-[200px] cursor-pointer overflow-hidden text-left sm:h-[230px] lg:h-[250px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-4 top-4 z-[60] flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-[20px] leading-none text-white max-md:right-2 max-md:top-2 max-md:h-8 max-md:w-8 max-md:text-[14px]"
            aria-label="Close gallery popup"
          >
            <i className="ri-close-line"  />
          </button>

          <button
            type="button"
            onClick={showPrev}
            className="absolute left-4 top-1/2 z-[60] flex h-15 w-15 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-[20px] leading-none text-white max-md:left-2 max-md:h-8 max-md:w-8 max-md:text-[14px]"
            aria-label="Previous image"
          >
            <i className="ri-arrow-left-s-line" />
          </button>

          <div className="relative z-10 h-[70vh] w-full max-w-5xl">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 top-1/2 z-[60] flex h-15 w-15 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-[20px] leading-none text-white max-md:right-2 max-md:h-8 max-md:w-8 max-md:text-[14px]"
            aria-label="Next image"
          >
            <i className="ri-arrow-right-s-line"  />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
