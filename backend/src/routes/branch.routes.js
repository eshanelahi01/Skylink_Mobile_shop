import { Router } from "express";
import { getBranches } from "../controllers/branch.controller.js";
const router = Router();
router.get("/", getBranches);
export default router;
