import Image from "next/image";
import { getBlogPostBySlug } from "./blogPosts";

const FALLBACK_IMAGE = "/blog/blog-image.png";

const BlogDetailFeaturedImage = ({ slug }) => {
  const post = getBlogPostBySlug(slug);
  const src = post?.image ?? FALLBACK_IMAGE;
  const alt = post?.title ?? "Blog featured image";

  return (
    <div className="mb-6 w-full overflow-hidden rounded-lg bg-[#f0f0f0] text-left md:mb-8">
      <Image
        src={src}
        alt={alt}
        width={1050}
        height={591}
        className="h-auto w-full object-cover"
        sizes="(max-width: 1050px) 100vw, 1050px"
        priority
      />
    </div>
  );
};

export default BlogDetailFeaturedImage;
