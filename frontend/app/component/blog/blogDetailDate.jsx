import { getBlogPostBySlug } from "./blogPosts";

const BlogDetailDate = ({ slug }) => {
  const post = getBlogPostBySlug(slug);
  if (!post?.date) return null;

  return (
    <time className="mt-2 block font-montserrat text-[15px] font-semibold capitalize leading-[29px] tracking-[0] text-[#00000066] md:text-[18px]">
      {post.date.trim()}
    </time>
  );
};

export default BlogDetailDate;
