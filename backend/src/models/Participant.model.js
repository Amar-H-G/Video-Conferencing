import mongoose from "mongoose";
import { ROLES } from "../utils/constants.js";

const participantSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.PARTICIPANT,
    },
    approved: { type: Boolean, default: false },
    joinedAt: { type: Date },
  },
  { timestamps: true }
);

participantSchema.index({ room: 1, user: 1 }, { unique: true });

export default mongoose.model("Participant", participantSchema);
