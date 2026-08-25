"use client";

import { useEffect, useState } from "react";
import { JOBS } from "@/app/component/common/JobApply";
import { BLOG_POSTS } from "@/app/component/blog/blogPosts";
import { resolveMediaUrl } from "./mediaUrl";
import axiosInstance from "./axiosInstance";

const PALETTES = [
  { iconBg: "bg-[#FFF0E6]", iconColor: "text-[#E87B35]" },
  { iconBg: "bg-[#E8F5E9]", iconColor: "text-[#4CAF50]" },
  { iconBg: "bg-[#E3F2FD]", iconColor: "text-[#2196F3]" },
  { iconBg: "bg-[#FCE4EC]", iconColor: "text-[#E91E63]" },
  { iconBg: "bg-[#E0F2F1]", iconColor: "text-[#009688]" },
  { iconBg: "bg-[#F3E5F5]", iconColor: "text-[#9C27B0]" },
];

function mapJob(job) {
  return {
    id: job._id || job.id,
    title: job.title,
    experience: job.experience,
    jobType: job.jobType || "Full Time",
    description: Array.isArray(job.description) ? job.description : [],
  };
}

function mapAward(award, index) {
  const palette = PALETTES[index % PALETTES.length];
  const year = award.year || "";
  return {
    id: award.slug || award._id,
    featured: Boolean(award.featured),
    iconBg: award.featured ? PALETTES[0].iconBg : palette.iconBg,
    iconColor: award.featured ? PALETTES[0].iconColor : palette.iconColor,
    tags: [
      ...(award.featured ? [{ label: "Featured", featured: true }] : []),
      ...(year ? [{ label: year, featured: false }] : []),
    ],
    location: award.location || null,
    title: award.title,
    subtitle: award.subtitle || "",
    year,
    eyebrow: award.eyebrow || award.title,
    heading: award.heading || award.subtitle || award.title,
    description: award.description || "",
    images: (award.images || []).map((image) => ({
      src: resolveMediaUrl(image.src || image),
      alt: image.alt || award.title,
    })),
  };
}

function mapGallery(item, index) {
  return {
    id: item._id || index,
    title: item.title || `Signature Masterpieces ${index + 1}`,
    src: resolveMediaUrl(item.image),
  };
}

function mapBlog(blog) {
  const dateValue = blog.publishedAt || blog.createdAt;
  const date = dateValue
    ? new Date(dateValue).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
  return {
    id: blog._id || blog.slug,
    slug: blog.slug,
    date,
    title: blog.title,
    image: resolveMediaUrl(blog.featuredImage) || "/blog/blog-image.png",
    descriptionLead: blog.excerpt || "",
    content: blog.content || "",
    author: blog.author || "Mansha Group",
    metaTitle: blog.metaTitle || blog.title || "",
    metaDescription: blog.metaDescription || blog.excerpt || "",
    metaKeywords: blog.metaKeywords || "",
    canonicalUrl: blog.canonicalUrl || "",
    isApi: true,
  };
}

export function useCareerJobs() {
  const [jobs, setJobs] = useState(JOBS);

  useEffect(() => {
    let cancelled = false;
    axiosInstance
      .get("/jobs")
      .then(({ data }) => {
        const next = (data.jobs || []).map(mapJob);
        if (!cancelled && next.length) setJobs(next);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return jobs;
}

export function useAwards(fallback) {
  const [awards, setAwards] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    axiosInstance
      .get("/awards")
      .then(({ data }) => {
        const next = (data.awards || []).map(mapAward);
        if (!cancelled && next.length) setAwards(next);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return awards;
}

export function useGallery(fallback) {
  const [slides, setSlides] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    axiosInstance
      .get("/gallery")
      .then(({ data }) => {
        const next = (data.images || []).map(mapGallery).filter((item) => item.src);
        if (!cancelled && next.length) setSlides(next);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return slides;
}

export function usePublishedBlogs() {
  const [posts, setPosts] = useState(BLOG_POSTS);

  useEffect(() => {
    let cancelled = false;
    axiosInstance
      .get("/blogs")
      .then(({ data }) => {
        const mapped = (data.blogs || []).map(mapBlog);
        if (cancelled || !mapped.length) return;
        const slugs = new Set(mapped.map((post) => post.slug));
        const rest = BLOG_POSTS.filter((post) => !slugs.has(post.slug));
        setPosts([...mapped, ...rest]);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return posts;
}
