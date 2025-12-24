import { registerWaitingSocket } from "./waiting.socket.js";
import { registerChatSocket } from "./chat.socket.js";

export const registerSockets = (io) => {
  io.on("connection", (socket) => {
    // common room join
    socket.on("room:join", ({ roomId }) => {
      socket.join(roomId);
    });

    // waiting room
    registerWaitingSocket(io, socket);

    // chat system
    registerChatSocket(io, socket);
  });
};
