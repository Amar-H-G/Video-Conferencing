import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";

export default function AppRoutes() {
  const isAuthenticated = true; // TEMP (later auth context)

  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
