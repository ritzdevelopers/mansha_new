"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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

const DEFAULT_ACHIEVEMENT_ID = ACHIEVEMENTS[0].id;

const Section3 = () => {
  const [activeId, setActiveId] = useState(DEFAULT_ACHIEVEMENT_ID);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesVisible, setSlidesVisible] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const dropdownRef = useRef(null);

  const activeAchievement =
    ACHIEVEMENTS.find((item) => item.id === activeId) ?? ACHIEVEMENTS[0];
  const images = activeAchievement.images;
  const maxSlide = Math.max(0, images.length - slidesVisible);
  const slideWidth = 100 / slidesVisible;
  const sliderSlides = [...images, ...images.slice(0, slidesVisible)];

  const syncFromHash = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    if (ACHIEVEMENTS.some((item) => item.id === hash)) {
      setActiveId(hash);
      setActiveSlide(0);
      setDropdownOpen(false);
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
        setDropdownOpen(false);
      }
    };
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, []);

  useEffect(() => {
    const mqXl = window.matchMedia("(min-width: 1280px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      if (mqXl.matches) setSlidesVisible(2);
      else if (mqLg.matches) setSlidesVisible(1);
      else setSlidesVisible(1);
    };
    update();
    mqXl.addEventListener("change", update);
    mqLg.addEventListener("change", update);
    return () => {
      mqXl.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    setActiveSlide(0);
    setIsTransitioning(true);
  }, [activeId, slidesVisible]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => prev + 1);
      setIsTransitioning(true);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [activeId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSliderTransitionEnd = () => {
    if (activeSlide >= images.length) {
      setIsTransitioning(false);
      setActiveSlide(0);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsTransitioning(true)),
      );
    }
  };

  const selectAchievement = (id) => {
    setActiveId(id);
    setActiveSlide(0);
    setDropdownOpen(false);
    setGalleryOpen(false);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <section
      id="awards-section-3"
      className="w-full bg-white pb-[35px] pt-6 lg:pb-[70px] lg:pt-10"
    >
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <div className="relative flex justify-center" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="inline-flex items-center gap-3 rounded-full border border-[#E0E0E0] bg-white px-6 py-3 font-montserrat text-[14px] font-normal text-[#AAAAAA] transition-colors hover:border-[#CCCCCC] sm:px-8 sm:text-[15px]"
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
          >
            Achievement {activeAchievement.year}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#333333] text-white">
              <i
                className={`ri-arrow-down-s-line text-[16px] transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </span>
          </button>

          {dropdownOpen && (
            <ul
              role="listbox"
              className="absolute top-full z-20 mt-2 min-w-[280px] overflow-hidden rounded-[12px] border border-[#E8E4DC] bg-white py-1 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
            >
              {ACHIEVEMENTS.map((item) => (
                <li key={item.id} role="option" aria-selected={activeId === item.id}>
                  <button
                    type="button"
                    onClick={() => selectAchievement(item.id)}
                    className={`w-full px-5 py-3 text-left font-montserrat text-[14px] transition-colors hover:bg-[#FAFAFA] ${
                      activeId === item.id ? "bg-[#F9F8F3] font-medium text-[#111111]" : "text-[#666666]"
                    }`}
                  >
                    {item.eyebrow}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div>
            <p className="font-montserrat text-[13px] font-normal text-[#AAAAAA] sm:text-[14px]">
              {activeAchievement.eyebrow}
            </p>
            <h2 className="mt-3 font-optima text-[22px] font-medium leading-[135%] text-[#333333] sm:text-[26px] lg:text-[28px]">
              {activeAchievement.heading}
            </h2>
            <p className="mt-5 font-montserrat text-[14px] font-normal leading-[170%] text-[#888888] sm:text-[15px]">
              {activeAchievement.description}
            </p>
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="mt-8 inline-flex rounded-full bg-[#652A27] px-8 py-2 font-montserrat text-[14px] cursor-pointer font-medium text-white  sm:text-[15px]"
            >
              View All
            </button>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex ease-out"
              style={{
                transform: `translateX(-${activeSlide * slideWidth}%)`,
                transitionProperty: "transform",
                transitionDuration: isTransitioning ? "700ms" : "0ms",
              }}
              onTransitionEnd={handleSliderTransitionEnd}
            >
              {sliderSlides.map((image, idx) => (
                  <div
                    key={`${image.src}-${idx}`}
                    className="relative shrink-0 px-2"
                    style={{ width: `${slideWidth}%` }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:aspect-[5/4] lg:h-[280px] lg:aspect-auto">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                      />
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
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
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[20px] border border-[#E8E4DC] bg-[#F9F8F3] p-5 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E8E4DC] pb-4">
              <div>
                <p className="font-montserrat text-[12px] font-medium uppercase tracking-[0.12em] text-[#888888]">
                  {activeAchievement.eyebrow}
                </p>
                <h3 className="mt-1 font-optima text-[20px] font-medium text-[#111111] sm:text-[22px]">
                  All Gallery Images
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGalleryOpen(false)}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#652A27] text-white transition-opacity hover:opacity-90"
                aria-label="Close gallery"
              >
                <i className="ri-close-line text-[20px]" aria-hidden />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {images.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-[12px] border border-[#E8E4DC] bg-white"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Section3;
