import Room from "../models/Room.model.js";
import { socketGuard } from "./helpers/guard.js";
import { logModeration } from "../services/moderationLog.service.js";

export const registerChatModerationSocket = (io, socket) => {
  /**
   * Enable / Disable Chat (HOST / CO-HOST)
   */
  socket.on("chat:toggle", (payload) =>
    socketGuard("PROMOTE_COHOST", async (io, socket, { roomId, enabled }) => {
      const room = await Room.findByIdAndUpdate(
        roomId,
        { chatEnabled: !!enabled },
        { new: true }
      );
      if (!room) return;

      io.to(roomId).emit("chat:status", {
        chatEnabled: room.chatEnabled,
        chatReadOnly: room.chatReadOnly,
      });

      await logModeration({
        roomId,
        action: room.chatEnabled ? "CHAT_ENABLED" : "CHAT_DISABLED",
        actorId: socket.user.id,
      });
    })(io, socket, payload)
  );

  /**
   * Read-only Mode (HOST / CO-HOST)
   */
  socket.on("chat:readOnly", (payload) =>
    socketGuard("PROMOTE_COHOST", async (io, socket, { roomId, enabled }) => {
      const room = await Room.findByIdAndUpdate(
        roomId,
        { chatReadOnly: !!enabled },
        { new: true }
      );
      if (!room) return;

      io.to(roomId).emit("chat:status", {
        chatEnabled: room.chatEnabled,
        chatReadOnly: room.chatReadOnly,
      });

      await logModeration({
        roomId,
        action: room.chatReadOnly
          ? "CHAT_READONLY_ENABLED"
          : "CHAT_READONLY_DISABLED",
        actorId: socket.user.id,
      });
    })(io, socket, payload)
  );
};
