import jwt from "jsonwebtoken";

export const socketAuthMiddleware = (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    next(new Error("Invalid or expired token"));
  }
};
