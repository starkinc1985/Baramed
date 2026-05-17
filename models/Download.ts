import mongoose, { Schema, Document, Model } from "mongoose";

export type DownloadCategory = "CATALOG" | "CERTIFICATE" | "BROCHURE" | "IFU" | "OTHER";

export interface IDownload extends Document {
  title: string;
  description?: string;
  category: DownloadCategory;
  fileSize?: string;
  fileType?: string;
  downloadUrl: string;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const DownloadSchema = new Schema<IDownload>(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["CATALOG", "CERTIFICATE", "BROCHURE", "IFU", "OTHER"],
      default: "OTHER",
    },
    fileSize: { type: String },
    fileType: { type: String },
    downloadUrl: { type: String, required: true },
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Download: Model<IDownload> =
  mongoose.models.Download ?? mongoose.model<IDownload>("Download", DownloadSchema);
