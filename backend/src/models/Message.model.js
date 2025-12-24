import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", index: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }, // null = public
    content: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
