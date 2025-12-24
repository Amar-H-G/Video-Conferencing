import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socketAuth.middleware.js";

export let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
};
