import { z } from "zod";

const productBody = z.object({
  title: z.string().min(3),
  brand: z.string().min(2),
  model: z.string().min(2),
  series: z.string().optional().default(""),
  storage: z.string().min(2),
  color: z.string().min(2),
  condition: z.enum(["new", "open-box", "used-excellent", "used-good"]),
  batteryHealth: z.coerce.number().min(0).max(100).nullable().optional(),
  ptaStatus: z.enum(["pta", "non-pta", "jv", "factory-unlocked"]),
  price: z.coerce.number().min(1),
  costPrice: z.coerce.number().min(0),
  sku: z.string().min(2),
  imeiOptionalMasked: z.string().optional().default(""),
  description: z.string().optional().default(""),
  features: z.array(z.string()).optional().default([]),
  accessories: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  branchId: z.string().optional(),
  stockStatus: z.enum(["available", "sold", "reserved", "hidden"]).optional(),
  quantity: z.coerce.number().min(0).optional(),
  isFeatured: z.coerce.boolean().optional(),
  isPublished: z.coerce.boolean().optional(),
  approvalStatus: z.enum(["pending", "approved", "rejected"]).optional()
});

export const createProductSchema = z.object({
  body: productBody,
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const updateProductSchema = z.object({
  body: productBody.partial(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string()
  })
});
