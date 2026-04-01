import { Router } from "express";
import { getSiteSettings, updateSiteSettings } from "../controllers/site.controller.js";
import { authorize, protect } from "../middleware/auth.js";
const router = Router();
router.get("/settings", getSiteSettings);
router.put("/settings", protect, authorize("admin", "superadmin"), updateSiteSettings);
export default router;
