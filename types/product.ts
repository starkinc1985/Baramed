export type Product = {
  id: string;
  name: string;
  productCode: string;
  description: string;
  shortDescription?: string;
  images: string[];
  category: string; // Instrument type category
  surgeryTypes: string[]; // Surgery type categories
  subcategory?: string;
  specifications: {
    dimensions?: string;
    material?: string;
    finish?: string;
    weight?: string;
    [key: string]: string | undefined;
  };
  compliance: {
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

