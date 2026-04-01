import { Router } from "express";
import { createPurchase, getPurchases } from "../controllers/purchase.controller.js";
import { authorize, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { purchaseSchema } from "../validators/record.validator.js";
const router = Router();
router.get("/", protect, authorize("admin", "superadmin", "staff"), getPurchases);
router.post("/", protect, authorize("admin", "superadmin", "staff"), validate(purchaseSchema), createPurchase);
export default router;
