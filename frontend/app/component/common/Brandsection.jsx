"use client";

import Image from "next/image";
import React from "react";

const Brandsection = () => {
  return (
    <section className=" w-full pb-[35px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <div className="relative -mx-5 overflow-hidden sm:-mx-8 lg:-mx-[70px]">
          <Image
            src="/vega-street/brand-bg.jpg"
            alt="Brand section background"
            width={1400}
            height={380}
            className="h-[300px] w-full object-cover sm:h-[250px] lg:h-auto xl:h-[480px]"
            sizes="100vw"
          />
          {/* <div className="absolute inset-0 bg-[#00000066]" /> */}

          <div className="absolute inset-x-0 top-0 z-10 px-5 pt-6 sm:px-8 sm:pt-8 lg:px-[70px] lg:pt-16">
            <p className="max-w-[700px] text-center md:text-left font-montserrat text-[16px] font-semibold leading-[22px] md:leading-[24px] tracking-[0] text-white">
            A setting where refined tastes and distinguished labels quietly come together.Spaces that reflect elegance, presence, and a certain standard of living. An address for those who appreciate the finer side of everyday experiences.
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 sm:px-8 lg:px-[70px]">
            <div className="  xl:mt-[-200px] grid grid-cols-1 items-center gap-4 py-4 lg:grid-cols-[1fr_3fr] lg:gap-6">
              <p className="text-center font-montserrat text-[18px] font-semibold leading-[100%] tracking-[0] text-white lg:text-right">
                Brand Lists
              </p>

              <div className="relative w-full overflow-hidden border-y-[1px] border-l-[1px] border-[#ffffff33] ">
                <div className="brand-marquee-track flex w-max items-center gap-8 bg-black/25 py-0 lg:py-4 px-3 backdrop-blur-[2px] lg:gap-10">
                  <Image
                    src="/mansha-image/reliance.png"
                    alt="Reliance Smart"
                    width={170}
                    height={45}
                    className="h-auto w-[140px] sm:w-[160px]"
                  />
                  <Image
                    src="/mansha-image/reliance-digital.png"
                    alt="Reliance Digital"
                    width={170}
                    height={45}
                    className="h-auto w-[140px] sm:w-[160px]"
                  />
                  <Image
                    src="/mansha-image/bikaner.png"
                    alt="Bikanervala"
                    width={150}
                    height={45}
                    className="h-auto w-[120px] sm:w-[135px]"
                  />
                  <Image
                    src="/mansha-image/lenskart.png"
                    alt="Lenskart"
                    width={170}
                    height={45}
                    className="h-auto w-[130px] sm:w-[150px]"
                  />
                  <Image
                    src="/mansha-image/reliance.png"
                    alt="Reliance Smart repeat"
                    width={170}
                    height={45}
                    className="h-auto w-[140px] sm:w-[160px]"
                  />
                  <Image
                    src="/mansha-image/reliance-digital.png"
                    alt="Reliance Digital repeat"
                    width={170}
                    height={45}
                    className="h-auto w-[140px] sm:w-[160px]"
                  />
                  <Image
                    src="/mansha-image/bikaner.png"
                    alt="Bikanervala repeat"
                    width={150}
                    height={45}
                    className="h-auto w-[120px] sm:w-[135px]"
                  />
                  <Image
                    src="/mansha-image/lenskart.png"
                    alt="Lenskart repeat"
                    width={170}
                    height={45}
                    className="h-auto w-[130px] sm:w-[150px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .brand-marquee-track {
          animation: brand-marquee 18s linear infinite;
        }

        @keyframes brand-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Brandsection;