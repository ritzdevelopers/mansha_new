"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi, getAccessToken } from "@/lib/api";
import SuperAdminPanel from "@/app/component/dashboard/SuperAdminPanel";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await authApi.getMe();
        setUser(data.user);
      } catch {
        try {
          await authApi.refreshToken();
          const data = await authApi.getMe();
          setUser(data.user);
        } catch {
          authApi.logout().catch(() => {});
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/dashboard/login");
    }
  }, [loading, user, router]);

  const handleLogout = async () => {
    await authApi.logout();
    setUser(null);
    router.replace("/dashboard/login");
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F1EA]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#652A27]/20 border-t-[#652A27]" />
          <p className="font-montserrat text-sm text-[#666666]">
            {loading ? "Loading dashboard..." : "Redirecting..."}
          </p>
        </div>
      </div>
    );
  }

  const canManage =
    user.role === "superadmin" || user.role === "admin" || user.role === "editor";

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <header className="sticky top-0 z-30 border-b border-[#E8DDD0] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/mansha-svg/mansha-logo.svg"
              width={96}
              height={40}
              alt="Mansha"
              className="h-9 w-auto"
              priority
            />
            <div className="hidden h-8 w-px bg-[#E8DDD0] sm:block" />
            <div className="min-w-0">
              <p className="font-optima text-lg font-medium text-[#111111]">
                Admin Dashboard
              </p>
              <p className="hidden truncate font-montserrat text-xs text-[#888888] sm:block">
                Welcome back, {user.name}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-[#E8DDD0] bg-[#F6F1EA] px-3 py-1.5 sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#652A27] font-montserrat text-xs font-semibold text-white">
                {(user.name || "A").charAt(0).toUpperCase()}
              </span>
              <div className="pr-1">
                <p className="max-w-[140px] truncate font-montserrat text-xs font-medium text-[#111111]">
                  {user.name}
                </p>
                <p className="font-montserrat text-[10px] uppercase tracking-wide text-[#888888]">
                  {user.role}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#652A27] px-3 py-1 font-montserrat text-[11px] capitalize text-white sm:hidden">
              {user.role}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-full border border-[#E8DDD0] bg-white px-4 py-2 font-montserrat text-[13px] font-medium text-[#333333] transition hover:border-[#652A27]/30 hover:bg-[#F6F1EA]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6">
        {canManage ? (
          <SuperAdminPanel role={user.role} />
        ) : (
          <div className="rounded-2xl border border-[#E8DDD0] bg-white p-8 text-center shadow-sm">
            <h2 className="font-optima text-[24px] font-medium text-[#111111]">
              Welcome to Mansha Dashboard
            </h2>
            <p className="mt-3 font-montserrat text-[15px] text-[#666666]">
              You are logged in as{" "}
              <span className="font-medium capitalize text-[#652A27]">
                {user.role}
              </span>
              . Access is limited until your account is approved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
