import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      default: null
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    source: {
      type: String,
      enum: ["website", "whatsapp", "instagram", "walk-in"],
      default: "website"
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new"
    }
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model("Inquiry", inquirySchema);
