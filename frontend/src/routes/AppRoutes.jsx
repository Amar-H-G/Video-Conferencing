import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import WaitingRoom from "../pages/WaitingRoom/WaitingRoom";
import Meeting from "../pages/Meeting/Meeting";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/waiting/:roomId"
        element={
          <ProtectedRoute>
            <WaitingRoom />
          </ProtectedRoute>
        }
      />

      <Route
        path="/meeting/:roomId"
        element={
          <ProtectedRoute>
            <Meeting />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
