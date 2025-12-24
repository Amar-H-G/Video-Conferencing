import dotenv from "dotenv";
dotenv.config({ override: true });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";

import { connectDB } from "./config/db.js";
import { initSocket } from "./config/socket.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";

const app = express();

/* middlewares */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

/* routes */
app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

/* error */
app.use(errorHandler);

/* infra */
const httpServer = createServer(app);
initSocket(httpServer);
connectDB();

export { httpServer };
