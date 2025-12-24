import mongoose from "mongoose";
import { ROOM_STATES } from "../utils/constants.js";

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    state: {
      type: String,
      enum: Object.values(ROOM_STATES),
      default: ROOM_STATES.WAITING,
    },
    isPublic: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
