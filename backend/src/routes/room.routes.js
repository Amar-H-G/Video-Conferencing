import { Router } from "express";
import {
  createRoom,
  joinRoom,
  startMeeting,
  endMeeting,
} from "../controllers/room.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, createRoom);
router.post("/:roomId/join", requireAuth, joinRoom);
router.post("/:roomId/start", requireAuth, startMeeting);
router.post("/:roomId/end", requireAuth, endMeeting);

export default router;
