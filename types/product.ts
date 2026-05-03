export type Product = {
  id: string;
  name: string;
  productCode: string;
  description: string;
  shortDescription?: string;
  images: string[];
<<<<<<< HEAD
  category: string; // Instrument type category
  surgeryTypes: string[]; // Surgery type categories
  subcategory?: string;
=======
  /**
   * DB-backed products still compute these for UI (placeholders, surgery filters, etc).
   * They are not persisted as single fields in Postgres (categories are normalized).
   */
  category?: string; // top-level instrument type slug
  subcategory?: string; // instrument subcategory slug
  surgeryTypes?: string[]; // top-level surgery type slugs
>>>>>>> 6f7bc4d (Moiz db commit)
  specifications: {
    dimensions?: string;
    material?: string;
    finish?: string;
    weight?: string;
    [key: string]: string | undefined;
  };
<<<<<<< HEAD
  compliance: {
=======
  /**
   * Static in UI; optional so API-mapped products can omit and rely on defaults in components.
   */
  compliance?: {
>>>>>>> 6f7bc4d (Moiz db commit)
    iso?: string[];
    ce?: boolean;
    mdr?: boolean;
    fda?: boolean;
    [key: string]: string[] | boolean | undefined;
  };
  variations?: ProductVariation[];
  featured?: boolean;
  inStock?: boolean;
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

export type ProductVariation = {
  id: string;
  name: string;
  productCode: string;
  specifications?: {
    [key: string]: string;
  };
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  subcategories?: Category[];
  parentId?: string;
};

export type InstrumentTypeCategory = Category & {
  type: "instrument";
};

export type SurgeryTypeCategory = Category & {
  type: "surgery";
};

