"use client";

import React, { useEffect, useState } from "react";
import { JOBS } from "../common/JobApply";
import { submitCareerApplication } from "@/lib/api";
import {
  sanitizeLeadEmail,
  sanitizeLeadName,
  sanitizeLeadPhone,
  validateLeadFields,
} from "@/lib/leadValidation";

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
  const fieldErrorClass =
    "mt-1 font-montserrat text-[12px] font-medium text-red-600";
  const [designation, setDesignation] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    setCareerDesignation = setDesignation;
    return () => {
      setCareerDesignation = null;
    };
  }, []);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "name"
        ? sanitizeLeadName(value)
        : name === "mobile"
          ? sanitizeLeadPhone(value)
          : name === "email"
            ? sanitizeLeadEmail(value)
            : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nativeForm = event.currentTarget;
    setError("");

    const validation = validateLeadFields({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.mobile.trim(),
    });
    if (!validation.isValid) {
      setFieldErrors({
        name: validation.name,
        email: validation.email,
        mobile: validation.phone,
      });
      setError(validation.firstError);
      return;
    }

    const formData = new FormData(nativeForm);
    const resume = formData.get("resume");

    if (!(resume instanceof File) || !resume.size) {
      setError("Please upload your resume (PDF, DOC, or DOCX).");
      return;
    }

    setLoading(true);

    try {
      await submitCareerApplication(formData);
      nativeForm.reset();
      setDesignation("");
      setResumeName("");
      setForm({ name: "", email: "", mobile: "" });
      setFieldErrors({});
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to submit application"
      );
    } finally {
      setLoading(false);
    }
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
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={form.name}
                onChange={handleFieldChange}
                className={inputClass}
                maxLength={60}
                autoComplete="name"
                aria-invalid={Boolean(fieldErrors.name)}
                required
                disabled={loading}
              />
              {fieldErrors.name ? (
                <p className={fieldErrorClass}>{fieldErrors.name}</p>
              ) : null}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleFieldChange}
                className={inputClass}
                maxLength={80}
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                required
                disabled={loading}
              />
              {fieldErrors.email ? (
                <p className={fieldErrorClass}>{fieldErrors.email}</p>
              ) : null}
            </div>
            <div>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile *"
                value={form.mobile}
                onChange={handleFieldChange}
                className={inputClass}
                maxLength={16}
                inputMode="numeric"
                autoComplete="tel"
                aria-invalid={Boolean(fieldErrors.mobile)}
                required
                disabled={loading}
              />
              {fieldErrors.mobile ? (
                <p className={fieldErrorClass}>{fieldErrors.mobile}</p>
              ) : null}
            </div>
            <select
              name="designation"
              value={designation}
              onChange={(event) => setDesignation(event.target.value)}
              className={`${inputClass} cursor-pointer appearance-none text-[#515151]`}
              required
              disabled={loading}
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

          <label className="mt-5 flex min-h-[56px] w-full cursor-pointer flex-wrap items-center gap-2 bg-[#FAFAFA] px-5 py-3 font-montserrat text-[14px] text-[#515151]">
            <i
              className="ri-upload-2-line text-[18px] text-[#94a3b8]"
              aria-hidden
            />
            <span className="break-all">
              {resumeName || "Upload Resume * (PDF, DOC, DOCX)"}
            </span>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="hidden"
              required
              disabled={loading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                setResumeName(file?.name || "");
              }}
            />
          </label>

          {error ? (
            <p
              role="alert"
              className="mt-5 text-center font-montserrat text-[14px] font-medium text-red-600 md:text-[16px]"
            >
              {error}
            </p>
          ) : null}

          {submitted ? (
            <p className="mt-5 text-center font-montserrat text-[14px] font-medium text-[#652A27] md:text-[16px]">
              Application submitted successfully.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mx-auto mt-5 block w-full cursor-pointer rounded-md py-4 font-montserrat text-[16px] font-semibold leading-[100%] text-white transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:max-w-[280px]"
            style={{ backgroundColor: "#652A27" }}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Section3;
