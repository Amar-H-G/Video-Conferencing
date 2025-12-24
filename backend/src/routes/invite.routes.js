import { Router } from "express";
import {
  generateInvite,
  validateInviteCode,
} from "../controllers/invite.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:roomId/generate", requireAuth, generateInvite);
router.post("/validate", validateInviteCode);

export default router;
