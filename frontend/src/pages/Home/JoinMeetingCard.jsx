import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { joinMeeting } from "../../services/meeting.service";
import { Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JoinMeetingCard() {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!roomId) return toast.error("Enter meeting code");

    setLoading(true);
    try {
      const res = await joinMeeting(roomId);

      if (res.status === "waiting") {
        navigate(`/waiting/${roomId}`);
      } else {
        navigate(`/meeting/${roomId}`);
      }
    } catch (err) {
      toast.error("Unable to join meeting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <Hash className="text-indigo-600" />
        <h2 className="text-xl font-semibold">Join with Code</h2>
      </div>

      <input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter meeting code"
        className="w-full border rounded-lg px-4 py-3 mb-4"
      />

      <button
        onClick={handleJoin}
        disabled={loading}
        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3 rounded-lg font-medium"
      >
        {loading ? "Joining..." : "Join Meeting"}
      </button>
    </motion.div>
  );
}
