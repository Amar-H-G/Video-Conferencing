import ModerationLog from "../models/ModerationLog.model.js";

export const logModeration = async ({
  roomId,
  action,
  actorId,
  targetId = null,
  metadata = {},
}) => {
  try {
    await ModerationLog.create({
      room: roomId,
      action,
      actor: actorId,
      target: targetId,
      metadata,
    });
  } catch (err) {
    // logging failure must never break flow
    console.error("ModerationLog failed:", err.message);
  }
};
