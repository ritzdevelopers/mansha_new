import { apiOrigin } from "./axiosInstance";
import { formatBlogDate, resolveMediaUrl } from "./mediaUrl";
import { blogCanonicalUrl } from "./seo";

async function fetchJson(path) {
  try {
    const response = await fetch(`${apiOrigin()}/api${path}`, {
      next: { revalidate: 30 },
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export function mapApiBlog(blog) {
  if (!blog) return null;
  return {
    id: blog._id || blog.slug,
    slug: blog.slug,
    date: formatBlogDate(blog.publishedAt || blog.createdAt),
    title: blog.title,
    image: resolveMediaUrl(blog.featuredImage) || "/blog/blog-image.png",
    descriptionLead: blog.excerpt || "",
    content: blog.content || "",
    author: blog.author || "Mansha Group",
    metaTitle: blog.metaTitle || blog.title || "",
    metaDescription: blog.metaDescription || blog.excerpt || "",
    metaKeywords: blog.metaKeywords || "",
    canonicalUrl: blog.canonicalUrl || blogCanonicalUrl(blog.slug),
    isApi: true,
  };
}

export async function fetchPublishedBlogs() {
  const data = await fetchJson("/blogs");
  return Array.isArray(data?.blogs) ? data.blogs.map(mapApiBlog).filter(Boolean) : [];
}

export async function fetchPublishedBlogBySlug(slug) {
  const data = await fetchJson(`/blogs/${encodeURIComponent(slug)}`);
  return mapApiBlog(data?.blog);
}

export async function fetchPublicJobs() {
  const data = await fetchJson("/jobs");
  return Array.isArray(data?.jobs) ? data.jobs : [];
}

export async function fetchPublicAwards() {
  const data = await fetchJson("/awards");
  return Array.isArray(data?.awards) ? data.awards : [];
}

export async function fetchPublicGallery() {
  const data = await fetchJson("/gallery");
  return Array.isArray(data?.images) ? data.images : [];
}
