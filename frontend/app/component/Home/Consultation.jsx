import Image from "next/image";

const Consultation = () => {
  return (
    <section className="w-full max-w-[1500px] bg-white px-0 mx-auto">
      <div className="mx-auto max-w-8xl px-5 pb-[35px] sm:px-8 lg:px-[75px] lg:py-[70px]">
        <div className="relative overflow-hidden rounded-[24px]">
          <Image
            src="/mansha-image/consultation.jpg"
            alt="Consultation banner"
            width={1600}
            height={520}
            className="h-auto w-full object-cover"
          />
          <div className="absolute inset-0" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] md:text-[30px] font-[500] uppercase leading-[38px] tracking-normal text-white xl:text-[36px] sm:leading-[44px] lg:text-[30px] lg:leading-[49px]">
              GET YOUR PERSONALIZED OFFER
            </h2>

            <button
              type="button"
              className="mt-0 md:mt-3 lg:mt-5 xl:mt-8  cursor-pointer inline-flex items-center gap-1 md:gap-3 rounded-full bg-white px-3 md:px-6 py-3 font-['Arial',sans-serif] text-[14px] md:text-[16px] font-normal leading-[100%] tracking-normal text-[#652A27]"
            >
              Get consultation
              <i className="ri-arrow-right-line text-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;