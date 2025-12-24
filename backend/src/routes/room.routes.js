import { Router } from "express";
import {
  createRoom,
  joinRoom,
  startMeeting,
  endMeeting,
} from "../controllers/room.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requirePermission } from "../middlewares/role.middleware.js";

const router = Router();

/**
 * Create room (any authenticated user → becomes HOST)
 */
router.post("/", requireAuth, createRoom);

/**
 * Join room (waiting/public handled internally)
 */
router.post("/:roomId/join", requireAuth, joinRoom);

/**
 * Start meeting (ONLY HOST)
 */
router.post(
  "/:roomId/start",
  requireAuth,
  requirePermission("START_MEETING"),
  startMeeting
);

/**
 * End meeting (ONLY HOST)
 */
router.post(
  "/:roomId/end",
  requireAuth,
  requirePermission("END_MEETING"),
  endMeeting
);

export default router;
