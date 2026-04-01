import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "admin", "staff"],
      default: "staff"
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      default: null
    },
    isActive: { type: Boolean, default: true },
    avatar: { type: String, default: "" },
    lastLogin: { type: Date, default: null }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
