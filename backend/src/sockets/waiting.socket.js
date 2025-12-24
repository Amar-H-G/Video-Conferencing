import Participant from "../models/Participant.model.js";
import Room from "../models/Room.model.js";
import { ROLES } from "../utils/constants.js";

export const registerWaitingSocket = (io, socket) => {
  /**
   * User requests to join (private room)
   */
  socket.on("waiting:join", async ({ roomId }) => {
    const room = await Room.findById(roomId);
    if (!room) return;

    // notify host/co-hosts
    io.to(roomId).emit("waiting:new-user", {
      userId: socket.user.id,
      roomId,
    });
  });

  /**
   * Host / Co-host approves user
   */
  socket.on("waiting:approve", async ({ roomId, userId }) => {
    const approver = await Participant.findOne({
      room: roomId,
      user: socket.user.id,
    });

    if (!approver || ![ROLES.HOST, ROLES.CO_HOST].includes(approver.role)) {
      return;
    }

    const participant = await Participant.findOneAndUpdate(
      { room: roomId, user: userId },
      { approved: true, joinedAt: new Date() },
      { new: true }
    );

    if (!participant) return;

    io.to(roomId).emit("waiting:approved", {
      userId,
    });
  });

  /**
   * Host / Co-host rejects user
   */
  socket.on("waiting:reject", async ({ roomId, userId }) => {
    const approver = await Participant.findOne({
      room: roomId,
      user: socket.user.id,
    });

    if (!approver || ![ROLES.HOST, ROLES.CO_HOST].includes(approver.role)) {
      return;
    }

    await Participant.deleteOne({ room: roomId, user: userId });

    io.to(roomId).emit("waiting:rejected", {
      userId,
    });
  });
};
