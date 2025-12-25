import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { createMeeting } from "../../services/meeting.service";
import { Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateMeetingCard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await createMeeting({
        title: "My Meeting",
        isPublic: false,
      });

      toast.success("Meeting created");
      navigate(`/waiting/${res.room.id}`);
    } catch (err) {
      toast.error("Failed to create meeting");
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
        <Video className="text-indigo-600" />
        <h2 className="text-xl font-semibold">Create a Meeting</h2>
      </div>

      <p className="text-neutral-600 mb-6">
        Start a new private meeting and invite others.
      </p>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium"
      >
        {loading ? "Creating..." : "Create Meeting"}
      </button>
    </motion.div>
  );
}
