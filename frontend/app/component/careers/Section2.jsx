"use client";

import { useState } from "react";
import JobApply, { JOBS } from "../common/JobApply";
import { handleCareerApply } from "./Section3";




const Section2 = () => {
  

  return (
    <section className="bg-[#F9F9F9] mx-auto w-full max-w-[1500px] ">
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
                  <JobApply job={job} onApplyForm={handleCareerApply} />
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
