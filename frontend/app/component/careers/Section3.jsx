"use client";

import React, { useEffect, useState } from "react";
import { JOBS } from "../common/JobApply";

let setCareerDesignation = null;

export function handleCareerApply(title) {
  setCareerDesignation?.(title);
  setTimeout(() => {
    document.getElementById("career-form")?.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

const Section3 = () => {
  const inputClass =
    "h-[56px] w-full bg-[#FAFAFA] px-5 font-montserrat text-[14px] font-normal leading-[24px] text-[#515151] outline-none placeholder:text-[#515151]";
  const [designation, setDesignation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCareerDesignation = setDesignation;
    return () => {
      setCareerDesignation = null;
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const resume = formData.get("resume");

    if (!(resume instanceof File) || !resume.size) {
      return;
    }

    setSubmitted(true);
    event.currentTarget.reset();
    setDesignation("");
  };

  return (
    <>
      <div
        id="career-form"
        className="mx-auto mt-12 max-w-[900px] scroll-mt-24 text-center md:mt-16"
      >
        <h3 className="font-optima text-[24px] font-medium capitalize leading-[1.2] text-[#111111] md:text-[32px]">
          Career Application Form
        </h3>
        <p className="mx-auto mt-3 max-w-[640px] font-montserrat text-[14px] font-normal leading-[1.65] text-[#64748b] md:mt-4 md:text-[16px] md:leading-[26px]">
          Take the next step in your career with a team that values growth,
          passion, and performance.
        </p>

        <form
          className="mt-8 w-full rounded-xl bg-white p-5 text-left shadow-[0px_4px_16px_0px_#0000001A] md:p-6"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Name *"
              className={inputClass}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              className={inputClass}
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile *"
              className={inputClass}
              required
            />
            <select
              name="designation"
              value={designation}
              onChange={(event) => setDesignation(event.target.value)}
              className={`${inputClass} cursor-pointer appearance-none text-[#515151]`}
              required
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
            <i
              className="ri-upload-2-line text-[18px] text-[#94a3b8]"
              aria-hidden
            />
            Upload Resume * (PDF, DOC, DOCX)
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="hidden"
              required
            />
          </label>

          {submitted ? (
            <p className="mt-5 text-center font-montserrat text-[14px] font-medium text-[#652A27] md:text-[16px]">
              Application submitted successfully.
            </p>
          ) : null}

          <button
            type="submit"
            className="mx-auto mt-5 block w-full cursor-pointer rounded-md py-4 font-montserrat text-[16px] font-semibold leading-[100%] text-white transition-opacity duration-300 hover:opacity-90 md:max-w-[280px]"
            style={{ backgroundColor: "#652A27" }}
          >
            Submit Application
          </button>
        </form>
      </div>
    </>
  );
};

export default Section3;
