"use client";
import Image from "next/image";
import React from "react";

const Mansha = () => {
  return (
    <section className="w-full bg-white mx-auto max-w-[1500px]">
      <div className="mx-auto flex max-w-8xl flex-col gap-6 px-5 py-[35px] sm:px-8 lg:flex-row lg:items-start lg:gap-[130px] lg:px-[75px] lg:py-[75px]">
        
        {/* Left Button */}
        <div className="shrink-0 mt-0 lg:mt-4">
          <button className="rounded-full border border-[#F1CD9C] bg-[#FCE0BA] px-6 py-2 font-montserrat text-[14px] font-medium capitalize leading-[100%] tracking-normal text-[#333333]">
            About
          </button>
        </div>

        {/* Right Content */}
        <div className="max-w-[1100px]">
          <h2 className="font-montserrat text-[17px] font-[400] md:font-[600] lg:leading-[38px] md:leading-[30px] tracking-normal text-black lg:text-[24px] md:text-[20px] leading-[25px]">
          At Mansha Group, we are proud to be one of the fastest-growing{" "}
            <span className="text-black/40">
            real estate developers in Faridabad, driven by a strong commitment to quality, innovation, and customer satisfaction.
            </span>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-8xl px-5 pb-[35px] sm:px-8 lg:px-[75px] lg:pb-[75px] mt-0 lg:mt-12">
        <div className="hidden w-full items-start justify-between gap-[20px] md:flex lg:hidden">
          <div className="w-full flex-1 overflow-hidden md:h-[280px]">
            <Image
              src="/mansha-image/building-about.jpg"
              alt="Building about"
              width={280}
              height={170}
              className="h-auto w-full object-cover md:h-full"
            />
          </div>
          <div className="w-full flex-1 overflow-hidden md:h-[280px]">
            <Image
              src="/mansha-image/villa-about.jpg"
              alt="Villa about"
              width={280}
              height={170}
              className="h-auto w-full object-cover md:h-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-[10px] md:gap-[20px] lg:gap-[20px] xl:gap-[120px] lg:flex-row lg:items-start">
          <div className="order-1 mx-auto w-full max-w-[330] overflow-hidden md:hidden lg:order-none lg:mx-0 lg:mt-[60px] lg:block lg:self-end">
            <Image
              src="/mansha-image/building-about.jpg"
              alt="Building about"
              width={280}
              height={170}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="order-3 mt-2 md:mt-5 w-full max-w-[450px] text-center md:max-w-full md:text-left lg:order-none lg:mt-0 lg:max-w-[450px]">
            <p className="font-montserrat text-[16px]  font-normal leading-[25px] md:leading-[28px] tracking-[0px] capitalize text-[#333333]">
            Our portfolio includes both residential and commercial properties, thoughtfully designed with a focus on modernity, comfort, and sustainability. We believe a home is more than just a place to live; it is a space where memories are made, which is why every project is crafted with attention to detail.
            What sets us apart is our commitment to timely delivery and reliability. We take pride in completing projects on schedule while consistently exceeding expectations.

            </p>

            <button
  className="group relative mx-auto mt-3 md:mt-6 inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[#652A27]/90 px-6 py-3 font-montserrat text-[16px] font-normal leading-[100%] tracking-[0%] text-[#652A27] transition-colors duration-300 md:mx-0"
>
  {/* Background Animation */}
  <span className="absolute inset-0 -translate-x-full bg-[#652A27] transition-transform duration-500 ease-out group-hover:translate-x-0"></span>

  {/* Content */}
  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
    Download Brochure

    <i
      className="ri-arrow-right-line text-[16px] transition-all duration-300 group-hover:translate-x-2 group-hover:text-white"
      aria-hidden
    />
  </span>
</button>
          </div>

          <div className="order-2 mx-auto w-full max-w-[320px] overflow-hidden md:hidden lg:order-none lg:mx-0 lg:-mt-[60px] lg:block lg:self-start">
            <Image
              src="/mansha-image/villa-about.jpg"
              alt="Villa about"
              width={280}
              height={170}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-5  md:mt-8 lg:mt-19 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border border-[#0000001A] bg-white px-6 py-6 text-center">
            <h3 className="number-shine font-optima text-[48px] font-bold leading-[100%] tracking-[0%] text-transparent">
              100+
            </h3>
            <p className="mt-3 font-optima text-[20px] font-[550] leading-[33px] tracking-[0%] capitalize text-[#00000099]">
              Verified Properties Sold
            </p>
          </div>

          <div className="border border-[#0000001A] bg-white px-6 py-6 text-center">
            <h3 className="number-shine font-optima text-[48px] font-bold leading-[100%] tracking-[0%] text-transparent">
              200+
            </h3>
            <p className="mt-3 font-optima text-[20px] font-[550] leading-[33px] tracking-[0%] capitalize text-[#00000099]">
              Professional Trusted Agents
            </p>
          </div>

          <div className="border border-[#0000001A] bg-white px-6 py-6 text-center">
            <h3 className="number-shine font-optima text-[48px] font-bold leading-[100%] tracking-[0%] text-transparent">
              98%
            </h3>
            <p className="mt-3 font-optima text-[20px] font-[550] leading-[33px] tracking-[0%] capitalize text-[#00000099]">
              Client Satisfaction Rate
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .number-shine {
          background-image: repeating-linear-gradient(
            110deg,
            #000000 0%,
            #000000 46%,
            #c49b64 46%,
            #c49b64 50%,
            #000000 50%,
            #000000 100%
          );
          background-size: 200% 100%;
          background-repeat: repeat;
          -webkit-background-clip: text;
          background-clip: text;
          animation: number-shine-move 5s linear infinite;
        }

        @keyframes number-shine-move {
          0%,
          20% {
            background-position: 0% 50%;
          }
          100% {
            background-position: -200% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default Mansha;