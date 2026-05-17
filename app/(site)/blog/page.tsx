import BlogItem from "@/components/Blog/BlogItem";
import { Metadata } from "next";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";

export const metadata: Metadata = {
  title: "Blog | BÄRAMED INSTRUMENTE GMBH",
  description: "News and updates from BÄRAMED INSTRUMENTE GMBH",
};

const BlogPage = async () => {
  await connectDB();
  const posts = await BlogPost.find({ published: true }).sort({ publishedAt: -1 }).lean();

  const blogs = (posts as any[]).map((p) => ({
    _id: p._id,
    title: p.title,
    mainImage: p.coverImage || "/images/blog/blog-01.png",
    metadata: p.excerpt || "",
  }));

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {blogs.map((post, key) => (
            <BlogItem key={key} blog={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
