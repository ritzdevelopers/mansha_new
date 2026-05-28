import Image from "next/image";
import React from "react";

const Workplace = () => {
  return (
    <section className="w-full pb-[35px] lg:py-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px] rounded-[34px]">
        <div className="relative overflow-hidden  rounded-[10px] md:rounded-[34px]">
          <Image
            src="/mansha-image/Workplace.jpg"
            alt="Workplace"
            width={1400}
            height={260}
            className="h-[100px] w-full object-cover md:h-auto"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(6, 17, 26, 0.89) 0%, rgba(24, 7, 6, 0.27) 100%)",
            }}
          />

          <div className="absolute inset-0 flex translate-y-[30px] flex-col items-start justify-end gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-6 md:px-10">
            <div className=" mt-5 xl:max-w-[520px] w-full rounded-[18px]  px-0 py-5 md:px-0 backdrop lg:px-8 md:py-7">
              <h2 className="font-optima text-[13px] font-bold leading-normal capitalize text-white md:text-[18px] xl:text-[42px] md:leading-[20px] lg:text-[25px] xl:leading-[45px]">
                Create The Workplace You&apos;ve Always Imagined
              </h2>
              <p className="xl:mt-8 lg:mt-5 md:mt-2 mt-2 font-montserrat text-[12px] lg:text-[16px] font-normal leading-[100%] capitalize text-white">
                Strategically located in the thriving commercial hub
              </p>
            </div>

            <button
              type="button"
              className="group relative isolate mt-2 hidden -translate-y-[30px] shrink-0 cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-white px-2 py-3 font-montserrat text-[12px] font-normal leading-[100%] transition-colors duration-300 hover:bg-[#652A27] md:mt-28 md:inline-flex md:px-6 md:py-4 md:text-[20px]"
             >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-0 h-full w-full origin-left translate-x-[-101%] rounded-full bg-[#652A27] transition-transform duration-300 ease-out group-hover:translate-x-0"
              />
              <span className="relative z-10 flex items-center gap-1 text-[#652A27] transition-colors duration-300 group-hover:text-white ">
                Book Your Visit Today
                <i className="ri-arrow-right-line text-[22px] transition-all duration-300 group-hover:translate-x-1.5" />
              </span>
            </button>
          </div>
        </div>
        <div className="mt-3 flex justify-center md:hidden">
          <button
            type="button"
            className="group relative isolate inline-flex shrink-0 cursor-pointer items-center gap-1 overflow-hidden rounded-full border border-[#652A27] bg-white px-2 py-3 font-montserrat text-[12px] font-normal leading-[100%] transition-colors duration-300 hover:bg-[#652A27] md:px-6 md:py-4 md:text-[20px]"
           >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-0 h-full w-full origin-left translate-x-[-101%] rounded-full bg-[#652A27] transition-transform duration-300 ease-out group-hover:translate-x-0"
            />
            <span className="relative z-10 flex items-center gap-1 text-[#652A27] transition-colors duration-300 group-hover:text-white ">
              Book Your Visit Today
              <i className="ri-arrow-right-line text-[22px] transition-all duration-300 group-hover:translate-x-1.5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Workplace;