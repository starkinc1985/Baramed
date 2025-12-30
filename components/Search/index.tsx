"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { searchProducts } from "@/data/products";
import { Product } from "@/types/product";

interface SearchProps {
  onClose?: () => void;
}

export default function Search({ onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchProducts(query);
      setResults(searchResults.slice(0, 8)); // Limit to 8 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = () => {
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products, codes, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-stroke bg-white px-6 py-3 pl-12 text-regular focus:border-primary focus:outline-none dark:border-strokedark dark:bg-blacksection"
        />
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-waterloo"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-blacksection">
          <div className="max-h-96 overflow-y-auto">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onClick={handleResultClick}
                className="block border-b border-stroke p-4 transition-colors hover:bg-gray-50 dark:border-strokedark dark:hover:bg-black"
              >
                <div className="flex items-start gap-4">
                  {product.images[0] && (
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-black dark:text-white">
                      {product.name}
                    </h3>
                    <p className="mb-1 text-sm text-waterloo">
                      Code: {product.productCode}
                    </p>
                    <p className="line-clamp-2 text-sm text-waterloo">
                      {product.shortDescription || product.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            {results.length >= 8 && (
              <Link
                href={`/products?search=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="block border-t border-stroke p-4 text-center text-primary hover:bg-gray-50 dark:border-strokedark dark:hover:bg-black"
              >
                View all results for "{query}"
              </Link>
            )}
          </div>
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-lg border border-stroke bg-white p-4 shadow-lg dark:border-strokedark dark:bg-blacksection">
          <p className="text-center text-waterloo">No products found</p>
        </div>
      )}
    </div>
  );
}

