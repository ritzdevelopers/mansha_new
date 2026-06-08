"use client";

import { useState } from "react";
import { authApi } from "@/lib/api";

const inputClass =
  "w-full rounded-lg border border-[#DDDDDD] bg-white px-4 py-3 font-montserrat text-[14px] text-[#333333] outline-none transition focus:border-[#652A27]";

export default function DashboardAuth({ onSuccess }) {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === "login") {
        const data = await authApi.login({
          email: form.email,
          password: form.password,
        });
        onSuccess(data.user);
      } else {
        const data = await authApi.register(form);
        setMessage(data.message);
        setMode("login");
        setForm({ name: "", email: form.email, password: "" });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-[#DDDDDD] bg-white p-6 shadow-[0px_4px_20px_0px_#C4C4C429] md:p-8">
      <h1 className="text-center font-optima text-[28px] font-medium capitalize text-[#111111] md:text-[32px]">
        Dashboard
      </h1>
      <p className="mt-2 text-center font-montserrat text-[14px] text-[#666666]">
        {mode === "login"
          ? "Login to access your dashboard"
          : "Register — Super Admin will assign your role"}
      </p>

      <div className="mt-6 flex rounded-full border border-[#DDDDDD] p-1">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError("");
            setMessage("");
          }}
          className={`flex-1 rounded-full py-2 font-montserrat text-[14px] transition ${
            mode === "login"
              ? "bg-[#652A27] text-white"
              : "text-[#333333]"
          }`}
        >
          Login
        </button>   
        <button
          type="button"
          onClick={() => {
            setMode("register");
            setError("");
            setMessage("");
          }}
          className={`flex-1 rounded-full py-2 font-montserrat text-[14px] transition ${
            mode === "register"
              ? "bg-[#652A27] text-white"
              : "text-[#333333]"
          }`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === "register" && (
          <div>
            <label className="mb-1 block font-montserrat text-[13px] text-[#333333]">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Enter your name"
            />
          </div>
        )}

        <div>
          <label className="mb-1 block font-montserrat text-[13px] text-[#333333]">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="mb-1 block font-montserrat text-[13px] text-[#333333]">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className={inputClass}
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-[#652A27]/10 px-3 py-2 font-montserrat text-[13px] text-[#652A27]">
            {error}
          </p>
        )}

        {message && (
          <p className="rounded-lg bg-[#E8F5E9] px-3 py-2 font-montserrat text-[13px] text-[#2E7D32]">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#652A27] py-3 font-montserrat text-[15px] font-medium text-white transition hover:bg-[#4A1F1F] disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Login"
              : "Register"}
        </button>
      </form>
    </div>
  );
}
