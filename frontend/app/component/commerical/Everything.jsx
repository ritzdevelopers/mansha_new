import Image from "next/image";
import React from "react";

/** Same embed as https://manshagroup.in/vega-street/ (Divi Google Map module) */
const VEGA_STREET_MAP_EMBED =
  "https://maps.google.com/maps?q=Mansha%20Vega%20Street%2C%20Sector%2082%2C%20Faridabad%2C%20Haryana%20121004&t=m&z=10&output=embed&iwloc=near&hl=en_US";

const amenityItems = [
  {
    image: "/vega-street/airplane- vega.png",
    title: "60 minutes drive to International Airport",
  },
  {
    image: "/mansha-svg/Hospital.svg",
    title: "Very close to renowned hospitals",
  },
  {
    image: "/mansha-svg/metro.svg",
    title: "Short drive to nearest metro station",
  },
  {
    image: "/vega-street/flyover.png",
    title: "Easy accessibility to Badarpur Flyover via bypass",
  },
  {
    image: "/vega-street/flyover.png",
    title: "Well connected to Greater Noida (via upcoming flyover)",
  },
  {
    image: "/mansha-svg/side-metro.svg",
    title: "Near to South Delhi",
  },
  {
    image: "/vega-street/hands.png",
    title: "Easy drive to reach Gurgaon",
  },
];

const Everything = () => {
  return (
    <section className="w-full py-[35px] lg:py-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <h2 className="font-optima text-[28px] md:text-[36px] text-center md:text-left font-[500] leading-[100%] tracking-[0] capitalize text-[#000000]">
        Life, Within Easy Reach
        </h2>
        <p className=" mt-4  font-montserrat text-[16px] font-normal text-center md:text-left leading-[25px] md:leading-[28px] tracking-[0px] capitalize text-[#333333] ">
        Set in a prime location where connectivity, comfort, and community come together naturally.
        </p>

        <div className="relative mt-8 lg:mt-14">
          <div className="flex flex-col md:items-center lg:flex-row lg:items-stretch">
            <div className="relative min-h-[280px] w-full flex-1 overflow-hidden border border-[#E6E6E6] bg-[#F5F5F5] sm:min-h-[320px] md:w-full lg:h-[540px] lg:min-h-[540px]">
              <iframe
                title="Mansha Vega Street, Sector 82, Faridabad, Haryana 121004"
                src={VEGA_STREET_MAP_EMBED}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="relative z-10 mt-5 mx-auto w-full max-w-[400px] shrink-0 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:p-6 md:mx-auto md:max-w-none md:w-full lg:mx-0 lg:mt-0 lg:max-w-[400px] lg:shrink-0 lg:-ml-16 lg:self-center xl:-ml-24">
              <div className="relative mb-4 flex justify-end">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center "
                  aria-hidden
                >
                  <Image
                    src="/mansha-svg/Road-sign.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[30px] w-[30px] object-contain"
                  />
                </span>
              </div>

              <div className="max-h-[min(380px,55vh)] space-y-0 overflow-y-auto pr-1">
                {amenityItems.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="flex gap-4 border-b border-[#EEEEEE] py-4 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    <span className="relative h-[38px] w-[38px] shrink-0">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="38px"
                      />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col justify-center font-montserrat">
                      <p className="text-[14px] font-normal leading-[22px] tracking-[0] text-[#000000]">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Everything;
