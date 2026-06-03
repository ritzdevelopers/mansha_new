"use client";

const AWARD_ITEMS = [
  {
    id: "award-phygital",
    featured: true,
    iconBg: "bg-[#FFF0E6]",
    iconColor: "text-[#E87B35]",
    tags: [
      { label: "Featured", featured: true },
      { label: "2025", featured: false },
    ],
    location: null,
    title: "Phygital Retail Convention 2025",
    subtitle: "Presented Vega Street at Jio World Convention Centre, Mumbai",
  },
  {
    id: "award-jagran-singapore",
    featured: false,
    iconBg: "bg-[#E8F5E9]",
    iconColor: "text-[#4CAF50]",
    tags: [{ label: "2022", featured: false }],
    location: "Singapore",
    title: "Jagran's Achiever Awards",
    subtitle: "Most Trusted Brand in Real Estate",
  },
  {
    id: "award-ht-city",
    featured: false,
    iconBg: "bg-[#E3F2FD]",
    iconColor: "text-[#2196F3]",
    tags: [{ label: "2023", featured: false }],
    location: "Delhi",
    title: "HT City Crowns of Delhi",
    subtitle: "Trusted & Reliable Name in Real Estate since 2006",
  },
  {
    id: "award-bali",
    featured: false,
    iconBg: "bg-[#FCE4EC]",
    iconColor: "text-[#E91E63]",
    tags: [{ label: "2024", featured: false }],
    location: "Bali, Indonesia",
    title: "Jagran Achievers Award",
    subtitle: "Prominent Real Estate Developer in Delhi NCR",
  },
 
  {
    id: "award-jctb",
    featured: false,
    iconBg: "bg-[#E0F2F1]",
    iconColor: "text-[#009688]",
    tags: [{ label: "2025", featured: false }],
    location: null,
    title: "JCTB – Icons of Inspiration",
    subtitle: "Jagran Coffee Table Book — Prominent Real Estate Developer",
  },
  {
    id: "award-partners",
    featured: false,
    iconBg: "bg-[#F3E5F5]",
    iconColor: "text-[#9C27B0]",
    tags: [{ label: "Ongoing", featured: false }],
    location: null,
    title: "Channel Partners Meet",
    subtitle: "Celebrating growth through lasting partnerships",
  },
];

const scrollToAward = (id) => {
  window.history.pushState(null, "", `#${id}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  const el = document.getElementById("awards-section-3");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Section2 = () => {
  return (
    <section className="w-full  pb-[35px] pt-2 lg:pb-[50px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <div className="overflow-hidden rounded-[20px] border border-[#E8E4DC] bg-white">
          {AWARD_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToAward(item.id)}
              className={`flex w-full cursor-pointer items-center gap-4 px-4 py-5 text-left transition-colors hover:bg-[#FAFAFA] sm:gap-5 sm:px-6 sm:py-6 ${
                index < AWARD_ITEMS.length - 1 ? "border-b border-[#EEEEEE]" : ""
              } ${item.featured ? "border-l-4 border-l-[#E87B35]" : "border-l-4 border-l-transparent"}`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${item.iconBg}`}
              >
                <i className={`ri-trophy-line text-[22px] sm:text-[24px] ${item.iconColor}`} aria-hidden />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`rounded-full px-2.5 py-0.5 font-montserrat text-[11px] font-medium sm:text-[12px] ${
                        tag.featured
                          ? "bg-[#FFF0E6] text-[#E87B35]"
                          : "border border-[#E0E0E0] bg-white text-[#666666]"
                      }`}
                    >
                      {tag.label}
                    </span>
                  ))}
                  {item.location && (
                    <span className="font-montserrat text-[12px] font-normal text-[#888888]">
                      {item.location}
                    </span>
                  )}
                </span>
                <span className="mt-2 block font-optima text-[16px] font-medium leading-[130%] text-[#111111] sm:text-[18px]">
                  {item.title}
                </span>
                <span className="mt-1 block font-montserrat text-[13px] font-normal leading-[150%] text-[#777777] sm:text-[14px]">
                  {item.subtitle}
                </span>
              </span>

              <i
                className="ri-arrow-right-s-line shrink-0 text-[22px] text-[#CCCCCC] sm:text-[24px]"
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
