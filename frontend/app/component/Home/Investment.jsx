import Image from "next/image";

const awards = [
  {
    image: "/mansha-image/jagran.png",
    alt: "Jagran Achievers Award",
    date: "November 10, 2025",
  },
  {
    image: "/mansha-image/crown.png",
    alt: "Crown of Delhi Award",
    date: "November 10, 2025",
  },
];

const Investment = () => {
  return (
    <section className="w-full max-w-[1500px] bg-[#4A1F1F] px-0 mx-auto">
      <div className="mx-auto max-w-8xl px-5 py-[35px] lg:py-[70px] sm:px-8 lg:px-[75px]">
        <h2 className="mx-auto max-w-[650px] text-center font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[28px] md:text-[36px] font-[500] leading-[30px] md:leading-[42px] tracking-normal capitalize text-white ">
          Trust Mansha Group For Your Next Real Estate Investment
        </h2>
        <p className="mt-2 text-center font-montserrat text-[16px] font-[300] leading-[24px] tracking-normal capitalize text-white">
          Faridabad&apos;s Most Reliable Developer.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {awards.map((item) => (
            <article
              key={item.alt}
              className="flex items-center gap-3 bg-white p-3 sm:gap-4 sm:p-4"
            >
              <div className="shrink-0 p-2 border border-[#E7E7E7]">
                <div className="relative h-[120px] w-[120px]">
                  <Image src={item.image} alt={item.alt} fill className="object-contain" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 font-['Poppins',sans-serif] text-[13px] font-normal leading-[100%] tracking-normal capitalize text-[#666666]">
                  <i className="ri-calendar-line text-[12px]" />
                  {item.date}
                </p>
                <p className="mt-2 font-montserrat text-[14px] font-normal leading-[22px] tracking-normal capitalize text-[#333333] sm:text-[16px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Investment;