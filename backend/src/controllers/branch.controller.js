import asyncHandler from "express-async-handler";
import { Branch } from "../models/Branch.js";
import { Product } from "../models/Product.js";
import { Sale } from "../models/Sale.js";

export const getBranches = asyncHandler(async (_req, res) => {
  const branches = await Branch.find().sort({ createdAt: 1 });

  const enriched = await Promise.all(
    branches.map(async (branch) => {
      const [inventoryCount, revenueSnapshot] = await Promise.all([
        Product.countDocuments({ branchId: branch._id, stockStatus: "available" }),
        Sale.aggregate([
          { $match: { branchId: branch._id } },
          { $group: { _id: null, revenue: { $sum: "$salePrice" }, sales: { $sum: 1 } } }
        ])
      ]);

      return {
        ...branch.toObject(),
        inventoryCount,
        performance: revenueSnapshot[0] || { revenue: 0, sales: 0 }
      };
    })
  );

  res.json(enriched);
});
