import { Router } from "express";
import { getRoomMessages } from "../controllers/message.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:roomId", requireAuth, getRoomMessages);

export default router;
