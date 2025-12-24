import mongoose from "mongoose";

const moderationLogSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      index: true,
      required: true,
    },

    action: {
      type: String,
      enum: [
        // Media moderation
        "FORCE_MUTE",
        "FORCE_CAMERA_OFF",

        // User moderation
        "KICK_USER",

        // Role management
        "PROMOTE_COHOST",
        "DEMOTE_COHOST",

        // Chat moderation
        "CHAT_ENABLED",
        "CHAT_DISABLED",
        "CHAT_READONLY_ENABLED",
        "CHAT_READONLY_DISABLED",

        // Room controls
        "ROOM_LOCKED",
        "ROOM_UNLOCKED",
        "AUTO_ADMIT_ENABLED",
        "AUTO_ADMIT_DISABLED",

        // Meeting lifecycle
        "MEETING_STARTED",
        "MEETING_ENDED",
      ],
      required: true,
    },

    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("ModerationLog", moderationLogSchema);
