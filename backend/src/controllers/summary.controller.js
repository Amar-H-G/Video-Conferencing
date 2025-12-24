import ModerationLog from "../models/ModerationLog.model.js";
import Room from "../models/Room.model.js";

export const getMeetingSummary = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const logs = await ModerationLog.find({ room: roomId })
      .sort({ createdAt: 1 })
      .populate("actor", "name email")
      .populate("target", "name email")
      .lean();

    res.json({
      success: true,
      room: {
        id: room._id,
        title: room.title,
        state: room.state,
        startedAt: room.createdAt,
        endedAt: room.updatedAt,
      },
      moderationSummary: logs,
    });
  } catch (err) {
    next(err);
  }
};
