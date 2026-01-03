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
        className="mt-4 flex w-full items-center justify-center rounded-xl border-2 border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-md dark:border-emerald-800 dark:bg-slate-800 dark:text-emerald-400 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/30"
      >
        See All
        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default Blog;
