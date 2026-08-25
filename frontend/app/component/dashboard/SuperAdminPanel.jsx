"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { adminApi, authApi } from "@/lib/api";
import BlogManager from "./cms/BlogManager";
import JobsManager from "./cms/JobsManager";
import AwardsManager from "./cms/AwardsManager";
import GalleryManager from "./cms/GalleryManager";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL &&
  !process.env.NEXT_PUBLIC_API_URL.includes("dxti.onrender.com")
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NODE_ENV === "production"
      ? "https://mansha-backend-ov04.onrender.com"
      : "http://localhost:3001"
).replace(/\/+$/, "");

const roleBadge = {
  admin: "bg-[#652A27] text-white",
  superadmin: "bg-[#1a1210] text-white",
  editor: "bg-[#FCE0BA] text-[#652A27]",
  pending: "bg-[#FFF3CD] text-[#856404]",
  approved: "bg-[#E8F5E9] text-[#2E7D32]",
  rejected: "bg-[#FFEBEE] text-[#C62828]",
};

const menuGroups = [
  {
    label: "Team",
    items: [{ id: "users", label: "Users", icon: "ri-group-line" }],
    superAdminOnly: true,
  },
  {
    label: "Leads",
    items: [
      { id: "enquire", label: "Enquire Forms", icon: "ri-questionnaire-line" },
      { id: "contact", label: "Contact Forms", icon: "ri-mail-line" },
      { id: "career", label: "Career Forms", icon: "ri-briefcase-line" },
      { id: "brochure", label: "Brochure Forms", icon: "ri-file-download-line" },
    ],
  },
  {
    label: "Website",
    items: [
      { id: "jobs", label: "Career Jobs", icon: "ri-id-card-line" },
      { id: "blogs", label: "Blogs", icon: "ri-article-line" },
      { id: "awards", label: "Awards", icon: "ri-trophy-line" },
      { id: "gallery", label: "Gallery", icon: "ri-image-line" },
    ],
  },
  {
    label: "Account",
    items: [{ id: "profile", label: "My Profile", icon: "ri-user-line" }],
  },
];

const CMS_MENUS = ["jobs", "blogs", "awards", "gallery"];

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const cardClass =
  "overflow-hidden rounded-2xl border border-[#E8DDD0] bg-white shadow-[0_8px_24px_-18px_rgba(101,42,39,0.45)]";

const AlertBox = ({ type, children }) => (
  <p
    className={`rounded-xl px-4 py-3 font-montserrat text-[14px] ${
      type === "error"
        ? "border border-[#652A27]/20 bg-[#652A27]/10 text-[#652A27]"
        : "border border-emerald-200 bg-emerald-50 text-[#2E7D32]"
    }`}
  >
    {children}
  </p>
);

const EmptyState = ({ text, icon = "ri-inbox-2-line" }) => (
  <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E8DDD0] bg-[#FBF8F4] px-4 py-12 text-center">
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#652A27] shadow-sm">
      <i className={`${icon} text-xl`} aria-hidden />
    </span>
    <p className="mt-3 font-montserrat text-sm text-[#888888]">{text}</p>
  </div>
);

const DataTable = ({ columns, rows, emptyText, searchable = true }) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) =>
      columns.some((column) => {
        const value = row[column.key];
        return value != null && String(value).toLowerCase().includes(q);
      })
    );
  }, [rows, columns, query]);

  if (!rows.length) {
    return <EmptyState text={emptyText} />;
  }

  return (
    <div className="mt-5">
      {searchable ? (
        <div className="relative mb-4 max-w-sm">
          <i
            className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search this table"
            className="h-10 w-full rounded-xl border border-[#E8DDD0] bg-[#FBF8F4] pl-9 pr-3 font-montserrat text-sm text-[#333333] outline-none placeholder:text-[#AAAAAA] focus:border-[#652A27] focus:bg-white focus:ring-2 focus:ring-[#652A27]/10"
          />
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <EmptyState text="No matching rows" icon="ri-search-line" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#F0E7DC]">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="bg-[#FBF8F4] text-left">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-wide text-[#888888]"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row._id}
                  className="border-t border-[#F5EFE7] transition hover:bg-[#FBF8F4]/80"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="max-w-[280px] px-4 py-3.5 font-montserrat text-[13px] text-[#333333]"
                    >
                      {column.render ? column.render(row) : row[column.key] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const LoadingBlock = () => (
  <div className={`${cardClass} p-5 md:p-6`}>
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-40 rounded bg-[#EDE4D8]" />
      <div className="h-4 w-64 rounded bg-[#F3EBE1]" />
      <div className="h-12 rounded-xl bg-[#F6F1EA]" />
      <div className="h-12 rounded-xl bg-[#F6F1EA]" />
      <div className="h-12 rounded-xl bg-[#F6F1EA]" />
    </div>
  </div>
);

export default function SuperAdminPanel({ role = "superadmin" }) {
  const isSuperAdmin = role === "superadmin";
  const visibleGroups = menuGroups
    .map((group) => ({
      ...group,
      items: group.superAdminOnly && !isSuperAdmin ? [] : group.items,
    }))
    .filter((group) => group.items.length > 0);

  const [activeMenu, setActiveMenu] = useState(isSuperAdmin ? "users" : "enquire");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [enquireData, setEnquireData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [careerData, setCareerData] = useState([]);
  const [brochureData, setBrochureData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onCmsNotice = useCallback((type, text) => {
    if (type === "error") {
      setError(text);
      setMessage("");
      return;
    }
    setMessage(text);
    setError("");
  }, []);

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

      if (menuId === "brochure") {
        const data = await adminApi.getBrochureData();
        setBrochureData(data.user || []);
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
    if (CMS_MENUS.includes(activeMenu)) {
      setLoading(false);
      return;
    }

    if (activeMenu === "users") {
      if (!isSuperAdmin) return;
      fetchUsers();
      return;
    }

    fetchFormData(activeMenu);
  }, [activeMenu, fetchUsers, fetchFormData, isSuperAdmin]);

  const handleApprove = async (userId, nextRole) => {
    setActionLoading(`${userId}-approve-${nextRole}`);
    setMessage("");
    setError("");
    try {
      await adminApi.approveUser(userId, nextRole);
      setMessage(`User approved as ${nextRole}`);
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

  const handleRoleChange = async (userId, nextRole) => {
    setActionLoading(`${userId}-role-${nextRole}`);
    setMessage("");
    setError("");
    try {
      await adminApi.updateUserRole(userId, nextRole);
      setMessage("Role updated successfully");
      await fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const selectMenu = (id) => {
    setActiveMenu(id);
    setError("");
    setMessage("");
    setSidebarOpen(false);
  };

  const renderUsers = () => (
    <div className="space-y-6">
      <section className={`${cardClass} p-5 md:p-6`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
              Pending Approvals
            </h2>
            <p className="mt-1 font-montserrat text-[13px] text-[#666666]">
              New registrations appear here. Assign admin or editor to allow login.
            </p>
          </div>
          <span className="rounded-full bg-[#FFF3CD] px-3 py-1 font-montserrat text-xs font-semibold text-[#856404]">
            {pendingUsers.length}
          </span>
        </div>

        {pendingUsers.length === 0 ? (
          <EmptyState text="No pending users" icon="ri-user-follow-line" />
        ) : (
          <div className="mt-5 space-y-3">
            {pendingUsers.map((user) => (
              <div
                key={user._id}
                className="flex flex-col gap-4 rounded-xl border border-[#F0E7DC] bg-[#FBF8F4] p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#652A27] font-montserrat text-sm font-semibold text-white">
                    {(user.name || "U").charAt(0).toUpperCase()}
                  </span>
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
                    className="cursor-pointer rounded-full border border-[#DDDDDD] bg-white px-4 py-2 font-montserrat text-[13px] text-[#666666] transition hover:bg-[#F5F5F5] disabled:opacity-60"
                  >
                    {actionLoading === `${user._id}-reject` ? "..." : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={`${cardClass} p-5 md:p-6`}>
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
                  <div className="flex flex-wrap gap-2">
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
    <section className={`${cardClass} p-5 md:p-6`}>
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
          {
            key: "message",
            label: "Message",
            render: (row) => (
              <span className="line-clamp-2" title={row.message}>
                {row.message || "-"}
              </span>
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

  const renderContact = () => (
    <section className={`${cardClass} p-5 md:p-6`}>
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
          {
            key: "message",
            label: "Message",
            render: (row) => (
              <span className="line-clamp-2" title={row.message}>
                {row.message || "-"}
              </span>
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

  const renderCareer = () => (
    <section className={`${cardClass} p-5 md:p-6`}>
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
                  className="cursor-pointer font-medium text-[#652A27] underline"
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

  const renderBrochure = () => (
    <section className={`${cardClass} p-5 md:p-6`}>
      <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
        Brochure Form Data
      </h2>
      <DataTable
        emptyText="No brochure form submissions yet"
        rows={brochureData}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "project", label: "Project" },
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
    <section className={`${cardClass} p-5 md:p-6`}>
      <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
        My Profile
      </h2>
      {!profile ? (
        <EmptyState text="Profile not found" icon="ri-user-line" />
      ) : (
        <div className="mt-6">
          <div className="mb-6 flex items-center gap-4 rounded-2xl bg-[#FBF8F4] p-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#652A27] font-optima text-xl text-white">
              {(profile.name || "A").charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="font-optima text-xl text-[#111111]">{profile.name}</p>
              <p className="font-montserrat text-sm text-[#666666]">{profile.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["Name", profile.name],
              ["Email", profile.email],
              ["Role", profile.role],
              ["Status", profile.status || "approved"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-[#F0E7DC] p-4"
              >
                <p className="font-montserrat text-[11px] uppercase tracking-wide text-[#999999]">
                  {label}
                </p>
                <p className="mt-1 font-montserrat text-[15px] capitalize text-[#111111]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );

  const renderContent = () => {
    if (activeMenu === "blogs") return <BlogManager onNotice={onCmsNotice} />;
    if (activeMenu === "jobs") return <JobsManager onNotice={onCmsNotice} />;
    if (activeMenu === "awards") return <AwardsManager onNotice={onCmsNotice} />;
    if (activeMenu === "gallery") return <GalleryManager onNotice={onCmsNotice} />;

    if (loading) return <LoadingBlock />;

    if (activeMenu === "users") return renderUsers();
    if (activeMenu === "enquire") return renderEnquire();
    if (activeMenu === "contact") return renderContact();
    if (activeMenu === "career") return renderCareer();
    if (activeMenu === "brochure") return renderBrochure();
    if (activeMenu === "profile") return renderProfile();
    return null;
  };

  const nav = (
    <nav className="space-y-5">
      {visibleGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A08B7A]">
            {group.label}
          </p>
          <div className="space-y-1">
            {group.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectMenu(item.id)}
                className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-montserrat text-[14px] transition ${
                  activeMenu === item.id
                    ? "bg-[#652A27] text-white shadow-sm"
                    : "text-[#333333] hover:bg-[#F6F1EA]"
                }`}
              >
                <i className={`${item.icon} text-[16px]`} aria-hidden />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-[#E8DDD0] bg-white px-3 py-2 font-montserrat text-sm text-[#333333] lg:hidden"
      >
        <i className="ri-menu-line" aria-hidden />
        Menu
      </button>

      {sidebarOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/35"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-10 h-full w-[280px] overflow-y-auto border-r border-[#E8DDD0] bg-white p-4 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-optima text-lg font-medium text-[#111111]">Menu</p>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="cursor-pointer rounded-lg p-1.5 text-[#666666] hover:bg-[#F6F1EA]"
                aria-label="Close"
              >
                <i className="ri-close-line text-xl" aria-hidden />
              </button>
            </div>
            {nav}
          </aside>
        </div>
      ) : null}

      <aside className="hidden w-[250px] shrink-0 self-start rounded-2xl border border-[#E8DDD0] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(101,42,39,0.45)] lg:sticky lg:top-20 lg:block">
        {nav}
      </aside>

      <div className="min-w-0 flex-1 space-y-4">
        {error ? <AlertBox type="error">{error}</AlertBox> : null}
        {message ? <AlertBox type="success">{message}</AlertBox> : null}
        {renderContent()}
      </div>
    </div>
  );
}
