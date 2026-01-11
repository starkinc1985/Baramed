"use client";
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blog }: { blog: Blog }) => {
  const { mainImage, title, metadata } = blog;

  return (
    <Link
      href={`/blog/blog-details`}
      className="group mb-3 flex min-h-[80px] gap-3 rounded-lg border border-green-200 bg-white p-3 transition-all last:mb-0 hover:border-green-400 hover:shadow-sm dark:border-green-800 dark:bg-blacksection dark:hover:border-green-600"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="64px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="mb-1.5 line-clamp-2 text-sm font-bold leading-tight text-black transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
          {title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-waterloo">
          {metadata}
        </p>
      </div>
    </Link>
  );
};

export default BlogItem;
