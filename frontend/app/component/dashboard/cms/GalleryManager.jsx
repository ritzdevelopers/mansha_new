"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import ImageUploadField from "../ImageUploadField";

const emptyForm = {
  title: "Signature Masterpieces",
  image: "",
  isActive: true,
  order: 0,
};

const inputClass =
  "h-[48px] w-full rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-4 font-montserrat text-[14px] text-[#333333] outline-none";

export default function GalleryManager({ onNotice }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getGallery();
      setImages(data.images || []);
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

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "Signature Masterpieces",
      image: item.image || "",
      isActive: item.isActive !== false,
      order: item.order || 0,
    });
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.image) {
      onNotice?.("error", "Please upload an image");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await adminApi.updateGalleryImage(editingId, form);
        onNotice?.("success", "Gallery image updated");
      } else {
        await adminApi.createGalleryImage(form);
        onNotice?.("success", "Gallery image added");
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
    if (!window.confirm("Delete this gallery image?")) return;
    try {
      await adminApi.deleteGalleryImage(id);
      onNotice?.("success", "Gallery image deleted");
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
            Signature Masterpieces
          </h2>
          <p className="mt-1 font-montserrat text-[13px] text-[#666666]">
            Upload images for the home page Signature Masterpieces gallery.
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
          Add image
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-[#EEEEEE] p-4">
          <input
            className={inputClass}
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />
          <ImageUploadField
            label="Gallery image"
            value={form.image}
            onChange={(image) => setForm((prev) => ({ ...prev, image }))}
            disabled={saving}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className={inputClass}
              type="number"
              placeholder="Order"
              value={form.order}
              onChange={(e) => setForm((prev) => ({ ...prev, order: e.target.value }))}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
              />
              <span className="font-montserrat text-[14px]">Active</span>
            </label>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-full bg-[#652A27] px-5 py-2 font-montserrat text-[13px] text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Update image" : "Save image"}
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
        <p className="mt-6 font-montserrat text-[14px] text-[#999999]">Loading gallery...</p>
      ) : images.length === 0 ? (
        <p className="mt-6 font-montserrat text-[14px] text-[#999999]">No gallery images yet</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((item) => (
            <article key={item._id} className="overflow-hidden rounded-xl border border-[#EEEEEE]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveMediaUrl(item.image)}
                alt={item.title}
                className="h-40 w-full object-cover"
              />
              <div className="flex items-center justify-between gap-2 p-3">
                <div>
                  <p className="font-montserrat text-[13px] text-[#111111]">{item.title}</p>
                  <p className="font-montserrat text-[12px] text-[#999999]">
                    {item.isActive ? "Active" : "Hidden"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="cursor-pointer font-montserrat text-[12px] text-[#652A27]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="cursor-pointer font-montserrat text-[12px] text-[#C62828]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
