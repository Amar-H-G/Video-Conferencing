import { registerWaitingSocket } from "./waiting.socket.js";

export const registerSockets = (io) => {
  io.on("connection", (socket) => {
    socket.on("room:join", ({ roomId }) => {
      socket.join(roomId);
    });

    registerWaitingSocket(io, socket);
  });
};
