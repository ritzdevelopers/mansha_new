import Link from "next/link";
import { trendingEvents } from "../event/eventData";

const trendingCards = trendingEvents;

const Manshagroup = () => {
  const renderEventCard = (card, index) => (
    <article
      key={`${card.title}-${card.date}-${index}`}
      className="group flex flex-col overflow-hidden border border-[#E0E0E0] bg-white"
    >
      <Link href={`/event/${card.slug}`} className="block w-full overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          title={card.title}
          width={1200}
          height={800}
          className="h-auto w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className="p-4 sm:p-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-montserrat text-[16px] font-medium xl:leading-[100%] tracking-normal text-[#144168] leading-[17px]">
            {card.title}
          </h3>
          <Link
            href={`/event/${card.slug}`}
            aria-label={`Read more about ${card.title}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#515151] text-[#144168] transition-colors hover:border-[#144168] hover:bg-[#f8f8f8]"
          >
            <i className="ri-arrow-right-up-line text-xl leading-none text-[#515151] hover:border-[#144168] hover:text-[#144168]" />
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <section className="w-full max-w-[1500px] bg-white px-0 mx-auto">
      <div className="mx-auto max-w-8xl px-5 py-[35px] lg:py-[70px] sm:px-8 lg:px-[75px]">
        <h2 className="mb-3 md:mb-8 max-w-full break-words font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[28px] md:text-[36px] font-[500] leading-[100%] tracking-normal capitalize text-[#111111] text-center md:text-left">
          What&apos;s Trending at manshagroup
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {trendingCards.map((card, index) => renderEventCard(card, index))}
        </div>
      </div>
    </section>
  );
};

export default Manshagroup;
