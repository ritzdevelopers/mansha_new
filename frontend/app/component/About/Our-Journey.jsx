import Image from "next/image";
import React from "react";

const OurJourney = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1525px] ">
        <div className="relative overflow-hidden  py-[35px] lg:py-[70px] ">
          <Image
            src="/mansha-image/Journey.jpg"
            alt="Journey background"
            title="Journey background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0C2D12]/55" />

          <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[160px_1fr] lg:gap-x-8 lg:gap-y-4">
              <span className="inline-flex w-fit items-center rounded-full bg-[#3F8A3D] px-5 py-2 font-montserrat text-[14px] font-medium leading-[100%] text-white">
                Since 2006
              </span>
              <h2 className="font-optima text-[36px] font-normal leading-[100%] capitalize text-white">
                Our Journey
              </h2>
              <p className=" lg:mt-5 mt-0 font-montserrat text-[20px] font-semibold leading-[35px] capitalize lg:col-start-2">
                <span className="text-white">
                  At Mansha Group, we&apos;re more than just developers
                </span>{" "}
                <span className="text-[#FFFFFF99]">
                  we&apos;re creators of communities. Join us as we continue to transform Faridabad with spaces that are not just well-built but thoughtfully designed to enhance your life.
                </span>
              </p>
            </div>

            <div className="mt-8 space-y-8 lg:mt-15">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-8">
                <div className="relative overflow-hidden">
                  <Image
                    src="/mansha-image/Journey-1.jpg"
                    alt="Journey phase one"
                    title="Journey phase one"
                    width={860}
                    height={470}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
                <div className="border-t border-white/45 pt-5 lg:pt-6">
                  <h3 className="font-optima text-[44px] font-normal leading-[100%] text-white">
                    2006-2011
                  </h3>
                  <p className="mt-4 font-montserrat text-[32px] font-normal leading-[50px] capitalize text-white/90">
                    Mansha Greens, Mansha Residency, Mansha Estate, And Mansha Royal Farms Reflect A Legacy Of Thoughtful Development, Modern Infrastructure, And Quality Living.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-8">
                <div className="border-t border-white/45 pt-5 lg:pt-6 lg:order-1">
                  <h3 className="font-optima text-[44px] font-normal leading-[100%] text-white">
                    2011-2015
                  </h3>
                  <p className="mt-4 font-montserrat text-[32px] font-normal leading-[50px] capitalize text-white/90">
                    Mansha Model Town, Mansha City, Mansha Floors, And Mansha Luxury Floors Marked The Next Leap In Design, Comfort, And Community-Focused Urban Living.
                  </p>
                </div>
                <div className="relative overflow-hidden lg:order-2">
                  <Image
                    src="/mansha-image/Journey-2.jpg"
                    alt="Journey phase two"
                    title="Journey phase two"
                    width={860}
                    height={470}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;