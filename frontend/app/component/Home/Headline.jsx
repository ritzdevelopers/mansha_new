import Image from "next/image";
import Link from "next/link";

const Headline = () => {
  return (
    <section className="w-full bg-white  mx-auto max-w-[1500px] ">
      <div className="mx-auto max-w-8xl px-5 py-[35px] sm:px-8 lg:px-[75px]  lg:py-[70px] ">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h1 className="max-w-[min(100%,42rem)] shrink-0 font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[42px] sm:text-[50px] lg:text-[40px] xl:text-[65px] capitalize tracking-normal [leading-trim:both] [text-edge:cap_alphabetic]">
            <span className="block font-normal not-italic  text-black xl:leading-[80px] lg:leading-[50px] md:leading-[60px] leading-[40px]">
              Your Captivating
            </span>
            <span className="block leading-none">
              <span className="font-bold text-[#652A27]">Headline</span>
              <span className="font-normal text-black"> Goes Here</span>
            </span>
          </h1>

          <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:w-auto lg:max-w-xl lg:shrink-0 lg:justify-end lg:gap-[80px]">
            <p className="font-['Arial',Helvetica,sans-serif] text-[clamp(1.125rem,2vw+0.5rem,30px)] font-normal not-italic leading-none tracking-normal text-[#111111]">
              <span className="block leading-[30px] xl:leading-[30px]">with a leading real</span>
              <span className="block">estate agency</span>
            </p>

            <Link
  href="#contact"
  className="group relative inline-flex w-fit items-center gap-4 overflow-hidden rounded-full border border-[#652A27] px-5 py-[10px] text-[#652A27] transition-colors duration-300"
>
  {/* Background Animation */}
  <span className="absolute inset-0 -translate-x-full bg-[#652A27] transition-transform duration-300 group-hover:translate-x-0"></span>

  {/* Content */}
  <span className="relative z-10 flex items-center gap-2 md:gap-6 transition-colors duration-300 group-hover:text-white">
    Get consultation

    <Image
      src="/mansha-svg/right-arrow.svg"
      width={15}
      height={15}
      alt="arrow-right"
      className="transition duration-300 group-hover:brightness-0 group-hover:invert"
    />
  </span>
</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Headline;
