import { motion } from "framer-motion";
import CreateMeetingCard from "./CreateMeetingCard";
import JoinMeetingCard from "./JoinMeetingCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-neutral-800"
        >
          Start or Join a Meeting
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CreateMeetingCard />
          <JoinMeetingCard />
        </div>
      </div>
    </div>
  );
}
