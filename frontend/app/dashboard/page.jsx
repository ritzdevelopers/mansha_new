"use client";

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-montserrat text-[14px] text-[#666666]">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-montserrat text-[14px] text-[#666666]">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-8xl px-5 py-8 md:px-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 border-b border-[#DDDDDD] pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-optima text-[28px] font-medium capitalize text-[#111111] md:text-[34px]">
            Dashboard
          </h1>
          <p className="mt-1 font-montserrat text-[14px] text-[#666666]">
            Welcome, {user.name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#652A27] px-4 py-1.5 font-montserrat text-[12px] capitalize text-white">
            {user.role}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer rounded-full border border-[#DDDDDD] px-5 py-2 font-montserrat text-[13px] text-[#333333] transition hover:bg-white"
          >
            Logout
          </button>
        </div>
      </div>

      {user.role === "superadmin" || user.role === "admin" ? (
        <SuperAdminPanel role={user.role} />
      ) : (
        <div className="rounded-2xl border border-[#DDDDDD] bg-white p-8 text-center">
          <h2 className="font-optima text-[24px] font-medium text-[#111111]">
            Welcome to Mansha Dashboard
          </h2>
          <p className="mt-3 font-montserrat text-[15px] text-[#666666]">
            You are logged in as{" "}
            <span className="font-medium capitalize text-[#652A27]">
              {user.role}
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
}
