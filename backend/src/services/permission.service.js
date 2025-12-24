import Participant from "../models/Participant.model.js";
import { PERMISSIONS } from "../utils/permissionMap.js";

export const checkPermission = async ({ roomId, userId, action }) => {
  const participant = await Participant.findOne({
    room: roomId,
    user: userId,
    approved: true,
  });

  if (!participant) return false;

  const allowedRoles = PERMISSIONS[action];
  if (!allowedRoles) return false;

  return allowedRoles.includes(participant.role);
};
