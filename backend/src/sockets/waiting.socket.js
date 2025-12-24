import Participant from "../models/Participant.model.js";
import { socketGuard } from "./helpers/guard.js";

export const registerWaitingSocket = (io, socket) => {
  /**
   * User requests to join waiting room
   */
  socket.on("waiting:join", async ({ roomId }) => {
    io.to(roomId).emit("waiting:new-user", {
      userId: socket.user.id,
      roomId,
    });
  });

  /**
   * Approve user (HOST / CO-HOST only)
   */
  socket.on("waiting:approve", (payload) =>
    socketGuard("APPROVE_USER", async (io, socket, { roomId, userId }) => {
      const participant = await Participant.findOneAndUpdate(
        { room: roomId, user: userId },
        { approved: true, joinedAt: new Date() },
        { new: true }
      );

      if (!participant) return;

      io.to(roomId).emit("waiting:approved", { userId });
    })(io, socket, payload)
  );

  /**
   * Reject user (HOST / CO-HOST only)
   */
  socket.on("waiting:reject", (payload) =>
    socketGuard("REJECT_USER", async (io, socket, { roomId, userId }) => {
      await Participant.deleteOne({ room: roomId, user: userId });

      io.to(roomId).emit("waiting:rejected", { userId });
    })(io, socket, payload)
  );
};
