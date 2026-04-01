import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null
    },
    rawItemReference: { type: String, default: "" },
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
    vendorName: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    notes: { type: String, default: "" },
    purchasedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Purchase = mongoose.model("Purchase", purchaseSchema);
