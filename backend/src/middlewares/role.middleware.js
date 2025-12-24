import { checkPermission } from "../services/permission.service.js";

export const requirePermission = (action) => {
  return async (req, res, next) => {
    const roomId = req.params.roomId;
    const userId = req.user.id;

    const allowed = await checkPermission({
      roomId,
      userId,
      action,
    });

    if (!allowed) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
};
