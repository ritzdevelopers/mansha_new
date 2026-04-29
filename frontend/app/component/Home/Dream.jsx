"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Dream = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Mobile: 1 card per view → 4 slides. Md (768–1023): 2 cards per view → 2 slides.
    const maxSteps = isMdScreen ? 2 : 4;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % maxSteps);
    }, 2500);

    return () => clearInterval(id);
  }, [isMdScreen]);

  useEffect(() => {
    setActiveSlide(0);
  }, [isMdScreen]);

  return (
    <>
      <div className="w-full bg-[#FFFFFF] mx-auto max-w-[1300px]" />
      <div className="mx-auto flex max-w-8xl flex-col items-center gap-[15px] px-5 py-[35px] text-center sm:px-8 md:items-start md:text-left lg:flex-row lg:items-center lg:gap-[0px] lg:justify-between lg:px-[75px] lg:py-[70px] 2xl:justify-center 2xl:gap-12">
      <div className="w-full shrink-0 lg:w-[28%] 2xl:w-auto">
  <h2 className="font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[22px] md:text-[28px] lg:text-[30px] xl:text-[36px] font-[400] not-italic leading-[37px] tracking-normal capitalize text-[#111111] whitespace-nowrap">
    Shaping Dreams <br className="hidden lg:block" /> Into Masterpieces
  </h2>
</div>
        <div className="w-full min-w-0 max-w-[800px]">
          <p className="font-['Montserrat',sans-serif] text-[14px] lg:text-[16px] font-normal not-italic leading-[25px] lg:leading-[25px] xl:leading-7 tracking-[0px] capitalize text-[#6b6b6b]">
            At Mansha Group, we are one of the fastest-growing real estate
            developers in Faridabad, built on a foundation of quality,
            innovation, and customer satisfaction. We develop thoughtfully
            designed residential and commercial spaces that reflect modern
            living, with a strong commitment to timely delivery and
            reliability.
          </p>
        </div>

        <div className="w-full shrink-0 lg:w-[20%] 2xl:w-auto">
        <div className="flex justify-center md:justify-start lg:justify-end 2xl:justify-start">
  <button className="group relative overflow-hidden inline-flex items-center gap-3 rounded-full border border-[#000000] px-3 py-[8px] font-['Montserrat',sans-serif] text-[14px] lg:text-[10px] xl:text-[14px] font-semibold leading-none capitalize text-[#333333] cursor-pointer transition-all duration-300 hover:text-white">

    {/* Background fill */}
    <span className="absolute left-0 top-0 h-full w-0 bg-[#333333] transition-all duration-500 group-hover:w-full"></span>

    {/* Text */}
    <span className="relative z-10 whitespace-nowrap">
  Discover Our Story
</span>

    {/* Arrow */}
    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-current transition-all duration-300 group-hover:text-black group-hover:translate-x-1 group-hover:border-white  group-hover:text-white">
    <i class="ri-arrow-right-up-line "></i>
</span>
  </button>
</div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden px-0 pt-[0px] pb-[0px] lg:hidden">
        <div
          className="flex transition-transform duration-700 ease-out md:gap-[10px]"
          style={{
            transform: `translateX(-${activeSlide * (isMdScreen ? 50 : 100)}%)`,
          }}
        >
          <article className="group relative min-h-[460px] w-full shrink-0 overflow-hidden cursor-pointer md:w-1/2">
            <Image
              src="/mansha-image/residentail.jpg"
              alt="residentail"
              fill
              className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-transparent" />
            <p className="absolute left-4 top-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[24px] font-[500] leading-none capitalize text-white">
              Residentail
            </p>
            <div className="absolute bottom-5 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="max-w-[390px] font-['Montserrat',sans-serif] text-[22px] font-[500] leading-[25px] capitalize text-white">
                Elegant living spaces designed for modern families.
              </p>
              <button className="mt-4 rounded-full bg-[#7B1E1E] px-4 py-2 font-['Montserrat',sans-serif] text-[14px] font-semibold leading-none capitalize text-white">
                Read More
              </button>
            </div>
          </article>

          <article className="group relative min-h-[460px] w-full shrink-0 overflow-hidden cursor-pointer md:w-1/2">
            <Image
              src="/mansha-image/residentail.jpg"
              alt="commerical"
              fill
              className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent" />
            <p className="absolute left-4 top-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[24px] font-[500] leading-none capitalize text-white">
              Commerical
            </p>
            <div className="absolute bottom-5 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="max-w-[390px] font-['Montserrat',sans-serif] text-[22px] font-[500] leading-[25px] capitalize text-white">
                Elegant living spaces designed for modern families.
              </p>
              <button className="mt-4 rounded-full bg-[#7B1E1E] px-4 py-2 font-['Montserrat',sans-serif] text-[14px] font-semibold leading-none capitalize text-white">
                Read More
              </button>
            </div>
          </article>

          <article className="group relative min-h-[460px] w-full shrink-0 overflow-hidden cursor-pointer md:w-1/2">
            <Image
              src="/mansha-image/residentail.jpg"
              alt="residentail"
              fill
              className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-transparent" />
            <p className="absolute left-4 top-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[24px] font-[500] leading-none capitalize text-white">
              Residential
            </p>
            <div className="absolute bottom-5 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="max-w-[390px] font-['Montserrat',sans-serif] text-[22px] font-[500] leading-[25px] capitalize text-white">
                Elegant living spaces designed for modern families.
              </p>
              <button className="mt-4 rounded-full bg-[#7B1E1E] px-4 py-2 font-['Montserrat',sans-serif] text-[14px] font-semibold leading-none capitalize text-white">
                Read More
              </button>
            </div>
          </article>

          <article className="group relative min-h-[460px] w-full shrink-0 overflow-hidden cursor-pointer md:w-1/2">
            <Image
              src="/mansha-image/residentail.jpg"
              alt="residentail"
              fill
              className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-transparent" />
            <p className="absolute left-4 top-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[24px] font-[550] leading-none capitalize text-white">
              Residential
            </p>
            <div className="absolute bottom-5 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="max-w-[390px] font-['Montserrat',sans-serif] text-[22px] font-[500] leading-[25px] capitalize text-white">
                Elegant living spaces designed for modern families.
              </p>
              <button className="mt-4 rounded-full bg-[#7B1E1E] px-4 py-2 font-['Montserrat',sans-serif] text-[14px] font-semibold leading-none capitalize text-white">
                Read More
              </button>
            </div>
          </article>
        </div>
      </div>

      <div className="hidden w-full max-w-none gap-3 px-0 pb-[35px] lg:flex lg:pb-[0px]">
        <article className="group relative hidden min-h-[420px] flex-1 overflow-hidden transition-all duration-500 lg:block lg:hover:flex-[1.7] cursor-pointer">
          <Image
            src="/mansha-image/residentail.jpg"
            alt="residentail"
            fill
            className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-transparent" />
          <p className="absolute left-4 top-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[24px] font-[500] leading-none capitalize text-white">
            Residential
          </p>
          <div className="absolute bottom-5 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="max-w-[390px] font-['Montserrat',sans-serif] text-[22px] font-[500] leading-[25px] capitalize text-white">
              Elegant living spaces designed for modern families.
            </p>
            <button className="mt-4 rounded-full bg-[#7B1E1E] px-4 py-2 font-['Montserrat',sans-serif] text-[14px] font-semibold leading-none capitalize text-white">
              Read More
            </button>
          </div>
        </article>

        <article className="group relative min-h-[460px] w-full overflow-hidden transition-all duration-500 lg:min-h-[520px] lg:flex-[1.7] lg:hover:flex-[1.7] cursor-pointer">
          <Image
            src="/mansha-image/residentail.jpg"
            alt="commerical"
            fill
            className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent" />
          <p className="absolute left-4 top-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[24px] font-[500] leading-none capitalize text-white">
            Commerical
          </p>
          <div className="absolute bottom-5 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="max-w-[390px] font-['Montserrat',sans-serif] text-[22px] font-[500] leading-[25px] capitalize text-white">
              Elegant living spaces designed for modern families.
            </p>
            <button className="mt-4 rounded-full bg-[#7B1E1E] px-4 py-2 font-['Montserrat',sans-serif] text-[14px] font-semibold leading-none capitalize text-white">
              Read More
            </button>
          </div>
        </article>

        <article className="group relative hidden min-h-[420px] flex-1 overflow-hidden transition-all duration-500 lg:block lg:hover:flex-[1.7] cursor-pointer">
          <Image
            src="/mansha-image/residentail.jpg"
            alt="residentail"
            fill
            className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-transparent" />
          <p className="absolute left-4 top-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[24px] font-[500] leading-none capitalize text-white">
            Residential
          </p>
          <div className="absolute bottom-5 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="max-w-[390px] font-['Montserrat',sans-serif] text-[22px] font-[500] leading-[25px] capitalize text-white">
              Elegant living spaces designed for modern families.
            </p>
            <button className="mt-4 rounded-full bg-[#7B1E1E] px-4 py-2 font-['Montserrat',sans-serif] text-[14px] font-semibold leading-none capitalize text-white">
              Read More
            </button>
          </div>
        </article>

        <article className="group relative hidden min-h-[420px] flex-1 overflow-hidden transition-all duration-500 lg:block lg:hover:flex-[1.7] cursor-pointer">
          <Image
            src="/mansha-image/residentail.jpg"
            alt="residentail"
            fill
            className="object-cover object-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-transparent" />
          <p className="absolute left-4 top-4 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[24px] font-[500] leading-none capitalize text-white">
            Residential
          </p>
          <div className="absolute bottom-5 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="max-w-[390px] font-['Montserrat',sans-serif] text-[22px] font-[500] leading-[25px] capitalize text-white">
              Elegant living spaces designed for modern families.
            </p>
            <button className="mt-4 rounded-full bg-[#7B1E1E] px-4 py-2 font-['Montserrat',sans-serif] text-[14px] font-semibold leading-none capitalize text-white">
              Read More
            </button>
          </div>
        </article>
      </div>
    </>
  );
};
export default Dream;