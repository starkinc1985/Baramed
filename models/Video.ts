import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideo extends Document {
  title: string;
  youtubeId: string;
  thumbnail?: string;
  description?: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    youtubeId: { type: String, required: true, unique: true },
    thumbnail: { type: String },
    description: { type: String },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Video: Model<IVideo> =
  mongoose.models.Video ?? mongoose.model<IVideo>("Video", VideoSchema);
