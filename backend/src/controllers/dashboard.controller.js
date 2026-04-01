import asyncHandler from "express-async-handler";
import { Product } from "../models/Product.js";
import { Purchase } from "../models/Purchase.js";
import { Sale } from "../models/Sale.js";
import { ActivityLog } from "../models/ActivityLog.js";
import { Branch } from "../models/Branch.js";
import { User } from "../models/User.js";

const buildBranchMatch = (req) => (req.user.role === "staff" ? { branchId: req.user.branchId } : {});

export const getDashboardOverview = asyncHandler(async (req, res) => {
  const match = buildBranchMatch(req);

  const [inventoryValue, inStock, soldCount, sales, purchases, activity, branches, staff] = await Promise.all([
    Product.aggregate([{ $match: { ...match, stockStatus: { $ne: "sold" } } }, { $group: { _id: null, total: { $sum: { $multiply: ["$costPrice", "$quantity"] } } } }]),
    Product.countDocuments({ ...match, stockStatus: "available" }),
    Product.countDocuments({ ...match, stockStatus: "sold" }),
    Sale.aggregate([{ $match: match }, { $group: { _id: null, revenue: { $sum: "$salePrice" }, count: { $sum: 1 } } }]),
    Purchase.aggregate([{ $match: match }, { $group: { _id: null, spend: { $sum: "$purchasePrice" }, count: { $sum: 1 } } }]),
    ActivityLog.find(match).sort({ createdAt: -1 }).limit(8).populate("actorUserId", "name"),
    req.user.role === "staff" ? [] : Branch.find().sort({ name: 1 }),
    req.user.role === "staff" ? [] : User.find({ role: "staff" }).populate("branchId", "name")
  ]);

  const revenueTrend = await Sale.aggregate([
    { $match: match },
    { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$soldAt" } }, revenue: { $sum: "$salePrice" } } },
    { $sort: { _id: 1 } }
  ]);

  const purchaseTrend = await Purchase.aggregate([
    { $match: match },
    { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$purchasedAt" } }, spend: { $sum: "$purchasePrice" } } },
    { $sort: { _id: 1 } }
  ]);

  const branchPerformance = await Sale.aggregate([
    { $group: { _id: "$branchId", revenue: { $sum: "$salePrice" }, sales: { $sum: 1 } } },
    { $lookup: { from: "branches", localField: "_id", foreignField: "_id", as: "branch" } },
    { $unwind: "$branch" },
    { $project: { branchName: "$branch.name", revenue: 1, sales: 1 } }
  ]);

  res.json({
    kpis: {
      totalInventoryValue: inventoryValue[0]?.total || 0,
      productsInStock: inStock,
      productsSold: soldCount,
      totalRevenue: sales[0]?.revenue || 0,
      totalPurchases: purchases[0]?.spend || 0
    },
    charts: { revenueTrend, purchaseTrend, branchPerformance },
    activity,
    branches,
    staff
  });
});
