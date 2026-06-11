"use client";

import Image from "next/image";
import React, { useState } from "react";
import { submitContactData } from "@/lib/api";

const CONTACT_ITEMS = [
  {
    icon: "/contact-image/customer-support.svg",
    title: "Customer Support",
    lines: ["info@manshagroup.in", "+91- 8010003838"],
  },
  {
    icon: "/contact-image/sale-enquiry.svg",
    title: "Sales Enquiries",
    lines: ["Call:", "+91- 8010003838", "email:", "info@manshagroup.in"],
  },
  {
    icon: "/contact-image/press.svg",
    title: "For Press / Media Queries:",
    lines: ["Call:", "+91- 8010003838", "mail:", "info@manshagroup.in"],
  },
];

const CONTACT_LABELS = new Set(["Call:", "email:", "mail:"]);

const inputClass =
  "h-[56px] w-full bg-[#FAFAFA] px-5 font-montserrat text-[14px] font-normal leading-[24px] text-[#515151] outline-none placeholder:text-[#515151]";

const Touch = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await submitContactData({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });
      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to submit form"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white pb-[0px] lg:pb-[0px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[75px]">
        <div>
          <h2 className="text-center font-optima text-[28px] font-[500] leading-[100%] tracking-normal text-[#111111] md:text-left md:text-[36px]">
            Get In Touch
          </h2>
          <div
            className="mt-2 h-px w-full max-w-[1030px] bg-[#E5E5E5] md:mt-4"
            aria-hidden
          />
          <p className="mt-5 max-w-[1080px] text-center font-montserrat text-[14px] font-normal capitalize leading-[24px] tracking-normal text-[#515151] md:text-left">
            Reach out to our team for expert advice, quick responses, and
            seamless support for your needs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-12">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl bg-white p-5 shadow-[0px_4px_16px_0px_#7F7F7F40] md:p-6 xl:px-5 xl:py-13"
          >
            {submitted ? (
              <p className="rounded-md bg-[#652A27]/10 px-4 py-3 text-center font-montserrat text-[14px] font-medium text-[#652A27]">
                Thank you! We have received your message and will contact you
                soon.
              </p>
            ) : null}

            {error ? (
              <p
                role="alert"
                className="mb-4 rounded-md bg-red-50 px-4 py-3 text-center font-montserrat text-[14px] text-red-600"
              >
                {error}
              </p>
            ) : null}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                required
                disabled={loading}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone No *"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                required
                disabled={loading}
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                required
                disabled={loading}
              />
            </div>

            <textarea
              name="message"
              placeholder="Message *"
              rows={3}
              value={form.message}
              onChange={handleChange}
              className="mt-5 w-full resize-none bg-[#FAFAFA] px-5 py-4 font-montserrat text-[14px] font-normal leading-[24px] text-[#515151] outline-none placeholder:text-[#515151]"
              required
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full cursor-pointer rounded-md bg-[#652A27] py-4 font-montserrat text-[16px] font-semibold leading-[100%] text-white transition-colors duration-300 hover:bg-[#4f201e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Get a Call Back"}
            </button>
          </form>

          <div className="relative mx-auto h-[260px] w-full max-w-[500px] lg:h-[310px]">
            <Image
              src="/contact-image/touch-section.jpg"
              alt="Construction planning discussion"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 36vw"
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-10 lg:gap-6 xl:mt-25 xl:grid-cols-3 xl:gap-8">
          {CONTACT_ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-6">
              <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_4px_16px_0px_#0000001A]">
                <Image
                  src={item.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                  aria-hidden
                />
              </div>

              <div>
                <h3
                  className={`font-montserrat text-[18px] font-medium leading-[100%] tracking-normal text-[#111111] md:text-[20px] ${
                    item.title === "For Press / Media Queries:"
                      ? "md:whitespace-nowrap"
                      : ""
                  }`}
                >
                  {item.title}
                </h3>

                <div className="mt-3 font-montserrat text-[16px] font-normal leading-[25px] tracking-normal text-[#515151]">
                  {item.lines.map((line, index) => {
                    if (CONTACT_LABELS.has(line)) {
                      const value = item.lines[index + 1];

                      return (
                        <React.Fragment key={`${item.title}-${line}`}>
                          <p className="hidden font-semibold leading-[25px] text-[#515151] lg:block">
                            {line}
                          </p>
                          <p className="hidden lg:block">{value}</p>
                          <p className="lg:hidden">
                            <span className="font-semibold leading-[25px] text-[#515151]">
                              {line}
                            </span>{" "}
                            {value}
                          </p>
                        </React.Fragment>
                      );
                    }

                    if (CONTACT_LABELS.has(item.lines[index - 1])) {
                      return null;
                    }

                    return <p key={`${item.title}-${line}`}>{line}</p>;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Touch;
