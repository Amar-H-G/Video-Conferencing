import Participant from "../models/Participant.model.js";
import { ROLES } from "../utils/constants.js";
import { socketGuard } from "./helpers/guard.js";
import { logModeration } from "../services/moderationLog.service.js";

export const registerRoleSocket = (io, socket) => {
  /**
   * PROMOTE TO CO-HOST (HOST only)
   */
  socket.on("role:promote", (payload) =>
    socketGuard(
      "PROMOTE_COHOST",
      async (io, socket, { roomId, targetUserId }) => {
        const participant = await Participant.findOneAndUpdate(
          { room: roomId, user: targetUserId, approved: true },
          { role: ROLES.CO_HOST },
          { new: true }
        );

        if (!participant) return;

        io.to(roomId).emit("role:updated", {
          userId: targetUserId,
          role: ROLES.CO_HOST,
        });

        await logModeration({
          roomId,
          action: "PROMOTE_COHOST",
          actorId: socket.user.id,
          targetId: targetUserId,
        });
      }
    )(io, socket, payload)
  );

  /**
   * DEMOTE CO-HOST (HOST only)
   */
  socket.on("role:demote", (payload) =>
    socketGuard(
      "PROMOTE_COHOST",
      async (io, socket, { roomId, targetUserId }) => {
        const participant = await Participant.findOneAndUpdate(
          { room: roomId, user: targetUserId, approved: true },
          { role: ROLES.PARTICIPANT },
          { new: true }
        );

        if (!participant) return;

        io.to(roomId).emit("role:updated", {
          userId: targetUserId,
          role: ROLES.PARTICIPANT,
        });

        await logModeration({
          roomId,
          action: "DEMOTE_COHOST",
          actorId: socket.user.id,
          targetId: targetUserId,
        });
      }
    )(io, socket, payload)
  );
};
