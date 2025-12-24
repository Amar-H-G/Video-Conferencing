import { registerWaitingSocket } from "./waiting.socket.js";
import { registerChatSocket } from "./chat.socket.js";
import { registerMediaHandlers } from "../mediasoup/handlers.js";
import { registerModerationSocket } from "./moderation.socket.js";
import { registerRoleSocket } from "./role.socket.js";
import { registerRoomSettingsSocket } from "./roomSettings.socket.js";
import { registerChatModerationSocket } from "./chatModeration.socket.js";

import {
  markDisconnected,
  clearReconnect,
} from "../services/reconnect.service.js";
import Participant from "../models/Participant.model.js";
import Room from "../models/Room.model.js";
import { cleanupRoomMedia } from "../mediasoup/cleanup.js";

export const registerSockets = (io) => {
  io.on("connection", (socket) => {
    socket.on("room:join", async ({ roomId }) => {
      // prevent duplicate join
      const existing = await Participant.findOne({
        room: roomId,
        user: socket.user.id,
        approved: true,
      });
      if (!existing) return;

      clearReconnect(roomId, socket.user.id);
      socket.join(roomId);
    });

    registerWaitingSocket(io, socket);
    registerChatSocket(io, socket);
    registerMediaHandlers(io, socket);
    registerModerationSocket(io, socket);
    registerRoleSocket(io, socket);
    registerRoomSettingsSocket(io, socket);
    registerChatModerationSocket(io, socket);

    socket.on("disconnect", async () => {
      const rooms = [...socket.rooms].filter((r) => r !== socket.id);

      rooms.forEach(async (roomId) => {
        const room = await Room.findById(roomId);
        if (!room) return;

        // mark disconnect with grace period
        markDisconnected(roomId, socket.user.id, async () => {
          // if host left and config says end meeting
          if (
            room.host.toString() === socket.user.id &&
            process.env.HOST_DISCONNECT_ENDS_MEETING === "true"
          ) {
            room.state = "ended";
            await room.save();

            cleanupRoomMedia(roomId);
            io.to(roomId).emit("meeting:ended");
            io.in(roomId).disconnectSockets(true);
            return;
          }

          // normal user left after grace
          await Participant.deleteOne({
            room: roomId,
            user: socket.user.id,
          });

          io.to(roomId).emit("participant:left", {
            userId: socket.user.id,
          });
        });
      });
    });
  });
};
