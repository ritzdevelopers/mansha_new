"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import { authApi } from "@/lib/api";

export default function DashboardLogin() {
  const router = useRouter();
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [logLoading, setLogLoading] = useState(false);
  const [logMsg, setLogMsg] = useState(null);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [fpStep, setFpStep] = useState(1);
  const [fpEmail, setFpEmail] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpPassword, setFpPassword] = useState("");
  const [fpConfirm, setFpConfirm] = useState("");
  const [fpLoading, setFpLoading] = useState(false);
  const [fpMsg, setFpMsg] = useState(null);

  async function onLogin(e) {
    e.preventDefault();
    setLogMsg(null);
    setLogLoading(true);

    try {
      await authApi.login({
        email: logEmail.trim(),
        password: logPassword,
      });
      setLogPassword("");
      router.replace("/dashboard");
    } catch (err) {
      setLogMsg({
        type: "err",
        text: err.response?.data?.message || err.message || "Login failed",
      });
    } finally {
      setLogLoading(false);
    }
  }

  function openForgotPassword() {
    setFpMsg(null);
    setFpStep(1);
    setFpOtp("");
    setFpPassword("");
    setFpConfirm("");
    setFpEmail(logEmail.trim());
    setForgotOpen(true);
  }

  function closeForgotPassword() {
    setForgotOpen(false);
    setFpMsg(null);
    setFpStep(1);
    setFpLoading(false);
  }

  async function onSendOtp() {
    setFpMsg(null);
    const email = fpEmail.trim();
    if (!email) {
      setFpMsg({ type: "err", text: "Enter your email address." });
      return;
    }
    setFpLoading(true);
    setFpMsg({
      type: "err",
      text: "Password reset is not available yet. Please contact super admin.",
    });
    setFpLoading(false);
  }

  async function onVerifyOtp() {
    setFpMsg({ type: "err", text: "Please contact super admin to reset password." });
  }

  async function onResetPassword() {
    setFpMsg({ type: "err", text: "Please contact super admin to reset password." });
  }

  const inputClass =
    "w-full rounded-full border border-[#e8e8e8] bg-white px-5 py-3 text-sm text-[#2e2e2e] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#F7A51D] focus:bg-white focus:ring-2 focus:ring-[#F7A51D]/20";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#efefef] px-4 py-8 sm:px-6">
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.10/dist/dotlottie-wc.js"
        type="module"
        strategy="afterInteractive"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="mr-0 hidden w-full max-w-[420px] items-center justify-center lg:mr-10 lg:flex">
          <div
            className="h-[450px] w-[450px]"
            dangerouslySetInnerHTML={{
              __html:
                '<dotlottie-wc src="https://lottie.host/7017cb36-bc82-45f0-93ef-2399d25a6570/5eH4NxbFkP.lottie" style="width: 450px; height: 450px" autoplay loop></dotlottie-wc>',
            }}
          />
        </div>

        <section className="w-full max-w-[560px] rounded-sm bg-white shadow-[0_12px_24px_-12px_rgba(0,0,0,0.35)]">
          <div className="px-6 pb-6 pt-8 sm:px-8">
            <h1 className="mb-7 text-center font-optima text-3xl font-semibold tracking-wide text-black">
              Login Form
            </h1>

            {logMsg ? (
              <div
                role="alert"
                className={`mb-4 rounded-xl px-3 py-2 font-montserrat text-sm ${
                  logMsg.type === "ok"
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {logMsg.text}
              </div>
            ) : null}

            <form onSubmit={onLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-1 block font-montserrat text-sm font-semibold text-[#4f4f4f]"
                >
                  Username *
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={logEmail}
                  onChange={(e) => setLogEmail(e.target.value)}
                  placeholder="Enter your Username"
                  className={inputClass}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="login-password"
                  className="mb-1 block font-montserrat text-sm font-semibold text-[#4f4f4f]"
                >
                  Password *
                </label>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={logPassword}
                  onChange={(e) => setLogPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2 top-[calc(50%+12px)] -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-[#8e8e8e] hover:bg-[#ececec]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={
                      showPassword
                        ? "ri-eye-off-line text-base"
                        : "ri-eye-line text-base"
                    }
                    aria-hidden
                  />
                </button>
              </div>

              <button
                type="submit"
                disabled={logLoading}
                className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-full bg-black py-3 font-montserrat text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 ease-in-out hover:bg-amber-300 hover:text-black disabled:opacity-60"
              >
                {logLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#dfdfdf] bg-white px-6 py-4 font-montserrat text-sm sm:px-8">
            <p className="text-left font-semibold text-black">
              <i> Don&apos;t have an account? </i>
              <Link
                href="/dashboard/register"
                className="cursor-pointer font-bold text-black hover:text-[#878181]"
              >
                Sign up
              </Link>
            </p>
            <button
              type="button"
              onClick={openForgotPassword}
              className="shrink-0 cursor-pointer font-bold text-black hover:text-[#878181]"
            >
              Forgot password?
            </button>
          </div>
        </section>
      </div>

      {forgotOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1a1240]/55 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget && !fpLoading) closeForgotPassword();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="forgot-password-title"
            className="w-full max-w-md rounded-2xl border border-white/80 bg-white p-6 shadow-[0_24px_60px_-20px_rgba(47,31,133,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h2
                id="forgot-password-title"
                className="font-optima text-lg font-bold text-[#241a52]"
              >
                Reset password
              </h2>
              <button
                type="button"
                disabled={fpLoading}
                onClick={closeForgotPassword}
                className="cursor-pointer rounded-lg border border-zinc-200 px-2 py-1 font-montserrat text-sm font-semibold text-zinc-600 hover:bg-zinc-50 disabled:opacity-50"
              >
                Close
              </button>
            </div>
            <p className="mt-1 font-montserrat text-xs text-[#6d6d94]">
              Step {fpStep} of 3 —{" "}
              {fpStep === 1 ? "email" : fpStep === 2 ? "verify OTP" : "new password"}
            </p>

            {fpMsg ? (
              <div
                className={`mt-3 rounded-xl px-3 py-2 font-montserrat text-sm ${
                  fpMsg.type === "ok"
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {fpMsg.text}
              </div>
            ) : null}

            <div className="mt-4 space-y-3">
              <div>
                <label
                  className="block font-montserrat text-xs font-semibold text-[#4c427e]"
                  htmlFor="fp-email"
                >
                  Email
                </label>
                <input
                  id="fp-email"
                  type="email"
                  autoComplete="email"
                  disabled={fpStep > 1 || fpLoading}
                  value={fpEmail}
                  onChange={(e) => setFpEmail(e.target.value)}
                  className={`${inputClass} mt-1 ${fpStep > 1 ? "opacity-80" : ""}`}
                />
              </div>

              {fpStep >= 2 ? (
                <div>
                  <label
                    className="block font-montserrat text-xs font-semibold text-[#4c427e]"
                    htmlFor="fp-otp"
                  >
                    OTP
                  </label>
                  <input
                    id="fp-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={8}
                    disabled={fpStep > 2 || fpLoading}
                    value={fpOtp}
                    onChange={(e) =>
                      setFpOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="6-digit code"
                    className={`${inputClass} mt-1 tracking-widest ${fpStep > 2 ? "opacity-80" : ""}`}
                  />
                </div>
              ) : null}

              {fpStep === 3 ? (
                <>
                  <div>
                    <label
                      className="block font-montserrat text-xs font-semibold text-[#4c427e]"
                      htmlFor="fp-new-pass"
                    >
                      New password
                    </label>
                    <input
                      id="fp-new-pass"
                      type="password"
                      autoComplete="new-password"
                      disabled={fpLoading}
                      value={fpPassword}
                      onChange={(e) => setFpPassword(e.target.value)}
                      className={`${inputClass} mt-1`}
                    />
                  </div>
                  <div>
                    <label
                      className="block font-montserrat text-xs font-semibold text-[#4c427e]"
                      htmlFor="fp-confirm-pass"
                    >
                      Confirm password
                    </label>
                    <input
                      id="fp-confirm-pass"
                      type="password"
                      autoComplete="new-password"
                      disabled={fpLoading}
                      value={fpConfirm}
                      onChange={(e) => setFpConfirm(e.target.value)}
                      className={`${inputClass} mt-1`}
                    />
                  </div>
                </>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              {fpStep === 1 ? (
                <button
                  type="button"
                  disabled={fpLoading}
                  onClick={() => void onSendOtp()}
                  className="cursor-pointer rounded-2xl bg-gradient-to-r from-[#5f4be8] via-[#7460f1] to-[#8b77ff] px-5 py-2.5 font-montserrat text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(95,75,232,0.9)] hover:brightness-105 disabled:opacity-60"
                >
                  {fpLoading ? "Sending..." : "Send OTP"}
                </button>
              ) : null}
              {fpStep === 2 ? (
                <>
                  <button
                    type="button"
                    disabled={fpLoading}
                    onClick={() => {
                      setFpStep(1);
                      setFpOtp("");
                      setFpMsg(null);
                    }}
                    className="cursor-pointer rounded-2xl border border-zinc-300 px-4 py-2.5 font-montserrat text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={fpLoading}
                    onClick={() => void onVerifyOtp()}
                    className="cursor-pointer rounded-2xl bg-gradient-to-r from-[#5f4be8] via-[#7460f1] to-[#8b77ff] px-5 py-2.5 font-montserrat text-sm font-semibold text-white hover:brightness-105 disabled:opacity-60"
                  >
                    {fpLoading ? "Checking..." : "Verify OTP"}
                  </button>
                </>
              ) : null}
              {fpStep === 3 ? (
                <>
                  <button
                    type="button"
                    disabled={fpLoading}
                    onClick={() => {
                      setFpStep(2);
                      setFpMsg(null);
                    }}
                    className="cursor-pointer rounded-2xl border border-zinc-300 px-4 py-2.5 font-montserrat text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={fpLoading}
                    onClick={() => void onResetPassword()}
                    className="cursor-pointer rounded-2xl bg-gradient-to-r from-[#5f4be8] via-[#7460f1] to-[#8b77ff] px-5 py-2.5 font-montserrat text-sm font-semibold text-white hover:brightness-105 disabled:opacity-60"
                  >
                    {fpLoading ? "Saving..." : "Update password"}
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
