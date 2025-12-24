import { checkPermission } from "../../services/permission.service.js";

export const socketGuard = (action, handler) => {
  return async (io, socket, payload) => {
    const { roomId } = payload;

    const allowed = await checkPermission({
      roomId,
      userId: socket.user.id,
      action,
    });

    if (!allowed) return;

    handler(io, socket, payload);
  };
};
