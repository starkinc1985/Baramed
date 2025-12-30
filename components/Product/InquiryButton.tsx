"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { useInquiryCart } from "@/context/InquiryCartContext";

interface InquiryButtonProps {
  product: Product;
}

export default function InquiryButton({ product }: InquiryButtonProps) {
  const { addToInquiry } = useInquiryCart();
  const [added, setAdded] = useState(false);

  const handleAddToInquiry = () => {
    addToInquiry(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddToInquiry}
        className="w-full rounded-full bg-primary px-8 py-4 text-regular font-medium text-white duration-300 ease-in-out hover:bg-primaryho"
      >
        {added ? "✓ Added to Inquiry" : "Add to Inquiry"}
      </button>
      <Link
        href="/contact?inquiry=true"
        className="block w-full rounded-full border border-primary bg-transparent px-8 py-4 text-center text-regular font-medium text-primary duration-300 ease-in-out hover:bg-primary/10"
      >
        Request Quote
      </Link>
    </div>
  );
}

