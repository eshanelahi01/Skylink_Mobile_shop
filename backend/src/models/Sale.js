import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true
    },
    staffUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    salePrice: { type: Number, required: true },
    customerNameOptional: { type: String, default: "" },
    customerPhoneOptional: { type: String, default: "" },
    paymentMethod: {
      type: String,
      enum: ["cash", "bank-transfer", "card", "installment"],
      default: "cash"
    },
    notes: { type: String, default: "" },
    soldAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Sale = mongoose.model("Sale", saleSchema);
