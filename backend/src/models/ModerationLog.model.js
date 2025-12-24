import mongoose from "mongoose";

const moderationLogSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", index: true },
    action: {
      type: String,
      enum: [
        "FORCE_MUTE",
        "KICK_USER",
        "PROMOTE_COHOST",
        "DEMOTE_COHOST",
        "CHAT_DISABLED",
        "CHAT_ENABLED",
        "MEETING_STARTED",
        "MEETING_ENDED",
        "ROOM_LOCKED",
        "ROOM_UNLOCKED",
        "AUTO_ADMIT_ENABLED",
        "AUTO_ADMIT_DISABLED",
      ],
      required: true,
    },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("ModerationLog", moderationLogSchema);
