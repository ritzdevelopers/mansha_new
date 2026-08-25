"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi } from "@/lib/api";

const emptyForm = {
  title: "",
  experience: "",
  jobType: "Full Time",
  description: "",
  isActive: true,
  order: 0,
};

const inputClass =
  "h-[48px] w-full rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-4 font-montserrat text-[14px] text-[#333333] outline-none";

export default function JobsManager({ onNotice }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getJobs();
      setJobs(data.jobs || []);
    } catch (err) {
      onNotice?.("error", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [onNotice]);

  useEffect(() => {
    load();
  }, [load]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (job) => {
    setEditingId(job._id);
    setForm({
      title: job.title || "",
      experience: job.experience || "",
      jobType: job.jobType || "Full Time",
      description: Array.isArray(job.description)
        ? job.description.join("\n")
        : job.description || "",
      isActive: job.isActive !== false,
      order: job.order || 0,
    });
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await adminApi.updateJob(editingId, form);
        onNotice?.("success", "Job updated");
      } else {
        await adminApi.createJob(form);
        onNotice?.("success", "Job added");
      }
      resetForm();
      await load();
    } catch (err) {
      onNotice?.("error", err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job opening?")) return;
    try {
      await adminApi.deleteJob(id);
      onNotice?.("success", "Job deleted");
      await load();
    } catch (err) {
      onNotice?.("error", err.response?.data?.message || err.message);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E8DDD0] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(101,42,39,0.45)] md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
            Career Jobs
          </h2>
          <p className="mt-1 font-montserrat text-[13px] text-[#666666]">
            Add openings that appear on the careers page and in the application form.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setShowForm(true);
          }}
          className="cursor-pointer rounded-full bg-[#652A27] px-4 py-2 font-montserrat text-[13px] text-white"
        >
          Add job
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-[#EEEEEE] p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className={inputClass}
              placeholder="Job title *"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
            <input
              className={inputClass}
              placeholder="Experience *"
              value={form.experience}
              onChange={(e) => setForm((prev) => ({ ...prev, experience: e.target.value }))}
              required
            />
            <input
              className={inputClass}
              placeholder="Job type"
              value={form.jobType}
              onChange={(e) => setForm((prev) => ({ ...prev, jobType: e.target.value }))}
            />
            <input
              className={inputClass}
              type="number"
              placeholder="Order"
              value={form.order}
              onChange={(e) => setForm((prev) => ({ ...prev, order: e.target.value }))}
            />
          </div>
          <textarea
            className="min-h-[140px] w-full rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-4 py-3 font-montserrat text-[14px] text-[#333333] outline-none"
            placeholder="Job description (one line per bullet)"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
            />
            <span className="font-montserrat text-[14px]">Active on careers page</span>
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-full bg-[#652A27] px-5 py-2 font-montserrat text-[13px] text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Update job" : "Save job"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="cursor-pointer rounded-full border border-[#DDDDDD] px-5 py-2 font-montserrat text-[13px] text-[#666666]"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <p className="mt-6 font-montserrat text-[14px] text-[#999999]">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="mt-6 font-montserrat text-[14px] text-[#999999]">No job openings yet</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#EEEEEE] text-left">
                <th className="pb-3 font-montserrat text-[12px] uppercase text-[#999999]">Title</th>
                <th className="pb-3 font-montserrat text-[12px] uppercase text-[#999999]">Experience</th>
                <th className="pb-3 font-montserrat text-[12px] uppercase text-[#999999]">Type</th>
                <th className="pb-3 font-montserrat text-[12px] uppercase text-[#999999]">Status</th>
                <th className="pb-3 font-montserrat text-[12px] uppercase text-[#999999]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-b border-[#F5F5F5]">
                  <td className="py-4 font-montserrat text-[13px]">{job.title}</td>
                  <td className="py-4 font-montserrat text-[13px]">{job.experience}</td>
                  <td className="py-4 font-montserrat text-[13px]">{job.jobType}</td>
                  <td className="py-4 font-montserrat text-[13px]">
                    {job.isActive ? "Active" : "Hidden"}
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(job)}
                        className="cursor-pointer rounded-full border border-[#652A27] px-3 py-1 font-montserrat text-[12px] text-[#652A27]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(job._id)}
                        className="cursor-pointer rounded-full border border-[#DDDDDD] px-3 py-1 font-montserrat text-[12px] text-[#C62828]"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
