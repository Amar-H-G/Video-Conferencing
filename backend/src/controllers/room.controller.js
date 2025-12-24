import Room from "../models/Room.model.js";
import Participant from "../models/Participant.model.js";
import { ROOM_STATES, ROLES } from "../utils/constants.js";
import { cleanupRoomMedia } from "../mediasoup/cleanup.js";
import { logModeration } from "../services/moderationLog.service.js";

/**
 * Host creates a room
 */
export const createRoom = async (req, res, next) => {
  try {
    const { title, isPublic = false } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Room title required" });
    }

    const room = await Room.create({
      title,
      host: req.user.id,
      isPublic,
      state: ROOM_STATES.WAITING,
    });

    await Participant.create({
      room: room._id,
      user: req.user.id,
      role: ROLES.HOST,
      approved: true,
      joinedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      room: {
        id: room._id,
        title: room.title,
        state: room.state,
        isPublic: room.isPublic,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Join room (waiting/public logic)
 */
export const joinRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    let participant = await Participant.findOne({
      room: roomId,
      user: req.user.id,
    });

    if (participant) {
      return res.json({ success: true, status: "already_joined" });
    }

    const approved = room.isPublic;

    participant = await Participant.create({
      room: roomId,
      user: req.user.id,
      role: ROLES.PARTICIPANT,
      approved,
      joinedAt: approved ? new Date() : null,
    });

    res.json({
      success: true,
      status: approved ? "joined" : "waiting",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Host starts meeting
 */
export const startMeeting = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.host.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only host can start meeting" });
    }

    room.state = ROOM_STATES.LIVE;
    await room.save();

    // 🔍 Audit log
    await logModeration({
      roomId,
      action: "MEETING_STARTED",
      actorId: req.user.id,
    });

    res.json({ success: true, state: room.state });
  } catch (err) {
    next(err);
  }
};

/**
 * Host ends meeting
 */
export const endMeeting = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.state = ROOM_STATES.ENDED;
    await room.save();

    // cleanup mediasoup + in-memory state
    cleanupRoomMedia(roomId);

    // 🔍 Audit log
    await logModeration({
      roomId,
      action: "MEETING_ENDED",
      actorId: req.user.id,
    });

    res.json({ success: true, state: room.state });
  } catch (err) {
    next(err);
  }
};
