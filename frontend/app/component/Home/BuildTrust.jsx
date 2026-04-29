import Image from "next/image";

const BuildTrust = () => {
  return (
    <section id="build-trust-section" className="w-full bg-white ">
      <div className=" max-w-8xl px-5 pt-[35px] sm:px-8  lg:px-[75px] lg:pt-[70px] lg:pb-[0px]">
        <h2 className="font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[36px] sm:text-[42px] lg:text-[40px] xl:text-[48px] font-[500] not-italic leading-none tracking-normal capitalize text-[#000000] text-center md:text-left [leading-trim:none] ">
          Built On Trust
        </h2>

        <div className="relative mt-6">
          <div className="flex flex-wrap items-start justify-center gap-4 max-md:flex-col max-md:items-center max-md:justify-center sm:gap-8 md:flex-nowrap md:items-end md:gap-[150px] lg:flex-nowrap lg:items-end lg:gap-[220px] xl:items-start xl:gap-16 2xl:flex-nowrap 2xl:items-center 2xl:justify-center 2xl:gap-[200px]">
            <div className="relative min-w-[90px] translate-x-3 pt-12 text-center max-md:w-full max-md:translate-x-0 max-md:pt-4 sm:min-w-[110px] sm:translate-x-6 sm:pt-10 md:translate-x-[100px] md:pt-0 lg:translate-x-[100px] lg:pt-0 xl:pt-12 2xl:translate-x-0 2xl:pt-0">
              <div className="mt-0 mb-1 sm:mt-[150px] md:mt-0 lg:mt-0 xl:mt-[115px] 2xl:mt-0">
                <p className="font-['Montserrat',sans-serif] text-[38px] font-medium not-italic leading-none tracking-normal text-center capitalize text-[#333333] [leading-trim:both] [text-edge:cap_alphabetic] sm:text-[42px] sm:font-semibold md:text-[48px] md:font-semibold lg:text-[54px] lg:font-bold xl:text-[65px]">
                  14+
                </p>
              </div>
              <p className="mt-1 font-['Montserrat',sans-serif] text-[13px] font-normal not-italic leading-snug tracking-normal text-center capitalize text-[#333333] [leading-trim:both] [text-edge:cap_alphabetic] md:text-[16px] md:font-[500] md:leading-6 lg:text-[14px] xl:text-[16px]">
                Delivered Projects
              </p>
            </div>

            <div
              className="relative z-[1] hidden shrink-0 xl:flex 2xl:hidden xl:self-center xl:items-center xl:-translate-y-12"
              aria-hidden
            >
              <Image
                src="/mansha-image/burst-line.png"
                alt=""
                width={300}
                height={150}
                className="h-auto w-[min(200px,18vw)] max-w-[240px] object-contain object-center"
              />
            </div>

            <div className="flex flex-wrap items-start justify-center gap-4 max-md:flex-col max-md:items-center max-md:justify-center sm:gap-8 md:flex-nowrap md:items-end md:gap-[50px] lg:flex-nowrap lg:items-end lg:gap-[120px] xl:items-start xl:gap-16 2xl:flex-nowrap 2xl:items-center 2xl:justify-center 2xl:gap-[200px]">
              <div className="min-w-[98px] text-center max-md:w-full sm:min-w-[120px]">
                <div className="mb-1">
                  <p className="font-['Montserrat',sans-serif] text-[38px] font-medium not-italic leading-none tracking-normal text-center capitalize text-[#333333] [leading-trim:both] [text-edge:cap_alphabetic] sm:text-[42px] sm:font-semibold md:text-[48px] md:font-semibold lg:text-[54px] lg:font-bold xl:text-[65px]">
                    65+
                  </p>
                </div>
                <p className="mt-1 font-['Montserrat',sans-serif] text-[13px] font-normal not-italic leading-snug tracking-normal text-center capitalize text-[#333333] [leading-trim:both] [text-edge:cap_alphabetic] md:text-[16px] md:font-[500] md:leading-6 lg:text-[14px] xl:text-[16px]">
                  Lac Sq. Ft Delivered
                </p>
              </div>

              <div
                className="relative z-[1] hidden shrink-0 xl:flex 2xl:hidden xl:self-center xl:items-center xl:-translate-y-5"
                aria-hidden
              >
                <Image
                  src="/mansha-image/burststraight-line.png"
                  alt=""
                  width={320}
                  height={24}
                  className="h-auto w-[min(220px,22vw)] max-w-[280px] object-contain object-center"
                />
              </div>

              <div className="min-w-[98px] text-center max-md:w-full sm:min-w-[120px]">
                <div className="mb-1">
                  <p className="font-['Montserrat',sans-serif] text-[38px] font-medium not-italic leading-none tracking-normal text-center capitalize text-[#333333] [leading-trim:both] [text-edge:cap_alphabetic] sm:text-[42px] sm:font-semibold md:text-[48px] md:font-semibold lg:text-[54px] lg:font-bold xl:text-[65px]">
                    2500+
                  </p>
                </div>
                <p className="mt-1 font-['Montserrat',sans-serif] text-[13px] font-normal not-italic leading-snug tracking-normal text-center capitalize text-[#333333] [leading-trim:both] [text-edge:cap_alphabetic] md:text-[16px] md:font-[500] md:leading-6 lg:text-[14px] xl:text-[16px]">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>

       <div className="relative xl:-mt-[150px] lg:mt-[40px] 2xl:mt-[50px] md:mt-[30px] mt-3 overflow-hidden -ml-5 -mr-5 sm:-ml-8 sm:-mr-8 lg:-ml-[75px]  lg:-mr-[75px]">
  <div className="absolute inset-x-0 top-0 h-[35%] bg-transparent">
    <div className="ml-[28%] h-full rounded-tl-[120px] bg-[#5a67af] sm:rounded-tl-[150px]" />
  </div>

  <Image
    src="/mansha-image/built-trust-image.png"
    width={1600}
    height={900}
    alt="Build trust"
    className="relative z-10 h-auto w-full object-cover"
    priority={false}
  />
</div>
      </div>
    </section>
  );
};

export default BuildTrust;