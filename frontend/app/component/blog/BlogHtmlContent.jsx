import { resolveMediaUrl } from "@/lib/mediaUrl";

const BlogHtmlContent = ({ blog }) => {
  if (!blog) return null;

  return (
    <article className="bg-white py-10 md:py-14 lg:py-16">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-[70px]">
        <div className="max-w-[1050px] text-left">
          {blog.image ? (
            <div className="relative mb-8 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveMediaUrl(blog.image)}
                alt={blog.title}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}
          {blog.date ? (
            <p className="font-montserrat text-[14px] font-medium text-[#00000066]">
              {blog.date}
              {blog.author ? ` · ${blog.author}` : ""}
            </p>
          ) : null}
          <div
            className="mansha-blog-content mt-6"
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />
        </div>
      </div>
    </article>
  );
};

export default BlogHtmlContent;
