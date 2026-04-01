import { Router } from "express";
import { login, logout, me, refresh } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { loginSchema } from "../validators/auth.validator.js";

const router = Router();
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", protect, me);
export default router;
