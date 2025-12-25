import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
}
