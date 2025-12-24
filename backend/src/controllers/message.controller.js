import Message from "../models/Message.model.js";

export const getRoomMessages = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({ room: roomId })
      .sort({ createdAt: 1 })
      .lean();

    res.json({ success: true, messages });
  } catch (err) {
    next(err);
  }
};
