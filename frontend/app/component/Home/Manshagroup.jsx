import Image from "next/image";
import Link from "next/link";

const trendingCards = [
  {
    image: "/mansha-image/mansha-party.jpg",
    title: "Manshagroup Party 2025",
    date: "18 August, 2025",
  },
  {
    image: "/mansha-image/Independence.jpg",
    title: "Independence Day Celebration",
    date: "15 August, 2024",
  },
  {
    image: "/mansha-image/mansha-group.jpg",
    title: "office Event 2025",
    date: "18 August, 2025",
  },
  {
    image: "/mansha-image/event.jpg",
    title: "Manshagroup Party 2025",
    date: "18 August, 2025",
  },
  {
    image: "/mansha-image/yoga-day.jpg",
    title: "Yoga Day Celebration",
    date: "15 August, 2024",
  },
];

const Manshagroup = () => {
  return (
    <section className="w-full max-w-[1500px] bg-white px-0 mx-auto">
      <div className="mx-auto max-w-8xl px-5 py-[35px] lg:py-[70px] sm:px-8 lg:px-[75px]">
        <h2 className="mb-3 md:mb-8 max-w-full break-words font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[28px] md:text-[36px] font-[500] leading-[100%] tracking-normal capitalize text-[#111111] text-center md:text-left">
          What&apos;s Trending at manshagroup
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <article className="flex min-h-[200px] flex-col border border-[#E3E3E3] bg-white p-3 xl:p-6 lg:p-4 md:p-6 sm:p-8 md:min-h-0">
            <h3 className="font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[20px] md:text-[28px] lg:text-[20px] xl:text-[28px] lg:leading-[25px] leading-[100%] font-[500] xl:leading-[100%] tracking-normal capitalize text-[#111111] md:leading-[30px]">
              Luxury Living By Mansha
            </h3>
            <p className="mt-2 xl:mt-4 lg:mt-1 flex-1 font-['Montserrat',sans-serif] xl:text-[16px] lg:text-[14px] text-[14px] font-normal xl:leading-[28px] lg:leading-[20px] md:leading-[21px] md:text-[14px] leading-[20px] tracking-normal text-[#515151]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute
              reprehenderit in{" "}
              <Link
                href="#"
                className="inline font-['Montserrat',sans-serif] text-[16px] font-semibold leading-[28px] tracking-normal text-[#144168] hover:underline"
              >
                Read More...
              </Link>
            </p>
          </article>

          {trendingCards.map((card) => (
            <article
              key={card.title + card.date}
              className="group flex flex-col overflow-hidden border border-[#E0E0E0] bg-white"
            >
              <Link href="#" className="block w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={1200}
                  height={800}
                  className="h-auto w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </Link>
              <div className="p-4 sm:p-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-['Montserrat',sans-serif] text-[16px] font-medium xl:leading-[100%] tracking-normal text-[#144168] leading-[17px]">
                    {card.title}
                  </h3>
                  <Link
                    href="#"
                    aria-label={`Read more about ${card.title}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#515151] text-[#144168] transition-colors hover:border-[#144168] hover:bg-[#f8f8f8]"
                  >
                    <i className="ri-arrow-right-up-line text-xl leading-none text-[#515151]" />
                  </Link>
                </div>
                <p className="lg:mt-0 mt-0 font-['Montserrat',sans-serif] text-[14px] font-medium leading-[100%] tracking-normal text-[#515151]">
                  {card.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manshagroup;
