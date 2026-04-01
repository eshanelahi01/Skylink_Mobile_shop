import { Router } from "express";
import { createSale, getSales } from "../controllers/sales.controller.js";
import { authorize, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { saleSchema } from "../validators/record.validator.js";
const router = Router();
router.get("/", protect, authorize("admin", "superadmin", "staff"), getSales);
router.post("/", protect, authorize("admin", "superadmin", "staff"), validate(saleSchema), createSale);
export default router;
