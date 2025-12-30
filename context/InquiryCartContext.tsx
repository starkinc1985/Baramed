"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";

interface InquiryCartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

interface InquiryCartContextType {
  items: InquiryCartItem[];
  addToInquiry: (product: Product, quantity?: number) => void;
  removeFromInquiry: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearInquiry: () => void;
  itemCount: number;
}

const InquiryCartContext = createContext<InquiryCartContextType | undefined>(
  undefined
);

export function InquiryCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<InquiryCartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("inquiryCart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading inquiry cart:", e);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("inquiryCart", JSON.stringify(items));
  }, [items]);

  const addToInquiry = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromInquiry = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromInquiry(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearInquiry = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <InquiryCartContext.Provider
      value={{
        items,
        addToInquiry,
        removeFromInquiry,
        updateQuantity,
        clearInquiry,
        itemCount,
      }}
    >
      {children}
    </InquiryCartContext.Provider>
  );
}

export function useInquiryCart() {
  const context = useContext(InquiryCartContext);
  if (context === undefined) {
    throw new Error("useInquiryCart must be used within InquiryCartProvider");
  }
  return context;
}

