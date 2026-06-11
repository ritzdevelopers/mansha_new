"use client";

import { useCallback, useEffect, useState } from "react";
  import { adminApi, authApi } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const roleBadge = {
  admin: "bg-[#652A27] text-white",
  editor: "bg-[#FCE0BA] text-[#652A27]",
  pending: "bg-[#FFF3CD] text-[#856404]",
  approved: "bg-[#E8F5E9] text-[#2E7D32]",
  rejected: "bg-[#FFEBEE] text-[#C62828]",
};

const menuItems = [
  { id: "users", label: "Users", icon: "ri-group-line" },
  { id: "enquire", label: "Enquire Forms", icon: "ri-questionnaire-line" },
  { id: "contact", label: "Contact Forms", icon: "ri-mail-line" },
  { id: "career", label: "Career Forms", icon: "ri-briefcase-line" },
  { id: "profile", label: "My Profile", icon: "ri-user-line" },
];

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const AlertBox = ({ type, children }) => (
  <p
    className={`rounded-lg px-4 py-3 font-montserrat text-[14px] ${
      type === "error"
        ? "bg-[#652A27]/10 text-[#652A27]"
        : "bg-[#E8F5E9] text-[#2E7D32]"
    }`}
  >
    {children}
  </p>
);

const DataTable = ({ columns, rows, emptyText }) => {
  if (!rows.length) {
    return (
      <p className="mt-6 font-montserrat text-[14px] text-[#999999]">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full max-w-8xl border-collapse">
        <thead>
          <tr className="border-b border-[#EEEEEE] text-left">
            {columns.map((column) => (
              <th
                key={column.key}
                className="pb-3 font-montserrat text-[12px] font-medium uppercase text-[#999999]"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-b border-[#F5F5F5]">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="py-4 font-montserrat text-[13px] text-[#333333]"
                >
                  {column.render ? column.render(row) : row[column.key] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function SuperAdminPanel({ role = "superadmin" }) {
  const isSuperAdmin = role === "superadmin";
  const visibleMenuItems = isSuperAdmin
    ? menuItems
    : menuItems.filter((item) => item.id !== "users");
  const [activeMenu, setActiveMenu] = useState(
    isSuperAdmin ? "users" : "enquire"
  );
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [enquireData, setEnquireData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [careerData, setCareerData] = useState([]);
  const [profile, setProfile] = useState(null);
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
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFormData = useCallback(async (menuId) => {
    setLoading(true);
    setError("");
    try {
      if (menuId === "enquire") {
        const data = await adminApi.getEnquireData();
        setEnquireData(data.user || []);
      }

      if (menuId === "contact") {
        const data = await adminApi.getContactData();
        setContactData(data.user || []);
      }

      if (menuId === "career") {
        const data = await adminApi.getCareerData();
        setCareerData(data.user || []);
      }

      if (menuId === "profile") {
        const data = await authApi.getMe();
        setProfile(data.user || null);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeMenu === "users") {
      if (!isSuperAdmin) return;
      fetchUsers();
      return;
    }

    fetchFormData(activeMenu);
  }, [activeMenu, fetchUsers, fetchFormData, isSuperAdmin]);

  const handleApprove = async (userId, role) => {
    setActionLoading(`${userId}-approve-${role}`);
    setMessage("");
    setError("");
    try {
      await adminApi.approveUser(userId, role);
      setMessage(`User approved as ${role}`);
      await fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
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
      setError(err.response?.data?.message || err.message);
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
      setError(err.response?.data?.message || err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const renderUsers = () => (
    <div className="space-y-8">
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
                    className="cursor-pointer rounded-full bg-[#652A27] px-4 py-2 font-montserrat text-[13px] text-white transition hover:bg-[#4A1F1F] disabled:opacity-60"
                  >
                    {actionLoading === `${user._id}-approve-admin`
                      ? "..."
                      : "Approve as Admin"}
                  </button>
                  <button
                    type="button"
                    disabled={!!actionLoading}
                    onClick={() => handleApprove(user._id, "editor")}
                    className="cursor-pointer rounded-full border border-[#652A27] px-4 py-2 font-montserrat text-[13px] text-[#652A27] transition hover:bg-[#652A27]/5 disabled:opacity-60"
                  >
                    {actionLoading === `${user._id}-approve-editor`
                      ? "..."
                      : "Approve as Editor"}
                  </button>
                  <button
                    type="button"
                    disabled={!!actionLoading}
                    onClick={() => handleReject(user._id)}
                    className="cursor-pointer rounded-full border border-[#DDDDDD] px-4 py-2 font-montserrat text-[13px] text-[#666666] transition hover:bg-[#F5F5F5] disabled:opacity-60"
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

        <DataTable
          emptyText="No users yet"
          rows={allUsers}
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            {
              key: "role",
              label: "Role",
              render: (row) => (
                <span
                  className={`rounded-full px-3 py-1 font-montserrat text-[11px] capitalize ${roleBadge[row.role] || "bg-[#EEEEEE] text-[#333333]"}`}
                >
                  {row.role || "-"}
                </span>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <span
                  className={`rounded-full px-3 py-1 font-montserrat text-[11px] capitalize ${roleBadge[row.status] || "bg-[#EEEEEE] text-[#333333]"}`}
                >
                  {row.status || "pending"}
                </span>
              ),
            },
            {
              key: "actions",
              label: "Actions",
              render: (row) =>
                row.status === "approved" ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={!!actionLoading || row.role === "admin"}
                      onClick={() => handleRoleChange(row._id, "admin")}
                            className="cursor-pointer rounded-full border border-[#652A27] px-3 py-1 font-montserrat text-[12px] text-[#652A27] disabled:opacity-40"
                    >
                      Make Admin
                    </button>
                    <button
                      type="button"
                      disabled={!!actionLoading || row.role === "editor"}
                      onClick={() => handleRoleChange(row._id, "editor")}
                            className="cursor-pointer rounded-full border border-[#DDDDDD] px-3 py-1 font-montserrat text-[12px] text-[#666666] disabled:opacity-40"
                    >
                      Make Editor
                    </button>
                  </div>
                ) : (
                  "-"
                ),
            },
          ]}
        />
      </section>
    </div>
  );

  const renderEnquire = () => (
    <section className="rounded-2xl border border-[#DDDDDD] bg-white p-5 md:p-6">
      <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
        Enquire Form Data
      </h2>
      <DataTable
        emptyText="No enquire form submissions yet"
        rows={enquireData}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "project", label: "Project" },
          { key: "message", label: "Message" },
          {
            key: "createdAt",
            label: "Submitted",
            render: (row) => formatDate(row.createdAt),
          },
        ]}
      />
    </section>
  );

  const renderContact = () => (
    <section className="rounded-2xl border border-[#DDDDDD] bg-white p-5 md:p-6">
      <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
        Contact Form Data
      </h2>
      <DataTable
        emptyText="No contact form submissions yet"
        rows={contactData}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "message", label: "Message" },
          {
            key: "createdAt",
            label: "Submitted",
            render: (row) => formatDate(row.createdAt),
          },
        ]}
      />
    </section>
  );

  const renderCareer = () => (
    <section className="rounded-2xl border border-[#DDDDDD] bg-white p-5 md:p-6">
      <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
        Career Form Data
      </h2>
      <DataTable
        emptyText="No career applications yet"
        rows={careerData}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "mobile", label: "Mobile" },
          { key: "designation", label: "Designation" },
          {
            key: "resume",
            label: "Resume",
            render: (row) =>
              row.resume ? (
                <a
                  href={`${API_URL}/${row.resume.replace(/\\/g, "/")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer text-[#652A27] underline"
                >
                  View Resume
                </a>
              ) : (
                "-"
              ),
          },
          {
            key: "createdAt",
            label: "Submitted",
            render: (row) => formatDate(row.createdAt),
          },
        ]}
      />
    </section>
  );

  const renderProfile = () => (
    <section className="rounded-2xl border border-[#DDDDDD] bg-white p-5 md:p-6">
      <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
        My Profile
      </h2>
      {!profile ? (
        <p className="mt-6 font-montserrat text-[14px] text-[#999999]">
          Profile not found
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[#EEEEEE] p-4">
            <p className="font-montserrat text-[12px] uppercase text-[#999999]">
              Name
            </p>
            <p className="mt-1 font-montserrat text-[15px] text-[#111111]">
              {profile.name}
            </p>
          </div>
          <div className="rounded-xl border border-[#EEEEEE] p-4">
            <p className="font-montserrat text-[12px] uppercase text-[#999999]">
              Email
            </p>
            <p className="mt-1 font-montserrat text-[15px] text-[#111111]">
              {profile.email}
            </p>
          </div>
          <div className="rounded-xl border border-[#EEEEEE] p-4">
            <p className="font-montserrat text-[12px] uppercase text-[#999999]">
              Role
            </p>
            <p className="mt-1 font-montserrat text-[15px] capitalize text-[#111111]">
              {profile.role}
            </p>
          </div>
          <div className="rounded-xl border border-[#EEEEEE] p-4">
            <p className="font-montserrat text-[12px] uppercase text-[#999999]">
              Status
            </p>
            <p className="mt-1 font-montserrat text-[15px] capitalize text-[#111111]">
              {profile.status || "approved"}
            </p>
          </div>
        </div>
      )}
    </section>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <p className="font-montserrat text-[14px] text-[#666666]">Loading...</p>
      );
    }

    if (activeMenu === "users") return renderUsers();
    if (activeMenu === "enquire") return renderEnquire();
    if (activeMenu === "contact") return renderContact();
    if (activeMenu === "career") return renderCareer();
    if (activeMenu === "profile") return renderProfile();
    return null;
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="w-full shrink-0 rounded-2xl border border-[#DDDDDD] bg-white p-4 lg:w-[240px]">
        <p className="mb-4 px-2 font-optima text-[18px] font-medium text-[#111111]">
          Menu
        </p>
        <nav className="space-y-1">
          {visibleMenuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveMenu(item.id);
                setError("");
                setMessage("");
              }}
              className={`flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-3 text-left font-montserrat text-[14px] transition ${
                activeMenu === item.id
                  ? "bg-[#652A27] text-white"
                  : "text-[#333333] hover:bg-[#F5F5F5]"
              }`}
            >
              <i className={`${item.icon} text-[16px]`} aria-hidden />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 space-y-4">
        {error ? <AlertBox type="error">{error}</AlertBox> : null}
        {message ? <AlertBox type="success">{message}</AlertBox> : null}
        {renderContent()}
      </div>
    </div>
  );
}
