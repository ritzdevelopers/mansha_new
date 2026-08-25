"use client";

import { useState } from "react";
import { submitEnquireData } from "@/lib/api";

const PROJECT_NAME = "Upcoming Project — Sector 104 Faridabad";

const inputClass =
  "h-[48px] w-full rounded-lg border border-[#E5E5E5] bg-white px-3.5 font-montserrat text-[14px] text-[#111111] outline-none placeholder:text-[#9CA3AF] focus:border-[#652A27]/30";

export default function UpcomingNotify() {
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
      await submitEnquireData({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        project: PROJECT_NAME,
        message: form.message.trim() || "Notify me when Sector 104 launches.",
      });
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Could not submit. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#FAFAFA] py-[35px] lg:py-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <p className="font-montserrat text-[16px] font-normal capitalize leading-[100%] text-[#333333]">
          Home | Upcoming Project |{" "}
          <span className="font-semibold text-[#652A27]">Sector-104 Faridabad</span>
        </p>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="font-montserrat text-[14px] font-medium uppercase tracking-[0.18em] text-[#652A27]">
              Coming Soon
            </p>
            <h1 className="mt-4 font-optima text-[28px] font-[550] capitalize leading-[30px] text-[#000000] md:leading-[40px] xl:text-[36px] xl:leading-[54px]">
              A Different View Lies Ahead
            </h1>
            <p className="mt-3 font-optima text-[20px] capitalize text-[#652A27] xl:text-[24px]">
              Next Shift Is In Sight
            </p>
            <p className="mt-5 font-montserrat text-[14px] font-normal capitalize leading-[25px] text-[#333333] xl:mt-7 xl:text-[16px] xl:leading-[28px]">
              Mansha Group presents an upcoming residential address in Sector-104,
              Faridabad. A refined viewpoint over the city, imagined for those who
              look ahead. Project details will be shared as the launch draws closer.
            </p>
            <p className="mt-4 font-montserrat text-[13px] text-[#666666]">
              Artistic image
            </p>
          </div>

          <div>
            <h2 className="font-optima text-[24px] font-medium capitalize text-[#111111] xl:text-[28px]">
              Register your interest
            </h2>
            <p className="mt-2 font-montserrat text-[14px] leading-[24px] text-[#666666]">
              Leave your details and we will reach out when Sector-104 Faridabad is ready to be revealed.
            </p>

            {submitted ? (
              <p className="mt-6 font-montserrat text-[15px] leading-7 text-[#2E7D32]">
                Thank you. We have your interest for Sector 104 and will be in touch as the project is announced.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                {error ? (
                  <p className="font-montserrat text-sm text-[#C62828]">{error}</p>
                ) : null}
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClass}
                />
                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className={inputClass}
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={inputClass}
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="min-h-[90px] w-full rounded-lg border border-[#E5E5E5] bg-white px-3.5 py-3 font-montserrat text-[14px] text-[#111111] outline-none placeholder:text-[#9CA3AF] focus:border-[#652A27]/30"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer rounded-full bg-[#652A27] px-7 py-3 font-montserrat text-[14px] text-white transition hover:bg-[#4A1F1F] disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Notify me"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
