import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IProductImage {
  url: string;
  alt?: string;
  sortOrder: number;
}

export interface IProductSpec {
  key: string;
  value: string;
}

export interface IProductVariation {
  name: string;
  catalogNumber?: string;
}

export interface IProduct extends Document {
  name: string;
  productCode: string;
  shortDescription?: string;
  description: string;
  featured: boolean;
  inStock: boolean;
  images: IProductImage[];
  specs: IProductSpec[];
  variations: IProductVariation[];
  categoryIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    productCode: { type: String, required: true, unique: true },
    shortDescription: { type: String },
    description: { type: String, required: true },
    featured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
        sortOrder: { type: Number, default: 0 },
      },
    ],
    specs: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    variations: [
      {
        name: { type: String, required: true },
        catalogNumber: { type: String },
      },
    ],
    categoryIds: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.index({ featured: -1, name: 1 });
ProductSchema.index({ name: "text", productCode: "text" });

export const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>("Product", ProductSchema);
