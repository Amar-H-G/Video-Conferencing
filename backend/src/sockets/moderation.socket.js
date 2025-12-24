import { socketGuard } from "./helpers/guard.js";
import { logModeration } from "../services/moderationLog.service.js";
import { forceCloseCameraProducer } from "../mediasoup/helpers.js";

export const registerModerationSocket = (io, socket) => {
  /**
   * FORCE MUTE USER
   */
  socket.on("moderation:forceMute", (payload) =>
    socketGuard("FORCE_MUTE", async (io, socket, { roomId, targetUserId }) => {
      io.to(roomId).emit("moderation:muted", {
        userId: targetUserId,
      });

      await logModeration({
        roomId,
        action: "FORCE_MUTE",
        actorId: socket.user.id,
        targetId: targetUserId,
      });
    })(io, socket, payload)
  );

  /**
   * FORCE CAMERA OFF (HOST / CO-HOST)
   */
  socket.on("moderation:forceCameraOff", (payload) =>
    socketGuard(
      "FORCE_CAMERA_OFF",
      async (io, socket, { roomId, targetUserId }) => {
        const closed = forceCloseCameraProducer(roomId, targetUserId);
        if (!closed) return;

        io.to(roomId).emit("moderation:cameraOff", {
          userId: targetUserId,
        });

        await logModeration({
          roomId,
          action: "FORCE_CAMERA_OFF",
          actorId: socket.user.id,
          targetId: targetUserId,
        });
      }
    )(io, socket, payload)
  );
};
