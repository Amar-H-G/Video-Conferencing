import { motion } from "framer-motion";

export default function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white shadow-lg border border-neutral-200 p-6"
    >
      {children}
    </motion.div>
  );
}
