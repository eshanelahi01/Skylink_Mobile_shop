import { Router } from "express";
import { approveProduct, createProduct, getHomepageFeed, getProductBySlug, getProducts, getPublicProducts, updateProduct } from "../controllers/product.controller.js";
import { authorize, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createProductSchema, updateProductSchema } from "../validators/product.validator.js";

const router = Router();
router.get("/public", getPublicProducts);
router.get("/homepage-feed", getHomepageFeed);
router.get("/public/:slug", getProductBySlug);
router.get("/", protect, getProducts);
router.post("/", protect, authorize("admin", "superadmin", "staff"), validate(createProductSchema), createProduct);
router.patch("/:id", protect, authorize("admin", "superadmin", "staff"), validate(updateProductSchema), updateProduct);
router.patch("/:id/approve", protect, authorize("admin", "superadmin"), approveProduct);
export default router;
