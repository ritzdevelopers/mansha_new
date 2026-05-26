"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PHONE = "tel:+91-8010003838";
const PHONE_TEXT = "+91-8010003838";
const EMAIL = "mailto:info@manshagroup.in";
const EMAIL_TEXT = "info@manshagroup.in";

const NAV_ITEMS = [
  { label: "Home", href: "/", delay: "200ms" },
  { label: "About", href: "/about-us", delay: "320ms" },
  { label: "Contact", href: "/contact-us", delay: "560ms" },
  { label: "Careers", href: "careers", delay: "680ms" },
  { label: "Blogs", href: "/blog", delay: "800ms" },
];

const ONGOING_RESIDENTIAL = [
  { label: "Mansha Heritage", href: "/mansha-heritage" },
  
  { label: "Mansha Orchid", href: "/mansha-orchid" },
  { label: "Aagman by mansha", href: "/aagman-by-mansha" },
  { label: "Mansha Oasis", href: "/mansha-oasis" },
];

const DELIVERED_NAV_PROJECTS = [
  { name: "Mansha Oaks", image: "/delieverd/mansha.png", href: "/mansha-oaks-4" },
  { name: "Mansha City Palwal", image: "/delieverd/mansha-city-palwal.png", href: "/mansha-city-palwal-2" },
  { name: "Mansha Royal City", image: "/delieverd/mansha-royal-city.png", href: "/mansha-royal-city" },
  { name: "Mansha Luxury Floors", image: "/delieverd/mansha-luxury-floor.png", href: "/mansha-luxury-floors" },
  { name: "Eden SLF City", image: "/delieverd/eden-city.png", href: "/eden-slf-city" },
  { name: "Mansha Indraprastha Greens", image: "/delieverd/mansha-indr-green.png", href: "/indraprastha-greens" },
  { name: "Mansha Estate", image: "/delieverd/mansha-estate.png", href: "/mansha-estate" },
  { name: "Mansha Floors", image: "/delieverd/mansha-floor.png", href: "/mansha-floors-2" },
  { name: "Mansha Model Town", image: "/delieverd/mansha-model-town.png", href: "/mansha-model-town" },
  { name: "Mansha Residency", image: "/delieverd/mansha-residence.png", href: "/mansha-residency" },
  { name: "Mansha Greens", image: "/delieverd/Logos-For-Website-11.png", href: "/mansha-greens-2" },
];

const DROPDOWN_NAV = [
  {
    id: "residential",
    label: "Residential",
    delay: "380ms",
    categories: [
      { id: "ongoing", label: "Ongoing", items: ONGOING_RESIDENTIAL },
      { id: "delivered", label: "Delivered", href: "/delivered-one-page" },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    delay: "440ms",
    categories: [
      {
        id: "delivered",
        label: "Delivered",
        items: [{ label: "Mansha vega street", href: "/vega-street" }],
      },
    ],
  },
];

const NavProjectSlider = ({ open, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setActiveIndex(0);
      return undefined;
    }

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DELIVERED_NAV_PROJECTS.length);
    }, 2800);

    return () => window.clearInterval(id);
  }, [open]);

  return (
    <div className="relative mt-8 w-full overflow-hidden">
      <p className="optima-menu-link mb-2 text-center font-montserrat text-[25px] font-medium text-black">
        Projects
      </p>
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {DELIVERED_NAV_PROJECTS.map((project) => (
          <Link
            key={project.href}
            href={project.href}
            onClick={onClose}
            className="w-full shrink-0 cursor-pointer"
          >
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-md border border-[#E0E0E0] bg-[#FAFAFA]">
              <Image
                src={project.image}
                alt={project.name}
                width={280}
                height={120}
                className="h-auto w-full object-contain"
                sizes="280px"
              />
            </div>
            <p className="optima-menu-link mt-2 text-center font-montserrat text-[18px] font-normal leading-snug text-black transition-colors hover:text-[#652A27]">
              {project.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const NavSideMenu = ({ open, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => {
      if (prev === id) {
        setOpenSubDropdown(null);
        return null;
      }
      setOpenSubDropdown(null);
      return id;
    });
  };

  const toggleSubDropdown = (sectionId, categoryId) => {
    const key = `${sectionId}-${categoryId}`;
    setOpenSubDropdown((prev) => (prev === key ? null : key));
  };
  const sidebarLinkClass = `optima-menu-link mobile-nav-item-link block cursor-pointer text-[30px] text-black ${
    open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
  }`;
  const sidebarLabelClass =
    "transition-colors duration-150 ease-out hover:text-[#652A27] text-[18px]";

  return (
    <>
      <aside
        id="mobile-navigation"
        className={`fixed right-0 top-0 z-50 flex h-screen w-[450px] max-w-[90vw] flex-col overflow-hidden bg-white p-8 transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Main mobile"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="absolute right-5 top-5 z-10 inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center text-black transition-opacity hover:text-[#652A27]"
        >
          <i className="ri-close-large-line text-[20px]" aria-hidden />
        </button>

        <div className="nav-menu-scroll mt-8 min-h-0 flex-1 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
        <nav aria-label="Sidebar menu">
          <ul className="space-y-5 pl-2 md:space-y-2 ">
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={sidebarLinkClass}
                  style={{
                    transitionDelay: open ? item.delay : "0ms",
                  }}
                >
                  <span className={sidebarLabelClass}>{item.label}</span>
                </Link>
              </li>
            ))}

            {DROPDOWN_NAV.map((section) => {
              const isOpen = openDropdown === section.id;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => toggleDropdown(section.id)}
                    className={`${sidebarLinkClass} flex w-full items-center justify-between gap-3 text-left`}
                    style={{
                      transitionDelay: open ? section.delay : "0ms",
                    }}
                    aria-expanded={isOpen}
                  >
                    <span className={sidebarLabelClass}>{section.label}</span>
                    <i
                      className={`${
                        isOpen ? "ri-subtract-line" : "ri-add-line"
                      } shrink-0 text-[22px] text-black transition-all duration-500 ease-in-out`}
                      aria-hidden
                    />
                  </button>

                  <div
                    className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-[2000px] py-3 opacity-100" : "max-h-0 pt-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-1 border-l border-[#E0E0E0] pl-4">
                      {section.categories.map((category) => {
                        const subKey = `${section.id}-${category.id}`;
                        const isSubOpen = openSubDropdown === subKey;
                        const isDelivered = category.label === "Delivered";

                        if (category.href) {
                          return (
                            <li key={subKey}>
                              <Link
                                href={category.href}
                                onClick={onClose}
                                className={`${sidebarLinkClass} !translate-x-0 !opacity-100`}
                              >
                                <span
                                  className={`${sidebarLabelClass} text-[16px] ${
                                    isDelivered
                                      ? "font-semibold text-[#652A27]"
                                      : "font-normal"
                                  }`}
                                >
                                  {category.label}
                                </span>
                              </Link>
                            </li>
                          );
                        }

                        return (
                          <li key={subKey}>
                            <button
                              type="button"
                              onClick={() => toggleSubDropdown(section.id, category.id)}
                              className={`${sidebarLinkClass} flex w-full items-center justify-between gap-3 text-left !translate-x-0 !opacity-100`}
                              aria-expanded={isSubOpen}
                            >
                              <span
                                className={`${sidebarLabelClass} text-[16px] ${
                                  isDelivered
                                    ? "font-semibold text-[#652A27]"
                                    : "font-normal"
                                }`}
                              >
                                {category.label}
                              </span>
                              <i
                                className={`${
                                  isSubOpen ? "ri-subtract-line" : "ri-add-line"
                                } shrink-0 text-[18px] text-black transition-all duration-500 ease-in-out`}
                                aria-hidden
                              />
                            </button>

                            <div
                              className={`transition-[max-height,opacity,padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isSubOpen && category.items?.length > 0
                                  ? "max-h-[500px] overflow-visible py-2 opacity-100"
                                  : "max-h-0 overflow-hidden py-0 opacity-0"
                              }`}
                            >
                              <ul className="space-y-1 border-l border-[#E0E0E0] pl-4">
                                {category.items?.map((sub, index) => (
                                  <li key={sub.label}>
                                    <Link
                                      href={sub.href}
                                      onClick={onClose}
                                      className={`optima-menu-link mobile-nav-sub-item-link block cursor-pointer text-black ${
                                        isSubOpen ? "mobile-nav-sub-item-visible" : "mobile-nav-sub-item-hidden"
                                      }`}
                                      style={{
                                        transitionDelay: isSubOpen
                                          ? `${80 + index * 100}ms`
                                          : "0ms",
                                      }}
                                    >
                                      <span
                                        className={`${sidebarLabelClass} text-[15px] font-normal`}
                                      >
                                        {sub.label}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}

            {NAV_ITEMS.slice(2, 4).map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={sidebarLinkClass}
                  style={{
                    transitionDelay: open ? item.delay : "0ms",
                  }}
                >
                  <span className={sidebarLabelClass}>{item.label}</span>
                </Link>
              </li>
            ))}

            <li>
              <Link
                href={NAV_ITEMS[4].href}
                onClick={onClose}
                className={sidebarLinkClass}
                style={{
                  transitionDelay: open ? NAV_ITEMS[4].delay : "0ms",
                }}
              >
                <span className={sidebarLabelClass}>{NAV_ITEMS[4].label}</span>
              </Link>
            </li>

            <li
              className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: open ? "920ms" : "0ms" }}
            >
              <NavProjectSlider open={open} onClose={onClose} />
            </li>
          </ul>
        </nav>

        <div className="pl-2 pb-4 pt-8">
          <a
            href={PHONE}
            className="optima-menu-link block cursor-pointer text-[18px] font-medium text-black transition-colors hover:text-[#652A27]"
          >
            {PHONE_TEXT}
          </a>
          <a
            href={EMAIL}
            className="optima-menu-link mt-3 block cursor-pointer text-[18px] font-medium text-black transition-colors hover:text-[#652A27]"
          >
            {EMAIL_TEXT}
          </a>
        </div>
        </div>
      </aside>

      <style>{`
        .nav-menu-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .nav-menu-scroll::-webkit-scrollbar {
          display: none;
        }

        .optima-menu-link {
          font-family: Optima, "Segoe UI", Candara, "Noto Sans", sans-serif;
          line-height: 1.2;
        }

        .mobile-nav-item-link {
          transition-property: transform, opacity;
          transition-duration: 700ms;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mobile-nav-sub-item-link {
          transition:
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 900ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        .mobile-nav-sub-item-hidden {
          opacity: 0;
          transform: translateX(2.5rem);
          pointer-events: none;
        }

        .mobile-nav-sub-item-visible {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </>
  );
};

export default NavSideMenu;
