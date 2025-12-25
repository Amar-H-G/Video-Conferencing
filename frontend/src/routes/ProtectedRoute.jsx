import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuth, loading } = useAuth();

  if (loading) return null; // later loader
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
