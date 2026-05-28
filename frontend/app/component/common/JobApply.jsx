"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const JOBS = [
  {
    id: 1,
    title: "Sales Manager",
    experience: "2 Years",
    description: [
      "We are looking for a Sales Manager to lead our sales team and drive property sales for Mansha Group projects.",
      "Key Responsibilities:",
      "• Lead and mentor the sales team to achieve monthly and quarterly targets",
      "• Build and maintain relationships with clients, brokers, and channel partners",
      "• Oversee site visits, negotiations, and deal closures",
      "Requirements:",
      "• 2+ years experience in real estate or sales management",
      "• Strong leadership, communication, and negotiation skills",
    ],
  },
  {
    id: 2,
    title: "Senior Sales Executive",
    experience: "1.5 Years",
    description: [
      "Join our sales team as a Senior Sales Executive to convert leads and close property deals.",
      "Key Responsibilities:",
      "• Handle inbound and outbound sales enquiries for residential and commercial projects",
      "• Conduct site visits and follow up with prospective buyers",
      "• Coordinate with internal teams for documentation and handover",
      "Requirements:",
      "• 1.5+ years experience in real estate sales",
      "• Proven track record of achieving sales targets",
    ],
  },
  {
    id: 3,
    title: "Telecaller / CRM Executive",
    experience: "1 Year",
    description: [
      "We are hiring a Telecaller / CRM Executive to manage lead calling and CRM updates.",
      "Key Responsibilities:",
      "• Make outbound calls to leads and schedule site visits for the sales team",
      "• Update lead status, follow-ups, and interactions in CRM",
      "• Qualify leads and pass hot prospects to senior sales executives",
      "Requirements:",
      "• 1+ year experience in telecalling or CRM operations",
      "• Good communication skills in Hindi and English",
    ],
  },
  {
    id: 4,
    title: "Business Development Executive (BDE)",
    experience: "1.5 Years",
    description: [
      "Drive new business opportunities and partnerships as a Business Development Executive.",
      "Key Responsibilities:",
      "• Identify and develop new business channels and partnership opportunities",
      "• Build relationships with brokers, corporates, and referral partners",
      "• Support market research and expansion initiatives",
      "Requirements:",
      "• 1.5+ years experience in business development or channel sales",
      "• Strong networking and presentation skills",
    ],
  },
  {
    id: 5,
    title: "Digital Marketing Executive",
    experience: "1 Year",
    description: [
      "We are looking for a Digital Marketing Executive to manage online campaigns for Mansha Group.",
      "Key Responsibilities:",
      "• Plan and execute digital campaigns across Google, Meta, and other platforms",
      "• Monitor campaign performance and optimize for lead generation",
      "• Coordinate with sales team on lead quality and conversion tracking",
      "Requirements:",
      "• 1+ year experience in digital marketing",
      "• Familiarity with Google Ads, Meta Ads, and analytics tools",
    ],
  },
  {
    id: 6,
    title: "Social Media Manager",
    experience: "1.5 Years",
    description: [
      "Lead Mansha Group's social media presence and brand engagement across platforms.",
      "Key Responsibilities:",
      "• Manage content calendar and posting across Instagram, Facebook, LinkedIn, and YouTube",
      "• Create engaging posts, reels, and stories for property launches and brand campaigns",
      "• Track engagement metrics and grow audience reach",
      "Requirements:",
      "• 1.5+ years experience in social media management",
      "• Strong content creation and brand communication skills",
    ],
  },
];

const modalStyle = {
  maxWidth: "calc(100vw - 32px)",
  borderRadius: "15px",
};
const btnStyle = {
  backgroundColor: "#652A27",
  border: "1px solid #652A27",
};

const ApplyButton = ({ onClick, className = "" }) => {
  const btnClass = `career-apply-btn group relative isolate inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-md px-4 py-3 font-montserrat text-[13px] font-semibold uppercase tracking-[0.08em] ${className}`;

  const content = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 h-full w-full origin-left -translate-x-full rounded-md bg-white transition-transform duration-300 ease-out group-hover:translate-x-0"
      />
      <span className="career-apply-btn-text relative z-10 flex items-center gap-1.5">
        Apply Now
        <i className="ri-arrow-right-line text-[15px] leading-none" aria-hidden />
      </span>
    </>
  );

  return (
    <button type="button" onClick={onClick} className={btnClass} style={btnStyle}>
      {content}
    </button>
  );
};

const JobApply = ({ job, onApplyForm }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const scrollY = window.scrollY;
    document.documentElement.classList.add("career-modal-open");
    document.body.classList.add("career-modal-open", "overflow-hidden");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.documentElement.classList.remove("career-modal-open");
      document.body.classList.remove("career-modal-open", "overflow-hidden");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    const onKeyUp = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, []);

  const handleFormApply = () => {
    setOpen(false);
    onApplyForm?.(job.title);
  };

  const modalContent =
    open && mounted
      ? createPortal(
          <div
            data-career-modal-root
            className="career-modal-root fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 99999 }}
            onClick={() => setOpen(false)}
            role="presentation"
          >
            <div className="career-modal-overlay absolute inset-0" aria-hidden />
            <div
              className="career-modal-panel relative flex max-h-[90vh] w-full overflow-hidden bg-white shadow-xl sm:w-[700px] md:w-[1000px] lg:max-h-none"
              style={modalStyle}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="career-modal-title"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-20 mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#64748b] transition-colors hover:bg-white hover:text-[#334155]"
                aria-label="Close"
              >
                <i className="ri-close-line text-[22px] leading-none" aria-hidden />
              </button>

              <div className="relative hidden min-h-[420px] w-[350px] shrink-0 overflow-hidden rounded-l-[15px] sm:block md:hidden lg:block">
                <Image
                  src="/carrer/career-banner.png"
                  alt="Careers at Mansha"
                  fill
                  className="object-cover"
                  sizes="350px"
                />
              </div>

              <div className="flex max-h-[90vh] min-h-[420px] w-full flex-col overflow-hidden rounded-[15px] sm:w-[350px] sm:rounded-r-[15px] sm:rounded-l-none md:w-full lg:w-[650px] lg:max-h-none lg:rounded-l-none lg:rounded-r-[15px]">
                <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-8 text-left sm:px-7 sm:pt-10 sm:pb-6 lg:overflow-y-visible">
                  <Image
                    src="/mansha-svg/mansha-logo.svg"
                    width={90}
                    height={60}
                    alt="Mansha"
                    className="hidden h-10 w-auto sm:block"
                  />

                  <h3
                    id="career-modal-title"
                    className="mt-2 font-optima text-[18px] md:text-[15px] font-medium leading-[1.35] text-[#111111] md:text-[20px]"
                  >
                    {job.title}
                  </h3>
                  <p className="mt-0 font-montserrat text-[14px] font-normal leading-[1.65] tracking-wide text-[#64748b]">
                    Join Mansha Group and build your career in real estate
                  </p>

                  <div className="mt-2 flex flex-col items-start gap-1">
                    <p className="flex items-center gap-1.5 font-montserrat text-[15px] text-[#64748b]">
                      <i className="ri-briefcase-line text-[14px] text-[#94a3b8]" aria-hidden />
                      {job.experience}
                    </p>
                    <p className="flex items-center gap-1.5 font-montserrat text-[15px] text-[#64748b]">
                      <i className="ri-time-line text-[14px] text-[#94a3b8]" aria-hidden />
                      Full Time
                    </p>
                  </div>

                  <div className="mt-0 xl:mt-3 w-full pt-2 text-left">
                    <h4 className="font-optima text-[15px] font-semibold tracking-wide text-[#652A27]">
                      Job Description
                    </h4>
                    <div className="mt-2 space-y-1">
                      {job.description.map((line, index) => (
                        <p
                          key={index}
                          className={`font-montserrat text-[14px] leading-normal text-[#475569] ${
                            line.endsWith(":") ? "mt-2 font-semibold text-[#334155]" : ""
                          }`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 shrink-0 bg-white px-6 py-5 sm:px-7">
                  <ApplyButton onClick={handleFormApply} className="mt-0" />
                  {/* <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-4 block cursor-pointer font-montserrat text-[14px] text-[#64748b] underline underline-offset-2 transition-colors hover:text-[#334155]"
                  >
                    No Thanks
                  </button> */}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div
        className="career-job-arrow flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center transition-transform duration-300 hover:translate-x-1"
        style={{
          backgroundColor: "rgb(101, 42, 39)",
          borderRadius: "50%",
        }}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View ${job.title} details`}
      >
        <i className="ri-arrow-right-up-long-line text-[18px] leading-none text-white" aria-hidden />
      </div>
      {modalContent}

      <style>{`
        .career-modal-root {
          isolation: isolate;
        }

        .career-modal-overlay {
          background-color: rgba(0, 0, 0, 0.88);
        }

        html.career-modal-open,
        html.career-modal-open body {
          overflow: hidden !important;
        }

        html.career-modal-open body > *:not([data-career-modal-root]) {
          pointer-events: none;
        }

        .career-apply-btn-text {
          color: #ffffff;
          transition: color 0.3s ease;
        }

        .career-apply-btn-text i {
          color: #ffffff;
          transition: color 0.3s ease;
        }

        .career-apply-btn:hover .career-apply-btn-text,
        .career-apply-btn:hover .career-apply-btn-text i {
          color: rgb(101, 42, 39);
        }
      `}</style>
    </>
  );
};

export default JobApply;
