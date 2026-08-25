import React from "react";
import BlogDetailPage from "../../component/blog/BlogDetailPage";
import { fetchPublishedBlogBySlug } from "@/lib/publicCms";
import { getBlogPostBySlug } from "../../component/blog/blogPosts";
import { blogCanonicalUrl, parseKeywords, absoluteUrl } from "@/lib/seo";
import { resolveMediaUrl } from "@/lib/mediaUrl";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const apiBlog = await fetchPublishedBlogBySlug(slug);
  const post = apiBlog || getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog | Mansha Group",
    };
  }

  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription || post.descriptionLead || post.excerpt || "";
  const canonical = post.canonicalUrl || blogCanonicalUrl(slug);
  const keywords = parseKeywords(post.metaKeywords);
  const image = post.image ? absoluteUrl(resolveMediaUrl(post.image)) : undefined;

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Mansha Group",
      type: "article",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

const page = async ({ params }) => {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
};

export default page;
