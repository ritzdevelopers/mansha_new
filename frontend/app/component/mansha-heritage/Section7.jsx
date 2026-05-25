"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const Section7 = () => {
  const gridRef = useRef(null);
  const images = [
    { src: "/mansha-image/galleryimage-1.jpg", alt: "Gallery image one" },
    { src: "/mansha-image/gallery-image-2.jpg", alt: "Gallery image two" },
    { src: "/mansha-image/gallery-image-3.jpg", alt: "Gallery image three" },
    { src: "/mansha-image/gallery-image-4.jpg", alt: "Gallery image four" },
    { src: "/mansha-image/gallery-image-5.jpg", alt: "Gallery image five" },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [modalSwiper, setModalSwiper] = useState(null);

  const openModal = (index) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);
  const showNext = () => modalSwiper?.slideNext();
  const showPrev = () => modalSwiper?.slidePrev();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-card",
        { autoAlpha: 0, y: 45 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.16,
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full  pb-[35px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <h2 className="font-optima text-[28px] font-medium leading-[100%] tracking-[0] capitalize text-[#111111] md:text-[32px] lg:text-[36px] text-center md:text-left">
          Gallery
        </h2>

        <div ref={gridRef} className="md:mt-4 mt-0 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:gap-7">
          <article className="gallery-card border border-[#E6E6E6] bg-white p-4">
            <h3 className="font-optima text-[24px] font-medium leading-[25px] lg:leading-[100%] tracking-[0] capitalize text-black lg:text-[28px] ">
            Frames Of Elegance
            </h3>
            <p className="mt-4 font-montserrat text-[16px] font-normal md:leading-[25px] lg:leading-[28px] tracking-[0] text-[#00000099]">
            A visual journey through beautifully curated spaces and modern design.
 Where sophistication blends seamlessly with comfort and serenity.
 Every detail reflects a lifestyle thoughtfully envisioned.
 Crafted to inspire timeless living experiences every day.


            </p>
          </article>

          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => openModal(index)}
              className="gallery-card relative h-[200px] cursor-pointer overflow-hidden text-left sm:h-[230px] lg:h-[250px]"
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
            <Swiper
              loop
              speed={500}
              slidesPerView={1}
              initialSlide={activeIndex}
              onSwiper={setModalSwiper}
              className="h-full w-full"
            >
              {images.map((image) => (
                <SwiperSlide key={image.src}>
                  <div className="relative h-full w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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

export default Section7;
