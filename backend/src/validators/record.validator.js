import { z } from "zod";

export const saleSchema = z.object({
  body: z.object({
    productId: z.string(),
    branchId: z.string().optional(),
    salePrice: z.coerce.number().min(1),
    customerNameOptional: z.string().optional().default(""),
    customerPhoneOptional: z.string().optional().default(""),
    paymentMethod: z.enum(["cash", "bank-transfer", "card", "installment"]).optional(),
    notes: z.string().optional().default("")
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const purchaseSchema = z.object({
  body: z.object({
    productId: z.string().optional(),
    rawItemReference: z.string().optional().default(""),
    branchId: z.string().optional(),
    vendorName: z.string().min(2),
    purchasePrice: z.coerce.number().min(1),
    quantity: z.coerce.number().min(1).optional(),
    notes: z.string().optional().default("")
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const inquirySchema = z.object({
  body: z.object({
    productId: z.string().optional(),
    branchId: z.string().optional(),
    name: z.string().min(2),
    phone: z.string().min(7),
    message: z.string().min(4),
    source: z.enum(["website", "whatsapp", "instagram", "walk-in"]).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});
