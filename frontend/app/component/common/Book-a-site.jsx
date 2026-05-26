"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PROJECT_OPTIONS = [
  "Mansha Vega Street",
  "Aagman By Mansha",
  "Mansha Oasis",
];

const PROJECT_SLIDES = [
  {
    name: "Mansha Vega Street",
    location: "Sector 82, Faridabad",
    description:
      "Premium commercial destination in Greater Faridabad — fully operational with high-street retail and office spaces.",
  },
  {
    name: "Aagman By Mansha",
    location: "Delhi NCR",
    description:
      "Thoughtfully planned residences with modern design, comfort, and excellent connectivity for everyday living.",
  },
  {
    name: "Mansha Oasis",
    location: "Faridabad",
    description:
      "A serene residential community crafted with green spaces, quality construction, and long-term value.",
  },
];

const labelClass = "mb-1.5 block font-montserrat text-[13px] font-semibold text-[#111111]";
const inputClass =
  "h-[48px] w-full rounded-lg border border-[#E5E5E5] bg-white px-3.5 font-montserrat text-[14px] font-normal text-[#111111] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#111111]/30";

const BookASite = ({ open, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: PROJECT_OPTIONS[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const slideCount = PROJECT_SLIDES.length;

  const goToPrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slideCount);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const scrollY = window.scrollY;
    document.body.classList.add("overflow-hidden");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setSlideIndex(0);
      return undefined;
    }

    const onKeyUp = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const id = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideCount);
    }, 4500);

    return () => window.clearInterval(id);
  }, [open, slideCount]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      onClick={onClose}
      role="presentation"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]" aria-hidden />

      <div
        className="relative flex max-h-[92vh] w-full max-w-[960px] overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.2)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-site-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#64748b] transition-colors hover:text-[#111111] md:left-4 md:right-auto"
          aria-label="Close"
        >
          <i className="ri-close-line text-[22px] leading-none" aria-hidden />
        </button>

        {/* Left — form */}
        <div className="flex max-h-[92vh] w-full flex-col overflow-y-auto md:w-1/2">
          <div className="flex flex-1 flex-col justify-center px-8 py-10 sm:px-10 sm:py-12">
            {submitted ? (
              <div className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5] text-[#652A27]">
                  <i className="ri-check-line text-[28px]" aria-hidden />
                </span>
                <h3 className="mt-5 font-optima text-[26px] font-medium text-[#111111]">Thank you!</h3>
                <p className="mt-2 font-montserrat text-[14px] leading-relaxed text-[#6B7280]">
                  We have received your request. Our team will contact you soon.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 h-[48px] w-full cursor-pointer rounded-lg bg-[#111111] font-montserrat text-[15px] font-semibold text-white transition-colors hover:bg-[#333333]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2
                  id="book-site-title"
                  className="font-optima text-[28px] font-medium leading-tight text-[#111111] sm:text-[32px]"
                >
                  Book A Site Visit
                </h2>
                <p className="mt-2 font-montserrat text-[14px] leading-relaxed text-[#6B7280]">
                  Share your details and our team will confirm your visit shortly.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="book-name" className={labelClass}>
                        Full Name
                      </label>
                      <input
                        id="book-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="book-phone" className={labelClass}>
                        Phone No
                      </label>
                      <input
                        id="book-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="book-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="book-email"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="book-project" className={labelClass}>
                        Project
                      </label>
                      <select
                        id="book-project"
                        name="project"
                        value={form.project}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer appearance-none`}
                      >
                        {PROJECT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="book-message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="book-message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Any specific requirements..."
                      className="w-full resize-none rounded-lg border border-[#E5E5E5] bg-white px-3.5 py-3 font-montserrat text-[14px] font-normal text-[#111111] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#111111]/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 h-[48px] w-full cursor-pointer rounded-lg bg-[#111111] font-montserrat text-[15px] font-semibold text-white transition-colors hover:bg-[#333333]"
                  >
                    Submit Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Right — image + glass card */}
        <div className="relative hidden min-h-[520px] w-1/2 overflow-hidden md:block">
          <Image
            src="/mansha-image/residentail.jpg"
            alt="Mansha property"
            fill
            className="object-cover"
            sizes="480px"
          />

          <div className="absolute inset-0 flex items-center justify-center p-10">
            <div className="relative w-full max-w-[420px] overflow-hidden border border-white/25 bg-white/15 p-7 shadow-lg backdrop-blur-xl">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                Our Projects
              </p>

              <div className="mt-3 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                >
                  {PROJECT_SLIDES.map((slide) => (
                    <div key={slide.name} className="w-full shrink-0">
                      <h3 className="font-optima text-[24px] font-medium leading-snug text-white">
                        {slide.name}
                      </h3>
                      <p className="mt-1 font-montserrat text-[13px] text-white/75">
                        {slide.location}
                      </p>
                      <p className="mt-4 font-montserrat text-[15px] leading-relaxed text-white/95">
                        {slide.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={goToPrevSlide}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/25"
                  aria-label="Previous project"
                >
                  <i className="ri-arrow-left-line text-[18px]" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goToNextSlide}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/25"
                  aria-label="Next project"
                >
                  <i className="ri-arrow-right-long-line text-[18px]" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm">
            <span className="font-montserrat text-[11px] text-white/80">Presented by</span>
            <Image
              src="/mansha-svg/mansha-logo.svg"
              width={72}
              height={32}
              alt="Mansha"
              className="h-6 w-auto brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BookASite;
