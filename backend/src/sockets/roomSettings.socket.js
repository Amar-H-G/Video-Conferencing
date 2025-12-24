import Room from "../models/Room.model.js";
import { socketGuard } from "./helpers/guard.js";
import { logModeration } from "../services/moderationLog.service.js";

export const registerRoomSettingsSocket = (io, socket) => {
  /**
   * LOCK / UNLOCK ROOM (HOST / CO-HOST)
   */
  socket.on("room:lock", (payload) =>
    socketGuard("PROMOTE_COHOST", async (io, socket, { roomId, locked }) => {
      const room = await Room.findByIdAndUpdate(
        roomId,
        { isLocked: !!locked },
        { new: true }
      );
      if (!room) return;

      io.to(roomId).emit("room:lockUpdated", {
        isLocked: room.isLocked,
      });

      await logModeration({
        roomId,
        action: room.isLocked ? "ROOM_LOCKED" : "ROOM_UNLOCKED",
        actorId: socket.user.id,
      });
    })(io, socket, payload)
  );

  /**
   * AUTO-ADMIT TOGGLE (HOST / CO-HOST)
   */
  socket.on("room:autoAdmit", (payload) =>
    socketGuard("PROMOTE_COHOST", async (io, socket, { roomId, enabled }) => {
      const room = await Room.findByIdAndUpdate(
        roomId,
        { autoAdmit: !!enabled },
        { new: true }
      );
      if (!room) return;

      io.to(roomId).emit("room:autoAdmitUpdated", {
        autoAdmit: room.autoAdmit,
      });

      await logModeration({
        roomId,
        action: room.autoAdmit ? "AUTO_ADMIT_ENABLED" : "AUTO_ADMIT_DISABLED",
        actorId: socket.user.id,
      });
    })(io, socket, payload)
  );
};
