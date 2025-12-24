import { Router } from "express";
import { getMeetingSummary } from "../controllers/summary.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:roomId", requireAuth, getMeetingSummary);

export default router;
