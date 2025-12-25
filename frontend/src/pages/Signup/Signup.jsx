import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../../services/auth.service";
import AuthLayout from "../../components/layout/AuthLayout";
import { User, Mail, Lock } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({ name, email, password });
      toast.success("Account created. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User
            className="absolute left-3 top-3.5 text-neutral-400"
            size={18}
          />
          <input
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="relative">
          <Mail
            className="absolute left-3 top-3.5 text-neutral-400"
            size={18}
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="relative">
          <Lock
            className="absolute left-3 top-3.5 text-neutral-400"
            size={18}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm text-neutral-600 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-600 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
