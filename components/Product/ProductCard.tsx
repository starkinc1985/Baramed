"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useState } from "react";
import { DEFAULT_COMPLIANCE } from "@/lib/staticCompliance";

interface ProductCardProps {
  product: Product;
  className?: string;
}

function getPlaceholderImage(category: string): string {
  const categoryImages: Record<string, string> = {
    scissors: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=450&fit=crop&q=80",
    forceps: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=450&fit=crop&q=80",
    "needle-holders": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=450&fit=crop&q=80",
    retractors: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=450&fit=crop&q=80",
    clamps: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=450&fit=crop&q=80",
    "rongeurs-bone-instruments": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=450&fit=crop&q=80",
    "orthopedic-instruments": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=450&fit=crop&q=80",
    "ent-instruments": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=450&fit=crop&q=80",
    "gynecology-instruments": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=450&fit=crop&q=80",
    "suction-instruments": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=450&fit=crop&q=80",
    "probes-dilators": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=450&fit=crop&q=80",
    elevators: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=450&fit=crop&q=80",
    "dental-instruments": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=450&fit=crop&q=80",
    "sterilization-accessories": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=450&fit=crop&q=80",
  };
  return categoryImages[category] || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=450&fit=crop&q=80";
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const compliance = { ...DEFAULT_COMPLIANCE, ...product.compliance };
  const imageUrl = product.images[0] && !imageError
    ? product.images[0]
    : getPlaceholderImage(product.category ?? "scissors");

  return (
    <Link
      href={`/products/${product.id}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border-2 border-[#dce4f0] bg-white shadow-[0_2px_12px_rgba(10,30,100,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_14px_40px_rgba(0,107,255,0.16)] dark:border-[#2a3554] dark:bg-darkcard dark:hover:border-primary/50 ${className}`}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={() => setImageError(true)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white shadow-lg">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          </div>
        )}

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
              Out of Stock
            </span>
          </div>
        )}

        {/* Hover CTA */}
        <div className="absolute bottom-3 right-3 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-lg">
            View Details
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Product code */}
        <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-primary/70">
          {product.productCode}
        </p>

        {/* Name */}
        <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-black transition-colors group-hover:text-primary dark:text-white">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-waterloo">
          {product.shortDescription || product.description}
        </p>

        {/* Footer: compliance badges + arrow */}
        <div className="flex items-center justify-between border-t border-[#dce4f0] pt-3 dark:border-[#2a3554]">
          <div className="flex flex-wrap gap-1.5">
            {compliance.ce && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-700/50">
                <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                CE
              </span>
            )}
            {compliance.mdr && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 ring-1 ring-green-200 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-700/50">
                <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                MDR
              </span>
            )}
          </div>

          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
            <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
