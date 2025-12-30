import { Product } from "@/types/product";

// Sample products - In production, this would come from a CMS or database
export const sampleProducts: Product[] = [
  {
    id: "prod-001",
    name: "Mayo Scissors - Straight, 14cm",
    productCode: "MS-14-S",
    description: "High-quality straight Mayo scissors designed for cutting heavy tissues and sutures. Made from premium German stainless steel with precision-ground blades.",
    shortDescription: "Premium straight Mayo scissors for heavy tissue cutting",
    images: ["/images/products/mayo-scissors-01.jpg"],
    category: "scissors",
    subcategory: "mayo-scissors",
    surgeryTypes: ["general-surgery"],
    specifications: {
      dimensions: "14cm (5.5 inches)",
      material: "German Stainless Steel 420",
      finish: "Satin Finish",
      weight: "45g",
      bladeType: "Straight",
    },
    compliance: {
      iso: ["ISO 13485", "ISO 9001"],
      ce: true,
      mdr: true,
      fda: false,
    },
    featured: true,
    inStock: true,
    tags: ["scissors", "mayo", "general-surgery", "premium"],
  },
  {
    id: "prod-002",
    name: "Metzenbaum Scissors - Curved, 16cm",
    productCode: "MZ-16-C",
    description: "Curved Metzenbaum scissors ideal for delicate tissue dissection. Features fine, curved blades perfect for precision work in general and plastic surgery.",
    shortDescription: "Curved Metzenbaum scissors for delicate tissue dissection",
    images: ["/images/products/metzenbaum-scissors-01.jpg"],
    category: "scissors",
    subcategory: "metzenbaum-scissors",
    surgeryTypes: ["general-surgery", "plastic-surgery"],
    specifications: {
      dimensions: "16cm (6.3 inches)",
      material: "German Stainless Steel 420",
      finish: "Satin Finish",
      weight: "38g",
      bladeType: "Curved",
    },
    compliance: {
      iso: ["ISO 13485", "ISO 9001"],
      ce: true,
      mdr: true,
    },
    featured: true,
    inStock: true,
    tags: ["scissors", "metzenbaum", "delicate", "precision"],
  },
  {
    id: "prod-003",
    name: "Adson Tissue Forceps - 1x2 Teeth",
    productCode: "ATF-12",
    description: "Adson tissue forceps with 1x2 teeth pattern. Perfect for grasping and manipulating delicate tissues during surgical procedures.",
    shortDescription: "Adson tissue forceps with 1x2 teeth for delicate tissue handling",
    images: ["/images/products/adson-forceps-01.jpg"],
    category: "forceps",
    subcategory: "adson-forceps",
    surgeryTypes: ["general-surgery", "plastic-surgery"],
    specifications: {
      dimensions: "12.5cm (4.9 inches)",
      material: "German Stainless Steel 420",
      finish: "Satin Finish",
      weight: "25g",
      teethPattern: "1x2",
    },
    compliance: {
      iso: ["ISO 13485"],
      ce: true,
      mdr: true,
    },
    featured: false,
    inStock: true,
    tags: ["forceps", "adson", "tissue", "delicate"],
  },
  {
    id: "prod-004",
    name: "Mayo-Hegar Needle Holder - 18cm",
    productCode: "MH-18",
    description: "Standard Mayo-Hegar needle holder with serrated jaws. Ideal for holding and manipulating surgical needles during suturing procedures.",
    shortDescription: "Mayo-Hegar needle holder for surgical suturing",
    images: ["/images/products/mayo-hegar-01.jpg"],
    category: "needle-holders",
    subcategory: "mayo-hegar",
    surgeryTypes: ["general-surgery"],
    specifications: {
      dimensions: "18cm (7.1 inches)",
      material: "German Stainless Steel 420",
      finish: "Satin Finish",
      weight: "85g",
      jawType: "Serrated",
    },
    compliance: {
      iso: ["ISO 13485", "ISO 9001"],
      ce: true,
      mdr: true,
    },
    featured: true,
    inStock: true,
    tags: ["needle-holder", "suturing", "mayo-hegar"],
  },
  {
    id: "prod-005",
    name: "Self-Retaining Abdominal Retractor - Large",
    productCode: "SAR-L",
    description: "Self-retaining abdominal retractor designed for maintaining exposure during abdominal surgery. Features adjustable blades and secure locking mechanism.",
    shortDescription: "Self-retaining abdominal retractor for surgical exposure",
    images: ["/images/products/abdominal-retractor-01.jpg"],
    category: "retractors",
    subcategory: "self-retaining-retractors",
    surgeryTypes: ["general-surgery"],
    specifications: {
      dimensions: "Adjustable: 15-25cm",
      material: "German Stainless Steel 420",
      finish: "Satin Finish",
      weight: "320g",
      bladeCount: "4",
    },
    compliance: {
      iso: ["ISO 13485"],
      ce: true,
      mdr: true,
    },
    featured: false,
    inStock: true,
    tags: ["retractor", "abdominal", "self-retaining"],
  },
];

// Helper functions
export function getProductsByCategory(categoryId: string): Product[] {
  return sampleProducts.filter(
    (product) => product.category === categoryId || product.subcategory === categoryId
  );
}

export function getProductsBySurgeryType(surgeryType: string): Product[] {
  return sampleProducts.filter((product) =>
    product.surgeryTypes.includes(surgeryType)
  );
}

export function getProductById(id: string): Product | undefined {
  return sampleProducts.find((product) => product.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return sampleProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.productCode.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getFeaturedProducts(): Product[] {
  return sampleProducts.filter((product) => product.featured);
}

