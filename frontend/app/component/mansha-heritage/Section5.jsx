"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const luxuryItems = [
  { icon: "/mansha-svg/clubhouse.svg", label: "Eco-friendly design " },
  { icon: "/mansha-svg/playarea.svg", label: "Wide open roads " },
  { icon: "/mansha-svg/swimming.svg", label: "Advanced security systems" },
  { icon: "/mansha-svg/jogging.svg", label: "Advanced security systems" },
  { icon: "/mansha-svg/facility.svg", label: "24 × 7 power back-up for common areas" },
];

const popupAmenities = [
  { icon: "/mansha-svg/facility.svg", label: "Gated community" },
  { icon: "/mansha-svg/facility.svg", label: "Well connecting" },
  { icon: "/mansha-svg/clubhouse.svg", label: "Smart Design" },
  { icon: "/mansha-svg/facility.svg", label: "Manicured greens" },
  { icon: "/mansha-svg/facility.svg", label: "Light poles electricity" },
  { icon: "/mansha-svg/facility.svg", label: "24/7 security" },
  { icon: "/mansha-svg/playarea.svg", label: "Play area" },
  { icon: "/mansha-svg/jogging.svg", label: "Holistic Wellness Voyage" },
  { icon: "/mansha-svg/clubhouse.svg", label: "Eco-Friendly Design" },
  { icon: "/mansha-svg/facility.svg", label: "All Underground Cabling" },
  { icon: "/mansha-svg/playarea.svg", label: "Wide Open Roads" },
  { icon: "/mansha-svg/facility.svg", label: "Advanced Security Systems" },
  { icon: "/mansha-svg/facility.svg", label: "Provision of Underground Water Tank" },
  { icon: "/mansha-svg/facility.svg", label: "24 x 7 Power Back-up for Common Areas" },
  { icon: "/mansha-svg/facility.svg", label: "Rain Water Harvesting" },
  { icon: "/mansha-svg/facility.svg", label: "Round-the-Clock Facilities Management" },
  { icon: "/mansha-svg/facility.svg", label: "Sewage Treatment Plant" },
  { icon: "/mansha-svg/clubhouse.svg", label: "Designed for a Complete Living Experience" },
  { icon: "/mansha-svg/clubhouse.svg", label: "State-of-the-art Workspaces" },
  { icon: "/mansha-svg/clubhouse.svg", label: "High Street Shopping Model" },
  { icon: "/mansha-svg/clubhouse.svg", label: "Amphitheatre" },
];

const AMENITY_REVEAL_MS = 200;

const Section5 = () => {
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [visibleAmenityCount, setVisibleAmenityCount] = useState(0);

  useEffect(() => {
    if (!isAmenitiesOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsAmenitiesOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isAmenitiesOpen]);

  useEffect(() => {
    if (!isAmenitiesOpen) {
      setVisibleAmenityCount(0);
      return;
    }

    setVisibleAmenityCount(0);

    const intervalId = window.setInterval(() => {
      setVisibleAmenityCount((prev) => {
        const next = prev + 1;
        if (next >= popupAmenities.length) {
          window.clearInterval(intervalId);
        }
        return Math.min(next, popupAmenities.length);
      });
    }, AMENITY_REVEAL_MS);

    return () => window.clearInterval(intervalId);
  }, [isAmenitiesOpen]);

  return (
    <section className="w-full pb-[35px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1525px] ">
        <div className="relative overflow-hidden pb-3 sm:py-6 xl:py-14 lg:py-10">
          <Image
            src="/mansha-image/Luxuries.jpg"
            alt="Luxuries background"
            fill
            className=""
            sizes="100vw"
          />
          <div className=" xl:mt-10 md:mt-0 mt-0 relative z-10 mx-auto max-w-[1100px]">
          <h2 className="mt-2 md:mt-0 mx-auto max-w-[540px] text-center font-optima xl:text-[36px] md:text-[25px] text-[16px] font-[500] xl:leading-[43px] lg:leading-[30px] md:leading-[30px] leading-[20px] capitalize text-[#000000]">
  Spaces and comforts that make every moment brighter
</h2>

            <div className="xl:mt-16 lg:mt-5 mt-3 grid grid-cols-2 gap-0 text-center sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 lg:gap-0 xl:gap-6">
              {luxuryItems.map((item, idx) => (
                <div
                  key={`${item.label}-${idx}`}
                  className={`flex flex-col items-center justify-start ${
                    idx === 4 ? "col-span-2 justify-self-center sm:col-span-1" : ""
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={52}
                    height={52}
                    className="h-[38px] w-[38px] object-contain md:h-[42px] md:w-[42px] lg:h-[52px] lg:w-[52px] xl:h-[80px] xl:w-[80px]"
                  />
                  <p className="mt-2 text-center font-optima text-[13px] font-[500] leading-[100%] capitalize text-[#000000] md:mt-3 md:text-[14px] lg:text-[16px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="md:mt-8 mt-3 flex justify-center">
              <div className="relative w-full max-w-[760px] overflow-hidden">
                <Image
                  src="/mansha-image/Experience.jpg"
                  alt="Experience all lifestyle amenities"
                  width={760}
                  height={360}
                  className="mx-auto block h-auto w-[300px] md:w-[40%] lg:w-full"
                  sizes="(max-width: 1024px) 100vw, 760px"
                />
                <button
                  type="button"
                  onClick={() => setIsAmenitiesOpen(true)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-white px-5 lg:py-4 py-2 md:py-2 text-center font-montserrat text-[8px] font-medium leading-[100%] text-[#333333] transition-colors hover:bg-[#fafafa] md:text-[10px] lg:text-[16px]"
                  aria-haspopup="dialog"
                  aria-expanded={isAmenitiesOpen}
                >
                  Experience all lifestyle amenities
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAmenitiesOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setIsAmenitiesOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="amenities-modal-title"
        >
          <div
            className="relative z-10 max-h-[90vh] w-full max-w-[920px] overflow-y-auto rounded-lg bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.2)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAmenitiesOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#7B1E1E] text-[18px] leading-none text-white"
              aria-label="Close amenities popup"
            >
              <i className="ri-close-line" />
            </button>

            <h3
              id="amenities-modal-title"
              className="pr-12 font-optima text-[22px] font-[500] capitalize leading-[120%] text-[#000000] md:text-[28px]"
            >
              Lifestyle Amenities
            </h3>

            <div className="mt-6 grid min-h-[220px] grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {popupAmenities.map((item, idx) => (
                <div
                  key={`modal-${item.label}-${idx}`}
                  className={`flex flex-col items-center text-center transition-all duration-500 ease-out ${
                    idx < visibleAmenityCount
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={52}
                    height={52}
                    className="h-[44px] w-[44px] object-contain md:h-[52px] md:w-[52px]"
                  />
                  <p className="mt-2 font-optima text-[13px] font-[500] leading-[120%] capitalize text-[#000000] md:text-[14px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Section5;
