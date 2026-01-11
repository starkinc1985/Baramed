import React from "react";
import BlogItem from "./BlogItem";
import BlogData from "./blogData";
import Link from "next/link";

const Blog = () => {
  return (
    <div className="flex flex-col">
      {BlogData.slice(0, 2).map((blog, key) => (
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
