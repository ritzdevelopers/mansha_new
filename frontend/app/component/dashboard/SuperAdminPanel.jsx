"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi } from "@/lib/api";

const roleBadge = {
  admin: "bg-[#652A27] text-white",
  editor: "bg-[#FCE0BA] text-[#652A27]",
  pending: "bg-[#FFF3CD] text-[#856404]",
  approved: "bg-[#E8F5E9] text-[#2E7D32]",
  rejected: "bg-[#FFEBEE] text-[#C62828]",
};

export default function SuperAdminPanel() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [pendingData, allData] = await Promise.all([
        adminApi.getPendingUsers(),
        adminApi.getAllUsers(),
      ]);
      setPendingUsers(pendingData.users || []);
      setAllUsers(allData.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleApprove = async (userId, role) => {
    setActionLoading(`${userId}-approve-${role}`);
    setMessage("");
    setError("");
    try {
      await adminApi.approveUser(userId, role);
      setMessage(`User approved as ${role}`);
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId) => {
    setActionLoading(`${userId}-reject`);
    setMessage("");
    setError("");
    try {
      await adminApi.rejectUser(userId);
      setMessage("User rejected");
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRoleChange = async (userId, role) => {
    setActionLoading(`${userId}-role-${role}`);
    setMessage("");
    setError("");
    try {
      await adminApi.updateUserRole(userId, role);
      setMessage("Role updated successfully");
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <p className="text-center font-montserrat text-[14px] text-[#666666]">
        Loading users...
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <p className="rounded-lg bg-[#652A27]/10 px-4 py-3 font-montserrat text-[14px] text-[#652A27]">
          {error}
        </p>
      )}
      {message && (
        <p className="rounded-lg bg-[#E8F5E9] px-4 py-3 font-montserrat text-[14px] text-[#2E7D32]">
          {message}
        </p>
      )}

      <section className="rounded-2xl border border-[#DDDDDD] bg-white p-5 md:p-6">
        <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
          Pending Approvals
        </h2>
        <p className="mt-1 font-montserrat text-[13px] text-[#666666]">
          New registrations appear here. Assign admin or editor role to allow login.
        </p>

        {pendingUsers.length === 0 ? (
          <p className="mt-6 font-montserrat text-[14px] text-[#999999]">
            No pending users
          </p>
        ) : (
          <div className="mt-5 space-y-4">
            {pendingUsers.map((user) => (
              <div
                key={user._id}
                className="flex flex-col gap-4 rounded-xl border border-[#EEEEEE] p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-montserrat text-[15px] font-medium text-[#111111]">
                    {user.name}
                  </p>
                  <p className="font-montserrat text-[13px] text-[#666666]">
                    {user.email}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 font-montserrat text-[11px] capitalize ${roleBadge.pending}`}
                  >
                    pending
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={!!actionLoading}
                    onClick={() => handleApprove(user._id, "admin")}
                    className="rounded-full bg-[#652A27] px-4 py-2 font-montserrat text-[13px] text-white transition hover:bg-[#4A1F1F] disabled:opacity-60"
                  >
                    {actionLoading === `${user._id}-approve-admin`
                      ? "..."
                      : "Approve as Admin"}
                  </button>
                  <button
                    type="button"
                    disabled={!!actionLoading}
                    onClick={() => handleApprove(user._id, "editor")}
                    className="rounded-full border border-[#652A27] px-4 py-2 font-montserrat text-[13px] text-[#652A27] transition hover:bg-[#652A27]/5 disabled:opacity-60"
                  >
                    {actionLoading === `${user._id}-approve-editor`
                      ? "..."
                      : "Approve as Editor"}
                  </button>
                  <button
                    type="button"
                    disabled={!!actionLoading}
                    onClick={() => handleReject(user._id)}
                    className="rounded-full border border-[#DDDDDD] px-4 py-2 font-montserrat text-[13px] text-[#666666] transition hover:bg-[#F5F5F5] disabled:opacity-60"
                  >
                    {actionLoading === `${user._id}-reject` ? "..." : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-[#DDDDDD] bg-white p-5 md:p-6">
        <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
          All Users
        </h2>

        {allUsers.length === 0 ? (
          <p className="mt-6 font-montserrat text-[14px] text-[#999999]">
            No users yet
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-[#EEEEEE] text-left">
                  <th className="pb-3 font-montserrat text-[12px] font-medium uppercase text-[#999999]">
                    Name
                  </th>
                  <th className="pb-3 font-montserrat text-[12px] font-medium uppercase text-[#999999]">
                    Email
                  </th>
                  <th className="pb-3 font-montserrat text-[12px] font-medium uppercase text-[#999999]">
                    Role
                  </th>
                  <th className="pb-3 font-montserrat text-[12px] font-medium uppercase text-[#999999]">
                    Status
                  </th>
                  <th className="pb-3 font-montserrat text-[12px] font-medium uppercase text-[#999999]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user._id} className="border-b border-[#F5F5F5]">
                    <td className="py-4 font-montserrat text-[14px] text-[#111111]">
                      {user.name}
                    </td>
                    <td className="py-4 font-montserrat text-[13px] text-[#666666]">
                      {user.email}
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 font-montserrat text-[11px] capitalize ${roleBadge[user.role] || "bg-[#EEEEEE] text-[#333333]"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 font-montserrat text-[11px] capitalize ${roleBadge[user.status] || "bg-[#EEEEEE] text-[#333333]"}`}
                      >
                        {user.status || "pending"}
                      </span>
                    </td>
                    <td className="py-4">
                      {user.status === "approved" && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={!!actionLoading || user.role === "admin"}
                            onClick={() => handleRoleChange(user._id, "admin")}
                            className="rounded-full border border-[#652A27] px-3 py-1 font-montserrat text-[12px] text-[#652A27] disabled:opacity-40"
                          >
                            Make Admin
                          </button>
                          <button
                            type="button"
                            disabled={!!actionLoading || user.role === "editor"}
                            onClick={() => handleRoleChange(user._id, "editor")}
                            className="rounded-full border border-[#DDDDDD] px-3 py-1 font-montserrat text-[12px] text-[#666666] disabled:opacity-40"
                          >
                            Make Editor
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
