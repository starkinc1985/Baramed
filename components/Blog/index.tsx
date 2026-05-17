import React from "react";
import BlogItem from "./BlogItem";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";

const Blog = async () => {
  await connectDB();
  const posts = await BlogPost.find({ published: true }).sort({ publishedAt: -1 }).limit(2).lean();

  const blogs = (posts as any[]).map((p) => ({
    _id: p._id,
    title: p.title,
    mainImage: p.coverImage || "/images/blog/blog-01.png",
    metadata: p.excerpt || "",
  }));

  return (
    <div className="flex flex-col">
      {blogs.map((blog, key) => (
        <BlogItem blog={blog} key={key} />
      ))}
      <Link
        href="/blog"
        className="mt-3 flex w-full items-center justify-center rounded-lg border border-green-200 bg-white px-4 py-2.5 text-sm font-medium text-green-700 transition-all hover:border-green-400 hover:bg-green-50 hover:text-green-800 dark:border-green-800 dark:bg-blacksection dark:text-green-400 dark:hover:border-green-600 dark:hover:bg-green-950/30"
      >
        See All
      </Link>
    </div>
  );
};

export default Blog;
