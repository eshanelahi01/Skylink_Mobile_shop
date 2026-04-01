import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { Inquiry } from "../models/Inquiry.js";
import { Product } from "../models/Product.js";
import { buildPagination } from "../utils/query.js";

export const getInquiries = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = {};
  if (req.user.role === "staff") filter.branchId = req.user.branchId;
  else if (req.query.branchId) filter.branchId = req.query.branchId;

  const [items, total] = await Promise.all([
    Inquiry.find(filter).populate("branchId", "name code").populate("productId", "title").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Inquiry.countDocuments(filter)
  ]);

  res.json({ items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

export const createInquiry = asyncHandler(async (req, res) => {
  const input = req.validated.body;
  let branchId = input.branchId || null;

  if (!branchId && input.productId) {
    const product = await Product.findById(input.productId);
    branchId = product?.branchId || null;
  }

  const inquiry = await Inquiry.create({ ...input, branchId });
  res.status(StatusCodes.CREATED).json(inquiry);
});
