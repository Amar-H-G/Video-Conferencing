import Invite from "../models/Invite.model.js";
import Room from "../models/Room.model.js";
import { generateInviteCode } from "../utils/generateCode.js";

/**
 * Host generates / rotates invite
 */
export const generateInvite = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.host.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only host can generate invite" });
    }

    // deactivate old invites
    await Invite.updateMany({ room: roomId }, { isActive: false });

    const code = generateInviteCode();

    const invite = await Invite.create({
      room: roomId,
      code,
      createdBy: req.user.id,
    });

    res.json({
      success: true,
      invite: {
        roomId,
        code,
        link: `/meet/${roomId}`,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Validate invite code
 */
export const validateInviteCode = async (req, res, next) => {
  try {
    const { code } = req.body;

    const invite = await Invite.findOne({
      code,
      isActive: true,
    });

    if (!invite) {
      return res.status(404).json({ message: "Invalid or expired invite" });
    }

    res.json({
      success: true,
      roomId: invite.room,
    });
  } catch (err) {
    next(err);
  }
};
