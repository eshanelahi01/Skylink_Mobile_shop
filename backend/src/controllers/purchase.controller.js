import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { Purchase } from "../models/Purchase.js";
import { buildPagination } from "../utils/query.js";
import { assertBranchAccess } from "../middleware/branchScope.js";
import { logActivity } from "../services/activity.service.js";

export const getPurchases = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = {};
  if (req.user.role === "staff") filter.branchId = req.user.branchId;
  else if (req.query.branchId) filter.branchId = req.query.branchId;

  const [items, total] = await Promise.all([
    Purchase.find(filter).populate("productId", "title").populate("branchId", "name code").populate("staffUserId", "name").sort({ purchasedAt: -1 }).skip(skip).limit(limit),
    Purchase.countDocuments(filter)
  ]);

  res.json({ items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

export const createPurchase = asyncHandler(async (req, res) => {
  const input = req.validated.body;
  const branchId = req.user.role === "staff" ? req.user.branchId : input.branchId;
  assertBranchAccess(req, branchId);

  const purchase = await Purchase.create({ ...input, branchId, staffUserId: req.user._id });
  await logActivity({ actorUserId: req.user._id, branchId, actionType: "purchase.created", entityType: "Purchase", entityId: purchase._id });
  res.status(StatusCodes.CREATED).json(purchase);
});
