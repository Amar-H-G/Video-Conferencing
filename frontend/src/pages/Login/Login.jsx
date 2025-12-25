import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "../../components/layout/AuthLayout";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      login(res.accessToken, res.user);
      toast.success("Login successful");
      navigate("/home");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
      <p className="text-center text-neutral-500 mb-6">Sign in to continue</p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-neutral-600 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-indigo-600 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
