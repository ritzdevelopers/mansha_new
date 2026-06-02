import { notFound } from "next/navigation";
import React from "react";
import BlogDetailBanner from "./BlogDetailBanner";
import { getBlogDetailContent } from "./blogDetailContent";
import { getBlogPostBySlug } from "./blogPosts";
import Footer from "../Home/Footer";

const BlogDetailPage = ({ slug }) => {
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
