import { socketGuard } from "./helpers/guard.js";
import { logModeration } from "../services/moderationLog.service.js";

export const registerModerationSocket = (io, socket) => {
  /**
   * FORCE MUTE USER (Host / Co-Host only)
   */
  socket.on("moderation:forceMute", (payload) =>
    socketGuard("FORCE_MUTE", async (io, socket, { roomId, targetUserId }) => {
      // Notify target user to mute locally
      io.to(roomId).emit("moderation:muted", {
        userId: targetUserId,
      });

      // 🔍 Audit log
      await logModeration({
        roomId,
        action: "FORCE_MUTE",
        actorId: socket.user.id,
        targetId: targetUserId,
      });
    })(io, socket, payload)
  );
};
