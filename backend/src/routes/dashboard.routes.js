import { Router } from "express";
import { getDashboardOverview } from "../controllers/dashboard.controller.js";
import { authorize, protect } from "../middleware/auth.js";
const router = Router();
router.get("/overview", protect, authorize("admin", "superadmin", "staff"), getDashboardOverview);
export default router;
