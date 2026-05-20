import Image from "next/image";
import React from "react";

const SLIDER_CARDS = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  date: "Jan 6, 2026",
  title: "How Will 2026 Homes Be Different From Today's Living Spaces?",
  image: "/blog/slider-1.jpg",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
}));

const Smart = () => {
  return (
    <section
      className="w-full  border-[#00000033] bg-white bg-cover bg-center bg-no-repeat py-[35px] lg:py-[70px]"
      style={{ backgroundImage: "url('/media/Opportunities.png')" }}
    >
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <h2 className="font-optima text-[28px] max-w-[900px] font-bold text-center md:text-left capitalize leading-[35px] tracking-normal text-[#111111] md:text-[22px] md:leading-[46px] lg:text-[30px] xl:text-[36px] lg:leading-[52px] md:mx-30 ">
        Smart Real Estate Insights for Buyers, Investors & Future Homeowners
        </h2>

        <div className="lg:mt-18 mt-5 h-px w-full bg-gray-400 mx-30 xl:max-w-[1200px] lg:max-w-[800px] max-w-[430px] hidden md:block" aria-hidden />

        <div className="mt-5 flex items-center gap-3 md:mx-30 ">
          <span className="h-3 w-3 rounded-full bg-black" aria-hidden />
          <p className="font-montserrat text-[18px] font-medium capitalize leading-[100%] tracking-[0px] text-[#000000BD]">
          Featured Blog
          </p>
        </div>
      </div>
      <div className="cards-sldier mt-8 overflow-hidden border-y border-[#3C3C3C] bg-white py-8">
        <div className="media-slider-track flex w-max gap-5">
          {[...SLIDER_CARDS, ...SLIDER_CARDS].map((card, index) => (
            <article
              key={`${card.id}-${index}`}
              className="grid w-[940px] shrink-0 grid-cols-[1fr_0.9fr] gap-[30px] overflow-hidden rounded-xl border border-[#E6E6E6] bg-white p-3 max-lg:w-[740px] max-md:w-[85vw] max-md:grid-cols-1"
            >
              <div className="relative min-h-[230px] overflow-hidden rounded-lg md:min-h-[220px] lg:min-h-[330px]">
                <Image
                  src={card.image}
                  alt="Property event"
                  fill
                  className="object-cover md:object-contain md:object-center lg:object-cover"
                  sizes="(max-width: 768px) 85vw, 580px"
                />
              </div>

              <div className="flex flex-col py-2 md:py-0 max-md:px-3 md:pl-0 md:pr-8">
                <p className="font-montserrat text-[15px] font-semibold capitalize leading-[29px] tracking-normal text-[#00000066]">
                  {card.date}
                </p>
                <h3 className="mt-2 md:mt-4  font-montserrat text-[16px] md:text-[16px] lg:text-[20px] font-semibold capitalize leading-[23px] md:leading-[24px] lg:leading-[29px] tracking-normal text-[#111111] max-w-[350px]">
  {card.title}
</h3>
                <p className="mt-2 md:mt-4 font-montserrat text-[14px] font-normal capitalize leading-[22px] tracking-normal text-[#151515]">
                  {card.description}
                </p>
                <a
                  href="#"
                  className="mt-5 md:mt-15            inline-flex w-fit items-center gap-1 font-montserrat text-[14px] font-medium capitalize leading-[100%] tracking-normal text-[#652A27]"
                >
                  Read More
                  <i className="ri-arrow-right-line text-[22px]" aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .media-slider-track {
          animation: media-card-slide 30s linear infinite;
        }

        .cards-sldier:hover .media-slider-track {
          animation-play-state: paused;
        }

        @keyframes media-card-slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 16px));
          }
        }
      `}</style>
    </section>
  );
};

export default Smart;