"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import ImageUploadField from "../ImageUploadField";

const emptyForm = {
  title: "",
  slug: "",
  subtitle: "",
  year: "",
  location: "",
  featured: false,
  eyebrow: "",
  heading: "",
  description: "",
  images: [],
  isActive: true,
  order: 0,
};

const inputClass =
  "h-[48px] w-full rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-4 font-montserrat text-[14px] text-[#333333] outline-none";

export default function AwardsManager({ onNotice }) {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getAwards();
      setAwards(data.awards || []);
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

  const handleEdit = (award) => {
    setEditingId(award._id);
    setForm({
      title: award.title || "",
      slug: award.slug || "",
      subtitle: award.subtitle || "",
      year: award.year || "",
      location: award.location || "",
      featured: Boolean(award.featured),
      eyebrow: award.eyebrow || "",
      heading: award.heading || "",
      description: award.description || "",
      images: award.images || [],
      isActive: award.isActive !== false,
      order: award.order || 0,
    });
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await adminApi.updateAward(editingId, form);
        onNotice?.("success", "Award updated");
      } else {
        await adminApi.createAward(form);
        onNotice?.("success", "Award added");
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
    if (!window.confirm("Delete this award?")) return;
    try {
      await adminApi.deleteAward(id);
      onNotice?.("success", "Award deleted");
      await load();
    } catch (err) {
      onNotice?.("error", err.response?.data?.message || err.message);
    }
  };

  const addImage = (src) => {
    if (!src) return;
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, { src, alt: prev.title || "Award image" }],
    }));
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E8DDD0] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(101,42,39,0.45)] md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-optima text-[22px] font-medium text-[#111111] md:text-[26px]">
            Awards
          </h2>
          <p className="mt-1 font-montserrat text-[13px] text-[#666666]">
            Manage awards and recognition shown on the awards page.
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
          Add award
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-[#EEEEEE] p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className={inputClass}
              placeholder="Title *"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
            <input
              className={inputClass}
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
            />
            <input
              className={inputClass}
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
            />
            <input
              className={inputClass}
              placeholder="Subtitle"
              value={form.subtitle}
              onChange={(e) => setForm((prev) => ({ ...prev, subtitle: e.target.value }))}
            />
            <input
              className={inputClass}
              placeholder="Eyebrow"
              value={form.eyebrow}
              onChange={(e) => setForm((prev) => ({ ...prev, eyebrow: e.target.value }))}
            />
            <input
              className={inputClass}
              placeholder="Heading"
              value={form.heading}
              onChange={(e) => setForm((prev) => ({ ...prev, heading: e.target.value }))}
            />
          </div>
          <textarea
            className="min-h-[90px] w-full rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-4 py-3 font-montserrat text-[14px] outline-none"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
              />
              <span className="font-montserrat text-[14px]">Featured</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
              />
              <span className="font-montserrat text-[14px]">Active</span>
            </label>
          </div>

          <div>
            <p className="mb-3 font-montserrat text-[12px] uppercase text-[#999999]">
              Award images
            </p>
            <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {form.images.map((image, index) => (
                <div key={`${image.src}-${index}`} className="relative overflow-hidden rounded-xl border border-[#EEEEEE]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveMediaUrl(image.src)}
                    alt={image.alt || ""}
                    className="h-24 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                      }))
                    }
                    className="absolute right-1 top-1 cursor-pointer rounded-full bg-white px-2 py-0.5 font-montserrat text-[11px] text-[#C62828]"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <ImageUploadField
              label="Add image"
              value=""
              onChange={addImage}
              disabled={saving}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-full bg-[#652A27] px-5 py-2 font-montserrat text-[13px] text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Update award" : "Save award"}
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
        <p className="mt-6 font-montserrat text-[14px] text-[#999999]">Loading awards...</p>
      ) : awards.length === 0 ? (
        <p className="mt-6 font-montserrat text-[14px] text-[#999999]">No awards yet</p>
      ) : (
        <div className="mt-6 space-y-3">
          {awards.map((award) => (
            <div
              key={award._id}
              className="flex flex-col gap-3 rounded-xl border border-[#EEEEEE] p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-montserrat text-[15px] font-medium text-[#111111]">
                  {award.title}
                </p>
                <p className="font-montserrat text-[13px] text-[#666666]">
                  {[award.year, award.location].filter(Boolean).join(" · ") || "No year/location"}
                  {award.featured ? " · Featured" : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(award)}
                  className="cursor-pointer rounded-full border border-[#652A27] px-3 py-1 font-montserrat text-[12px] text-[#652A27]"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(award._id)}
                  className="cursor-pointer rounded-full border border-[#DDDDDD] px-3 py-1 font-montserrat text-[12px] text-[#C62828]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
