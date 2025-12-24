import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socketAuth.middleware.js";
import { registerSockets } from "../sockets/index.js";

export let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  // 🔐 JWT authentication for sockets
  io.use(socketAuthMiddleware);

  // 🔌 Centralized socket connection & feature handlers
  registerSockets(io);

  console.log("✅ Socket.IO initialized");
};
