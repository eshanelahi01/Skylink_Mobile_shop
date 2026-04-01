import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { Product } from "../models/Product.js";
import { SiteSettings } from "../models/SiteSettings.js";
import { ApiError } from "../utils/apiError.js";
import { buildPagination } from "../utils/query.js";
import { slugify } from "../utils/slugify.js";
import { assertBranchAccess } from "../middleware/branchScope.js";
import { logActivity } from "../services/activity.service.js";

const publicStockStatuses = ["available", "reserved"];

const buildProductFilter = (query) => {
  const filter = {};
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { model: { $regex: query.search, $options: "i" } },
      { brand: { $regex: query.search, $options: "i" } }
    ];
  }

  ["model", "series", "storage", "color", "ptaStatus", "condition", "branchId", "stockStatus", "approvalStatus", "brand"].forEach((key) => {
    if (query[key]) filter[key] = query[key];
  });

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  if (query.featured === "true") filter.isFeatured = true;
  if (query.published === "true") filter.isPublished = true;
  return filter;
};

const buildSort = (sort) => {
  switch (sort) {
    case "price-asc":
      return { price: 1 };
    case "price-desc":
      return { price: -1 };
    case "featured":
      return { isFeatured: -1, createdAt: -1 };
    default:
      return { createdAt: -1 };
  }
};

export const getProducts = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = buildProductFilter(req.query);
  if (req.user?.role === "staff") filter.branchId = req.user.branchId;

  const [items, total] = await Promise.all([
    Product.find(filter)
      .populate("branchId", "name code")
      .populate("addedByUserId", "name")
      .sort(buildSort(req.query.sort))
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter)
  ]);

  res.json({ items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

export const getPublicProducts = asyncHandler(async (req, res) => {
  const filter = { ...buildProductFilter(req.query), isPublished: true, approvalStatus: "approved" };
  filter.stockStatus = publicStockStatuses.includes(filter.stockStatus) ? filter.stockStatus : { $in: publicStockStatuses };

  const { page, limit, skip } = buildPagination(req.query);
  const items = await Product.find(filter)
    .populate("branchId", "name code whatsapp")
    .sort(buildSort(req.query.sort))
    .skip(skip)
    .limit(limit);
  const total = await Product.countDocuments(filter);
  res.json({ items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

export const getHomepageFeed = asyncHandler(async (_req, res) => {
  const settings = await SiteSettings.findOne();
  const moderationEnabled = settings?.homepageSections?.moderationEnabled ?? true;
  const approvalStatus = moderationEnabled ? "approved" : { $in: ["approved", "pending"] };
  const publicVisibilityFilter = { isPublished: true, approvalStatus, stockStatus: { $in: publicStockStatuses } };

  const [featured, latest, arrivals] = await Promise.all([
    Product.find({ ...publicVisibilityFilter, isFeatured: true }).populate("branchId", "name code").sort({ updatedAt: -1 }).limit(6),
    Product.find(publicVisibilityFilter).populate("branchId", "name code").sort({ createdAt: -1 }).limit(8),
    Product.find({ ...publicVisibilityFilter, stockStatus: "available" }).populate("branchId", "name code").sort({ createdAt: -1 }).limit(8)
  ]);

  res.json({ featured, latest, arrivals });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isPublished: true, approvalStatus: "approved", stockStatus: { $in: publicStockStatuses } }).populate("branchId");
  if (!product) throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");

  const [similar, recentlyViewed] = await Promise.all([
    Product.find({ _id: { $ne: product._id }, brand: product.brand, model: product.model, isPublished: true, approvalStatus: "approved", stockStatus: { $in: publicStockStatuses } }).limit(4),
    Product.find({ _id: { $ne: product._id }, isPublished: true, approvalStatus: "approved", stockStatus: { $in: publicStockStatuses } }).sort({ updatedAt: -1 }).limit(4)
  ]);

  res.json({ product, similar, recentlyViewed });
});

export const createProduct = asyncHandler(async (req, res) => {
  const input = req.validated.body;
  const branchId = req.user.role === "staff" ? req.user.branchId : input.branchId;
  assertBranchAccess(req, branchId);

  const product = await Product.create({
    ...input,
    branchId,
    slug: slugify(`${input.title}-${input.storage}-${input.color}-${Date.now()}`),
    addedByUserId: req.user._id,
    approvalStatus: req.user.role === "staff" ? "pending" : input.approvalStatus || "approved",
    quantity: input.quantity ?? 1,
    stockStatus: input.stockStatus || "available"
  });

  await logActivity({ actorUserId: req.user._id, branchId, actionType: "product.created", entityType: "Product", entityId: product._id, metadata: { title: product.title } });
  res.status(StatusCodes.CREATED).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
  assertBranchAccess(req, product.branchId);

  Object.assign(product, req.validated.body);
  if (req.validated.body.title) product.slug = slugify(`${req.validated.body.title}-${product.storage}-${product.color}-${product._id}`);
  if (req.user.role === "staff") product.approvalStatus = "pending";

  await product.save();
  await logActivity({ actorUserId: req.user._id, branchId: product.branchId, actionType: "product.updated", entityType: "Product", entityId: product._id });
  res.json(product);
});

export const approveProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
  product.approvalStatus = req.body.approvalStatus || "approved";
  product.isPublished = true;
  await product.save();
  res.json(product);
});
