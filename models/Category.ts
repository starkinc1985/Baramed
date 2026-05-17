import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ICategory extends Document {
  type: "INSTRUMENT" | "SURGERY";
  name: string;
  slug: string;
  description?: string;
  parentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    type: { type: String, enum: ["INSTRUMENT", "SURGERY"], required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CategorySchema.index({ type: 1, slug: 1 }, { unique: true });

export const Category: Model<ICategory> =
  mongoose.models.Category ?? mongoose.model<ICategory>("Category", CategorySchema);
