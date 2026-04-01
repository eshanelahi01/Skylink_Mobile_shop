import { Router } from "express";
import { createInquiry, getInquiries } from "../controllers/inquiry.controller.js";
import { authorize, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { inquirySchema } from "../validators/record.validator.js";
const router = Router();
router.get("/", protect, authorize("admin", "superadmin", "staff"), getInquiries);
router.post("/", validate(inquirySchema), createInquiry);
export default router;
