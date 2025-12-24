import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
};
