import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    mapLink: { type: String, default: "" },
    managerName: { type: String, default: "" },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  { timestamps: true }
);

export const Branch = mongoose.model("Branch", branchSchema);
