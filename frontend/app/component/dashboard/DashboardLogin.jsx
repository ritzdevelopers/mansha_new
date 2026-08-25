"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "@/lib/api";
import PasswordField from "./PasswordField";

const inputClass =
  "h-12 w-full rounded-xl border border-[#E6DCCF] bg-[#FFFCF8] px-4 font-montserrat text-sm text-[#2e2e2e] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#652A27] focus:bg-white focus:ring-2 focus:ring-[#652A27]/15";

export default function DashboardLogin() {
  const router = useRouter();
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
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
      const status = err.response?.status;
      const unreachable = !err.response || status === 502 || status === 503 || status === 504;
      setLogMsg({
        type: "err",
        text: unreachable
          ? "Cannot reach the login server. Check that https://mansha-backend-ov04.onrender.com/health is up, then try again."
          : err.response?.data?.message || err.message || "Login failed",
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1a1210]">
      <Image
        src="/mansha-image/Mansha-Heritage.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#1a1210]/70" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
        <section className="w-full max-w-[480px] overflow-hidden rounded-[1.75rem] border border-white/20 bg-white shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)]">
          <div className="bg-[#652A27] px-6 py-6 text-white sm:px-8">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/mansha-svg/mansha-logo.svg"
                width={110}
                height={48}
                alt="Mansha"
                className="h-10 w-auto brightness-0 invert"
                priority
              />
            </Link>
            <h1 className="mt-5 font-optima text-3xl font-semibold tracking-wide">
              Admin Dashboard
            </h1>
            <p className="mt-1.5 font-montserrat text-sm text-white/75">
              Sign in to manage users, leads, and website content.
            </p>
          </div>

          <div className="px-6 py-7 sm:px-8">
            {logMsg ? (
              <div
                role="alert"
                className={`mb-5 rounded-xl px-3 py-2.5 font-montserrat text-sm ${
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
                  className="mb-1.5 block font-montserrat text-sm font-semibold text-[#4f4f4f]"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={logEmail}
                  onChange={(e) => setLogEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={inputClass}
                />
              </div>

              <PasswordField
                id="login-password"
                label="Password"
                required
                autoComplete="current-password"
                value={logPassword}
                onChange={(e) => setLogPassword(e.target.value)}
                placeholder="Enter your password"
                inputClassName={inputClass}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={openForgotPassword}
                  className="cursor-pointer font-montserrat text-sm font-semibold text-[#652A27] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={logLoading}
                className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#652A27] py-3.5 font-montserrat text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#4A1F1F] disabled:opacity-60"
              >
                {logLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center font-montserrat text-sm text-[#666666]">
              Don&apos;t have an account?{" "}
              <Link
                href="/dashboard/register"
                className="cursor-pointer font-bold text-[#652A27] hover:underline"
              >
                Sign up
              </Link>
            </p>
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
                  className="mb-1.5 block font-montserrat text-xs font-semibold text-[#4c427e]"
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
                  className={`${inputClass} ${fpStep > 1 ? "opacity-80" : ""}`}
                />
              </div>

              {fpStep >= 2 ? (
                <div>
                  <label
                    className="mb-1.5 block font-montserrat text-xs font-semibold text-[#4c427e]"
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
                    className={`${inputClass} tracking-widest ${fpStep > 2 ? "opacity-80" : ""}`}
                  />
                </div>
              ) : null}

              {fpStep === 3 ? (
                <>
                  <PasswordField
                    id="fp-new-pass"
                    label="New password"
                    autoComplete="new-password"
                    disabled={fpLoading}
                    value={fpPassword}
                    onChange={(e) => setFpPassword(e.target.value)}
                    inputClassName={inputClass}
                  />
                  <PasswordField
                    id="fp-confirm-pass"
                    label="Confirm password"
                    autoComplete="new-password"
                    disabled={fpLoading}
                    value={fpConfirm}
                    onChange={(e) => setFpConfirm(e.target.value)}
                    inputClassName={inputClass}
                  />
                </>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              {fpStep === 1 ? (
                <button
                  type="button"
                  disabled={fpLoading}
                  onClick={() => void onSendOtp()}
                  className="cursor-pointer rounded-xl bg-[#652A27] px-5 py-2.5 font-montserrat text-sm font-semibold text-white hover:bg-[#4A1F1F] disabled:opacity-60"
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
                    className="cursor-pointer rounded-xl border border-zinc-300 px-4 py-2.5 font-montserrat text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={fpLoading}
                    onClick={() => void onVerifyOtp()}
                    className="cursor-pointer rounded-xl bg-[#652A27] px-5 py-2.5 font-montserrat text-sm font-semibold text-white hover:bg-[#4A1F1F] disabled:opacity-60"
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
                    className="cursor-pointer rounded-xl border border-zinc-300 px-4 py-2.5 font-montserrat text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={fpLoading}
                    onClick={() => void onResetPassword()}
                    className="cursor-pointer rounded-xl bg-[#652A27] px-5 py-2.5 font-montserrat text-sm font-semibold text-white hover:bg-[#4A1F1F] disabled:opacity-60"
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
