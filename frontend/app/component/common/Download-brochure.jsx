"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { submitBrochureData } from "@/lib/api";
import {
  sanitizeLeadEmail,
  sanitizeLeadName,
  sanitizeLeadPhone,
  validateLeadFields,
} from "@/lib/leadValidation";

const labelClass = "mb-1.5 block font-montserrat text-[13px] font-semibold text-[#111111]";
const inputClass =
  "h-[48px] w-full rounded-lg border border-[#E5E5E5] bg-white px-3.5 font-montserrat text-[14px] font-normal text-[#111111] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#111111]/30";
const fieldErrorClass = "mt-1 font-montserrat text-[12px] font-medium text-red-600";

const triggerBrochureDownload = (brochurePath, downloadName) => {
  const link = document.createElement("a");
  link.href = encodeURI(brochurePath);
  link.download = downloadName;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const DownloadBrochure = ({
  open,
  onClose,
  projectName = "Mansha Oasis",
  brochurePath = "/Oasis-Brochure-final( print).pdf",
  brochureFileName = "Mansha-Oasis-Brochure.pdf",
}) => {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

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
      setLoading(false);
      setError("");
      setFieldErrors({});
      return undefined;
    }

    const onKeyUp = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, [open, onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "name"
        ? sanitizeLeadName(value)
        : name === "phone"
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
    setError("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      project: projectName,
    };
    const validation = validateLeadFields({ ...payload, requireProject: true });
    if (!validation.isValid) {
      setFieldErrors({
        name: validation.name,
        email: validation.email,
        phone: validation.phone,
      });
      setError(validation.firstError);
      return;
    }

    setLoading(true);

    try {
      await submitBrochureData(payload);
      triggerBrochureDownload(brochurePath, brochureFileName);
      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        email: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to submit request"
      );
    } finally {
      setLoading(false);
    }
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
        className="relative w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.2)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-brochure-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#64748b] transition-colors hover:text-[#111111]"
          aria-label="Close"
        >
          <i className="ri-close-line text-[22px] leading-none" aria-hidden />
        </button>

        <div className="px-8 py-10">
          {submitted ? (
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5] text-[#652A27]">
                <i className="ri-check-line text-[28px]" aria-hidden />
              </span>
              <h3 className="mt-5 font-optima text-[24px] font-medium text-[#111111]">Thank you!</h3>
              <p className="mt-2 font-montserrat text-[14px] leading-relaxed text-[#6B7280]">
                Your brochure download has started.
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
                id="download-brochure-title"
                className="pr-8 font-optima text-[26px] font-medium leading-tight text-[#111111]"
              >
                Download Brochure
              </h2>

              {error ? (
                <p
                  role="alert"
                  className="mt-4 rounded-lg bg-red-50 px-3 py-2 font-montserrat text-[13px] text-red-600"
                >
                  {error}
                </p>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="brochure-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="brochure-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`${inputClass} ${fieldErrors.name ? "border-red-400" : ""}`}
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
                  <label htmlFor="brochure-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="brochure-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className={`${inputClass} ${fieldErrors.email ? "border-red-400" : ""}`}
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
                  <label htmlFor="brochure-phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="brochure-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91"
                    className={`${inputClass} ${fieldErrors.phone ? "border-red-400" : ""}`}
                    maxLength={16}
                    inputMode="numeric"
                    autoComplete="tel"
                    aria-invalid={Boolean(fieldErrors.phone)}
                    required
                    disabled={loading}
                  />
                  {fieldErrors.phone ? (
                    <p className={fieldErrorClass}>{fieldErrors.phone}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="brochure-project" className={labelClass}>
                    Project
                  </label>
                  <input
                    id="brochure-project"
                    type="text"
                    name="project"
                    value={projectName}
                    readOnly
                    className={`${inputClass} cursor-default bg-[#F5F5F5] text-[#515151]`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 h-[48px] w-full cursor-pointer rounded-lg bg-[#652A27] font-montserrat text-[15px] font-semibold text-white transition-colors hover:bg-[#4f201e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Download Brochure"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DownloadBrochure;
