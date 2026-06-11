"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { registerUser } from "@/lib/api";

function staggerClass(i) {
  return { animationDelay: `${80 + i * 70}ms` };
}

export default function DashboardRegister() {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [regRole, setRegRole] = useState("editor");
  const [regLoading, setRegLoading] = useState(false);
  const [regMsg, setRegMsg] = useState(null);

  async function onRegister(e) {
    e.preventDefault();
    setRegMsg(null);
    setRegLoading(true);

    try {
      const data = await registerUser({
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword,
      });

      setRegMsg({
        type: "ok",
        text:
          data.message ||
          "User created successfully. Please login to continue.",
      });
      setRegPassword("");
    } catch (err) {
      setRegMsg({
        type: "err",
        text:
          err.response?.data?.message || err.message || "Registration failed",
      });
    } finally {
      setRegLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/35 bg-white/90 px-4 py-2.5 text-[15px] text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-[#F7A51D] focus:ring-2 focus:ring-[#F7A51D]/35";

  return (
    <main className="h-screen overflow-hidden px-4 py-3 sm:px-6 sm:py-4">
      <div className="mx-auto h-full w-full max-w-[1252px]">
        <div className="relative h-full overflow-hidden rounded-[2rem] border border-black/20 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.65)]">
          <Image
            src="/mansha-image/Mansha-Heritage.jpg"
            alt="Mansha register background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6 lg:flex-row lg:items-center lg:px-10">
            <div className="hidden max-w-[380px] text-white lg:block">
              <p className="text-xs font-semibold tracking-[0.25em] text-white/80">
                MANSHA GROUP
              </p>
              <h1 className="mt-4 font-optima text-6xl font-bold leading-[0.95] drop-shadow-lg">
                Register
              </h1>
              <p className="mt-5 font-montserrat text-base text-white/80">
                Create your staff account to manage projects, users, and
                dashboard operations securely.
              </p>
            </div>

            <div className="ml-auto w-full max-w-[520px] rounded-[2rem] border border-white/35 bg-white/18 p-5 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-7">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="font-optima text-4xl font-bold leading-none text-white">
                  Sign Up
                </h2>
                <p className="pt-2 font-montserrat text-sm text-white/90">
                  Have account?{" "}
                  <Link href="/dashboard/login" className="cursor-pointer font-bold underline">
                    Sign in
                  </Link>
                </p>
              </div>

              {regMsg ? (
                <div
                  role="alert"
                  className={`mb-4 rounded-xl border px-3 py-2 font-montserrat text-sm ${
                    regMsg.type === "ok"
                      ? "border-emerald-200/80 bg-emerald-50/95 text-emerald-900"
                      : "border-red-200/80 bg-red-50/95 text-red-900"
                  }`}
                >
                  {regMsg.text}
                </div>
              ) : null}

              <form onSubmit={onRegister} className="mt-2 flex flex-col gap-3">
                <input
                  required
                  autoComplete="name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Full name"
                  className={inputClass}
                />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="Email"
                  className={inputClass}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Password"
                  className={inputClass}
                />
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full cursor-pointer rounded-xl bg-[#F7A51D] py-3 font-montserrat text-[15px] font-bold tracking-wide text-[#1f2937] disabled:opacity-60"
                >
                  {regLoading ? "Submitting..." : "Create Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
