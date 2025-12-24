import mongoose from "mongoose";
import { ROOM_STATES } from "../utils/constants.js";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    state: {
      type: String,
      enum: Object.values(ROOM_STATES),
      default: ROOM_STATES.WAITING,
    },

    // 🌐 Public / Private room
    isPublic: {
      type: Boolean,
      default: false,
    },

    // 🔒 Room lock (no one can auto-join)
    isLocked: {
      type: Boolean,
      default: false,
    },

    // 🚀 Auto admit users (only works if public & unlocked)
    autoAdmit: {
      type: Boolean,
      default: false,
    },
    chatEnabled: { type: Boolean, default: true },
    chatReadOnly: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
