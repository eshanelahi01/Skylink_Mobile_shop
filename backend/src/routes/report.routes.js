import { Router } from "express";
import { exportReportCsv } from "../controllers/report.controller.js";
import { authorize, protect } from "../middleware/auth.js";
const router = Router();
router.get("/export", protect, authorize("admin", "superadmin"), exportReportCsv);
export default router;
