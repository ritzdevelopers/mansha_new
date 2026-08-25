"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { adminApi } from "@/lib/api";
import { formatBlogDate, resolveMediaUrl } from "@/lib/mediaUrl";
import { blogCanonicalUrl } from "@/lib/seo";
import ImageUploadField from "../ImageUploadField";

const ManshaEditor = dynamic(() => import("../ManshaEditor"), { ssr: false });

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  author: "Mansha Group",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  isPublished: true,
};

const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const inputClass =
  "h-[48px] w-full rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-4 font-montserrat text-[14px] text-[#333333] outline-none";

export default function BlogManager({ onNotice }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getBlogs();
      setBlogs(data.blogs || []);
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

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      featuredImage: blog.featuredImage || "",
      author: blog.author || "Mansha Group",
      metaTitle: blog.metaTitle || blog.title || "",
      metaDescription: blog.metaDescription || blog.excerpt || "",
      metaKeywords: blog.metaKeywords || "",
      isPublished: Boolean(blog.isPublished),
    });
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const nextSlug = slugify(form.slug || form.title);
      const payload = {
        ...form,
        slug: nextSlug,
        metaTitle: form.metaTitle.trim() || form.title.trim(),
        metaDescription: form.metaDescription.trim() || form.excerpt.trim(),
        metaKeywords: form.metaKeywords.trim(),
        canonicalUrl: blogCanonicalUrl(nextSlug),
      };
      if (editingId) {
        await adminApi.updateBlog(editingId, payload);
        onNotice?.("success", "Blog updated");
      } else {
        await adminApi.createBlog(payload);
        onNotice?.("success", "Blog published");
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
    if (!window.confirm("Delete this blog?")) return;
    try {
      await adminApi.deleteBlog(id);
      onNotice?.("success", "Blog deleted");
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
            Blogs
          </h2>
          <p className="mt-1 font-montserrat text-[13px] text-[#666666]">
            Create and publish blogs with the editor. Published posts appear on /blog.
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
          Add blog
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-[#EEEEEE] p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-montserrat text-[12px] uppercase text-[#999999]">
                Title
              </span>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    title: e.target.value,
                    slug: prev.slug || slugify(e.target.value),
                    metaTitle:
                      !prev.metaTitle || prev.metaTitle === prev.title
                        ? e.target.value
                        : prev.metaTitle,
                  }))
                }
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-montserrat text-[12px] uppercase text-[#999999]">
                Slug / Canonical
              </span>
              <input
                className={inputClass}
                value={form.slug}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                }
              />
              <p className="mt-1.5 break-all font-montserrat text-[12px] text-[#888888]">
                Canonical: {blogCanonicalUrl(form.slug || slugify(form.title))}
              </p>
            </label>
            <label className="block">
              <span className="mb-2 block font-montserrat text-[12px] uppercase text-[#999999]">
                Author
              </span>
              <input
                className={inputClass}
                value={form.author}
                onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
              />
            </label>
            <label className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, isPublished: e.target.checked }))
                }
              />
              <span className="font-montserrat text-[14px] text-[#333333]">Published</span>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block font-montserrat text-[12px] uppercase text-[#999999]">
              Short excerpt
            </span>
            <textarea
              className="min-h-[90px] w-full rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-4 py-3 font-montserrat text-[14px] text-[#333333] outline-none"
              value={form.excerpt}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  excerpt: e.target.value,
                  metaDescription:
                    !prev.metaDescription || prev.metaDescription === prev.excerpt
                      ? e.target.value
                      : prev.metaDescription,
                }))
              }
            />
          </label>

          <ImageUploadField
            label="Featured image"
            value={form.featuredImage}
            onChange={(featuredImage) => setForm((prev) => ({ ...prev, featuredImage }))}
            disabled={saving}
          />

          <div className="rounded-xl border border-[#F0E7DC] bg-[#FBF8F4] p-4">
            <h3 className="font-optima text-lg text-[#111111]">SEO</h3>
            <p className="mt-1 font-montserrat text-[12px] text-[#888888]">
              These tags appear in search results. Canonical is always built from the slug.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="mb-2 flex items-center justify-between font-montserrat text-[12px] uppercase text-[#999999]">
                  Meta title
                  <span className="normal-case text-[#BBBBBB]">
                    {form.metaTitle.length}/60
                  </span>
                </span>
                <input
                  className={inputClass}
                  value={form.metaTitle}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, metaTitle: e.target.value }))
                  }
                  placeholder="Shown as the Google title"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 flex items-center justify-between font-montserrat text-[12px] uppercase text-[#999999]">
                  Meta description
                  <span className="normal-case text-[#BBBBBB]">
                    {form.metaDescription.length}/160
                  </span>
                </span>
                <textarea
                  className="min-h-[90px] w-full rounded-lg border border-[#EEEEEE] bg-white px-4 py-3 font-montserrat text-[14px] text-[#333333] outline-none"
                  value={form.metaDescription}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      metaDescription: e.target.value,
                    }))
                  }
                  placeholder="Short summary for search results"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block font-montserrat text-[12px] uppercase text-[#999999]">
                  Meta keywords
                </span>
                <input
                  className={inputClass}
                  value={form.metaKeywords}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, metaKeywords: e.target.value }))
                  }
                  placeholder="faridabad real estate, mansha group, plots"
                />
                <p className="mt-1 font-montserrat text-[12px] text-[#888888]">
                  Separate keywords with commas
                </p>
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block font-montserrat text-[12px] uppercase text-[#999999]">
                  Canonical URL
                </span>
                <input
                  className={`${inputClass} bg-[#F3EEE6] text-[#666666]`}
                  value={blogCanonicalUrl(form.slug || slugify(form.title))}
                  readOnly
                />
              </label>
            </div>
          </div>

          <div>
            <p className="mb-2 font-montserrat text-[12px] uppercase text-[#999999]">
              Blog content
            </p>
            <ManshaEditor
              value={form.content}
              onChange={(content) => setForm((prev) => ({ ...prev, content }))}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-full bg-[#652A27] px-5 py-2 font-montserrat text-[13px] text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Update blog" : "Save blog"}
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
        <p className="mt-6 font-montserrat text-[14px] text-[#999999]">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="mt-6 font-montserrat text-[14px] text-[#999999]">No blogs yet</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#EEEEEE] text-left">
                <th className="pb-3 font-montserrat text-[12px] font-medium uppercase text-[#999999]">
                  Blog
                </th>
                <th className="pb-3 font-montserrat text-[12px] font-medium uppercase text-[#999999]">
                  Status
                </th>
                <th className="pb-3 font-montserrat text-[12px] font-medium uppercase text-[#999999]">
                  Date
                </th>
                <th className="pb-3 font-montserrat text-[12px] font-medium uppercase text-[#999999]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b border-[#F5F5F5]">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {blog.featuredImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={resolveMediaUrl(blog.featuredImage)}
                          alt=""
                          className="h-12 w-16 rounded object-cover"
                        />
                      ) : null}
                      <div>
                        <p className="font-montserrat text-[14px] text-[#111111]">{blog.title}</p>
                        <p className="font-montserrat text-[12px] text-[#999999]">/{blog.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-montserrat text-[13px]">
                    {blog.isPublished ? "Published" : "Draft"}
                  </td>
                  <td className="py-4 font-montserrat text-[13px] text-[#666666]">
                    {formatBlogDate(blog.publishedAt || blog.createdAt) || "-"}
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(blog)}
                        className="cursor-pointer rounded-full border border-[#652A27] px-3 py-1 font-montserrat text-[12px] text-[#652A27]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(blog._id)}
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
