"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const TABS = ["DESCRIPTION", "FEATURES", "UPDATION", "STATUS"];

const FEATURES = [
  "Air Conditioning",
  "Swimming Pool",
  "Central Heating",
  "Spa & Massage",
  "Pets Allow",
  "Gym",
  "Alarm",
  "Window Covering",
  "Free WiFi",
  "Car Parking",
  "School",
];

const TAB_CONTENT = {
  DESCRIPTION: (
    <div className="flex flex-col gap-4">
      <p className="font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
        The beautiful City Palwal is situated on the national highway 2 from
        Delhi to Agra-Allahabad and falls in the national capital region just 40
        km from south Delhi. It has an ancient connection from the time of Lord
        Krishna. It was prominent during the regime of British as Mahatma Gandhi
        was arrested for the first time from Railway station Palwal. It was
        initially a part of Gurgaon (Now Gurugram) District and then Faridabad
        District. Now, it is the fastest growing full-fledged District of
        Haryana, since 15 August 2008. Because of the remarkable connectivity it
        has become the choice of businessmen and common people. It is becoming
        the hub of industries and education and is becoming the choice of
        builders and developers.
      </p>
      <p className="font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
        The connectivity of this historic city is through 6 lane national Highway
        No.2, KMP (Kundli-Manesar-Palwal), Eastern Periphery (Greater Noida,
        Noida, Ghaziabad, Panipat). It falls on the largest railway network.
        Palwal is very near to Gurugram and Faridabad. These two cities have
        attained saturation and so the attraction of people is towards Palwal.
        One of the biggest dry port is also being planned by the Govt in Palwal
        Distt.
      </p>
      <p className="font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
        Mansha City Palwal is guided by its founding values—values of delivering
        quality and excellent real estate spaces, ensuring customer satisfaction,
        and redefining lifestyle. Mansha Group forayed into delivering our project
        namely Mansha City, Sector-9, Palwal. Sensing an opportunity in tier II
        and III cities, the company made a conscious decision to venture into
        cities like Palwal and, true to its motto, &ldquo;Turning Dreams into
        Reality&rdquo;, the company is currently executing quality affordable
        homes in Palwal, Faridabad, Karnal and Rufrapur etc. to name a few.
      </p>
    </div>
  ),
  FEATURES: (
    <ul className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-8">
      {FEATURES.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 font-montserrat text-[14px] font-normal leading-[24px] text-[#333333] md:text-[16px]"
        >
          <span
            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#652A27]"
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  ),
  "UPDATION": (
    <div className="flex flex-col gap-6">
      <dl className="flex flex-col gap-4">
        <div>
                  <h3 className="font-montserrat text-[14px] font-semibold uppercase tracking-wide text-[#652A27] md:text-[20px]">
                  UPDATION & INVOLVEMENT
        </h3>
          
          <dt className="mt-4 font-montserrat text-[14px] font-semibold uppercase tracking-wide text-[#652A27] md:text-[15px]">
            Site Progress
          </dt>
          <dd className="mt-1 font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
            COMPLETION GRANTED
          </dd>
        </div>
        <div>
          <dt className="font-montserrat text-[14px] font-semibold uppercase tracking-wide text-[#652A27] md:text-[15px]">
            Number of Plots Booked and Types
          </dt>
          <dd className="mt-1 font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
            135 PLOTS AND 8 TYPES
          </dd>
        </div>
        <div>
          <dt className="font-montserrat text-[14px] font-semibold uppercase tracking-wide text-[#652A27] md:text-[15px]">
            Infrastructure Facilities to be done in Next Quarter
          </dt>
          <dd className="mt-1 font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
            COMPLETION GRANTED
          </dd>
        </div>
      </dl>

      <div className="border-t border-[#E8ECF0] pt-6">
        <h3 className="font-montserrat text-[14px] font-semibold uppercase tracking-wide text-[#652A27] md:text-[20px]">
          Detail of the Persons involved in the development of the projects
        </h3>
        <dl className="mt-4 flex flex-col gap-5">
          <div>
            <dt className="font-montserrat text-[14px] font-semibold text-[#111111] md:text-[15px]">
              Consultant
            </dt>
            <dd className="mt-1 font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
              No Consultancy Taken
            </dd>
          </div>
          <div>
            <dt className="font-montserrat text-[14px] font-semibold text-[#111111] md:text-[15px]">
              Contractor
            </dt>
            <dd className="mt-1 font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
              Self Development
            </dd>
          </div>
          <div>
            <dt className="font-montserrat text-[14px] font-semibold text-[#111111] md:text-[15px]">
              Architects
            </dt>
            <dd className="mt-1 flex flex-col gap-1 font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
              <span>Kumar Architect &amp; Associates</span>
              <span>H.No. 180, Sector-10, Faridabad</span>
              <span>
                Phone No.{" "}
                <a
                  href="tel:+919311894161"
                  className="text-[#652A27] transition-colors hover:underline"
                >
                  9311894161
                </a>
              </span>
              <span>
                Email Id:{" "}
                <a
                  href="mailto:kumararchitect02@gmail.com"
                  className="text-[#652A27] transition-colors hover:underline"
                >
                  kumararchitect02@gmail.com
                </a>
              </span>
            </dd>
          </div>
          <div>
            <dt className="font-montserrat text-[14px] font-semibold text-[#111111] md:text-[15px]">
              Structure Engineer
            </dt>
            <dd className="mt-1 flex flex-col gap-1 font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px]">
              <span>LKT Engineering Consultants Ltd.</span>
              <span>
                63/12A, 2nd Floor, Main Rama Road, New Delhi - 110015
              </span>
              <span>
                Phone No.:{" "}
                <a
                  href="tel:+911145565818"
                  className="text-[#652A27] transition-colors hover:underline"
                >
                  011-45565818
                </a>
              </span>
              <span>
                Website:{" "}
                <a
                  href="https://www.lktengineering.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#652A27] transition-colors hover:underline"
                >
                  www.lktengineering.com
                </a>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  ),
  STATUS: (
    <ul className="font-montserrat text-[14px] font-normal leading-[26px] text-[#333333] md:text-[16px] md:leading-[28px] list-disc pl-5">
  <li>Boundary Wall Completed</li>
  <li>Sewerage Lines Completed</li>
  <li>Park Completed</li>
  <li>Water Lines Completed</li>
  <li>Drainage Work Completed</li>
</ul>
  ),
};

const GALLERY_IMAGES = [
  { src: "/delieved-gallery/palwal1.jpg", alt: "Gallery image one" },
  { src: "/delieved-gallery/pawal2.jpg", alt: "Gallery image two" },
  { src: "/delieved-gallery/pawal3.jpg", alt: "Gallery image three" },
  { src: "/delieved-gallery/pawal4.jpg", alt: "Gallery image four" },
  { src: "/delieved-gallery/pawal5.jpg", alt: "Gallery image five" },
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
    label: " www.manshagroup.in",
    href: "https://www.manshagroup.in",
  },
  {
    icon: "ri-phone-line",
    label: "Contact Us: +91- 8010003838",
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
    if (!section || !leftPanel || !rightPanel) return;

    const ctx = gsap.context(() => {
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
                    Mansha City Palwal
                  </h1>
                  <p className="mt-2 font-montserrat text-[13px] font-semibold uppercase tracking-wide text-black sm:text-[15px]">
                    Mansha City, Sector-9, Palwal
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
                <div className="mx-auto mt-5 w-full max-w-[340px] rounded-lg border border-[#652A27] bg-white p-5 sm:p-6">
                  <ul className="flex flex-col gap-4">
                    <li className="grid grid-cols-[24px_1fr] items-center gap-x-3 gap-y-0">
                      <i
                        className="ri-building-2-line flex h-5 w-5 items-center justify-center text-[20px] leading-none text-[#652A27]"
                        aria-hidden
                      />
                      <span className="font-montserrat text-[14px] font-normal leading-[22px] text-[#333333]">
                        Mansha City, Sector-9, Palwal
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
                        E-mail: info@manshagroup.in
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
                    src="/delieverd/mansha-city-palwal.png"
                    alt="Mansha City Palwal"
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
              Luxury living defined
              </h3>
              <p className="mt-4 font-montserrat text-[16px] font-normal tracking-[0] text-[#00000099] md:leading-[25px] lg:leading-[28px]">
              A stylish exploration of meticulously crafted homes where the look is as important as the function, each with a sense of calm, clarity and contemporary refinement.
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-1 xl:grid-cols-2 lg:gap-8">
            <div
              ref={leftPanelRef}
              className="overflow-hidden rounded-xl border border-[#D8DEE6] bg-white opacity-0"
            >
              <div className="flex items-center gap-3 border-b border-[#D8DEE6] bg-[#652A27]/5 px-5 py-4 sm:px-6">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#652A27] font-montserrat text-[13px] font-bold text-white"
                  aria-hidden
                >
                  5
                </span>
                <h2 className="font-montserrat text-[13px] font-bold uppercase leading-snug tracking-wide text-[#652A27] sm:text-[14px]">
                  Past Project In Last Five Year Developed By Promoter
                </h2>
              </div>
              <ul className="divide-y divide-[#E8ECF0] p-4 sm:p-6">
                {PAST_PROJECTS.map((project, index) => (
                  <li
                    key={project.name}
                    className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="font-montserrat text-[12px] font-bold uppercase text-[#652A27]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="font-montserrat text-[14px] font-bold uppercase leading-snug text-[#111111] sm:text-[15px]">
                        {project.name}
                      </p>
                    </div>
                    <p className="font-montserrat text-[14px] font-normal leading-[22px] text-[#333333] sm:text-right sm:text-[14px]">
                      Situated at {project.location}{" "}
                      <span className="text-[#652A27]">({project.note})</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

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
                    className="flex items-center gap-3 rounded-lg border border-[#E8ECF0] bg-[#FAFBFC] px-4 py-3"
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
