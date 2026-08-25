"use client";

import { resolveMediaUrl } from "@/lib/mediaUrl";
import { adminApi } from "@/lib/api";
import { useState } from "react";

export default function ImageUploadField({
  label = "Image",
  value,
  onChange,
  disabled,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const preview = resolveMediaUrl(value);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const data = await adminApi.uploadImage(file);
      onChange?.(data.path || data.url);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <p className="mb-2 font-montserrat text-[12px] uppercase text-[#999999]">
        {label}
      </p>
      {preview ? (
        <div className="mb-3 overflow-hidden rounded-xl border border-[#EEEEEE]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt={label} className="h-36 w-full object-cover" />
        </div>
      ) : null}
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#DDDDDD] px-4 py-2 font-montserrat text-[13px] text-[#333333] hover:bg-[#F5F5F5]">
        <i className="ri-upload-2-line" aria-hidden />
        {uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={disabled || uploading}
          onChange={handleFile}
        />
      </label>
      {value ? (
        <button
          type="button"
          className="ml-2 cursor-pointer font-montserrat text-[12px] text-[#C62828]"
          onClick={() => onChange?.("")}
          disabled={disabled || uploading}
        >
          Remove
        </button>
      ) : null}
      {error ? (
        <p className="mt-2 font-montserrat text-[12px] text-[#C62828]">{error}</p>
      ) : null}
    </div>
  );
}
