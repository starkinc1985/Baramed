import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IInquiryItem {
  productId?: Types.ObjectId;
  productCodeSnapshot?: string;
  productNameSnapshot?: string;
  quantity: number;
  notes?: string;
}

export interface IInquiryAttachment {
  fileName: string;
  mimeType?: string;
  size?: number;
  url: string;
}

export interface IInquiry extends Document {
  type: "CONTACT" | "QUOTE";
  status: "NEW" | "IN_PROGRESS" | "CLOSED";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  items: IInquiryItem[];
  attachments: IInquiryAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    type: { type: String, enum: ["CONTACT", "QUOTE"], default: "CONTACT" },
    status: { type: String, enum: ["NEW", "IN_PROGRESS", "CLOSED"], default: "NEW" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        productCodeSnapshot: { type: String },
        productNameSnapshot: { type: String },
        quantity: { type: Number, required: true },
        notes: { type: String },
      },
    ],
    attachments: [
      {
        fileName: { type: String, required: true },
        mimeType: { type: String },
        size: { type: Number },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry ?? mongoose.model<IInquiry>("Inquiry", InquirySchema);
