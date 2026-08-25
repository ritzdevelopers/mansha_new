import { notFound } from "next/navigation";
import React from "react";
import BlogDetailBanner from "./BlogDetailBanner";
import BlogHtmlContent from "./BlogHtmlContent";
import { getBlogDetailContent } from "./blogDetailContent";
import { getBlogPostBySlug } from "./blogPosts";
import Footer from "../Home/Footer";
import { fetchPublishedBlogBySlug } from "@/lib/publicCms";

const BlogDetailPage = async ({ slug }) => {
  const apiBlog = await fetchPublishedBlogBySlug(slug);

  if (apiBlog) {
    return (
      <div>
        <BlogDetailBanner title={apiBlog.title} />
        <BlogHtmlContent blog={apiBlog} />
        <Footer />
      </div>
    );
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const Content = getBlogDetailContent(slug);

  return (
    <div>
      <BlogDetailBanner title={post.title} />
      {Content ? <Content /> : null}
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
