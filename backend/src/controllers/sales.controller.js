import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { Sale } from "../models/Sale.js";
import { Product } from "../models/Product.js";
import { ApiError } from "../utils/apiError.js";
import { buildPagination } from "../utils/query.js";
import { assertBranchAccess } from "../middleware/branchScope.js";
import { logActivity } from "../services/activity.service.js";

export const getSales = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = {};
  if (req.user.role === "staff") filter.branchId = req.user.branchId;
  else if (req.query.branchId) filter.branchId = req.query.branchId;

  const [items, total] = await Promise.all([
    Sale.find(filter).populate("productId", "title price").populate("branchId", "name code").populate("staffUserId", "name").sort({ soldAt: -1 }).skip(skip).limit(limit),
    Sale.countDocuments(filter)
  ]);

  res.json({ items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

export const createSale = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const input = req.validated.body;
    const product = await Product.findById(input.productId).session(session);
    if (!product) throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");

    const branchId = req.user.role === "staff" ? req.user.branchId : input.branchId || product.branchId;
    assertBranchAccess(req, branchId);

    if (product.quantity <= 0 || product.stockStatus === "sold") {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Product is not available for sale");
    }

    product.quantity -= 1;
    product.stockStatus = product.quantity <= 0 ? "sold" : product.stockStatus;
    await product.save({ session });

    const sale = await Sale.create([
      { ...input, branchId, staffUserId: req.user._id }
    ], { session });

    await logActivity({ actorUserId: req.user._id, branchId, actionType: "sale.created", entityType: "Sale", entityId: sale[0]._id, metadata: { productId: product._id, salePrice: input.salePrice } });
    await session.commitTransaction();
    res.status(StatusCodes.CREATED).json(sale[0]);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});
