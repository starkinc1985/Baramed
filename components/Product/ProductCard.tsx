"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

// Helper function to get placeholder image based on category - Using medical instrument themed images
function getPlaceholderImage(category: string): string {
  const categoryImages: Record<string, string> = {
    scissors: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=600&fit=crop&q=80",
    forceps: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&q=80",
    "needle-holders": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=600&fit=crop&q=80",
    retractors: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=600&fit=crop&q=80",
    clamps: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=600&fit=crop&q=80",
    "rongeurs-bone-instruments": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&q=80",
    "orthopedic-instruments": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&q=80",
    "ent-instruments": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=600&fit=crop&q=80",
    "gynecology-instruments": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=600&fit=crop&q=80",
    "suction-instruments": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=600&fit=crop&q=80",
    "probes-dilators": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=600&fit=crop&q=80",
    elevators: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=600&fit=crop&q=80",
    "dental-instruments": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&q=80",
    "sterilization-accessories": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=600&fit=crop&q=80",
  };
  
  return categoryImages[category] || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&q=80";
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = product.images[0] && !imageError 
    ? product.images[0] 
    : getPlaceholderImage(product.category);

  return (
    <Link
      href={`/products/${product.id}`}
      className={`group relative overflow-hidden rounded-2xl border-2 border-stroke bg-white shadow-md transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-1 dark:border-strokedark dark:bg-blacksection ${className}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {product.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-sm">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-black transition-colors group-hover:text-primary dark:text-white">
          {product.name}
        </h3>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
          {product.productCode}
        </p>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-waterloo">
          {product.shortDescription || product.description}
        </p>
        
        {/* Compliance Badges */}
        {(product.compliance.ce || product.compliance.mdr) && (
          <div className="mt-auto flex flex-wrap gap-2">
            {product.compliance.ce && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                CE
              </span>
            )}
            {product.compliance.mdr && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800 dark:bg-green-900/40 dark:text-green-200">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                MDR
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

