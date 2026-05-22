"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const PHONE = "tel:+919876543210";
const PHONE_TEXT = "+91 98765 43210";
const EMAIL = "mailto:info@manshagroup.in";
const EMAIL_TEXT = "info@manshagroup.in";

const NAV_ITEMS = [
  { label: "Home", href: "/", delay: "200ms" },
  { label: "About", href: "/about-us", delay: "320ms" },
  { label: "Contact", href: "/contact-us", delay: "560ms" },
  { label: "Carrers", href: "careers", delay: "680ms" },
  { label: "Blogs", href: "/blog", delay: "800ms" },
];

const ONGOING_RESIDENTIAL = [
  { label: "Mansha Heritage", href: "/mansha-heritage" },
  { label: "Mansha Orchid", href: "/mansha-orchid" },
  { label: "Aagman by mansha", href: "/aagman-by-mansha" },
  { label: "Mansha Oasis", href: "/mansha-oasis" },
];

const DROPDOWN_NAV = [
  {
    id: "residential",
    label: "Residential",
    delay: "380ms",
    categories: [
      { id: "ongoing", label: "Ongoing", items: ONGOING_RESIDENTIAL },
      { id: "delivered", label: "Delivered", items: [] },
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
        className={`fixed right-0 top-0 z-50 flex h-screen w-[450px] max-w-[90vw] flex-col bg-white p-8 transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Main mobile"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="absolute right-5 top-5 inline-flex h-9 w-9 cursor-pointer items-center justify-center text-black transition-opacity hover:opacity-70"
        >
          <i className="ri-close-large-line text-[20px]" aria-hidden />
        </button>
{/* 
        <div className="flex justify-center">
          <Link href="/" onClick={onClose}>
            <Image
              src="/mansha-svg/mansha-logo.svg"
              width={100}
              height={56}
              alt="Mansha"
              className="h-auto w-[100px]"
            />
          </Link>
        </div> */}

        <nav className="mt-8" aria-label="Sidebar menu">
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
                      isOpen ? "max-h-[28rem] py-3 opacity-100" : "max-h-0 pt-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-1 border-l border-[#E0E0E0] pl-4">
                      {section.categories.map((category) => {
                        const subKey = `${section.id}-${category.id}`;
                        const isSubOpen = openSubDropdown === subKey;
                        const isDelivered = category.label === "Delivered";

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
                                isSubOpen && category.items.length > 0
                                  ? "max-h-56 overflow-visible py-2 opacity-100"
                                  : "max-h-0 overflow-hidden py-0 opacity-0"
                              }`}
                            >
                              <ul className="space-y-1 border-l border-[#E0E0E0] pl-4">
                                {category.items.map((sub, index) => (
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

            {NAV_ITEMS.slice(2).map((item) => (
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
          </ul>
        </nav>

        <div className="mt-auto pl-2 pt-8">
          <a
            href={PHONE}
            className="optima-menu-link block cursor-pointer text-[22px] font-medium text-black transition-colors hover:text-[#652A27]"
          >
            {PHONE_TEXT}
          </a>
          <a
            href={EMAIL}
            className="optima-menu-link mt-3 block cursor-pointer text-[22px] font-medium text-black transition-colors hover:text-[#652A27]"
          >
            {EMAIL_TEXT}
          </a>
        </div>
      </aside>

      <style>{`
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
