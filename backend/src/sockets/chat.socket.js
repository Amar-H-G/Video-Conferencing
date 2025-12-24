import Message from "../models/Message.model.js";
import Room from "../models/Room.model.js";
import Participant from "../models/Participant.model.js";
import { socketGuard } from "./helpers/guard.js";

export const registerChatSocket = (io, socket) => {
  /**
   * Public chat send
   */
  socket.on("chat:public:send", (payload) =>
    socketGuard("PUBLIC_CHAT_SEND", async (io, socket, { roomId, content }) => {
      if (!content) return;

      // 🔒 Room-level chat checks
      const room = await Room.findById(roomId);
      if (!room || room.chatEnabled === false) return;

      // 👁️ Read-only mode: only HOST / CO-HOST can send
      if (room.chatReadOnly) {
        const participant = await Participant.findOne({
          room: roomId,
          user: socket.user.id,
        });

        if (!participant || participant.role === "PARTICIPANT") return;
      }

      const msg = await Message.create({
        room: roomId,
        sender: socket.user.id,
        content,
        isPrivate: false,
      });

      io.to(roomId).emit("chat:public:new", {
        id: msg._id,
        sender: socket.user.id,
        content,
        createdAt: msg.createdAt,
      });
    })(io, socket, payload)
  );

  /**
   * Private chat send
   */
  socket.on("chat:private:send", (payload) =>
    socketGuard(
      "PRIVATE_CHAT_SEND",
      async (io, socket, { roomId, receiverId, content }) => {
        if (!receiverId || !content) return;

        // 🔒 Room-level chat checks
        const room = await Room.findById(roomId);
        if (!room || room.chatEnabled === false) return;

        // 👁️ Read-only mode: only HOST / CO-HOST can send
        if (room.chatReadOnly) {
          const participant = await Participant.findOne({
            room: roomId,
            user: socket.user.id,
          });

          if (!participant || participant.role === "PARTICIPANT") return;
        }

        const msg = await Message.create({
          room: roomId,
          sender: socket.user.id,
          receiver: receiverId,
          content,
          isPrivate: true,
        });

        // send only to sender + receiver
        io.to(roomId).emit("chat:private:new", {
          id: msg._id,
          sender: socket.user.id,
          receiver: receiverId,
          content,
          createdAt: msg.createdAt,
        });
      }
    )(io, socket, payload)
  );
};
