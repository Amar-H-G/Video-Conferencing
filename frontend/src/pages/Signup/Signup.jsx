import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const handleSignup = (e) => {
    e.preventDefault();
    toast.success("Account created successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            placeholder="Name"
            required
            className="w-full rounded-lg border px-4 py-3"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border px-4 py-3"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
