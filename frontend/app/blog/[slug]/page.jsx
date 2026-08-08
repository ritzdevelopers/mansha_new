import React from "react";
import BlogDetailPage from "../../component/blog/BlogDetailPage";

const page = async ({ params }) => {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
};

export default page;
