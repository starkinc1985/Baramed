"use client";
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blog }: { blog: Blog }) => {
  const { mainImage, title, metadata } = blog;

  return (
    <Link
      href={`/blog/blog-details`}
      className="group mb-4 flex min-h-[100px] gap-4 rounded-xl border-2 border-emerald-200 bg-white p-4 transition-all last:mb-0 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-0.5 dark:border-emerald-800 dark:bg-slate-800 dark:hover:border-emerald-600"
    >
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:border-emerald-900 dark:from-emerald-950 dark:to-emerald-900">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="80px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="mb-2 line-clamp-2 text-base font-bold leading-tight text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {metadata}
        </p>
      </div>
    </Link>
  );
};

export default BlogItem;
