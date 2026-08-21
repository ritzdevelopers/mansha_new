"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./section4-swiper.css";

const ACHIEVEMENTS = [
  {
    id: "award-phygital",
    year: "2025",
    eyebrow: "Phygital Retail Convention 2025",
    heading: "Presenting Vega Street by Mansha | Jio World Convention Centre, Mumbai",
    description:
      "Mansha Group proudly showcased Vega Street, our landmark commercial project, at the Phygital Retail Convention 2025 held at the prestigious Jio World Convention Centre, Mumbai. This platform brought together industry leaders to explore the future of phygital retail and high-street commercial destinations.",
    images: [
      { src: "/award/section1.jpg", alt: "Mansha booth at Phygital Retail Convention" },
      { src: "/award/section2.jpg", alt: "Vega Street by Mansha exhibition stall" },
      { src: "/award/section3.jpg", alt: "Vega Street partners and league of brands" },
      { src: "/award/section4.jpg", alt: "Mansha team at convention centre" },
      { src: "/award/section5.jpg", alt: "Mansha real estate group showcase" },
      { src: "/award/section6.jpg", alt: "Vega Street presentation at Jio World Centre" },
    ],
  },
  {
    id: "award-jagran-singapore",
    year: "2022",
    eyebrow: "Jagran's Achiever Awards – Singapore",
    heading: "Received Award For Most Trusted Brand",
    description:
      "Mansha Group was honoured at Jagran's Achiever Awards in Singapore with the Most Trusted Brand recognition, celebrating our commitment to transparency, quality, and customer trust across Delhi NCR real estate.",
    images: [
      { src: "/award/section7.webp", alt: "Jagran Achiever Awards Singapore" },
      { src: "/award/section8.webp", alt: "Most Trusted Brand award ceremony" },
      { src: "/award/section10.webp", alt: "Mansha receiving award at Singapore" },
      { src: "/award/section9.webp", alt: "Jagran Achiever Awards event" },
      { src: "/award/section11.webp", alt: "Most Trusted Brand recognition 2022" },
    ],
  },
  {
    id: "award-ht-city",
    year: "2023",
    eyebrow: "HT City Crowns of Delhi – Delhi",
    heading: "Trusted And Reliable Name In Real Estate Since 2006",
    description:
      "At HT City Crowns of Delhi, Mansha Group was recognised as a trusted and reliable name in real estate since 2006 — reflecting decades of delivered projects and lasting relationships with homeowners and investors.",
    images: [
      { src: "/award/section12.webp", alt: "HT City Crowns of Delhi award event" },
      { src: "/award/section13.webp", alt: "Mansha at HT City Crowns of Delhi" },
      { src: "/award/section14.webp", alt: "Trusted name in real estate award" },
      { src: "/award/section15.webp", alt: "HT City Crowns of Delhi Delhi 2023" },
    ],
  },
  {
    id: "award-bali",
    year: "2024",
    eyebrow: "Jagran Achievers Award – Bali, Indonesia",
    heading: "Prominent Real Estate Developer In Delhi NCR",
    description:
      "Mansha Group received the Jagran Achievers Award in Bali, Indonesia, acknowledging our stature as a prominent real estate developer in Delhi NCR and our contribution to shaping modern commercial and residential landscapes.",
    images: [
      { src: "/award/section16.jpeg", alt: "Jagran Achievers Award Bali Indonesia" },
      { src: "/award/section17.jpeg", alt: "Jagran Achievers Award ceremony stage" },
      { src: "/award/section18.jpeg", alt: "Mansha at Jagran Achievers Award Bali" },
      { src: "/award/section19.jpeg", alt: "Achievers Award presentation Bali 2024" },
    ],
  },
  {
    id: "award-jctb",
    year: "2025",
    eyebrow: "JCTB (Jagran Coffee Table) 2025 Icons Of Inspiration",
    heading: "Prominent Real Estate Developer In Delhi NCR",
    description:
      "Featured in the Jagran Coffee Table Book 2025 as Icons of Inspiration, Mansha Group stands among distinguished leaders recognised for excellence and impact in Delhi NCR's real estate sector.",
    images: [
      { src: "/award/section27.jpg", alt: "JCTB Icons of Inspiration award presentation" },
      { src: "/award/section28.jpg", alt: "Jagran Coffee Table Book 2025 event" },
      { src: "/award/section29.jpg", alt: "Icons of Inspiration group at Jagran event" },
      { src: "/award/section30.jpg", alt: "JCTB Icons of Inspiration award ceremony" },
      { src: "/award/section31.webp", alt: "Jagran Coffee Table Book Mansha recognition" },
    ],
  },
  {
    id: "award-partners",
    year: "Ongoing",
    eyebrow: "Channel Partners Meet",
    heading: "Celebrating Growth Through Lasting Partnerships",
    description:
      "Our Channel Partners Meet brings together trusted associates and brokers who power Mansha Group's growth. The event celebrates shared success, new launches, and the relationships that define our channel ecosystem.",
    images: [
      { src: "/award/section20.jpg", alt: "Mansha Group channel partners meet" },
      { src: "/award/section21.png", alt: "Channel partners at Mansha backdrop" },
      { src: "/award/section22.png", alt: "Mansha channel partners group photo" },
      { src: "/award/section23.png", alt: "Channel partners meet award ceremony" },
      { src: "/award/section24.png", alt: "Mansha partners meet banquet hall" },
      { src: "/award/section25.png", alt: "Channel partners with Mansha trophies" },
      { src: "/award/section26.png", alt: "Mansha channel partners team photo" },
    ],
  },
];

const Section3 = () => {
  const [activeId, setActiveId] = useState(ACHIEVEMENTS[0].id);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const popupSwiperRef = useRef(null);

  const activeAchievement =
    ACHIEVEMENTS.find((item) => item.id === activeId) ?? ACHIEVEMENTS[0];
  const images = activeAchievement.images;

  const syncFromHash = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    if (ACHIEVEMENTS.some((item) => item.id === hash)) {
      setActiveId(hash);
    }
  }, []);

  useEffect(() => {
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [syncFromHash]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", galleryOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [galleryOpen]);

  useEffect(() => {
    const onKeyUp = (event) => {
      if (event.key === "Escape") {
        setGalleryOpen(false);
      }
    };
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, []);

  const openGallery = (achievementId, index = 0) => {
    setActiveId(achievementId);
    setActiveIndex(index);
    setGalleryOpen(true);
  };

  const goToSlide = (idx) => {
    popupSwiperRef.current?.slideToLoop(idx);
    setActiveIndex(idx);
  };

  return (
    <section
      id="awards-section-3"
      className="w-full bg-white pb-[35px] pt-6 lg:pb-[70px] lg:pt-10"
    >
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        {ACHIEVEMENTS.map((achievement, sectionIndex) => {
          const previewImages = achievement.images.slice(0, 2);

          return (
            <div
              key={achievement.id}
              id={achievement.id}
              className={`${sectionIndex > 0 ? "mt-10 lg:mt-14" : ""} ${
                sectionIndex < ACHIEVEMENTS.length - 1
                  ? "border-b border-[#E8E4DC] pb-10 lg:pb-14"
                  : ""
              }`}
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 xl:gap-14">
                <div>
                  <p className="max-md:mt-[30px] font-montserrat text-[13px] font-normal text-[#AAAAAA] sm:text-[14px]">
                    {achievement.eyebrow}
                  </p>
                  <h2 className="mt-3 max-w-[320px] font-optima text-[22px] font-medium leading-[135%] text-[#333333] sm:max-w-[380px] sm:text-[26px] lg:max-w-[420px] lg:text-[28px]">
                    {achievement.heading}
                  </h2>
                  {/* <p className="mt-5 font-montserrat text-[14px] font-normal leading-[170%] text-[#888888] sm:text-[15px]">
                    {achievement.description}
                  </p> */}
                </div>

                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:gap-4">
                  {previewImages.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => openGallery(achievement.id, index)}
                      className="group relative aspect-[4/3] w-full overflow-hidden rounded-[20px] cursor-pointer sm:aspect-[5/4] lg:h-[320px] lg:aspect-auto xl:h-[360px]"
                      aria-label={`View ${image.alt}`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover rounded-[20px] transition-opacity duration-300 group-hover:opacity-70"
                        sizes="(max-width: 1024px) 100vw, 22vw"
                      />
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white text-[#515151]">
                          <i className="ri-arrow-right-up-line text-xl leading-none" aria-hidden />
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {galleryOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6"
          onClick={() => setGalleryOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`All images for ${activeAchievement.eyebrow}`}
        >
          <div
            className="relative flex h-[min(72vh,440px)] w-full max-w-5xl flex-col overflow-hidden rounded-[20px] border border-[#E8E4DC] bg-[#F9F8F3] p-5 sm:h-[min(85vh,580px)] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative shrink-0 border-b border-[#E8E4DC] pb-4 max-md:pt-[30px]">
              <p className="text-center font-montserrat text-[12px] font-medium uppercase tracking-[0.12em] text-[#888888]">
                {activeAchievement.eyebrow}
              </p>
              <button
                type="button"
                onClick={() => setGalleryOpen(false)}
                className="absolute right-0 -top-[17px] flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-white transition-opacity hover:opacity-90"
                aria-label="Close gallery"
              >
                <i className="ri-close-line text-[20px]" aria-hidden />
              </button>
            </div>

            <div className="relative mt-5 flex min-h-0 flex-1 flex-col">
              <div className="relative flex min-h-0 flex-1 items-center">
                <Swiper
                  key={activeId}
                  modules={[Autoplay]}
                  loop
                  centeredSlides
                  slidesPerView="auto"
                  spaceBetween={16}
                  speed={800}
                  watchOverflow
                  dir="ltr"
                  initialSlide={activeIndex}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    reverseDirection: false,
                  }}
                  breakpoints={{
                    640: { spaceBetween: 22 },
                    1024: { spaceBetween: 28 },
                  }}
                  onSwiper={(swiper) => {
                    popupSwiperRef.current = swiper;
                    swiper.slideToLoop(activeIndex, 0);
                    swiper.autoplay.start();
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  className="awards-highlight-swiper awards-highlight-swiper--rtl awards-popup-swiper w-full"
                >
                  {images.map((image, idx) => (
                    <SwiperSlide key={`${image.src}-${idx}`} className="!w-auto">
                      <div className="award-slide-frame relative overflow-hidden rounded-none sm:rounded-[20px]">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 70vw, 662px"
                          priority={idx < 3}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="mt-4 flex shrink-0 min-h-[8px] items-center justify-center gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => goToSlide(idx)}
                    className={`cursor-pointer rounded-full transition-all ${
                      activeIndex === idx ? "h-2 w-7 bg-[#652A27]" : "h-2 w-2 bg-[#652A27]/35"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Section3;
