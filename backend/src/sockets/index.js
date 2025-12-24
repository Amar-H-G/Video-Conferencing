import { registerWaitingSocket } from "./waiting.socket.js";
import { registerChatSocket } from "./chat.socket.js";
import { registerMediaHandlers } from "../mediasoup/handlers.js";

export const registerSockets = (io) => {
  io.on("connection", (socket) => {
    socket.on("room:join", ({ roomId }) => {
      socket.join(roomId);
    });

    registerWaitingSocket(io, socket);
    registerChatSocket(io, socket);

    // 🎥 mediasoup
    registerMediaHandlers(io, socket);
  });
};
