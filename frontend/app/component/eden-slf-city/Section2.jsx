"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const TABS = ["DESCRIPTION", "FEATURES", "LAYOUT PLAN", "STATUS"];

const PROPERTY_FEATURES = [
  {
    label: "Amenities",
    text: "24 Hours Water And Power Back Up, Wide Parking Spaces.",
  },
  {
    label: "Connectivity",
    text: "Perfect Location Advantage 40 To 80 Feet Wide Roads, Near Railway Station, And Main Highway.",
  },
  {
    label: "Security",
    text: "24 * 7 Security Guards, Fully Manned Security Round-The-Clock.",
  },
  {
    label: "Nature",
    text: "Green Landscaping, Gardens And Path Way Trees.",
  },
  {
    label: "Facilities",
    text: "Schools, Shopping Center, Nursing Homes, Taxi Stand And Religious Places.",
  },
];

const TAB_CONTENT = {
  DESCRIPTION: (
    <div className="flex flex-col gap-4">
      <p className="font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
        Welcome to Eden-SLF City, a unique township coming up in Taraori,
        promising a comfortable life and the best of modern facilities.
      </p>
      <p className="font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
        In an effort to find a serene and peaceful living environment, we often
        end up making compromises in terms of infrastructure, basic amenities,
        connectivity or cost factor.
      </p>
      <p className="font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
        Thankfully, Eden-SLF City will be a lively experience without any
        compromises on quality, amenities, connectivity and affordability.
      </p>
      <p className="font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
        Here you can experience the comfort of well-maintained roads without
        pollution and traffic congestion, proper sewerage system and 24 hour
        water supply without erratic water supply and drainage problems. This
        township promises the joy of living in neat and clean surrounding where
        peace of mind and classy lifestyle is guaranteed. Eden-SLF City offers a
        better lifestyle and for all those who want to build a dream home in
        serene surrounding, this is just the right place!
      </p>
      <p className="font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
        A wide variety of affordable freehold plots beckon you to come, build
        your dream home and settle down to a calm and peaceful future.
      </p>
    </div>
  ),
  FEATURES: (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-montserrat text-[14px] font-semibold uppercase tracking-wide text-[#652A27] md:text-[15px]">
          Project Features
        </h3>
        <p className="mt-2 font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
          In the first phase, we are offering a wide range of freehold plots
          starting from 160 sq. yards to 1000 sq. yards. These well planned plots
          will prove to be the perfect choice for your residence. Later on in
          phase-II, Eden-SLF City will also have a wide range of built-up villas,
          for people who don&apos;t want any construction hassles. The township
          will have a shopping needs and also offer commercial facilities like
          ATM&apos;s, Showrooms, Restaurants, Banks etc. The majestic experience
          of living in luxurious multi stories apartments will also be offered by
          the company in phase-III.
        </p>
      </div>
      <div>
        <h3 className="font-montserrat text-[14px] font-semibold uppercase tracking-wide text-[#652A27] md:text-[15px]">
          Property Features
        </h3>
        <ul className="mt-3 flex flex-col gap-3">
          {PROPERTY_FEATURES.map((item) => (
            <li
              key={item.label}
              className="font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]"
            >
              <span className="font-semibold text-[#111111]">
                {item.label}:{" "}
              </span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ),
  "LAYOUT PLAN": null,
  STATUS: (
    <ul className="flex flex-col gap-y-2">
      <li className="flex items-start gap-2 font-montserrat text-[14px] font-normal leading-[24px] text-[#333333] md:text-[16px]">
        <span
          className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#652A27]"
          aria-hidden
        />
        Delivered
      </li>
    </ul>
  ),
};

const GALLERY_IMAGES = [
  { src: "/delieved-gallery/lsf1.jpg", alt: "Gallery image one" },
  { src: "/delieved-gallery/lsf2.jpg", alt: "Gallery image two" },
  { src: "/delieved-gallery/lsf3.jpg", alt: "Gallery image three" },
  { src: "/delieved-gallery/lsf4.jpg", alt: "Gallery image four" },
  { src: "/delieved-gallery/lsf5.jpg", alt: "Gallery image five" },
];

const PAST_PROJECTS = [
  {
    name: "Mansha Luxury Floors",
    location: "Sector-72, Faridabad",
    note: "No Litigation pending",
  },
  {
    name: "Mansha Floor",
    location: "Sector-6, Palwal",
    note: "No Litigation pending",
  },
  {
    name: "Mansha Royal City",
    location: "Village Chandhut, Palwal",
    note: "No Litigation pending",
  },
];

const CORPORATE_CONTACTS = [
  {
    icon: "ri-building-2-line",
    label: "P-23, Sector 75, Greater Faridabad (Haryana)",
    href: null,
  },
  {
    icon: "ri-mail-line",
    label: " info@manshagroup.in",
    href: "mailto:info@manshagroup.in",
  },
  {
    icon: "ri-global-line",
    label: "www.manshagroup.in",
    href: "https://www.manshagroup.in",
  },
  {
    icon: "ri-phone-line",
    label: "+91- 8010003838",
    href: "tel:+918010003838",
  },
];

const Section2 = () => {
  const [activeTab, setActiveTab] = useState("FEATURES");
  const gridRef = useRef(null);
  const infoSectionRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalSwiper, setModalSwiper] = useState(null);

  const openModal = (index) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);
  const showNext = () => modalSwiper?.slideNext();
  const showPrev = () => modalSwiper?.slidePrev();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-card",
        { autoAlpha: 0, y: 45 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.16,
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = infoSectionRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    if (!section || !rightPanel) return;

    const ctx = gsap.context(() => {
      if (leftPanel) {
        gsap.fromTo(
          leftPanel,
          { autoAlpha: 0, x: -72 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      gsap.fromTo(
        rightPanel,
        { autoAlpha: 0, x: 72 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="w-full max-w-[1525px] mx-auto">
        <div className="mx-auto max-w-8xl px-5 py-[35px] sm:px-8 lg:px-[75px] lg:py-[70px]">
          <div className="overflow-hidden rounded-xl border border-[#D8DEE6] bg-white">
            <div className="border-b border-[#D8DEE6] px-5 py-6 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-montserrat text-[12px] font-medium uppercase tracking-[0.12em] text-black">
                    Delivered Project
                  </p>
                  <h1 className="mt-1 font-optima text-[24px] font-medium uppercase leading-tight tracking-wide text-black  md:text-[38px]">
                  eden-slf city
                  </h1>
                  <p className="mt-2 font-montserrat text-[13px] font-semibold uppercase tracking-wide text-black sm:text-[15px]">
                  Sector 1 Eden SLF City, Taraori, Haryana
                  </p>
                </div>
                <span className="inline-flex w-fit items-center justify-center rounded-md border border-[#652A27]/30 bg-[#652A27]/10 px-5 py-2 font-montserrat text-[13px] font-semibold uppercase tracking-wide text-[#652A27] sm:text-[14px]">
                  Residential
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] xl:grid-cols-[200px_minmax(0,1fr)_minmax(280px,320px)]">
              <nav
                className="hidden flex-col border-r border-[#D8DEE6] xl:flex"
                aria-label="Project sections"
              >
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer border-b border-[#E8ECF0] px-4 py-4 text-left font-montserrat text-[12px] font-semibold uppercase tracking-wide transition-colors last:border-b-0 lg:text-[13px] ${
                      activeTab === tab
                        ? "bg-[#652A27] text-white"
                        : "text-[#652A27] hover:bg-[#652A27]/10"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>

              <div className="min-w-0 border-[#D8DEE6] p-5 sm:p-8 lg:border-r xl:p-10">
                <div
                  className="mb-6 flex flex-wrap gap-2 xl:hidden"
                  role="tablist"
                  aria-label="Project sections"
                >
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                      className={`cursor-pointer rounded-md px-3 py-2 font-montserrat text-[11px] font-semibold uppercase tracking-wide sm:text-[12px] ${
                        activeTab === tab
                          ? "bg-[#652A27] text-white"
                          : "border border-[#D8DEE6] bg-white text-[#652A27]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div role="tabpanel">{TAB_CONTENT[activeTab]}</div>
              </div>

              <aside className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                <h2 className="text-center font-montserrat text-[15px] font-bold uppercase tracking-wide text-[#652A27] sm:text-[16px]">
                  Project Address
                </h2>
                  <div className="mx-auto mt-5 w-full max-w-[340px] rounded-lg bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
                  <ul className="flex flex-col gap-4">
                    <li className="grid grid-cols-[24px_1fr] items-center gap-x-3 gap-y-0">
                      <i
                        className="ri-building-2-line flex h-5 w-5 items-center justify-center text-[20px] leading-none text-[#652A27]"
                        aria-hidden
                      />
                      <span className="font-montserrat text-[14px] font-normal leading-[22px] text-[#333333]">
                        Sector 1 Eden SLF City, Taraori, Haryana
                      </span>
                    </li>
                    <li className="grid grid-cols-[24px_1fr] items-center gap-x-3 gap-y-0">
                      <i
                        className="ri-mail-line flex h-5 w-5 items-center justify-center text-[20px] leading-none text-[#652A27]"
                        aria-hidden
                      />
                      <a
                        href="mailto:info@manshagroup.in"
                        className="font-montserrat text-[14px] font-normal leading-[22px] text-[#333333] transition-colors hover:text-[#652A27]"
                      >
                         info@manshagroup.in
                      </a>
                    </li>
                    <li className="grid grid-cols-[24px_1fr] items-center gap-x-3 gap-y-0">
                      <i
                        className="ri-phone-line flex h-5 w-5 items-center justify-center text-[20px] leading-none text-[#652A27]"
                        aria-hidden
                      />
                      <a
                        href="tel:+918010003838"
                        className="font-montserrat text-[14px] font-normal leading-[22px] text-[#333333] transition-colors hover:text-[#652A27]"
                      >
                         +91- 8010003838
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex justify-center">
                  <Image
                    src="/logo/eden-logo.png"
                    alt="Eden SLF City"
                    width={160}
                    height={70}
                    className="h-auto max-w-[160px] object-contain opacity-90"
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pb-[35px] lg:pb-[70px]">
        <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
          <h2 className="text-center font-optima text-[28px] font-medium capitalize leading-[100%] tracking-[0] text-[#111111] md:text-left md:text-[32px] lg:text-[36px]">
            Gallery
          </h2>

          <div
            ref={gridRef}
            className="mt-0 grid grid-cols-1 gap-4 md:mt-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-7 xl:grid-cols-3"
          >
            <article className="gallery-card border border-[#E6E6E6] bg-white p-4">
              <h3 className="font-optima text-[24px] font-medium capitalize leading-[25px] tracking-[0] text-black lg:text-[28px] lg:leading-[100%]">
              Crafted to perfection
              </h3>
              <p className="mt-4 font-montserrat text-[16px] font-normal tracking-[0] text-[#00000099] md:leading-[25px] lg:leading-[28px]">
              See the precise construction and incredible attention to detail that makes each space comfortable, functional and subtly enhanced to provide an effortless living experience.
              </p>
            </article>

            {GALLERY_IMAGES.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => openModal(index)}
                className="gallery-card relative h-[200px] cursor-pointer overflow-hidden text-left sm:h-[230px] lg:h-[250px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </button>
            ))}
          </div>
        </div>

        {activeIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-[60] flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-[20px] leading-none text-white max-md:right-2 max-md:top-2 max-md:h-8 max-md:w-8 max-md:text-[14px]"
              aria-label="Close gallery popup"
            >
              <i className="ri-close-line" />
            </button>

            <button
              type="button"
              onClick={showPrev}
              className="absolute left-4 top-1/2 z-[60] flex h-15 w-15 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-[20px] leading-none text-white max-md:left-2 max-md:h-8 max-md:w-8 max-md:text-[14px]"
              aria-label="Previous image"
            >
              <i className="ri-arrow-left-s-line" />
            </button>

            <div className="relative z-10 h-[70vh] w-full max-w-5xl">
              <Swiper
                loop
                speed={500}
                slidesPerView={1}
                initialSlide={activeIndex}
                onSwiper={setModalSwiper}
                className="h-full w-full"
              >
                {GALLERY_IMAGES.map((image) => (
                  <SwiperSlide key={image.src}>
                    <div className="relative h-full w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="100vw"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button
              type="button"
              onClick={showNext}
              className="absolute right-4 top-1/2 z-[60] flex h-15 w-15 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-[20px] leading-none text-white max-md:right-2 max-md:h-8 max-md:w-8 max-md:text-[14px]"
              aria-label="Next image"
            >
              <i className="ri-arrow-right-s-line" />
            </button>
          </div>
        )}
      </section>

      <section
        ref={infoSectionRef}
        className="w-full max-w-[1525px] mx-auto overflow-hidden pb-[35px] pt-2 lg:pb-[70px] lg:pt-0"
      >
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-[75px]">
          <div className="grid grid-cols-1 gap-6 lg:gap-8">
          

            <div
              ref={rightPanelRef}
              className="overflow-hidden rounded-xl border border-[#D8DEE6] bg-white opacity-0"
            >
              <div className="border-b border-[#652A27] bg-white px-5 py-4 sm:px-6">
                <h2 className="font-montserrat text-[14px] font-bold uppercase tracking-wide text-[#652A27]">
                  Corporate Office
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:gap-5 sm:p-6">
                {CORPORATE_CONTACTS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border border-[#F8F8F8] bg-[#FAFBFC] px-4 py-3"
                  >
                    <i
                      className={`${item.icon} flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#652A27]/10 text-[18px] text-[#652A27]`}
                      aria-hidden
                    />
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.icon === "ri-global-line" ? "_blank" : undefined
                        }
                        rel={
                          item.icon === "ri-global-line"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="min-w-0 font-montserrat text-[14px] font-normal leading-[20px] text-[#333333] transition-colors hover:text-[#652A27] sm:text-[14px]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="min-w-0 font-montserrat text-[14px] font-normal leading-[20px] text-[#333333] sm:text-[14px]">
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section2;
