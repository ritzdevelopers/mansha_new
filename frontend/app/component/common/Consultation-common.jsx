import Image from "next/image";
import Link from "next/link";

const ConsultationCommon = () => {
  return (
    <section className="w-full max-w-[1500px] bg-white px-0 mx-auto">
      <div className="mx-auto max-w-8xl px-5 pb-[35px] sm:px-8 lg:px-[75px] lg:py-[70px]">
        <div className="consultation-banner relative w-full overflow-hidden md:rounded-[24px] rounded-[20px]">
          <Image
            src="/mansha-image/consultation.jpg"
            alt="Consultation banner"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
  <h2 className="font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[15px] md:text-[30px] font-[500] uppercase leading-[38px] tracking-normal text-white xl:text-[36px] sm:leading-[44px] lg:text-[30px] lg:leading-[49px]">
    GET YOUR PERSONALIZED OFFER
  </h2>

  <Link href="/about-us">
    <button
      type="button"
      className="group relative isolate mt-0 inline-flex cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-white px-3 py-2 font-['Arial',sans-serif] text-[14px] font-normal leading-[100%] tracking-normal transition-colors duration-300 group-hover:bg-[#652A27] md:mt-3 md:gap-3 md:px-7 md:py-4 md:text-[16px] lg:mt-4 xl:mt-4"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 h-full w-full origin-left translate-x-[-101%] rounded-full bg-[#652A27] transition-transform duration-300 ease-out group-hover:translate-x-0"
      />

      <span className="relative z-10 flex items-center gap-1 text-[#652A27] transition-colors duration-300 group-hover:text-white md:gap-3 text-[5px]">
        Get consultation

        <i className="ri-arrow-right-line text-[18px] transition-all duration-300 group-hover:translate-x-2" />
      </span>
    </button>
  </Link>
</div>
        </div>
      </div>

      <style>{`
        .consultation-banner {
          aspect-ratio: 1600 / 420;
          height: auto;
        }

        @media (min-width: 1280px) {
          .consultation-banner {
            aspect-ratio: auto;
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
};

export default ConsultationCommon;