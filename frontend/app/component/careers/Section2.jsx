"use client";

import { useState } from "react";
import JobApply, { JOBS } from "../common/JobApply";


const inputClass =
  "h-[56px] w-full bg-[#FAFAFA] px-5 font-montserrat text-[14px] font-normal leading-[24px] text-[#515151] outline-none placeholder:text-[#515151]";

const Section2 = () => {
  const [designation, setDesignation] = useState("");

  const handleApplyForm = (title) => {
    setDesignation(title);
    setTimeout(() => {
      document.getElementById("career-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="bg-[#f8fafc] mx-auto w-full max-w-[1500px] ">
      <div className="mx-auto max-w-8xl px-5 py-[35px] lg:px-[75px] lg:py-[70px]">
        <h2 className="mb-8 font-optima text-[28px] font-medium capitalize leading-[1.2] text-[#111111] md:mb-10 md:text-[36px]">
          Careers
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {JOBS.map((job) => (
            <div
              key={job.id}
              className="career-job-card flex min-h-[120px] flex-col rounded-[10px] bg-white"
              style={{ boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2)" }}
            >
              <div className="flex flex-1 flex-col justify-center px-6 py-7 sm:px-7 sm:py-6 gap-x-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-optima text-[17px] font-medium leading-[1.4] text-[#334155] sm:text-[18px] lg:text-[19px]">
                    {job.title}
                  </h3>
                  <JobApply job={job} onApplyForm={handleApplyForm} />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-5">
                  <p className="flex items-center gap-1.5 font-montserrat text-[14px] font-normal leading-none text-[#64748b]">
                    <i
                      className="ri-briefcase-line text-[15px] leading-none text-[#94a3b8]"
                      aria-hidden
                    />
                    {job.experience}
                  </p>
                  <p className="flex items-center gap-1.5 font-montserrat text-[14px] font-normal leading-none text-[#64748b]">
                    <i
                      className="ri-time-line text-[15px] leading-none text-[#94a3b8]"
                      aria-hidden
                    />
                    Full Time
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="career-form" className="mx-auto mt-12 max-w-[900px] scroll-mt-24 text-center md:mt-16">
          <h3 className="font-optima text-[24px] font-medium capitalize leading-[1.2] text-[#111111] md:text-[32px]">
            Career Application Form
          </h3>
          <p className="mx-auto mt-3 max-w-[640px] font-montserrat text-[14px] font-normal leading-[1.65] text-[#64748b] md:mt-4 md:text-[16px] md:leading-[26px]">
          Take the next step in your career with a team that values growth, passion, and performance.
          </p>
          {/* <div className="mx-auto mt-4 h-px w-full max-w-[1030px] bg-[#E5E5E5]" aria-hidden /> */}

          <form className="mt-8 w-full rounded-xl bg-white p-5 text-left shadow-[0px_4px_16px_0px_#0000001A] md:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                className={inputClass}
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile *"
                className={inputClass}
              />
              <select
                name="designation"
                value={designation}
                onChange={(event) => setDesignation(event.target.value)}
                className={`${inputClass} cursor-pointer appearance-none text-[#515151]`}
              >
                <option value="" disabled>
                  Designation *
                </option>
                {JOBS.map((job) => (
                  <option key={job.id} value={job.title}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            <label className="mt-5 flex h-[56px] w-full cursor-pointer items-center gap-2 bg-[#FAFAFA] px-5 font-montserrat text-[14px] text-[#515151]">
              <i className="ri-upload-2-line text-[18px] text-[#94a3b8]" aria-hidden />
              Upload Resume * (PDF, DOC, DOCX)
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
            </label>

            <button
              type="button"
              className="mx-auto mt-5 block w-full cursor-pointer rounded-md py-4 font-montserrat text-[16px] font-semibold leading-[100%] text-white transition-opacity duration-300 hover:opacity-90 md:max-w-[280px]"
              style={{ backgroundColor: "#652A27" }}
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .career-job-card {
          transition: box-shadow 0.3s ease;
        }

        .career-job-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </section>
  );
};

export default Section2;
