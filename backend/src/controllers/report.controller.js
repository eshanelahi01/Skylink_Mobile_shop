import asyncHandler from "express-async-handler";
import { stringify } from "csv-stringify/sync";
import { Sale } from "../models/Sale.js";
import { Purchase } from "../models/Purchase.js";

export const exportReportCsv = asyncHandler(async (req, res) => {
  const type = req.query.type || "sales";
  const records = type === "purchases"
    ? await Purchase.find().populate("branchId", "name").populate("staffUserId", "name")
    : await Sale.find().populate("branchId", "name").populate("staffUserId", "name");

  const csv = stringify(
    records.map((record) => ({
      id: record._id.toString(),
      branch: record.branchId?.name,
      staff: record.staffUserId?.name,
      amount: record.salePrice || record.purchasePrice,
      date: record.soldAt || record.purchasedAt
    })),
    { header: true }
  );

  res.header("Content-Type", "text/csv");
  res.attachment(`skylink-${type}-report.csv`);
  res.send(csv);
});
