import Image from "next/image";

const awards = [
  {
    image: "/mansha-image/jagran.png",
    alt: "Jagran Achievers Award",
    description:
      "Jagran Achievers Award - Bali Indonesia, Prominent real estate developer in Delhi NCR 2024",
  },
  {
    image: "/mansha-image/crown.png",
    alt: "Crown of Delhi Award",
    description:
      "HT City Crowns of Delhi - Trusted and reliable name in real estate since 2006",
  },
];

const Investment = () => {
  return (
    <section className="w-full max-w-[1525px] bg-[#4A1F1F] px-0 mx-auto">
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
              className="flex flex-col items-center gap-3 bg-white p-3 sm:gap-4 sm:p-4 md:flex-row md:items-center md:justify-center"
            >
              <div className="shrink-0 border border-[#E7E7E7] p-2 md:shrink-0">
                <div className="relative mx-auto h-[120px] w-[120px]">
                  <Image src={item.image} alt={item.alt} fill className="object-contain" />
                </div>
              </div>

              <div className="flex w-full min-w-0 flex-1 flex-col items-center text-center md:text-center">
                <p className="mt-0 font-montserrat text-[14px] font-normal leading-[22px] tracking-normal text-[#333333] sm:text-[16px]">
                  {item.description}
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
