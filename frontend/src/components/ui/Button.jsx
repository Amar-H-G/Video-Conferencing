import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  loading = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition focus:outline-none";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary:
      "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100",
    dark: "bg-neutral-900 text-white hover:bg-neutral-800",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      disabled={loading}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </motion.button>
  );
}
