import Participant from "../models/Participant.model.js";
import { socketGuard } from "./helpers/guard.js";

export const registerModerationSocket = (io, socket) => {
  /**
   * FORCE MUTE USER
   */
  socket.on("moderation:forceMute", (payload) =>
    socketGuard("FORCE_MUTE", async (io, socket, { roomId, targetUserId }) => {
      // notify target to mute locally
      io.to(roomId).emit("moderation:muted", {
        userId: targetUserId,
      });
    })(io, socket, payload)
  );
};
