import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    brand: { type: String, required: true, default: "Apple" },
    model: { type: String, required: true },
    series: { type: String, default: "" },
    storage: { type: String, required: true },
    color: { type: String, required: true },
    condition: {
      type: String,
      enum: ["new", "open-box", "used-excellent", "used-good"],
      required: true
    },
    batteryHealth: { type: Number, min: 0, max: 100, default: null },
    ptaStatus: {
      type: String,
      enum: ["pta", "non-pta", "jv", "factory-unlocked"],
      required: true
    },
    price: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    imeiOptionalMasked: { type: String, default: "" },
    description: { type: String, default: "" },
    features: [{ type: String }],
    accessories: [{ type: String }],
    images: [{ type: String }],
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true
    },
    addedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    stockStatus: {
      type: String,
      enum: ["available", "sold", "reserved", "hidden"],
      default: "available"
    },
    quantity: { type: Number, default: 1, min: 0 },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
