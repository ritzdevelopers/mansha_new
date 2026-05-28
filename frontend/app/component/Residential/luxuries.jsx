import Image from "next/image";
import React from "react";

const luxuryItems = [
  { icon: "/mansha-svg/clubhouse.svg", label: "Clubhouse" },
  { icon: "/mansha-svg/playarea.svg", label: "Kids’ Play Area" },
  { icon: "/mansha-svg/swimming.svg", label: "Swimming Pool" },
  { icon: "/mansha-svg/jogging.svg", label: "Jogging Track" },
  { icon: "/mansha-svg/facility.svg", label: "Lift Facility" },
];

const Luxuries = () => {
  return (
    <section className="w-full pb-[35px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1525px] ">
        <div className="relative overflow-hidden pb-3 sm:py-6 xl:py-14 lg:py-10">
          <Image
            src="/mansha-image/Luxuries.jpg"
            alt="Luxuries background"
            fill
            className=""
            sizes="100vw"
          />
          <div className=" xl:mt-10 md:mt-0 mt-0 relative z-10 mx-auto max-w-[1100px]">
            <h2 className="mx-auto max-w-[540px] text-center font-optima xl:text-[36px] md:text-[25px] text-[16px] font-[500] leading-[43px] capitalize text-[#000000]">
              Little luxuries that make every day special.
            </h2>

            <div className="xl:mt-16 lg:mt-5 mt-3 grid grid-cols-2 gap-0 text-center sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 lg:gap-0 xl:gap-6">
              {luxuryItems.map((item, idx) => (
                <div
                  key={item.label}
                  className={`flex flex-col items-center justify-start ${
                    idx === 4 ? "col-span-2 justify-self-center sm:col-span-1" : ""
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={52}
                    height={52}
                    className="h-[38px] w-[38px] object-contain md:h-[42px] md:w-[42px] lg:h-[52px] lg:w-[52px] xl:h-[80px] xl:w-[80px]"
                  />
                  <p className="mt-2 text-center font-optima text-[13px] font-[500] leading-[100%] capitalize text-[#000000] md:mt-3 md:text-[14px] lg:text-[16px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="md:mt-8 mt-3 flex justify-center">
              <div className="relative w-full max-w-[760px] overflow-hidden">
                <Image
                  src="/mansha-image/Experience.jpg"
                  alt="Experience all lifestyle amenities"
                  width={760}
                  height={360}
                  className="mx-auto block h-auto w-[300px] md:w-[40%] lg:w-full"
                  sizes="(max-width: 1024px) 100vw, 760px"
                />
                <span  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-white px-5 lg:py-4 py-2 md:py-2 text-center font-montserrat text-[8px] font-medium leading-[100%] text-[#333333] transition-colors hover:bg-[#fafafa] md:text-[10px] lg:text-[16px]">
                  Experience all lifestyle amenities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Luxuries;